import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIP } from '@/lib/rate-limiter';
import { saveChatInquiry } from '@/lib/chat-inquiry';

/**
 * Chat Lead Capture API endpoint
 * POST /api/chat-lead-capture
 *
 * Receives lead capture data when AI collects email during conversation
 * (progressive profiling - no escalation requested)
 */


interface LeadCaptureRequest {
  email: string;
  name?: string;
  company?: string;
  conversationSummary: string;
  locale: string;
}

export async function POST(request: NextRequest) {
  try {
    if (checkRateLimit(`chat-lead:${getClientIP(request.headers)}`).isLimited) {
      return NextResponse.json({ success: false, message: 'Too many requests.' }, { status: 429 });
    }

    const body = await request.json() as Partial<LeadCaptureRequest>;
    const { email, name, company, conversationSummary, locale } = body;
    const clean = (value: unknown, max: number) => typeof value === 'string'
      ? value.replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, max)
      : '';
    const safeEmail = clean(email, 254).toLowerCase();

    // Validate required fields
    if (!safeEmail) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(safeEmail)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    await saveChatInquiry({
      email: safeEmail,
      name: clean(name, 120),
      company: clean(company, 160),
      conversation: clean(conversationSummary, 4_000),
      locale,
      kind: 'lead',
    });

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
    });
  } catch (error) {
    console.error('Chat lead capture error:', error);

    return NextResponse.json(
      { success: false, message: 'Lead capture could not be processed.' },
      { status: 500 }
    );
  }
}

/**
 * Handle unsupported methods
 */
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
