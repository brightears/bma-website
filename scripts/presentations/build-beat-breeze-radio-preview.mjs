import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {radioSlides, narrationEdits, RADIO_PREVIEW_PATH, RADIO_PREVIEW_VERSION as VERSION} from './radio-preview-copy.mjs';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const decks = path.join(repo, 'public/presentations');
const base = path.join(decks, 'narration/beat-breeze-voice-preview');
const out = path.join(decks, 'narration/beat-breeze-radio-preview');
fs.mkdirSync(out, {recursive:true});
const read = p => fs.readFileSync(p, 'utf8');
const hash = s => createHash('sha256').update(s).digest('hex');
const esc = s => s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const baseHTML = read(path.join(decks,'beat-breeze.html'));
const originalManifest = JSON.parse(read(path.join(base,'manifest.json')));
const originalScript = JSON.parse(read(path.join(base,'script.json')));
const marker = '<script type="__bundler/template">';
const start = baseHTML.indexOf(marker)+marker.length;
const end = baseHTML.indexOf('</script>',start);
if(start<marker.length || end<0) throw Error('Missing bundled template');
let template = JSON.parse(baseHTML.slice(start,end));
const originalSections = [...template.matchAll(/<section\b[^>]*data-label="([^"]+)"[^>]*>[\s\S]*?<\/section>/g)].map(m=>m[0]);
if(originalSections.length!==15 || originalManifest.slides.length!==15) throw Error('Review changed source deck before building');
const slides = originalManifest.slides.map(s=>({...s, text:narrationEdits[s.label] || s.text}));
slides[12].text = slides[12].text.replace('Both self-service plans include the app’s features,', 'Radio requires a paid plan and uses AI credits. Both self-service plans include the app’s features,');
slides.splice(8,0,...radioSlides);
const changed = slides.filter(s=>!originalManifest.slides.some(o=>o.id===s.id && o.text===s.text));
if(changed.length!==6) throw Error(`Expected six approved scripts; found ${changed.length}`);
const script = {...originalScript, presentation:'beat-breeze-radio-preview', version:3, status:'approved-for-six-english-preview-clips', slides:slides.map(({id,label,text,visualCoverage},i)=>({id,label,text,visualCoverage,index:i+1}))};
fs.writeFileSync(path.join(out,'script.json'),JSON.stringify(script,null,2)+'\n');

const serif = "font-family:'Libre Caslon Text',serif;font-weight:400;letter-spacing:-.02em;";
const mono = "font-family:'Space Grotesk',monospace;text-transform:uppercase;letter-spacing:.2em;";
const accent = 'font-style:italic;background:linear-gradient(100deg,#EFA634,#ECC24F 44%,#5FBF9A);background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;padding:0 .12em;';
const bg = "background-color:#0f0f0f;background-image:linear-gradient(180deg,transparent,#0f0f0f 65%),repeating-linear-gradient(90deg,rgba(255,255,255,.04) 0 1px,transparent 1px 47px);";
const shell = (s,body) => `<section class="slide" data-zone="slide" data-label="${esc(s.label)}" data-layout_box_budget="1920x1080-approved-layout-safe-nav-top-940" data-mechanical_layout_preflight="packed-source-mirror" style="${bg}width:100%;height:100%;box-sizing:border-box;padding:84px 130px 140px;display:flex;flex-direction:column;position:relative;overflow:hidden;color:#fff;font-family:'DM Sans',sans-serif;">${body}</section>`;
const heading = (eyebrow,first,last) => `<header data-radio-enter><div style="${mono}font-size:16px;font-weight:700;color:#EFA634;margin-bottom:22px;">${eyebrow}</div><h2 style="${serif}font-size:64px;line-height:1.12;margin:0;">${first} <span style="${accent}">${last}</span></h2></header>`;
const wave = Array.from({length:48},(_,i)=>`<i style="display:block;flex:1;max-width:6px;height:${12+(Math.sin(i*1.8)+1)*28+(i%4)*9}px;background:${i>15&&i<33?'#EFA634':'rgba(255,255,255,.36)'};"></i>`).join('');
const settings = [
 ['Your host','Voice, personality and languages'],
 ['Your music','Current playlists, your mix or an AI plan'],
 ['Your pace','Choose how often the host speaks'],
].map(([h,p])=>`<div style="border-top:1px solid rgba(255,255,255,.18);padding:22px 0 0;"><h3 style="font-size:25px;font-weight:500;margin:0 0 10px;">${h}</h3><p style="font-size:21px;line-height:1.45;margin:0;color:#aaa;">${p}</p></div>`).join('');
const radioA = shell(radioSlides[0],`${heading('AI Radio','Your brand has a voice.','Give it a station.')}
 <p data-radio-enter style="font-size:27px;line-height:1.45;color:#aaa;margin:22px 0 38px;max-width:1450px;">An AI host brings your music, promotions and brand stories together across your locations.</p>
 <div data-radio-enter style="display:grid;grid-template-columns:1.25fr 1fr;gap:54px;height:350px;">
  <div data-radio-cue="sequence" style="display:flex;flex-direction:column;justify-content:center;padding:22px 20px 22px 0;">
   <div style="${mono}font-size:15px;color:#aaa;">What your customers hear</div>
   <div aria-hidden="true" style="display:flex;gap:8px;align-items:center;height:130px;margin:15px 0 20px;">${wave}</div>
   <div style="display:flex;align-items:center;justify-content:space-between;gap:14px;font-size:24px;line-height:1.3;">
    <span>Music</span><span style="color:#777;">→</span><span>Host welcome</span><span style="color:#777;">→</span><span style="color:#EFA634;">Your offer</span><span style="color:#777;">→</span><span>Music</span>
   </div>
   <p style="font-size:20px;color:#999;margin:27px 0 0;">A short break. Then back to the music.</p>
  </div>
  <div style="position:relative;overflow:hidden;background:#191714;">
   <div role="img" aria-label="Warm restaurant interior" style="position:absolute;inset:0;background-image:linear-gradient(0deg,#151310 8%,rgba(15,15,15,.28)),url(&quot;4e46b516-710b-483c-8f80-1a668f9309ec&quot;);background-size:cover;background-position:center;filter:brightness(1.7);"></div>
   <div style="position:relative;padding:34px 38px;height:100%;box-sizing:border-box;display:flex;flex-direction:column;justify-content:flex-end;">
    <div style="${mono}font-size:13px;color:#EFA634;margin-bottom:18px;">A café moment</div>
    <p style="${serif}font-size:31px;line-height:1.3;margin:0;">“Fresh croissants are out of the oven. You'll find them at the bakery counter.”</p>
    <p style="font-size:16px;color:#aaa;margin:20px 0 0;">Fictional example</p>
   </div>
  </div>
 </div>
 <div data-radio-enter data-radio-cue="choices" style="display:grid;grid-template-columns:1fr 1.35fr 1fr;gap:42px;margin-top:42px;">${settings}</div>`);

