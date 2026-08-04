import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';

// Keep the absolute metadata base at the root so generated social images can be
// resolved while Next.js builds every locale. Locale-specific metadata still
// lives in app/[locale]/layout.tsx.
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
