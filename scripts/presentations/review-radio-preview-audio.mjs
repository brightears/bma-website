// Independent speech QA of the six already-approved English preview clips only.
import fs from 'node:fs';
const root='tmp/presentation-narration/radio-preview';
const env=fs.readFileSync(process.env.BEAT_BREEZE_TTS_ENV_FILE,'utf8');
let key;
for(const name of ['TUTORIAL_TTS_API_KEY','GOOGLE_AI_API_KEY']){
 const value=env.match(new RegExp(`^(?:export )?${name}=(.*)$`,'m'))?.[1]?.trim();
 if(value){key=value.replace(/^['"]|['"]$/g,'');break;}
}
if(!key)throw Error('Established TTS credential unavailable');
const allowed=new Set(['02-one-platform-many-jobs','radio-your-station','radio-across-locations','12-why-beat-breeze','13-pricing','15-close']);
const dirs=fs.readdirSync(root).filter(d=>fs.existsSync(`${root}/${d}/qa.json`));
const current=JSON.parse(fs.readFileSync('public/presentations/narration/beat-breeze-radio-preview/script.json')).slides;
for(const dir of dirs){
 const report=JSON.parse(fs.readFileSync(`${root}/${dir}/qa.json`));
 if(!allowed.has(report.slide.id))throw Error('Clip outside approved scope');
 if(!current.some(s=>s.id===report.slide.id&&s.text===report.expectedText))continue;
 const out=`${root}/${dir}/secondary-transcript-qa.txt`;
 if(fs.existsSync(out)){console.log(report.slide.id,fs.readFileSync(out,'utf8'));continue;}
 const response=await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent',{
  method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':key},
  body:JSON.stringify({contents:[{role:'user',parts:[
   {text:'Transcribe the attached English narration verbatim from its actual sound, without silently correcting or guessing intended words. After the transcript, flag any unnatural, cut-off or ambiguous pronunciation. Pay particular attention to the words following "music by", "regional", and "review the", and the company name. For prices, report every amount, currency, billing period and service unit heard. Do not infer missing words or use an intended script; none is supplied.'},
   {inlineData:{mimeType:'audio/mpeg',data:fs.readFileSync(report.audioFile).toString('base64')}}
  ]}],generationConfig:{temperature:0}}),signal:AbortSignal.timeout(180000)});
 if(!response.ok)throw Error(`Secondary QA HTTP ${response.status}`);
 const payload=await response.json();
 const result=payload.candidates?.[0]?.content?.parts?.filter(p=>!p.thought).map(p=>p.text||'').join('\n');
 if(!result)throw Error('No secondary QA result');
 fs.writeFileSync(out,result+'\n');
 console.log(report.slide.id,result);
}
