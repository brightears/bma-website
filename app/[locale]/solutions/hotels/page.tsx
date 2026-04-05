'use client';

import { motion } from 'framer-motion';
import {
  Hotel,
  Music,
  Clock,
  Globe,
  Shield,
  Headphones,
  BarChart3,
  Zap,
  CheckCircle2,
  ArrowRight,
  Volume2,
  Wifi,
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

const HOTEL_ZONES = [
  { name: 'Lobby & Reception', mood: 'Warm, welcoming, refined', icon: Hotel },
  { name: 'Restaurant & F&B', mood: 'Intimate dining to vibrant brunch', icon: Music },
  { name: 'Spa & Wellness', mood: 'Tranquil, meditative, healing', icon: Headphones },
  { name: 'Pool & Outdoor', mood: 'Relaxed, upbeat, tropical', icon: Volume2 },
  { name: 'Gym & Fitness', mood: 'Energetic, motivating, powerful', icon: Zap },
  { name: 'Bar & Lounge', mood: 'Sophisticated, social, ambient', icon: BarChart3 },
];

const STATS = [
  { value: '500+', label: 'Hotel Locations' },
  { value: '37%', label: 'Sales Lift Reported' },
  { value: '93%', label: 'Guest Differentiation' },
  { value: '24/7', label: 'Music Management' },
];

const CLIENT_LOGOS = [
  'Hilton', 'Accor', 'Minor Hotels', 'Centara',
  'Ascott', 'Anantara', 'Shangri-La', 'Melia',
];

const BENEFITS = [
  {
    icon: Globe,
    title: 'Centralized Multi-Property Control',
    description: 'Manage music across 1 or 100 properties from a single dashboard. Ensure brand consistency while allowing local customization.',
  },
  {
    icon: Clock,
    title: 'Daypart Scheduling',
    description: 'Different music for breakfast, afternoon, evening, and late night — automatically. Match the energy of each moment in the guest journey.',
  },
  {
    icon: Shield,
    title: 'Fully Licensed & Compliant',
    description: 'All recording and publishing licenses included. No risk of copyright infringement. No awkward conversations with collection societies.',
  },
  {
    icon: Music,
    title: 'Bespoke Music Design',
    description: 'Our music designers craft playlists that reflect your brand identity — from boutique minimalism to grand luxury. Refreshed quarterly.',
  },
  {
    icon: Wifi,
    title: 'Offline Playback',
    description: 'Music keeps playing even if internet drops. Critical for remote resorts and properties with unreliable connectivity.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description: '24/7 technical support and a dedicated account manager. We handle everything so your team can focus on guests.',
  },
];

export default function HotelsSolutionPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center py-20 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden">
        <Image
          src="/images/hero-hotel.webp"
          alt="Luxury hotel lobby with warm ambient lighting and sophisticated atmosphere"
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
              Hotels & Resorts
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              The Soundtrack Your{' '}
              <span className="gradient-text">Guests Remember</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
              Licensed background music designed for every moment of the guest journey — from check-in to checkout.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/quotation">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-brand-orange/30"
                >
                  Get a Hotel Quote
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

      {/* Pain Point Section */}
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
              Your Guests Notice the{' '}
              <span className="gradient-text">Music</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Research shows background music directly impacts guest perception, dwell time, and spending. Hotels with professionally curated music report a{' '}
              <span className="text-brand-orange font-semibold">37% increase in ancillary revenue</span>{' '}
              and{' '}
              <span className="text-brand-orange font-semibold">93% of guests</span>{' '}
              say music differentiates their experience.
            </p>
            <p className="text-lg text-gray-400">
              Yet most hotels still use Spotify playlists, radio, or silence. The risk? Copyright fines, inconsistent ambiance, and a missed opportunity to reinforce your brand.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Zone-by-Zone Section */}
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
              <span className="gradient-text">Zone</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Each area of your hotel has a different energy. We design the perfect soundtrack for every space.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {HOTEL_ZONES.map((zone) => {
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

      {/* Benefits Section */}
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
              Why Hotels Choose{' '}
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
                <motion.div
                  key={benefit.title}
                  variants={itemVariants}
                  className="group"
                >
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

      {/* Trusted By Section */}
      <section className="relative py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-brand-dark" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm text-gray-500 uppercase tracking-widest mb-8">
              Trusted by Leading Hotel Groups
            </p>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {CLIENT_LOGOS.map((name) => (
                <span key={name} className="text-lg text-gray-500 font-medium hover:text-gray-300 transition-colors">
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Preview */}
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
              Simple, Transparent{' '}
              <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Per-zone annual pricing. Volume discounts for multi-property groups.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* SYB Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-sm border border-brand-orange/50 rounded-2xl p-8"
            >
              <div className="text-brand-orange text-sm font-semibold uppercase tracking-wider mb-2">Premium</div>
              <h3 className="text-2xl font-bold text-white mb-1">Soundtrack Your Brand</h3>
              <p className="text-gray-400 text-sm mb-4">100M+ tracks, full customization</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">USD 380</span>
                <span className="text-gray-400"> /zone/year</span>
                <p className="text-sm text-gray-500 mt-1">From USD 330 for 10+ zones</p>
              </div>
              <ul className="space-y-2 mb-8">
                {['Recording + Publishing licenses', 'Bespoke music design', 'Quarterly refresh', 'Multi-zone scheduling', 'Offline playback', '24/7 support'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
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

            {/* Beat Breeze Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
            >
              <div className="text-green-400 text-sm font-semibold uppercase tracking-wider mb-2">Essential</div>
              <h3 className="text-2xl font-bold text-white mb-1">Beat Breeze</h3>
              <p className="text-gray-400 text-sm mb-4">30K+ tracks, all licenses included</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">USD 290</span>
                <span className="text-gray-400"> /zone/year</span>
                <p className="text-sm text-gray-500 mt-1">From USD 190 for 10+ zones</p>
              </div>
              <ul className="space-y-2 mb-8">
                {['ALL licenses included (no PRO needed)', 'Curated playlists', 'Quarterly refresh', 'Multi-zone setup', 'Offline capable', 'Full support'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
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

          <p className="text-center text-gray-500 text-sm mt-6">
            Enterprise and chain hotel pricing available on request. Hardware (Soundtrack Player) available at USD 250/unit.
          </p>
        </div>
      </section>

      {/* Final CTA */}
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
              Ready to Transform Your{' '}
              <span className="gradient-text">Guest Experience?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Get a custom music solution designed for your property. Free consultation, no obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quotation">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-brand-orange/30"
                >
                  Get Your Hotel Quote
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
