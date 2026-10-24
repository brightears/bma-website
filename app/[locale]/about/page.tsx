'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MotionConfig, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowDown, ArrowRight, ArrowUpRight, Mail } from 'lucide-react';
import { SITE, SOLUTIONS_CATEGORIES } from '@/lib/constants';
import { ClientLogos } from '@/components/sections/ClientLogos';
import { VerifyContacts } from '@/components/sections/VerifyContacts';

const FACTS = ['founded', 'hours', 'global'] as const;
const STEPS = ['01', '02', '03', '04'] as const;
const BEAT_BREEZE_ABOUT_URL = 'https://beatbreeze.io/about';

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-8%' },
  transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
} as const;

export default function AboutPage() {
  const t = useTranslations('aboutPage');
  const navigation = useTranslations('navigation');
  const immersive = useTranslations('homePage.immersive.paths');
  const locale = useLocale();
  const local = (path: string) => `/${locale}${path}`;

  return (
    <MotionConfig reducedMotion="user">
      <div className="overflow-hidden bg-[#06111a]">
        <section className="relative border-b border-white/[0.08] px-5 pb-20 pt-32 sm:px-8 sm:pb-24 sm:pt-40 lg:px-16">
          <div className="bma-grid-lines absolute inset-0 opacity-20" aria-hidden="true" />
          <div className="absolute -left-24 top-48 h-80 w-80 rounded-full bg-[#ef9f2f]/[0.08] blur-[100px]" aria-hidden="true" />
          <div className="absolute right-0 top-16 h-[34rem] w-[45rem] max-w-[72vw] rounded-full bg-[#23cfc2]/[0.07] blur-[130px]" aria-hidden="true" />

          <div className="bma-container relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <motion.div {...reveal}>
              <p className="bma-kicker">{t('hero.label')}</p>
              <h1 className="bma-display bma-page-title mt-7 max-w-[14ch] text-balance text-white">
                {t('hero.title')} <span className="gradient-text">{t('hero.titleHighlight')}</span>
              </h1>
              <p className="bma-lede mt-8 max-w-2xl">{t('hero.subtitle')}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href={local('/quotation?source=about-hero')} className="bma-button-primary">
                  {navigation('talkToBMAsia')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a href="#approach" className="bma-button-secondary">
                  {t('hero.secondaryCta')} <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </motion.div>

            <motion.div {...reveal} className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/[0.1]">
                <Image
                  src="/images/about-studio.webp"
                  alt={t('hero.imageAlt')}
                  fill
                  priority
                  className="object-cover opacity-70"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06111a] via-[#06111a]/30 to-transparent" aria-hidden="true" />
              </div>
              <dl className="relative -mt-16 mx-4 grid gap-px overflow-hidden rounded-[1.4rem] border border-white/[0.1] bg-white/[0.08] sm:mx-6 sm:grid-cols-3">
                {FACTS.map((key) => (
                  <div key={key} className="flex min-w-0 flex-col-reverse justify-end gap-2 bg-[#0a1823]/95 p-5 backdrop-blur-md lg:p-4 xl:p-5">
                    <dt className="text-sm leading-5 text-white/52">{t(`hero.facts.${key}.label`)}</dt>
                    <dd className="font-headline text-3xl font-medium tracking-[-0.04em] text-white lg:text-2xl xl:text-3xl">{t(`hero.facts.${key}.value`)}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        </section>

        <section className="bma-section">
          <div className="bma-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <motion.div {...reveal}>
              <p className="bma-kicker">{t('who.label')}</p>
              <h2 className="bma-section-title mt-5 max-w-xl text-balance text-white">{t('who.title')}</h2>
            </motion.div>
            <motion.div {...reveal} className="space-y-6 text-lg leading-8 text-white/60">
              <p>{t('who.p1')}</p>
              <p>{t('who.p2')}</p>
            </motion.div>
          </div>
        </section>

        <section id="approach" className="scroll-mt-24 border-y border-white/[0.08] bg-[#07141f] px-5 py-20 sm:px-8 sm:py-28 lg:px-16">
          <div className="bma-container">
            <motion.div {...reveal} className="grid gap-9 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
              <div>
                <p className="bma-kicker">{t('approach.label')}</p>
                <h2 className="bma-section-title mt-5 max-w-xl text-balance text-white">{t('approach.title')}</h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-white/52 lg:justify-self-end">{t('approach.description')}</p>
            </motion.div>

            <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((id, index) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-8%' }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="rounded-[1.6rem] border border-white/[0.09] bg-[#0a1823]/90 p-6 sm:p-7"
                >
                  <span className="font-label text-[0.7rem] tracking-[0.2em] text-[#f0a539]">{id}</span>
                  <h3 className="mt-5 font-headline text-2xl font-medium tracking-[-0.035em] text-white">{t(`approach.steps.${id}.title`)}</h3>
                  <p className="mt-4 text-sm leading-6 text-white/52">{t(`approach.steps.${id}.desc`)}</p>
                </motion.li>
              ))}
            </ol>

            <Link href={local('/how-it-works')} className="bma-text-link mt-10">
              {t('approach.cta')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="bma-section">
          <div className="bma-container">
            <motion.div {...reveal} className="max-w-3xl">
              <p className="bma-kicker">{t('routes.label')}</p>
              <h2 className="bma-section-title mt-5 text-balance text-white">{t('routes.title')}</h2>
              <p className="mt-5 text-lg leading-8 text-white/52">{t('routes.description')}</p>
            </motion.div>

            <div className="mt-14 grid gap-5 lg:grid-cols-2">
              <RouteCard
                image="/images/product-bb-hero.webp"
                eyebrow={t('routes.beatBreeze.label')}
                title="Beat Breeze"
                text={t('routes.beatBreeze.text')}
                accent="text-[#f0a539]"
                border="border-[#f0a539]/22 hover:border-[#f0a539]/45"
              >
                <Link href={local('/beat-breeze')} className="bma-text-link">
                  {t('routes.beatBreeze.cta')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a href={BEAT_BREEZE_ABOUT_URL} className="inline-flex items-center gap-2 font-label text-sm font-semibold text-white/62 transition-colors hover:text-white">
                  {t('routes.beatBreeze.aboutLink')} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </RouteCard>

              <RouteCard
                image="/images/product-syb-hero.webp"
                eyebrow={t('routes.soundtrack.label')}
                title="Soundtrack"
                text={t('routes.soundtrack.text')}
                accent="text-[#d6c2ff]"
                border="border-[#d6c2ff]/20 hover:border-[#d6c2ff]/42"
              >
                <Link href={local('/soundtrack-your-brand')} className="inline-flex items-center gap-2 font-label text-sm font-semibold text-[#d6c2ff] transition-colors hover:text-white">
                  {t('routes.soundtrack.cta')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </RouteCard>
            </div>

            <Link href={local('/quotation?source=about-routes')} className="bma-text-link mt-10">
              {immersive('helpDecision')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="border-y border-white/[0.08] bg-[#07141f] px-5 py-20 sm:px-8 sm:py-24 lg:px-16">
          <motion.div {...reveal} className="bma-container grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
            <div>
              <p className="bma-kicker">{t('licensing.label')}</p>
              <h2 className="bma-section-title mt-5 max-w-xl text-balance text-white">{t('licensing.title')}</h2>
            </div>
            <div>
              <p className="text-lg leading-8 text-white/56">{t('licensing.description')}</p>
              <Link href={local('/licensing')} className="bma-button-secondary mt-8">
                {t('licensing.cta')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </section>

        <section className="bma-section">
          <div className="bma-container">
            <motion.div {...reveal} className="max-w-3xl">
              <p className="bma-kicker">{t('venues.label')}</p>
              <h2 className="bma-section-title mt-5 text-balance text-white">{t('venues.title')}</h2>
              <p className="mt-5 text-lg leading-8 text-white/52">{t('venues.description')}</p>
            </motion.div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {SOLUTIONS_CATEGORIES.map((category) => (
                <motion.div key={category.categoryKey} {...reveal} className="bma-panel rounded-[1.6rem] p-6 sm:p-7">
                  <h3 className="font-label text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/40">
                    {navigation(`solutionCategories.${category.categoryKey}`)}
                  </h3>
                  <ul className="mt-5 divide-y divide-white/[0.07]">
                    {category.links.map((link) => (
                      <li key={link.href}>
                        <Link href={local(link.href)} className="group flex items-center justify-between gap-4 py-3.5 text-base text-white/72 transition-colors hover:text-white">
                          {navigation(`solutionCategories.${link.labelKey}`)}
                          <ArrowRight className="h-4 w-4 text-[#f0a539] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <ClientLogos />

        <section className="bma-section">
          <div className="bma-container grid gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div {...reveal}>
              <p className="bma-kicker">{t('company.label')}</p>
              <h2 className="bma-section-title mt-5 max-w-xl text-balance text-white">{t('company.title')}</h2>
              <dl className="mt-10 divide-y divide-white/[0.08] border-y border-white/[0.08]">
                {(['website', 'beatBreeze', 'founded'] as const).map((key) => (
                  <div key={key} className="grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                    <dt className="font-label text-sm text-white/40">{t(`company.${key}Label`)}</dt>
                    <dd className="text-base leading-7 text-white/76">{t(`company.${key}Value`)}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm leading-6 text-white/48">
                {t.rich('company.legalNote', {
                  terms: (chunks) => <Link href={local('/terms')} className="text-[#f0a539] underline-offset-4 hover:underline">{chunks}</Link>,
                  privacy: (chunks) => <Link href={local('/privacy')} className="text-[#f0a539] underline-offset-4 hover:underline">{chunks}</Link>,
                })}
              </p>
            </motion.div>

            <motion.div {...reveal} id="contact" className="scroll-mt-24">
              <p className="bma-kicker">{t('contact.label')}</p>
              <h2 className="bma-section-title mt-5 max-w-xl text-balance text-white">{t('contact.title')}</h2>
              <p className="mt-5 text-lg leading-8 text-white/52">{t('contact.description')}</p>
              <a href={`mailto:${SITE.email}`} className="mt-8 flex items-center gap-3 text-white/80 transition-colors hover:text-[#f0a539]">
                <Mail className="h-5 w-5 text-[#f0a539]" aria-hidden="true" />
                <span className="sr-only">{t('contact.emailLabel')}: </span>
                {SITE.email}
              </a>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={local('/quotation?source=about-contact')} className="bma-button-primary">
                  {t('contact.quoteCta')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href={local('/book-demo?source=about')} className="bma-button-secondary">
                  {t('contact.demoCta')}
                </Link>
              </div>
              <VerifyContacts className="mt-10" />
            </motion.div>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}

function RouteCard({
  image,
  eyebrow,
  title,
  text,
  accent,
  border,
  children,
}: {
  image: string;
  eyebrow: string;
  title: string;
  text: string;
  accent: string;
  border: string;
  children: ReactNode;
}) {
  return (
    <motion.article {...reveal} className={`overflow-hidden rounded-[2rem] border bg-[#0a1823]/90 transition-colors ${border}`}>
      <div className="relative aspect-[16/9]">
        <Image src={image} alt="" fill className="object-cover opacity-70" sizes="(min-width: 1024px) 45vw, 100vw" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1823] via-[#0a1823]/30 to-transparent" aria-hidden="true" />
      </div>
      <div className="p-6 sm:p-8">
        <p className={`font-label text-[0.7rem] font-semibold uppercase tracking-[0.2em] ${accent}`}>{eyebrow}</p>
        <h3 className="mt-3 font-headline text-3xl font-medium tracking-[-0.04em] text-white lg:text-2xl xl:text-3xl">{title}</h3>
        <p className="mt-4 max-w-xl text-base leading-7 text-white/56">{text}</p>
        <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">{children}</div>
      </div>
    </motion.article>
  );
}
