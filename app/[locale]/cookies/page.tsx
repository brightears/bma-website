import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy — BMAsia',
  description: 'How BMAsia uses cookies and similar technologies on our website.',
};

export default function CookiePolicyPage() {
  return (
    <main className="bg-[#0f0f0f] pt-28 pb-20 px-6 md:px-12">
      <article className="max-w-3xl mx-auto prose-invert">
        <p className="font-label text-brand-orange text-xs tracking-[0.3em] uppercase mb-4">Legal</p>
        <h1 className="font-headline text-4xl md:text-5xl text-white mb-4">Cookie Policy</h1>
        <p className="text-white/40 text-sm mb-12">Last updated: 9 April 2026</p>

        <div className="space-y-10 text-white/70 leading-relaxed">
          <section>
            <h2 className="font-headline text-2xl text-white mb-4">What Are Cookies</h2>
            <p>Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and understand how you interact with it.</p>
          </section>

          <section>
            <h2 className="font-headline text-2xl text-white mb-4">Cookies We Use</h2>
            <table className="w-full text-sm mt-2">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white py-3 pr-4">Cookie</th>
                  <th className="text-left text-white py-3 pr-4">Category</th>
                  <th className="text-left text-white py-3 pr-4">Purpose</th>
                  <th className="text-left text-white py-3">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-3 pr-4 font-mono text-xs">cookie_consent</td>
                  <td className="py-3 pr-4">Necessary</td>
                  <td className="py-3 pr-4">Stores your cookie consent preferences</td>
                  <td className="py-3">12 months</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-mono text-xs">_ga, _ga_*</td>
                  <td className="py-3 pr-4">Analytics</td>
                  <td className="py-3 pr-4">Google Analytics — measures site usage and traffic</td>
                  <td className="py-3">14 months</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-mono text-xs">NEXT_LOCALE</td>
                  <td className="py-3 pr-4">Necessary</td>
                  <td className="py-3 pr-4">Remembers your language preference</td>
                  <td className="py-3">Session</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="font-headline text-2xl text-white mb-4">Cookie Categories</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-bold mb-2">Strictly Necessary</h3>
                <p>Required for the website to function. These cannot be disabled. They include session management and your cookie consent choice.</p>
              </div>
              <div>
                <h3 className="text-white font-bold mb-2">Analytics</h3>
                <p>Help us understand how visitors use our website so we can improve it. These cookies are only set after you give consent. We use Google Analytics with IP anonymization enabled.</p>
              </div>
              <div>
                <h3 className="text-white font-bold mb-2">Functional</h3>
                <p>Enable enhanced functionality like the AI chat widget. These cookies are only set when you interact with the chat feature.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-headline text-2xl text-white mb-4">Managing Your Preferences</h2>
            <p>When you first visit our site, a cookie banner will ask for your consent. You can change your preferences at any time by clicking &ldquo;Manage Cookie Preferences&rdquo; in our website footer.</p>
            <p className="mt-3">You can also control cookies through your browser settings. Note that disabling certain cookies may affect website functionality.</p>
          </section>

          <section>
            <h2 className="font-headline text-2xl text-white mb-4">Third-Party Cookies</h2>
            <p>Google Analytics sets cookies on our behalf to collect anonymous usage statistics. Google&apos;s privacy policy applies to their processing of this data. We do not allow any other third-party advertising or tracking cookies.</p>
          </section>

          <section>
            <h2 className="font-headline text-2xl text-white mb-4">Contact</h2>
            <p>For questions about our use of cookies, contact <a href="mailto:info@bmasiamusic.com" className="text-brand-orange hover:underline">info@bmasiamusic.com</a>.</p>
          </section>
        </div>
      </article>
    </main>
  );
}
