import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Music Consultation',
  description:
    'Tell BMAsia what your venue or event needs and our team will help you choose the right music solution.',
  openGraph: {
    title: 'Music Consultation | BMAsia',
    description: 'Talk to BMAsia about the right music setup for your business or event.',
    siteName: SITE.name,
    type: 'website',
  },
};

export default function MusicDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
