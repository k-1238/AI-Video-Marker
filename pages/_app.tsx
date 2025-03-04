import React from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import ProtectedRoute from "./route/protectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./provider";

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        </ThemeProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
