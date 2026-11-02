import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const code=process.argv.find(x=>x.startsWith('--locale='))?.slice(9);
const dirs={th:'beat-breeze-voice-preview-th',zh:'beat-breeze-zh',vi:'beat-breeze-vi',id:'beat-breeze-id',ms:'beat-breeze-ms',ko:'beat-breeze-ko',ja:'beat-breeze-ja',ar:'beat-breeze-ar'};
if(!dirs[code])throw Error('Choose an approved locale');
const release=process.argv.includes('--release');
const read=p=>fs.readFileSync(p,'utf8'),hash=x=>createHash('sha256').update(x).digest('hex');
const baseline=p=>execFileSync('git',['show',`5797ea7c5e66307c8b0ca4291a4a0c59edd1bfc5:${p}`],{encoding:'utf8',maxBuffer:12e6});
const data=JSON.parse(read(`scripts/presentations/radio-locales/${code}.json`));
const root='public/presentations',oldRoot=`${root}/narration/${dirs[code]}`,out=`${root}/narration/beat-breeze-radio-${code}`;
const controllerDir=['ko','ja','ar'].includes(code)?'beat-breeze-localized':dirs[code];
const work=`tmp/radio-localized/${code}`;fs.mkdirSync(work,{recursive:true});
const base=baseline(`${root}/beat-breeze-${code}.html`),english=read(`${root}/beat-breeze.html`);
function unpack(h){const k='<script type="__bundler/template">',a=h.indexOf(k)+k.length,b=h.indexOf('</script>',a);return {a,b,t:JSON.parse(h.slice(a,b))};}
const packed=unpack(base),en=unpack(english);
const sections=t=>[...t.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g)].map(x=>x[0]);
let ss=sections(packed.t),es=sections(en.t);
if(ss.length!==15||es.length!==17)throw Error('Unexpected baseline slide count');
const old=JSON.parse(baseline(`${oldRoot}/manifest.json`));
const script=JSON.parse(baseline(`${oldRoot}/script.json`));
const replace=(s,a,b)=>{if(!s.includes(a))throw Error(`Missing ${code} text: ${a}`);return s.replace(a,b);};
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const visible=s=>[...s.matchAll(/>([^<>]+)</g)].map(m=>m[1].trim()).filter(Boolean);
function replaceNode(s,index,value){let n=0,found=false;const result=s.replace(/>([^<>]+)</g,(m,text)=>{if(!text.trim())return m;if(n++!==index)return m;found=true;return `>${esc(value)}<`;});if(!found)throw Error('Missing text node');return result;}
ss=ss.map(s=>s.replace(/ data-speaker-notes="[^"]*"/,''));
ss[1]=replaceNode(ss[1],2,data.spot[0]);ss[1]=replaceNode(ss[1],13,data.spot[1]);
let v=visible(ss[11]);ss[11]=replaceNode(ss[11],v.length-2,data.spot[2]);ss[11]=replaceNode(ss[11],v.length-1,data.spot[3]);
ss[12]=replaceNode(ss[12],8,data.spot[4]);ss[12]=replaceNode(ss[12],16,data.spot[5]);
const enterprise=ss[12].match(/<div style="display:flex;align-items:center;gap:20px;">\s*<span[^>]*>[^<]*<\/span>\s*<span[^>]*>[^<]*PromptPay[^<]*<\/span>\s*<\/div>/)?.[0];
if(!enterprise)throw Error('Missing payment-method footer');
ss[12]=replace(ss[12],enterprise,`<p data-radio-credit-note style="flex:1;font-size:18px;line-height:1.4;color:#aaa;margin:0;">${esc(data.spot[6])}</p>`);
ss[14]=replaceNode(ss[14],4,data.spot[7]);ss[14]=replaceNode(ss[14],5,'');
const sans=ss[0].match(/font-family:([^;]+);/)?.[1]||"'DM Sans',sans-serif";
const serif=ss[1].match(/<h2[^>]*font-family:([^;]+);/)?.[1]||"'Libre Caslon Text',serif";
function radio(i,strings,label){
 let s=es[i].replace(/ data-speaker-notes="[^"]*"/,'');let n=0;
 s=s.replace(/>([^<>]+)</g,(m,text)=>text.trim()?`>${text.match(/^\s*/)[0]}${esc(strings[n++])}${text.match(/\s*$/)[0]}<`:m);
 if(n!==strings.length)throw Error(`Radio text count ${n} != ${strings.length}`);
 s=s.replace(/data-label="[^"]*"/,`data-label="${esc(label)}"`).replaceAll("'DM Sans',sans-serif",sans).replaceAll("'Libre Caslon Text',serif",serif)
 .replaceAll('font-size:64px;','font-size:56px;').replaceAll('letter-spacing:.2em;','letter-spacing:0;').replaceAll('letter-spacing:-.02em;','letter-spacing:0;')
 .replaceAll('Warm restaurant interior',esc(data.alt));
 if(code==='ar')s=s.replace('data-radio-enter><div','data-radio-enter dir="rtl"><div').replaceAll('data-radio-enter style=','data-radio-enter dir="rtl" style=').replaceAll('border-left:','border-right:').replaceAll('left:-34px','right:-34px').replaceAll('left:-84px','right:-84px');
 return s;
}
ss.splice(8,0,radio(8,data.radioA,data.radioA[0]),radio(9,data.radioB,data.radioB[0]));
let slides=old.slides.map(s=>({...s,src:path.relative(out,path.resolve(oldRoot,s.src))}));
for(const edit of data.insertions){const s=slides.find(s=>s.id===edit.id);for(const [anchor,addition] of edit.before)s.text=replace(s.text,anchor,addition+anchor);}
slides[14].text=data.close;
slides.splice(8,0,{id:'radio-your-station',label:data.radioA[0],text:data.narrationA},{id:'radio-across-locations',label:data.radioB[0],text:data.narrationB});
const ids=['02-one-platform-many-jobs','radio-your-station','radio-across-locations','12-why-beat-breeze','13-pricing','15-close'];
const changed=slides.filter(s=>!old.slides.some(o=>o.id===s.id&&o.text===s.text));
if(changed.length!==6||changed.some((s,i)=>s.id!==ids[i]))throw Error('Translation scope changed');
slides=slides.map((s,i)=>({...s,index:i+1}));
ss=ss.map((s,i)=>s.replace(/ data-screen-label="[^"]*"/,'').replace(/ data-preview-slide-id="[^"]*"/,'').replace('<section ',`<section data-preview-slide-id="${slides[i].id}" data-screen-label="${String(i+1).padStart(2,'0')}" data-speaker-notes="${esc(slides[i].text)}" `));
let t=packed.t;sections(packed.t).forEach((s,i)=>{t=replace(t,s,ss[i+(i>=8?2:0)]+(i===7?ss[8]+ss[9]:''));});
let html=base.slice(0,packed.a)+JSON.stringify(t).replaceAll('</script','<\\/script')+base.slice(packed.b);
html=html.replace(/(<template id="beat-breeze[^"]*layout-guard-source"[^>]*>)[\s\S]*?<\/template>/,(_,open)=>`${open}${ss.join('\n')}</template>`)
 .replaceAll(`./narration/${controllerDir}/controller.js`,`./narration/beat-breeze-radio-${code}/controller.js`)
 .replace(/\.\/narration\/beat-breeze-motion\/controller\.js(?:\?v=[^\"]+)?/,`./narration/beat-breeze-radio-${code}/motion.js?v=2026-11-02-radio`)
 .replace(/(beat-breeze-language-selector\/controller\.js)(?:\?v=[^\"]+)?/,'$1?v=2026-11-02-radio-all-1').replace(/[ \t]+$/gm,'');
const prepared={...script,presentation:`beat-breeze-radio-${code}`,status:'approved-for-six-localized-radio-clips',voice:old.voice,slides:slides.map(({id,label,text,index})=>({id,label,text,index}))};
fs.writeFileSync(`${work}/script.json`,JSON.stringify(prepared,null,2)+'\n');fs.writeFileSync(`${work}/deck.html`,html);
if(!release){console.log(`${code}: prepared 17 slides and six narration updates`);process.exit(0);}
const qa=JSON.parse(read(`docs/beat-breeze-radio-${code}-20261102-qa.json`));
fs.mkdirSync(out,{recursive:true});
for(let i=0;i<slides.length;i++){
 const s=slides[i];if(!ids.includes(s.id))continue;
 const report=qa.clips.find(r=>r.slide.id===s.id&&r.expectedText===s.text&&r.semanticReview==='passed');
 if(!report)throw Error(`Missing approved QA: ${code} ${s.id}`);
 const bytes=fs.readFileSync(report.audioFile);if(hash(bytes)!==report.slide.audioSha256)throw Error('Audio hash mismatch');
 const target=path.join(out,report.slide.src);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,bytes);slides[i]={...report.slide,index:i+1};
}
const manifest={...old,version:4,presentation:prepared.presentation,releaseId:'2026-11-02-radio-all-1',status:'official',publicationStatus:'Official 17-slide Radio presentation. AI transcript QA and assistant review; native-speaker feedback remains welcome.',ready:true,preview:false,complete:true,generatedAt:'2026-11-02',slides,coverage:{...old.coverage,slideIndexes:slides.map(s=>s.index)},generation:{mode:'six-targeted-radio-clips',updatedSlideIds:ids,verifiedCarryForwardSlideCount:11},totalDurationSeconds:slides.reduce((n,s)=>n+s.durationSeconds,0),source:{...old.source,englishDeckSha256:hash(english),officialDeckSha256:hash(html)},qualityAssurance:{record:`docs/beat-breeze-radio-${code}-20261102-qa.json`,reviewedClipCount:6,unchangedClipCount:11}};
let controller=read(`${root}/narration/${controllerDir}/controller.js`).replaceAll(`${controllerDir}/controller.js`,`beat-breeze-radio-${code}/controller.js`).replace('`../beat-breeze-${LOCALE}/manifest.json`','"manifest.json"').replace(/const LOCAL_FALLBACK_MANIFEST = [\s\S]*?;\n/,`const LOCAL_FALLBACK_MANIFEST = ${JSON.stringify(manifest)};\n`);
if(!controller.includes(JSON.stringify(manifest)))throw Error('Controller fallback missing');
let motion=read(`${root}/narration/beat-breeze-radio-en/motion.js`)
 .replace('const CANONICAL_LABELS = {',`const CANONICAL_LABELS = {${JSON.stringify(data.radioA[0])}:"AI Radio",${JSON.stringify(data.radioB[0])}:"Radio across your locations",`)
 .replace('ENGLISH_CUE_TIMELINES[label]=cues;','for (const timelines of Object.values(CUE_TIMELINES_BY_LOCALE)) timelines[label]=cues;');
for(const [name,value]of Object.entries({'controller.js':controller,'motion.js':motion,'manifest.json':JSON.stringify(manifest,null,2)+'\n','script.json':JSON.stringify({...prepared,status:'official'},null,2)+'\n'}))fs.writeFileSync(`${out}/${name}`,value);
fs.writeFileSync(`${root}/beat-breeze-${code}.html`,html);
console.log(`${code}: released 17 slides, six reviewed clips and 11 unchanged clips`);
