import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication (admin panel only)
const PROTECTED_PREFIXES = ["/admin", "/portal"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect admin/portal routes — everything else is public
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));

  if (isProtected) {
    // For now, allow access (auth will be enforced when login system is fully set up)
    // In production, this would check for a session cookie
  }

  // Add security headers
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|icons|fonts|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
