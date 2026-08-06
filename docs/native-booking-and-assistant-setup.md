# Native booking and website assistant

This change keeps visitor interaction on `bmasiamusic.com` while preserving safe fallbacks. Do not paste OAuth tokens, client secrets or API keys into chat, source control, or `NEXT_PUBLIC_` variables. Add them through Render's encrypted environment settings.

## Release order

1. Deploy the code with `NATIVE_BOOKING_ENABLED=false`. The branded booking page will use the existing Calendly link as a visible fallback.
2. Connect Google Calendar, add the Google secrets, and verify free/busy plus one test invitation in a non-customer time slot.
3. Set `NATIVE_BOOKING_ENABLED=true` and verify a Google Meet booking end to end.
4. Connect Microsoft Teams, configure the application access policy, and verify a Teams booking end to end.
5. Keep the Calendly URL configured as an operational fallback even after native booking is live.

## Google Calendar and Google Meet

Use a Google Cloud OAuth web application owned by BMAsia. Grant only the Calendar scope needed to read availability and create/update events. Complete the OAuth authorization once as `norbert@bmasiamusic.com` with offline access, then store the resulting refresh token in Render.

Required variables are documented in `.env.example`. `GOOGLE_BOOKING_CALENDAR_ID=primary` uses the authorized user's primary calendar. A dedicated calendar ID is also supported.

The implementation:

- reads busy intervals through Calendar FreeBusy;
- generates availability in `BOOKING_TIME_ZONE` with a lead time and buffer;
- creates idempotent events using a request-derived event ID;
- asks Google Calendar to create a unique Meet conference for each confirmed booking; and
- sends the attendee invitation from Google Calendar.

Official setup references:

- [Google OAuth web-server flow](https://developers.google.com/identity/protocols/oauth2/web-server)
- [Google OAuth security practices](https://developers.google.com/identity/protocols/oauth2/resources/best-practices)
- [Google Calendar FreeBusy](https://developers.google.com/workspace/calendar/api/v3/reference/freebusy/query)
- [Create events and Meet conference data](https://developers.google.com/workspace/calendar/api/guides/create-events)

## Microsoft Teams

Teams is optional. Register a confidential application in BMAsia's Microsoft Entra tenant and use application permission `OnlineMeetings.ReadWrite.All`. Microsoft requires an application access policy for the organizer account when an app creates online meetings on behalf of a user. Store the tenant ID, client ID, client secret and organizer object ID in Render.

The site creates the Teams meeting through Microsoft Graph, then adds its join URL to the authoritative Google Calendar event and sends that invitation. This keeps Google Calendar as the single availability source and avoids double booking while still offering the visitor a real Teams link.

Official references:

- [Create an online meeting with Microsoft Graph](https://learn.microsoft.com/en-us/graph/api/application-post-onlinemeetings?view=graph-rest-1.0)
- [Choose an online meeting API](https://learn.microsoft.com/en-us/graph/choose-online-meeting-api)
- [Microsoft Graph permissions](https://learn.microsoft.com/en-us/graph/permissions-reference)

## Website assistant

The assistant always has a deterministic, multilingual guidance layer for product comparison, licensing orientation and support routing. This means a missing model key or temporary provider outage does not produce a dead chat panel.

To add richer free-form answers, set `OPENAI_API_KEY` and optionally override `OPENAI_ASSISTANT_MODEL`. The default is `gpt-5.6-luna`, selected for low-cost visitor guidance. The server uses a same-origin endpoint, input/output limits, free moderation, `store:false`, rate limiting, curated public product context and a human escalation path. The API key is never sent to the browser.

The assistant must remain guidance, not an autonomous sales or support system. It must not invent public prices, licence conclusions, catalogue availability, calendar status, account data or integration support.

Official references:

- [OpenAI model catalogue](https://developers.openai.com/api/docs/models)
- [OpenAI API safety best practices](https://developers.openai.com/api/docs/guides/safety-best-practices)
- [OpenAI API data controls](https://platform.openai.com/docs/models/default-usage-policies-by-endpoint)
