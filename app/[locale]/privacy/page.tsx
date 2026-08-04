import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { LegalDocument } from '@/components/legal/LegalDocument';
import { localizedAlternates } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalPages.privacy' });
  return { title: t('title'), description: t('summary'), alternates: localizedAlternates('privacy', locale) };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalPages.privacy' });
  const ids = ['controller', 'data', 'purposes', 'sharing', 'retention', 'rights', 'contact'] as const;
  const sections = ids.map((id) => ({
    title: t(`sections.${id}.title`),
    paragraphs: t.raw(`sections.${id}.paragraphs`) as string[],
    items: t.raw(`sections.${id}.items`) as string[] | undefined,
    extra: id === 'rights' ? (
      <p>
        <Link href={`/${locale}/cookies`} className="text-[#f0a539] underline-offset-4 hover:underline">{t('cookieLink')}</Link>
      </p>
    ) : id === 'contact' ? (
      <a className="inline-flex text-[#f0a539] underline-offset-4 hover:underline" href="mailto:info@bmasiamusic.com">info@bmasiamusic.com</a>
    ) : undefined,
  }));

  return <LegalDocument eyebrow={t('eyebrow')} title={t('title')} summary={t('summary')} updated={t('updated')} sections={sections} />;
}
