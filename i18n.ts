import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, type Locale } from './lib/i18n-config';

export default getRequestConfig(async ({ locale }) => {
  // If locale is undefined, use default
  const currentLocale = locale ?? defaultLocale;

  // Validate that the incoming locale is valid, fallback to default
  const validLocale = locales.includes(currentLocale as Locale)
    ? currentLocale
    : defaultLocale;

  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default,
  };
});
