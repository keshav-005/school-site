import { NextRequest, NextResponse } from "next/server";

// ─── In-memory rate limiter ──────────────────
// Production should use Redis (Upstash), this covers dev + small deployments.
// Auto-cleans expired entries to prevent memory leaks.

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

class InMemoryRateLimiter {
  private requests: Map<string, RateLimitEntry> = new Map();
  private limit: number;
  private windowMs: number;
  private cleanupInterval: ReturnType<typeof setInterval> | null = null;

  constructor(limit: number, windowMs: number) {
    this.limit = limit;
    this.windowMs = windowMs;

    // Cleanup expired entries every 60s to prevent memory leaks
    if (typeof setInterval !== "undefined") {
      this.cleanupInterval = setInterval(() => this.cleanup(), 60_000);
      // Don't let cleanup prevent process exit
      if (this.cleanupInterval?.unref) this.cleanupInterval.unref();
    }
  }

  check(identifier: string): { success: boolean; remaining: number; resetAt: number } {
    const now = Date.now();
    const record = this.requests.get(identifier);

    if (!record || now > record.resetAt) {
      this.requests.set(identifier, { count: 1, resetAt: now + this.windowMs });
      return { success: true, remaining: this.limit - 1, resetAt: now + this.windowMs };
    }

    if (record.count >= this.limit) {
      return { success: false, remaining: 0, resetAt: record.resetAt };
    }

    record.count++;
    return { success: true, remaining: this.limit - record.count, resetAt: record.resetAt };
  }

  private cleanup() {
    const now = Date.now();
    const entries = Array.from(this.requests.entries());
    for (let i = 0; i < entries.length; i++) {
      const [key, entry] = entries[i];
      if (now > entry.resetAt) {
        this.requests.delete(key);
      }
    }
  }
}

// ─── Limiters for different endpoints ────────
// Public forms: 5 submissions per minute (stops spam bots)
const formLimiter = new InMemoryRateLimiter(5, 60_000);

// Login: 5 attempts per 5 minutes (stops brute force)
const loginLimiter = new InMemoryRateLimiter(5, 5 * 60_000);

// Admin API: 30 requests per minute (generous but bounded)
const adminLimiter = new InMemoryRateLimiter(30, 60_000);

// General read: 60 requests per minute
const readLimiter = new InMemoryRateLimiter(60, 60_000);

// ─── IP extraction ───────────────────────────
function getClientIP(request: NextRequest): string {
  // x-forwarded-for can be spoofed behind some setups, but Vercel/Cloudflare
  // set it reliably. This is the best we can do at the application layer.
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    // Take only the first IP (client), not proxy chain
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

// ─── Rate limit functions ────────────────────
export type RateLimitType = "form" | "login" | "admin" | "read";

export async function rateLimit(
  request: NextRequest,
  type: RateLimitType = "form"
): Promise<{ success: boolean; remaining: number }> {
  const ip = getClientIP(request);
  const key = `${type}:${ip}`;

  const limiter = {
    form: formLimiter,
    login: loginLimiter,
    admin: adminLimiter,
    read: readLimiter,
  }[type];

  const result = limiter.check(key);
  return { success: result.success, remaining: result.remaining };
}

export function rateLimitResponse(retryAfterSecs: number = 60): NextResponse {
  return NextResponse.json(
    {
      error: "Too many requests. Please try again later.",
      code: "RATE_LIMITED",
    },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfterSecs),
        "X-RateLimit-Remaining": "0",
      },
    }
  );
}

// Login-specific response with longer wait message
export function loginRateLimitResponse(): NextResponse {
  return NextResponse.json(
    {
      error: "Too many login attempts. Please wait 5 minutes before trying again.",
      code: "LOGIN_RATE_LIMITED",
    },
    {
      status: 429,
      headers: {
        "Retry-After": "300",
      },
    }
  );
}
