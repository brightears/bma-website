'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

type TrialFormData = {
  name: string;
  email: string;
  company: string;
  country: string;
  businessType: string;
  locationName: string;
  zoneName: string;
  consent: boolean;
  website?: string;
};

type SubmissionState = 'idle' | 'success' | 'error';

const BUSINESS_TYPES = ['hotel', 'restaurant', 'retail', 'fitness', 'office', 'other'] as const;

export function SoundtrackTrialForm() {
  const t = useTranslations('soundtrackTrialPage.form');
  const locale = useLocale();
  const [state, setState] = useState<SubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TrialFormData>({
    mode: 'onBlur',
    defaultValues: { businessType: '', consent: false, zoneName: '' },
  });

  const onSubmit = async (data: TrialFormData) => {
    setState('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/soundtrack-trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || t('error'));

      setState('success');
      reset();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t('error'));
      setState('error');
    }
  };

  const fieldClass = 'min-h-12 w-full rounded-xl border border-[#d6c2ff]/16 bg-white/[0.045] px-4 text-white outline-none transition placeholder:text-white/28 focus:border-[#d6c2ff]/55 focus:ring-2 focus:ring-[#d6c2ff]/10 disabled:opacity-50';
  const labelClass = 'mb-2 block text-sm font-medium text-white/74';
  const errorClass = 'mt-1.5 text-sm text-[#ffaaa5]';

  if (state === 'success') {
    return (
      <div className="flex min-h-[34rem] flex-col justify-center rounded-[1.75rem] border border-[#d6c2ff]/18 bg-white/[0.04] p-8 sm:p-10" role="status">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-[#d6c2ff] text-[#190d21]">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-7 text-balance font-headline text-3xl font-medium tracking-[-0.04em] text-white sm:text-4xl">{t('successTitle')}</h2>
        <p className="mt-4 max-w-md text-pretty text-lg leading-8 text-white/58">{t('successMessage')}</p>
        <Link href={`/${locale}/soundtrack-your-brand`} className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-[#d6c2ff]">
          {t('back')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="rounded-[1.75rem] border border-[#d6c2ff]/18 bg-white/[0.04] p-6 sm:p-9">
      <h2 className="text-balance font-headline text-3xl font-medium tracking-[-0.04em] text-white">{t('title')}</h2>
      <p className="mt-3 text-pretty leading-7 text-white/52">{t('subtitle')}</p>

      {state === 'error' && (
        <div id="trial-form-error" className="mt-6 rounded-xl border border-red-300/25 bg-red-300/10 p-4 text-sm text-[#ffaaa5]" role="alert">
          {errorMessage || t('error')}
        </div>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="trial-name">{t('name')} *</label>
          <input id="trial-name" autoComplete="name" disabled={isSubmitting} className={fieldClass} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'trial-name-error' : undefined} {...register('name', { required: t('required'), minLength: 2, maxLength: 120 })} />
          {errors.name && <p id="trial-name-error" className={errorClass}>{t('required')}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="trial-email">{t('email')} *</label>
          <input id="trial-email" type="email" autoComplete="email" disabled={isSubmitting} className={fieldClass} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'trial-email-error' : undefined} {...register('email', { required: t('required'), pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} />
          {errors.email && <p id="trial-email-error" className={errorClass}>{errors.email.type === 'pattern' ? t('invalidEmail') : t('required')}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="trial-company">{t('company')} *</label>
          <input id="trial-company" autoComplete="organization" disabled={isSubmitting} className={fieldClass} aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? 'trial-company-error' : undefined} {...register('company', { required: t('required'), maxLength: 160 })} />
          {errors.company && <p id="trial-company-error" className={errorClass}>{t('required')}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="trial-country">{t('country')} *</label>
          <input id="trial-country" autoComplete="country-name" disabled={isSubmitting} className={fieldClass} aria-invalid={Boolean(errors.country)} aria-describedby={errors.country ? 'trial-country-error' : undefined} {...register('country', { required: t('required'), maxLength: 100 })} />
          {errors.country && <p id="trial-country-error" className={errorClass}>{t('required')}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="trial-business-type">{t('businessType')} *</label>
          <select id="trial-business-type" disabled={isSubmitting} className={`${fieldClass} appearance-none`} aria-invalid={Boolean(errors.businessType)} aria-describedby={errors.businessType ? 'trial-business-error' : undefined} {...register('businessType', { required: t('required') })}>
            <option value="" className="bg-[#190d21]">{t('select')}</option>
            {BUSINESS_TYPES.map((type) => <option key={type} value={type} className="bg-[#190d21]">{t(type)}</option>)}
          </select>
          {errors.businessType && <p id="trial-business-error" className={errorClass}>{t('required')}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="trial-location">{t('locationName')} *</label>
          <input id="trial-location" disabled={isSubmitting} className={fieldClass} placeholder={t('locationPlaceholder')} aria-invalid={Boolean(errors.locationName)} aria-describedby={errors.locationName ? 'trial-location-error' : undefined} {...register('locationName', { required: t('required'), maxLength: 160 })} />
          {errors.locationName && <p id="trial-location-error" className={errorClass}>{t('required')}</p>}
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="trial-zone">{t('zoneName')}</label>
          <input id="trial-zone" disabled={isSubmitting} className={fieldClass} placeholder={t('zonePlaceholder')} {...register('zoneName', { maxLength: 160 })} />
          <p className="mt-2 text-xs leading-5 text-white/36">{t('zoneHint')}</p>
        </div>
      </div>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="trial-website">Website</label>
        <input id="trial-website" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm leading-6 text-white/48">
        <input type="checkbox" className="mt-1 h-4 w-4 accent-[#d6c2ff]" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? 'trial-consent-error' : undefined} {...register('consent', { required: t('consentRequired') })} />
        <span>
          {t('consent')}{' '}
          <Link href={`/${locale}/privacy`} className="text-[#d6c2ff] underline-offset-4 hover:underline">{t('privacy')}</Link>.
        </span>
      </label>
      {errors.consent && <p id="trial-consent-error" className={errorClass}>{t('consentRequired')}</p>}

      <button type="submit" disabled={isSubmitting} className="mt-7 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#d6c2ff] px-7 font-label text-sm font-semibold text-[#190d21] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60">
        {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> {t('submitting')}</> : <>{t('submit')} <ArrowRight className="h-4 w-4" aria-hidden="true" /></>}
      </button>
      <p className="mt-4 text-center text-xs leading-5 text-white/32">{t('footnote')}</p>
    </form>
  );
}
