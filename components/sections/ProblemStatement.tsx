'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export const ProblemStatement: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center py-20 md:py-28 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-navy to-brand-dark" />

      {/* Subtle ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Your Guests Can Hear the{' '}
              <span className="gradient-text">Difference</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
              <p>
                Music shapes how people feel in your space. It affects how long they stay, how much they spend, and whether they come back.
              </p>
              <p>
                <span className="font-headline text-brand-orange font-semibold text-2xl block mb-2">37%</span>
                revenue impact when background music is designed intentionally — not left to chance.
              </p>
              <p>
                Yet most businesses still use personal Spotify accounts, risking copyright fines and delivering an inconsistent experience.
              </p>
            </div>
            <Link href="/licensing" className="inline-block mt-8">
              <span className="text-brand-orange hover:text-brand-orange-light transition-colors font-medium">
                Learn about music licensing →
              </span>
            </Link>
          </motion.div>

          {/* Visual stat */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
              {/* Glowing circle */}
              <div className="absolute inset-0 rounded-full bg-brand-orange/5 blur-xl" />
              <div className="absolute inset-4 rounded-full border border-brand-orange/20" />
              <div className="absolute inset-8 rounded-full border border-brand-orange/10" />
              <div className="text-center relative z-10">
                <span className="font-headline text-6xl md:text-7xl font-bold text-brand-orange block">
                  93%
                </span>
                <span className="text-gray-400 text-sm mt-2 block">
                  of guests say music<br />differentiates their experience
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;
