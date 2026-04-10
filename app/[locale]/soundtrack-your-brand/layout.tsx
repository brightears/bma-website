import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';
import { locales, type Locale } from '@/lib/i18n-config';

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

  const title = 'Soundtrack Your Brand';
  const description =
    "The world's largest commercial music library, curated for hospitality. 100M+ licensed tracks, multi-zone control, bespoke curation, and 24/7 support from BMAsia.";

  const alternateLanguages: Record<string, string> = {};
  locales.forEach((loc) => {
    alternateLanguages[loc] = `${SITE.url}/${loc}/soundtrack-your-brand`;
  });

  return {
    title: `${title} | ${SITE.name}`,
    description,
    alternates: {
      canonical: `${SITE.url}/${locale}/soundtrack-your-brand`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      locale: ogLocaleMap[locale as Locale] || 'en_US',
      url: `${SITE.url}/${locale}/soundtrack-your-brand`,
      siteName: SITE.name,
      type: 'website',
      images: [
        {
          url: `${SITE.url}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Soundtrack Your Brand — BMAsia',
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

export default function SoundtrackYourBrandLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do I need a Public Performance License for Soundtrack Your Brand?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, the Public Performance License is paid separately to your local collection society (MPC in Thailand, MRSS in Singapore, PRS in the UK, etc). BMAsia does not handle the paperwork on your behalf, but we are happy to share any information you need and assist you however we can.',
        },
      },
      {
        '@type': 'Question',
        name: 'What internet speed and network do I need for Soundtrack Your Brand?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Minimum 0.5 Mbit/s per playback device. Wired Ethernet is preferred. Outbound ports 443, 53, and 123 need to be open.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I play music offline with Soundtrack Your Brand?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Devices cache tracks for up to 30 consecutive days of offline playback. Content syncs silently in the background when the connection returns.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many zones can I manage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Unlimited zones. Each zone gets its own schedule, playlist, and device pairing — all managed from one dashboard.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use my Spotify playlists?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Soundtrack Your Brand syncs directly with Spotify, so any playlist you have built can be used commercially through the platform.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
