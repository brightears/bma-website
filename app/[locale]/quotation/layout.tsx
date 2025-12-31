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
    alternateLanguages[loc] = `${SITE.url}/${loc}/quotation`;
  });

  return {
    title: 'Request a Quote',
    description:
      'Get a personalized quote for your business music solution. Choose Soundtrack Your Brand or Beat Breeze to transform your space.',
    alternates: {
      canonical: `${SITE.url}/${locale}/quotation`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: 'Request a Quote | BMAsia',
      description:
        'Get a personalized quotation for background music solutions tailored to your business needs. Fast response within 24-48 hours.',
      url: `${SITE.url}/${locale}/quotation`,
      siteName: SITE.name,
      type: 'website',
      images: [
        {
          url: `${SITE.url}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Request a Quote - BMAsia',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Request a Quote | BMAsia',
      description:
        'Get a personalized quotation for background music solutions tailored to your business needs. Fast response within 24-48 hours.',
      images: [`${SITE.url}/images/og-image.jpg`],
    },
  };
}

export default async function QuotationLayout({
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
        name: 'Get a Quote',
        item: `${SITE.url}/${locale}/quotation`,
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
