import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // ─── Security Headers (applied to all routes) ──────
  response.headers.set("X-DNS-Prefetch-Control", "off");
  response.headers.set("X-Download-Options", "noopen");
  response.headers.set("X-Permitted-Cross-Domain-Policies", "none");

  // ─── Protect admin routes (except login page) ──────
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token =
      request.cookies.get("authjs.session-token") ||
      request.cookies.get("__Secure-authjs.session-token");

    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ─── Block direct access to sensitive files ────────
  const blockedPaths = [
    "/.env",
    "/.git",
    "/wp-admin",
    "/wp-login",
    "/xmlrpc.php",
    "/phpmyadmin",
    "/admin.php",
    "/.htaccess",
    "/config.php",
    "/wp-content",
    "/wp-includes",
  ];

  const lowerPath = pathname.toLowerCase();
  if (blockedPaths.some((blocked) => lowerPath.startsWith(blocked))) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // Block common file extension attacks  
  if (/\.(php|asp|aspx|jsp|cgi|sql|bak|old|orig|save|swp|tmp)$/i.test(pathname)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // ─── Protect admin API routes ──────────────────────
  // POST/PUT/DELETE on admin-only endpoints require auth cookie
  if (pathname.startsWith("/api/faculty") || pathname.startsWith("/api/gallery")) {
    const method = request.method;
    if (method === "POST" || method === "PUT" || method === "DELETE") {
      const token =
        request.cookies.get("authjs.session-token") ||
        request.cookies.get("__Secure-authjs.session-token");

      if (!token) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        );
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Match all routes except static files, images, and Next.js internals
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
};
