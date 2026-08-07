export type HeroCover = {
  alt: string;
  local?: boolean;
  src: string;
};

export type HeroCoverSet = {
  featured: HeroCover;
  globalSmallOne: HeroCover;
  globalSmallTwo: HeroCover;
  globalSquare: HeroCover;
  globalTall: HeroCover;
  regionalSmall: HeroCover;
  regionalWide: HeroCover;
};

export type HeroExperience = {
  countryCode: string | null;
  covers: HeroCoverSet;
  localized: boolean;
};

export type CataloguePlaylist = {
  description?: string | null;
  name: string;
  tags?: Array<{ dimension?: string | null; name?: string | null }>;
  tracks?: Array<{
    genre?: string | null;
    mood?: string | null;
    tags?: string[] | null;
  }>;
};

export type PlaylistCover = {
  coverImageUrl?: string | null;
  name: string;
};

export const GLOBAL_HERO_COVERS: HeroCoverSet = {
  featured: { src: '/images/covers/pop-mid-tempo.jpg', alt: 'Pop Mid-Tempo' },
  regionalWide: { src: '/images/covers/nu-disco-vocal.jpg', alt: 'Nu Disco Vocal' },
  globalSquare: { src: '/images/covers/deep-house.jpg', alt: 'Deep House' },
  regionalSmall: { src: '/images/covers/tropical-house-instrumental.jpg', alt: 'Tropical House Instrumental' },
  globalSmallOne: { src: '/images/covers/bossa-nova-lounge.jpg', alt: 'Bossa Nova Lounge' },
  globalSmallTwo: { src: '/images/covers/french-cafe.jpg', alt: 'French Cafe' },
  globalTall: { src: '/images/covers/chillhop.jpg', alt: 'Chillhop' },
};

const COUNTRY_HEADERS = [
  'cf-ipcountry',
  'x-vercel-ip-country',
  'cloudfront-viewer-country',
  'x-country-code',
  'x-appengine-country',
] as const;

const REGIONAL_ALIASES: Partial<Record<string, string[]>> = {
  CN: ['china', 'chinese', 'c-pop', 'canto', 'cantopop', 'guofeng', 'mandopop'],
  ES: ['spain', 'spanish'],
  FR: ['france', 'french'],
  HK: ['hong kong', 'hongkong', 'canto', 'cantopop'],
  ID: ['indonesia', 'indonesian'],
  IN: ['india', 'indian', 'desi', 'bollywood'],
  IT: ['italy', 'italian'],
  JP: ['japan', 'japanese', 'j-pop'],
  KR: ['south korea', 'korea', 'korean', 'k-pop'],
  LB: ['lebanon', 'lebanese'],
  MY: ['malaysia', 'malaysian', 'malay'],
  MX: ['mexico', 'mexican', 'mariachi'],
  PH: ['philippines', 'philippine', 'filipino', 'opm'],
  SG: ['singapore', 'singaporean'],
  TH: ['thailand', 'thai'],
  TW: ['taiwan', 'taiwanese', 'mandopop'],
  VN: ['vietnam', 'vietnamese'],
};

const GLOBAL_PRIORITY = [
  'Pop Mid-Tempo',
  'Nu Disco Vocal',
  'Deep House',
  'Tropical House Instrumental',
  'Acoustic Pop',
  'Bossa Nova Lounge',
  'Chillhop',
  'Soulful House Vocal',
  'Pop Soft',
  'Jazz Piano',
] as const;

const STRUCTURED_DIMENSIONS = new Set(['country', 'market', 'region', 'territory', 'locale']);

function normaliseCountryCode(value: string | null): string | null {
  const countryCode = value?.trim().toUpperCase();
  return countryCode && /^[A-Z]{2}$/.test(countryCode) ? countryCode : null;
}

function normalise(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function getEnglishCountryName(countryCode: string) {
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode) ?? '';
  } catch {
    return '';
  }
}

function phraseMatches(corpus: string, phrase: string) {
  const candidate = normalise(phrase);
  if (!candidate) return false;

  return (` ${corpus} `).includes(` ${candidate} `)
    || corpus.split(' ').some((word) => candidate.length >= 5 && word.startsWith(candidate));
}

function playlistCorpus(playlist: CataloguePlaylist) {
  const tagValues = playlist.tags?.flatMap((tag) => [tag.name ?? '', tag.dimension ?? '']) ?? [];
  const trackValues = playlist.tracks?.slice(0, 16).flatMap((track) => [
    track.genre ?? '',
    track.mood ?? '',
    ...(track.tags ?? []),
  ]) ?? [];

  return normalise([
    playlist.name,
    playlist.description ?? '',
    ...tagValues,
    ...trackValues,
  ].join(' '));
}

