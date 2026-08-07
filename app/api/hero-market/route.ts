import { NextResponse } from 'next/server';
import {
  GLOBAL_HERO_COVERS,
  buildHeroCoverSet,
  resolveCountryCode,
  selectHeroPlaylistNames,
  type CataloguePlaylist,
  type HeroExperience,
  type PlaylistCover,
} from '@/lib/hero-market';

export const dynamic = 'force-dynamic';

const DEFAULT_SAMPLE_ORIGIN = 'https://bmasia-audio-sharing.onrender.com';
const CATALOGUE_REVALIDATE_SECONDS = 21_600;
const COVER_REVALIDATE_SECONDS = 1_800;
const UPSTREAM_TIMEOUT_MS = 10_000;

type CatalogueCache = {
  expiresAt: number;
  playlists: CataloguePlaylist[];
};

type ExperienceCache = {
  experience: HeroExperience;
  expiresAt: number;
};

type HeroRuntimeCache = {
  catalogue: CatalogueCache | null;
  catalogueRequest: Promise<CataloguePlaylist[]> | null;
  experiences: Map<string, ExperienceCache>;
  experienceRequests: Map<string, Promise<HeroExperience>>;
};

const globalForHero = globalThis as typeof globalThis & {
  __bmaHeroRuntimeCache?: HeroRuntimeCache;
};
// The public catalogue is larger than Next's 2 MB data-cache limit. Keep a
// compact manifest per app instance and deduplicate concurrent warm-up calls.
const heroRuntimeCache = globalForHero.__bmaHeroRuntimeCache ??= {
  catalogue: null,
  catalogueRequest: null,
  experiences: new Map(),
  experienceRequests: new Map(),
};

function getSampleOrigin() {
  return process.env.BEAT_BREEZE_SAMPLE_API_ORIGIN ?? DEFAULT_SAMPLE_ORIGIN;
}

function compactPlaylist(playlist: CataloguePlaylist): CataloguePlaylist {
  return {
    name: playlist.name,
    description: playlist.description,
    tags: playlist.tags?.map((tag) => ({
      dimension: tag.dimension,
      name: tag.name,
    })),
    tracks: playlist.tracks?.slice(0, 16).map((track) => ({
      genre: track.genre,
      mood: track.mood,
      tags: track.tags,
    })),
  };
}

async function requestCatalogue() {
  const url = new URL('/api/public/catalog', getSampleOrigin());
  const response = await fetch(url, {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
  });

  if (!response.ok) throw new Error(`Catalogue request failed with ${response.status}`);
  const payload = await response.json() as { folders?: CataloguePlaylist[] };
  if (!Array.isArray(payload.folders)) throw new Error('Catalogue response is malformed');

  return payload.folders
    .filter((playlist) => typeof playlist.name === 'string' && playlist.name.trim())
    .map(compactPlaylist);
}

async function loadCatalogue() {
  if (heroRuntimeCache.catalogue && heroRuntimeCache.catalogue.expiresAt > Date.now()) {
    return heroRuntimeCache.catalogue.playlists;
  }

  if (!heroRuntimeCache.catalogueRequest) {
    heroRuntimeCache.catalogueRequest = requestCatalogue()
      .then((playlists) => {
        heroRuntimeCache.catalogue = {
          expiresAt: Date.now() + CATALOGUE_REVALIDATE_SECONDS * 1_000,
          playlists,
        };
        return playlists;
      })
      .catch((error: unknown) => {
        if (heroRuntimeCache.catalogue) return heroRuntimeCache.catalogue.playlists;
        throw error;
      })
      .finally(() => {
        heroRuntimeCache.catalogueRequest = null;
      });
  }

  return heroRuntimeCache.catalogueRequest;
}

async function loadPlaylistCovers(names: string[]) {
  if (names.length === 0) return [];

  const url = new URL('/api/public/venue-samples', getSampleOrigin());
  url.searchParams.set('names', names.join('|'));
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    next: { revalidate: COVER_REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
  });

  if (!response.ok) throw new Error(`Cover request failed with ${response.status}`);
  const payload = await response.json() as { playlists?: PlaylistCover[] };

  return Array.isArray(payload.playlists) ? payload.playlists : [];
}

function jsonResponse(experience: HeroExperience) {
  const response = NextResponse.json(experience);
  response.headers.set('Cache-Control', 'private, no-store, max-age=0');
  response.headers.set(
    'Vary',
    'CF-IPCountry, X-Vercel-IP-Country, CloudFront-Viewer-Country, X-Country-Code, X-AppEngine-Country',
  );
  return response;
}

export async function GET(request: Request) {
  const countryCode = resolveCountryCode(request.headers);
  const cacheKey = countryCode ?? 'global';
  const cached = heroRuntimeCache.experiences.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return jsonResponse(cached.experience);

  try {
    let experienceRequest = heroRuntimeCache.experienceRequests.get(cacheKey);
    if (!experienceRequest) {
      experienceRequest = (async () => {
        const catalogue = await loadCatalogue();
        const selection = selectHeroPlaylistNames(catalogue, countryCode);
        const names = Array.from(new Set([...selection.regional, ...selection.global]));
        const availableCovers = await loadPlaylistCovers(names);
        const covers = buildHeroCoverSet(selection.regional, selection.global, availableCovers);
        const localized = Object.values(covers).some((cover) => cover.local);

        return {
          countryCode: localized ? countryCode : null,
          covers,
          localized,
        } satisfies HeroExperience;
      })().finally(() => {
        heroRuntimeCache.experienceRequests.delete(cacheKey);
      });
      heroRuntimeCache.experienceRequests.set(cacheKey, experienceRequest);
    }

    const experience = await experienceRequest;
    heroRuntimeCache.experiences.set(cacheKey, {
      experience,
      expiresAt: Date.now() + COVER_REVALIDATE_SECONDS * 1_000,
    });

    return jsonResponse(experience);
  } catch (error) {
    console.error('Hero catalogue selection failed:', error);
    return jsonResponse({
      countryCode: null,
      covers: GLOBAL_HERO_COVERS,
      localized: false,
    });
  }
}
