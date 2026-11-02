// Promote the customer-approved 17-slide English preview without regenerating speech.
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
const root='public/presentations';
const from=`${root}/narration/beat-breeze-radio-preview`;
const to=`${root}/narration/beat-breeze-radio-en`;
const version='2026-11-02-radio-official-1';
const read=p=>fs.readFileSync(p,'utf8');
const hash=x=>createHash('sha256').update(x).digest('hex');
fs.mkdirSync(to,{recursive:true});
let html=read(`${root}/beat-breeze-radio-preview.html`)
 .replaceAll('Beat Breeze — Radio Preview (English)','Beat Breeze — Presentation')
 .replaceAll('./narration/beat-breeze-radio-preview/controller.js','./narration/beat-breeze-radio-en/controller.js')
 .replaceAll('./narration/beat-breeze-radio-preview/motion.js','./narration/beat-breeze-radio-en/motion.js')
 .replace(/<script src="\.\/narration\/beat-breeze-radio-preview\/preview\.js[^\"]*" defer><\/script>/,
 `<script src="./narration/beat-breeze-language-selector/controller.js?v=${version}" defer></script>`);
if(!html.includes('beat-breeze-language-selector/controller.js'))throw Error('Missing official language selector');
const manifest=JSON.parse(read(`${from}/manifest.json`));
if(!manifest.ready||manifest.slides.length!==17)throw Error('Preview is not ready');
for(const s of manifest.slides){
 const absolute=path.resolve(from,s.src);
 if(hash(fs.readFileSync(absolute))!==s.audioSha256)throw Error(`Audio changed: ${s.id}`);
 s.src=path.relative(to,absolute);
}
Object.assign(manifest,{presentation:'beat-breeze-radio-en',status:'official',preview:false,releaseId:version,publicationStatus:'Approved English Radio presentation, official release.'});
manifest.source={...manifest.source,officialDeckSha256:hash(html)};
let controller=read(`${from}/controller.js`)
 .replaceAll('beat-breeze-radio-preview/controller.js','beat-breeze-radio-en/controller.js')
 .replaceAll('beat-breeze-radio-preview-invitation-seen-en','beat-breeze-narration-invitation-seen-en')
 .replace(/const LOCAL_FALLBACK_MANIFEST = [\s\S]*?\n  const ICONS =/,`const LOCAL_FALLBACK_MANIFEST = ${JSON.stringify(manifest)};\n\n  const ICONS =`);
const script=JSON.parse(read(`${from}/script.json`));
Object.assign(script,{presentation:'beat-breeze-radio-en',status:'official-approved'});
fs.writeFileSync(`${to}/manifest.json`,JSON.stringify(manifest,null,2)+'\n');
fs.writeFileSync(`${to}/script.json`,JSON.stringify(script,null,2)+'\n');
fs.writeFileSync(`${to}/controller.js`,controller);
fs.copyFileSync(`${from}/motion.js`,`${to}/motion.js`);
fs.writeFileSync(`${root}/beat-breeze.html`,html);
// Refresh the shared selector on the existing translations without changing their copy or audio.
for(const locale of ['th','zh','vi','id','ms','ko','ja','ar']){
 const p=`${root}/beat-breeze-${locale}.html`;
 fs.writeFileSync(p,read(p).replace(/(beat-breeze-language-selector\/controller\.js)(?:\?v=[^\"]+)?/,`$1?v=${version}`));
}
console.log('Promoted approved English: 17 slides; all 17 audio hashes unchanged.');
