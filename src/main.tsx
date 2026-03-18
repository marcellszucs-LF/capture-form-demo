import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { PasswordGate } from "@/components/password-gate";
import { HomeScreen } from "@/pages/home-screen";
import { LoanApplication } from "@/pages/loan-application";
import { NotFound } from "@/pages/not-found";
import { RouteProvider } from "@/providers/router-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/styles/globals.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="light">
            <PasswordGate>
                <BrowserRouter>
                    <RouteProvider>
                        <Routes>
                            <Route path="/" element={<LoanApplication />} />
                            <Route path="/home" element={<HomeScreen />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </RouteProvider>
                </BrowserRouter>
            </PasswordGate>
        </ThemeProvider>
    </StrictMode>,
);
