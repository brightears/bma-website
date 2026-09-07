import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { pricing, narrationFolder } from './pricing-copy.mjs';

if(!process.argv.includes('--accept-reviewed-transcripts')) throw new Error('Review all nine transcripts for price/currency/term/service accuracy first.');
const baseline='24b6a5438190b9baae25f22ac96d769656a88c9e';
const old=p=>execFileSync('git',['show',`${baseline}:${p}`],{maxBuffer:40e6}).toString();
const sha=x=>createHash('sha256').update(x).digest('hex');
const shaFile=p=>sha(fs.readFileSync(p));
const json=(p,x)=>fs.writeFileSync(p,JSON.stringify(x,null,2)+'\n');
const stamp='2026-09-07-pricing-1';
const evidence=[];

// Pricing narration is longer now. Leave a quiet interval for the shared-app
// explanation, and highlight enterprise only when that topic actually arrives.
const motion='public/presentations/narration/beat-breeze-motion/controller.js';
fs.writeFileSync(motion,old(motion).replace('2026-09-03-official-5',stamp).replace(/Pricing: \[[\s\S]*?\],/g,`Pricing: [
      { start: 0.06, end: 0.38, key: "self-serve" },
      { start: 0.40, end: 0.72, key: "managed" },
      { start: 0.91, end: 0.99, key: "enterprise" },
    ],`));