const editions = [
 ['Main station','Shared brand stories','Your core station for locations outside a regional edition.'],
 ['Regional edition','Local language and offers','Choose the host language and promotions for this group.'],
 ['Regional edition','Relevant local context','Include weather where it fits the stores receiving it.'],
].map(([k,h,p])=>`<div style="position:relative;padding:24px 30px;border-left:2px solid rgba(239,166,52,.45);background:rgba(255,255,255,.025);"><span aria-hidden="true" style="position:absolute;width:32px;height:1px;background:#555;left:-34px;top:50%;"></span><div style="${mono}font-size:13px;color:#aaa;margin-bottom:7px;">${k}</div><h3 style="font-size:27px;font-weight:500;line-height:1.2;margin:0 0 7px;">${h}</h3><p style="font-size:20px;line-height:1.4;color:#aaa;margin:0;">${p}</p></div>`).join('');
const radioB = shell(radioSlides[1],`${heading('Radio across your locations','One brand.','Room for local differences.')}
 <div data-radio-enter data-radio-cue="editions" style="display:grid;grid-template-columns:.82fr 1.5fr;gap:92px;align-items:center;margin-top:48px;">
  <div style="position:relative;padding:40px 0;">
   <div style="${mono}font-size:14px;color:#EFA634;margin-bottom:24px;">Head office</div>
   <h3 style="${serif}font-size:43px;line-height:1.18;margin:0 0 22px;">Set the station.<br>Keep control.</h3>
   <p style="font-size:23px;line-height:1.5;color:#aaa;margin:0;max-width:400px;">Your brand brief, host, stories and promotions.</p>
  </div>
  <div style="position:relative;display:flex;flex-direction:column;gap:14px;">
   <span aria-hidden="true" style="position:absolute;left:-34px;top:65px;bottom:65px;width:1px;background:#555;"></span>
   <span aria-hidden="true" style="position:absolute;left:-84px;top:50%;width:50px;height:1px;background:#555;"></span>${editions}
  </div>
 </div>
 <div data-radio-enter data-radio-cue="checks" style="border-top:1px solid rgba(255,255,255,.16);margin-top:36px;padding-top:26px;display:grid;grid-template-columns:1fr 1fr;gap:65px;">
  <div><div style="font-size:24px;line-height:1.4;color:#ddd;">Required offer facts stay fixed.</div><p style="font-size:20px;line-height:1.5;color:#aaa;margin:8px 0 0;">Scripts and recorded speech are checked before airing.</p></div>
  <div><div style="font-size:24px;line-height:1.4;color:#ddd;">Preview · Pause · Skip · Check what aired</div><p style="font-size:20px;line-height:1.5;color:#aaa;margin:8px 0 0;">Prepared ahead, with head-office control.</p></div>
 </div>`);

