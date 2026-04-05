'use client';

import { motion } from 'framer-motion';
import {
  Store,
  Music,
  Clock,
  Shield,
  Headphones,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Volume2,
  ShoppingBag,
  Sparkles,
  Shirt,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const RETAIL_ZONES = [
  { name: 'Fashion & Apparel', mood: 'Trendy, curated, brand-aligned', icon: Shirt },
  { name: 'Shopping Malls', mood: 'Dynamic, energetic, diverse', icon: ShoppingBag },
  { name: 'Beauty & Wellness', mood: 'Calming, luxurious, sensorial', icon: Sparkles },
  { name: 'Showrooms', mood: 'Premium, aspirational, focused', icon: Store },
  { name: 'Supermarkets & F&B Retail', mood: 'Upbeat, familiar, inviting', icon: ShoppingBag },
  { name: 'Gyms & Fitness', mood: 'High-energy, motivating, powerful', icon: Volume2 },
];

const STATS = [
  { value: '37%', label: 'Sales Lift' },
  { value: '31%', label: 'Longer Browsing' },
  { value: '85%', label: 'Brand Recall' },
  { value: '24/7', label: 'Automated' },
];

const BENEFITS = [
  {
    icon: BarChart3,
    title: 'Proven Sales Impact',
    description: 'Retail studies show a 37% sales lift and 31% longer browsing time with strategically chosen background music.',
  },
  {
    icon: Music,
    title: 'Brand-Aligned Curation',
    description: 'Music that reinforces your brand identity. Fast fashion gets different beats than luxury boutiques. We match your vibe precisely.',
  },
  {
    icon: Clock,
    title: 'Peak Hour Scheduling',
    description: 'Automatically shift energy levels — calm morning browsing, upbeat lunch rush, mellow evening wind-down.',
  },
  {
    icon: Shield,
    title: 'Full Licensing Coverage',
    description: 'Beat Breeze includes all licenses. No collection society negotiations. No compliance risk. Just play.',
  },
  {
    icon: Store,
    title: 'Multi-Store Consistency',
    description: 'Roll out the same brand sound across 5 or 500 locations. Centralized control with local flexibility.',
  },
  {
    icon: Headphones,
    title: 'Audio Messaging',
    description: 'Integrated announcements for promotions, store hours, and brand messages — woven seamlessly into your music.',
  },
];

export default function RetailSolutionPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center py-20 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden">
        <Image
          src="/images/hero-retail.webp"
          alt="Modern retail store with ambient lighting and curated music atmosphere"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/70 to-brand-dark/40" />

        <div className="relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-brand-orange/20 border border-brand-orange/30 rounded-full text-brand-orange text-sm font-medium mb-6">
              Retail & Commercial
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Sound That{' '}
              <span className="gradient-text">Sells</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
              Background music that drives foot traffic, extends browsing time, and reinforces your retail brand at every touchpoint.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/quotation">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-brand-orange/30"
                >
                  Get a Retail Quote
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Link>
              <Link href="/#demo">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
                >
                  Book Free Demo
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-12 px-4 md:px-8 lg:px-16 bg-brand-navy border-y border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-brand-orange">{stat.value}</p>
              <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pain Point */}
      <section className="relative py-20 md:py-28 px-4 md:px-8 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-navy to-brand-dark" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Your Store Has a{' '}
              <span className="gradient-text">Voice</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Music is the most underutilized tool in retail. The right soundtrack creates a{' '}
              <span className="text-brand-orange font-semibold">37% sales lift</span>,{' '}
              <span className="text-brand-orange font-semibold">31% longer browsing time</span>, and{' '}
              <span className="text-brand-orange font-semibold">85% higher brand recall</span>.
            </p>
            <p className="text-lg text-gray-400">
              Yet most retailers play random radio or risky personal playlists. Your brand deserves a soundtrack as intentional as your visual merchandising.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Zones */}
      <section className="relative py-20 md:py-28 px-4 md:px-8 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark to-brand-navy" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Music for Every{' '}
              <span className="gradient-text">Retail Format</span>
            </h2>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RETAIL_ZONES.map((zone) => {
              const Icon = zone.icon;
              return (
                <motion.div key={zone.name} variants={itemVariants} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-brand-orange/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center mb-4 group-hover:bg-brand-orange/20 transition-colors">
                    <Icon className="w-6 h-6 text-brand-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{zone.name}</h3>
                  <p className="text-gray-400 text-sm">{zone.mood}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative py-20 md:py-28 px-4 md:px-8 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-dark to-brand-dark" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Retailers Choose{' '}
              <span className="gradient-text">BMAsia</span>
            </h2>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <motion.div key={benefit.title} variants={itemVariants}>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-orange to-amber-500 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark to-brand-navy" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-orange/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Your Brand Deserves a{' '}
              <span className="gradient-text">Soundtrack</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Get a custom music solution for your retail locations. Free consultation.
            </p>
            <Link href="/quotation">
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-brand-orange/30"
              >
                Get Your Retail Quote
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
