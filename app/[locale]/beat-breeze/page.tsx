'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Wallet,
  Headset,
  MonitorSmartphone,
  Globe,
  Smartphone,
  CloudOff,
  Calendar,
  Megaphone,
  Palette,
  Wrench,
  HelpCircle,
  Headphones,
  Music,
  Bot,
  Plus,
} from 'lucide-react';

const VALUE_PROPS = [
  {
    num: '01',
    label: 'All-Inclusive',
    title: 'All three licenses, always included.',
    desc: 'Recording, publishing, and public performance — every license you need is built into the subscription. Zero collection society fees, ever.',
  },
  {
    num: '02',
    label: 'Value',
    title: 'Significantly more affordable.',
    desc: 'Because Beat Breeze is curated in-house, it costs significantly less than Soundtrack Your Brand — and you still get every license included.',
  },
  {
    num: '03',
    label: 'Simplicity',
    title: 'Designed to be hands\u2011off.',
    desc: 'Bespoke curation by our music designers. Scheduled refreshes, seasonal updates, and 24/7 support. You focus on your guests — we handle the sound.',
  },
];

const FEATURES = [
  {
    Icon: ShieldCheck,
    title: 'Zero Licensing Hassle',
    desc: 'All three licenses — recording, publishing, and public performance — are bundled in. No MPC, no MRSS, no PRS, no ASCAP, no paperwork.',
  },
  {
    Icon: Palette,
    title: 'Bespoke Curation',
    desc: 'Our music designers craft playlists matched to your brand and refreshed regularly. You approve the vibe, we handle the rest.',
  },
  {
    Icon: CloudOff,
    title: 'Offline-Capable',
    desc: 'Music downloads to your device and plays locally. Guest experience stays smooth even when connectivity drops.',
  },
  {
    Icon: Calendar,
    title: 'Scheduling',
    desc: 'Different moods for different hours. Breakfast service, lunch rush, evening lounge — schedule it once and it runs itself.',
  },
  {
    Icon: Megaphone,
    title: 'Audio Signatures',
    desc: 'Insert branded messages, promotions, or announcements between tracks on a schedule.',
  },
  {
    Icon: Headset,
    title: 'Remote Management',
    desc: 'Manage your music from anywhere. Our team can assist remotely, troubleshoot, and update playlists without being on-site.',
  },
];

const PLATFORMS = [
  {
    Icon: MonitorSmartphone,
    title: 'Windows',
    desc: 'Full desktop player for any modern Windows machine. Mini PCs available from BMAsia (Thailand) with 1-year warranty.',
  },
  {
    Icon: Smartphone,
    title: 'Android',
    desc: 'Native Android app for tablets and phones. Budget-friendly and reliable.',
  },
  {
    Icon: Globe,
    title: 'Web Browser',
    desc: 'Web player for quick setup — log in from any browser and start playing.',
  },
];

const CUSTOM = [
  {
    Icon: Palette,
    title: 'White-Label for Corporations',
    desc: 'Corporate chains can brand Beat Breeze as their own internal music platform. Custom branding, colours, and domain.',
  },
  {
    Icon: Wrench,
    title: 'Custom Feature Builds',
    desc: 'Need something beyond standard? We build features around your operations on request — part of our ongoing platform development.',
  },
  {
    Icon: Wallet,
    title: 'Volume-Friendly Pricing',
    desc: 'The more zones you run, the better the per-zone rate. Especially attractive for multi-property chains and retail groups.',
  },
];

