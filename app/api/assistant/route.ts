import { NextRequest, NextResponse } from 'next/server';
import { locales, type Locale } from '@/lib/i18n-config';
import { checkRateLimitWithPolicy, getClientIP } from '@/lib/rate-limiter';
import { ASSISTANT_INSTRUCTIONS, assistantActions, guidedReply, shouldEscalate, type AssistantTurn } from '@/lib/site-assistant';

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

async function openAIReply(message: string, history: AssistantTurn[], pagePath: string, locale: Locale, sessionId: string, apiKey: string) {
  if (await isFlagged(message, apiKey)) return guidedReply('', locale);
  const recentConversation = history.slice(-8)
    .map((turn) => `${turn.role === 'agent' ? 'BMAsia guide' : 'Visitor'}: ${clean(turn.text, 1_200)}`)
    .join('\n');
  const input = `${recentConversation ? `Recent conversation:\n${recentConversation}\n\n` : ''}Current page: ${pagePath || '/'}\nVisitor locale: ${locale}\nVisitor question: ${message}`;
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
    const body = await request.json() as { message?: unknown; locale?: unknown; pagePath?: unknown; history?: unknown; sessionId?: unknown };
    const message = clean(body.message, 1_200);
    const requestedLocale = clean(body.locale, 8) as Locale;
    const locale = locales.includes(requestedLocale) ? requestedLocale : 'en';
    const pagePath = clean(body.pagePath, 240);
    const sessionId = clean(body.sessionId, 100) || `anonymous-${crypto.randomUUID()}`;
    const history = Array.isArray(body.history)
      ? body.history.slice(-8).map((turn) => {
        const item = turn as Partial<AssistantTurn>;
        return { role: item.role === 'agent' ? 'agent' as const : 'user' as const, text: clean(item.text, 1_200) };
      }).filter((turn) => turn.text)
      : [];
    if (!message) return NextResponse.json({ error: 'Message is required.' }, { status: 400 });

    let reply = guidedReply(message, locale);
    let mode: 'guided' | 'ai' = 'guided';
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey) {
      try {
        reply = await openAIReply(message, history, pagePath, locale, sessionId, apiKey);
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
