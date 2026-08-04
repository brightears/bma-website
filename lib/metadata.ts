import { SITE } from '@/lib/constants';
import { locales } from '@/lib/i18n-config';

export function localizedAlternates(path: string, locale: string) {
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  const suffix = cleanPath ? `${cleanPath}/` : '';
  const canonical = `${SITE.url}/${locale}/${suffix}`;
  const languages: Record<string, string> = Object.fromEntries(locales.map((loc) => [loc, `${SITE.url}/${loc}/${suffix}`]));
  languages['x-default'] = `${SITE.url}/en/${suffix}`;
  return { canonical, languages };
}
