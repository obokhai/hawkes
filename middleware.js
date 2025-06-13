import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    // Redirect to /?screen=login instead of /login
    const loginUrl = new URL(request.url);
    loginUrl.pathname = "/";
    loginUrl.search = "?screen=login";
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};