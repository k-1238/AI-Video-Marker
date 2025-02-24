import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { allowedRoutes } from "../../utils/common";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {

    if (
      status === "unauthenticated" &&
      !allowedRoutes.includes(router.pathname)
    ) {
      router.push("/sign-in");
    }

    if (session && allowedRoutes.includes(router.pathname)) {
      router.push("/");
    }
  }, [status, router]);


  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return children;
  }

  return null;
}
