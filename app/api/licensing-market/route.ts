import { NextResponse } from 'next/server';
import { resolveCountryCode } from '@/lib/hero-market';
import { getLicensingMarket } from '@/lib/licensing-markets';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const market = getLicensingMarket(resolveCountryCode(request.headers));
  const response = NextResponse.json(market);

  response.headers.set('Cache-Control', 'private, no-store, max-age=0');
  response.headers.set(
    'Vary',
    'CF-IPCountry, X-Vercel-IP-Country, CloudFront-Viewer-Country, X-Country-Code, X-AppEngine-Country',
  );

  return response;
}
