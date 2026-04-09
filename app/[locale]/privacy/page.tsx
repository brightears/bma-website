import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — BMAsia',
  description: 'How BMAsia collects, uses, and protects your personal data.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-[#0f0f0f] pt-28 pb-20 px-6 md:px-12">
      <article className="max-w-3xl mx-auto prose-invert">
        <p className="font-label text-brand-orange text-xs tracking-[0.3em] uppercase mb-4">Legal</p>
        <h1 className="font-headline text-4xl md:text-5xl text-white mb-4">Privacy Policy</h1>
        <p className="text-white/40 text-sm mb-12">Last updated: 9 April 2026</p>

        <div className="space-y-10 text-white/70 leading-relaxed">
          <section>
            <h2 className="font-headline text-2xl text-white mb-4">1. Who We Are</h2>
            <p>This policy applies to both BMAsia entities that may process your data:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong className="text-white">BMAsia (Thailand) Co., Ltd.</strong> — 725 S-Metro Building, Suite 144, Level 20, Sukhumvit Road, Klongtan Nua, Watthana, Bangkok 10110, Thailand</li>
              <li><strong className="text-white">BMAsia Limited</strong> — Hong Kong</li>
            </ul>
            <p className="mt-3">For privacy inquiries, contact us at <a href="mailto:info@bmasiamusic.com" className="text-brand-orange hover:underline">info@bmasiamusic.com</a>.</p>
          </section>

          <section>
            <h2 className="font-headline text-2xl text-white mb-4">2. What Data We Collect</h2>
            <p><strong className="text-white">Data you provide directly:</strong></p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Name, email address, company name, and phone number (via contact and quotation forms)</li>
              <li>Messages you send through our website chat</li>
              <li>Any other information you include in correspondence with us</li>
            </ul>
            <p className="mt-4"><strong className="text-white">Data collected automatically:</strong></p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>IP address, browser type, device type, and operating system</li>
              <li>Pages visited, time spent, and referral source</li>
              <li>Cookies and similar tracking technologies (see our <a href="/cookies" className="text-brand-orange hover:underline">Cookie Policy</a>)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-2xl text-white mb-4">3. Why We Collect It</h2>
            <table className="w-full text-sm mt-2">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white py-3 pr-4">Purpose</th>
                  <th className="text-left text-white py-3">Legal Basis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr><td className="py-3 pr-4">Respond to your inquiry or quotation request</td><td className="py-3">Contract performance</td></tr>
                <tr><td className="py-3 pr-4">Provide customer support via chat</td><td className="py-3">Legitimate interest</td></tr>
                <tr><td className="py-3 pr-4">Send follow-up communications about our services</td><td className="py-3">Legitimate interest (B2B)</td></tr>
                <tr><td className="py-3 pr-4">Analyze website traffic and improve our site</td><td className="py-3">Consent (via cookies)</td></tr>
                <tr><td className="py-3 pr-4">Comply with legal obligations</td><td className="py-3">Legal obligation</td></tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="font-headline text-2xl text-white mb-4">4. Third Parties Who Process Your Data</h2>
            <p>We use the following service providers to operate our website. Your data may be processed by:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong className="text-white">Formspree</strong> (USA) — form submissions</li>
              <li><strong className="text-white">Google Analytics</strong> (USA) — website analytics</li>
              <li><strong className="text-white">ElevenLabs</strong> (USA) — AI voice chat functionality</li>
              <li><strong className="text-white">Render</strong> (USA) — website hosting</li>
            </ul>
            <p className="mt-3">Each provider processes data under their own privacy policies and in accordance with applicable data protection laws. Where data is transferred outside Thailand or Hong Kong, appropriate safeguards are in place.</p>
          </section>

          <section>
            <h2 className="font-headline text-2xl text-white mb-4">5. AI-Powered Chat</h2>
            <p>Our website includes an AI-powered chat assistant. When you use this feature:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>You are interacting with an artificial intelligence system, not a human</li>
              <li>Your messages are processed to generate responses about our services</li>
              <li>Chat data may be processed by ElevenLabs (voice) and our AI systems</li>
              <li>Responses are informational only and do not constitute contractual commitments</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-2xl text-white mb-4">6. How Long We Keep Your Data</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-white">Form submissions:</strong> 24 months from last interaction, unless a business relationship is established</li>
              <li><strong className="text-white">Client data:</strong> Duration of the contract plus 5 years (legal/accounting requirements)</li>
              <li><strong className="text-white">Analytics data:</strong> 14 months (Google Analytics default)</li>
              <li><strong className="text-white">Chat conversations:</strong> 12 months</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-2xl text-white mb-4">7. Your Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong className="text-white">Access</strong> — request a copy of the data we hold about you</li>
              <li><strong className="text-white">Correction</strong> — request correction of inaccurate data</li>
              <li><strong className="text-white">Deletion</strong> — request deletion of your data</li>
              <li><strong className="text-white">Portability</strong> — receive your data in a structured, machine-readable format</li>
              <li><strong className="text-white">Withdrawal of consent</strong> — withdraw consent at any time (e.g., for cookies or marketing)</li>
              <li><strong className="text-white">Objection</strong> — object to processing based on legitimate interest</li>
              <li><strong className="text-white">Complaint</strong> — lodge a complaint with the relevant authority</li>
            </ul>
            <p className="mt-4">To exercise any of these rights, email <a href="mailto:info@bmasiamusic.com" className="text-brand-orange hover:underline">info@bmasiamusic.com</a>. We will respond within 30 days.</p>
            <p className="mt-3"><strong className="text-white">Relevant authorities:</strong></p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Thailand: Personal Data Protection Committee (PDPC)</li>
              <li>Hong Kong: Office of the Privacy Commissioner for Personal Data (PCPD)</li>
              <li>EU: Your local Data Protection Authority</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-2xl text-white mb-4">8. Cookies</h2>
            <p>We use cookies to analyze website traffic and improve your experience. For full details on what cookies we use and how to manage them, see our <a href="/cookies" className="text-brand-orange hover:underline">Cookie Policy</a>.</p>
          </section>

          <section>
            <h2 className="font-headline text-2xl text-white mb-4">9. Changes to This Policy</h2>
            <p>We may update this policy from time to time. Material changes will be posted on this page with an updated date. Continued use of our website after changes constitutes acceptance of the revised policy.</p>
          </section>

          <section>
            <h2 className="font-headline text-2xl text-white mb-4">10. Contact</h2>
            <p>For any privacy-related questions or requests:</p>
            <p className="mt-2">
              Email: <a href="mailto:info@bmasiamusic.com" className="text-brand-orange hover:underline">info@bmasiamusic.com</a><br />
              BMAsia (Thailand) Co., Ltd.<br />
              725 S-Metro Building, Suite 144, Level 20<br />
              Sukhumvit Road, Klongtan Nua, Watthana<br />
              Bangkok 10110, Thailand
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
