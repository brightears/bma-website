'use client';

import { useEffect, useState } from 'react';
import type { HeroExperience, MarketFeatureProfile } from '@/lib/hero-market';

const PROFILES = new Set<MarketFeatureProfile>(['climate', 'global', 'prayer']);

export function useMarketFeatureProfile() {
  const [profile, setProfile] = useState<MarketFeatureProfile>('global');

  useEffect(() => {
    const controller = new AbortController();

    void fetch('/api/hero-market/', {
      cache: 'no-store',
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error('Market profile unavailable');
        return response.json() as Promise<HeroExperience>;
      })
      .then((experience) => {
        if (PROFILES.has(experience.featureProfile)) {
          setProfile(experience.featureProfile);
        }
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setProfile('global');
      });

    return () => controller.abort();
  }, []);

  return profile;
}
