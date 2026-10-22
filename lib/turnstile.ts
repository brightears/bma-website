/**
 * Optional Cloudflare Turnstile verification for abuse-prone endpoints.
 *
 * Turnstile is enforced only when BOTH `TURNSTILE_SITE_KEY` and
 * `TURNSTILE_SECRET_KEY` are set. When either is missing the check is skipped
 * with a one-time warning, so a deployment without the keys keeps working.
 */

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

let warnedMissingKeys = false;

export function isTurnstileEnabled() {
  return Boolean(process.env.TURNSTILE_SITE_KEY?.trim() && process.env.TURNSTILE_SECRET_KEY?.trim());
}

/** The public site key, returned only when server-side verification is active. */
export function getTurnstileSiteKey() {
  return isTurnstileEnabled() ? process.env.TURNSTILE_SITE_KEY!.trim() : null;
}

export type TurnstileResult = { ok: true; skipped: boolean } | { ok: false; reason: string };

export async function verifyTurnstile(token: unknown, remoteIp: string, expectedAction: string): Promise<TurnstileResult> {
  if (!isTurnstileEnabled()) {
    if (!warnedMissingKeys) {
      warnedMissingKeys = true;
      console.warn('Turnstile is not configured (TURNSTILE_SITE_KEY / TURNSTILE_SECRET_KEY); bot verification is skipped.');
    }
    return { ok: true, skipped: true };
  }

  if (typeof token !== 'string' || !token || token.length > 2048) {
    return { ok: false, reason: 'missing-token' };
  }

  const body = new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY!.trim(), response: token });
  if (remoteIp && remoteIp !== 'unknown') body.set('remoteip', remoteIp);

  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      body,
      cache: 'no-store',
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return { ok: false, reason: `siteverify-${response.status}` };
    const payload = await response.json() as { success?: boolean; action?: string; 'error-codes'?: string[] };
    if (!payload.success) return { ok: false, reason: (payload['error-codes'] || ['failed']).join(',') };
    if (payload.action && payload.action !== expectedAction) return { ok: false, reason: 'action-mismatch' };
    return { ok: true, skipped: false };
  } catch (error) {
    console.error('Turnstile verification error:', error instanceof Error ? error.message : 'unknown error');
    return { ok: false, reason: 'siteverify-unreachable' };
  }
}
