'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { SITE, SOCIAL } from '@/lib/constants';
import { WhatsAppLink, LineLink } from '@/components/icons';

const QuotationForm = dynamic(
  () => import('@/components/forms/QuotationForm').then((mod) => mod.QuotationForm),
  {
    loading: () => (
      <div className="space-y-5 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-24 bg-white/10 rounded" />
            <div className="h-12 bg-white/5 border border-white/10 rounded-lg" />
          </div>
        ))}
        <div className="h-14 bg-brand-orange/20 rounded-lg" />
      </div>
    ),
    ssr: false,
  }
);

const EXPECT_ITEMS = ['fastResponse', 'noObligation', 'tailored'] as const;

export default function QuotationPage() {
  const t = useTranslations('quotationPage');

  return (
    <>
      {/* Main Content */}
      <section className="pt-28 md:pt-36 pb-20 md:pb-32 px-6 md:px-12 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Column — Context */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-label text-brand-orange text-sm tracking-[0.3em] uppercase mb-6 block">
                {t('hero.label')}
              </span>
              <h1 className="font-headline text-5xl md:text-7xl leading-none text-white mb-6">
                {t('hero.title')} <span className="italic text-brand-orange">{t('hero.titleHighlight')}</span>
              </h1>
              <p className="text-xl text-white/60 leading-relaxed mb-16 max-w-lg">
                {t('hero.subtitle')}
              </p>

              {/* What to Expect */}
              <div className="mb-14">
                <h2 className="font-label text-xs tracking-[0.3em] uppercase text-white/50 mb-8">{t('whatToExpect.sectionTitle')}</h2>
                <div className="space-y-6">
                  {EXPECT_ITEMS.map((key) => (
                    <div key={key} className="flex items-start gap-4 border-l border-brand-orange/30 pl-6">
                      <div>
                        <h3 className="text-white font-medium mb-1">{t(`whatToExpect.${key}.title`)}</h3>
                        <p className="text-white/60 text-sm">{t(`whatToExpect.${key}.desc`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Our Solutions */}
              <div className="mb-14">
                <h2 className="font-label text-xs tracking-[0.3em] uppercase text-white/50 mb-8">{t('ourSolutions.sectionTitle')}</h2>
                <div className="space-y-4">
                  <div className="border-l-2 border-brand-red pl-6">
                    <h3 className="font-headline text-xl text-white">Soundtrack Your Brand</h3>
                    <p className="text-white/60 text-sm mt-1">{t('ourSolutions.sybTagline')}</p>
                  </div>
                  <div className="border-l-2 border-brand-orange pl-6">
                    <h3 className="font-headline text-xl text-white">Beat Breeze</h3>
                    <p className="text-white/60 text-sm mt-1">{t('ourSolutions.bbTagline')}</p>
                  </div>
                </div>
                <Link href="/how-it-works" className="inline-block mt-6 text-brand-orange hover:text-white text-sm font-label tracking-wide transition-colors">
                  {t('ourSolutions.learnMore')}
                </Link>
              </div>

              {/* Contact */}
              <div>
                <h2 className="font-label text-xs tracking-[0.3em] uppercase text-white/50 mb-6">{t('questions.sectionTitle')}</h2>
                <div className="flex items-center gap-6">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-white/60 hover:text-brand-orange transition-colors text-sm"
                  >
                    {SITE.email}
                  </a>
                  <WhatsAppLink href={SOCIAL.whatsapp} size={20} />
                  <LineLink href={SOCIAL.line} size={20} />
                </div>
              </div>
            </motion.div>

            {/* Right Column — Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-[#161616] border border-white/10 p-8 md:p-10">
                <h2 className="font-headline text-2xl text-white mb-2">{t('formHeader.title')}</h2>
                <p className="text-white/60 text-sm mb-8">
                  {t('formHeader.subtitle')}
                </p>
                <QuotationForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-[#0f0f0f] border-t border-white/10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-headline text-3xl md:text-4xl text-white mb-4">
            {t('demoCta.title')} <span className="italic text-brand-orange">{t('demoCta.titleHighlight')}</span>
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
            {t('demoCta.subtitle')}
          </p>
          <a
            href="https://calendly.com/bmasia/sound-innovations"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-white/20 text-white px-12 py-5 font-label font-bold uppercase tracking-widest hover:border-brand-orange hover:text-brand-orange transition-all duration-300"
          >
            {t('demoCta.ctaButton')}
          </a>
        </motion.div>
      </section>
    </>
  );
}
