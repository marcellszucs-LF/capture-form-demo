import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import { plaidApiPlugin } from "./server/plaid-api";

export default defineConfig({
    plugins: [react(), tailwindcss(), plaidApiPlugin()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
