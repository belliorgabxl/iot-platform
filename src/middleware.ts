import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";

  if (
    path.startsWith("/_next/") || // Next.js assets
    path.startsWith("/static/") || // Static folder (if used)
    path.startsWith("/favicon.ico") || // Favicon
    path.startsWith("/images/") // Images in public folder
  ) {
    return NextResponse.next();
  }

  const isPublicPath =
    path === "/authentication/login" ||
    path === "/authentication/signup" ||
    path === "/" ||
    path === "/verifyemail" ||
    path === "/aboutus" ||
    path === "/production" ||
    path === "/documents";

  if (token) {
    if (path === "/authentication/login" || path === "/authentication/signup") {
      return NextResponse.redirect(new URL("/devices", request.nextUrl));
    }

    return NextResponse.next();
  }

  if (!isPublicPath) {
    return NextResponse.redirect(
      new URL("/authentication/login", request.nextUrl)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/profile",
    "/authentication/login",
    "/authentication/signup",
    "/members",
    "/verifyemail",
    "/aboutus",
    "/devices",
    "/products",
    "/products/car/",
    "/documents", 
  ],
};
