// Static release integrity only; does not start or build the website application.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const locales=process.argv.includes('--english-only')?['en']:['en','th','zh','vi','id','ms','ko','ja','ar'];
const oldDirs={en:'beat-breeze-radio-preview',th:'beat-breeze-voice-preview-th',zh:'beat-breeze-zh',vi:'beat-breeze-vi',id:'beat-breeze-id',ms:'beat-breeze-ms',ko:'beat-breeze-ko',ja:'beat-breeze-ja',ar:'beat-breeze-ar'};
const hash=b=>createHash('sha256').update(b).digest('hex');
const read=p=>fs.readFileSync(p,'utf8');
for(const c of locales){
 const root=`public/presentations/narration/beat-breeze-radio-${c}`;
 const html=read(`public/presentations/beat-breeze${c==='en'?'':'-'+c}.html`),m=JSON.parse(read(`${root}/manifest.json`)),script=JSON.parse(read(`${root}/script.json`));
 const k='<script type="__bundler/template">',a=html.indexOf(k)+k.length,t=JSON.parse(html.slice(a,html.indexOf('</script>',a))),ss=[...t.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g)].map(x=>x[0]);
 assert.equal(ss.length,17);assert.equal(m.slides.length,17);assert.equal(script.slides.length,17);assert.equal(m.ready,true);assert.equal(m.preview,false);
 assert.equal(m.source.officialDeckSha256,hash(html));
 assert.ok(html.includes(`beat-breeze-radio-${c}/controller.js`));
 assert.ok(html.includes(`beat-breeze-radio-${c}/motion.js`));
 if(['ko','ja','ar'].includes(c)){const controller=read(`${root}/controller.js`);assert.ok(controller.includes('const COPY ='));assert.ok(!controller.includes('`../beat-breeze-${LOCALE}/manifest.json`'));}
 assert.ok(html.includes('beat-breeze-language-selector/controller.js'));assert.ok(!html.includes('beat-breeze-radio-preview/preview.js'));
 const guard=html.match(/<template id="beat-breeze[^"]*layout-guard-source"[^>]*>([\s\S]*?)<\/template>/)?.[1];assert.equal([...guard.matchAll(/<section\b/g)].length,17);
 const original=JSON.parse(read(`public/presentations/narration/${oldDirs[c]}/manifest.json`));let same=0;
 for(let i=0;i<17;i++){
  const s=m.slides[i];assert.equal(s.index,i+1);assert.equal(s.id,script.slides[i].id);assert.equal(s.text,script.slides[i].text);assert.ok(ss[i].includes(`data-preview-slide-id="${s.id}"`));
  assert.equal(hash(fs.readFileSync(path.join(root,s.src))),s.audioSha256);
  if(original.slides.find(o=>o.id===s.id)?.audioSha256===s.audioSha256)same++;
 }
 assert.equal(same,c==='en'?17:11);
 assert.ok(!ss[14].includes('PromptPay'));assert.ok(ss[14].includes('data-radio-credit-note'));
 if(c!=='th')assert.ok(!ss[14].includes('฿'));
 else for(const price of ['฿499','฿4,990','฿9,000'])assert.ok(ss[14].includes(price));
 for(const file of ['controller.js','motion.js'])execFileSync(process.execPath,['--check',`${root}/${file}`]);
 const fallback=read(`${root}/controller.js`).match(/const LOCAL_FALLBACK_MANIFEST = ([\s\S]*?);\n/);assert.deepEqual(JSON.parse(fallback[1]),m);
 console.log(`${c}: 17 slides, matching scripts/audio, ${same} unchanged clips; pricing and controls intact`);
}
