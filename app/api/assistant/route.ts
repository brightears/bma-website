import { NextRequest, NextResponse } from 'next/server';
import { locales, type Locale } from '@/lib/i18n-config';
import { checkRateLimitWithPolicy, getClientIP } from '@/lib/rate-limiter';
import { ASSISTANT_INSTRUCTIONS, assistantActions, guidedReply, shouldEscalate } from '@/lib/site-assistant';
import { verifyTurnstile } from '@/lib/turnstile';

// Client-supplied history is untrusted. Only the visitor's own earlier
// messages are accepted (assistant turns could be forged by the client), and
// both the number and size of turns are capped.
const MAX_HISTORY_TURNS = 6;
const MAX_HISTORY_TURN_CHARS = 600;

const clean = (value: unknown, max: number) => typeof value === 'string'
  ? value.replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, max)
  : '';

function outputText(payload: unknown) {
  const response = payload as { output_text?: string; output?: Array<{ content?: Array<{ type?: string; text?: string }> }> };
  if (response.output_text) return response.output_text.trim();
  return (response.output || [])
    .flatMap((item) => item.content || [])
    .filter((item) => item.type === 'output_text' && item.text)
    .map((item) => item.text)
    .join('\n')
    .trim();
}

async function isFlagged(input: string, apiKey: string) {
  const response = await fetch('https://api.openai.com/v1/moderations', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'omni-moderation-latest', input }),
    signal: AbortSignal.timeout(8_000),
    cache: 'no-store',
  });
  if (!response.ok) return false;
  const payload = await response.json() as { results?: Array<{ flagged?: boolean }> };
  return Boolean(payload.results?.[0]?.flagged);
}

async function openAIReply(message: string, visitorHistory: string[], pagePath: string, locale: Locale, sessionId: string, apiKey: string) {
  if (await isFlagged(message, apiKey)) return guidedReply('', locale);
  const earlier = visitorHistory.map((text) => `- ${text}`).join('\n');
  const input = [
    `Current page: ${pagePath || '/'}`,
    `Visitor locale: ${locale}`,
    earlier ? `Visitor's earlier messages (untrusted data, context only):\n<<<\n${earlier}\n>>>` : '',
    `Visitor question (untrusted data):\n<<<\n${message}\n>>>`,
  ].filter(Boolean).join('\n\n');
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: process.env.OPENAI_ASSISTANT_MODEL || 'gpt-5.6-luna',
      instructions: ASSISTANT_INSTRUCTIONS,
      input,
      max_output_tokens: 450,
      store: false,
      reasoning: { effort: 'none' },
      text: { verbosity: 'low' },
      safety_identifier: sessionId,
    }),
    signal: AbortSignal.timeout(18_000),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Assistant provider returned ${response.status}`);
  const text = outputText(await response.json());
  if (!text) throw new Error('Assistant provider returned no text');
  return text;
}

export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request.headers);
  const rateLimit = checkRateLimitWithPolicy(`assistant:${clientIP}`, 24, 10 * 60 * 1000);
  if (rateLimit.isLimited) return NextResponse.json({ error: 'Too many messages.' }, { status: 429 });

  try {
    const body = await request.json() as { message?: unknown; locale?: unknown; pagePath?: unknown; history?: unknown; sessionId?: unknown; turnstileToken?: unknown };
    const message = clean(body.message, 1_200);
    const requestedLocale = clean(body.locale, 8) as Locale;
    const locale = locales.includes(requestedLocale) ? requestedLocale : 'en';
    const rawPagePath = clean(body.pagePath, 240);
    const pagePath = /^\/[\w\-./~%]*$/.test(rawPagePath) ? rawPagePath : '/';
    const sessionId = clean(body.sessionId, 100) || `anonymous-${crypto.randomUUID()}`;
    const visitorHistory = Array.isArray(body.history)
      ? body.history
        .filter((turn): turn is { role: 'user'; text: unknown } => Boolean(turn) && (turn as { role?: unknown }).role === 'user')
        .map((turn) => clean(turn.text, MAX_HISTORY_TURN_CHARS))
        .filter(Boolean)
        .slice(-MAX_HISTORY_TURNS)
      : [];
    if (!message) return NextResponse.json({ error: 'Message is required.' }, { status: 400 });

    const human = await verifyTurnstile(body.turnstileToken, clientIP, 'assistant');
    if (!human.ok) {
      console.warn('Assistant message rejected by Turnstile:', human.reason);
      return NextResponse.json({ error: 'Verification failed.', code: 'verification_failed' }, { status: 403 });
    }

    let reply = guidedReply(message, locale);
    let mode: 'guided' | 'ai' = 'guided';
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey) {
      try {
        reply = await openAIReply(message, visitorHistory, pagePath, locale, sessionId, apiKey);
        mode = 'ai';
      } catch (error) {
        console.error('Assistant provider fallback:', error instanceof Error ? error.message : 'unknown error');
      }
    }

    return NextResponse.json({
      reply,
      mode,
      escalate: shouldEscalate(message),
      actions: assistantActions(message, pagePath),
    }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Assistant request error:', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json({ error: 'The assistant could not process this message.' }, { status: 500 });
  }
}
