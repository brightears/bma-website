// Bounded migration: only slide 13 and its translation/narration source change.
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { pricing, narrationFolder } from './pricing-copy.mjs';

export const baseline = '24b6a5438190b9baae25f22ac96d769656a88c9e';
const old = (file) => execFileSync('git', ['show', `${baseline}:${file}`], {maxBuffer: 40e6}).toString();
const saveJson = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
const esc = (s) => s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const marker = '<script type="__bundler/template">';
const sections = (s) => [...s.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g)];
const template = (s) => JSON.parse(s.split(marker)[1].split('</script>')[0]);
const nodes = (s) => [...s.matchAll(/>([^<>]+)</g)].map(m => m[1].trim()).filter(Boolean);
const englishOld = nodes(sections(template(old('public/presentations/beat-breeze.html')))[12][0]);
const replacements = (locale) => ({4:'$15',6:pricing[locale].monthly,8:pricing[locale].self,13:pricing[locale].managed,14:pricing[locale].design,15:pricing[locale].support});

for (const locale of Object.keys(pricing)) {
  const file = `public/presentations/beat-breeze${locale === 'en' ? '' : `-${locale}`}.html`;
  const root = `public/presentations/narration/${narrationFolder(locale)}`;
  const script = JSON.parse(old(`${root}/script.json`));
  script.slides[12].text = pricing[locale].text;
  saveJson(`${root}/script.json`, script);
  const original = old(file);
  function updateSection(section) {
    const before = nodes(section);
    if (before.length !== 20 || before[4] !== '$12') throw new Error(`Unexpected pricing structure: ${locale}`);
    const map = new Map(Object.entries(replacements(locale)).map(([i,v]) => [before[i],v]));
    section = section.replace(/>([^<>]+)</g, (whole, raw) => map.has(raw.trim()) ? `>${raw.replace(raw.trim(),map.get(raw.trim()))}<` : whole);
    // Keep the existing two-card structure so narration highlights remain compatible.
    const monthly = pricing[locale].monthly;
    const afterMonthly = `>${monthly}</div>`;
    if (!section.includes(afterMonthly)) throw new Error(`Monthly node missing: ${locale}`);
    section = section.replace(afterMonthly, `${afterMonthly}<div data-pricing-annual style="font-size:20px;line-height:1.4;margin-top:12px;color:#e6e4e0">${pricing[locale].annual}</div>`);
    // The note stays inside the self-service card, after its three existing benefits.
    const trial = before[9];
    const trialEnd = section.indexOf('</span>', section.indexOf(`>${trial}<`));
    const listEnd = section.indexOf('</div>', section.indexOf('</div>',trialEnd)+6);
    if (trialEnd < 0 || listEnd < 0) throw new Error(`Trial/card structure missing: ${locale}`);
    section = section.slice(0,listEnd+6) + `<div data-pricing-app-updates style="font-size:18px;line-height:1.4;color:#aaa;margin-top:18px">${pricing[locale].updates}</div>` + section.slice(listEnd+6);
    return section.replace(/data-speaker-notes="[^"]*"/, `data-speaker-notes="${esc(script.slides[12].text)}"`);
  }
  const unpacked = template(original);
  const updated = unpacked.replace(sections(unpacked)[12][0], updateSection(sections(unpacked)[12][0]));
  const start = original.indexOf(marker) + marker.length;
  const end = original.indexOf('</script>',start);
  let output = original.slice(0,start) + JSON.stringify(updated).replaceAll('</script', '<\\/script') + original.slice(end);
  // The inert layout-guard source mirrors the real rendered section.
  const guard = output.match(/<template id="[^"]*layout-guard-source"[\s\S]*?<\/template>/)?.[0];
  if (!guard || sections(guard).length !== 15) throw new Error(`Layout guard missing: ${locale}`);
  output = output.replace(guard, guard.replace(sections(guard)[12][0], updateSection(sections(guard)[12][0])));
  fs.writeFileSync(file, output);

  if (locale !== 'en' && locale !== 'th') {
    const copy = JSON.parse(old(`${root}/copy.json`));
    for (const [i,value] of Object.entries(replacements(locale))) {
      delete copy[englishOld[i]];
      copy[replacements('en')[i]] = value;
    }
    for (const key of ['annual','updates']) copy[pricing.en[key]] = pricing[locale][key];
    saveJson(`${root}/copy.json`, copy);
  }
  console.log(`${locale}: updated only pricing slide and narration source`);
}
