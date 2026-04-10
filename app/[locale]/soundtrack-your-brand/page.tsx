'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Layers,
  Calendar,
  Megaphone,
  Smartphone,
  CloudOff,
  ShieldCheck,
  Sparkles,
  Network,
  Wrench,
  Router,
  MonitorSmartphone,
  Apple,
  Speaker,
  Cable,
  Headphones,
  Music,
  Bot,
  Plus,
} from 'lucide-react';

const VALUE_PROPS = [
  {
    num: '01',
    label: 'Repertoire',
    title: 'Any artist, any genre.',
    desc: 'Access 100+ million commercially licensed tracks. Every song your guests know, fully cleared for commercial use.',
  },
  {
    num: '02',
    label: 'Compliance',
    title: 'Licensing you can trust.',
    desc: 'Recording and publishing rights included. We guide you through the local public performance license so nothing slips through the cracks.',
  },
  {
    num: '03',
    label: 'Specialization',
    title: 'Made for hospitality.',
    desc: 'Built for complex properties. Morning lobby hum, lunch service energy, late-night lounge pulse — each handled as its own zone.',
  },
];

const FEATURES = [
  {
    Icon: Layers,
    title: 'Multi-Zone Control',
    desc: 'Different atmospheres for different spaces. Manage lobby, spa, and restaurant from one dashboard.',
  },
  {
    Icon: Calendar,
    title: 'Scheduling',
    desc: 'Weekly or daily drag-and-drop schedules. Holiday overrides, dayparts, and ready-made templates by venue type.',
  },
  {
    Icon: Megaphone,
    title: 'Audio Messaging',
    desc: 'Schedule branded announcements, promotions, or voice notes in five languages — MP3 upload or text-to-speech.',
  },
  {
    Icon: Smartphone,
    title: 'Mobile Apps',
    desc: 'Full control from anywhere. iOS, Android, Windows, macOS. Your staff can adjust the vibe from their phone.',
  },
  {
    Icon: CloudOff,
    title: 'Offline Ready',
    desc: 'Music never stops. Up to 30 consecutive days of cached playback per device — ideal for fluctuating connectivity.',
  },
  {
    Icon: ShieldCheck,
    title: 'Enterprise Security',
    desc: 'SAML SSO, role-based access, multi-user admin. Built for properties that need proper governance.',
  },
];

const INTEGRATIONS = [
  {
    Icon: Sparkles,
    title: 'AI Playlist Generation',
    desc: 'Custom AI tools built on top of the platform. Describe a mood, get a curated playlist in seconds.',
  },
  {
    Icon: Network,
    title: 'Smart Building API',
    desc: 'Connect music to lighting, room temperature, or occupancy sensors. Make the sound part of the whole guest experience.',
  },
  {
    Icon: Wrench,
    title: 'Bespoke Features on Request',
    desc: 'Need something custom? We build integrations around your property\u2019s operations — on request, at no surprise cost.',
  },
];

const DEVICES = [
  { Icon: Router, title: 'Soundtrack Player', desc: 'Dedicated hardware. Plug-and-play, 30-day offline cache.' },
  { Icon: MonitorSmartphone, title: 'Windows PC', desc: 'Any modern Windows machine. Full desktop player, headless enterprise mode.' },
  { Icon: Smartphone, title: 'Android & iOS', desc: 'Tablets or phones. Full app control from anywhere on the floor.' },
  { Icon: Apple, title: 'macOS', desc: 'Native desktop player for Mac environments.' },
  { Icon: Speaker, title: 'Sonos Integration', desc: 'Use Soundtrack as a music service within the Sonos app.' },
  { Icon: Cable, title: 'Q-SYS', desc: 'Central multi-zone management for enterprise audio systems.' },
];

const FAQS = [
  {
    q: 'Do I need a Public Performance License?',
    a: 'Yes — this is paid separately to your local collection society (MPC in Thailand, MRSS in Singapore, PRS in the UK, etc). The good news: we guide you through the process during onboarding, so you never deal with it alone.',
  },
  {
    q: 'What internet speed and network do I need?',
    a: 'Minimum 0.5 Mbit/s per playback device. Wired Ethernet is preferred over Wi-Fi. A handful of outbound ports need to be open (443, 53, 123) — we send your IT team a short checklist before setup.',
  },
  {
    q: 'Can I play music offline?',
    a: 'Yes. Every device caches tracks after playing them, and you can enable "more offline play" mode to proactively download content. A fully-synced device keeps playing for up to 30 consecutive days without internet.',
  },
  {
    q: 'How many zones can I manage?',
    a: 'Unlimited. Each zone gets its own schedule, playlist, and device pairing — controlled from one dashboard. You can add and rearrange zones as your property evolves.',
  },
  {
    q: 'Can I use my Spotify playlists?',
    a: 'Yes. Soundtrack Your Brand syncs directly with Spotify, so any playlist you\u2019ve built (yours or curated) can be used commercially through our platform.',
  },
  {
    q: 'What happens if the internet goes down?',
    a: 'Cached tracks keep playing uninterrupted. Your guests never notice a thing. Once the connection comes back, the player syncs silently in the background.',
  },
];

