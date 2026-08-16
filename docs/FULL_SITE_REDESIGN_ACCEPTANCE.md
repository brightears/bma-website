# BMAsia full-site redesign acceptance checklist

Baseline: merged PR #8 at `01f0991`. This branch must stay review-only until the user explicitly approves merge or production deployment.

## Parent-brand homepage

- [x] The hero leads with BMAsia, not "Beat Breeze by BMAsia".
- [x] The first conversion action is product-neutral: choose a route or talk to BMAsia.
- [x] Beat Breeze and Soundtrack receive early, balanced, credible product routes.
- [x] No public price appears in visible copy, metadata, JSON-LD, or FAQs.
- [x] The Venue Time Machine is an integral proof of BMAsia's venue-experience work.
- [x] The homepage demonstrates music, screens, messaging, automation, APIs, and venue touchpoints.
- [x] The experience works for visitors who know their product and visitors who need help choosing.

## Beat Breeze

- [x] The page is the most expressive product world, using BMAsia orange with green/cyan energy.
- [x] The story covers curated royalty-free music, scheduling/dayparting, weather behavior, prayer times, scheduled/preset volume, supported integrations, APIs, AI-assisted images/video, screens/loops, slideshows, multilingual messaging, venue/in-room TV, soundscapes, phone-on-hold, and coordinated touchpoints.
- [x] Music Director is explained in plain language: customer prompt, recommendation/creation, playable action, and human approval/control.
- [x] No continuous microphone or autonomous ambient-volume claim is published.
- [x] No long generic feature-card wall; interaction and operational proof carry the narrative.
- [x] Trial and login links use the real Beat Breeze destinations.

## Soundtrack

- [x] The page keeps the official plum/lavender Soundtrack world and logo.
- [x] The story covers familiar major-label music, large catalogue, BMAsia music design and refreshes, reseller/onboarding/service, and BMAsia-built prayer-time, volume, weather, and API extensions.
- [x] BMAsia extensions are clearly scoped to Soundtrack supplied through BMAsia.
- [x] Support copy promises responsive regional/ongoing human support, not 24/7 humans.
- [x] Trial requests use the dedicated reviewed activation lifecycle, never the general quote form.
- [x] Soundtrack visitors are never redirected to Beat Breeze signup.

## Industries and supporting pages

- [x] All 12 industry routes use one maintainable system but render genuinely tailored scenarios.
- [x] Each industry combines the relevant music, screens, messaging, video, automation, APIs, scheduling, zones, and dayparts.
- [x] Statistics and claims are either sourced accurately or replaced by grounded operational proof.
- [x] How it works, licensing, quotation, trial, legal, and retired music-design paths remain coherent and functional.

## Global experience and conversion

- [x] Product choice remains obvious in header, menus, footer, and page CTAs.
- [x] The Solutions menu is opaque, keyboard-usable, and visually strong.
- [x] Login presents separate Beat Breeze and Soundtrack choices.
- [x] The language selector is intentional and retains the current route.
- [x] Mobile/tablet navigation uses the existing body portal safety pattern.
- [x] Footer represents both products and BMAsia's wider service reach without Asia-Pacific-only language.
- [x] Funnel supports: Help me choose, Explore Beat Breeze, Explore Soundtrack, product-specific trial/inquiry, Talk to BMAsia.
- [x] Cross-domain product CTAs retain privacy-safe campaign/referrer attribution.

## Privacy, safety, SEO, and accessibility

- [x] GTM and Apollo load only after analytics consent and are disclosed accurately.
- [x] Visitors can reject and later reopen/manage analytics preferences.
- [x] Inquiry and quotation email HTML escapes every user-controlled value.
- [x] Metadata is localized, avoids duplicated site names, and contains no stale price/support claims.
- [x] Each rendered route has exactly one `main`; no page nests a second one inside the locale layout.
- [x] Skip link, focus states, labels, reduced motion, contrast, and semantic landmarks remain usable.
- [x] Forms retain validation, honeypot, rate limiting, database writes, and clear status states.

## Verification gates

- [x] TypeScript and production build succeed.
- [x] Translation object shapes match across all eight locales.
- [x] All required locale routes render successfully.
- [x] Desktop, tablet, and mobile screenshots are inspected and corrected for wrapping, overflow, hierarchy, and controls.
- [x] Core forms and product/login links are inspected without creating real customer actions.
- [ ] A reviewable branch/PR and normal reachable preview are provided.
- [x] No merge or production deployment occurs without explicit approval.
