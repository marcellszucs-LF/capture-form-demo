import { useCallback, useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";

export function usePlaid() {
    const [linkToken, setLinkToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Plaid Link configuration — only active when we have a token
    const { open, ready } = usePlaidLink({
        token: linkToken,
        onSuccess: async (publicToken) => {
            try {
                const res = await fetch("/api/plaid/exchange-public-token", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ public_token: publicToken }),
                });
                if (!res.ok) throw new Error("Token exchange failed");
                setSuccess(true);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Token exchange failed",
                );
            } finally {
                setLinkToken(null);
            }
        },
        onExit: () => {
            // Clear token so a fresh one is fetched on next click
            setLinkToken(null);
            setLoading(false);
        },
    });

    // Auto-open Plaid Link once the token is ready
    useEffect(() => {
        if (linkToken && ready) {
            open();
            setLoading(false);
        }
    }, [linkToken, ready, open]);

    // Called by the UI button — fetches a fresh link token
    const openPlaidLink = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/plaid/create-link-token", {
                method: "POST",
            });
            if (!res.ok) throw new Error("Failed to create link token");
            const data = await res.json();
            setLinkToken(data.link_token);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to create link token",
            );
            setLoading(false);
        }
    }, []);

    return { openPlaidLink, loading, error, success };
}
