import nodemailer from 'nodemailer';

/**
 * Gmail SMTP transporter for sending email notifications
 */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

interface InquiryEmailData {
  name: string;
  company: string;
  email: string;
  message: string;
}

interface QuotationEmailData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  companyName: string;
  companyAddress: string;
  preferredSolution: string;
  numberOfZones: number;
}

interface SoundtrackTrialEmailData {
  name: string;
  email: string;
  company: string;
  country: string;
  businessType: string;
  locationName: string;
  zoneName?: string;
}

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const escapeMultilineHtml = (value: string) => escapeHtml(value).replace(/\r?\n/g, '<br>');
const safeSubjectValue = (value: string) => value.replace(/[\r\n]+/g, ' ').trim().slice(0, 160);

/**
 * Send notification email for new inquiry submission
 */
export async function sendInquiryNotification(data: InquiryEmailData): Promise<void> {
  const safe = {
    name: escapeHtml(data.name),
    company: escapeHtml(data.company),
    email: escapeHtml(data.email),
    message: escapeMultilineHtml(data.message),
  };
  const mailOptions = {
    from: `"BMAsia Website" <${process.env.GMAIL_USER}>`,
    to: process.env.NOTIFICATION_EMAIL,
    replyTo: data.email,
    subject: `New Inquiry from ${safeSubjectValue(data.name)} - ${safeSubjectValue(data.company)}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%); padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="color: #EFA634; margin: 0; font-size: 24px;">New Music Inquiry</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #1a1a2e; margin-top: 0;">Contact Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${safe.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Company:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${safe.company}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                <a href="mailto:${safe.email}" style="color: #EFA634;">${safe.email}</a>
              </td>
            </tr>
          </table>

          <h2 style="color: #1a1a2e; margin-top: 30px;">Message</h2>
          <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #eee;">
            ${safe.message}
          </div>

          <p style="color: #666; font-size: 12px; margin-top: 30px; text-align: center;">
            This email was sent from the BMAsia website contact form.
          </p>
        </div>
      </div>
    `,
    text: `
New Music Inquiry

Name: ${data.name}
Company: ${data.company}
Email: ${data.email}

Message:
${data.message}

---
Sent from BMAsia website contact form
    `,
  };

  await transporter.sendMail(mailOptions);
}

/**
 * Send notification email for new quotation request
 */
export async function sendQuotationNotification(data: QuotationEmailData): Promise<void> {
  const solutionLabels: Record<string, string> = {
    'soundtrack-your-brand': 'Soundtrack Your Brand',
    'beat-breeze': 'Beat Breeze',
    'not-sure': 'Not Sure Yet',
  };

  const safe = {
    firstName: escapeHtml(data.firstName),
    lastName: escapeHtml(data.lastName),
    email: escapeHtml(data.email),
    country: escapeHtml(data.country),
    companyName: escapeHtml(data.companyName),
    companyAddress: escapeMultilineHtml(data.companyAddress),
    preferredSolution: escapeHtml(solutionLabels[data.preferredSolution] || data.preferredSolution),
    numberOfZones: Number.isFinite(data.numberOfZones) ? String(data.numberOfZones) : '',
  };

  const mailOptions = {
    from: `"BMAsia Website" <${process.env.GMAIL_USER}>`,
    to: process.env.NOTIFICATION_EMAIL,
    replyTo: data.email,
    subject: `New Quotation Request from ${safeSubjectValue(`${data.firstName} ${data.lastName}`)} - ${safeSubjectValue(data.companyName)}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%); padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="color: #EFA634; margin: 0; font-size: 24px;">New Quotation Request</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #1a1a2e; margin-top: 0;">Contact Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 140px;">Name:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${safe.firstName} ${safe.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                <a href="mailto:${safe.email}" style="color: #EFA634;">${safe.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Country:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${safe.country}</td>
            </tr>
          </table>

          <h2 style="color: #1a1a2e; margin-top: 30px;">Company Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 140px;">Company Name:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${safe.companyName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; vertical-align: top;">Address:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${safe.companyAddress}</td>
            </tr>
          </table>

          <h2 style="color: #1a1a2e; margin-top: 30px;">Requirements</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 140px;">Solution:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                <span style="background: #EFA634; color: white; padding: 4px 12px; border-radius: 4px;">
                  ${safe.preferredSolution}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Number of Zones:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${safe.numberOfZones}</td>
            </tr>
          </table>

          <p style="color: #666; font-size: 12px; margin-top: 30px; text-align: center;">
            This email was sent from the BMAsia website quotation form.
          </p>
        </div>
      </div>
    `,
    text: `
New Quotation Request

Contact Details:
- Name: ${data.firstName} ${data.lastName}
- Email: ${data.email}
- Country: ${data.country}

Company Information:
- Company Name: ${data.companyName}
- Address: ${data.companyAddress}

Requirements:
- Preferred Solution: ${solutionLabels[data.preferredSolution] || data.preferredSolution}
- Number of Zones: ${data.numberOfZones}

---
Sent from BMAsia website quotation form
    `,
  };

  await transporter.sendMail(mailOptions);
}

