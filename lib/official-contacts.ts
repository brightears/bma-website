import { SITE, SOCIAL } from '@/lib/constants';

/**
 * Official BMAsia channels, derived from lib/constants.ts so the assistant,
 * llms.txt, structured data and the "Verify BMAsia contacts" block cannot
 * drift apart. Never add a channel here that is not in constants.ts.
 */
const whatsappDigits = SOCIAL.whatsapp.replace(/\D/g, '');

export const OFFICIAL_CONTACTS = {
  domains: ['bmasiamusic.com', 'beatbreeze.io'],
  email: SITE.email,
  /** E.164, for tel: links and structured data. */
  phoneE164: `+${whatsappDigits}`,
  /** Human-readable form of the same WhatsApp business number. */
  phoneDisplay: `+${whatsappDigits.replace(/^(66)(\d{2})(\d{3})(\d{4})$/, '$1 $2 $3 $4')}`,
  whatsapp: SOCIAL.whatsapp,
  line: SOCIAL.line,
} as const;

/** Plain-text summary used in assistant instructions and llms.txt. */
export const OFFICIAL_CONTACTS_TEXT = [
  `Official websites: ${OFFICIAL_CONTACTS.domains.join(' and ')} (and their subdomains)`,
  `Official email: ${OFFICIAL_CONTACTS.email}`,
  `Official phone and WhatsApp: ${OFFICIAL_CONTACTS.phoneDisplay} (${OFFICIAL_CONTACTS.whatsapp})`,
  `Official LINE: ${OFFICIAL_CONTACTS.line}`,
].join('\n');
