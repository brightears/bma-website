'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const LICENSES = [
  { num: '01', title: 'Recording License', desc: 'Covers the right to use a specific recording of a song and compensates the recording artist and their record label.' },
  { num: '02', title: 'Publishing License', desc: 'Covers the right to use the original composition and compensates the songwriters and music composers for their intellectual property.' },
  { num: '03', title: 'Public Performance License', desc: 'Allows you to play the song in a public environment like your business venue, retail space, or restaurant.' },
];

const STREAMING_SERVICES = ['Spotify', 'Apple Music', 'YouTube Music', 'Amazon Music', 'Tidal', 'Deezer'];

export default function LicensingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-retail.webp"
            alt="Premium venue interior"
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-6 md:px-12">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-label text-brand-orange text-sm tracking-[0.3em] uppercase mb-6 block">
                Compliance
              </span>
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight text-white mb-6">
                Music Licensing <br />
                <span className="italic text-brand-orange">Made Simple</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/60 max-w-xl leading-relaxed">
                Understanding the licenses your business needs to stay compliant and support the artists you play.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Licenses Matter — brief intro */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[#0f0f0f] border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed">
              Playing music in a business is different from listening at home. When you use music commercially, you need permission from the rights holders.
            </p>
            <p className="text-xl md:text-2xl text-white mt-4 font-headline">
              Your business needs <span className="text-brand-orange">three different licenses.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Three Licenses */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {LICENSES.map((license, i) => (
              <motion.div
                key={license.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 md:p-12"
              >
                <span className="font-headline text-5xl md:text-6xl text-brand-orange/30 block mb-8">{license.num}.</span>
                <h3 className="font-headline text-2xl md:text-3xl text-white mb-4">{license.title}</h3>
                <p className="text-lg text-white/50 leading-relaxed">{license.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#0f0f0f] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          {/* Red divider with label */}
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-brand-red" />
            <span className="font-label text-brand-red text-xs tracking-[0.2em] font-bold">CRITICAL COMPLIANCE</span>
            <div className="h-px flex-1 bg-brand-red" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-headline text-4xl md:text-6xl text-center leading-tight text-white mb-16">
              Consumer Streaming Services Are <span className="text-brand-red">NOT</span> Licensed for Business Use
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16 text-center opacity-50">
              {STREAMING_SERVICES.map((service) => (
                <span key={service} className="font-label text-xs uppercase tracking-widest text-white">{service}</span>
              ))}
            </div>

            <div className="relative bg-white/5 p-10 md:p-16 border-l-4 border-brand-red">
              <p className="font-headline italic text-xl md:text-2xl text-white/90 leading-relaxed">
                &ldquo;We grant you a limited, non-exclusive, revocable licence to make personal, <span className="underline decoration-brand-red underline-offset-8">non-commercial</span> use of the Spotify Service...&rdquo;
              </p>
              <div className="mt-6 font-label text-brand-red text-sm font-bold uppercase tracking-widest">— Spotify Terms &amp; Conditions</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-headline text-4xl md:text-5xl text-white text-center mb-16"
          >
            Compare Your Solution
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Soundtrack Your Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#161616] p-10 md:p-14 border-t-4 border-brand-red"
            >
              <div className="flex justify-between items-start mb-10">
                <h3 className="font-headline text-3xl text-white">Soundtrack Your Brand</h3>
                <span className="font-label text-brand-red text-xs border border-brand-red px-3 py-1">PREMIUM</span>
              </div>
              <ul className="space-y-6">
                <li className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="text-lg text-white/80">Recording License</span>
                  <span className="text-green-400">✓</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="text-lg text-white/80">Publishing License</span>
                  <span className="text-green-400">✓</span>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <span className="text-lg text-white/80">Public Performance License</span>
                    <p className="text-xs font-label text-white/30 mt-1 uppercase">Local PRO registration required</p>
                  </div>
                  <span className="text-brand-red">⚠</span>
                </li>
              </ul>
            </motion.div>

            {/* Beat Breeze */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#161616] p-10 md:p-14 border-t-4 border-brand-orange"
            >
              <div className="flex justify-between items-start mb-10">
                <h3 className="font-headline text-3xl text-white">Beat Breeze</h3>
                <span className="font-label text-brand-orange text-xs border border-brand-orange px-3 py-1">FULLY LICENSED</span>
              </div>
              <ul className="space-y-6">
                <li className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="text-lg text-white/80">Recording License</span>
                  <span className="text-brand-orange">✓</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="text-lg text-white/80">Publishing License</span>
                  <span className="text-brand-orange">✓</span>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <span className="text-lg text-white/80">Public Performance License</span>
                    <p className="text-xs font-label text-brand-orange mt-1 uppercase">All-inclusive coverage</p>
                  </div>
                  <span className="text-brand-orange">✓</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-36 bg-[#0f0f0f] overflow-hidden text-center">
        <div className="max-w-4xl mx-auto relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-headline text-4xl md:text-6xl text-white mb-12 leading-tight">
              Get Started with <br /><span className="italic text-brand-orange">Licensed Music</span>
            </h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Link href="/quotation" className="bg-brand-orange text-black px-12 py-5 font-label font-bold uppercase tracking-widest hover:bg-white transition-all duration-300">
                Get a Quote
              </Link>
              <a
                href="https://calendly.com/bmasia/sound-innovations"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 text-white px-12 py-5 font-label font-bold uppercase tracking-widest hover:border-brand-orange hover:text-brand-orange transition-all duration-300"
              >
                Book a Demo
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
