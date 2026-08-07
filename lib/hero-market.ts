export type HeroMarket = 'global' | 'vietnam';

const COUNTRY_HEADERS = [
  'cf-ipcountry',
  'x-vercel-ip-country',
  'cloudfront-viewer-country',
  'x-country-code',
  'x-appengine-country',
] as const;

const SUPPORTED_MARKETS: Partial<Record<string, HeroMarket>> = {
  VN: 'vietnam',
};

function normaliseCountryCode(value: string | null): string | null {
  const countryCode = value?.trim().toUpperCase();
  return countryCode && /^[A-Z]{2}$/.test(countryCode) ? countryCode : null;
}

export function resolveHeroMarket(headers: Headers): HeroMarket {
  for (const header of COUNTRY_HEADERS) {
    const countryCode = normaliseCountryCode(headers.get(header));
    if (!countryCode) continue;

    return SUPPORTED_MARKETS[countryCode] ?? 'global';
  }

  return 'global';
}
