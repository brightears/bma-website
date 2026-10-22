import { NextResponse } from 'next/server';
import { getTurnstileSiteKey } from '@/lib/turnstile';

export const dynamic = 'force-dynamic';

/** Public Turnstile site key (null when bot verification is not configured). */
export function GET() {
  return NextResponse.json(
    { siteKey: getTurnstileSiteKey() },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
