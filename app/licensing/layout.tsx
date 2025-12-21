import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Music Licensing',
  description:
    'Understand music licenses for your business. Learn why streaming services are not for commercial use and how BMAsia provides licensed solutions.',
  alternates: {
    canonical: `${SITE.url}/licensing`,
  },
  openGraph: {
    title: 'Music Licensing Made Simple | BMAsia',
    description:
      'Playing music in your business requires proper licensing. Discover the three types of licenses you need and how BMAsia solutions include all necessary licensing.',
    url: `${SITE.url}/licensing`,
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

export default function LicensingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
