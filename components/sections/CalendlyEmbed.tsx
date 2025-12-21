'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink } from 'lucide-react';
import { URLS } from '@/lib/constants';

/**
 * Loading spinner component for the Calendly widget
 */
const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className="w-12 h-12 border-4 border-brand-orange/30 border-t-brand-orange rounded-full"
    />
    <p className="mt-4 text-gray-400">Loading scheduler...</p>
  </div>
);

/**
 * Fallback component when JavaScript is disabled or Calendly fails to load
 */
const FallbackLink: React.FC<{ calendlyUrl: string }> = ({ calendlyUrl }) => (
  <div className="text-center py-12">
    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-brand-orange/20 flex items-center justify-center">
      <Calendar className="w-8 h-8 text-brand-orange" aria-hidden="true" />
    </div>
    <p className="text-gray-400 mb-6">
      Unable to load the scheduling widget. Click below to book directly on Calendly.
    </p>
    <motion.a
      href={calendlyUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-4 rounded-xl font-semibold transition-colors"
    >
      <span>Schedule on Calendly</span>
      <ExternalLink className="w-5 h-5" aria-hidden="true" />
    </motion.a>
  </div>
);

/**
 * CalendlyEmbed Section Component
 *
 * Embeds the Calendly scheduling widget for booking free demo calls.
 *
 * Features:
 * - Dynamically loads Calendly's widget.js script
 * - Loading state while Calendly loads
 * - Fallback link if JavaScript is disabled or widget fails
 * - Navy gradient background
 * - Scroll reveal animation for heading
 * - Accessible with proper ARIA attributes
 */
export const CalendlyEmbed: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const calendlyUrl = URLS.calendly;

  useEffect(() => {
    // Check if Calendly script is already loaded
    const existingScript = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );

    if (existingScript) {
      setIsLoading(false);
      return;
    }

    // Create and load the Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;

    script.onload = () => {
      setIsLoading(false);
    };

    script.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };

    document.body.appendChild(script);

    // Cleanup function
    return () => {
      // Note: We don't remove the script to avoid issues if component remounts
    };
  }, []);

  return (
    <section
      id="demo"
      className="relative py-16 md:py-24 px-4 md:px-8 lg:px-16 overflow-hidden"
      aria-labelledby="calendly-heading"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy to-brand-dark" />

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle radial gradient for depth */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-8 md:mb-12"
        >
          <h2
            id="calendly-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Book a{' '}
            <span className="gradient-text">Free Demo</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Schedule a personalized demo call with our team. We will walk you through our
            platform, answer your questions, and help you find the perfect music solution
            for your business.
          </p>
        </motion.div>

        {/* Calendly widget container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden"
        >
          {/* Loading state */}
          {isLoading && <LoadingSpinner />}

          {/* Error state - fallback link */}
          {hasError && <FallbackLink calendlyUrl={calendlyUrl} />}

          {/* Calendly inline widget */}
          {!hasError && (
            <div
              className="calendly-inline-widget"
              data-url={`${calendlyUrl}?hide_gdpr_banner=1&background_color=1a1a2e&text_color=ffffff&primary_color=efa634`}
              style={{
                minWidth: '320px',
                height: '700px',
                opacity: isLoading ? 0 : 1,
                transition: 'opacity 0.3s ease-in-out',
              }}
            />
          )}

          {/* Noscript fallback for disabled JavaScript */}
          <noscript>
            <div className="text-center py-12 px-4">
              <p className="text-gray-400 mb-4">
                JavaScript is required to use the scheduling widget.
              </p>
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-orange hover:underline"
              >
                <span>Click here to schedule on Calendly</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </noscript>
        </motion.div>

        {/* Additional info */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-gray-500 text-sm mt-6"
        >
          Demo calls typically last 15-30 minutes. No commitment required.
        </motion.p>
      </div>
    </section>
  );
};

export default CalendlyEmbed;
