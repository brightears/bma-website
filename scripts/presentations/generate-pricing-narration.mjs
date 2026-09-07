// Regenerates only the approved pricing clip. No other text/audio is uploaded.
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';
import { pricing, narrationFolder } from './pricing-copy.mjs';

if (!process.argv.includes('--confirm-spend')) throw new Error('Pass --confirm-spend for the approved bounded pricing TTS/QA run.');
const locales = process.argv.filter(a => Object.hasOwn(pricing,a));
if (!locales.length) throw new Error('Specify approved locale codes.');
let apiKey = process.env.TUTORIAL_TTS_API_KEY || process.env.GOOGLE_AI_API_KEY;
if (!apiKey && process.env.BEAT_BREEZE_TTS_ENV_FILE) {
  // Read only the established provider key; never print credentials or the env file.
  const env = fs.readFileSync(process.env.BEAT_BREEZE_TTS_ENV_FILE,'utf8');
  for (const name of ['TUTORIAL_TTS_API_KEY','GOOGLE_AI_API_KEY']) {
    const value = env.match(new RegExp(`^(?:export )?${name}=(.*)$`,'m'))?.[1]?.trim();
    if (value) { apiKey = value.replace(/^['"]|['"]$/g,''); break; }
  }
}
if (!apiKey) throw new Error('Established Google TTS credential unavailable.');
const model = 'gemini-3.1-flash-tts-preview';
const qaModel = 'gemini-3.5-transcribe';
const hash = x => createHash('sha256').update(x).digest('hex');
const run = (args) => execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-y',...args]);
const measure = (file, highpass=false) => {
  const p = spawnSync('ffmpeg',['-hide_banner','-nostats','-i',file,'-af',`${highpass?'highpass=f=65,':''}loudnorm=I=-18:TP=-3:LRA=7:print_format=json`,'-f','null','-'],{encoding:'utf8'});
  if (p.status !== 0) throw new Error(`Loudness failed: ${file}`);
  return JSON.parse(p.stderr.match(/\{[\s\S]*?"target_offset"[\s\S]*?\}/)[0]);
};
const post = async (url, body) => {
  const response = await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':apiKey},body:JSON.stringify(body),signal:AbortSignal.timeout(300000)});
  if (!response.ok) {
    const payload = await response.json().catch(()=>({}));
    throw new Error(`Google HTTP ${response.status}: ${payload?.error?.message || 'Request failed'}`);
  }
  return response.json();
};
const normalize = s => s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
const distance = (a,b) => {
  let row = Array.from({length:b.length+1},(_,i)=>i);
  for(let i=1;i<=a.length;i++){let next=[i];for(let j=1;j<=b.length;j++)next[j]=Math.min(row[j]+1,next[j-1]+1,row[j-1]+(a[i-1]===b[j-1]?0:1));row=next;}return row[b.length];
};
const languageCodes = {en:'en-US',th:'th-TH',zh:'zh-CN',vi:'vi-VN',id:'id-ID',ms:'ms-MY',ko:'ko-KR',ja:'ja-JP',ar:'ar'};
async function generate(locale) {
  const root = `public/presentations/narration/${narrationFolder(locale)}`;
  const script = JSON.parse(fs.readFileSync(`${root}/script.json`));
  const slide = script.slides[12], p = script.voice.performance;
  if(slide.text !== pricing[locale].text) throw new Error(`Pricing source mismatch: ${locale}`);
  const key = hash(JSON.stringify({text:slide.text,p,model,voice:script.voice.name})).slice(0,16);
  const work = `tmp/pricing-narration/${locale}-${key}`;
  fs.mkdirSync(work,{recursive:true});
  const wav = `${work}/source.wav`, mp3 = `${work}/${slide.id}.mp3`;
  if(!fs.existsSync(wav)) {
    console.log(`${locale}: generating slide 13 with the established voice`);
    const input = `# AUDIO PROFILE: ${p.name}\n${p.name} is ${p.role}.\n# SCENE\n${p.name} is in ${p.scene}. This is a normal working conversation, not a commercial voice-over or a formal stage performance.\n# DIRECTOR'S NOTES\nStyle: ${p.style}\nPacing: ${p.pacing}\n# TRANSCRIPT\n${slide.text}`;
    const payload = await post('https://generativelanguage.googleapis.com/v1beta/interactions',{model,input,response_format:{type:'audio'},generation_config:{speech_config:[{voice:script.voice.name}]}});
    const audio = payload.output_audio?.data ? payload.output_audio : (payload.outputs?.find(x=>x.type==='audio') || payload.output?.find?.(x=>x.type==='audio') || payload.steps?.flatMap(x=>x.content||[]).find(x=>x.type==='audio'));
    if(!audio?.data) throw new Error(`${locale}: Google returned no audio`);
    const raw = `${work}/provider-audio`;
    fs.writeFileSync(raw,Buffer.from(audio.data,'base64'));
    const mime = audio.mime_type || audio.mimeType || 'audio/L16';
    const args = /wav|mpeg|mp3|ogg/i.test(mime) ? ['-i',raw] : ['-f','s16le','-ar',String(audio.sample_rate||audio.sampleRate||24000),'-ac',String(audio.channels||1),'-i',raw];
    run([...args,'-ar','48000','-ac','1','-c:a','pcm_s24le',wav]);
    fs.unlinkSync(raw);
  }
  if(!fs.existsSync(mp3)) {
    const m = measure(wav,true);
    run(['-i',wav,'-af',`highpass=f=65,loudnorm=I=-18:TP=-3:LRA=7:measured_I=${m.input_i}:measured_TP=${m.input_tp}:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}:offset=${m.target_offset}:linear=true`,'-ar','48000','-ac','1','-c:a','libmp3lame','-b:a','128k',mp3]);
  }
  const m = measure(mp3);
  if(Math.abs(Number(m.input_i)+18)>1.5 || Number(m.input_tp)>-1.5) throw new Error(`${locale}: loudness QA failed`);
  const probe = JSON.parse(execFileSync('ffprobe',['-v','error','-show_entries','format=duration:stream=codec_name,sample_rate,channels,bit_rate','-of','json',mp3]));
  const transcriptPath = `${work}/transcript.txt`;
  if(!fs.existsSync(transcriptPath)) {
    console.log(`${locale}: transcribing replacement clip for pricing QA`);
    const payload = await post(`https://generativelanguage.googleapis.com/v1beta/models/${qaModel}:generateContent`,{contents:[{role:'user',parts:[{inlineData:{mimeType:'audio/mpeg',data:fs.readFileSync(mp3).toString('base64')}}]}],generationConfig:{audioTranscriptionConfig:{languageCodes:[languageCodes[locale]],customVocabulary:['Beat Breeze','BMAsia','Compose','Content Studio']}}});
    const text = payload?.candidates?.[0]?.content?.parts?.map(x=>x.audioTranscription?.text||x.text||'').join('').trim();
    if(!text) throw new Error(`${locale}: empty transcript`);
    fs.writeFileSync(transcriptPath,text+'\n');
  }
  const transcript = fs.readFileSync(transcriptPath,'utf8').trim();
  const expected=normalize(slide.text),actual=normalize(transcript);
  const cer=distance(expected,actual)/expected.length, ratio=actual.length/expected.length;
  const result={locale,model,qaModel,languageCode:languageCodes[locale],generatedAt:new Date().toISOString(),releaseId:`20260907-pricing-${key}`,audioFile:mp3,transcript,expectedText:slide.text,characterErrorRate:cer,lengthRatio:ratio,automatedTextPass:cer<=.18 && ratio>=.84 && ratio<=1.12,pricingSemanticReview:'pending',slide:{...slide,index:13,src:`audio/20260907-pricing-${key}/${slide.id}.mp3`,transcriptSha256:hash(slide.text),audioSha256:hash(fs.readFileSync(mp3)),durationSeconds:Number(Number(probe.format.duration).toFixed(3)),codec:probe.streams[0].codec_name,sampleRateHz:Number(probe.streams[0].sample_rate),channels:probe.streams[0].channels,bitRate:Number(probe.streams[0].bit_rate),integratedLufs:Number(m.input_i),truePeakDbtp:Number(m.input_tp),loudnessRangeLu:Number(m.input_lra),thresholdLufs:Number(m.input_thresh),targetOffsetLu:Number(m.target_offset)}};
  fs.writeFileSync(`${work}/qa.json`,JSON.stringify(result,null,2)+'\n');
  console.log(`${locale}: ready for semantic review, ${result.slide.durationSeconds}s, CER ${(cer*100).toFixed(1)}%, report ${work}/qa.json`);
}
// Limit provider load and keep every completed clip independently resumable.
const errors=[];
for(let i=0;i<locales.length;i+=3){const results=await Promise.allSettled(locales.slice(i,i+3).map(generate));for(const r of results)if(r.status==='rejected'){console.error(r.reason);errors.push(r.reason);}}
if(errors.length) process.exitCode=1;
