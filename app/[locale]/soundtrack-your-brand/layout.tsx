import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE } from '@/lib/constants';
import { locales } from '@/lib/i18n-config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'soundtrackPage.metadata' });
  const url = `${SITE.url}/${locale}/soundtrack-your-brand/`;
  const languages = Object.fromEntries(locales.map((loc) => [loc, `${SITE.url}/${loc}/soundtrack-your-brand/`]));
  languages['x-default'] = `${SITE.url}/en/soundtrack-your-brand/`;
  return {
    title: t('title'), description: t('description'), alternates: { canonical: url, languages },
    openGraph: { title: t('title'), description: t('description'), url, siteName: SITE.name, type: 'website', images: [{ url: `${SITE.url}/images/og-image.jpg`, width: 1200, height: 630, alt: 'Soundtrack supplied by BMAsia' }] },
    twitter: { card: 'summary_large_image', title: t('title'), description: t('description'), images: [`${SITE.url}/images/og-image.jpg`] },
  };
}

export default function SoundtrackLayout({ children }: { children: React.ReactNode }) { return children; }