function hasStructuredCountryTag(playlist: CataloguePlaylist, countryCode: string, countryName: string) {
  const code = countryCode.toLowerCase();
  const name = normalise(countryName);

  return playlist.tags?.some((tag) => {
    const dimension = normalise(tag.dimension ?? '');
    const value = normalise(tag.name ?? '');

    if (STRUCTURED_DIMENSIONS.has(dimension)) {
      return value === code || value === name || value.startsWith(`${name} `);
    }

    return value === `country ${code}`
      || value === `market ${code}`
      || value === `region ${code}`
      || value === `country ${name}`
      || value === `market ${name}`
      || value === `region ${name}`;
  }) ?? false;
}

function rotate<T>(items: T[], seed: string) {
  if (items.length < 2) return items;
  const offset = Array.from(seed).reduce((total, character) => total + character.charCodeAt(0), 0) % items.length;
  return [...items.slice(offset), ...items.slice(0, offset)];
}

export function resolveCountryCode(headers: Headers): string | null {
  for (const header of COUNTRY_HEADERS) {
    const countryCode = normaliseCountryCode(headers.get(header));
    if (countryCode) return countryCode;
  }

  return null;
}

export function findRegionalPlaylists(playlists: CataloguePlaylist[], countryCode: string | null) {
  if (!countryCode) return [];

  const countryName = getEnglishCountryName(countryCode);
  if (!countryName) return [];
  const phrases = Array.from(new Set([countryName, ...(REGIONAL_ALIASES[countryCode] ?? [])]));

  return rotate(
    playlists
      .filter((playlist) => hasStructuredCountryTag(playlist, countryCode, countryName)
        || phrases.some((phrase) => phraseMatches(playlistCorpus(playlist), phrase)))
      .sort((a, b) => a.name.localeCompare(b.name)),
    countryCode,
  );
}

export function selectHeroPlaylistNames(playlists: CataloguePlaylist[], countryCode: string | null) {
  const regional = findRegionalPlaylists(playlists, countryCode).slice(0, 3);
  const regionalNames = new Set(regional.map((playlist) => playlist.name));
  const playlistsByName = new Map(playlists.map((playlist) => [playlist.name.toLowerCase(), playlist]));
  const preferredGlobal = GLOBAL_PRIORITY
    .map((name) => playlistsByName.get(name.toLowerCase()))
    .filter((playlist): playlist is CataloguePlaylist => Boolean(playlist))
    .filter((playlist) => !regionalNames.has(playlist.name));
  const catalogueFallback = playlists
    .filter((playlist) => !regionalNames.has(playlist.name))
    .filter((playlist) => !preferredGlobal.some((preferred) => preferred.name === playlist.name))
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    global: [...preferredGlobal, ...catalogueFallback].slice(0, 7).map((playlist) => playlist.name),
    regional: regional.map((playlist) => playlist.name),
  };
}

export function buildHeroCoverSet(
  regionalNames: string[],
  globalNames: string[],
  availableCovers: PlaylistCover[],
): HeroExperience['covers'] {
  const coversByName = new Map(
    availableCovers
      .filter((cover) => cover.coverImageUrl)
      .map((cover) => [cover.name, cover.coverImageUrl!]),
  );
  const regional = regionalNames
    .filter((name) => coversByName.has(name))
    .map((name) => ({ src: coversByName.get(name)!, alt: name, local: true }));
  const global = globalNames
    .filter((name) => coversByName.has(name))
    .map((name) => ({ src: coversByName.get(name)!, alt: name }));
  const fallback = Object.values(GLOBAL_HERO_COVERS);
  let regionalIndex = 0;
  let globalIndex = 0;
  let fallbackIndex = 0;
  const nextRegionalOrGlobal = () => regional[regionalIndex++] ?? global[globalIndex++] ?? fallback[fallbackIndex++]!;
  const nextGlobal = () => global[globalIndex++] ?? fallback[fallbackIndex++]!;

  return {
    featured: nextRegionalOrGlobal(),
    regionalWide: nextRegionalOrGlobal(),
    globalSquare: nextGlobal(),
    regionalSmall: nextRegionalOrGlobal(),
    globalSmallOne: nextGlobal(),
    globalSmallTwo: nextGlobal(),
    globalTall: nextGlobal(),
  };
}
