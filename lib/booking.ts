import { createHash } from 'node:crypto';

export type BookingProvider = 'google-meet' | 'microsoft-teams';

export interface BookingSlot {
  start: string;
  end: string;
}

export interface BookingRequest {
  requestId: string;
  start: string;
  provider: BookingProvider;
  name: string;
  email: string;
  company: string;
  notes?: string;
  locale: string;
}

type AccessTokenCache = { token: string; expiresAt: number };
type GoogleEvent = {
  id: string;
  htmlLink?: string;
  location?: string;
  status?: string;
  conferenceData?: { entryPoints?: Array<{ entryPointType?: string; uri?: string }> };
  extendedProperties?: { private?: { requestId?: string } };
};

export class BookingSlotConflictError extends Error {
  constructor() {
    super('That booking slot is no longer available');
    this.name = 'BookingSlotConflictError';
  }
}

let googleTokenCache: AccessTokenCache | null = null;
let microsoftTokenCache: AccessTokenCache | null = null;

const getPositiveInteger = (name: string, fallback: number) => {
  const parsed = Number(process.env[name]);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

export const BOOKING_TIME_ZONE = process.env.BOOKING_TIME_ZONE || 'Asia/Bangkok';
export const BOOKING_DURATION_MINUTES = getPositiveInteger('BOOKING_DURATION_MINUTES', 30);
const rawStartHour = Number(process.env.BOOKING_START_HOUR ?? 10);
const rawEndHour = Number(process.env.BOOKING_END_HOUR ?? 17);
const validHourWindow = Number.isInteger(rawStartHour)
  && Number.isInteger(rawEndHour)
  && rawStartHour >= 0
  && rawEndHour <= 24
  && rawStartHour < rawEndHour;
const BOOKING_START_HOUR = validHourWindow ? rawStartHour : 10;
const BOOKING_END_HOUR = validHourWindow ? rawEndHour : 17;
const BOOKING_INTERVAL_MINUTES = getPositiveInteger('BOOKING_INTERVAL_MINUTES', 30);
const BOOKING_LEAD_HOURS = getPositiveInteger('BOOKING_LEAD_HOURS', 24);
const BOOKING_HORIZON_DAYS = Math.min(60, Math.max(7, getPositiveInteger('BOOKING_HORIZON_DAYS', 35)));
const BOOKING_BUFFER_MINUTES = getPositiveInteger('BOOKING_BUFFER_MINUTES', 15);

const googleConfigured = () => Boolean(
  process.env.NATIVE_BOOKING_ENABLED === 'true'
  && process.env.GOOGLE_BOOKING_CLIENT_ID
  && process.env.GOOGLE_BOOKING_CLIENT_SECRET
  && process.env.GOOGLE_BOOKING_REFRESH_TOKEN,
);

const teamsConfigured = () => Boolean(
  googleConfigured()
  && process.env.MICROSOFT_BOOKING_TENANT_ID
  && process.env.MICROSOFT_BOOKING_CLIENT_ID
  && process.env.MICROSOFT_BOOKING_CLIENT_SECRET
  && process.env.MICROSOFT_BOOKING_ORGANIZER_ID,
);

export function getBookingCapability() {
  const configured = googleConfigured();
  const providers: BookingProvider[] = configured ? ['google-meet'] : [];
  if (teamsConfigured()) providers.push('microsoft-teams');
  return {
    configured,
    providers,
    timeZone: BOOKING_TIME_ZONE,
    durationMinutes: BOOKING_DURATION_MINUTES,
  };
}

async function requestAccessToken(endpoint: string, body: URLSearchParams) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
    cache: 'no-store',
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`OAuth token request failed with ${response.status}`);
  const payload = await response.json() as { access_token?: string; expires_in?: number };
  if (!payload.access_token) throw new Error('OAuth provider did not return an access token');
  return {
    token: payload.access_token,
    expiresAt: Date.now() + Math.max(60, (payload.expires_in || 3600) - 120) * 1000,
  };
}

async function getGoogleAccessToken() {
  if (googleTokenCache && googleTokenCache.expiresAt > Date.now()) return googleTokenCache.token;
  const clientId = process.env.GOOGLE_BOOKING_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_BOOKING_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_BOOKING_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) throw new Error('Google booking is not configured');

  googleTokenCache = await requestAccessToken('https://oauth2.googleapis.com/token', new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  }));
  return googleTokenCache.token;
}

