'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { X, Mail, Loader2 } from 'lucide-react';

interface EscalationFormData {
  name: string;
  company: string;
  email: string;
}

interface EscalationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EscalationFormData) => Promise<void>;
  isSubmitting: boolean;
}

/**
 * EscalationModal Component
 *
 * Glassmorphism modal that collects customer email when escalation is triggered.
 * Appears when AI mentions connecting with a specialist.
 */
export function EscalationModal({ isOpen, onClose, onSubmit, isSubmitting }: EscalationModalProps) {
  const t = useTranslations('chat.escalation');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EscalationFormData>({
    defaultValues: {
      name: '',
      company: '',
      email: '',
    },
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, isSubmitting, onClose]);

  const handleFormSubmit = async (data: EscalationFormData) => {
    await onSubmit(data);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - does NOT close on click (important form) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-[61]"
          >
            <div className="bg-brand-dark/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-brand-orange" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-white font-semibold text-lg">{t('title')}</h2>
                    <p className="text-gray-400 text-sm">{t('subtitle')}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={t('cancel')}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-4">
                {/* Name field (optional) */}
                <div>
                  <label htmlFor="escalation-name" className="block text-sm font-medium text-gray-300 mb-1.5">
                    {t('nameLabel')}
                  </label>
                  <input
                    id="escalation-name"
                    type="text"
                    {...register('name')}
                    placeholder={t('namePlaceholder')}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange/50 transition-colors disabled:opacity-50"
                  />
                </div>

                {/* Company field (optional) */}
                <div>
                  <label htmlFor="escalation-company" className="block text-sm font-medium text-gray-300 mb-1.5">
                    {t('companyLabel')}
                  </label>
                  <input
                    id="escalation-company"
                    type="text"
                    {...register('company')}
                    placeholder={t('companyPlaceholder')}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange/50 transition-colors disabled:opacity-50"
                  />
                </div>

                {/* Email field (required) */}
                <div>
                  <label htmlFor="escalation-email" className="block text-sm font-medium text-gray-300 mb-1.5">
                    {t('emailLabel')} <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    id="escalation-email"
                    type="email"
                    {...register('email', {
                      required: t('emailRequired'),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t('emailInvalid'),
                      },
                    })}
                    placeholder={t('emailPlaceholder')}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 ${
                      errors.email
                        ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50'
                        : 'border-white/10 focus:ring-brand-orange/50 focus:border-brand-orange/50'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        {t('submitting')}
                      </>
                    ) : (
                      t('submit')
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default EscalationModal;
