import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const read=p=>fs.readFileSync(path.join(repo,p),'utf8');
const hash=b=>createHash('sha256').update(b).digest('hex');
const root='public/presentations/narration/beat-breeze-radio-preview';
const html=read('public/presentations/beat-breeze-radio-preview.html');
const marker='<script type="__bundler/template">',a=html.indexOf(marker)+marker.length;
const template=JSON.parse(html.slice(a,html.indexOf('</script>',a)));
const sections=[...template.matchAll(/<section\b[^>]*data-label="([^"]+)"[^>]*>[\s\S]*?<\/section>/g)];
assert.equal(sections.length,17);
assert.equal(sections[8][1],'AI Radio');assert.equal(sections[9][1],'Radio across your locations');
assert.ok(template.includes('<title>Beat Breeze — Radio Preview (English)</title>'));
const comparisonBody=sections[13][0].replace(/^<section\b[^>]*>/,'');
assert.ok(comparisonBody.includes('Now with AI Radio: your brand’s own hosted station'));
assert.ok(!sections[8][0].replace(/^<section\b[^>]*>/,'').includes('Hear a sample hour before putting your station on air.'));
assert.ok(!sections[9][0].replace(/^<section\b[^>]*>/,'').includes('Radio requires a paid plan and uses AI credits.'));
const script=JSON.parse(read(`${root}/script.json`)),manifest=JSON.parse(read(`${root}/manifest.json`));
const orig=JSON.parse(read('public/presentations/narration/beat-breeze-voice-preview/manifest.json'));
assert.equal(script.slides.length,17);assert.equal(manifest.slides.length,17);
assert.ok(html.includes('./narration/beat-breeze-radio-preview/controller.js?'));
assert.ok(!html.includes('<script src="./narration/beat-breeze-voice-preview/controller.js'));
assert.ok(!html.includes('<script src="./narration/beat-breeze-language-selector/'));
const guard=html.match(/<template id="beat-breeze-layout-guard-source"[^>]*>([\s\S]*?)<\/template>/)?.[1];
assert.ok(guard);assert.equal([...guard.matchAll(/<section\b/g)].length,17);
let reused=0,replaced=0,pending=0;
for(let i=0;i<17;i++){
 const s=manifest.slides[i],copy=script.slides[i];assert.equal(s.index,i+1);assert.equal(s.id,copy.id);assert.equal(s.text,copy.text);
 assert.ok(sections[i][0].includes(`data-preview-slide-id="${s.id}"`));
 const old=orig.slides.find(o=>o.id===s.id);
 if(!s.src){pending++;assert.ok(process.argv.includes('--draft'),'Missing approved audio');continue;}
 const file=path.join(repo,root,s.src),bytes=fs.readFileSync(file);assert.equal(hash(bytes),s.audioSha256);
 execFileSync('ffmpeg',['-v','error','-i',file,'-f','null','-'],{stdio:'pipe'});
 if(old?.text===s.text){reused++;assert.equal(old.audioSha256,s.audioSha256);}
 else{replaced++;if(old)assert.notEqual(old.audioSha256,s.audioSha256);}
}
assert.equal(reused,11);assert.equal(replaced+pending,6);
assert.ok(sections[14][0].includes('card required'));assert.ok(sections[14][0].includes('no card needed'));
assert.ok(sections[14][0].includes('USD 150'));assert.ok(sections[14][0].includes('$260'));
assert.ok(sections[14][0].includes('BMAsia manages your music and Radio station'));
assert.ok(sections[14][0].includes('Additional AI generation credits are charged separately.'));
assert.ok(!sections[14][0].includes('PromptPay'));
assert.ok(!sections[14][0].includes('invoicing by bank transfer'));
assert.ok(!sections[14][0].includes('>Enterprise</span>'));
assert.ok(!sections[8][0].includes('฿'));assert.ok(!sections[9][0].includes('฿'));
assert.equal(hash(read('public/presentations/beat-breeze.html')),manifest.source.englishDeckSha256);
assert.equal(hash(html),manifest.source.previewDeckSha256);
for(const f of ['controller.js','motion.js','preview.js'])execFileSync(process.execPath,['--check',path.join(repo,root,f)]);
// No tracked official file may change; all preview assets have their own paths.
const modified=execFileSync('git',['diff','--name-only','c30735a93c81656ded68879023abe6187ef99a8a'],{cwd:repo,encoding:'utf8'}).trim().split('\n').filter(Boolean);
const scoped=p=>p==='public/presentations/beat-breeze-radio-preview.html'||p.startsWith('public/presentations/narration/beat-breeze-radio-preview/')||/^scripts\/presentations\/(?:build-beat-breeze-radio-preview|generate-radio-preview-narration|review-radio-preview-audio|radio-preview-copy|verify-radio-preview)\.mjs$/.test(p)||p.startsWith('docs/beat-breeze-radio-preview-20261102');
assert.deepEqual(modified.filter(p=>!scoped(p)),[]);
console.log(`PASS: 17 matching sections/scripts/audio entries; ${reused} reused clips; ${replaced} replacement clips; ${pending} pending; official tracked files unchanged.`);
