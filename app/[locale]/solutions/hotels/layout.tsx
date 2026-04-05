import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';
import { locales } from '@/lib/i18n-config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const alternateLanguages: Record<string, string> = {};
  locales.forEach((loc) => {
    alternateLanguages[loc] = `${SITE.url}/${loc}/solutions/hotels`;
  });

  return {
    title: 'Background Music for Hotels & Resorts',
    description:
      'Licensed background music solutions for hotels and resorts. Multi-zone scheduling, bespoke music design, and centralized control for properties across Asia-Pacific. Trusted by Hilton, Accor, Centara, and 500+ hotel locations.',
    alternates: {
      canonical: `${SITE.url}/${locale}/solutions/hotels`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: 'Background Music for Hotels & Resorts | BMAsia',
      description:
        'Licensed background music for every zone of your hotel — lobby, restaurant, spa, pool, gym, bar. Trusted by leading hotel groups across Asia-Pacific.',
      url: `${SITE.url}/${locale}/solutions/hotels`,
      siteName: SITE.name,
      type: 'website',
    },
  };
}

export default async function HotelsSolutionLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Hotel Background Music Solutions',
    provider: {
      '@type': 'Organization',
      name: 'BMAsia',
      url: 'https://bmasiamusic.com',
    },
    description:
      'Licensed background music solutions for hotels and resorts. Multi-zone scheduling, bespoke music design, and centralized control across multiple properties.',
    areaServed: ['Asia-Pacific', 'Thailand', 'Hong Kong', 'Singapore', 'Vietnam', 'Indonesia', 'Malaysia'],
    serviceType: 'Background Music for Hotels',
    offers: [
      {
        '@type': 'Offer',
        name: 'Soundtrack Your Brand — Hotels',
        price: '380',
        priceCurrency: 'USD',
        description: 'Premium music solution with 100M+ tracks, bespoke design, multi-zone scheduling',
        unitText: 'per zone per year',
      },
      {
        '@type': 'Offer',
        name: 'Beat Breeze — Hotels',
        price: '290',
        priceCurrency: 'USD',
        description: 'Essential music solution with 30K+ tracks, all licenses included',
        unitText: 'per zone per year',
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE.url}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Solutions',
        item: `${SITE.url}/${locale}/solutions`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Hotels & Resorts',
        item: `${SITE.url}/${locale}/solutions/hotels`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
