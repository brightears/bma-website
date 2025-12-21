import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendInquiryNotification } from '@/lib/email';

/**
 * Inquiry form submission API endpoint
 * POST /api/inquiry
 *
 * Validates the request, saves to database, and sends email notification
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, company, email, message } = body;

    // Validate required fields
    if (!name || !company || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
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

    // Save to database
    const inquiry = await prisma.inquiry.create({
      data: {
        name: name.trim(),
        company: company.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
      },
    });

    // Send email notification (don't fail the request if email fails)
    try {
      await sendInquiryNotification({
        name: inquiry.name,
        company: inquiry.company,
        email: inquiry.email,
        message: inquiry.message,
      });
    } catch (emailError) {
      console.error('Failed to send inquiry notification email:', emailError);
      // Continue - we still saved to database
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry submitted successfully',
        id: inquiry.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Inquiry submission error:', error);

    // Check for Prisma-specific errors
    if (error instanceof Error) {
      if (error.message.includes('connect')) {
        return NextResponse.json(
          { error: 'Database connection error. Please try again later.' },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to submit inquiry. Please try again.' },
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
