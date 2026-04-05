import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE } from '@/lib/constants';
import { locales, type Locale } from '@/lib/i18n-config';

// Map locale codes to OpenGraph locale format
const ogLocaleMap: Record<Locale, string> = {
  en: 'en_US',
  th: 'th_TH',
  vi: 'vi_VN',
  ms: 'ms_MY',
  id: 'id_ID',
  ko: 'ko_KR',
  ja: 'ja_JP',
  zh: 'zh_CN',
};

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  // Get translations for this page
  const t = await getTranslations({ locale, namespace: 'licensing' });
  const tNav = await getTranslations({ locale, namespace: 'navigation' });

  const title = `${t('hero.title')} ${t('hero.titleHighlight')}`;
  const description = t('hero.subtitle');

  // Generate alternate URLs for all locales
  const alternateLanguages: Record<string, string> = {};
  locales.forEach((loc) => {
    alternateLanguages[loc] = `${SITE.url}/${loc}/licensing`;
  });

  return {
    title: tNav('licensing'),
    description,
    alternates: {
      canonical: `${SITE.url}/${locale}/licensing`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      locale: ogLocaleMap[locale as Locale] || 'en_US',
      url: `${SITE.url}/${locale}/licensing`,
      siteName: SITE.name,
      type: 'website',
      images: [
        {
          url: `${SITE.url}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'BMAsia - Wherever Music Matters',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE.name}`,
      description,
      images: [`${SITE.url}/images/og-image.jpg`],
    },
  };
}

export default async function LicensingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: 'navigation' });

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: tNav('home'),
        item: `${SITE.url}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: tNav('licensing'),
        item: `${SITE.url}/${locale}/licensing`,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What music licenses does my business need?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Businesses need three licenses to legally play music: a Recording License (covers the specific recording), a Publishing License (covers the original composition), and a Public Performance License (allows playing music in a public/commercial setting). BMAsia solutions include recording and publishing licenses, with Beat Breeze also including the public performance license.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use Spotify or Apple Music in my business?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Consumer streaming services like Spotify, Apple Music, YouTube Music, Amazon Music, Tidal, and Deezer are licensed for personal use only. Using them in a commercial setting violates their terms of service and can expose your business to legal liability. You need a commercial music service with proper business licensing.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Soundtrack Your Brand and Beat Breeze?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Soundtrack Your Brand is our premium solution with 100M+ tracks including recording and publishing licenses (public performance license required separately from your local PRO). Beat Breeze is our essential solution with 30,000+ curated royalty-free tracks with ALL three licenses included — no additional fees or negotiations required.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a Public Performance License?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A Public Performance License allows you to play music in a public environment like a hotel lobby, restaurant, retail store, or office. It compensates songwriters and publishers through Performing Rights Organizations (PROs) like MPC in Thailand, COMPASS in Singapore, or PRS in the UK. Beat Breeze includes this license; Soundtrack Your Brand requires it separately.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does business background music cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'BMAsia pricing starts from THB 9,000/zone/year for Beat Breeze (essential, all licenses included) and THB 12,000/zone/year for Soundtrack Your Brand (premium, 100M+ tracks). International pricing starts from USD 290/zone/year (Beat Breeze) and USD 380/zone/year (Soundtrack Your Brand). Volume discounts are available for 5+ zones.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