async function getMicrosoftAccessToken() {
  if (microsoftTokenCache && microsoftTokenCache.expiresAt > Date.now()) return microsoftTokenCache.token;
  const tenant = process.env.MICROSOFT_BOOKING_TENANT_ID;
  const clientId = process.env.MICROSOFT_BOOKING_CLIENT_ID;
  const clientSecret = process.env.MICROSOFT_BOOKING_CLIENT_SECRET;
  if (!tenant || !clientId || !clientSecret) throw new Error('Microsoft Teams booking is not configured');

  microsoftTokenCache = await requestAccessToken(
    `https://login.microsoftonline.com/${encodeURIComponent(tenant)}/oauth2/v2.0/token`,
    new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials',
    }),
  );
  return microsoftTokenCache.token;
}

async function googleCalendarFetch(path: string, init: RequestInit = {}) {
  const token = await getGoogleAccessToken();
  const headers = new Headers(init.headers);
  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Content-Type', 'application/json');
  return fetch(`https://www.googleapis.com/calendar/v3${path}`, {
    ...init,
    headers,
    cache: 'no-store',
    signal: AbortSignal.timeout(12_000),
  });
}

function getDateParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((part) => part.type === type)?.value || 0);
  return {
    year: value('year'),
    month: value('month'),
    day: value('day'),
    hour: value('hour'),
    minute: value('minute'),
    second: value('second'),
  };
}

function zonedTimeToUtc(year: number, month: number, day: number, hour: number, minute: number, timeZone: string) {
  const guess = Date.UTC(year, month - 1, day, hour, minute, 0);
  const firstParts = getDateParts(new Date(guess), timeZone);
  const firstAsUtc = Date.UTC(firstParts.year, firstParts.month - 1, firstParts.day, firstParts.hour, firstParts.minute, firstParts.second);
  const first = guess - (firstAsUtc - guess);
  const secondParts = getDateParts(new Date(first), timeZone);
  const secondAsUtc = Date.UTC(secondParts.year, secondParts.month - 1, secondParts.day, secondParts.hour, secondParts.minute, secondParts.second);
  return new Date(first - (secondAsUtc - guess));
}

async function getBusyIntervals(timeMin: Date, timeMax: Date) {
  const calendarId = process.env.GOOGLE_BOOKING_CALENDAR_ID || 'primary';
  const response = await googleCalendarFetch('/freeBusy', {
    method: 'POST',
    body: JSON.stringify({
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      timeZone: BOOKING_TIME_ZONE,
      items: [{ id: calendarId }],
    }),
  });
  if (!response.ok) throw new Error(`Google Calendar availability failed with ${response.status}`);
  const payload = await response.json() as {
    calendars?: Record<string, { busy?: Array<{ start: string; end: string }>; errors?: unknown[] }>;
  };
  const calendar = payload.calendars?.[calendarId];
  if (calendar?.errors?.length) throw new Error('Google Calendar returned an availability error');
  return (calendar?.busy || []).map((busy) => ({
    start: new Date(busy.start).getTime(),
    end: new Date(busy.end).getTime(),
  }));
}

