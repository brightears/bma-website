import { NextRequest, NextResponse } from 'next/server';

/**
 * Chat Lead Capture API endpoint
 * POST /api/chat-lead-capture
 *
 * Receives lead capture data when AI collects email during conversation
 * (progressive profiling - no escalation requested)
 */

// bma_messenger_hub lead capture webhook URL
const MESSENGER_HUB_URL = process.env.MESSENGER_HUB_URL || 'https://bma-messenger-hub-ooyy.onrender.com';

interface LeadCaptureRequest {
  email: string;
  name?: string;
  company?: string;
  conversationSummary: string;
  locale: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadCaptureRequest = await request.json();
    const { email, name, company, conversationSummary, locale } = body;

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

    // Forward to bma_messenger_hub lead capture webhook
    const leadPayload = {
      email: email.trim().toLowerCase(),
      name: name?.trim() || undefined,
      company: company?.trim() || undefined,
      conversationSummary,
      locale,
      source: 'website_chat',
    };

    console.log('Forwarding lead capture to messenger hub:', {
      email: leadPayload.email,
      locale,
    });

    const hubResponse = await fetch(`${MESSENGER_HUB_URL}/webhooks/lead-capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadPayload),
    });

    if (!hubResponse.ok) {
      const errorText = await hubResponse.text();
      console.error('Messenger hub lead capture error:', errorText);
      // Don't throw - lead capture is fire-and-forget, shouldn't break UX
    }

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
    });
  } catch (error) {
    console.error('Chat lead capture error:', error);

    // Return success anyway - lead capture shouldn't break UX
    return NextResponse.json({
      success: false,
      message: 'Lead capture processing',
    });
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
