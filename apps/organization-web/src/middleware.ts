import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define protected routes
  const protectedRoutes = ["/dashboard", "/todos"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check for session cookie (better-auth usually uses 'better-auth.session_token' or similar)
  // We'll check for the existence of the cookie.
  // Note: For full security, we should verify the token, but in middleware edge runtime,
  // that requires edge-compatible verification or just relying on cookie presence for redirection
  // and letting the actual page/API handle strict verification.
  const hasSession =
    request.cookies.has("better-auth.session_token") ||
    request.cookies.has("__Secure-better-auth.session_token") ||
    request.cookies.has("session_token");

  // Redirect to login if accessing protected route without session
  if (isProtectedRoute && !hasSession) {
    const loginUrl = new URL("/login", request.url);
    // loginUrl.searchParams.set("callbackUrl", pathname); // Optional: add callback URL
    return NextResponse.redirect(loginUrl);
  }

  // Optional: Redirect to dashboard if accessing login while authenticated
  // Removed naive cookie check here to prevent infinite redirect loop
  // if the session cookie is present but invalid. Validation should happen
  // on the page or via proper session API fetch.

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
