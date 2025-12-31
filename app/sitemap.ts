import { MetadataRoute } from 'next';
import { locales, defaultLocale, Locale } from '@/lib/i18n-config';

const BASE_URL = 'https://bmasiamusic.com';

// Define all pages with their metadata
const pages = [
  { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
  { path: '/how-it-works', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: '/licensing', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: '/quotation', changeFrequency: 'monthly' as const, priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Generate sitemap entries for all pages in all locales
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      // Build the URL for this locale
      const url = `${BASE_URL}/${locale}${page.path}`;

      // Build alternates object with hreflang for all locales
      const languages: Record<string, string> = {};
      for (const altLocale of locales) {
        languages[altLocale] = `${BASE_URL}/${altLocale}${page.path}`;
      }
      // Add x-default pointing to English version
      languages['x-default'] = `${BASE_URL}/${defaultLocale}${page.path}`;

      sitemapEntries.push({
        url,
        lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages,
        },
      });
    }
  }

  return sitemapEntries;
}
