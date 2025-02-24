import React from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import ProtectedRoute from "./route/protectedRoute";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { allowedRoutes } from "../utils/common";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" && !allowedRoutes.includes(router.pathname)) {
      router.push("/sign-in");
    }
  }, [status, router]);

  return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <AuthGuard>
          {allowedRoutes.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <ProtectedRoute>
              <Component {...pageProps} />
            </ProtectedRoute>
          )}
        </AuthGuard>
      </SessionProvider>
    </QueryClientProvider>
  );
}
