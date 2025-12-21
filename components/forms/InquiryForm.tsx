'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

/**
 * Form data interface for the inquiry form
 */
interface InquiryFormData {
  name: string;
  company: string;
  email: string;
  message: string;
}

/**
 * Props for the InquiryForm component
 */
interface InquiryFormProps {
  /** Optional callback when form submission succeeds */
  onSuccess?: () => void;
  /** Optional callback when form submission fails */
  onError?: (error: string) => void;
}

/**
 * Form submission status type
 */
type SubmissionStatus = 'idle' | 'success' | 'error';

/**
 * Animation variants for form elements
 */
const inputVariants = {
  focus: { scale: 1.01 },
  blur: { scale: 1 },
};

/**
 * Animation variants for status messages
 */
const statusVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

/**
 * InquiryForm Component
 *
 * A reusable form component for music inquiries with:
 * - React Hook Form for state management
 * - API route submission with PostgreSQL storage
 * - Email notification via Gmail SMTP
 * - Field validation with error messages
 * - Loading state on submit button
 * - Success/error toast messages
 *
 * Fields:
 * - Name (required)
 * - Company (required)
 * - Email (required, validated)
 * - Message (required)
 */
export const InquiryForm: React.FC<InquiryFormProps> = ({
  onSuccess,
  onError,
}) => {
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InquiryFormData>({
    mode: 'onBlur',
  });

  /**
   * Handle form submission to API
   */
  const onSubmit = async (data: InquiryFormData) => {
    setStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        reset();
        onSuccess?.();

        // Reset success message after 5 seconds
        timeoutRef.current = setTimeout(() => {
          setStatus('idle');
        }, 5000);
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong';
      setStatus('error');
      setErrorMessage(message);
      onError?.(message);

      // Reset error message after 5 seconds
      timeoutRef.current = setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  /**
   * Common input field styles
   */
  const inputClassName = `
    w-full px-4 py-3
    bg-white/5 border border-white/10 rounded-lg
    text-white placeholder-gray-500
    focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent
    transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  /**
   * Error message styles
   */
  const errorClassName = 'text-red-400 text-sm mt-1';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Status Messages */}
      <AnimatePresence mode="wait">
        {status === 'success' && (
          <motion.div
            key="success"
            variants={statusVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-lg p-4"
            role="alert"
            aria-live="polite"
          >
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
            <p className="text-green-400">
              Thank you for your inquiry! We will get back to you within 24 hours.
            </p>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            key="error"
            variants={statusVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-lg p-4"
            role="alert"
            aria-live="assertive"
          >
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" aria-hidden="true" />
            <p className="text-red-400">
              {errorMessage || 'Something went wrong. Please try again.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name Field */}
      <div className="space-y-2">
        <label
          htmlFor="inquiry-name"
          className="block text-sm font-medium text-gray-300"
        >
          Name <span className="text-brand-orange">*</span>
        </label>
        <motion.div variants={inputVariants} whileFocus="focus">
          <input
            id="inquiry-name"
            type="text"
            autoComplete="name"
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
            })}
            className={inputClassName}
            placeholder="Your full name"
          />
        </motion.div>
        {errors.name && (
          <p id="name-error" className={errorClassName} role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Company Field */}
      <div className="space-y-2">
        <label
          htmlFor="inquiry-company"
          className="block text-sm font-medium text-gray-300"
        >
          Company <span className="text-brand-orange">*</span>
        </label>
        <motion.div variants={inputVariants} whileFocus="focus">
          <input
            id="inquiry-company"
            type="text"
            autoComplete="organization"
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={errors.company ? 'true' : 'false'}
            aria-describedby={errors.company ? 'company-error' : undefined}
            {...register('company', {
              required: 'Company name is required',
            })}
            className={inputClassName}
            placeholder="Your company name"
          />
        </motion.div>
        {errors.company && (
          <p id="company-error" className={errorClassName} role="alert">
            {errors.company.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label
          htmlFor="inquiry-email"
          className="block text-sm font-medium text-gray-300"
        >
          Email <span className="text-brand-orange">*</span>
        </label>
        <motion.div variants={inputVariants} whileFocus="focus">
          <input
            id="inquiry-email"
            type="email"
            autoComplete="email"
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address',
              },
            })}
            className={inputClassName}
            placeholder="you@company.com"
          />
        </motion.div>
        {errors.email && (
          <p id="email-error" className={errorClassName} role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <label
          htmlFor="inquiry-message"
          className="block text-sm font-medium text-gray-300"
        >
          Message <span className="text-brand-orange">*</span>
        </label>
        <motion.div variants={inputVariants} whileFocus="focus">
          <textarea
            id="inquiry-message"
            rows={4}
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
            {...register('message', {
              required: 'Message is required',
              minLength: {
                value: 10,
                message: 'Message must be at least 10 characters',
              },
            })}
            className={`${inputClassName} resize-none`}
            placeholder="Tell us about your music needs, venue type, or any questions you have..."
          />
        </motion.div>
        {errors.message && (
          <p id="message-error" className={errorClassName} role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        className="w-full bg-brand-orange hover:bg-brand-orange-dark disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" aria-hidden="true" />
            <span>Send Message</span>
          </>
        )}
      </motion.button>

      {/* Privacy note */}
      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to our privacy policy. We will never share your information with third parties.
      </p>
    </form>
  );
};

export default InquiryForm;
