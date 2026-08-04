import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { CookiePreferencesButton } from '@/components/legal/CookiePreferencesButton';
import { LegalDocument } from '@/components/legal/LegalDocument';
import { localizedAlternates } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalPages.cookies' });
  return { title: t('title'), description: t('summary'), alternates: localizedAlternates('cookies', locale) };
}

export default async function CookiePolicyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalPages.cookies' });
  const ids = ['storage', 'necessary', 'optional', 'control', 'providers', 'contact'] as const;
  const sections = ids.map((id) => ({
    title: t(`sections.${id}.title`),
    paragraphs: t.raw(`sections.${id}.paragraphs`) as string[],
    items: t.raw(`sections.${id}.items`) as string[] | undefined,
    extra: id === 'control' ? <CookiePreferencesButton>{t('manage')}</CookiePreferencesButton> : id === 'contact' ? (
      <p className="flex flex-wrap gap-x-4 gap-y-2">
        <Link href={`/${locale}/privacy`} className="text-[#f0a539] underline-offset-4 hover:underline">{t('privacyLink')}</Link>
        <a className="text-[#f0a539] underline-offset-4 hover:underline" href="mailto:info@bmasiamusic.com">info@bmasiamusic.com</a>
      </p>
    ) : undefined,
  }));

  return <LegalDocument eyebrow={t('eyebrow')} title={t('title')} summary={t('summary')} updated={t('updated')} sections={sections} />;
}
