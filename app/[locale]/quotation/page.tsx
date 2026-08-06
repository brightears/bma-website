'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowDownRight, ArrowRight, CircleCheck, Headphones, Music2 } from 'lucide-react';
import { SITE, SOCIAL } from '@/lib/constants';
import { LineLink, WhatsAppLink } from '@/components/icons';

const QuotationForm = dynamic(() => import('@/components/forms/QuotationForm').then((mod) => mod.QuotationForm), {
  ssr: false,
  loading: () => <QuotationFormLoading />,
});

function QuotationFormLoading() {
  const t = useTranslations('quotationPage');
  return <div className="min-h-[52rem] animate-pulse rounded-[1.75rem] bg-white/[0.025]" role="status" aria-label={t('interface.formLoading')} />;
}

const EXPECT_ITEMS = ['fastResponse', 'noObligation', 'tailored'] as const;

const VENUE_FRAMES = [
  { src: '/images/hero-hotel.webp', className: 'left-0 top-7 w-[48%] rotate-[-3deg]' },
  { src: '/images/hero-restaurant.webp', className: 'left-[29%] top-0 z-10 w-[46%] rotate-[1deg]' },
  { src: '/images/hero-retail.webp', className: 'right-0 top-9 w-[43%] rotate-[3deg]' },
] as const;