const SUPPORT = [
  {
    Icon: Headphones,
    title: '24/7 Technical Support',
    desc: 'Round-the-clock help for hardware, network, and platform issues. Real humans, not scripts.',
  },
  {
    Icon: Music,
    title: 'Bespoke Music Design',
    desc: 'Our music designers work with you Monday through Friday (Bangkok hours) to craft and refresh your sound.',
  },
  {
    Icon: Bot,
    title: 'AI Self-Service',
    desc: 'Interactive assistants available 24/7 for common questions, playlist tweaks, and quick adjustments.',
  },
];

export default function SoundtrackYourBrandPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/product-syb-hero.webp"
            alt="Premium hotel lobby with ambient music"
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
                The Global Standard
              </span>
              <h1 className="font-headline text-5xl md:text-7xl leading-none tracking-tight text-white mb-6">
                Soundtrack Your <br />
                <span className="italic text-brand-orange">Brand</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/60 max-w-xl leading-relaxed mb-10">
                The world&rsquo;s largest commercial music library, curated for your space.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/quotation"
                  className="bg-brand-orange text-black px-10 py-4 font-label font-bold uppercase tracking-widest text-sm hover:bg-white transition-all duration-300 text-center"
                >
                  Get a Quote
                </Link>
                <Link
                  href="#trial"
                  className="border border-white/20 text-white px-10 py-4 font-label font-bold uppercase tracking-widest text-sm hover:border-brand-orange hover:text-brand-orange transition-all duration-300 text-center"
                >
                  Start a Free Trial
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#0f0f0f] border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-headline text-3xl md:text-5xl leading-tight text-white/90"
          >
            When you play music in your business, you&rsquo;re shaping an experience.
            {' '}
            <span className="italic text-brand-orange">Soundtrack Your Brand</span>
            {' '}
            gives you every song your guests know — fully licensed for commercial use.
          </motion.p>
        </div>
      </section>

      {/* Core Value Props */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {VALUE_PROPS.map((prop, i) => (
              <motion.div
                key={prop.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 md:p-12"
              >
                <span className="font-label text-brand-orange text-xs tracking-[0.2em] uppercase block mb-4">
                  {prop.num} / {prop.label}
                </span>
                <h3 className="font-headline text-2xl md:text-3xl text-white mb-4">{prop.title}</h3>
                <p className="text-lg text-white/50 leading-relaxed">{prop.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#121212] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="font-label text-brand-orange text-xs tracking-[0.2em] uppercase block mb-4">
              Capabilities
            </span>
            <h2 className="font-headline text-4xl md:text-5xl text-white">Everything you need to run music right.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {FEATURES.map((feature, i) => {
              const Icon = feature.Icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="bg-[#121212] p-10 md:p-12"
                >
                  <Icon className="text-brand-orange w-10 h-10 mb-6" strokeWidth={1.5} />
                  <h4 className="font-label text-sm font-bold tracking-widest uppercase text-white mb-3">{feature.title}</h4>
                  <p className="text-base text-white/60 leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI & Custom Integrations */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 max-w-3xl"
          >
            <span className="font-label text-brand-orange text-xs tracking-[0.2em] uppercase block mb-4">
              Future-Proof
            </span>
            <h2 className="font-headline text-4xl md:text-5xl text-white mb-6">Beyond the Platform</h2>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed">
              We build AI and API features on top of Soundtrack Your Brand — custom automations, smart building integrations, and bespoke tools designed around your property&rsquo;s operations.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {INTEGRATIONS.map((item, i) => {
              const Icon = item.Icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="border-l-2 border-brand-orange/30 pl-8"
                >
                  <Icon className="text-brand-orange w-8 h-8 mb-4" strokeWidth={1.5} />
                  <h4 className="font-headline text-xl text-white mb-3">{item.title}</h4>
                  <p className="text-base text-white/50 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Licensing Clarity */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#121212] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-headline text-4xl md:text-5xl text-white mb-4">Licensing, clarified.</h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              We tell you exactly what&rsquo;s covered and what isn&rsquo;t — no surprises, no fine print.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#0f0f0f] p-10 md:p-12 border-t-4 border-brand-orange"
            >
              <h4 className="font-label text-xs font-bold tracking-[0.2em] uppercase text-brand-orange mb-8">
                What&rsquo;s Included
              </h4>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <span className="text-brand-orange mt-1">✓</span>
                  <span className="text-white/80">Recording rights (master license)</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-brand-orange mt-1">✓</span>
                  <span className="text-white/80">Publishing rights (mechanical/sync)</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-brand-orange mt-1">✓</span>
                  <span className="text-white/80">Direct deals with major and indie labels via Soundtrack</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-brand-orange mt-1">✓</span>
                  <span className="text-white/80">Bespoke curation and quarterly playlist refreshes</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-brand-orange mt-1">✓</span>
                  <span className="text-white/80">Hands-off ongoing support from our music designers</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#0f0f0f] p-10 md:p-12 border-t-4 border-white/20"
            >
              <h4 className="font-label text-xs font-bold tracking-[0.2em] uppercase text-white/50 mb-8">
                What&rsquo;s Separate
              </h4>
              <p className="text-white/70 mb-6 leading-relaxed">
                The <span className="text-brand-orange">Public Performance License</span> is paid locally to your collection society — MPC in Thailand, MRSS in Singapore, PRS in the UK, ASCAP/BMI in the US, and so on.
              </p>
              <div className="bg-white/5 p-6 border-l-2 border-brand-orange mt-8">
                <p className="font-label text-[10px] tracking-widest uppercase text-brand-orange mb-2">
                  We handle the paperwork
                </p>
                <p className="text-sm text-white/60 leading-relaxed">
                  Our team walks you through the local licensing process during onboarding. You never deal with it alone.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Supported Devices */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="font-label text-brand-orange text-xs tracking-[0.2em] uppercase block mb-4">
              Versatility
            </span>
            <h2 className="font-headline text-4xl md:text-5xl text-white">Plays on everything you already have.</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {DEVICES.map((device, i) => {
              const Icon = device.Icon;
              return (
                <motion.div
                  key={device.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="bg-[#161616] p-8 text-center border-t border-white/5"
                >
                  <Icon className="text-brand-orange w-10 h-10 mb-4 mx-auto" strokeWidth={1.5} />
                  <h4 className="font-label text-sm font-bold tracking-widest uppercase text-white mb-3">
                    {device.title}
                  </h4>
                  <p className="text-sm text-white/50 leading-relaxed">{device.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trial & Onboarding */}
      <section id="trial" className="py-20 md:py-32 px-6 md:px-12 bg-[#0f0f0f] border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-label text-brand-orange text-xs tracking-[0.2em] uppercase block mb-6">
              Try It First
            </span>
            <h2 className="font-headline text-4xl md:text-6xl text-white mb-8 leading-tight">
              Try it before you <span className="italic text-brand-orange">commit.</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/60 leading-relaxed mb-4">
              Start with a free one-month trial on a single zone. No credit card, no commitment.
            </p>
            <p className="text-lg text-white/40 leading-relaxed mb-12">
              Once you decide to sign up and your hardware is in place, we&rsquo;ll have you up and running in five minutes.
            </p>
            <Link
              href="/quotation"
              className="inline-block bg-brand-orange text-black px-12 py-5 font-label font-bold uppercase tracking-widest hover:bg-white transition-all duration-300"
            >
              Start Free Trial
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Support */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="font-label text-brand-orange text-xs tracking-[0.2em] uppercase block mb-4">
              Always On
            </span>
            <h2 className="font-headline text-4xl md:text-5xl text-white">You&rsquo;re never alone.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {SUPPORT.map((item, i) => {
              const Icon = item.Icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center md:text-left"
                >
                  <Icon className="text-brand-orange w-10 h-10 mb-6 mx-auto md:mx-0" strokeWidth={1.5} />
                  <h4 className="font-headline text-2xl text-white mb-4">{item.title}</h4>
                  <p className="text-base text-white/50 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#121212] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-headline text-4xl md:text-5xl text-white mb-16 text-center"
          >
            Frequently Asked
          </motion.h2>
          <div className="space-y-6">
            {FAQS.map((faq, i) => (
              <motion.details
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group border-b border-white/10 pb-6"
              >
                <summary className="flex justify-between items-start cursor-pointer list-none">
                  <h5 className="font-headline text-xl md:text-2xl text-white pr-8">{faq.q}</h5>
                  <Plus className="text-brand-orange w-6 h-6 flex-shrink-0 group-open:rotate-45 transition-transform" strokeWidth={1.5} />
                </summary>
                <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed pr-8">
                  {faq.a}
                </p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-[#0f0f0f]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-lounge.webp"
            alt="Atmospheric hospitality venue"
            fill
            className="object-cover opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/80 to-[#0f0f0f]/40" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-headline text-4xl md:text-6xl text-white mb-8 leading-tight">
              Ready to hear the <br />
              <span className="italic text-brand-orange">difference?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
              Our music designers will craft a sound experience unique to your brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quotation"
                className="bg-brand-orange text-black px-12 py-5 font-label font-bold uppercase tracking-widest hover:bg-white transition-all duration-300"
              >
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
