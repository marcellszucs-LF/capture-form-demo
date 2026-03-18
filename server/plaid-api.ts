import type { Plugin } from "vite";
import { loadEnv } from "vite";
import {
    Configuration,
    CountryCode,
    PlaidApi,
    PlaidEnvironments,
    Products,
} from "plaid";
import type { IncomingMessage, ServerResponse } from "node:http";

/** Read the raw JSON body from an incoming request. */
async function readBody(req: IncomingMessage): Promise<string> {
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
        chunks.push(chunk as Buffer);
    }
    return Buffer.concat(chunks).toString();
}

/** Send a JSON response. */
function json(res: ServerResponse, status: number, data: unknown) {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
}

export function plaidApiPlugin(): Plugin {
    let plaidClient: PlaidApi;

    return {
        name: "plaid-api",

        configureServer(server) {
            // Load env vars (empty prefix = all vars, not just VITE_*)
            const env = loadEnv("development", process.cwd(), "");
            const clientId = env.PLAID_CLIENT_ID;
            const secret = env.PLAID_SECRET;

            if (!clientId || !secret) {
                console.warn(
                    "[plaid-api] PLAID_CLIENT_ID and/or PLAID_SECRET not set — Plaid endpoints will return 500.",
                );
            }

            const configuration = new Configuration({
                basePath: PlaidEnvironments.sandbox,
                baseOptions: {
                    headers: {
                        "PLAID-CLIENT-ID": clientId ?? "",
                        "PLAID-SECRET": secret ?? "",
                    },
                },
            });
            plaidClient = new PlaidApi(configuration);

            // Register middleware BEFORE Vite's own middleware
            server.middlewares.use(async (req, res, next) => {
                try {
                    // ── Create Link Token ──
                    if (
                        req.method === "POST" &&
                        req.url === "/api/plaid/create-link-token"
                    ) {
                        const response = await plaidClient.linkTokenCreate({
                            user: { client_user_id: "demo-user" },
                            client_name: "Lovey Finance",
                            products: [Products.Transactions],
                            country_codes: [CountryCode.Gb],
                            language: "en",
                        });
                        return json(res, 200, {
                            link_token: response.data.link_token,
                        });
                    }

                    // ── Exchange Public Token ──
                    if (
                        req.method === "POST" &&
                        req.url === "/api/plaid/exchange-public-token"
                    ) {
                        const body = JSON.parse(await readBody(req));
                        const { public_token } = body;

                        if (!public_token) {
                            return json(res, 400, {
                                error: "public_token is required",
                            });
                        }

                        const response =
                            await plaidClient.itemPublicTokenExchange({
                                public_token,
                            });

                        console.log(
                            "Plaid access_token obtained:",
                            response.data.access_token,
                        );

                        return json(res, 200, { success: true });
                    }

                    // Not a Plaid route — pass through
                    next();
                } catch (err: unknown) {
                    console.error("[plaid-api]", err);
                    const message =
                        err instanceof Error ? err.message : "Unknown error";
                    json(res, 500, { error: message });
                }
            });
        },
    };
}
