export type VenueKey = 'hotel' | 'restaurant' | 'retail' | 'fitness';

export type ZoneKey =
  | 'lobby'
  | 'restaurant'
  | 'wellness'
  | 'dining'
  | 'bar'
  | 'terrace'
  | 'entrance'
  | 'shopFloor'
  | 'fittingRooms'
  | 'mainFloor'
  | 'studio'
  | 'recovery';

export type DemoAudioSource =
  | '/audio/beat-breeze-demo/morning.mp3'
  | '/audio/beat-breeze-demo/daytime.mp3'
  | '/audio/beat-breeze-demo/evening.mp3'
  | '/audio/beat-breeze-demo/late-night.mp3';

export type PlaylistRecommendation = {
  title: string;
  bpm: number;
  energy: number;
};

type RecommendationSchedule = readonly [
  PlaylistRecommendation,
  PlaylistRecommendation,
  PlaylistRecommendation,
  PlaylistRecommendation,
  PlaylistRecommendation,
  PlaylistRecommendation,
  PlaylistRecommendation,
];

type ZoneSchedule = {
  zone: ZoneKey;
  recommendations: RecommendationSchedule;
};

export type Venue = {
  location: string;
  defaultFocus: number;
  zones: readonly [ZoneSchedule, ZoneSchedule, ZoneSchedule];
};

export const TIME_STOPS = [5, 8, 11, 14, 17, 20, 23] as const;

const recommendation = (title: string, bpm: number, energy: number): PlaylistRecommendation => ({
  title,
  bpm,
  energy,
});

/**
 * This is a compact, public demonstration of the same context model used by
 * Beat Breeze Search: business type + zone role + daypart + target activation.
 *
 * Playlist names are current Beat Breeze catalogue directions. Fitness names
 * come from the product's fitness-only collection rather than being inferred
 * from generic lounge genres. Adjacent schedule moments deliberately change
 * every zone so each slider step demonstrates a real programming decision.
 */
export const VENUES: Record<VenueKey, Venue> = {
  hotel: {
    location: 'Riverside House · Bangkok',
    defaultFocus: 0,
    zones: [
      {
        zone: 'lobby',
        recommendations: [
          recommendation('New Age Piano', 68, 20),
          recommendation('Jazz Piano', 92, 34),
          recommendation('Acoustic Pop', 96, 42),
          recommendation('Bossa Nova Lounge', 102, 48),
          recommendation('Smooth Jazz', 98, 50),
          recommendation('Jazz Lounge Vocal', 104, 54),
          recommendation('New Age Piano', 72, 22),
        ],
      },
      {
        zone: 'restaurant',
        recommendations: [
          recommendation('Acoustic Pop', 88, 28),
          recommendation('French Cafe', 98, 40),
          recommendation('Bossa Nova Lounge', 104, 48),
          recommendation('Italian Lounge', 106, 50),
          recommendation('Smooth Jazz', 100, 52),
          recommendation('Jazz Lounge Vocal', 104, 56),
          recommendation('Jazz Piano', 88, 30),
        ],
      },
      {
        zone: 'wellness',
        recommendations: [
          recommendation('New Age Piano', 62, 12),
          recommendation('Spa Arrival Lounge', 68, 18),
          recommendation('Balinese Spa', 70, 16),
          recommendation('Yoga Flow', 72, 20),
          recommendation('New Age Piano', 68, 16),
          recommendation('Balinese Spa', 66, 14),
          recommendation('New Age Piano', 60, 10),
        ],
      },
    ],
  },
  restaurant: {
    location: 'Orchard Table · Singapore',
    defaultFocus: 0,
    zones: [
      {
        zone: 'dining',
        recommendations: [
          recommendation('Acoustic Pop', 86, 26),
          recommendation('French Cafe', 94, 36),
          recommendation('Bossa Nova Lounge', 102, 46),
          recommendation('Smooth Jazz', 96, 40),
          recommendation('Jazz Piano', 100, 46),
          recommendation('Jazz Lounge Vocal', 104, 52),
          recommendation('Jazz Piano', 88, 30),
        ],
      },
      {
        zone: 'bar',
        recommendations: [
          recommendation('Chillhop', 82, 18),
          recommendation('Acoustic Pop', 90, 28),
          recommendation('Soulful House Vocal', 108, 52),
          recommendation('Nu Disco Instrumental', 112, 60),
          recommendation('Nu Disco Vocal', 116, 70),
          recommendation('Deep House', 122, 78),
          recommendation('Soulful House Vocal', 110, 54),
        ],
      },
      {
        zone: 'terrace',
        recommendations: [
          recommendation('New Age Piano', 68, 16),
          recommendation('Acoustic Pop', 92, 32),
          recommendation('Bossa Nova Lounge', 102, 46),
          recommendation('Tropical House Instrumental', 110, 58),
          recommendation('Soulful House Vocal', 112, 62),
          recommendation('Nu Disco Instrumental', 116, 68),
          recommendation('Chillhop', 84, 26),
        ],
      },
    ],
  },
  retail: {
    location: 'Northline Flagship · Kuala Lumpur',
    defaultFocus: 1,
    zones: [
      {
        zone: 'entrance',
        recommendations: [
          recommendation('Pop Soft', 90, 26),
          recommendation('Acoustic Pop', 98, 38),
          recommendation('Pop Mid-Tempo', 104, 52),
          recommendation('Nu Disco Instrumental', 112, 64),
          recommendation('Nu Disco Vocal', 116, 72),
          recommendation('Soulful House Vocal', 110, 60),
          recommendation('Pop Soft', 88, 24),
        ],
      },
      {
        zone: 'shopFloor',
        recommendations: [
          recommendation('Pop Soft', 92, 28),
          recommendation('Pop Mid-Tempo', 102, 48),
          recommendation('Acoustic Pop', 100, 44),
          recommendation('Soulful House Vocal', 110, 60),
          recommendation('Nu Disco Vocal', 116, 72),
          recommendation('Deep House', 120, 78),
          recommendation('Chillhop', 84, 24),
        ],
      },
      {
        zone: 'fittingRooms',
        recommendations: [
          recommendation('Chillhop', 80, 20),
          recommendation('Acoustic Pop', 92, 32),
          recommendation('Pop Soft', 96, 38),
          recommendation('Chillhop', 88, 34),
          recommendation('Pop Mid-Tempo', 102, 48),
          recommendation('Soulful House Vocal', 108, 54),
          recommendation('Chillhop', 80, 18),
        ],
      },
    ],
  },
  fitness: {
    location: 'Form House · Hong Kong',
    defaultFocus: 0,
    zones: [
      {
        zone: 'mainFloor',
        recommendations: [
          recommendation('Warm Up', 112, 52),
          recommendation('Strength', 124, 72),
          recommendation('Dance', 124, 70),
          recommendation('Strength', 126, 74),
          recommendation('HIIT', 132, 90),
          recommendation('Boxing', 130, 88),
          recommendation('Cool Down', 90, 28),
        ],
      },
      {
        zone: 'studio',
        recommendations: [
          recommendation('Yoga Flow', 72, 18),
          recommendation('Pilates', 92, 30),
          recommendation('Spinning Endurance', 126, 78),
          recommendation('Dance', 124, 72),
          recommendation('Spinning Sprint', 136, 92),
          recommendation('HIIT', 132, 90),
          recommendation('Yoga Flow', 70, 16),
        ],
      },
      {
        zone: 'recovery',
        recommendations: [
          recommendation('Yoga Flow', 68, 14),
          recommendation('Cool Down', 84, 22),
          recommendation('Pilates', 92, 28),
          recommendation('Yoga Flow', 72, 18),
          recommendation('Cool Down', 86, 24),
          recommendation('Pilates', 90, 26),
          recommendation('Yoga Flow', 64, 12),
        ],
      },
    ],
  },
};

