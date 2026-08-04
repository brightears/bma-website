import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIP } from '@/lib/rate-limiter';

/**
 * Chat Escalation API endpoint
 * POST /api/chat-escalation
 *
 * Receives escalation data from website chat and forwards to bma_messenger_hub
 */

// bma_messenger_hub escalation webhook URL
const MESSENGER_HUB_URL = process.env.MESSENGER_HUB_URL || 'https://bma-messenger-hub-ooyy.onrender.com';

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

    // Forward to bma_messenger_hub escalation webhook
    const escalationPayload = {
      customer_email: safeEmail,
      customer_name: clean(name, 120) || undefined,
      customer_company: clean(company, 160) || undefined,
      conversation_history: clean(conversationHistory, 12_000),
      escalation_reason: 'customer_request',
      issue_summary: 'Website chat escalation - customer requested to speak with team',
      urgency: 'normal',
      // No phone number for website escalations
      customer_phone: undefined,
    };

    const hubResponse = await fetch(`${MESSENGER_HUB_URL}/webhooks/elevenlabs/escalate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(escalationPayload),
      signal: AbortSignal.timeout(10_000),
    });

    if (!hubResponse.ok) {
      console.error('Messenger hub escalation failed with status:', hubResponse.status);
      throw new Error(`Messenger hub returned ${hubResponse.status}`);
    }

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
