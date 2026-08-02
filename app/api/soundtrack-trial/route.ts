import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendSoundtrackTrialNotification } from '@/lib/email';
import { checkRateLimit, getClientIP, isHoneypotTriggered } from '@/lib/rate-limiter';

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const BUSINESS_TYPES = new Set(['hotel', 'restaurant', 'retail', 'fitness', 'office', 'other']);

const clean = (value: unknown, maxLength: number) =>
  typeof value === 'string'
    ? value.replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, maxLength)
    : '';

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request.headers);
    if (checkRateLimit(clientIP).isLimited) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    if (isHoneypotTriggered(body.website)) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const name = clean(body.name, 120);
    const email = clean(body.email, 254).toLowerCase();
    const company = clean(body.company, 160);
    const country = clean(body.country, 100);
    const businessType = clean(body.businessType, 40);
    const locationName = clean(body.locationName, 160);
    const zoneName = clean(body.zoneName, 160);
    const consent = body.consent === true;

    if (!name || !email || !company || !country || !businessType || !locationName || !consent) {
      return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 });
    }
    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid work email.' }, { status: 400 });
    }
    if (!BUSINESS_TYPES.has(businessType)) {
      return NextResponse.json({ error: 'Please select a valid business type.' }, { status: 400 });
    }

    const message = [
      '[Soundtrack trial request]',
      `Country: ${country}`,
      `Business type: ${businessType}`,
      `First location: ${locationName}`,
      `First zone: ${zoneName || 'Not specified'}`,
      'Consent: BMAsia may arrange the trial and share required activation details with Soundtrack.',
    ].join('\n');

    await prisma.inquiry.create({
      data: { name, company, email, message },
    });

    try {
      await sendSoundtrackTrialNotification({
        name,
        email,
        company,
        country,
        businessType,
        locationName,
        zoneName: zoneName || undefined,
      });
    } catch (emailError) {
      console.error('Failed to send Soundtrack trial notification:', emailError);
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Soundtrack trial request error:', error);
    return NextResponse.json(
      { error: 'We could not save your request. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
