import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE } from '@/lib/constants';
import { locales } from '@/lib/i18n-config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'beatBreezePage.metadata' });
  const url = `${SITE.url}/${locale}/beat-breeze/`;
  const languages = Object.fromEntries(locales.map((loc) => [loc, `${SITE.url}/${loc}/beat-breeze/`]));
  languages['x-default'] = `${SITE.url}/en/beat-breeze/`;
  return {
    title: t('title'), description: t('description'), alternates: { canonical: url, languages },
    openGraph: { title: t('title'), description: t('description'), url, siteName: SITE.name, type: 'website', images: [{ url: `${SITE.url}/images/og-image.jpg`, width: 1200, height: 630, alt: 'Beat Breeze' }] },
    twitter: { card: 'summary_large_image', title: t('title'), description: t('description'), images: [`${SITE.url}/images/og-image.jpg`] },
  };
}

export default async function BeatBreezeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'beatBreezePage.metadata' });
  const tNav = await getTranslations({ locale, namespace: 'navigation' });
  const tFaq = await getTranslations({ locale, namespace: 'beatBreezePage.redesign.faq' });
  const url = `${SITE.url}/${locale}/beat-breeze/`;
  // Mirrors the visible FAQ accordion on the page (Google requires FAQPage
  // JSON-LD to reflect on-page Q&A), sourced from the same translation keys.
  const faqItems = tFaq.raw('items') as { q: string; a: string }[];

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: t('title'),
        description: t('description'),
        url,
        sameAs: 'https://beatbreeze.io',
        serviceType: 'Business background music and venue experience platform',
        provider: { '@id': `${SITE.url}/#organization` },
        areaServed: 'Asia-Pacific',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: tNav('home'), item: `${SITE.url}/${locale}/` },
          { '@type': 'ListItem', position: 2, name: tNav('beatBreeze'), item: url },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
