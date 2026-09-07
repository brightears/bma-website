import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';

// Run in Render; database and email are mocked, with no production side effects.
const records = [];
let notifications = 0;
let failEmail = false;
let failDatabase = false;
const imports = {
  '@/lib/prisma': { prisma: { inquiry: { create: async ({ data }) => {
    if (failDatabase) throw new Error('database unavailable');
    records.push(data);
    return { ...data, id: 'test-inquiry' };
  } } } },
  '@/lib/email': { sendInquiryNotification: async (data) => {
    assert.equal(records.at(-1).email, data.email, 'Save before notification');
    notifications += 1;
    if (failEmail) throw new Error('email unavailable');
  } },
  '@/lib/i18n-config': { locales: ['en', 'th', 'vi', 'ms', 'id', 'ko', 'ja', 'zh'] },
};
const module = { exports: {} };
new Function('require', 'module', 'exports', 'console', ts.transpileModule(
  fs.readFileSync('lib/chat-inquiry.ts', 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText)((id) => {
  assert.ok(imports[id], `Unexpected dependency: ${id}`);
  return imports[id];
}, module, module.exports, { error() {} });
const { saveChatInquiry } = module.exports;
await saveChatInquiry({ email: 'test@example.com', conversation: 'TEST transcript', locale: 'th', kind: 'follow-up' });
assert.equal(records[0].name, 'Website visitor');
assert.match(records[0].message, /Website chat follow-up.*Language: th.*TEST transcript/s);
assert.equal(notifications, 1);
console.log('PASS chat follow-up saved before email, including language and transcript');
failEmail = true;
await saveChatInquiry({ email: 'test@example.com', conversation: 'TEST summary', locale: 'invalid', kind: 'lead' });
assert.equal(records.length, 2);
assert.match(records[1].message, /Website chat lead.*Language: en/s);
console.log('PASS chat lead remains saved if email fails');
failDatabase = true;
await assert.rejects(saveChatInquiry({ email: 'test@example.com', conversation: '', kind: 'follow-up' }), /database unavailable/);
assert.equal(notifications, 2);
console.log('PASS database failure does not report a saved inquiry or send notification');
