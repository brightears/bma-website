// Bounded run authorised by Norbert: six English scripts and six replacement clips,
// Google Gemini TTS and transcript QA only. Existing official assets are never written.
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync,spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

if(!process.argv.includes('--confirm-spend'))throw Error('The six-clip approval is required.');
const repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
process.chdir(repo);
const root='public/presentations/narration/beat-breeze-radio-preview';
const script=JSON.parse(fs.readFileSync(`${root}/script.json`,'utf8'));
const original=JSON.parse(fs.readFileSync('public/presentations/narration/beat-breeze-voice-preview/manifest.json','utf8'));
const slides=script.slides.filter(s=>!original.slides.some(o=>o.id===s.id&&o.text===s.text));
const ids=['02-one-platform-many-jobs','radio-your-station','radio-across-locations','12-why-beat-breeze','13-pricing','15-close'];
if(slides.length!==6||slides.some((s,i)=>s.id!==ids[i]))throw Error('Scope differs from the approved six clips.');
const requested=process.argv.find(arg=>arg.startsWith('--slide='))?.slice(8);
if(requested&&!ids.includes(requested))throw Error('Requested slide outside preview scope.');
const selected=requested?slides.filter(s=>s.id===requested):slides;
let apiKey=process.env.TUTORIAL_TTS_API_KEY||process.env.GOOGLE_AI_API_KEY;
if(!apiKey&&process.env.BEAT_BREEZE_TTS_ENV_FILE){
 const env=fs.readFileSync(process.env.BEAT_BREEZE_TTS_ENV_FILE,'utf8');
 for(const name of ['TUTORIAL_TTS_API_KEY','GOOGLE_AI_API_KEY']){
  const v=env.match(new RegExp(`^(?:export )?${name}=(.*)$`,'m'))?.[1]?.trim();
  if(v){apiKey=v.replace(/^['"]|['"]$/g,'');break;}
 }
}
if(!apiKey)throw Error('Established Google TTS credential unavailable.');
const model=script.voice.model, qaModel='gemini-3.5-transcribe';
const hash=x=>createHash('sha256').update(x).digest('hex');
const run=args=>execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-y',...args]);
function measure(file,highpass=false){
 const p=spawnSync('ffmpeg',['-hide_banner','-nostats','-i',file,'-af',`${highpass?'highpass=f=65,':''}loudnorm=I=-18:TP=-3:LRA=7:print_format=json`,'-f','null','-'],{encoding:'utf8'});
 if(p.status!==0)throw Error('Audio loudness measurement failed');
 return JSON.parse(p.stderr.match(/\{[\s\S]*?"target_offset"[\s\S]*?\}/)[0]);
}
async function post(url,body){
 const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':apiKey},body:JSON.stringify(body),signal:AbortSignal.timeout(300000)});
 if(!r.ok){const p=await r.json().catch(()=>({}));throw Error(`Google HTTP ${r.status}: ${p?.error?.message||'Request failed'}`);}
 return r.json();
}
const normalize=s=>s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
function distance(a,b){let row=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){const next=[i];for(let j=1;j<=b.length;j++)next[j]=Math.min(row[j]+1,next[j-1]+1,row[j-1]+(a[i-1]===b[j-1]?0:1));row=next;}return row[b.length];}
async function generate(slide){
 const p=script.voice.performance,key=hash(JSON.stringify({text:slide.text,p,model,voice:script.voice.name})).slice(0,16);
 const work=`tmp/presentation-narration/radio-preview/${slide.id}-${key}`;
 fs.mkdirSync(work,{recursive:true});
 const wav=`${work}/source.wav`,mp3=`${work}/${slide.id}.mp3`;
 if(!fs.existsSync(wav)){
  console.log(`${slide.id}: generating established ${script.voice.name} voice`);
  const input=`# AUDIO PROFILE: ${p.name}\n${p.name} is ${p.role}.\n# SCENE\n${p.name} is in ${p.scene}. This is a normal working conversation, not a commercial voice-over or a formal stage performance.\n# DIRECTOR'S NOTES\nStyle: ${p.style}\nPacing: ${p.pacing}\n# TRANSCRIPT\n${slide.text}`;
  const payload=await post('https://generativelanguage.googleapis.com/v1beta/interactions',{model,input,response_format:{type:'audio'},generation_config:{speech_config:[{voice:script.voice.name}]}});
  const a=payload.output_audio?.data?payload.output_audio:(payload.outputs?.find(x=>x.type==='audio')||payload.output?.find?.(x=>x.type==='audio')||payload.steps?.flatMap(x=>x.content||[]).find(x=>x.type==='audio'));
  if(!a?.data)throw Error(`${slide.id}: provider returned no audio`);
  const raw=`${work}/provider-audio`;fs.writeFileSync(raw,Buffer.from(a.data,'base64'));
  const mime=a.mime_type||a.mimeType||'audio/L16';
  const args=/wav|mpeg|mp3|ogg/i.test(mime)?['-i',raw]:['-f','s16le','-ar',String(a.sample_rate||a.sampleRate||24000),'-ac',String(a.channels||1),'-i',raw];
  run([...args,'-ar','48000','-ac','1','-c:a','pcm_s24le',wav]);
 }
 if(!fs.existsSync(mp3)){
  const m=measure(wav,true);
  run(['-i',wav,'-af',`highpass=f=65,loudnorm=I=-18:TP=-3:LRA=7:measured_I=${m.input_i}:measured_TP=${m.input_tp}:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}:offset=${m.target_offset}:linear=true`,'-ar','48000','-ac','1','-c:a','libmp3lame','-b:a','128k',mp3]);
 }
 const m=measure(mp3);if(Math.abs(Number(m.input_i)+18)>1.5||Number(m.input_tp)>-1.5)throw Error(`${slide.id}: loudness failed`);
 const probe=JSON.parse(execFileSync('ffprobe',['-v','error','-show_entries','format=duration:stream=codec_name,sample_rate,channels,bit_rate','-of','json',mp3]));
 const transcriptPath=`${work}/transcript.txt`;
 if(!fs.existsSync(transcriptPath)){
  console.log(`${slide.id}: transcribing generated audio`);
  const payload=await post(`https://generativelanguage.googleapis.com/v1beta/models/${qaModel}:generateContent`,{contents:[{role:'user',parts:[{inlineData:{mimeType:'audio/mpeg',data:fs.readFileSync(mp3).toString('base64')}}]}],generationConfig:{audioTranscriptionConfig:{languageCodes:['en-US'],customVocabulary:['Beat Breeze','BMAsia','Compose','Content Studio','Radio']}}});
  const text=payload?.candidates?.[0]?.content?.parts?.map(x=>x.audioTranscription?.text||x.text||'').join('').trim();
  if(!text)throw Error(`${slide.id}: empty transcript`);fs.writeFileSync(transcriptPath,text+'\n');
 }
 const transcript=fs.readFileSync(transcriptPath,'utf8').trim(),e=normalize(slide.text),a=normalize(transcript),cer=distance(e,a)/e.length,ratio=a.length/e.length;
 const result={model,qaModel,generatedAt:new Date().toISOString(),audioFile:mp3,expectedText:slide.text,transcript,characterErrorRate:cer,lengthRatio:ratio,automatedTextPass:cer<=.12&&ratio>=.88&&ratio<=1.1,semanticReview:'pending',slide:{...slide,src:`audio/20261102-radio-${key}/${slide.id}.mp3`,transcriptSha256:hash(slide.text),audioSha256:hash(fs.readFileSync(mp3)),durationSeconds:Number(Number(probe.format.duration).toFixed(3)),codec:probe.streams[0].codec_name,sampleRateHz:Number(probe.streams[0].sample_rate),channels:probe.streams[0].channels,bitRate:Number(probe.streams[0].bit_rate),integratedLufs:Number(m.input_i),truePeakDbtp:Number(m.input_tp)}};
 fs.writeFileSync(`${work}/qa.json`,JSON.stringify(result,null,2)+'\n');
 console.log(`${slide.id}: ${result.slide.durationSeconds}s; CER ${(cer*100).toFixed(1)}%; ${result.automatedTextPass?'PASS':'REVIEW REQUIRED'}`);
 return result;
}
let failed=false;
for(let i=0;i<selected.length;i+=2){const results=await Promise.allSettled(selected.slice(i,i+2).map(generate));for(const r of results)if(r.status==='rejected'){console.error(r.reason);failed=true;}}
if(failed)process.exitCode=1;