const replace = (text,from,to) => { if(!text.includes(from)) throw Error(`Source copy changed: ${from}`); return text.replace(from,to); };
// Remove old notes before copy replacement: notes can contain the same wording
// as the visible slide and must not consume a visual replacement.
let sections = originalSections.map(s=>s.replace(/ data-speaker-notes="[^"]*"/,''));
sections[1] = replace(sections[1], 'Ten jobs it used to take five tools to do.', 'Built around your venue.');
sections[1] = replace(sections[1], 'Multilingual AI announcements', 'Announcements + your AI Radio station');
sections[11] = replace(sections[11], 'Everyone plays music. Beat Breeze runs your whole in-venue experience —', 'Now with AI Radio: your brand’s own hosted station —');
sections[11] = replace(sections[11], 'and creates the content for it.', 'alongside music, screens and messages.');
sections[12] = replace(sections[12], 'Everything included — music, automations, Compose, Content Studio, TV Channels, announcements', 'Music, automations, Compose, Content Studio, TV Channels, announcements and Radio');
sections[12] = replace(sections[12], 'App updates are included in every plan.', 'App updates are included in every plan.<br><span style="color:#EFA634;">Radio requires a paid plan and uses AI credits.</span>');
sections[14] = replace(sections[14], 'Log in, choose and schedule your music in minutes — then try Compose, Content Studio, or Announcements.', 'Choose your music, create your content — and explore your own Radio station.');
sections[14] = replace(sections[14], 'Already included in your plan.', 'Radio requires a paid plan and uses AI credits.');
sections.splice(8,0,radioA,radioB);
sections = sections.map((s,i)=>{
 s=s.replace(/ data-screen-label="[^"]*"/,'').replace(/ data-speaker-notes="[^"]*"/,'');
 return s.replace('<section ',`<section data-preview-slide-id="${slides[i].id}" data-screen-label="${String(i+1).padStart(2,'0')}" data-speaker-notes="${esc(slides[i].text)}" `);
});
template = template.replace(originalSections.join(''), sections.join(''));
// Sections have whitespace separators in some source revisions.
if(!template.includes('data-label="AI Radio"')) {
 template = JSON.parse(baseHTML.slice(start,end));
 originalSections.forEach((s,i)=>{template=template.replace(s,sections[i+(i>=8?2:0)]+(i===7?sections[8]+sections[9]:''));});
}
if([...template.matchAll(/<section\b/g)].length!==17) throw Error('Preview must contain 17 sections');
template=template.replace(/<title>[^<]+<\/title>/,'<title>Beat Breeze — Radio Preview (English)</title>');
const stripGuard = s=>s.replace(/\n\s*<template id="beat-breeze-layout-guard-source"[\s\S]*?<\/template>/,'');
let html = stripGuard(baseHTML.slice(0,start)+JSON.stringify(template).replaceAll('</script','<\\/script')+baseHTML.slice(end));
html = html.replace(/<title>[^<]+<\/title>/,'<title>Beat Breeze — Radio Preview (English)</title>');
html = html.replace(/\.\/narration\/beat-breeze-voice-preview\/controller\.js(?:\?v=[^"]+)?/,`./narration/beat-breeze-radio-preview/controller.js?v=${VERSION}`);
html = html.replace(/\.\/narration\/beat-breeze-motion\/controller\.js\?v=[^"]+/,`./narration/beat-breeze-radio-preview/motion.js?v=${VERSION}`);
html = html.replace(/\s*<script src="\.\/narration\/beat-breeze-language-selector\/controller\.js[^\"]*" defer><\/script>/,'');
const bodyEnd = html.lastIndexOf('</body>');
if(bodyEnd<0)throw Error('Missing outer body');
html = html.slice(0,bodyEnd)+`<script src="./narration/beat-breeze-radio-preview/preview.js?v=${VERSION}" defer></script>\n<template id="beat-breeze-layout-guard-source" data-preview-version="${VERSION}">${sections.join('\n')}</template>\n`+html.slice(bodyEnd);
html=html.replace(/[ \t]+$/gm,'');
fs.writeFileSync(path.join(decks,RADIO_PREVIEW_PATH),html);

const qaPath = path.join(repo,'tmp/presentation-narration/radio-preview/approved-results.json');
const releasedQA = path.join(repo,'docs/beat-breeze-radio-preview-20261102-qa.json');
const results = fs.existsSync(qaPath)?JSON.parse(read(qaPath)):fs.existsSync(releasedQA)?JSON.parse(read(releasedQA)).clips:[];
const audioSlides = slides.map((s,i)=>{
 const approved = results.find(r=>r.slide.id===s.id && r.expectedText===s.text && r.automatedTextPass && r.semanticReview==='passed');
 if(approved) {
   const target=path.join(out,approved.slide.src);fs.mkdirSync(path.dirname(target),{recursive:true});
   const source=path.join(repo,approved.audioFile);
   const bytes=fs.readFileSync(fs.existsSync(source)?source:target);if(hash(bytes)!==approved.slide.audioSha256)throw Error('QA audio changed');fs.writeFileSync(target,bytes);
   return {...approved.slide,index:i+1};
 }
 const old=originalManifest.slides.find(o=>o.id===s.id && o.text===s.text);
 if(old)return {...old,index:i+1,src:`../beat-breeze-voice-preview/${old.src}`};
 return {id:s.id,label:s.label,index:i+1,text:s.text,visualCoverage:s.visualCoverage,src:null,status:'awaiting-approved-audio'};
});
const complete=audioSlides.every(s=>s.src);
const manifest={
 ...originalManifest,presentation:'beat-breeze-radio-preview',version:3,
 status:complete?'english-radio-review-preview':'awaiting-reviewed-audio',
 releaseId:VERSION,generatedAt:'2026-11-02',
 publicationStatus:'Separate English-only Radio preview for review; official presentations unchanged.',
 ready:complete,preview:true,complete,
 coverage:{...originalManifest.coverage,slideIndexes:audioSlides.map(s=>s.index)},
 totalDurationSeconds:Number(audioSlides.reduce((sum,s)=>sum+(s.durationSeconds||0),0).toFixed(3)),
 generation:{mode:'six-targeted-preview-clips',updatedSlideIds:changed.map(s=>s.id),verifiedCarryForwardSlideCount:11,previousReleaseId:originalManifest.releaseId},
 qualityAssurance:{method:'Primary transcript, independent audio transcript QA and assistant semantic review; not customer listening approval.',record:'docs/beat-breeze-radio-preview-20261102-qa.json',reviewedClipCount:results.filter(r=>r.semanticReview==='passed').length,verifiedUnchangedClipCount:11},
 source:{englishDeckSha256:hash(baseHTML),previewDeckSha256:hash(html)},slides:audioSlides
};
fs.writeFileSync(path.join(out,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
let controller=read(path.join(base,'controller.js'));
controller=controller.replace('narration/beat-breeze-voice-preview/controller.js','narration/beat-breeze-radio-preview/controller.js');
controller=controller.replace('beat-breeze-narration-invitation-seen-en','beat-breeze-radio-preview-invitation-seen-en');
controller=controller.replace(/const LOCAL_FALLBACK_MANIFEST = [\s\S]*?\n  const ICONS =/,`const LOCAL_FALLBACK_MANIFEST = ${JSON.stringify(manifest)};\n\n  const ICONS =`);
fs.writeFileSync(path.join(out,'controller.js'),controller);

let motion=read(path.join(decks,'narration/beat-breeze-motion/controller.js'));
motion=motion.replace(/const VERSION = "[^"]+";/,`const VERSION = "${VERSION}";`);
const extraCues = {
 'AI Radio':[{start:.12,end:.46,key:'sequence'},{start:.52,end:.88,key:'choices'}],
 'Radio across your locations':[{start:.02,end:.37,key:'editions'},{start:.39,end:.84,key:'checks'}],
};
// English-only copy: register extra labels after the official multilingual validation.
motion=motion.replace('  const CUE_TIMELINES = CUE_TIMELINES_BY_LOCALE[LOCALE];',`  const RADIO_CUES = ${JSON.stringify(extraCues)};\n  for (const [label,cues] of Object.entries(RADIO_CUES)) { MOTION_LABELS.add(label); ENGLISH_CUE_TIMELINES[label]=cues; }\n  const CUE_TIMELINES = CUE_TIMELINES_BY_LOCALE[LOCALE];`);
motion=motion.replace('    if (label === "Title") setupTitle(slide);',`    if (RADIO_CUES[label]) {\n      slide.querySelectorAll('[data-radio-enter]').forEach((el,i)=>markEntrance(el,{delay:70+i*110,y:22,scale:.985,blur:4}));\n      slide.querySelectorAll('[data-radio-cue]').forEach(el=>markCue(el,el.dataset.radioCue,{surface:false,strength:'quiet'}));\n    }\n    if (label === "Title") setupTitle(slide);`);
fs.writeFileSync(path.join(out,'motion.js'),motion);
console.log(JSON.stringify({preview:RADIO_PREVIEW_PATH,slides:17,approvedChanges:changed.map(s=>s.id),audioReady:audioSlides.filter(s=>s.src).length}));
