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

/**
 * Send notification email for new inquiry submission
 */
export async function sendInquiryNotification(data: InquiryEmailData): Promise<void> {
  const mailOptions = {
    from: `"BMAsia Website" <${process.env.GMAIL_USER}>`,
    to: process.env.NOTIFICATION_EMAIL,
    subject: `New Inquiry from ${data.name} - ${data.company}`,
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
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Company:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.company}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                <a href="mailto:${data.email}" style="color: #EFA634;">${data.email}</a>
              </td>
            </tr>
          </table>

          <h2 style="color: #1a1a2e; margin-top: 30px;">Message</h2>
          <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #eee;">
            ${data.message.replace(/\n/g, '<br>')}
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

  const mailOptions = {
    from: `"BMAsia Website" <${process.env.GMAIL_USER}>`,
    to: process.env.NOTIFICATION_EMAIL,
    subject: `New Quotation Request from ${data.firstName} ${data.lastName} - ${data.companyName}`,
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
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.firstName} ${data.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                <a href="mailto:${data.email}" style="color: #EFA634;">${data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Country:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.country}</td>
            </tr>
          </table>

          <h2 style="color: #1a1a2e; margin-top: 30px;">Company Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 140px;">Company Name:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.companyName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; vertical-align: top;">Address:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.companyAddress.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>

          <h2 style="color: #1a1a2e; margin-top: 30px;">Requirements</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 140px;">Solution:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                <span style="background: #EFA634; color: white; padding: 4px 12px; border-radius: 4px;">
                  ${solutionLabels[data.preferredSolution] || data.preferredSolution}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Number of Zones:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.numberOfZones}</td>
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
