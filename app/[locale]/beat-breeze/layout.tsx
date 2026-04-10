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

  const title = 'Beat Breeze';
  const description =
    'Fully licensed background music for every business — all three music licenses included, zero collection society fees, and professional curation by BMAsia music designers.';

  const alternateLanguages: Record<string, string> = {};
  locales.forEach((loc) => {
    alternateLanguages[loc] = `${SITE.url}/${loc}/beat-breeze`;
  });

  return {
    title: `${title} | ${SITE.name}`,
    description,
    alternates: {
      canonical: `${SITE.url}/${locale}/beat-breeze`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      locale: ogLocaleMap[locale as Locale] || 'en_US',
      url: `${SITE.url}/${locale}/beat-breeze`,
      siteName: SITE.name,
      type: 'website',
      images: [
        {
          url: `${SITE.url}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Beat Breeze — BMAsia',
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

export default function BeatBreezeLayout({
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
        name: 'Do I need to pay any music licensing fees separately with Beat Breeze?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Every Beat Breeze subscription includes all three licenses — recording, publishing, and public performance. You never need to pay MPC, MRSS, PRS, ASCAP, BMI, or any other collection society.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is Beat Breeze different from Soundtrack Your Brand?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Beat Breeze is significantly more affordable and has all licenses included, but the music catalog is curated and royalty-free — not specific chart hits. If you want hassle-free licensed music with zero fees and professional curation, Beat Breeze is the right fit.',
        },
      },
      {
        '@type': 'Question',
        name: 'What devices does Beat Breeze run on?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Any modern Windows PC, Android tablet or phone, or directly in a web browser. In Thailand, BMAsia supplies pre-configured Windows mini PCs with a 1-year warranty.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can Beat Breeze work offline?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The music downloads to your device and plays locally, so the experience stays smooth even if your internet drops.',
        },
      },
      {
        '@type': 'Question',
        name: 'How big is the Beat Breeze music catalog?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Over 30,000 professionally-produced royalty-free tracks, with the catalog continuing to grow. Every track is curated for hospitality and retail environments.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can Beat Breeze be white-labeled for corporate brands?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Corporate chains can run Beat Breeze as their own branded internal music platform with custom colours, logo, and domain.',
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
