/**
 * /llms.txt — an AI-assistant-oriented site manifest (llmstxt.org format).
 *
 * Composed from the same translation strings as the visible pages
 * (messages/en.json) so the file cannot drift from what the site says.
 * English only by design: AI answer engines overwhelmingly retrieve and cite
 * English pages; hreflang alternates on each page cover the other locales.
 */
import en from '@/messages/en.json';
import { SITE, SOCIAL } from '@/lib/constants';

export const dynamic = 'force-static';

const INDUSTRIES = [
  ['hotels', 'Hotels and resorts'],
  ['restaurants', 'Restaurants'],
  ['bars', 'Bars and lounges'],
  ['spas', 'Spas and wellness'],
  ['retail', 'Retail and fashion'],
  ['cafes', 'Cafés and coffee shops'],
  ['malls', 'Shopping malls'],
  ['gyms', 'Gyms and fitness'],
  ['medical', 'Medical and dental'],
  ['offices', 'Offices'],
  ['showrooms', 'Showrooms'],
  ['events', 'Events and venues'],
] as const;

function buildLlmsTxt(): string {
  const base = SITE.url;
  const syb = en.homePage.twoSolutions.syb;
  const bb = en.homePage.twoSolutions.bb;
  const rights = en.licensingPage.rights;
  const personal = en.licensingPage.personal;
  const comparison = en.licensingPage.comparison;

  const industryLinks = INDUSTRIES.map(([slug, name]) => {
    const d = en.industryData[slug];
    return `- [${name}](${base}/en/solutions/${slug}/): ${d.headline}`;
  }).join('\n');

  return `# BMAsia

> ${en.metadata.description} Founded in 2002 and headquartered in Bangkok, Thailand, BMAsia serves hospitality, retail, wellness, workplace, and public venues across Asia-Pacific and beyond. Tagline: "${SITE.tagline}". This site is available in 8 languages (en, th, vi, ms, id, ko, ja, zh); English is the x-default.

${en.homePage.immersive.hero.description} BMAsia provides independent product guidance, bespoke music design, onboarding, schedules, and regional human support around both platforms.

The two music platforms:

**${syb.title}** — ${syb.tagline}
- ${syb.feature1}
- ${syb.feature2}
- ${syb.feature3}
- ${syb.feature4}
- ${syb.licenseNote} (in the United States and Canada, ordinary background-music use is covered; elsewhere the venue normally adds local collecting-society licences — BMAsia confirms the setup during onboarding)

**${bb.title}** — ${bb.tagline}
- ${bb.feature1}
- ${bb.feature2}
- ${bb.feature3}
- ${bb.feature4}
- ${comparison.bb.headline} ${comparison.bb.performanceNote}
- Trial: ${en.homePage.beatBreezeLead.proof1}, ${en.homePage.beatBreezeLead.proof2.toLowerCase()}, ${en.homePage.beatBreezeLead.proof3.toLowerCase()}

Common buyer questions:

Q: Can we play Spotify, YouTube, or another consumer streaming service in our business?
A: No. ${personal.description} ${personal.consumerDescription} That is why venues use a business music service such as Beat Breeze or Soundtrack.

Q: What is the difference between Soundtrack and Beat Breeze?
A: Soundtrack offers a large licensed commercial catalogue of familiar, major-label music with recording and publishing rights included; public-performance requirements depend on the country. Beat Breeze is BMAsia's royalty-free venue experience platform: the catalogue and covered business playback rights are included with no separate music licence, alongside screens, messaging, scheduling, and automation. BMAsia advises honestly on which route fits a venue and services both.

Q: Do we still need a public-performance (collecting-society / PRO) licence?
A: It depends on the platform and the country. ${rights['04'].description} For music played through Beat Breeze, covered business playback is included, so no separate music licence is needed (live acts, DJs, third-party music, and visual synchronisation are separate use cases). With Soundtrack, recording and publishing rights are included; in the United States and Canada ordinary background use is also covered, while in most other countries the venue adds local collecting-society licences. BMAsia confirms the exact scope in writing before activation.

Q: Does BMAsia require special hardware?
A: No dedicated hardware is required. Beat Breeze runs in a browser or as an app on devices the venue already owns, and its playback is offline-capable. For Soundtrack, the exact setup follows the selected product, venue hardware, and network conditions — BMAsia helps configure compatible playback during onboarding.

Q: Is there a free trial?
A: Both platforms offer a 14-day free trial with no card required. The Beat Breeze trial is self-serve at beatbreeze.io. Soundtrack trials are reviewed and arranged for the business by BMAsia via the Soundtrack trial request page.

Q: How does pricing work?
A: Pricing is quotation-based. It depends on the product route, the number of locations and zones, and the territory. Venues request a tailored proposal via the quotation page and BMAsia follows up with the right product path.

Q: What does BMAsia add beyond the software?
A: Music design since 2002, guided onboarding, daypart schedule design, responsive regional support, and BMAsia-built venue extensions such as prayer-time automation, weather-aware playlist behavior, supported volume integrations, and operational APIs for approved deployments.

## Key pages

- [Home](${base}/en/): what BMAsia does and how the two platforms differ
- [Beat Breeze](${base}/en/beat-breeze/): ${en.beatBreezePage.metadata.description}
- [Soundtrack through BMAsia](${base}/en/soundtrack-your-brand/): ${en.soundtrackPage.metadata.description}
- [Music licensing explained](${base}/en/licensing/): ${en.licensingPage.hero.subtitle}
- [How it works](${base}/en/how-it-works/): ${en.howItWorksPage.hero.subtitle}
- [Request a quote](${base}/en/quotation/): tailored proposal for your venue, locations, and zones
- [Request a Soundtrack trial](${base}/en/soundtrack-trial/): 14-day, no-card Soundtrack trial, reviewed and arranged by BMAsia
- [Book a demo](${base}/en/book-demo/): schedule a session with the BMAsia team
- [Beat Breeze platform](https://beatbreeze.io): sign-up, player apps, and product site

## Solutions by industry

${industryLinks}

## Company

- [BMAsia](${base}/en/): BMAsia Group — founded 2002, headquartered in Bangkok, Thailand, serving venues across Asia-Pacific and beyond
- [Beat Breeze platform](https://beatbreeze.io): BMAsia's own venue experience platform
- [Email BMAsia](mailto:${SITE.email}): ${SITE.email}
- [WhatsApp](${SOCIAL.whatsapp}): chat directly with the BMAsia team

## Optional

- [Privacy policy](${base}/en/privacy/)
- [Cookie policy](${base}/en/cookies/)
- [Terms of service](${base}/en/terms/)
`;
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