/**
 * Send a distinct notification for a Soundtrack no-card trial request.
 * Provisioning is deliberately handled after review; this email and the
 * persisted inquiry are the operational hand-off.
 */
export async function sendSoundtrackTrialNotification(data: SoundtrackTrialEmailData): Promise<void> {
  const safe = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, escapeHtml(value || '')])
  ) as Record<keyof SoundtrackTrialEmailData, string>;

  const mailOptions = {
    from: `"BMAsia Website" <${process.env.GMAIL_USER}>`,
    to: process.env.NOTIFICATION_EMAIL,
    replyTo: data.email,
    subject: `Soundtrack trial request — ${data.company}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
        <div style="background: #190d21; padding: 30px; border-radius: 10px 10px 0 0;">
          <p style="color: #d6c2ff; margin: 0 0 8px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">14-day no-card trial</p>
          <h1 style="color: white; margin: 0; font-size: 24px;">New Soundtrack trial request</h1>
        </div>
        <div style="background: #f8f5ff; padding: 30px; border-radius: 0 0 10px 10px; color: #190d21;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #ded5eb; font-weight: bold; width: 150px;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #ded5eb;">${safe.name}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #ded5eb; font-weight: bold;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #ded5eb;"><a href="mailto:${safe.email}" style="color: #5f3b89;">${safe.email}</a></td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #ded5eb; font-weight: bold;">Company</td><td style="padding: 10px 0; border-bottom: 1px solid #ded5eb;">${safe.company}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #ded5eb; font-weight: bold;">Country</td><td style="padding: 10px 0; border-bottom: 1px solid #ded5eb;">${safe.country}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #ded5eb; font-weight: bold;">Business type</td><td style="padding: 10px 0; border-bottom: 1px solid #ded5eb;">${safe.businessType}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #ded5eb; font-weight: bold;">First location</td><td style="padding: 10px 0; border-bottom: 1px solid #ded5eb;">${safe.locationName}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #ded5eb; font-weight: bold;">First zone</td><td style="padding: 10px 0; border-bottom: 1px solid #ded5eb;">${safe.zoneName || 'Not specified'}</td></tr>
          </table>
          <p style="margin: 24px 0 0; color: #6f607c; font-size: 13px;">Review the request, verify the business details, then activate the Soundtrack trial through the approved operational workflow.</p>
        </div>
      </div>
    `,
    text: `Soundtrack trial request\n\nName: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company}\nCountry: ${data.country}\nBusiness type: ${data.businessType}\nFirst location: ${data.locationName}\nFirst zone: ${data.zoneName || 'Not specified'}`,
  };

  await transporter.sendMail(mailOptions);
}
