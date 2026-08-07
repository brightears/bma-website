import { NextResponse } from 'next/server';
import { resolveHeroMarket } from '@/lib/hero-market';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const response = NextResponse.json({ market: resolveHeroMarket(request.headers) });
  response.headers.set('Cache-Control', 'private, no-store, max-age=0');
  response.headers.set('Vary', 'CF-IPCountry, X-Vercel-IP-Country, CloudFront-Viewer-Country, X-Country-Code, X-AppEngine-Country');
  return response;
}
