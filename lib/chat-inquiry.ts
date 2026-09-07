import { prisma } from '@/lib/prisma';
import { sendInquiryNotification } from '@/lib/email';
import { locales } from '@/lib/i18n-config';

/** Keep chat leads with the other website inquiries before notifying the team. */
export async function saveChatInquiry(data: {
  email: string;
  name?: string;
  company?: string;
  conversation: string;
  locale?: string;
  kind: 'follow-up' | 'lead';
}) {
  const locale = locales.includes(data.locale as (typeof locales)[number]) ? data.locale : 'en';
  const inquiry = await prisma.inquiry.create({
    data: {
      email: data.email,
      name: data.name || 'Website visitor',
      company: data.company || 'Not provided',
      message: `[Website chat ${data.kind}]\nLanguage: ${locale}\n\n${data.conversation || 'Customer requested contact through the website chat.'}`,
    },
  });

  try {
    await sendInquiryNotification(inquiry);
  } catch (error) {
    // The inquiry remains available even if the notification provider is down.
    console.error('Failed to send website chat inquiry notification:', error);
  }
  return inquiry;
}
