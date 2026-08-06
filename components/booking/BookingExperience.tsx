'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, CalendarDays, Check, Clock3, ExternalLink, LoaderCircle, MonitorUp, Sparkles, Video } from 'lucide-react';
import { EXTERNAL_LINKS, withAttribution } from '@/lib/external-links';

type BookingProvider = 'google-meet' | 'microsoft-teams';
type BookingSlot = { start: string; end: string };
type Availability = {
  configured: boolean;
  providers: BookingProvider[];
  timeZone: string;
  durationMinutes: number;
  slots: BookingSlot[];
  temporarilyUnavailable?: boolean;
};

const emptyAvailability: Availability = {
  configured: false,
  providers: [],
  timeZone: 'Asia/Bangkok',
  durationMinutes: 30,
  slots: [],
};

function dateKey(value: string, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date(value));
  const get = (type: string) => parts.find((part) => part.type === type)?.value || '';
  return `${get('year')}-${get('month')}-${get('day')}`;
}

export function BookingExperience() {
  const t = useTranslations('bookingPage');
  const locale = useLocale();
  const [availability, setAvailability] = useState<Availability>(emptyAvailability);
  const [status, setStatus] = useState<'loading' | 'ready' | 'fallback'>('loading');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStart, setSelectedStart] = useState('');
  const [provider, setProvider] = useState<BookingProvider>('google-meet');
  const [submitting, setSubmitting] = useState(false);
  const [successEmail, setSuccessEmail] = useState('');
  const [error, setError] = useState('');
  // Keep the server and first client render identical. The browser timezone is
  // only available after hydration, so resolve it once the component mounts.
  const [visitorTimeZone, setVisitorTimeZone] = useState('Asia/Bangkok');

  const loadAvailability = async () => {
    setStatus('loading');
    setError('');
    try {
      const response = await fetch('/api/booking/availability', { cache: 'no-store' });
      const payload = await response.json() as Availability;
      if (!response.ok || !payload.configured) {
        setAvailability({ ...emptyAvailability, ...payload });
        setStatus('fallback');
        return;
      }
      setAvailability(payload);
      setStatus('ready');
      setProvider(payload.providers.includes('google-meet') ? 'google-meet' : payload.providers[0]);
    } catch {
      setStatus('fallback');
    }
  };

  useEffect(() => {
    setVisitorTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Bangkok');
    void loadAvailability();
  }, []);

  const slotsByDate = useMemo(() => {
    const result = new Map<string, BookingSlot[]>();
    for (const slot of availability.slots) {
      const key = dateKey(slot.start, visitorTimeZone);
      result.set(key, [...(result.get(key) || []), slot]);
    }
    return result;
  }, [availability.slots, visitorTimeZone]);

  const dates = [...slotsByDate.keys()].slice(0, 12);
  const activeDate = selectedDate || dates[0] || '';
  const activeSlots = slotsByDate.get(activeDate) || [];

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const company = String(form.get('company') || '').trim();
    if (!selectedStart || !name || !email || !company) {
      setError(t('required'));
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId: crypto.randomUUID().replaceAll('-', ''),
          start: selectedStart,
          provider,
          name,
          email,
          company,
          notes: String(form.get('notes') || ''),
          website: String(form.get('website') || ''),
          locale,
        }),
      });
      const payload = await response.json() as { code?: string };
      if (!response.ok) {
        if (payload.code === 'slot_unavailable') {
          setError(t('slotGone'));
          setSelectedStart('');
          await loadAvailability();
          return;
        }
        throw new Error('booking_failed');
      }
      setSuccessEmail(email);
    } catch {
      setError(t('genericError'));
    } finally {
      setSubmitting(false);
    }
  }

  if (successEmail) {
    return (
      <div className="grid min-h-[38rem] place-items-center p-6 text-center sm:p-12">
        <div className="max-w-xl">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-[#49d5c5]/30 bg-[#49d5c5]/10 text-[#49d5c5] shadow-[0_0_60px_rgba(73,213,197,.18)]">
            <Check className="h-8 w-8" aria-hidden="true" />
          </div>
          <p className="bma-kicker mt-8">{t('successEyebrow')}</p>
          <h2 className="mt-4 font-headline text-[clamp(2.35rem,5vw,4.25rem)] font-medium leading-[.98] tracking-[-0.055em] text-white">
            {t('successTitle')}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-white/52">{t('successDescription', { email: successEmail })}</p>
          <button type="button" onClick={() => { setSuccessEmail(''); setSelectedStart(''); }} className="bma-button-secondary mt-8 min-h-12 px-6">
            {t('bookAnother')} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  if (status === 'fallback') {
    return (
      <div className="grid min-h-[38rem] place-items-center p-6 sm:p-12">
        <div className="max-w-xl text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-[#efa634]/25 bg-[#efa634]/10 text-[#efa634]">
            <CalendarDays className="h-8 w-8" aria-hidden="true" />
          </div>
          <p className="bma-kicker mt-8">{t('fallbackEyebrow')}</p>
          <h2 className="mt-4 font-headline text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1] tracking-[-0.05em] text-white">{t('fallbackTitle')}</h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-white/50">{t('fallbackDescription')}</p>
          <a
            href={withAttribution(EXTERNAL_LINKS.calendly, 'booking', 'native_fallback')}
            target="_blank"
            rel="noopener noreferrer"
            className="bma-button-primary mt-8 min-h-13 px-7"
          >
            {t('fallbackButton')} <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {status === 'loading' && (
        <div className="absolute inset-0 z-20 grid min-h-[38rem] place-items-center rounded-[1.8rem] bg-[#071722]/90 backdrop-blur-xl" role="status">
          <div className="text-center">
            <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-[#49d5c5]" aria-hidden="true" />
            <p className="mt-4 font-label text-sm text-white/55">{t('loading')}</p>
          </div>
        </div>
      )}

      <form onSubmit={submit} className="grid lg:grid-cols-[.92fr_1.08fr]">
        <div className="border-b border-white/[0.08] p-5 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
          <BookingStep number="01" title={t('stepDate')} Icon={CalendarDays}>
            {dates.length ? (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {dates.map((key) => {
                  const date = new Date(slotsByDate.get(key)![0].start);
                  const active = key === activeDate;
                  return (
                    <button
                      type="button"
                      key={key}
                      aria-pressed={active}
                      onClick={() => { setSelectedDate(key); setSelectedStart(''); }}
                      className={`min-h-[5.3rem] rounded-2xl border px-3 text-left transition ${active ? 'border-[#efa634]/65 bg-[#efa634]/10 text-white shadow-[0_0_35px_rgba(239,166,52,.08)]' : 'border-white/10 bg-white/[0.018] text-white/52 hover:border-white/25 hover:text-white'}`}
                    >
                      <span className="block font-label text-[.63rem] uppercase tracking-[.15em] opacity-60">{date.toLocaleDateString(locale, { weekday: 'short', timeZone: visitorTimeZone })}</span>
                      <span className="mt-1 block font-headline text-lg font-medium">{date.toLocaleDateString(locale, { day: 'numeric', month: 'short', timeZone: visitorTimeZone })}</span>
                    </button>
                  );
                })}
              </div>
            ) : status === 'ready' ? <p className="text-sm leading-6 text-white/45">{t('noSlots')}</p> : null}
          </BookingStep>

          <BookingStep number="02" title={t('stepTime')} Icon={Clock3} className="mt-9 border-t border-white/[0.08] pt-8">
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {activeSlots.map((slot) => {
                const active = selectedStart === slot.start;
                return (
                  <button
                    type="button"
                    key={slot.start}
                    aria-pressed={active}
                    onClick={() => setSelectedStart(slot.start)}
                    className={`min-h-12 rounded-xl border font-mono text-sm transition ${active ? 'border-[#49d5c5]/65 bg-[#49d5c5]/10 text-[#8be9dd]' : 'border-white/10 bg-white/[0.018] text-white/55 hover:border-white/25 hover:text-white'}`}
                  >
                    {new Date(slot.start).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', timeZone: visitorTimeZone })}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-xs leading-5 text-white/35">{t('yourTimeZone', { timeZone: visitorTimeZone.replaceAll('_', ' ') })}</p>
          </BookingStep>
        </div>

        <div className="p-5 sm:p-8 lg:p-10">
          <BookingStep number="03" title={t('stepProvider')} Icon={Video}>
            <div className="grid gap-2 sm:grid-cols-2">
              {availability.providers.includes('google-meet') && (
                <ProviderButton active={provider === 'google-meet'} onClick={() => setProvider('google-meet')} Icon={Video} title={t('googleMeet')} />
              )}
              {availability.providers.includes('microsoft-teams') && (
                <ProviderButton active={provider === 'microsoft-teams'} onClick={() => setProvider('microsoft-teams')} Icon={MonitorUp} title={t('microsoftTeams')} />
              )}
            </div>
            <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-white/38"><Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#efa634]" />{t('meetNote')}</p>
          </BookingStep>

          <BookingStep number="04" title={t('stepDetails')} Icon={Sparkles} className="mt-9 border-t border-white/[0.08] pt-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <BookingField label={t('name')} name="name" autoComplete="name" required />
              <BookingField label={t('email')} name="email" type="email" autoComplete="email" required />
            </div>
            <div className="mt-4"><BookingField label={t('company')} name="company" autoComplete="organization" required /></div>
            <label className="mt-4 block">
              <span className="mb-2 block font-label text-xs font-semibold text-white/58">{t('notes')}</span>
              <textarea name="notes" maxLength={2000} rows={4} placeholder={t('notesPlaceholder')} className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/24 focus:border-[#49d5c5]/50 focus:bg-white/[0.055]" />
            </label>
            <label className="sr-only" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>

            {error && <p className="mt-4 rounded-xl border border-red-400/20 bg-red-400/[0.075] px-4 py-3 text-sm text-red-200" role="alert">{error}</p>}

            <button type="submit" disabled={submitting || !selectedStart} className="mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(95deg,#efa634_0%,#e7c762_48%,#49d5c5_100%)] px-6 font-label text-sm font-semibold text-[#07131c] shadow-[0_15px_45px_rgba(239,166,52,.16)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-35">
              {submitting ? <><LoaderCircle className="h-4 w-4 animate-spin" /> {t('confirming')}</> : <>{t('confirm')} <ArrowRight className="h-4 w-4" /></>}
            </button>
            <p className="mt-4 text-center text-[.68rem] leading-5 text-white/30">{t('privacy')}</p>
          </BookingStep>
        </div>
      </form>
    </div>
  );
}

function BookingStep({ number, title, Icon, className = '', children }: { number: string; title: string; Icon: typeof CalendarDays; className?: string; children: React.ReactNode }) {
  return (
    <section className={className}>
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <span className="font-mono text-[.65rem] text-[#efa634]">{number}</span>
          <h2 className="mt-1 font-headline text-xl font-medium tracking-[-0.025em] text-white">{title}</h2>
        </div>
        <Icon className="h-5 w-5 text-[#49d5c5]/65" aria-hidden="true" />
      </div>
      {children}
    </section>
  );
}

function ProviderButton({ active, onClick, Icon, title }: { active: boolean; onClick: () => void; Icon: typeof Video; title: string }) {
  return (
    <button type="button" aria-pressed={active} onClick={onClick} className={`flex min-h-[5rem] items-center gap-3 rounded-2xl border px-4 text-left transition ${active ? 'border-[#efa634]/60 bg-[#efa634]/10 text-white' : 'border-white/10 bg-white/[0.018] text-white/50 hover:border-white/25 hover:text-white'}`}>
      <span className={`grid h-10 w-10 place-items-center rounded-full ${active ? 'bg-[#efa634]/15 text-[#efa634]' : 'bg-white/[0.04]'}`}><Icon className="h-4 w-4" /></span>
      <span className="font-label text-sm font-semibold">{title}</span>
      {active && <Check className="ml-auto h-4 w-4 text-[#49d5c5]" />}
    </button>
  );
}

function BookingField({ label, name, type = 'text', autoComplete, required }: { label: string; name: string; type?: string; autoComplete?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-2 block font-label text-xs font-semibold text-white/58">{label}{required && <span className="ml-1 text-[#efa634]">*</span>}</span>
      <input name={name} type={type} autoComplete={autoComplete} required={required} maxLength={type === 'email' ? 254 : 160} className="min-h-13 w-full rounded-2xl border border-white/10 bg-white/[0.035] px-4 text-sm text-white outline-none transition placeholder:text-white/24 focus:border-[#49d5c5]/50 focus:bg-white/[0.055]" />
    </label>
  );
}
