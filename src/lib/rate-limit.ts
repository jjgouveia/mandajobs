/**
 * In-memory rate limiter for Next.js API routes.
 * Limitation: each serverless instance keeps its own Map — acceptable as MVP.
 */

import type { NextApiRequest } from "next"
import {
  GENERATE_QUERY_MAX_PER_WINDOW,
  EXPAND_SEARCH_MAX_PER_WINDOW,
  RATE_LIMIT_WINDOW_MS,
} from "@/lib/app-limits"

interface RateLimitEntry {
  count: number
  resetAt: number
}

interface RateLimitOptions {
  /** Max requests in the window */
  limit: number
  /** Window length in milliseconds */
  windowMs: number
}

interface RateLimitResult {
  success: boolean
  remaining: number
  resetAt: number
}

const buckets = new Map<string, RateLimitEntry>()

const CLEANUP_INTERVAL_MS = 5 * 60 * 1000
let lastCleanupAt = 0

function cleanupExpired(now: number) {
  if (now - lastCleanupAt < CLEANUP_INTERVAL_MS) return
  lastCleanupAt = now

  for (const [key, entry] of buckets.entries()) {
    if (entry.resetAt <= now) buckets.delete(key)
  }
}

export function getClientIp(req: NextApiRequest): string {
  const forwarded = req.headers["x-forwarded-for"]
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0]?.trim() || "unknown"
  }
  if (Array.isArray(forwarded) && forwarded[0]) {
    return forwarded[0].split(",")[0]?.trim() || "unknown"
  }

  return req.socket?.remoteAddress ?? "unknown"
}

export function checkRateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  const now = Date.now()
  cleanupExpired(now)

  const existing = buckets.get(key)

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + options.windowMs
    buckets.set(key, { count: 1, resetAt })
    return { success: true, remaining: options.limit - 1, resetAt }
  }

  if (existing.count >= options.limit) {
    return { success: false, remaining: 0, resetAt: existing.resetAt }
  }

  existing.count += 1
  buckets.set(key, existing)
  return { success: true, remaining: options.limit - existing.count, resetAt: existing.resetAt }
}

/** Clears all buckets — for tests only */
export function clearRateLimitBuckets() {
  buckets.clear()
  lastCleanupAt = 0
}

export const GENERATE_QUERY_LIMIT = {
  limit: GENERATE_QUERY_MAX_PER_WINDOW,
  windowMs: RATE_LIMIT_WINDOW_MS,
} as const

export const EXPAND_SEARCH_LIMIT = {
  limit: EXPAND_SEARCH_MAX_PER_WINDOW,
  windowMs: RATE_LIMIT_WINDOW_MS,
} as const
