export const EXTERNAL_LINKS = {
  beatBreezeLogin: 'https://beatbreeze.io/sign-in',
  beatBreezeSignup: 'https://beatbreeze.io/sign-up',
  soundtrackLogin: 'https://app.soundtrack.io/',
  calendly: process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/bmasia/sound-innovations',
} as const;

type Campaign =
  | 'homepage_product_choice'
  | 'beat_breeze_product'
  | 'global_navigation'
  | 'footer'
  | 'industry_solution'
  | 'how_it_works'
  | 'licensing_guidance'
  | 'quotation';

/**
 * Adds transparent, non-identifying campaign context to cross-domain product
 * links. This preserves referrer attribution without fingerprinting visitors or
 * loading analytics before consent.
 */
export function withAttribution(
  destination: string,
  campaign: Campaign,
  content: string,
) {
  const url = new URL(destination);
  url.searchParams.set('utm_source', 'bmasiamusic.com');
  url.searchParams.set('utm_medium', 'referral');
  url.searchParams.set('utm_campaign', campaign);
  url.searchParams.set('utm_content', content);
  return url.toString();
}
