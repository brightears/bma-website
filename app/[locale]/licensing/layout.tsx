import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';
import { locales } from '@/lib/i18n-config';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  // Generate alternate URLs for all locales
  const alternateLanguages: Record<string, string> = {};
  locales.forEach((loc) => {
    alternateLanguages[loc] = `${SITE.url}/${loc}/licensing`;
  });

  return {
    title: 'Music Licensing',
    description:
      'Understand music licenses for your business. Learn why streaming services are not for commercial use and how BMAsia provides licensed solutions.',
    alternates: {
      canonical: `${SITE.url}/${locale}/licensing`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: 'Music Licensing Made Simple | BMAsia',
      description:
        'Playing music in your business requires proper licensing. Discover the three types of licenses you need and how BMAsia solutions include all necessary licensing.',
      url: `${SITE.url}/${locale}/licensing`,
      siteName: SITE.name,
      type: 'website',
      images: [
        {
          url: `${SITE.url}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Music Licensing - BMAsia',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Music Licensing Made Simple | BMAsia',
      description:
        'Playing music in your business requires proper licensing. Discover the three types of licenses you need and how BMAsia solutions include all necessary licensing.',
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
        name: 'Licensing',
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
