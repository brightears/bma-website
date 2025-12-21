import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendQuotationNotification } from '@/lib/email';
import { checkRateLimit, isHoneypotTriggered, getClientIP } from '@/lib/rate-limiter';

/**
 * Quotation request form submission API endpoint
 * POST /api/quotation
 *
 * Validates the request, saves to database, and sends email notification
 * Includes spam protection: honeypot field and rate limiting
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request.headers);

    // Check rate limit
    const rateLimit = checkRateLimit(clientIP);
    if (rateLimit.isLimited) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      country,
      companyName,
      companyAddress,
      preferredSolution,
      numberOfZones,
      website,
    } = body;

    // Check honeypot field - if filled, silently reject (likely a bot)
    if (isHoneypotTriggered(website)) {
      console.log(`Honeypot triggered for IP: ${clientIP}`);
      // Return success to fool the bot, but don't actually process
      return NextResponse.json(
        { success: true, message: 'Quotation request submitted successfully' },
        { status: 201 }
      );
    }

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !country ||
      !companyName ||
      !companyAddress ||
      !preferredSolution ||
      !numberOfZones
    ) {
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

    // Validate numberOfZones is a positive number
    const zones = parseInt(numberOfZones, 10);
    if (isNaN(zones) || zones < 1) {
      return NextResponse.json(
        { error: 'Number of zones must be at least 1' },
        { status: 400 }
      );
    }

    // Save to database
    const quotation = await prisma.quotation.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        country: country.trim(),
        companyName: companyName.trim(),
        companyAddress: companyAddress.trim(),
        preferredSolution: preferredSolution.trim(),
        numberOfZones: zones,
      },
    });

    // Send email notification (don't fail the request if email fails)
    try {
      await sendQuotationNotification({
        firstName: quotation.firstName,
        lastName: quotation.lastName,
        email: quotation.email,
        country: quotation.country,
        companyName: quotation.companyName,
        companyAddress: quotation.companyAddress,
        preferredSolution: quotation.preferredSolution,
        numberOfZones: quotation.numberOfZones,
      });
    } catch (emailError) {
      console.error('Failed to send quotation notification email:', emailError);
      // Continue - we still saved to database
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Quotation request submitted successfully',
        id: quotation.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Quotation submission error:', error);

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
      { error: 'Failed to submit quotation request. Please try again.' },
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
