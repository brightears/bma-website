'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { URLS } from '@/lib/constants';

/**
 * Country options for the dropdown
 * Focused on Asia-Pacific region where BMAsia primarily operates
 */
const COUNTRIES = [
  { value: '', label: 'Select a country' },
  // Asia-Pacific (Primary Markets)
  { value: 'SG', label: 'Singapore' },
  { value: 'MY', label: 'Malaysia' },
  { value: 'TH', label: 'Thailand' },
  { value: 'ID', label: 'Indonesia' },
  { value: 'PH', label: 'Philippines' },
  { value: 'VN', label: 'Vietnam' },
  { value: 'HK', label: 'Hong Kong' },
  { value: 'TW', label: 'Taiwan' },
  { value: 'JP', label: 'Japan' },
  { value: 'KR', label: 'South Korea' },
  { value: 'AU', label: 'Australia' },
  { value: 'NZ', label: 'New Zealand' },
  // Middle East
  { value: 'AE', label: 'United Arab Emirates' },
  // Western Markets
  { value: 'GB', label: 'United Kingdom' },
  { value: 'US', label: 'United States' },
  // Other option
  { value: 'OTHER', label: 'Other' },
] as const;

/**
 * Solution options for the preferred solution dropdown
 */
const SOLUTIONS = [
  { value: '', label: 'Select a solution' },
  { value: 'soundtrack-your-brand', label: 'Soundtrack Your Brand' },
  { value: 'beat-breeze', label: 'Beat Breeze' },
  { value: 'not-sure', label: 'Not Sure Yet' },
] as const;

/**
 * Form data interface for the quotation request form
 */
interface QuotationFormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  otherCountry?: string;
  companyName: string;
  companyAddress: string;
  preferredSolution: string;
  numberOfZones: number;
}

/**
 * Props for the QuotationForm component
 */