export default function QuotationPage() {
  const t = useTranslations('quotationPage');
  const locale = useLocale();

  return (
    <div className="relative overflow-hidden bg-[#06111a]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[82rem] bg-[radial-gradient(circle_at_18%_18%,rgba(239,166,52,.14),transparent_28%),radial-gradient(circle_at_82%_32%,rgba(73,213,197,.12),transparent_31%)]" aria-hidden="true" />
      <div className="bma-grid-lines pointer-events-none absolute inset-x-0 top-0 h-[82rem] opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" aria-hidden="true" />

      <section className="relative px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40 lg:px-16">
        <div className="bma-container grid gap-14 xl:grid-cols-[minmax(0,.86fr)_minmax(38rem,1.14fr)] xl:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="xl:sticky xl:top-28 xl:self-start"
          >
            <p className="bma-kicker">{t('hero.label')}</p>
            <h1 className="bma-display bma-page-title mt-6 max-w-3xl">
              {t('hero.title')}{' '}
              <span className="bg-[linear-gradient(96deg,#efa634_0%,#e7c762_46%,#49d5c5_100%)] bg-clip-text text-transparent">
                {t('hero.titleHighlight')}
              </span>
            </h1>
            <p className="bma-lede mt-7 max-w-xl">{t('hero.subtitle')}</p>

            <VenueSignal label={t('formHeader.title')} />

            <div className="mt-9 border-y border-white/[0.09]">
              {EXPECT_ITEMS.map((key, index) => (
                <div key={key} className="grid grid-cols-[2.25rem_1fr] gap-4 border-t border-white/[0.08] py-5 first:border-t-0">
                  <span className="font-mono text-xs text-[#49d5c5]/70">0{index + 1}</span>
                  <div>
                    <h3 className="font-label text-sm font-semibold text-white">{t(`whatToExpect.${key}.title`)}</h3>
                    <p className="mt-1 max-w-xl text-sm leading-6 text-white/44">{t(`whatToExpect.${key}.desc`)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a href={`mailto:${SITE.email}`} className="font-label text-xs tracking-[0.04em] text-white/48 transition hover:text-[#efa634]">{SITE.email}</a>
              <span className="h-4 w-px bg-white/10" aria-hidden="true" />
              <WhatsAppLink href={SOCIAL.whatsapp} size={19} />
              <LineLink href={SOCIAL.line} size={19} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="relative"
          >
            <div className="pointer-events-none absolute -inset-px rounded-[2rem] bg-[linear-gradient(135deg,rgba(239,166,52,.5),rgba(255,255,255,.08)_34%,rgba(73,213,197,.42))] opacity-70" aria-hidden="true" />
            <div className="bma-grain relative overflow-hidden rounded-[calc(2rem-1px)] bg-[#081923]/[0.98] p-5 shadow-[0_38px_120px_rgba(0,0,0,.4)] sm:p-8 lg:p-10">
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#49d5c5]/[0.055] blur-3xl" aria-hidden="true" />
              <div className="relative mb-8 flex flex-col gap-5 border-b border-white/[0.08] pb-7 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-label text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#efa634]">{t('interface.venueBrief')}</p>
                  <h2 className="bma-subsection-title mt-4 text-white">{t('formHeader.title')}</h2>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/46 sm:text-base sm:leading-7">{t('formHeader.subtitle')}</p>
                </div>
                <div className="hidden h-12 w-12 shrink-0 place-items-center rounded-full border border-[#49d5c5]/20 bg-[#49d5c5]/[0.055] text-[#49d5c5] sm:grid" aria-hidden="true">
                  <ArrowDownRight className="h-5 w-5" />
                </div>
              </div>
              <div className="relative"><QuotationForm /></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative border-t border-white/[0.08] bg-[#07151f] px-5 py-20 sm:px-8 lg:px-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_100%,rgba(239,166,52,.12),transparent_34%),radial-gradient(circle_at_82%_0,rgba(73,213,197,.08),transparent_31%)]" aria-hidden="true" />
        <div className="bma-container relative grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
          <div>
            <p className="bma-kicker">{t('interface.liveWalkthrough')}</p>
            <h2 className="bma-section-title mt-5 max-w-2xl text-white">
              {t('demoCta.title')}{' '}
              <span className="bg-[linear-gradient(96deg,#efa634,#e7c762,#49d5c5)] bg-clip-text text-transparent">{t('demoCta.titleHighlight')}</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/48">{t('demoCta.subtitle')}</p>
            <Link href={`/${locale}/book-demo?source=quotation`} className="bma-button-secondary mt-8 min-h-14 px-7">
              {t('demoCta.ctaButton')} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <ProductRoute
              href={`/${locale}/beat-breeze`}
              Icon={Music2}
              title={t('interface.beatBreeze')}
              description={t('ourSolutions.bbTagline')}
              className="border-[#49d5c5]/18 bg-[linear-gradient(145deg,rgba(239,166,52,.075),rgba(73,213,197,.035))]"
              iconClassName="text-[#49d5c5]"
            />
            <ProductRoute
              href={`/${locale}/soundtrack-your-brand`}
              Icon={Headphones}
              title={t('interface.soundtrack')}
              description={t('ourSolutions.sybTagline')}
              className="border-[#d6c2ff]/18 bg-[linear-gradient(145deg,rgba(214,194,255,.075),rgba(61,29,75,.09))]"
              iconClassName="text-[#d6c2ff]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function VenueSignal({ label }: { label: string }) {
  return (
    <div className="relative mt-10 h-44 max-w-xl overflow-hidden rounded-[1.4rem] border border-white/[0.09] bg-[#081722] sm:h-52" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(73,213,197,.09),transparent_58%)]" />
      {VENUE_FRAMES.map((frame, index) => (
        <motion.div
          key={frame.src}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 + index * 0.1, duration: 0.6 }}
          className={`absolute aspect-[4/3] overflow-hidden rounded-[1.05rem] border border-white/15 shadow-2xl ${frame.className}`}
        >
          <Image src={frame.src} alt="" fill sizes="240px" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(5,15,24,.72))]" />
        </motion.div>
      ))}
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between border-t border-white/[0.08] bg-[#06111a]/80 px-4 py-3 backdrop-blur-xl">
        <span className="flex items-center gap-2 font-label text-[0.62rem] uppercase tracking-[0.17em] text-white/48"><CircleCheck className="h-3.5 w-3.5 text-[#49d5c5]" /> {label}</span>
        <span className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10"><motion.i className="block h-full rounded-full bg-[linear-gradient(90deg,#efa634,#49d5c5)]" animate={{ width: ['24%', '88%', '46%'] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} /></span>
      </div>
    </div>
  );
}

function ProductRoute({ href, Icon, title, description, className, iconClassName }: {
  href: string;
  Icon: typeof Music2;
  title: string;
  description: string;
  className: string;
  iconClassName: string;
}) {
  return (
    <Link href={href} className={`group relative min-h-60 overflow-hidden rounded-[1.5rem] border p-6 transition hover:-translate-y-1 hover:border-white/25 ${className}`}>
      <Icon className={`h-5 w-5 ${iconClassName}`} aria-hidden="true" />
      <h3 className="mt-14 font-headline text-2xl font-medium tracking-[-0.04em] text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-white/43">{description}</p>
      <ArrowRight className="absolute right-5 top-5 h-4 w-4 text-white/30 transition group-hover:translate-x-1 group-hover:text-white" aria-hidden="true" />
    </Link>
  );
}
