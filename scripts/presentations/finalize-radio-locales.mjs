import fs from 'node:fs';
import {createHash} from 'node:crypto';
const locales=['en','th','zh','vi','id','ms','ko','ja','ar'];
const root='public/presentations',version='2026-11-02-radio-all-1';
const read=p=>fs.readFileSync(p,'utf8'),hash=x=>createHash('sha256').update(x).digest('hex');
for(const c of locales){const m=JSON.parse(read(`${root}/narration/beat-breeze-radio-${c}/manifest.json`));if(!m.ready||m.slides.length!==17)throw Error(`Locale not ready: ${c}`);}
const selector=`${root}/narration/beat-breeze-language-selector/controller.js`;
fs.writeFileSync(selector,read(selector).replace(/const VERSION = "[^"]+";/,`const VERSION = "${version}";`).replace('// During rollout the original translations have 15 slides, English has 17.','// All official presentations now share the same 17-slide Radio sequence.').replace(/const RADIO_LOCALES = new Set\([^;]+;/,`const RADIO_LOCALES = new Set(${JSON.stringify(locales)});`));
for(const c of locales){
 const p=`${root}/beat-breeze${c==='en'?'':'-'+c}.html`;
 fs.writeFileSync(p,read(p).replace(/(beat-breeze-language-selector\/controller\.js)(?:\?v=[^\"]+)?/,`$1?v=${version}`).replace(new RegExp(`(beat-breeze-radio-${c}/controller\\.js)(?:\\?v=[^\\"]+)?`),`$1?v=${version}`));
}
const englishHash=hash(read(`${root}/beat-breeze.html`));
for(const c of locales){
 const dir=`${root}/narration/beat-breeze-radio-${c}`,p=`${root}/beat-breeze${c==='en'?'':'-'+c}.html`,m=JSON.parse(read(`${dir}/manifest.json`));
 m.source.officialDeckSha256=hash(read(p));if(c!=='en')m.source.englishDeckSha256=englishHash;
 m.releaseId=version;
 fs.writeFileSync(`${dir}/manifest.json`,JSON.stringify(m,null,2)+'\n');
 fs.writeFileSync(`${dir}/controller.js`,read(`${dir}/controller.js`).replace(/const LOCAL_FALLBACK_MANIFEST = [\s\S]*?;\n/,`const LOCAL_FALLBACK_MANIFEST = ${JSON.stringify(m)};\n`));
}
console.log('All nine language links aligned to the 17-slide Radio sequence.');
