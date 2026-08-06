import { NextRequest, NextResponse } from 'next/server';
import { getAvailableBookingSlots, getBookingCapability } from '@/lib/booking';
import { checkRateLimitWithPolicy, getClientIP } from '@/lib/rate-limiter';

export async function GET(request: NextRequest) {
  const capability = getBookingCapability();
  if (!capability.configured) {
    return NextResponse.json({ ...capability, slots: [] }, { headers: { 'Cache-Control': 'no-store' } });
  }

  const clientIP = getClientIP(request.headers);
  const rateLimit = checkRateLimitWithPolicy(`booking-availability:${clientIP}`, 60, 5 * 60 * 1000);
  if (rateLimit.isLimited) {
    return NextResponse.json({ error: 'Too many availability requests.' }, { status: 429 });
  }

  try {
    const slots = await getAvailableBookingSlots();
    return NextResponse.json(
      { ...capability, slots },
      { headers: { 'Cache-Control': 'private, no-store, max-age=0' } },
    );
  } catch (error) {
    console.error('Booking availability provider error:', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json(
      { ...capability, configured: false, slots: [], temporarilyUnavailable: true },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}

