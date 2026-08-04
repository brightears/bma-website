import { NextResponse } from 'next/server';
import { VENUE_PLAYLIST_NAMES } from '@/components/home/venue-time-machine-data';

const DEFAULT_SAMPLE_ORIGIN = 'https://bmasia-audio-sharing.onrender.com';

export async function GET() {
  const origin = process.env.BEAT_BREEZE_SAMPLE_API_ORIGIN ?? DEFAULT_SAMPLE_ORIGIN;
  const upstreamUrl = new URL('/api/public/venue-samples', origin);
  upstreamUrl.searchParams.set('names', VENUE_PLAYLIST_NAMES.join('|'));

  try {
    const response = await fetch(upstreamUrl, {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Beat Breeze samples are temporarily unavailable' },
        { status: 503 },
      );
    }

    return NextResponse.json(await response.json(), {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Beat Breeze samples are temporarily unavailable' },
      { status: 503 },
    );
  }
}
