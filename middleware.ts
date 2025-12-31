import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/i18n-config';

export default createMiddleware({
  // List of all supported locales
  locales,

  // Default locale when no match is found
  defaultLocale,

  // Always show locale prefix in URL (e.g., /en/, /th/)
  localePrefix: 'always',

  // Enable automatic locale detection from Accept-Language header
  localeDetection: true,
});

export const config = {
  // Match all pathnames except:
  // - API routes (/api/*)
  // - Static files (_next/static/*, images/*, etc.)
  // - Favicon and other root files
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next`, `/_vercel`, or `/images`
    // - … if they contain a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|images|.*\\..*).*)',
  ],
};
