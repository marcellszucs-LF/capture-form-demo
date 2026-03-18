import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Configuration, CountryCode, PlaidApi, PlaidEnvironments, Products } from "plaid";

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
        const response = await plaidClient.linkTokenCreate({
            user: { client_user_id: "demo-user" },
            client_name: "Lovey Finance",
            products: [Products.Transactions],
            country_codes: [CountryCode.Gb],
            language: "en",
        });

        return res.status(200).json({ link_token: response.data.link_token });
    } catch (err) {
        console.error("[plaid] create-link-token error:", err);
        const message = err instanceof Error ? err.message : "Unknown error";
        return res.status(500).json({ error: message });
    }
}
