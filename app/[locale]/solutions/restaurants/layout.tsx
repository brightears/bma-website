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
    alternateLanguages[loc] = `${SITE.url}/${loc}/solutions/restaurants`;
  });

  return {
    title: 'Background Music for Restaurants & F&B',
    description:
      'Licensed background music for restaurants, cafes, bars, and F&B venues. Daypart scheduling, genre curation, and all licenses included with Beat Breeze. Increase guest spend by 9.1%.',
    alternates: {
      canonical: `${SITE.url}/${locale}/solutions/restaurants`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: 'Background Music for Restaurants & F&B | BMAsia',
      description: 'The right playlist turns a meal into an experience. Licensed, curated, and scheduled to match your service flow.',
      url: `${SITE.url}/${locale}/solutions/restaurants`,
      siteName: SITE.name,
      type: 'website',
    },
  };
}

export default async function RestaurantsSolutionLayout({
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
    name: 'Restaurant Background Music Solutions',
    provider: { '@type': 'Organization', name: 'BMAsia', url: 'https://bmasiamusic.com' },
    description: 'Licensed background music for restaurants, cafes, bars, and F&B venues with daypart scheduling and genre curation.',
    areaServed: ['Asia-Pacific', 'Thailand', 'Hong Kong', 'Singapore'],
    serviceType: 'Background Music for Restaurants',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: `${SITE.url}/${locale}/solutions` },
      { '@type': 'ListItem', position: 3, name: 'Restaurants & F&B', item: `${SITE.url}/${locale}/solutions/restaurants` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
