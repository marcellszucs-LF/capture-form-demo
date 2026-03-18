import { useState, useEffect, type ReactNode } from "react";
import { ArrowRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

interface PasswordGateProps {
    children: ReactNode;
}

const STORAGE_KEY = "demo-authenticated";

export const PasswordGate = ({ children }: PasswordGateProps) => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    // Check if already authenticated
    useEffect(() => {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored === "true") {
            setIsAuthenticated(true);
        }
        setIsChecking(false);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Check against environment variable
        const correctPassword = import.meta.env.VITE_DEMO_PASSWORD;

        if (password === correctPassword) {
            sessionStorage.setItem(STORAGE_KEY, "true");
            setIsAuthenticated(true);
            setError(false);
        } else {
            setError(true);
        }
    };

    // Show nothing while checking authentication
    if (isChecking) {
        return null;
    }

    // If authenticated, show the app
    if (isAuthenticated) {
        return <>{children}</>;
    }

    // Show password gate
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-tertiary p-4">
            <div className="w-full max-w-sm">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-xl bg-primary_alt p-6 shadow-lg border border-secondary">
                    {/* Logo */}
                    <div className="flex justify-center">
                        <img src="/lovey-logo-purple.svg" alt="Lovey" className="h-10 w-auto" />
                    </div>

                    <h1 className="text-xl font-semibold text-primary text-center">Capture Form Demo</h1>

                    <div className="flex flex-col gap-1.5">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError(false);
                            }}
                            placeholder="Enter password"
                            className={`w-full rounded-lg border bg-primary px-3.5 py-2.5 text-md text-primary outline-none placeholder:text-placeholder transition-shadow ${
                                error
                                    ? "border-error ring-2 ring-error"
                                    : "border-primary focus:ring-2 focus:ring-brand"
                            }`}
                            autoFocus
                        />
                        {error && (
                            <p className="text-sm text-error-primary">Incorrect password</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        color="primary"
                        size="lg"
                        iconTrailing={ArrowRight}
                        className="w-full"
                    >
                        View Demo
                    </Button>
                </form>
            </div>
        </div>
    );
};
