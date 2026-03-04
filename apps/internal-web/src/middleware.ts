import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define PUBLIC routes (only these are accessible without auth)
  const publicRoutes = ["/login", "/signup"];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check for session cookie (better-auth usually uses 'better-auth.session_token' or similar)
  // We'll check for the existence of the cookie.
  // Note: For full security, we should verify the token, but in middleware edge runtime,
  // that requires edge-compatible verification or just relying on cookie presence for redirection
  // and letting the actual page/API handle strict verification.
  const sessionCookieName =
    process.env.NODE_ENV === "production"
      ? "__Secure-better-auth.session_token"
      : "better-auth.session_token";
  const hasSession = request.cookies.has(sessionCookieName);

  // Redirect to login if accessing a protected route without a session
  if (!(isPublicRoute || hasSession)) {
    const loginUrl = new URL("/login", request.url);
    // loginUrl.searchParams.set("callbackUrl", pathname); // Optional: add callback URL
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if accessing login/signup while already authenticated
  if (isPublicRoute && hasSession) {
    const dashboardUrl = new URL("/", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