interface QuotationFormProps {
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
 * QuotationForm Component
 *
 * A comprehensive quotation request form with:
 * - React Hook Form for state management
 * - Formspree integration for submission
 * - Field validation with error messages
 * - Loading state on submit button
 * - Success/error toast messages
 * - Conditional "Other" country input
 *
 * Fields:
 * - First Name (required)
 * - Last Name (required)
 * - Email (required, validated)
 * - Country (required, select dropdown)
 * - Company Name (required)
 * - Company Address (required, textarea)
 * - Preferred Solution (required, select dropdown)
 * - Number of Zones (required, number input, min 1)
 */
export const QuotationForm: React.FC<QuotationFormProps> = ({
  onSuccess,
  onError,
}) => {
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<QuotationFormData>({
    mode: 'onBlur',
    defaultValues: {
      numberOfZones: 1,
    },
  });

  // Watch the country field to conditionally show "Other" input
  const selectedCountry = watch('country');

  /**
   * Handle form submission to Formspree
   */
  const onSubmit = async (data: QuotationFormData) => {
    setStatus('idle');
    setErrorMessage('');

    try {
      const formspreeUrl = URLS.formspreeQuotation
        ? `https://formspree.io/f/${URLS.formspreeQuotation}`
        : '';

      if (!formspreeUrl) {
        throw new Error('Form submission endpoint not configured');
      }

      // Prepare submission data
      const submissionData = {
        ...data,
        country:
          data.country === 'OTHER' && data.otherCountry
            ? data.otherCountry
            : COUNTRIES.find((c) => c.value === data.country)?.label ||
              data.country,
        preferredSolution:
          SOLUTIONS.find((s) => s.value === data.preferredSolution)?.label ||
          data.preferredSolution,
      };

      const response = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        setStatus('success');
        reset();
        onSuccess?.();

        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus('idle');
        }, 5000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to submit quotation request');
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong';
      setStatus('error');
      setErrorMessage(message);
      onError?.(message);

      // Reset error message after 5 seconds
      setTimeout(() => {
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
   * Select dropdown styles
   */
  const selectClassName = `
    w-full px-4 py-3
    bg-white/5 border border-white/10 rounded-lg
    text-white
    focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent
    transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
    appearance-none
    bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20width%3d%2224%22%20height%3d%2224%22%20viewBox%3d%220%200%2024%2024%22%20fill%3d%22none%22%20stroke%3d%22%239ca3af%22%20stroke-width%3d%222%22%20stroke-linecap%3d%22round%22%20stroke-linejoin%3d%22round%22%3e%3cpolyline%20points%3d%226%209%2012%2015%2018%209%22%3e%3c%2fpolyline%3e%3c%2fsvg%3e')]
    bg-[length:1.5rem]
    bg-[right_0.5rem_center]
    bg-no-repeat
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
            <CheckCircle
              className="w-5 h-5 text-green-400 flex-shrink-0"
              aria-hidden="true"
            />
            <p className="text-green-400">
              Thank you for your quotation request! We will get back to you
              within 24-48 hours with a personalized quote.
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
            <AlertCircle
              className="w-5 h-5 text-red-400 flex-shrink-0"
              aria-hidden="true"
            />
            <p className="text-red-400">
              {errorMessage || 'Something went wrong. Please try again.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name Fields - Two columns on larger screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* First Name Field */}
        <div className="space-y-2">
          <label
            htmlFor="quotation-firstName"
            className="block text-sm font-medium text-gray-300"
          >
            First Name <span className="text-brand-orange">*</span>
          </label>
          <motion.div variants={inputVariants} whileFocus="focus">
            <input
              id="quotation-firstName"
              type="text"
              autoComplete="given-name"
              disabled={isSubmitting}
              aria-required="true"
              aria-invalid={errors.firstName ? 'true' : 'false'}
              aria-describedby={
                errors.firstName ? 'firstName-error' : undefined
              }
              {...register('firstName', {
                required: 'First name is required',
                minLength: {
                  value: 2,
                  message: 'First name must be at least 2 characters',
                },
              })}
              className={inputClassName}
              placeholder="John"
            />
          </motion.div>
          {errors.firstName && (
            <p id="firstName-error" className={errorClassName} role="alert">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name Field */}
        <div className="space-y-2">
          <label
            htmlFor="quotation-lastName"
            className="block text-sm font-medium text-gray-300"
          >
            Last Name <span className="text-brand-orange">*</span>
          </label>
          <motion.div variants={inputVariants} whileFocus="focus">
            <input
              id="quotation-lastName"
              type="text"
              autoComplete="family-name"
              disabled={isSubmitting}
              aria-required="true"
              aria-invalid={errors.lastName ? 'true' : 'false'}
              aria-describedby={errors.lastName ? 'lastName-error' : undefined}
              {...register('lastName', {
                required: 'Last name is required',
                minLength: {
                  value: 2,
                  message: 'Last name must be at least 2 characters',
                },
              })}
              className={inputClassName}
              placeholder="Doe"
            />
          </motion.div>
          {errors.lastName && (
            <p id="lastName-error" className={errorClassName} role="alert">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label
          htmlFor="quotation-email"
          className="block text-sm font-medium text-gray-300"
        >
          Email <span className="text-brand-orange">*</span>
        </label>
        <motion.div variants={inputVariants} whileFocus="focus">
          <input
            id="quotation-email"
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
            placeholder="john.doe@company.com"
          />
        </motion.div>
        {errors.email && (
          <p id="email-error" className={errorClassName} role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Country Field */}
      <div className="space-y-2">
        <label
          htmlFor="quotation-country"
          className="block text-sm font-medium text-gray-300"
        >
          Country <span className="text-brand-orange">*</span>
        </label>
        <motion.div variants={inputVariants} whileFocus="focus">
          <select
            id="quotation-country"
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={errors.country ? 'true' : 'false'}
            aria-describedby={errors.country ? 'country-error' : undefined}
            {...register('country', {
              required: 'Please select a country',
            })}
            className={selectClassName}
          >
            {COUNTRIES.map((country) => (
              <option
                key={country.value}
                value={country.value}
                className="bg-brand-navy text-white"
              >
                {country.label}
              </option>
            ))}
          </select>
        </motion.div>
        {errors.country && (
          <p id="country-error" className={errorClassName} role="alert">
            {errors.country.message}
          </p>
        )}
      </div>

      {/* Other Country Field - Conditionally shown */}
      <AnimatePresence>
        {selectedCountry === 'OTHER' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-2 overflow-hidden"
          >
            <label
              htmlFor="quotation-otherCountry"
              className="block text-sm font-medium text-gray-300"
            >
              Please specify your country{' '}
              <span className="text-brand-orange">*</span>
            </label>
            <motion.div variants={inputVariants} whileFocus="focus">
              <input
                id="quotation-otherCountry"
                type="text"
                disabled={isSubmitting}
                aria-required={selectedCountry === 'OTHER'}
                aria-invalid={errors.otherCountry ? 'true' : 'false'}
                aria-describedby={
                  errors.otherCountry ? 'otherCountry-error' : undefined
                }
                {...register('otherCountry', {
                  required:
                    selectedCountry === 'OTHER'
                      ? 'Please specify your country'
                      : false,
                })}
                className={inputClassName}
                placeholder="Enter your country"
              />
            </motion.div>
            {errors.otherCountry && (
              <p id="otherCountry-error" className={errorClassName} role="alert">
                {errors.otherCountry.message}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Company Name Field */}
      <div className="space-y-2">
        <label
          htmlFor="quotation-companyName"
          className="block text-sm font-medium text-gray-300"
        >
          Company Name <span className="text-brand-orange">*</span>
        </label>
        <motion.div variants={inputVariants} whileFocus="focus">
          <input
            id="quotation-companyName"
            type="text"
            autoComplete="organization"
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={errors.companyName ? 'true' : 'false'}
            aria-describedby={
              errors.companyName ? 'companyName-error' : undefined
            }
            {...register('companyName', {
              required: 'Company name is required',
            })}
            className={inputClassName}
            placeholder="Your company name"
          />
        </motion.div>
        {errors.companyName && (
          <p id="companyName-error" className={errorClassName} role="alert">
            {errors.companyName.message}
          </p>
        )}
      </div>

      {/* Company Address Field */}
      <div className="space-y-2">
        <label
          htmlFor="quotation-companyAddress"
          className="block text-sm font-medium text-gray-300"
        >
          Company Address <span className="text-brand-orange">*</span>
        </label>
        <motion.div variants={inputVariants} whileFocus="focus">
          <textarea
            id="quotation-companyAddress"
            rows={3}
            autoComplete="street-address"
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={errors.companyAddress ? 'true' : 'false'}
            aria-describedby={
              errors.companyAddress ? 'companyAddress-error' : undefined
            }
            {...register('companyAddress', {
              required: 'Company address is required',
              minLength: {
                value: 10,
                message: 'Please provide a complete address',
              },
            })}
            className={`${inputClassName} resize-none`}
            placeholder="Full business address including city and postal code"
          />
        </motion.div>
        {errors.companyAddress && (
          <p id="companyAddress-error" className={errorClassName} role="alert">
            {errors.companyAddress.message}
          </p>
        )}
      </div>

      {/* Preferred Solution Field */}
      <div className="space-y-2">
        <label
          htmlFor="quotation-preferredSolution"
          className="block text-sm font-medium text-gray-300"
        >
          Preferred Solution <span className="text-brand-orange">*</span>
        </label>
        <motion.div variants={inputVariants} whileFocus="focus">
          <select
            id="quotation-preferredSolution"
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={errors.preferredSolution ? 'true' : 'false'}
            aria-describedby={
              errors.preferredSolution ? 'preferredSolution-error' : undefined
            }
            {...register('preferredSolution', {
              required: 'Please select a solution',
            })}
            className={selectClassName}
          >
            {SOLUTIONS.map((solution) => (
              <option
                key={solution.value}
                value={solution.value}
                className="bg-brand-navy text-white"
              >
                {solution.label}
              </option>
            ))}
          </select>
        </motion.div>
        {errors.preferredSolution && (
          <p
            id="preferredSolution-error"
            className={errorClassName}
            role="alert"
          >
            {errors.preferredSolution.message}
          </p>
        )}
      </div>

      {/* Number of Zones Field */}
      <div className="space-y-2">
        <label
          htmlFor="quotation-numberOfZones"
          className="block text-sm font-medium text-gray-300"
        >
          Number of Zones <span className="text-brand-orange">*</span>
        </label>
        <motion.div variants={inputVariants} whileFocus="focus">
          <input
            id="quotation-numberOfZones"
            type="number"
            min="1"
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={errors.numberOfZones ? 'true' : 'false'}
            aria-describedby={
              errors.numberOfZones ? 'numberOfZones-error' : undefined
            }
            {...register('numberOfZones', {
              required: 'Number of zones is required',
              min: {
                value: 1,
                message: 'Must be at least 1 zone',
              },
              valueAsNumber: true,
            })}
            className={inputClassName}
            placeholder="1"
          />
        </motion.div>
        <p className="text-xs text-gray-500">
          A zone represents a distinct area where music will be played (e.g.,
          lobby, restaurant, spa)
        </p>
        {errors.numberOfZones && (
          <p id="numberOfZones-error" className={errorClassName} role="alert">
            {errors.numberOfZones.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        className="w-full bg-brand-orange hover:bg-brand-orange-dark disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/20"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" aria-hidden="true" />
            <span>Request Quotation</span>
          </>
        )}
      </motion.button>

      {/* Privacy note */}
      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to our privacy policy. We will never
        share your information with third parties.
      </p>
    </form>
  );
};

export default QuotationForm;
