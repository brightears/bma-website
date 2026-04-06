import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Music Design Assistant',
  description:
    'Create the perfect background music for your venue or event. Our AI music designer will craft a personalized playlist recommendation in minutes.',
  openGraph: {
    title: 'Music Design Assistant | BMAsia',
    description: 'AI-powered music design for your business. Get personalized playlist recommendations.',
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
