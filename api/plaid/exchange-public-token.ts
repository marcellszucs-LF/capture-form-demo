import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

const configuration = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID ?? "",
            "PLAID-SECRET": process.env.PLAID_SECRET ?? "",
        },
    },
});

const plaidClient = new PlaidApi(configuration);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { public_token } = req.body;

        if (!public_token) {
            return res.status(400).json({ error: "public_token is required" });
        }

        const response = await plaidClient.itemPublicTokenExchange({ public_token });
        console.log("Plaid access_token obtained:", response.data.access_token);

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error("[plaid] exchange-public-token error:", err);
        const message = err instanceof Error ? err.message : "Unknown error";
        return res.status(500).json({ error: message });
    }
}
