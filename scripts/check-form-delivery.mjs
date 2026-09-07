// Run in the Render web shell. Reads the lead tables and verifies SMTP login;
// it never creates a submission or sends an email.
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const required = ['DATABASE_URL', 'GMAIL_USER', 'GMAIL_APP_PASSWORD', 'NOTIFICATION_EMAIL'];
const missing = required.filter((key) => !process.env[key]?.trim());
if (missing.length) {
  console.error(`FAIL configuration: missing ${missing.join(', ')}`);
  process.exit(1);
}

const prisma = new PrismaClient();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER.trim(),
    pass: process.env.GMAIL_APP_PASSWORD.replace(/\s/g, ''),
  },
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 15_000,
  dnsTimeout: 10_000,
});

try {
  const checks = await Promise.allSettled([
    Promise.all([
      prisma.inquiry.findFirst({ select: { id: true } }),
      prisma.quotation.findFirst({ select: { id: true } }),
    ]),
    transporter.verify(),
  ]);
  for (const [index, check] of checks.entries()) {
    const label = index === 0 ? 'lead storage' : 'SMTP authentication';
    if (check.status === 'fulfilled') {
      console.log(`PASS ${label}`);
    } else {
      // Do not print provider messages, connection strings, or customer data.
      console.error(`FAIL ${label}: ${check.reason?.code || 'unknown error'}`);
      process.exitCode = 1;
    }
  }
  console.log('Read-only check complete; no lead created and no email sent.');
} finally {
  transporter.close();
  await prisma.$disconnect();
}
