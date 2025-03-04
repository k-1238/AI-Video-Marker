import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { allowedRoutes } from "../../utils/common";
import Lottie from "react-lottie";
import loadingAnimation from "../../data/triangle.json";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isAllowedRoute = allowedRoutes.includes(router.pathname);
  useEffect(() => {
    if (status === "loading") return; // Wait for authentication to finish

    if (status === "unauthenticated" && !isAllowedRoute) {
      router.replace("/sign-in"); // ✅ Prevents infinite loops
      return;
    }

    if (status === "authenticated" && isAllowedRoute) {
      const callbackUrl = router.query.callbackUrl as string;
      router.replace(callbackUrl || "/");
      return;
    }
  }, [status, session, router.pathname]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Lottie options={{ loop: true, animationData: loadingAnimation }} height={200} width={200} />
      </div>
    );
  }

  if (status === "authenticated") {
    return <>{children}</>;
  }

  if (status === "unauthenticated" && !session) {
    return <>{children}</>;
  }
  return null // Prevents unauthorized access
}
