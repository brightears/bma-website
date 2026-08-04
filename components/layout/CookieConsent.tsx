'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { BarChart3, Check, ShieldCheck, X } from 'lucide-react';

type ConsentChoice = 'pending' | 'necessary' | 'analytics';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    trackingFunctions?: { onLoad?: (config: { appId: string }) => void };
  }
}

const STORAGE_KEY = 'cookie_consent_v2';

export function CookieConsent() {
  const locale = useLocale();
  const t = useTranslations('cookieBanner');
  const [choice, setChoice] = useState<ConsentChoice>('pending');
  const [visible, setVisible] = useState(false);
  const [manageMode, setManageMode] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const legacy = window.localStorage.getItem('cookie_consent');
    const initial: ConsentChoice = stored === 'analytics' || legacy === 'accepted'
      ? 'analytics'
      : stored === 'necessary' || legacy === 'rejected'
        ? 'necessary'
        : 'pending';

    setChoice(initial);
    if (initial === 'analytics') enableAnalytics();
    if (initial === 'pending') {
      const timer = window.setTimeout(() => setVisible(true), 700);
      return () => window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const openPreferences = () => {
      setManageMode(true);
      setVisible(true);
    };
    window.addEventListener('bma:open-cookie-preferences', openPreferences);
    return () => window.removeEventListener('bma:open-cookie-preferences', openPreferences);
  }, []);

  const save = (next: Exclude<ConsentChoice, 'pending'>) => {
    const wasAnalytics = choice === 'analytics';
    window.localStorage.setItem(STORAGE_KEY, next);
    window.localStorage.removeItem('cookie_consent');
    setChoice(next);
    setVisible(false);
    setManageMode(false);

    if (next === 'analytics') {
      enableAnalytics();
      return;
    }

    denyAnalytics();
    if (wasAnalytics) window.location.reload();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] p-3 sm:p-5" role="region" aria-label={t('title')}>
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[1.5rem] border border-white/12 bg-[#091722]/98 shadow-[0_30px_110px_rgba(0,0,0,.72)] backdrop-blur-2xl">
        <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="flex items-start gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand-orange/20 bg-brand-orange/[0.08] text-brand-orange">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-label text-base font-semibold text-white">{manageMode ? t('manageTitle') : t('title')}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
                  {t('description')}{' '}
                  <Link href={`/${locale}/cookies`} className="text-brand-orange hover:text-[#ffc164]">{t('policy')}</Link>
                </p>
              </div>
              {manageMode && (
                <button type="button" className="ml-auto grid h-9 w-9 shrink-0 place-items-center rounded-full text-white/48 hover:bg-white/[0.06] hover:text-white" onClick={() => setVisible(false)} aria-label={t('close')}>
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {manageMode && (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4">
                  <p className="flex items-center gap-2 text-sm font-medium text-white"><Check className="h-4 w-4 text-emerald-300" />{t('necessaryTitle')}</p>
                  <p className="mt-2 text-xs leading-5 text-white/42">{t('necessaryDescription')}</p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4">
                  <p className="flex items-center gap-2 text-sm font-medium text-white"><BarChart3 className="h-4 w-4 text-brand-orange" />{t('analyticsTitle')}</p>
                  <p className="mt-2 text-xs leading-5 text-white/42">{t('analyticsDescription')}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col-reverse gap-2 sm:flex-row lg:min-w-[21rem] lg:justify-end">
            <button type="button" onClick={() => save('necessary')} className="bma-button-secondary min-h-11 px-5">
              {t('necessaryOnly')}
            </button>
            <button type="button" onClick={() => save('analytics')} className="bma-button-primary min-h-11 px-5">
              {t('allowAnalytics')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function enableAnalytics() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'consent_update', analytics_storage: 'granted' });

  if (gtmId && !document.getElementById('bma-gtm')) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    const script = document.createElement('script');
    script.id = 'bma-gtm';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
    document.head.appendChild(script);
  }

  if (!document.getElementById('bma-apollo')) {
    const script = document.createElement('script');
    script.id = 'bma-apollo';
    script.async = true;
    script.defer = true;
    script.src = `https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=${Math.random().toString(36).slice(2)}`;
    script.addEventListener('load', () => window.trackingFunctions?.onLoad?.({ appId: '691d948496127f0021ef7728' }));
    document.head.appendChild(script);
  }
}

function denyAnalytics() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'consent_update', analytics_storage: 'denied' });
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0]?.trim();
    if (name?.startsWith('_ga') || name?.toLowerCase().includes('apollo')) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;samesite=lax`;
    }
  }
}

export default CookieConsent;
