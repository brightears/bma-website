import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE } from '@/lib/constants';
import { locales, type Locale } from '@/lib/i18n-config';

// Map locale codes to OpenGraph locale format
const ogLocaleMap: Record<Locale, string> = {
  en: 'en_US',
  th: 'th_TH',
  vi: 'vi_VN',
  ms: 'ms_MY',
  id: 'id_ID',
  ko: 'ko_KR',
  ja: 'ja_JP',
  zh: 'zh_CN',
};

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  // Get translations for this page
  const t = await getTranslations({ locale, namespace: 'licensing' });
  const tNav = await getTranslations({ locale, namespace: 'navigation' });

  const title = `${t('hero.title')} ${t('hero.titleHighlight')}`;
  const description = t('hero.subtitle');

  // Generate alternate URLs for all locales
  const alternateLanguages: Record<string, string> = {};
  locales.forEach((loc) => {
    alternateLanguages[loc] = `${SITE.url}/${loc}/licensing`;
  });

  return {
    title: tNav('licensing'),
    description,
    alternates: {
      canonical: `${SITE.url}/${locale}/licensing`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      locale: ogLocaleMap[locale as Locale] || 'en_US',
      url: `${SITE.url}/${locale}/licensing`,
      siteName: SITE.name,
      type: 'website',
      images: [
        {
          url: `${SITE.url}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'BMAsia - Wherever Music Matters',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE.name}`,
      description,
      images: [`${SITE.url}/images/og-image.jpg`],
    },
  };
}

export default async function LicensingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: 'navigation' });

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: tNav('home'),
        item: `${SITE.url}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: tNav('licensing'),
        item: `${SITE.url}/${locale}/licensing`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
