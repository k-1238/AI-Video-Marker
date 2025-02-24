import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { allowedRoutes } from "./utils/common";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Allow access to login or register pages
  if (allowedRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // If user is not logged in and tries to access other pages, redirect to /login
  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // If user is logged in, allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Protect all routes except /api or assets
};
