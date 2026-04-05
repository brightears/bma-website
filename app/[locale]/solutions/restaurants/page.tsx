'use client';

import { motion } from 'framer-motion';
import {
  UtensilsCrossed,
  Music,
  Clock,
  Shield,
  Headphones,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Volume2,
  Coffee,
  Wine,
  Soup,
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

const RESTAURANT_ZONES = [
  { name: 'Fine Dining', mood: 'Elegant, intimate, classical', icon: Wine },
  { name: 'Casual Dining', mood: 'Warm, conversational, easy', icon: UtensilsCrossed },
  { name: 'Cafe & Bakery', mood: 'Light, cheerful, acoustic', icon: Coffee },
  { name: 'Bar & Cocktails', mood: 'Sophisticated, jazzy, social', icon: Wine },
  { name: 'Fast Casual & QSR', mood: 'Upbeat, energetic, modern', icon: Soup },
  { name: 'Outdoor & Terrace', mood: 'Breezy, relaxed, sunset', icon: Volume2 },
];

const STATS = [
  { value: '9.1%', label: 'Increase in Spend' },
  { value: '15%', label: 'Longer Dwell Time' },
  { value: '30K+', label: 'Curated Tracks' },
  { value: '100M+', label: 'Premium Tracks' },
];

const BENEFITS = [
  {
    icon: Clock,
    title: 'Daypart Scheduling',
    description: 'Breakfast jazz, afternoon acoustic, evening lounge — automatic transitions that match your service flow.',
  },
  {
    icon: Music,
    title: 'Genre & Mood Curation',
    description: 'From lo-fi cafe vibes to fine dining classical. Our music designers understand F&B ambiance at a molecular level.',
  },
  {
    icon: Shield,
    title: 'License-Free Operation',
    description: 'With Beat Breeze, all licenses are included. No collection society fees, no compliance risk, no surprise invoices.',
  },
  {
    icon: BarChart3,
    title: 'Revenue Impact',
    description: 'Research shows the right music increases average check size by 9.1% and keeps guests lingering 15% longer.',
  },
  {
    icon: Headphones,
    title: 'Multi-Zone for Multi-Areas',
    description: 'Different music for the dining room, bar, terrace, and restrooms — all from one dashboard.',
  },
  {
    icon: Volume2,
    title: 'Volume & Energy Control',
    description: 'Auto-adjust volume based on time of day. Ramp up energy for Friday night, soften for Sunday brunch.',
  },
];

export default function RestaurantsSolutionPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center py-20 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden">
        <Image
          src="/images/hero-restaurant.webp"
          alt="Upscale restaurant interior with warm lighting and curated ambiance"
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
              Restaurants & F&B
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Music That Makes{' '}
              <span className="gradient-text">Guests Stay</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
              The right playlist turns a meal into an experience. Licensed, curated, and scheduled to match your service flow.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/quotation">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-brand-orange/30"
                >
                  Get a Restaurant Quote
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

      {/* Stats Bar */}
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
              Sound Is the{' '}
              <span className="gradient-text">Secret Ingredient</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Studies consistently show that background music affects eating speed, alcohol consumption, and perceived food quality. Restaurants with curated music see{' '}
              <span className="text-brand-orange font-semibold">9.1% higher average spend</span>{' '}
              and{' '}
              <span className="text-brand-orange font-semibold">15% longer table occupancy</span>.
            </p>
            <p className="text-lg text-gray-400">
              The wrong music — or worse, a personal Spotify account — risks copyright fines and creates an inconsistent dining atmosphere.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Zone-by-Zone */}
      <section className="relative py-20 md:py-28 px-4 md:px-8 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark to-brand-navy" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Music for Every{' '}
              <span className="gradient-text">Dining Concept</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From fine dining to fast casual, we design the perfect soundscape for your concept.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {RESTAURANT_ZONES.map((zone) => {
              const Icon = zone.icon;
              return (
                <motion.div
                  key={zone.name}
                  variants={itemVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-brand-orange/30 transition-all duration-300"
                >
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Restaurants Choose{' '}
              <span className="gradient-text">BMAsia</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
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

      {/* Pricing */}
      <section className="relative py-20 md:py-28 px-4 md:px-8 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-navy to-brand-dark" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Simple{' '}
              <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-gray-400 text-lg">
              One zone = one music area. Most restaurants need 1-3 zones.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-brand-orange/50 rounded-2xl p-8"
            >
              <div className="text-brand-orange text-sm font-semibold uppercase tracking-wider mb-2">Premium</div>
              <h3 className="text-2xl font-bold text-white mb-1">Soundtrack Your Brand</h3>
              <p className="text-gray-400 text-sm mb-4">100M+ tracks, Spotify-synced</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">USD 380</span>
                <span className="text-gray-400"> /zone/year</span>
              </div>
              <Link href="/quotation">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block text-center bg-brand-orange hover:bg-brand-orange-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                  Get a Quote
                </motion.span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-green-500/30 rounded-2xl p-8"
            >
              <div className="text-green-400 text-sm font-semibold uppercase tracking-wider mb-2">Hassle-Free</div>
              <h3 className="text-2xl font-bold text-white mb-1">Beat Breeze</h3>
              <p className="text-gray-400 text-sm mb-4">All licenses included, zero extras</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">USD 290</span>
                <span className="text-gray-400"> /zone/year</span>
              </div>
              <Link href="/quotation">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block text-center bg-white/10 hover:bg-white/20 text-white border border-white/10 px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                  Get a Quote
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark to-brand-navy" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-orange/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Set the Mood for Your{' '}
              <span className="gradient-text">Restaurant</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Get a custom music solution designed for your F&B concept. Free consultation.
            </p>
            <Link href="/quotation">
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-brand-orange/30"
              >
                Get Your Restaurant Quote
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
