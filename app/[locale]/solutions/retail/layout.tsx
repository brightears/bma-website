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
    alternateLanguages[loc] = `${SITE.url}/${loc}/solutions/retail`;
  });

  return {
    title: 'Background Music for Retail & Commercial Spaces',
    description:
      'Licensed background music for retail stores, shopping malls, gyms, and commercial spaces. 37% sales lift, brand-aligned curation, multi-store consistency. All licenses included with Beat Breeze.',
    alternates: {
      canonical: `${SITE.url}/${locale}/solutions/retail`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: 'Background Music for Retail & Commercial | BMAsia',
      description: 'Sound that sells. Background music that drives foot traffic, extends browsing time, and reinforces your retail brand.',
      url: `${SITE.url}/${locale}/solutions/retail`,
      siteName: SITE.name,
      type: 'website',
    },
  };
}

export default async function RetailSolutionLayout({
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
    name: 'Retail Background Music Solutions',
    provider: { '@type': 'Organization', name: 'BMAsia', url: 'https://bmasiamusic.com' },
    description: 'Licensed background music for retail stores, malls, gyms, and commercial spaces with multi-store consistency.',
    areaServed: ['Asia-Pacific', 'Thailand', 'Hong Kong', 'Singapore'],
    serviceType: 'Background Music for Retail',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: `${SITE.url}/${locale}/solutions` },
      { '@type': 'ListItem', position: 3, name: 'Retail & Commercial', item: `${SITE.url}/${locale}/solutions/retail` },
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
