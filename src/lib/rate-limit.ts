import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

// Fallback in-memory rate limiter for development without Upstash
class InMemoryRateLimiter {
  private requests: Map<string, { count: number; resetAt: number }> = new Map();
  private limit: number;
  private windowMs: number;

  constructor(limit: number, windowMs: number) {
    this.limit = limit;
    this.windowMs = windowMs;
  }

  check(identifier: string): { success: boolean; remaining: number } {
    const now = Date.now();
    const record = this.requests.get(identifier);

    if (!record || now > record.resetAt) {
      this.requests.set(identifier, { count: 1, resetAt: now + this.windowMs });
      return { success: true, remaining: this.limit - 1 };
    }

    if (record.count >= this.limit) {
      return { success: false, remaining: 0 };
    }

    record.count++;
    return { success: true, remaining: this.limit - record.count };
  }
}

// Use Upstash if configured, otherwise fallback to in-memory
let rateLimiter: Ratelimit | null = null;
let fallbackLimiter: InMemoryRateLimiter | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  rateLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "60 s"),
    analytics: true,
    prefix: "triplem:api",
  });
} else {
  fallbackLimiter = new InMemoryRateLimiter(10, 60 * 1000);
}

export async function rateLimit(
  request: NextRequest
): Promise<{ success: boolean; remaining: number }> {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "anonymous";

  if (rateLimiter) {
    const result = await rateLimiter.limit(ip);
    return { success: result.success, remaining: result.remaining };
  }

  if (fallbackLimiter) {
    return fallbackLimiter.check(ip);
  }

  return { success: true, remaining: 999 };
}

export function rateLimitResponse(): NextResponse {
  return NextResponse.json(
    {
      error: "Too many requests. Please try again later.",
      code: "RATE_LIMITED",
    },
    {
      status: 429,
      headers: {
        "Retry-After": "60",
      },
    }
  );
}
