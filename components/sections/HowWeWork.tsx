'use client';

import { motion } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    title: 'We Listen',
    description: 'Tell us about your space, your brand, and your audience. We start with understanding.',
  },
  {
    number: '02',
    title: 'We Design',
    description: 'Our music designers craft your unique sound identity — playlists, schedules, and mood arcs.',
  },
  {
    number: '03',
    title: 'We Deliver',
    description: 'Setup, training, and ongoing support. Quarterly refreshes to keep your sound evolving.',
  },
] as const;

export const HowWeWork: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center py-20 md:py-28 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-dark to-brand-dark" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            How We{' '}
            <span className="gradient-text">Work</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center md:text-left"
            >
              {/* Connecting line (desktop only) */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-full h-[1px] bg-gradient-to-r from-brand-orange/40 to-transparent" />
              )}

              <div className="relative">
                <span
                  className="font-headline text-7xl md:text-8xl font-bold text-brand-orange/10"
                 
                >
                  {step.number}
                </span>
                <h3 className="font-headline text-2xl md:text-3xl font-bold text-white -mt-6 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed max-w-xs mx-auto md:mx-0">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
