'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HeroChat, ClientLogos } from '@/components/sections';

/**
 * BMAsia Homepage — Variant C: Fashion-Forward Editorial
 * Design source: Google Stitch (Fashion Editorial variant)
 * HTML ported directly from Stitch output — faithful implementation
 */
export default function Home() {
  return (
    <>
      {/* ===== HERO — Light cream, typographic ===== */}
      <header className="relative min-h-screen bg-[#F5F5F0] flex flex-col md:flex-row items-center px-12 pt-32 overflow-hidden">
        <div className="w-full md:w-3/5 z-10">
          <h1 className="font-headline text-black text-7xl md:text-9xl leading-[0.9] tracking-tight mb-8">
            Sound is the new luxury
          </h1>
          <p className="font-sans text-black/60 text-xl md:text-2xl max-w-lg mb-12">
            Background music designed for brands that care.
          </p>
          <div className="flex gap-8 items-center mb-12">
            <Link href="/quotation" className="font-label text-black text-lg border-b border-black pb-1 hover:border-brand-orange transition-all">
              Get started →
            </Link>
            <a href="/listen" className="font-label text-black text-lg border-b border-black pb-1 hover:border-brand-orange transition-all">
              Listen to samples ↗
            </a>
          </div>
          {/* AI Chat — visible on desktop */}
          <div className="hidden md:block max-w-md">
            <HeroChat />
          </div>
        </div>
        <div className="relative w-full md:w-2/5 h-[600px] mt-12 md:mt-0">
          <div className="absolute inset-0 overflow-hidden rounded-sm rotate-2 shadow-2xl">
            <Image
              src="/images/hero-lounge.webp"
              alt="Atmospheric luxury venue interior"
              fill
              priority
              className="object-cover grayscale brightness-75 hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>
      </header>

      {/* ===== STATEMENT — Dark, typographic client list ===== */}
      <section className="bg-[#0f0f0f] py-32 px-12 border-y border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-sans text-3xl md:text-5xl text-white font-light leading-snug tracking-tighter opacity-90">
            We work with <span className="text-brand-orange italic">Hilton.</span> Accor. Shangri-La. Google. WPP. And 500+ venues that <span className="underline decoration-brand-orange underline-offset-8">refuse</span> to play Spotify.
          </p>
        </div>
      </section>

      {/* ===== PRODUCTS — Split screen, pure typography ===== */}
      <section className="flex flex-col md:flex-row min-h-screen">
        {/* Soundtrack Your Brand — White */}
        <div className="w-full md:w-1/2 bg-white px-12 py-32 flex flex-col justify-center items-start border-r border-black/5">
          <div className="w-12 h-1 bg-brand-red mb-8" />
          <h2 className="font-headline text-black text-6xl mb-6">Soundtrack<br />Your Brand</h2>
          <p className="font-sans text-gray-600 text-lg max-w-sm mb-4">
            The world&apos;s largest catalog for business. 100 million tracks licensed for commercial use.
          </p>
          <p className="font-sans text-gray-400 text-sm max-w-sm mb-12">
            Recording + publishing licenses included. Public performance license required separately.
          </p>
          <Link href="/quotation" className="font-label text-black text-sm uppercase tracking-widest hover:text-brand-red transition-colors">
            Explore →
          </Link>
        </div>
        {/* Beat Breeze — Dark */}
        <div className="w-full md:w-1/2 bg-[#0f0f0f] px-12 py-32 flex flex-col justify-center items-start">
          <div className="w-12 h-1 bg-brand-orange mb-8" />
          <h2 className="font-headline text-white text-6xl mb-6">Beat<br />Breeze</h2>
          <p className="font-sans text-gray-400 text-lg max-w-sm mb-4">
            Hand-curated mixes with all licensing fees included. One flat price for pure atmosphere.
          </p>
          <p className="font-sans text-gray-500 text-sm max-w-sm mb-12">
            All 3 licenses included — recording, publishing, and public performance. No extras.
          </p>
          <Link href="/quotation" className="font-label text-brand-orange text-sm uppercase tracking-widest hover:text-white transition-colors">
            Discover →
          </Link>
        </div>
      </section>

      {/* ===== EDITORIAL — Full bleed photo with stat ===== */}
      <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-restaurant.webp"
          alt="Atmospheric dark luxury cocktail bar"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-6">
          <h2 className="font-headline text-white text-7xl md:text-9xl mb-4">9.1% higher revenue.</h2>
          <p className="font-sans text-brand-orange text-2xl md:text-3xl tracking-tight">That&apos;s what curated music does.</p>
          <p className="font-label text-gray-500 text-xs mt-6">
            Source: <a href="https://www.soundtrack.io/research/" target="_blank" rel="noopener noreferrer" className="text-brand-orange/70 hover:text-brand-orange">Soundtrack Research</a> — 1.8M purchases, 16 locations
          </p>
        </div>
      </section>

      {/* ===== INDUSTRIES — Horizontal scrolling text ===== */}
      <section className="py-32 bg-[#F5F5F0] overflow-hidden">
        <div className="px-12 mb-16">
          <span className="font-label text-black/40 uppercase tracking-widest text-xs">Sectors we elevate</span>
        </div>
        <div className="flex gap-20 overflow-x-auto px-12 whitespace-nowrap pb-12" style={{ scrollbarWidth: 'none' }}>
          {[
            { name: 'Hotels', href: '/solutions/hotels' },
            { name: 'Restaurants', href: '/solutions/restaurants' },
            { name: 'Retail', href: '/solutions/retail' },
            { name: 'Cafés', href: '/quotation' },
            { name: 'Medical', href: '/quotation' },
            { name: 'Fitness', href: '/quotation' },
          ].map((industry) => (
            <Link
              key={industry.name}
              href={industry.href}
              className="font-headline text-black text-8xl opacity-30 hover:opacity-100 transition-opacity underline decoration-brand-orange/0 hover:decoration-brand-orange underline-offset-[16px]"
            >
              {industry.name}
            </Link>
          ))}
        </div>
      </section>

      {/* ===== PROCESS — Massive stacked words ===== */}
      <section className="py-32 bg-[#0f0f0f] px-12">
        <div className="max-w-4xl mx-auto space-y-32">
          <div className="group">
            <h3 className="font-headline text-white text-8xl md:text-[10rem] leading-none mb-4">
              Listen<span className="text-brand-orange">.</span>
            </h3>
            <p className="font-sans text-gray-500 text-xl max-w-md ml-2 group-hover:text-gray-300 transition-colors">
              We deep dive into your brand architecture to understand the emotional frequency of your space.
            </p>
          </div>
          <div className="group text-right">
            <h3 className="font-headline text-white text-8xl md:text-[10rem] leading-none mb-4">
              Design<span className="text-brand-orange">.</span>
            </h3>
            <p className="font-sans text-gray-500 text-xl max-w-md ml-auto mr-2 group-hover:text-gray-300 transition-colors">
              Our curators build bespoke sonic identities, layering moods that shift seamlessly from sunrise to moonlight.
            </p>
          </div>
          <div className="group">
            <h3 className="font-headline text-white text-8xl md:text-[10rem] leading-none mb-4">
              Deliver<span className="text-brand-orange">.</span>
            </h3>
            <p className="font-sans text-gray-500 text-xl max-w-md ml-2 group-hover:text-gray-300 transition-colors">
              Zero-touch hardware or app integration. Automated scheduling. Remote management across all your locations.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CLIENT LOGOS ===== */}
      <ClientLogos />

      {/* ===== CTA — Clean white, massive type ===== */}
      <section className="bg-white py-48 px-12 text-center" id="demo">
        <h2 className="font-headline text-black text-9xl md:text-[14rem] leading-none mb-16 tracking-tighter">
          Let&apos;s talk.
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24">
          <Link href="/quotation" className="font-label text-black text-2xl hover:text-brand-orange transition-colors border-b-2 border-black/10 pb-2">
            Quote →
          </Link>
          <a href="https://calendly.com/bmasia/sound-innovations" target="_blank" rel="noopener noreferrer" className="font-label text-black text-2xl hover:text-brand-orange transition-colors border-b-2 border-black/10 pb-2">
            Demo →
          </a>
          <a href="mailto:info@bmasiamusic.com" className="font-label text-black text-2xl hover:text-brand-orange transition-colors border-b-2 border-black/10 pb-2">
            info@bmasiamusic.com
          </a>
        </div>
      </section>
    </>
  );
}
