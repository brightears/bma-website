import { NextRequest, NextResponse } from 'next/server';

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
    const body: EscalationRequest = await request.json();
    const { email, name, company, conversationHistory, locale } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Forward to bma_messenger_hub escalation webhook
    const escalationPayload = {
      customer_email: email.trim().toLowerCase(),
      customer_name: name?.trim() || undefined,
      customer_company: company?.trim() || undefined,
      conversation_history: conversationHistory,
      escalation_reason: 'customer_request',
      issue_summary: 'Website chat escalation - customer requested to speak with team',
      urgency: 'normal',
      // No phone number for website escalations
      customer_phone: undefined,
    };

    console.log('Forwarding escalation to messenger hub:', {
      email: escalationPayload.customer_email,
      name: escalationPayload.customer_name,
      company: escalationPayload.customer_company,
      locale,
    });

    const hubResponse = await fetch(`${MESSENGER_HUB_URL}/webhooks/elevenlabs/escalate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(escalationPayload),
    });

    if (!hubResponse.ok) {
      const errorText = await hubResponse.text();
      console.error('Messenger hub error:', errorText);
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