const FAQS = [
  {
    q: 'Do I need to pay any music licensing fees separately?',
    a: 'No. Every Beat Breeze subscription includes all three licenses — recording, publishing, and public performance. You never need to pay MPC, MRSS, PRS, ASCAP, BMI, or any other collection society.',
  },
  {
    q: 'How is Beat Breeze different from Soundtrack Your Brand?',
    a: 'Beat Breeze is significantly more affordable and has all licenses included, but the music catalog is curated and royalty-free — not specific chart hits. If you want the hits your guests know by name, choose Soundtrack Your Brand. If you want hassle-free licensed music with zero fees and professional curation, choose Beat Breeze.',
  },
  {
    q: 'What devices does Beat Breeze run on?',
    a: 'Any modern Windows PC, Android tablet or phone, or directly in a web browser. In Thailand, we supply pre-configured Windows mini PCs with a 1-year warranty if you prefer a plug-and-play solution.',
  },
  {
    q: 'Can Beat Breeze work offline?',
    a: 'Yes. The music downloads to your device and plays locally, so the experience stays smooth even if your internet drops. You just need connectivity for updates and remote management.',
  },
  {
    q: 'How big is the music catalog?',
    a: 'Over 30,000 professionally-produced royalty-free tracks, and the catalog is growing. Every track is curated by our music designers for hospitality and retail environments.',
  },
  {
    q: 'Can I white-label Beat Breeze for my corporate brand?',
    a: 'Yes. Corporate chains can run Beat Breeze as their own branded internal music platform with custom colours, logo, and domain. Talk to us about what you need.',
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

export default function BeatBreezePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/product-bb-hero.webp"
            alt="Beat Breeze by BMAsia"
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
                All-Inclusive Curation
              </span>
              <h1 className="font-headline text-5xl md:text-7xl leading-none tracking-tight text-white mb-6">
                Beat <br />
                <span className="italic text-brand-orange">Breeze</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/60 max-w-xl leading-relaxed mb-10">
                Fully licensed background music for every business — zero fees, zero paperwork, zero headaches.
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
            className="font-headline text-3xl md:text-5xl leading-tight text-white/90 [text-wrap:balance]"
          >
            Licensed music, fully curated, for a fraction of the cost of a commercial streaming service.
            {' '}
            <span className="italic text-brand-orange">Beat Breeze</span>
            {' '}
            includes every license you need — so you never deal with a collection society again.
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
                <h3 className="font-headline text-2xl md:text-3xl text-white mb-4 [text-wrap:balance]">{prop.title}</h3>
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
            <h2 className="font-headline text-4xl md:text-5xl text-white [text-wrap:balance]">Everything you need, nothing you don&rsquo;t.</h2>
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
                  <h4 className="font-label text-sm font-bold tracking-widest uppercase text-white mb-3 [text-wrap:balance]">{feature.title}</h4>
                  <p className="text-base text-white/60 leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Licensing Clarity — BB version, all-inclusive */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#0f0f0f]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-headline text-4xl md:text-5xl text-white [text-wrap:balance] mb-4">
              Every license. <span className="italic text-brand-orange">Included.</span>
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              No PRO fees. No paperwork. No surprises.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#161616] p-10 md:p-14 border-t-4 border-brand-orange"
          >
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <ShieldCheck className="text-brand-orange w-6 h-6 flex-shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <h4 className="font-label text-sm font-bold tracking-widest uppercase text-white mb-1">Recording Rights</h4>
                  <p className="text-white/60">Master license for every track in the catalog.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <ShieldCheck className="text-brand-orange w-6 h-6 flex-shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <h4 className="font-label text-sm font-bold tracking-widest uppercase text-white mb-1">Publishing Rights</h4>
                  <p className="text-white/60">Mechanical and sync rights for composers and publishers.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <ShieldCheck className="text-brand-orange w-6 h-6 flex-shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <h4 className="font-label text-sm font-bold tracking-widest uppercase text-white mb-1">Public Performance License</h4>
                  <p className="text-white/60">Play anywhere your business operates — no collection society payments ever.</p>
                </div>
              </li>
            </ul>
            <div className="mt-10 pt-8 border-t border-white/5">
              <p className="text-base text-white/70 leading-relaxed">
                While <Link href="/soundtrack-your-brand" className="text-brand-orange hover:underline">Soundtrack Your Brand</Link> still requires a separate Public Performance License in most countries, Beat Breeze has it all built in. That&rsquo;s the whole point.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#121212] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="font-label text-brand-orange text-xs tracking-[0.2em] uppercase block mb-4">
              Runs Everywhere
            </span>
            <h2 className="font-headline text-4xl md:text-5xl text-white [text-wrap:balance]">No special hardware required.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PLATFORMS.map((platform, i) => {
              const Icon = platform.Icon;
              return (
                <motion.div
                  key={platform.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-[#0f0f0f] p-10 text-center border-t border-white/5"
                >
                  <Icon className="text-brand-orange w-12 h-12 mb-6 mx-auto" strokeWidth={1.5} />
                  <h4 className="font-headline text-2xl text-white mb-4 [text-wrap:balance]">{platform.title}</h4>
                  <p className="text-base text-white/50 leading-relaxed">{platform.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Custom & Scale */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 max-w-3xl"
          >
            <span className="font-label text-brand-orange text-xs tracking-[0.2em] uppercase block mb-4">
              Built For Scale
            </span>
            <h2 className="font-headline text-4xl md:text-5xl text-white [text-wrap:balance] mb-6">Beyond the standard.</h2>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed">
              Beat Breeze is built as an evolving platform — especially for corporate chains and multi-property groups. We develop features around your needs.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CUSTOM.map((item, i) => {
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
                  <h4 className="font-headline text-xl text-white mb-3 [text-wrap:balance]">{item.title}</h4>
                  <p className="text-base text-white/50 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trial */}
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
            <h2 className="font-headline text-4xl md:text-6xl text-white mb-8 leading-tight [text-wrap:balance]">
              Listen before you <span className="italic text-brand-orange">commit.</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/60 leading-relaxed mb-4">
              Start with a free two-week trial. No credit card, no commitment.
            </p>
            <p className="text-lg text-white/40 leading-relaxed mb-12">
              We&rsquo;ll set you up remotely and you can hear how Beat Breeze sounds in your actual space before you decide.
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
            <h2 className="font-headline text-4xl md:text-5xl text-white [text-wrap:balance]">You&rsquo;re never alone.</h2>
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
                  <h4 className="font-headline text-2xl text-white mb-4 [text-wrap:balance]">{item.title}</h4>
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
            className="font-headline text-4xl md:text-5xl text-white [text-wrap:balance] mb-16 text-center"
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
                  <h5 className="font-headline text-xl md:text-2xl text-white pr-8 [text-wrap:balance]">{faq.q}</h5>
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
            src="/images/hero-cafe.webp"
            alt="Atmospheric venue with background music"
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
            <h2 className="font-headline text-4xl md:text-6xl text-white mb-8 leading-tight [text-wrap:balance]">
              Music, <br />
              <span className="italic text-brand-orange">simplified.</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
              Zero licensing hassle. Bespoke curation. Hands-off support. All at a price that makes sense.
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
