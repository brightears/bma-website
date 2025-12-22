'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, ExternalLink } from 'lucide-react';
import { URLS } from '@/lib/constants';

// Declare Calendly global for TypeScript
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

/**
 * CalendlyEmbed Section Component
 *
 * Uses Calendly popup widget instead of inline embed.
 * Popup works on mobile and incognito mode (no third-party cookie issues).
 *
 * Features:
 * - Large CTA button triggers Calendly popup modal
 * - Works on all browsers and devices
 * - Graceful fallback if script fails
 * - Navy gradient background with brand styling
 */
export const CalendlyEmbed: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const calendlyUrl = URLS.calendly;

  useEffect(() => {
    // Load Calendly CSS for popup styling
    const existingCSS = document.querySelector(
      'link[href="https://assets.calendly.com/assets/external/widget.css"]'
    );
    if (!existingCSS) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(link);
    }

    // Check if Calendly script is already loaded
    const existingScript = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );

    if (existingScript) {
      setIsReady(true);
      return;
    }

    // Create and load the Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;

    script.onload = () => {
      setIsReady(true);
    };

    script.onerror = () => {
      setHasError(true);
    };

    document.body.appendChild(script);
  }, []);

  const openCalendlyPopup = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: calendlyUrl });
    } else {
      // Fallback: open in new tab
      window.open(calendlyUrl, '_blank');
    }
  };

  return (
    <section
      id="demo"
      className="relative py-16 md:py-24 px-4 md:px-8 lg:px-16 overflow-hidden"
      aria-labelledby="calendly-heading"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy to-brand-dark" />

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        {/* Subtle radial gradient for depth */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-10 md:mb-14"
        >
          <h2
            id="calendly-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Book a{' '}
            <span className="gradient-text">Free Demo</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Schedule a personalized demo call with our team. We&apos;ll walk you through our
            platform, answer your questions, and help you find the perfect music solution
            for your business.
          </p>
        </motion.div>

        {/* Info cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center">
            <Clock className="w-8 h-8 text-brand-orange mx-auto mb-3" aria-hidden="true" />
            <p className="text-white font-medium">15-30 Minutes</p>
            <p className="text-gray-500 text-sm">Quick & focused</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center">
            <Users className="w-8 h-8 text-brand-orange mx-auto mb-3" aria-hidden="true" />
            <p className="text-white font-medium">1-on-1 Session</p>
            <p className="text-gray-500 text-sm">Personalized for you</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center">
            <Calendar className="w-8 h-8 text-brand-orange mx-auto mb-3" aria-hidden="true" />
            <p className="text-white font-medium">No Commitment</p>
            <p className="text-gray-500 text-sm">Just exploring? That&apos;s fine</p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="text-center"
        >
          {hasError ? (
            // Fallback link if script fails
            <motion.a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 bg-brand-orange hover:bg-brand-orange-dark text-white text-lg md:text-xl px-10 py-5 rounded-xl font-semibold transition-colors shadow-lg shadow-brand-orange/25"
            >
              <Calendar className="w-6 h-6" aria-hidden="true" />
              <span>Book Your Free Demo</span>
              <ExternalLink className="w-5 h-5" aria-hidden="true" />
            </motion.a>
          ) : (
            <motion.button
              onClick={openCalendlyPopup}
              disabled={!isReady}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 bg-brand-orange hover:bg-brand-orange-dark disabled:bg-brand-orange/50 disabled:cursor-wait text-white text-lg md:text-xl px-10 py-5 rounded-xl font-semibold transition-colors shadow-lg shadow-brand-orange/25"
            >
              <Calendar className="w-6 h-6" aria-hidden="true" />
              <span>{isReady ? 'Book Your Free Demo' : 'Loading...'}</span>
            </motion.button>
          )}

          {/* Noscript fallback */}
          <noscript>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-orange text-white text-lg px-10 py-5 rounded-xl font-semibold mt-4"
            >
              <span>Book Your Free Demo</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </noscript>
        </motion.div>

        {/* Additional info */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-gray-500 text-sm mt-8"
        >
          Select a time that works for you. Calendar will open in a popup.
        </motion.p>
      </div>
    </section>
  );
};

export default CalendlyEmbed;