export const PLAYLIST_COVERS: Record<string, string> = {
  'Balinese Spa': '/images/covers/balinese-spa.jpg',
  'Bossa Nova Lounge': '/images/covers/bossa-nova-lounge.jpg',
  Chillhop: '/images/covers/chillhop.jpg',
  'Deep House': '/images/covers/deep-house.jpg',
  'French Cafe': '/images/covers/french-cafe.jpg',
  'Italian Lounge': '/images/covers/italian-lounge.jpg',
  'Jazz Piano': '/images/covers/jazz-piano.jpg',
  'Nu Disco Vocal': '/images/covers/nu-disco-vocal.jpg',
  'Pop Mid-Tempo': '/images/covers/pop-mid-tempo.jpg',
  'Tropical House Instrumental': '/images/covers/tropical-house-instrumental.jpg',
};

const MORNING_AUDIO: DemoAudioSource = '/audio/beat-breeze-demo/morning.mp3';
const DAYTIME_AUDIO: DemoAudioSource = '/audio/beat-breeze-demo/daytime.mp3';
const EVENING_AUDIO: DemoAudioSource = '/audio/beat-breeze-demo/evening.mp3';
const LATE_AUDIO: DemoAudioSource = '/audio/beat-breeze-demo/late-night.mp3';

/**
 * The public page currently carries four licensed excerpts. Each recommendation
 * is therefore mapped to its closest activation family and is labelled in the
 * UI as a representative direction, never as the exact playlist recording.
 */
export const PREVIEW_AUDIO_BY_PLAYLIST: Record<string, DemoAudioSource> = {
  'New Age Piano': MORNING_AUDIO,
  'Spa Arrival Lounge': MORNING_AUDIO,
  'Balinese Spa': MORNING_AUDIO,
  Chillhop: MORNING_AUDIO,
  'Yoga Flow': MORNING_AUDIO,
  Pilates: MORNING_AUDIO,
  'Cool Down': MORNING_AUDIO,
  'Jazz Piano': DAYTIME_AUDIO,
  'Acoustic Pop': DAYTIME_AUDIO,
  'Bossa Nova Lounge': DAYTIME_AUDIO,
  'French Cafe': DAYTIME_AUDIO,
  'Italian Lounge': DAYTIME_AUDIO,
  'Smooth Jazz': DAYTIME_AUDIO,
  'Jazz Lounge Vocal': DAYTIME_AUDIO,
  'Pop Soft': EVENING_AUDIO,
  'Pop Mid-Tempo': EVENING_AUDIO,
  'Nu Disco Instrumental': EVENING_AUDIO,
  'Nu Disco Vocal': EVENING_AUDIO,
  'Soulful House Vocal': EVENING_AUDIO,
  'Tropical House Instrumental': EVENING_AUDIO,
  Dance: EVENING_AUDIO,
  'Warm Up': EVENING_AUDIO,
  'Deep House': LATE_AUDIO,
  Strength: LATE_AUDIO,
  HIIT: LATE_AUDIO,
  Boxing: LATE_AUDIO,
  'Spinning Endurance': LATE_AUDIO,
  'Spinning Sprint': LATE_AUDIO,
};
