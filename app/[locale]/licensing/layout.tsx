import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { locales } from '@/lib/i18n-config';
import { SITE } from '@/lib/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'licensingPage.hero' });
  const canonical = `${SITE.url}/${locale}/licensing/`;

  return {
    title: t('label'),
    description: t('subtitle'),
    alternates: {
      canonical,
      languages: Object.fromEntries([
        ...locales.map((language) => [language, `${SITE.url}/${language}/licensing/`]),
        ['x-default', `${SITE.url}/en/licensing/`],
      ]),
    },
    openGraph: {
      title: `${t('label')} | ${SITE.name}`,
      description: t('subtitle'),
      url: canonical,
    },
  };
}

export default async function LicensingLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: 'navigation' });
  const tFaq = await getTranslations({ locale, namespace: 'licensingPage.faq' });
  // Mirrors the visible FAQ accordion on the page (Google requires FAQPage
  // JSON-LD to reflect on-page Q&A), sourced from the same translation keys.
  const faqItems = tFaq.raw('items') as { q: string; a: string }[];

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: tNav('home'), item: `${SITE.url}/${locale}/` },
          { '@type': 'ListItem', position: 2, name: tNav('licensing'), item: `${SITE.url}/${locale}/licensing/` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
