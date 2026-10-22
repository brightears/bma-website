'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type TurnstileRenderOptions = {
  sitekey: string;
  action: string;
  execution: 'render' | 'execute';
  appearance: 'always' | 'execute' | 'interaction-only';
  callback: (token: string) => void;
  'error-callback': () => boolean | void;
  'expired-callback': () => void;
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  execute: (widgetId: string) => void;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
const TOKEN_TIMEOUT_MS = 30_000;

let scriptPromise: Promise<void> | null = null;
let siteKeyPromise: Promise<string | null> | null = null;

function loadTurnstileScript() {
  if (window.turnstile) return Promise.resolve();
  scriptPromise ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error('Turnstile script failed to load'));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

function fetchSiteKey() {
  siteKeyPromise ??= fetch('/api/turnstile-config', { cache: 'no-store' })
    .then((response) => (response.ok ? response.json() : { siteKey: null }))
    .then((payload: { siteKey?: string | null }) => payload.siteKey || null)
    .catch((error: unknown) => {
      console.error('Turnstile configuration unavailable:', error);
      siteKeyPromise = null;
      return null;
    });
  return siteKeyPromise;
}

/**
 * Renders an invisible-unless-needed Turnstile widget into `containerRef` and
 * returns `getToken()`, which resolves a fresh single-use token per call. When
 * the server has no Turnstile keys configured, `getToken()` resolves undefined
 * and no third-party script is loaded.
 */
export function useTurnstile(action: string) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const pendingRef = useRef<((token: string | undefined) => void) | null>(null);
  const readyRef = useRef<Promise<boolean> | null>(null);
  const [enabled, setEnabled] = useState(false);

  const settle = useCallback((token: string | undefined) => {
    pendingRef.current?.(token);
    pendingRef.current = null;
  }, []);

  useEffect(() => {
    let cancelled = false;
    readyRef.current = (async () => {
      const siteKey = await fetchSiteKey();
      if (!siteKey || cancelled) return false;
      setEnabled(true);
      try {
        await loadTurnstileScript();
      } catch (error) {
        console.error(error);
        return false;
      }
      if (cancelled || !containerRef.current || !window.turnstile) return false;
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        action,
        execution: 'execute',
        appearance: 'interaction-only',
        callback: (token) => settle(token),
        'error-callback': () => {
          settle(undefined);
          return true;
        },
        'expired-callback': () => undefined,
      });
      return true;
    })();

    return () => {
      cancelled = true;
      settle(undefined);
      if (widgetIdRef.current && window.turnstile) window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    };
  }, [action, settle]);

  const getToken = useCallback(async (): Promise<string | undefined> => {
    const ready = await readyRef.current;
    const widgetId = widgetIdRef.current;
    if (!ready || !widgetId || !window.turnstile) return undefined;
    settle(undefined);
    return new Promise<string | undefined>((resolve) => {
      const timer = window.setTimeout(() => settle(undefined), TOKEN_TIMEOUT_MS);
      pendingRef.current = (token) => {
        window.clearTimeout(timer);
        resolve(token);
      };
      window.turnstile!.reset(widgetId);
      window.turnstile!.execute(widgetId);
    });
  }, [settle]);

  return { containerRef, getToken, enabled };
}
