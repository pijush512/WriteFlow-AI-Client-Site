"use client"; // এটি খুবই জরুরি

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/auth-context";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <SessionProvider>
          {children}
        </SessionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}