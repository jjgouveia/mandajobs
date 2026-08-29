import { describe, expect, it, beforeEach } from "vitest"
import {
  checkRateLimit,
  clearRateLimitBuckets,
} from "@/lib/rate-limit"

describe("checkRateLimit", () => {
  beforeEach(() => {
    clearRateLimitBuckets()
  })

  it("allows requests under the limit", () => {
    const first = checkRateLimit("test:a", { limit: 3, windowMs: 60_000 })
    const second = checkRateLimit("test:a", { limit: 3, windowMs: 60_000 })

    expect(first.success).toBe(true)
    expect(first.remaining).toBe(2)
    expect(second.success).toBe(true)
    expect(second.remaining).toBe(1)
  })

  it("blocks when limit is exceeded", () => {
    checkRateLimit("test:b", { limit: 2, windowMs: 60_000 })
    checkRateLimit("test:b", { limit: 2, windowMs: 60_000 })
    const blocked = checkRateLimit("test:b", { limit: 2, windowMs: 60_000 })

    expect(blocked.success).toBe(false)
    expect(blocked.remaining).toBe(0)
  })

  it("isolates keys", () => {
    checkRateLimit("test:c", { limit: 1, windowMs: 60_000 })
    const other = checkRateLimit("test:d", { limit: 1, windowMs: 60_000 })

    expect(other.success).toBe(true)
  })
})
