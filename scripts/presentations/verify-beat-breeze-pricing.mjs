import assert from 'node:assert/strict';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { pricing, narrationFolder } from './pricing-copy.mjs';
const base='63216976dc06a479f9f216f12c5b5f0d3aacdf8f';
const old=p=>execFileSync('git',['show',`${base}:${p}`],{maxBuffer:40e6}).toString();
const read=p=>fs.readFileSync(p,'utf8');
const hash=x=>createHash('sha256').update(x).digest('hex');
const sections=s=>[...s.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g)].map(m=>m[0]);
const unpack=s=>JSON.parse(s.split('<script type="__bundler/template">')[1].split('</script>')[0]);
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
let retained=0;
for(const l of Object.keys(pricing)){
  const root=`public/presentations/narration/${narrationFolder(l)}`;
  const file=`public/presentations/beat-breeze${l==='en'?'':`-${l}`}.html`;
  const html=read(file), deck=sections(unpack(html)), before=sections(unpack(old(file)));
  const guard=sections(html.match(/<template id="[^"]*layout-guard-source"[\s\S]*?<\/template>/)[0]);
  const script=JSON.parse(read(`${root}/script.json`)), originalScript=JSON.parse(old(`${root}/script.json`));
  const m=JSON.parse(read(`${root}/manifest.json`)), prior=JSON.parse(old(`${root}/manifest.json`));
  assert.equal(deck.length,15);assert.equal(guard.length,15);assert.equal(m.slides.length,15);
  for(const key of ['monthly','annual','self','managed','design','support','updates'])for(const surface of [deck[12],guard[12]])assert.ok(surface.includes(`>${pricing[l][key]}<`),`${l}: missing ${key}`);
  assert.ok(deck[12].includes('>$15<') && deck[12].includes('>$260<'));
  assert.ok(!deck[12].includes('$12') && !deck[12].includes('399'));
  assert.ok(deck[12].includes(`data-speaker-notes="${esc(pricing[l].text)}"`));
  assert.equal(script.slides[12].text,pricing[l].text);
  assert.ok(read('next.config.js').includes("source: '/presentations/:path*'") && read('next.config.js').includes('noindex'));
  for(let i=0;i<15;i++){
    assert.equal(m.slides[i].text,script.slides[i].text);
    assert.equal(hash(fs.readFileSync(`${root}/${m.slides[i].src}`)),m.slides[i].audioSha256);
    if(i!==12 || l==='th'){assert.equal(deck[i],before[i],`${l}: unexpected slide ${i+1} visual change`);assert.deepEqual(script.slides[i],originalScript.slides[i]);assert.deepEqual(m.slides[i],prior.slides[i]);retained++;}
  }
  if(l==='th'){
    assert.equal(html,old(file),'Thai HTML must remain byte-identical');
    assert.equal(read(`${root}/script.json`),old(`${root}/script.json`));
    assert.equal(read(`${root}/controller.js`),old(`${root}/controller.js`));
    const expected={...prior,source:{...prior.source,englishDeckSha256:m.source.englishDeckSha256}};
    assert.deepEqual(m,expected,'Only Thai English-source provenance may change');
  }else{
    const noBaht=/฿|\bTHB\b|\bbaht\b|泰铢|바트|バーツ|تايلاند/iu;
    assert.ok(!noBaht.test(deck.join('')) && !noBaht.test(JSON.stringify(script.slides)),`${l}: THB remains`);
    assert.notEqual(m.slides[12].audioSha256,prior.slides[12].audioSha256);
    assert.deepEqual(m.qualityAssurance.pricingUpdate.amounts,{monthly:{USD:15},annualSelfService:{USD:150},annualManaged:{USD:260}});
  }
  for(const[k,p]of Object.entries(m.source))if(k.endsWith('Path'))assert.equal(hash(fs.readFileSync(p)),m.source[k.replace(/Path$/,'Sha256')]);
  assert.equal(m.generation.verifiedCarryForwardSlideCount,14);
  assert.deepEqual(m.generation.updatedSlideIds,['13-pricing']);
  assert.equal(m.qualityAssurance.pricingUpdate.managedAnnualOnly,true);
  assert.equal(m.qualityAssurance.pricingUpdate.appUpdatesInEveryPlan,true);
  assert.ok(m.qualityAssurance.transcription.targetedUpdates[0].pass);
  if(fs.existsSync(`${root}/controller.js`))assert.ok(read(`${root}/controller.js`).includes(m.slides[12].src));
  if(l!=='en'&&l!=='th'){const copy=JSON.parse(read(`${root}/copy.json`));for(const key of ['monthly','annual','self','managed','design','support','updates'])assert.equal(copy[pricing.en[key]],pricing[l][key]);}
  console.log(`PASS ${l}: new prices, narration, source hashes, fallback, guard copy and unchanged other slides`);
}
assert.equal(retained,127);
assert.equal(hash(fs.readFileSync('public/presentations/soundtrack.html')),hash(Buffer.from(old('public/presentations/soundtrack.html'))));
console.log('PASS: eight USD-only replacement clips; 127 clips and visual slides unchanged, including all of Thai; Soundtrack untouched.');
