import { NextRequest, NextResponse } from 'next/server';
import {
  createBooking,
  getAvailableBookingSlots,
  getBookingCapability,
  type BookingProvider,
  type BookingRequest,
} from '@/lib/booking';
import { checkRateLimit, getClientIP, isHoneypotTriggered } from '@/lib/rate-limiter';
import { locales } from '@/lib/i18n-config';

const clean = (value: unknown, max: number) => typeof value === 'string'
  ? value.replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, max)
  : '';

const EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const REQUEST_ID = /^[a-zA-Z0-9_-]{16,96}$/;

export async function POST(request: NextRequest) {
  const capability = getBookingCapability();
  if (!capability.configured) {
    return NextResponse.json({ error: 'Native booking is not configured.' }, { status: 503 });
  }

  const clientIP = getClientIP(request.headers);
  if (checkRateLimit(`booking:${clientIP}`).isLimited) {
    return NextResponse.json({ error: 'Too many booking attempts. Please try again later.' }, { status: 429 });
  }

  try {
    const body = await request.json() as Record<string, unknown>;
    if (isHoneypotTriggered(clean(body.website, 200))) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const provider = clean(body.provider, 32) as BookingProvider;
    const start = clean(body.start, 64);
    const requestId = clean(body.requestId, 96);
    const name = clean(body.name, 120);
    const email = clean(body.email, 254).toLowerCase();
    const company = clean(body.company, 160);
    const notes = clean(body.notes, 2_000);
    const locale = clean(body.locale, 8);

    if (
      !REQUEST_ID.test(requestId)
      || !name
      || !EMAIL.test(email)
      || !company
      || !start
      || !capability.providers.includes(provider)
      || Number.isNaN(new Date(start).getTime())
    ) {
      return NextResponse.json({ error: 'Please check the booking details.' }, { status: 400 });
    }

    const slots = await getAvailableBookingSlots();
    if (!slots.some((slot) => slot.start === new Date(start).toISOString())) {
      return NextResponse.json({ error: 'That time is no longer available.', code: 'slot_unavailable' }, { status: 409 });
    }

    const bookingRequest: BookingRequest = {
      requestId,
      start: new Date(start).toISOString(),
      provider,
      name,
      email,
      company,
      notes: notes || undefined,
      locale: locales.includes(locale as (typeof locales)[number]) ? locale : 'en',
    };
    const result = await createBooking(bookingRequest);

    return NextResponse.json({
      success: true,
      start: bookingRequest.start,
      provider,
      eventId: result.eventId,
      alreadyExists: result.alreadyExists,
    }, { status: result.alreadyExists ? 200 : 201 });
  } catch (error) {
    console.error('Booking creation provider error:', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json({ error: 'The booking could not be completed. Please try another time.' }, { status: 502 });
  }
}

