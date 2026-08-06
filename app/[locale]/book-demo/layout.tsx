import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE } from '@/lib/constants';
import { locales } from '@/lib/i18n-config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'bookingPage' });
  const languages = Object.fromEntries(locales.map((value) => [value, `${SITE.url}/${value}/book-demo/`]));
  languages['x-default'] = `${SITE.url}/en/book-demo/`;

  return {
    title: t('metadataTitle'),
    description: t('metadataDescription'),
    alternates: { canonical: `${SITE.url}/${locale}/book-demo/`, languages },
    openGraph: {
      title: `${t('metadataTitle')} | ${SITE.name}`,
      description: t('metadataDescription'),
      url: `${SITE.url}/${locale}/book-demo/`,
      siteName: SITE.name,
      type: 'website',
      images: [{ url: `${SITE.url}/images/og-image.jpg`, width: 1200, height: 630, alt: t('metadataImageAlt') }],
    },
  };
}

export default function BookDemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
