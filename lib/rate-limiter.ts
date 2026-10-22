/**
 * Simple in-memory rate limiter for form submissions
 * Tracks submissions per IP address with configurable limits
 */

interface RateLimitEntry {
  count: number;
  firstRequest: number;
}

// In-memory store for rate limiting (resets on server restart)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Configuration
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour window
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 submissions per hour per IP

/**
 * Clean up expired entries (called periodically)
 */
function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now - entry.firstRequest > RATE_LIMIT_WINDOW_MS) {
      rateLimitStore.delete(key);
    }
  }
}

// Run cleanup every 10 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupExpiredEntries, 10 * 60 * 1000);
}

/**
 * Check if an IP address has exceeded the rate limit
 * @param ip - The IP address to check
 * @returns Object with isLimited flag and remaining attempts
 */
export function checkRateLimit(ip: string): {
  isLimited: boolean;
  remaining: number;
  resetIn: number;
} {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  // No previous requests from this IP
  if (!entry) {
    rateLimitStore.set(ip, { count: 1, firstRequest: now });
    return {
      isLimited: false,
      remaining: MAX_REQUESTS_PER_WINDOW - 1,
      resetIn: RATE_LIMIT_WINDOW_MS,
    };
  }

  // Check if the window has expired
  if (now - entry.firstRequest > RATE_LIMIT_WINDOW_MS) {
    // Reset the counter
    rateLimitStore.set(ip, { count: 1, firstRequest: now });
    return {
      isLimited: false,
      remaining: MAX_REQUESTS_PER_WINDOW - 1,
      resetIn: RATE_LIMIT_WINDOW_MS,
    };
  }

  // Within the window - check count
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    const resetIn = RATE_LIMIT_WINDOW_MS - (now - entry.firstRequest);
    return {
      isLimited: true,
      remaining: 0,
      resetIn,
    };
  }

  // Increment counter
  entry.count++;
  rateLimitStore.set(ip, entry);

  return {
    isLimited: false,
    remaining: MAX_REQUESTS_PER_WINDOW - entry.count,
    resetIn: RATE_LIMIT_WINDOW_MS - (now - entry.firstRequest),
  };
}

/**
 * A scoped variant for high-frequency, read-only endpoints such as calendar
 * availability. Prefix the key at the call site so form and assistant quotas
 * remain independent.
 */
export function checkRateLimitWithPolicy(
  key: string,
  maxRequests: number,
  windowMs: number,
): { isLimited: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now - entry.firstRequest > windowMs) {
    rateLimitStore.set(key, { count: 1, firstRequest: now });
    return { isLimited: false, remaining: Math.max(0, maxRequests - 1), resetIn: windowMs };
  }

  if (entry.count >= maxRequests) {
    return {
      isLimited: true,
      remaining: 0,
      resetIn: Math.max(0, windowMs - (now - entry.firstRequest)),
    };
  }

  entry.count += 1;
  rateLimitStore.set(key, entry);
  return {
    isLimited: false,
    remaining: Math.max(0, maxRequests - entry.count),
    resetIn: Math.max(0, windowMs - (now - entry.firstRequest)),
  };
}

/**
 * Check if a honeypot field was filled (indicates bot)
 * @param honeypotValue - The value of the honeypot field
 * @returns true if the submission is likely from a bot
 */
export function isHoneypotTriggered(honeypotValue: string | undefined | null): boolean {
  // If honeypot field has any value, it's likely a bot
  return Boolean(honeypotValue && honeypotValue.trim().length > 0);
}

/**
 * Get the client IP for rate limiting.
 *
 * bmasiamusic.com is served by Render behind its Cloudflare edge, which sets
 * `cf-connecting-ip` and appends the connecting address to `x-forwarded-for`.
 * The first `x-forwarded-for` entry is whatever the visitor sent, so it must
 * never be trusted: use `cf-connecting-ip`, then the last (proxy-appended)
 * `x-forwarded-for` hop, then `x-real-ip`.
 *
 * Note: the limiter store is per-instance memory. Limits reset on deploy or
 * restart and are not shared between instances.
 */
export function getClientIP(headers: Headers): string {
  const cfConnectingIP = headers.get('cf-connecting-ip')?.trim();
  if (cfConnectingIP) return cfConnectingIP;

  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    const hops = forwardedFor.split(',').map((hop) => hop.trim()).filter(Boolean);
    if (hops.length) return hops[hops.length - 1];
  }

  const realIP = headers.get('x-real-ip')?.trim();
  if (realIP) return realIP;

  return 'unknown';
}

// Global (not per-IP) daily quotas, keyed by UTC date. Per-instance memory.
const dailyQuotaStore = new Map<string, { day: string; count: number }>();

const utcDay = () => new Date().toISOString().slice(0, 10);

/** True when `key` has already reached `limit` uses today (UTC). */
export function isDailyQuotaReached(key: string, limit: number): boolean {
  const entry = dailyQuotaStore.get(key);
  return Boolean(entry && entry.day === utcDay() && entry.count >= limit);
}

/** Record one use of the global daily quota `key`. */
export function recordDailyQuotaUse(key: string): void {
  const day = utcDay();
  const entry = dailyQuotaStore.get(key);
  if (!entry || entry.day !== day) {
    dailyQuotaStore.set(key, { day, count: 1 });
    return;
  }
  entry.count += 1;
}
