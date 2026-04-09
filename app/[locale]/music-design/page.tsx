'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * Music Design page — editorial intro + embedded Music Design Assistant tool
 */
export default function MusicDesignPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-lounge.webp"
            alt="Premium venue with ambient lighting"
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-[#0f0f0f]/80 to-[#0f0f0f]" />
        </div>
        <div className="relative z-10 container mx-auto px-6 md:px-12">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-label text-brand-orange text-sm tracking-[0.3em] uppercase mb-6 block">
                Bespoke Curation
              </span>
              <h1 className="font-headline text-5xl md:text-7xl leading-none tracking-tight text-white mb-6">
                Design Your <br />
                <span className="italic text-brand-orange">Sound</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed">
                Tell us about your venue, your brand, and the atmosphere you want to create. Our AI music designer will craft a personalized recommendation in minutes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-8 px-6 md:px-12 bg-[#0f0f0f] border-y border-white/5">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { value: '100M+', label: 'Tracks Available' },
            { value: '50+', label: 'Genre Categories' },
            { value: '48h', label: 'Design Turnaround' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-headline text-2xl md:text-3xl text-brand-orange">{stat.value}</p>
              <p className="font-label text-xs text-white/40 uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Embedded Music Design Tool */}
      <section className="w-full bg-[#0f0f0f]">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
          <p className="font-label text-brand-orange text-xs tracking-[0.3em] uppercase mb-4">Interactive Tool</p>
          <h2 className="font-headline text-2xl md:text-3xl text-white mb-8">
            Start your music brief below
          </h2>
        </div>
        <iframe
          src="https://bmasia-music-brief-v2.onrender.com/?embed=true"
          className="w-full border-0"
          style={{ height: 'calc(100vh - 80px)', minHeight: '700px' }}
          title="BMAsia Music Design Assistant"
          allow="microphone"
          loading="lazy"
        />
      </section>
    </>
  );
}