for(const f of fs.readdirSync('scripts/presentations').filter(f=>f.startsWith('build-beat-breeze-')&&f.endsWith('.mjs'))){
  const p=`scripts/presentations/${f}`;
  fs.writeFileSync(p,fs.readFileSync(p,'utf8').replaceAll('beat-breeze-motion/controller.js?v=2026-09-03-5',`beat-breeze-motion/controller.js?v=${stamp}`));
}
// First update every deck's controller URLs, before recording any source hash.
for(const l of Object.keys(pricing)) {
  const file=`public/presentations/beat-breeze${l==='en'?'':`-${l}`}.html`;
  let html=fs.readFileSync(file,'utf8');
  html=html.replace(/(\.\/narration\/beat-breeze-motion\/controller\.js)\?v=[^"]+/g,`$1?v=${stamp}`);
  const folder=narrationFolder(l);
  html=html.replace(new RegExp(`(\\./narration/${folder}/controller\\.js)\\?v=[^"]+`,'g'),`$1?v=${stamp}`);
  fs.writeFileSync(file,html);
}
for(const l of Object.keys(pricing)) {
  const root=`public/presentations/narration/${narrationFolder(l)}`;
  const manifestPath=`${root}/manifest.json`;
  const m=JSON.parse(old(manifestPath));
  const script=JSON.parse(fs.readFileSync(`${root}/script.json`));
  const reports=fs.readdirSync('tmp/pricing-narration').filter(d=>d.startsWith(l+'-')).map(d=>`tmp/pricing-narration/${d}/qa.json`).filter(fs.existsSync).map(f=>({file:f,...JSON.parse(fs.readFileSync(f))})).filter(r=>r.expectedText===script.slides[12].text);
  if(reports.length!==1) throw new Error(`Expected one current QA result: ${l}`);
  const q=reports[0];
  if(!q.automatedTextPass || shaFile(q.audioFile)!==q.slide.audioSha256) throw new Error(`${l}: audio or transcript QA failed`);
  const previousReleaseId=m.releaseId;
  const previousQa=m.qualityAssurance?.transcription;
  for(let i=0;i<15;i++)if(i!==12){
    if(m.slides[i].text!==script.slides[i].text || shaFile(`${root}/${m.slides[i].src}`)!==m.slides[i].audioSha256) throw new Error(`${l}: untargeted clip changed`);
  }
  const audioPath=`${root}/${q.slide.src}`;
  fs.mkdirSync(path.dirname(audioPath),{recursive:true});
  fs.copyFileSync(q.audioFile,audioPath);
  m.slides[12]=q.slide;
  m.generatedAt=q.generatedAt;
  m.releaseId=q.releaseId;
  m.totalDurationSeconds=Number(m.slides.reduce((n,s)=>n+s.durationSeconds,0).toFixed(3));
  m.generation={mode:'targeted-slides-regeneration',updatedSlideIds:['13-pricing'],verifiedCarryForwardSlideCount:14,previousReleaseId};
  for(const [k,p] of Object.entries(m.source)) if(k.endsWith('Path'))m.source[k.replace(/Path$/,'Sha256')]=shaFile(p);
  const max=Math.max(previousQa?.maximumCharacterErrorRate||0,q.characterErrorRate);
  m.qualityAssurance={transcription:{provider:'google-gemini',model:q.qaModel,languageCode:q.languageCode,validationMode:'prior-release-plus-pricing-update',slidesPassing:previousQa?.slidesPassing===15?15:1,slidesPassingScope:previousQa?'one newly transcribed pricing clip plus 14 hash-identical clips from the prior QA release':'one newly transcribed pricing clip; 14 prior English clips retained without a new transcription claim',slidesTranscribed:1,slidesReusedFromPreviousQa:previousQa?14:0,verifiedUnchangedSlideCount:14,previousReleaseId,requiredMaximumCharacterErrorRate:.18,maximumCharacterErrorRate:max,meanCharacterErrorRate:max,meanCharacterErrorRateScope:'conservative-upper-bound',...(previousQa?{baselineFullDeck:previousQa}:{}),targetedUpdates:[{index:13,id:'13-pricing',audioSha256:q.slide.audioSha256,transcriptSha256:sha(q.transcript),characterErrorRate:q.characterErrorRate,lengthRatio:q.lengthRatio,pass:true}]},pricingUpdate:{index:13,reviewed:true,reviewMethod:'Assistant semantic review of the generated-audio transcript',amounts:{monthly:{USD:15,THB:499},annualSelfService:{USD:150,THB:4990},annualManaged:{USD:260,THB:9000}},perZone:true,managedAnnualOnly:true,selfServiceManagesOwnMusic:true,managedPlaylistAndScheduleRefreshes:true,seasonalChanges:true,technicalSupport24x7:true,appUpdatesInEveryPlan:true}};
  json(manifestPath,m);
  const controller=`${root}/controller.js`;
  if(fs.existsSync(controller)){
    const content=old(controller);
    const updated=content.replace(/src: "audio\/[^\"]+\/13-pricing\.mp3"/,`src: "${q.slide.src}"`);
    if(updated===content)throw new Error(`${l}: controller fallback not found`);
    fs.writeFileSync(controller,updated);
  }
  const secondaryPath=path.join(path.dirname(q.file),'secondary-transcript-qa.txt');
  evidence.push({locale:l,releaseId:q.releaseId,audioSha256:q.slide.audioSha256,durationSeconds:q.slide.durationSeconds,integratedLufs:q.slide.integratedLufs,truePeakDbtp:q.slide.truePeakDbtp,characterErrorRate:q.characterErrorRate,lengthRatio:q.lengthRatio,transcript:q.transcript,semanticReview:m.qualityAssurance.pricingUpdate,...(fs.existsSync(secondaryPath)?{secondaryTranscriptCheck:{model:'gemini-3.5-flash',result:fs.readFileSync(secondaryPath,'utf8')}}:{}),unchangedAudioClips:14});
  console.log(`${l}: pricing clip released; 14 previous clips retained byte-for-byte`);
}
json('docs/beat-breeze-pricing-20260907-qa.json',{baselineCommit:baseline,scope:'Nine slide-13 clips only. No other narration regenerated. Transcript QA is not native-speaker editorial approval.',pricesPerZone:{monthly:{USD:15,THB:499},annualSelfService:{USD:150,THB:4990},annualManaged:{USD:260,THB:9000}},slides:evidence});