export async function getAvailableBookingSlots(): Promise<BookingSlot[]> {
  if (!googleConfigured()) return [];
  const now = new Date();
  const earliest = new Date(now.getTime() + BOOKING_LEAD_HOURS * 60 * 60 * 1000);
  const today = getDateParts(now, BOOKING_TIME_ZONE);
  const finalDay = new Date(Date.UTC(today.year, today.month - 1, today.day + BOOKING_HORIZON_DAYS));
  const finalParts = { year: finalDay.getUTCFullYear(), month: finalDay.getUTCMonth() + 1, day: finalDay.getUTCDate() };
  const horizon = zonedTimeToUtc(finalParts.year, finalParts.month, finalParts.day, BOOKING_END_HOUR, 0, BOOKING_TIME_ZONE);
  const busy = await getBusyIntervals(earliest, horizon);
  const buffer = BOOKING_BUFFER_MINUTES * 60 * 1000;
  const duration = BOOKING_DURATION_MINUTES * 60 * 1000;
  const slots: BookingSlot[] = [];

  for (let dayOffset = 0; dayOffset < BOOKING_HORIZON_DAYS; dayOffset += 1) {
    const localDay = new Date(Date.UTC(today.year, today.month - 1, today.day + dayOffset));
    const weekday = localDay.getUTCDay();
    if (weekday === 0 || weekday === 6) continue;
    const year = localDay.getUTCFullYear();
    const month = localDay.getUTCMonth() + 1;
    const day = localDay.getUTCDate();

    for (let minuteOfDay = BOOKING_START_HOUR * 60; minuteOfDay + BOOKING_DURATION_MINUTES <= BOOKING_END_HOUR * 60; minuteOfDay += BOOKING_INTERVAL_MINUTES) {
      const start = zonedTimeToUtc(year, month, day, Math.floor(minuteOfDay / 60), minuteOfDay % 60, BOOKING_TIME_ZONE);
      const end = new Date(start.getTime() + duration);
      if (start < earliest) continue;
      const overlaps = busy.some((interval) => start.getTime() < interval.end + buffer && end.getTime() > interval.start - buffer);
      if (!overlaps) slots.push({ start: start.toISOString(), end: end.toISOString() });
    }
  }

  return slots;
}

// A slot-derived event ID makes Google Calendar the final concurrency lock: two
// visitors cannot confirm the same start time during the small free/busy race window.
const eventIdFor = (start: string) => `bma${createHash('sha256').update(new Date(start).toISOString()).digest('hex').slice(0, 40)}`;

function assertEventOwnership(event: GoogleEvent, requestId: string) {
  if (event.extendedProperties?.private?.requestId !== requestId) throw new BookingSlotConflictError();
  return event;
}

function eventDescription(request: BookingRequest, meetingLine?: string) {
  const lines = [
    'BMAsia website demo booking',
    '',
    `Contact: ${request.name}`,
    `Company: ${request.company}`,
    request.notes ? `Topics: ${request.notes}` : '',
    meetingLine || '',
  ];
  return lines.filter(Boolean).join('\n');
}

async function getGoogleEvent(eventId: string) {
  const calendarId = process.env.GOOGLE_BOOKING_CALENDAR_ID || 'primary';
  const response = await googleCalendarFetch(`/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(eventId)}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Google Calendar event lookup failed with ${response.status}`);
  return response.json() as Promise<GoogleEvent>;
}

async function insertGoogleEvent(request: BookingRequest, options: { reserveOnly?: boolean; meet?: boolean; eventId: string }) {
  const calendarId = process.env.GOOGLE_BOOKING_CALENDAR_ID || 'primary';
  const start = new Date(request.start);
  const end = new Date(start.getTime() + BOOKING_DURATION_MINUTES * 60 * 1000);
  const query = new URLSearchParams({ sendUpdates: options.reserveOnly ? 'none' : 'all' });
  if (options.meet) query.set('conferenceDataVersion', '1');
  const response = await googleCalendarFetch(`/calendars/${encodeURIComponent(calendarId)}/events?${query}`, {
    method: 'POST',
    body: JSON.stringify({
      id: options.eventId,
      summary: options.reserveOnly ? 'BMAsia demo — reserving meeting link' : `BMAsia demo — ${request.company}`,
      description: eventDescription(request),
      start: { dateTime: start.toISOString(), timeZone: BOOKING_TIME_ZONE },
      end: { dateTime: end.toISOString(), timeZone: BOOKING_TIME_ZONE },
      attendees: options.reserveOnly ? undefined : [{ email: request.email, displayName: request.name }],
      guestsCanInviteOthers: false,
      guestsCanModify: false,
      extendedProperties: { private: { source: 'bmasiamusic.com', requestId: request.requestId, provider: request.provider } },
      conferenceData: options.meet ? { createRequest: { requestId: request.requestId, conferenceSolutionKey: { type: 'hangoutsMeet' } } } : undefined,
    }),
  });
  if (response.status === 409) return getGoogleEvent(options.eventId);
  if (!response.ok) throw new Error(`Google Calendar event creation failed with ${response.status}`);
  return response.json() as Promise<GoogleEvent>;
}

