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
    alternateLanguages[loc] = `${SITE.url}/${loc}/how-it-works`;
  });

  return {
    title: 'How It Works',
    description:
      'Learn how to transform your space with BMAsia in 3 simple steps. Choose your sound, customize your playlist, and set up your system with our expert team.',
    alternates: {
      canonical: `${SITE.url}/${locale}/how-it-works`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: 'How It Works | BMAsia',
      description:
        'Harmonizing your space in 3 simple steps. Discover our streamlined process for creating the perfect soundtrack for your business.',
      url: `${SITE.url}/${locale}/how-it-works`,
      siteName: SITE.name,
      type: 'website',
      images: [
        {
          url: `${SITE.url}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'How It Works - BMAsia',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'How It Works | BMAsia',
      description:
        'Harmonizing your space in 3 simple steps. Discover our streamlined process for creating the perfect soundtrack for your business.',
      images: [`${SITE.url}/images/og-image.jpg`],
    },
  };
}

export default async function HowItWorksLayout({
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
        name: 'How It Works',
        item: `${SITE.url}/${locale}/how-it-works`,
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
