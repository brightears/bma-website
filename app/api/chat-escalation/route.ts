import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIP } from '@/lib/rate-limiter';
import { saveChatInquiry } from '@/lib/chat-inquiry';

/**
 * Chat Escalation API endpoint
 * POST /api/chat-escalation
 *
 * Saves website chat follow-ups and notifies the BMAsia team
 */


interface EscalationRequest {
  email: string;
  name?: string;
  company?: string;
  conversationHistory: string;
  locale: string;
}

export async function POST(request: NextRequest) {
  try {
    if (checkRateLimit(`chat-escalation:${getClientIP(request.headers)}`).isLimited) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await request.json() as Partial<EscalationRequest>;
    const { email, name, company, conversationHistory } = body;
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
      conversation: clean(conversationHistory, 12_000),
      locale: body.locale,
      kind: 'follow-up',
    });

    return NextResponse.json({
      success: true,
      message: 'Escalation submitted successfully',
    });
  } catch (error) {
    console.error('Chat escalation error:', error);

    return NextResponse.json(
      { error: 'Failed to submit escalation. Please try again.' },
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
