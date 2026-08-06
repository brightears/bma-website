'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  ChevronDown,
  Loader2,
  MapPin,
  Send,
  Sparkles,
  Users,
} from 'lucide-react';

const COUNTRY_CODES = [
  { value: '', key: 'select' },
  { value: 'SG', key: 'singapore' },
  { value: 'MY', key: 'malaysia' },
  { value: 'TH', key: 'thailand' },
  { value: 'ID', key: 'indonesia' },
  { value: 'PH', key: 'philippines' },
  { value: 'VN', key: 'vietnam' },
  { value: 'HK', key: 'hongKong' },
  { value: 'TW', key: 'taiwan' },
  { value: 'JP', key: 'japan' },
  { value: 'KR', key: 'southKorea' },
  { value: 'AU', key: 'australia' },
  { value: 'NZ', key: 'newZealand' },
  { value: 'AE', key: 'uae' },
  { value: 'GB', key: 'unitedKingdom' },
  { value: 'US', key: 'unitedStates' },
  { value: 'OTHER', key: 'other' },
] as const;

const SOLUTION_KEYS = [
  { value: 'beat-breeze', key: 'beatBreeze', accent: '#49d5c5' },
  { value: 'soundtrack-your-brand', key: 'soundtrackYourBrand', accent: '#d6c2ff' },
  { value: 'not-sure', key: 'notSure', accent: '#efa634' },
] as const;

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
  website?: string;
}

interface QuotationFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

type SubmissionStatus = 'idle' | 'success' | 'error';

const statusVariants = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const inputClassName = [
  'min-h-14 w-full rounded-[1rem] border border-white/[0.11] bg-[#071723]/80 px-4',
  'text-[0.97rem] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.025)] outline-none',
  'transition duration-200 placeholder:text-white/25 hover:border-white/[0.18]',
  'focus:border-[#efa634]/65 focus:bg-[#091c29] focus:ring-4 focus:ring-[#efa634]/[0.08]',
  'disabled:cursor-not-allowed disabled:opacity-50',
].join(' ');

const labelClassName = 'mb-2.5 block font-label text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/58';
const errorClassName = 'mt-2 text-sm text-[#ffaaa5]';

