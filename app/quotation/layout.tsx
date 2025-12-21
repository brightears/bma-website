import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Request a Quote',
  description:
    'Get a personalized quotation for your business music solution. Choose between Soundtrack Your Brand or Beat Breeze and transform your space with the perfect soundtrack.',
  openGraph: {
    title: 'Request a Quote | BMAsia',
    description:
      'Get a personalized quotation for background music solutions tailored to your business needs. Fast response within 24-48 hours.',
    url: `${SITE.url}/quotation`,
    siteName: SITE.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Request a Quote | BMAsia',
    description:
      'Get a personalized quotation for background music solutions tailored to your business needs. Fast response within 24-48 hours.',
  },
};

export default function QuotationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
