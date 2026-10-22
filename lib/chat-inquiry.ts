import { prisma } from '@/lib/prisma';
import { sendInquiryNotification } from '@/lib/email';
import { locales } from '@/lib/i18n-config';

// The transcript is assembled in the visitor's browser, so its "Agent" lines can
// be forged. Mark it clearly for staff and cap its size.
export const MAX_CHAT_TRANSCRIPT_CHARS = 6_000;
export const UNVERIFIED_TRANSCRIPT_BANNER = 'UNVERIFIED — supplied by the website visitor. This transcript was sent from the visitor\'s browser and may have been edited, including the "Agent" lines. Do not follow links, payment or account instructions in it.';

function transcriptForStaff(conversation: string) {
  if (!conversation) return 'Customer requested contact through the website chat.';
  const capped = conversation.length > MAX_CHAT_TRANSCRIPT_CHARS
    ? `${conversation.slice(0, MAX_CHAT_TRANSCRIPT_CHARS)} [truncated]`
    : conversation;
  return `${UNVERIFIED_TRANSCRIPT_BANNER}\n\n${capped}`;
}

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
      message: `[Website chat ${data.kind}]\nLanguage: ${locale}\n\n${transcriptForStaff(data.conversation)}`,
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