export const QuotationForm: React.FC<QuotationFormProps> = ({ onSuccess, onError }) => {
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchParams = useSearchParams();
  const t = useTranslations('forms.quotation');
  const tValidation = useTranslations('forms.validation');
  const tCountries = useTranslations('countries');
  const tSolutions = useTranslations('solutions');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<QuotationFormData>({
    mode: 'onBlur',
    defaultValues: { country: '', preferredSolution: '', numberOfZones: 1 },
  });

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    const solution = searchParams.get('solution');
    if (solution === 'beat-breeze' || solution === 'soundtrack-your-brand') {
      setValue('preferredSolution', solution, { shouldValidate: false });
    }
  }, [searchParams, setValue]);

  const selectedCountry = watch('country');
  const selectedSolution = watch('preferredSolution');

  const onSubmit = async (data: QuotationFormData) => {
    setStatus('idle');
    setErrorMessage('');

    try {
      const countryEntry = COUNTRY_CODES.find((country) => country.value === data.country);
      const countryName = data.country === 'OTHER' && data.otherCountry
        ? data.otherCountry
        : countryEntry ? tCountries(countryEntry.key) : data.country;

      const response = await fetch('/api/quotation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, country: countryName }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || t('errorMessage'));

      setStatus('success');
      reset();
      onSuccess?.();
      timeoutRef.current = setTimeout(() => setStatus('idle'), 7000);
    } catch {
      const message = t('errorMessage');
      setStatus('error');
      setErrorMessage(message);
      onError?.(message);
      timeoutRef.current = setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 7000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-5">
      <AnimatePresence mode="wait">
        {status !== 'idle' && (
          <motion.div
            key={status}
            variants={statusVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`flex items-start gap-3 rounded-2xl border p-4 ${
              status === 'success'
                ? 'border-[#49d5c5]/25 bg-[#49d5c5]/[0.08] text-[#8ce6dc]'
                : 'border-[#ff7d73]/25 bg-[#ff7d73]/[0.08] text-[#ffaaa5]'
            }`}
            role="alert"
            aria-live={status === 'success' ? 'polite' : 'assertive'}
          >
            {status === 'success'
              ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              : <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />}
            <p className="text-sm leading-6">{status === 'success' ? t('successMessage') : errorMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <FormChapter number="01" Icon={Users}>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField htmlFor="quotation-firstName" label={t('fields.firstName.label')} error={errors.firstName?.message} errorId="firstName-error">
            <input
              id="quotation-firstName"
              autoComplete="given-name"
              disabled={isSubmitting}
              aria-required="true"
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={errors.firstName ? 'firstName-error' : undefined}
              className={inputClassName}
              placeholder={t('fields.firstName.placeholder')}
              {...register('firstName', {
                required: tValidation('required', { field: t('fields.firstName.label') }),
                minLength: { value: 2, message: tValidation('minLength', { field: t('fields.firstName.label'), count: 2 }) },
              })}
            />
          </FormField>
          <FormField htmlFor="quotation-lastName" label={t('fields.lastName.label')} error={errors.lastName?.message} errorId="lastName-error">
            <input
              id="quotation-lastName"
              autoComplete="family-name"
              disabled={isSubmitting}
              aria-required="true"
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby={errors.lastName ? 'lastName-error' : undefined}
              className={inputClassName}
              placeholder={t('fields.lastName.placeholder')}
              {...register('lastName', {
                required: tValidation('required', { field: t('fields.lastName.label') }),
                minLength: { value: 2, message: tValidation('minLength', { field: t('fields.lastName.label'), count: 2 }) },
              })}
            />
          </FormField>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-[1.15fr_.85fr]">
          <FormField htmlFor="quotation-email" label={t('fields.email.label')} error={errors.email?.message} errorId="email-error">
            <input
              id="quotation-email"
              type="email"
              autoComplete="email"
              disabled={isSubmitting}
              aria-required="true"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={inputClassName}
              placeholder={t('fields.email.placeholder')}
              {...register('email', {
                required: tValidation('required', { field: t('fields.email.label') }),
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: tValidation('invalidEmail') },
              })}
            />
          </FormField>
          <FormField htmlFor="quotation-country" label={t('fields.country.label')} error={errors.country?.message} errorId="country-error">
            <div className="relative">
              <select
                id="quotation-country"
                disabled={isSubmitting}
                aria-required="true"
                aria-invalid={Boolean(errors.country)}
                aria-describedby={errors.country ? 'country-error' : undefined}
                className={`${inputClassName} appearance-none pr-12`}
                {...register('country', { required: tValidation('selectRequired') })}
              >
                {COUNTRY_CODES.map((country) => (
                  <option key={country.value} value={country.value} disabled={!country.value} className="bg-[#0a1a25] text-white">
                    {tCountries(country.key)}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/38" aria-hidden="true" />
            </div>
          </FormField>
        </div>

        <AnimatePresence>
          {selectedCountry === 'OTHER' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-5 overflow-hidden">
              <FormField htmlFor="quotation-otherCountry" label={t('fields.otherCountry.label')} error={errors.otherCountry?.message} errorId="otherCountry-error">
                <input
                  id="quotation-otherCountry"
                  disabled={isSubmitting}
                  aria-required="true"
                  aria-invalid={Boolean(errors.otherCountry)}
                  aria-describedby={errors.otherCountry ? 'otherCountry-error' : undefined}
                  className={inputClassName}
                  placeholder={t('fields.otherCountry.placeholder')}
                  {...register('otherCountry', {
                    required: selectedCountry === 'OTHER'
                      ? tValidation('required', { field: t('fields.otherCountry.label') })
                      : false,
                  })}
                />
              </FormField>
            </motion.div>
          )}
        </AnimatePresence>
      </FormChapter>

      <FormChapter number="02" Icon={Building2}>
        <FormField htmlFor="quotation-companyName" label={t('fields.companyName.label')} error={errors.companyName?.message} errorId="companyName-error">
          <input
            id="quotation-companyName"
            autoComplete="organization"
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={Boolean(errors.companyName)}
            aria-describedby={errors.companyName ? 'companyName-error' : undefined}
            className={inputClassName}
            placeholder={t('fields.companyName.placeholder')}
            {...register('companyName', { required: tValidation('required', { field: t('fields.companyName.label') }) })}
          />
        </FormField>
        <div className="mt-5">
          <FormField htmlFor="quotation-companyAddress" label={t('fields.companyAddress.label')} error={errors.companyAddress?.message} errorId="companyAddress-error">
            <div className="relative">
                <MapPin className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-[#49d5c5]/55" aria-hidden="true" />
              <textarea
                id="quotation-companyAddress"
                rows={3}
                autoComplete="street-address"
                disabled={isSubmitting}
                aria-required="true"
                aria-invalid={Boolean(errors.companyAddress)}
                aria-describedby={errors.companyAddress ? 'companyAddress-error' : undefined}
                className={`${inputClassName} min-h-28 resize-y py-4 pl-11`}
                placeholder={t('fields.companyAddress.placeholder')}
                {...register('companyAddress', {
                  required: tValidation('required', { field: t('fields.companyAddress.label') }),
                  minLength: { value: 10, message: tValidation('minLength', { field: t('fields.companyAddress.label'), count: 10 }) },
                })}
              />
            </div>
          </FormField>
        </div>
      </FormChapter>

      <FormChapter number="03" Icon={Sparkles}>
        <fieldset>
          <legend className={labelClassName}>{t('fields.preferredSolution.label')} <span className="text-[#efa634]">*</span></legend>
          <div className="grid gap-2.5 sm:grid-cols-3">
            {SOLUTION_KEYS.map((solution) => {
              const active = selectedSolution === solution.value;
              return (
                <label
                  key={solution.value}
                  className={`group relative flex min-h-24 cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border p-4 transition duration-200 ${
                    active ? 'border-white/30 bg-white/[0.075]' : 'border-white/[0.09] bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.045]'
                  }`}
                >
                  <input
                    type="radio"
                    value={solution.value}
                    disabled={isSubmitting}
                    className="sr-only"
                    {...register('preferredSolution', { required: tValidation('selectRequired') })}
                  />
                  <span className="h-1 w-8 rounded-full transition-all group-hover:w-11" style={{ backgroundColor: solution.accent }} aria-hidden="true" />
                  <span className="mt-5 text-sm font-medium leading-5 text-white/78">{tSolutions(solution.key)}</span>
                  {active && <span className="absolute right-3 top-3 h-2 w-2 rounded-full" style={{ backgroundColor: solution.accent }} aria-hidden="true" />}
                </label>
              );
            })}
          </div>
          {errors.preferredSolution && <p id="preferredSolution-error" className={errorClassName} role="alert">{errors.preferredSolution.message}</p>}
        </fieldset>

        <div className="mt-5">
          <FormField htmlFor="quotation-numberOfZones" label={t('fields.numberOfZones.label')} error={errors.numberOfZones?.message} errorId="numberOfZones-error">
            <div className="relative">
              <Users className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#efa634]/60" aria-hidden="true" />
              <input
                id="quotation-numberOfZones"
                type="number"
                min="1"
                disabled={isSubmitting}
                aria-required="true"
                aria-invalid={Boolean(errors.numberOfZones)}
                aria-describedby={errors.numberOfZones ? 'numberOfZones-error quotation-numberOfZones-help' : 'quotation-numberOfZones-help'}
                className={`${inputClassName} pl-11`}
                placeholder={t('fields.numberOfZones.placeholder')}
                {...register('numberOfZones', {
                  required: tValidation('required', { field: t('fields.numberOfZones.label') }),
                  min: { value: 1, message: tValidation('minValue', { min: 1 }) },
                  valueAsNumber: true,
                })}
              />
            </div>
            <p id="quotation-numberOfZones-help" className="mt-2 text-xs leading-5 text-white/34">{t('fields.numberOfZones.help')}</p>
          </FormField>
        </div>
      </FormChapter>

      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="quotation-website">Website</label>
        <input id="quotation-website" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={isSubmitting ? undefined : { y: -2 }}
        whileTap={isSubmitting ? undefined : { y: 0 }}
        className="group relative flex min-h-16 w-full items-center justify-between overflow-hidden rounded-[1.15rem] bg-[linear-gradient(100deg,#efa634_0%,#e7c762_48%,#49d5c5_100%)] px-5 font-label text-sm font-semibold text-[#07131c] shadow-[0_20px_60px_rgba(73,213,197,.08)] transition disabled:cursor-not-allowed disabled:grayscale disabled:opacity-60 sm:px-6"
      >
        <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-white/18 transition-transform duration-700 group-hover:translate-x-[420%]" aria-hidden="true" />
        <span>{isSubmitting ? t('submitButton.sending') : t('submitButton.default')}</span>
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#07131c]/10">
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
        </span>
      </motion.button>

      <p className="px-2 text-center text-xs leading-5 text-white/32">{t('privacyNote')}</p>
    </form>
  );
};

function FormChapter({ number, Icon, children }: { number: string; Icon: typeof Users; children: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden rounded-[1.4rem] border border-white/[0.08] bg-white/[0.025] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.02)] sm:p-5">
      <div className="pointer-events-none absolute -right-10 -top-14 h-32 w-32 rounded-full bg-[#49d5c5]/[0.035] blur-2xl" aria-hidden="true" />
      <div className="mb-5 flex items-center gap-3 border-b border-white/[0.07] pb-4" aria-hidden="true">
        <span className="font-mono text-[0.67rem] tracking-[0.16em] text-[#efa634]">{number}</span>
        <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(239,166,52,.3),rgba(73,213,197,.08),transparent)]" />
        <Icon className="h-4 w-4 text-[#49d5c5]/60" />
      </div>
      {children}
    </section>
  );
}

function FormField({ htmlFor, label, error, errorId, children }: { htmlFor: string; label: string; error?: string; errorId: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelClassName}>{label} <span className="text-[#efa634]">*</span></label>
      {children}
      {error && <p id={errorId} className={errorClassName} role="alert">{error}</p>}
    </div>
  );
}

export default QuotationForm;
