import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { SITE } from '@/lib/constants';
import { localizedAlternates } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage.metadata' });
  const alternates = localizedAlternates('about', locale);

  return {
    title: t('title'),
    description: t('description'),
    alternates,
    openGraph: {
      title: `${t('title')} | ${SITE.name}`,
      description: t('description'),
      url: alternates.canonical,
      siteName: SITE.name,
      type: 'website',
      images: [{ url: `${SITE.url}/images/og-image.jpg`, width: 1200, height: 630, alt: 'BMAsia - Wherever Music Matters' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('title')} | ${SITE.name}`,
      description: t('description'),
      images: [`${SITE.url}/images/og-image.jpg`],
    },
  };
}

export default async function AboutLayout({ children, params }: Props & { children: ReactNode }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage.metadata' });
  const tNav = await getTranslations({ locale, namespace: 'navigation' });
  const url = `${SITE.url}/${locale}/about/`;

  // AboutPage points at the site-wide Organization node emitted in
  // app/[locale]/layout.tsx rather than restating company facts here.
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${url}#webpage`,
        url,
        name: t('title'),
        description: t('description'),
        inLanguage: locale,
        isPartOf: { '@id': `${SITE.url}/#website` },
        about: { '@id': `${SITE.url}/#organization` },
        mainEntity: { '@id': `${SITE.url}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: tNav('home'), item: `${SITE.url}/${locale}/` },
          { '@type': 'ListItem', position: 2, name: tNav('about'), item: url },
        ],
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
