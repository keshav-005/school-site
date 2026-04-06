import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import type { RateLimitType } from "@/lib/rate-limit";

type RouteHandler = (
  request: NextRequest,
  context?: Record<string, unknown>
) => Promise<NextResponse>;

interface RouteOptions {
  /** Require authenticated admin session */
  requireAuth?: boolean;
  /** Rate limit type to apply */
  rateLimit?: RateLimitType;
}

/**
 * Higher-order function that wraps API route handlers with:
 * - Auth checks (optional)
 * - Rate limiting (optional)
 * - Structured error handling + logging
 * - Consistent error response format
 *
 * Eliminates the repeated try/catch + auth + rate-limit boilerplate
 * from every API route handler.
 *
 * @example
 * // Public route with rate limiting
 * export const POST = withHandler(async (req) => {
 *   const body = await req.json();
 *   return NextResponse.json({ success: true }, { status: 201 });
 * }, { rateLimit: "form" });
 *
 * // Admin-only route
 * export const DELETE = withHandler(async (req) => {
 *   // session is guaranteed to exist here
 *   return NextResponse.json({ success: true });
 * }, { requireAuth: true });
 */
export function withHandler(
  handler: RouteHandler,
  options: RouteOptions = {}
): RouteHandler {
  return async (request: NextRequest) => {
    try {
      // Rate limiting
      if (options.rateLimit) {
        const { success } = await rateLimit(request, options.rateLimit);
        if (!success) return rateLimitResponse();
      }

      // Auth check
      if (options.requireAuth) {
        const session = await auth();
        if (!session?.user) {
          return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
          );
        }
      }

      return await handler(request);
    } catch (error) {
      const method = request.method;
      const url = request.nextUrl.pathname;
      logger.error(`API ${method} ${url} failed`, error);

      return NextResponse.json(
        { error: "Internal server error. Please try again later." },
        { status: 500 }
      );
    }
  };
}
