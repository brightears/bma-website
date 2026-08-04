import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE } from '@/lib/constants';
import { locales } from '@/lib/i18n-config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'licensingPage.hero' });
  const title = t('title');
  const url = `${SITE.url}/${locale}/licensing/`;
  const languages = Object.fromEntries(locales.map((loc) => [loc, `${SITE.url}/${loc}/licensing/`]));
  languages['x-default'] = `${SITE.url}/en/licensing/`;
  return { title, description: t('subtitle'), alternates: { canonical: url, languages }, openGraph: { title, description: t('subtitle'), url, siteName: SITE.name, type: 'website' } };
}

export default function LicensingLayout({ children }: { children: React.ReactNode }) { return children; }
