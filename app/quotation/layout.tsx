import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Request a Quote',
  description:
    'Get a personalized quote for your business music solution. Choose Soundtrack Your Brand or Beat Breeze to transform your space.',
  alternates: {
    canonical: `${SITE.url}/quotation`,
  },
  openGraph: {
    title: 'Request a Quote | BMAsia',
    description:
      'Get a personalized quotation for background music solutions tailored to your business needs. Fast response within 24-48 hours.',
    url: `${SITE.url}/quotation`,
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

export default function QuotationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
