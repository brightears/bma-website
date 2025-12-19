'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, MessageSquare, ArrowRight } from 'lucide-react';
import { SITE } from '@/lib/constants';
import { InquiryForm } from '@/components/forms/InquiryForm';

/**
 * Animation variants for container with staggered children
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/**
 * Animation variants for individual items
 */
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/**
 * Contact information item type
 */
interface ContactInfoItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  description: string;
}

/**
 * Contact information items
 */
const CONTACT_INFO: ContactInfoItem[] = [
  {
    icon: Mail,
    label: 'Email',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    description: 'We typically respond within 24 hours',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Mon - Fri, 9AM - 6PM (HKT)',
    description: 'Hong Kong timezone',
  },
  {
    icon: MapPin,
    label: 'Coverage',
    value: 'Asia Pacific Region',
    description: 'Serving businesses across APAC',
  },
];

/**
 * Contact feature highlights
 */
const FEATURES = [
  'Free consultation and demo',
  'Personalized music recommendations',
  'Flexible pricing options',
  'Dedicated support team',
] as const;

/**
 * ContactSection Component
 *
 * Contact section for the landing page featuring:
 * - Two-column layout (contact info + form)
 * - Navy gradient background with glassmorphism
 * - Music inquiry form with validation
 * - Contact information with icons
 * - Scroll reveal animations
 *
 * The section includes:
 * - Section heading: "Contact Us"
 * - Subheading with value proposition
 * - Left column: Contact info, email, CTA text
 * - Right column: InquiryForm component
 */
export const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background gradient - Navy theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-navy to-brand-navy" />

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Radial gradients for depth */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-navy/80 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12 md:mb-16"
        >
          <h2
            id="contact-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Contact <span className="gradient-text">Us</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Take the first step, we take care of the rest
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-8"
          >
            {/* CTA text */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/10 border border-brand-orange/20 rounded-full">
                <MessageSquare className="w-4 h-4 text-brand-orange" aria-hidden="true" />
                <span className="text-sm font-medium text-brand-orange">
                  Let&apos;s Talk Music
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Ready to transform your business atmosphere?
              </h3>

              <p className="text-gray-400 leading-relaxed">
                Whether you are looking for a complete music solution for your retail chain,
                a boutique hotel, or a single venue, our team is here to help you find the
                perfect soundtrack for your brand.
              </p>
            </div>

            {/* Features list */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="space-y-3"
            >
              {FEATURES.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-5 h-5 rounded-full bg-brand-orange/20 flex items-center justify-center group-hover:bg-brand-orange/30 transition-colors">
                    <ArrowRight className="w-3 h-3 text-brand-orange" aria-hidden="true" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact information cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="space-y-4"
            >
              {CONTACT_INFO.map((item) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  className="group"
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      className="flex items-start gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-brand-orange/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-orange/30 transition-colors">
                        <item.icon className="w-5 h-5 text-brand-orange" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">{item.label}</div>
                        <div className="text-white font-medium group-hover:text-brand-orange transition-colors">
                          {item.value}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {item.description}
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-brand-orange/20 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-brand-orange" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">{item.label}</div>
                        <div className="text-white font-medium">{item.value}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            {/* Glassmorphism form container */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  Music Inquiry Form
                </h3>
                <p className="text-gray-400 text-sm">
                  Fill out the form below and we will get back to you within 24 hours.
                </p>
              </div>

              <InquiryForm />
            </div>

            {/* Additional note */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center text-gray-500 text-sm mt-6"
            >
              Prefer to schedule a call?{' '}
              <a
                href="#demo"
                className="text-brand-orange hover:text-brand-orange-light underline underline-offset-2 transition-colors"
              >
                Book a free demo
              </a>{' '}
              instead.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
