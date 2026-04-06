'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export const SolutionsSplit: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-brand-dark" />

      <div className="relative z-10 w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center py-16 px-4"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white" style={{ fontFamily: "'Libre Caslon Text', serif" }}>
            Two Solutions.{' '}
            <span className="gradient-text">One Mission.</span>
          </h2>
        </motion.div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Soundtrack Your Brand — RED */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative py-16 md:py-24 px-8 md:px-16 border-t border-r border-white/[0.06]"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF3B30] to-[#FF3B30]/40" />
            <div className="max-w-lg">
              <span className="text-[#FF3B30] text-sm font-semibold uppercase tracking-widest font-mono">Premium</span>
              <h3 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4" style={{ fontFamily: "'Libre Caslon Text', serif" }}>
                Soundtrack Your Brand
              </h3>
              <p className="text-2xl text-gray-300 mb-8 font-light">
                150 million tracks. Any artist. Any genre.
              </p>
              <div className="space-y-4 mb-10">
                <p className="text-gray-400 leading-relaxed">
                  Access the world's largest commercial music library. Sync with Spotify, create custom playlists, and schedule music that evolves throughout the day.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Bespoke music design by our team — refreshed quarterly. Full scheduling, text-to-speech messaging, and multi-zone control.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Recording and publishing licenses included. Available on iOS, Android, and Windows.
                </p>
              </div>
              <Link href="/quotation">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block bg-[#FF3B30] hover:bg-[#E0342B] text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg shadow-[#FF3B30]/20"
                >
                  Get a Quote
                </motion.span>
              </Link>
            </div>
          </motion.div>

          {/* Beat Breeze — GOLD */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative py-16 md:py-24 px-8 md:px-16 border-t border-white/[0.06]"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange to-brand-orange/40" />
            <div className="max-w-lg">
              <span className="text-brand-orange text-sm font-semibold uppercase tracking-widest font-mono">All Licenses Included</span>
              <h3 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4" style={{ fontFamily: "'Libre Caslon Text', serif" }}>
                Beat Breeze
              </h3>
              <p className="text-2xl text-gray-300 mb-8 font-light">
                100,000 royalty-free tracks. Every license included.
              </p>
              <div className="space-y-4 mb-10">
                <p className="text-gray-400 leading-relaxed">
                  Professionally curated music with all three licenses built in — recording, publishing, and public performance. No collection society fees. No compliance paperwork.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Multi-zone scheduling, integrated messaging, and offline playback. Runs on Android and Windows devices.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  The simplest way to play legal music in your business. We handle everything.
                </p>
              </div>
              <Link href="/quotation">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg shadow-brand-orange/20"
                >
                  Get a Quote
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Center divider CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center py-8 border-t border-white/[0.06]"
        >
          <p className="text-gray-500">
            Not sure which one?{' '}
            <button className="text-brand-orange hover:text-brand-orange-light transition-colors font-medium">
              Talk to us →
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsSplit;