async function patchGoogleEventWithTeams(request: BookingRequest, eventId: string, joinUrl: string) {
  const calendarId = process.env.GOOGLE_BOOKING_CALENDAR_ID || 'primary';
  const response = await googleCalendarFetch(`/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(eventId)}?sendUpdates=all`, {
    method: 'PATCH',
    body: JSON.stringify({
      summary: `BMAsia demo — ${request.company}`,
      description: eventDescription(request, `Microsoft Teams: ${joinUrl}`),
      location: joinUrl,
      attendees: [{ email: request.email, displayName: request.name }],
      extendedProperties: { private: { source: 'bmasiamusic.com', requestId: request.requestId, provider: request.provider } },
    }),
  });
  if (!response.ok) throw new Error(`Google Calendar event update failed with ${response.status}`);
  return response.json() as Promise<GoogleEvent>;
}

async function deleteGoogleEvent(eventId: string) {
  const calendarId = process.env.GOOGLE_BOOKING_CALENDAR_ID || 'primary';
  await googleCalendarFetch(`/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(eventId)}?sendUpdates=none`, { method: 'DELETE' });
}

async function createTeamsMeeting(request: BookingRequest) {
  const organizer = process.env.MICROSOFT_BOOKING_ORGANIZER_ID;
  if (!organizer) throw new Error('Microsoft Teams organizer is not configured');
  const token = await getMicrosoftAccessToken();
  const start = new Date(request.start);
  const end = new Date(start.getTime() + BOOKING_DURATION_MINUTES * 60 * 1000);
  const response = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(organizer)}/onlineMeetings`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      startDateTime: start.toISOString(),
      endDateTime: end.toISOString(),
      subject: `BMAsia demo — ${request.company}`,
    }),
    cache: 'no-store',
    signal: AbortSignal.timeout(12_000),
  });
  if (!response.ok) throw new Error(`Microsoft Teams meeting creation failed with ${response.status}`);
  const payload = await response.json() as { id?: string; joinWebUrl?: string };
  if (!payload.joinWebUrl) throw new Error('Microsoft Teams did not return a join URL');
  return payload;
}

async function deleteTeamsMeeting(meetingId: string) {
  const organizer = process.env.MICROSOFT_BOOKING_ORGANIZER_ID;
  if (!organizer) return;
  const token = await getMicrosoftAccessToken();
  const response = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(organizer)}/onlineMeetings/${encodeURIComponent(meetingId)}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
    signal: AbortSignal.timeout(12_000),
  });
  if (!response.ok && response.status !== 404) throw new Error(`Microsoft Teams meeting cleanup failed with ${response.status}`);
}

export async function createBooking(request: BookingRequest) {
  const eventId = eventIdFor(request.start);
  const existing = await getGoogleEvent(eventId);
  if (existing && existing.status !== 'cancelled') {
    assertEventOwnership(existing, request.requestId);
    if (request.provider === 'google-meet' || existing.location?.startsWith('https://')) {
      return { eventId: existing.id, htmlLink: existing.htmlLink, alreadyExists: true };
    }
  }

  if (request.provider === 'google-meet') {
    const event = await insertGoogleEvent(request, { eventId, meet: true });
    if (!event) throw new Error('Google Calendar did not return an event');
    assertEventOwnership(event, request.requestId);
    return { eventId: event.id, htmlLink: event.htmlLink, alreadyExists: false };
  }

  if (!teamsConfigured()) throw new Error('Microsoft Teams booking is not configured');
  const reservation = await insertGoogleEvent(request, { eventId, reserveOnly: true });
  if (!reservation) throw new Error('Google Calendar did not return a reservation');
  assertEventOwnership(reservation, request.requestId);
  let teamsMeeting: { id?: string; joinWebUrl?: string } | undefined;
  try {
    teamsMeeting = await createTeamsMeeting(request);
    const event = await patchGoogleEventWithTeams(request, eventId, teamsMeeting.joinWebUrl!);
    return { eventId: event.id, htmlLink: event.htmlLink, alreadyExists: false };
  } catch (error) {
    if (teamsMeeting?.id) await deleteTeamsMeeting(teamsMeeting.id).catch(() => undefined);
    await deleteGoogleEvent(eventId).catch(() => undefined);
    throw error;
  }
}
