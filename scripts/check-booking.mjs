import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';

// Run in the Render shell. All provider requests are simulated; this creates
// no calendar events, sends no invitations, and reads no production secrets.
const require = createRequire(import.meta.url);
function load(file, { imports = {}, fetch, env = {} } = {}) {
  const output = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2021 },
  }).outputText;
  const module = { exports: {} };
  new Function('require', 'module', 'exports', 'fetch', 'process', output)(
    (id) => imports[id] || require(id), module, module.exports,
    fetch || (() => { throw new Error('Unexpected provider request'); }), { env },
  );
  return module.exports;
}

const events = new Map();
let inserts = 0;
let missingCalendar = false;
const json = (body, status = 200) => new Response(JSON.stringify(body), { status });
const booking = load('lib/booking.ts', {
  env: {
    NATIVE_BOOKING_ENABLED: 'true', GOOGLE_BOOKING_CLIENT_ID: 'test',
    GOOGLE_BOOKING_CLIENT_SECRET: 'test', GOOGLE_BOOKING_REFRESH_TOKEN: 'test',
  },
  fetch: async (url, init = {}) => {
    const parsed = new URL(url);
    if (parsed.hostname === 'oauth2.googleapis.com') return json({ access_token: 'test', expires_in: 3600 });
    assert.equal(parsed.hostname, 'www.googleapis.com');
    if (parsed.pathname.endsWith('/freeBusy')) {
      const busy = [...events.values()].filter((event) => event.status !== 'cancelled')
        .map((event) => ({ start: event.start.dateTime, end: event.end.dateTime }));
      return json({ calendars: missingCalendar ? {} : { primary: { busy } } });
    }
    if (init.method === 'POST' && parsed.pathname.endsWith('/events')) {
      const event = JSON.parse(init.body);
      if (events.has(event.id)) return json({}, 409);
      inserts += 1;
      events.set(event.id, { ...event, status: 'confirmed' });
      return json(events.get(event.id));
    }
    const id = parsed.pathname.split('/events/')[1];
    assert.ok(id, 'Unrecognized simulated request');
    return events.has(id) ? json(events.get(id)) : json({}, 404);
  },
});

const slots = await booking.getAvailableBookingSlots();
assert.ok(slots.length);
const request = {
  requestId: 'bookingregression0001', start: slots[0].start, provider: 'google-meet',
  name: 'INJECTED-NAME', email: 'test@example.com', company: 'INJECTED-COMPANY',
  notes: 'INJECTED-NOTES visit https://attacker.example', locale: 'en',
};
const first = await booking.createBooking(request);
assert.equal(first.alreadyExists, false);
assert.equal(inserts, 1);
const invite = events.get(first.eventId);
const attendeeVisible = JSON.stringify({ summary: invite.summary, description: invite.description, location: invite.location, attendees: invite.attendees });
for (const injected of ['INJECTED-NAME', 'INJECTED-COMPANY', 'INJECTED-NOTES', 'attacker.example']) {
  assert.ok(!attendeeVisible.includes(injected), `attendee-visible invite fields must not contain ${injected}`);
}
assert.equal(invite.extendedProperties.private.company, 'INJECTED-COMPANY');
assert.ok(invite.extendedProperties.private.notes.startsWith('INJECTED-NOTES'));
console.log('PASS visitor free text stays out of attendee-visible invite fields');
const retry = await booking.createBooking(request);
assert.equal(retry.eventId, first.eventId);
assert.equal(retry.alreadyExists, true);
assert.equal(inserts, 1);
console.log('PASS confirmed booking retry does not create another invitation');

await assert.rejects(booking.createBooking({ ...request, requestId: 'anotherrequest0001' }), booking.BookingSlotConflictError);
const blockedSlot = slots[1];
if (blockedSlot && new Date(blockedSlot.start) - new Date(request.start) < 45 * 60_000) {
  await assert.rejects(booking.createBooking({ ...request, requestId: 'bufferedrequest0001', start: blockedSlot.start }), booking.BookingSlotConflictError);
}
assert.equal(inserts, 1);
console.log('PASS occupied and buffered slots reject new bookings');

events.get(first.eventId).status = 'cancelled';
const replacement = await booking.createBooking({ ...request, requestId: 'replacement00001' });
assert.notEqual(replacement.eventId, first.eventId);
assert.equal(inserts, 2);
await assert.rejects(booking.createBooking({ ...request, requestId: 'replacement00002' }), booking.BookingSlotConflictError);
console.log('PASS cancelled slots can be rebooked and retain collision protection');

missingCalendar = true;
await assert.rejects(booking.getAvailableBookingSlots(), /availability error/);
console.log('PASS missing calendar data does not advertise false availability');

let turnstileOk = true;
let quotaReached = false;
let staffEmails = 0;
let createResult = { eventId: first.eventId, alreadyExists: true };
const loadRoute = () => load('app/api/booking/route.ts', {
  imports: {
    '@/lib/booking': {
      getBookingCapability: () => ({ configured: true, providers: ['google-meet'] }),
      getAvailableBookingSlots: async () => [],
      createBooking: async () => createResult,
      formatBookingSlot: (start) => start,
      BookingSlotConflictError: booking.BookingSlotConflictError,
    },
    '@/lib/rate-limiter': {
      checkRateLimit: () => ({ isLimited: false }), getClientIP: () => 'isolated-test', isHoneypotTriggered: () => false,
      isDailyQuotaReached: () => quotaReached, recordDailyQuotaUse: () => undefined,
    },
    '@/lib/turnstile': { verifyTurnstile: async () => (turnstileOk ? { ok: true, skipped: true } : { ok: false, reason: 'test' }) },
    '@/lib/email': { sendBookingNotification: async () => { staffEmails += 1; } },
    '@/lib/i18n-config': { locales: ['en'] },
  },
});
const route = loadRoute();
const post = () => route.POST({ headers: new Headers(), json: async () => request });
const response = await post();
assert.equal(response.status, 200);
assert.equal((await response.json()).alreadyExists, true);
assert.equal(staffEmails, 0);
console.log('PASS API recovers a confirmed request before free/busy rejection');

turnstileOk = false;
assert.equal((await post()).status, 403);
turnstileOk = true;
quotaReached = true;
assert.equal((await post()).status, 429);
quotaReached = false;
console.log('PASS API enforces Turnstile and the global daily booking cap');

createResult = { eventId: 'new-event', alreadyExists: false };
assert.equal((await post()).status, 201);
assert.equal(staffEmails, 1);
console.log('PASS new bookings notify staff internally');
console.log('Booking regression checks complete; no external requests or real bookings.');
