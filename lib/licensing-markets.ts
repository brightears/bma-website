export type LicensingSociety = {
  name: string;
  url: string;
};

export type LicensingMarket = {
  countryCode: string | null;
  publicPerformance: 'included' | 'local' | 'confirm';
  societies: LicensingSociety[];
  soundtrackAvailable: boolean;
  soundtrackGuideUrl: string;
};

const SOUNDTRACK_AVAILABLE_MARKETS = new Set([
  'AE', 'AI', 'AR', 'AT', 'AU', 'BE', 'BG', 'BH', 'BM', 'BO', 'BS', 'CA',
  'CH', 'CL', 'CO', 'CR', 'CY', 'CZ', 'DE', 'DK', 'EC', 'EE', 'EG', 'ES',
  'FI', 'FR', 'GB', 'GI', 'GR', 'GT', 'HN', 'HR', 'HU', 'ID', 'IE', 'IN',
  'IS', 'IT', 'JO', 'KW', 'KY', 'LB', 'LI', 'LT', 'LU', 'LV', 'MA', 'MQ',
  'MT', 'MV', 'MX', 'MY', 'NI', 'NL', 'NO', 'NZ', 'OM', 'PA', 'PE', 'PL',
  'PR', 'PT', 'PY', 'QA', 'SA', 'SE', 'SG', 'SK', 'TH', 'TR', 'US', 'UY',
  'ZA',
]);

const SOUNDTRACK_PUBLIC_PERFORMANCE_INCLUDED = new Set(['CA', 'US']);

const COUNTRY_SLUG_OVERRIDES: Partial<Record<string, string>> = {
  TR: 'turkiye',
  US: 'united-states',
};

// Direct links are intentionally curated for BMAsia's core visitor markets.
// Other supported markets still receive Soundtrack's maintained country guide.
const SOCIETIES: Partial<Record<string, LicensingSociety[]>> = {
  AU: [{ name: 'OneMusic Australia', url: 'https://onemusic.com.au/' }],
  CN: [{ name: 'MCSC', url: 'https://www.mcsc.com.cn/en/' }],
  DE: [{ name: 'GEMA', url: 'https://www.gema.de/' }],
  ES: [
    { name: 'SGAE', url: 'https://www.sgae.es/' },
    { name: 'AGEDI', url: 'https://www.agedi.es/' },
    { name: 'AIE', url: 'https://www.aie.es/' },
  ],
  FR: [{ name: 'SACEM', url: 'https://clients.sacem.fr/' }],
  GB: [{ name: 'TheMusicLicence', url: 'https://pplprs.co.uk/' }],
  ID: [{ name: 'LMKN', url: 'https://www.lmkn.id/' }],
  IN: [
    { name: 'IPRS', url: 'https://iprs.org/' },
    { name: 'PPL India', url: 'https://www.pplindia.org/' },
    { name: 'ISAMRA', url: 'https://isamracopyright.com/' },
  ],
  IT: [{ name: 'SIAE', url: 'https://www.siae.it/' }],
  JP: [{ name: 'JASRAC', url: 'https://web.jasrac.or.jp/en/' }],
  KR: [{ name: 'KOMCA', url: 'https://www.komca.or.kr/' }],
  MY: [
    { name: 'RPM', url: 'https://rpm.my/' },
    { name: 'MACP', url: 'https://macp.com.my/' },
    { name: 'PPM', url: 'https://www.ppm.my/' },
  ],
  NL: [
    { name: 'BumaStemra', url: 'https://bumastemra.nl/en/' },
    { name: 'Sena', url: 'https://sena.nl/en/' },
  ],
  SG: [
    { name: 'COMPASS', url: 'https://www.compass.org.sg/' },
    { name: 'MRSS', url: 'https://www.mrss.com.sg/' },
  ],
  TH: [
    { name: 'MCT', url: 'https://www.mct.in.th/' },
    { name: 'TECA', url: 'https://www.teca.co.th/' },
  ],
  VN: [{ name: 'VCPMC', url: 'https://www.vcpmc.org/en' }],
};

function countrySlug(countryCode: string) {
  if (COUNTRY_SLUG_OVERRIDES[countryCode]) return COUNTRY_SLUG_OVERRIDES[countryCode]!;

  try {
    const countryName = new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode);
    if (!countryName) return '';
    return countryName
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  } catch {
    return '';
  }
}

export function getLicensingMarket(countryCode: string | null): LicensingMarket {
  const soundtrackAvailable = Boolean(countryCode && SOUNDTRACK_AVAILABLE_MARKETS.has(countryCode));
  const publicPerformance = countryCode && SOUNDTRACK_PUBLIC_PERFORMANCE_INCLUDED.has(countryCode)
    ? 'included'
    : soundtrackAvailable
      ? 'local'
      : 'confirm';
  const slug = countryCode ? countrySlug(countryCode) : '';

  return {
    countryCode,
    publicPerformance,
    societies: countryCode ? SOCIETIES[countryCode] ?? [] : [],
    soundtrackAvailable,
    soundtrackGuideUrl: soundtrackAvailable && slug
      ? `https://www.soundtrack.io/licensing/${slug}/`
      : 'https://www.soundtrack.io/licensing/',
  };
}
