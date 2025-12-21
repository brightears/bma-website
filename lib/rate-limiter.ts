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
 * Check if a honeypot field was filled (indicates bot)
 * @param honeypotValue - The value of the honeypot field
 * @returns true if the submission is likely from a bot
 */
export function isHoneypotTriggered(honeypotValue: string | undefined | null): boolean {
  // If honeypot field has any value, it's likely a bot
  return Boolean(honeypotValue && honeypotValue.trim().length > 0);
}

/**
 * Get client IP from request headers
 * Handles various proxy headers commonly used
 */
export function getClientIP(headers: Headers): string {
  // Check common proxy headers
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim();
  }

  const realIP = headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Render-specific header
  const cfConnectingIP = headers.get('cf-connecting-ip');
  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  // Fallback
  return 'unknown';
}
