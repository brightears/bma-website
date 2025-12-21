import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Music Licensing',
  description:
    'Understand the music licenses your business needs. Learn why consumer streaming services are not licensed for commercial use and how BMAsia provides fully licensed music solutions.',
  openGraph: {
    title: 'Music Licensing Made Simple | BMAsia',
    description:
      'Playing music in your business requires proper licensing. Discover the three types of licenses you need and how BMAsia solutions include all necessary licensing.',
    url: `${SITE.url}/licensing`,
    siteName: SITE.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Music Licensing Made Simple | BMAsia',
    description:
      'Playing music in your business requires proper licensing. Discover the three types of licenses you need and how BMAsia solutions include all necessary licensing.',
  },
};

export default function LicensingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
