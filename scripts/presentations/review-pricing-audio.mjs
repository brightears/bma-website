// Independent transcript check for ambiguous recognizer output, scoped to slide 13.
import fs from 'node:fs';
const env = process.env.BEAT_BREEZE_TTS_ENV_FILE ? fs.readFileSync(process.env.BEAT_BREEZE_TTS_ENV_FILE,'utf8') : '';
let key=process.env.TUTORIAL_TTS_API_KEY || process.env.GOOGLE_AI_API_KEY;
for(const n of ['TUTORIAL_TTS_API_KEY','GOOGLE_AI_API_KEY']){const v=env.match(new RegExp(`^(?:export )?${n}=(.*)$`,'m'))?.[1]?.trim();if(v){key=v.replace(/^['"]|['"]$/g,'');break;}}
if(!key)throw new Error('Established Google TTS credential unavailable.');
for(const locale of process.argv.slice(2)) {
  const dir=fs.readdirSync('tmp/pricing-narration').find(x=>x.startsWith(locale+'-') && fs.existsSync(`tmp/pricing-narration/${x}/qa.json`));
  if(!dir) throw new Error('Completed pricing clip not found');
  const root=`tmp/pricing-narration/${dir}`;
  const report=JSON.parse(fs.readFileSync(`${root}/qa.json`));
  const response=await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':key},body:JSON.stringify({contents:[{role:'user',parts:[{text:'Transcribe this narration verbatim in its original language, without silently correcting speech. Then report the prices, currencies, billing periods, unit of service, service provider name, and whether managed service is annual only. If Chinese, include the pinyin of the unit spoken after 每个. This is speech transcription QA, not a request to infer intended text.'},{inlineData:{mimeType:'audio/mpeg',data:fs.readFileSync(report.audioFile).toString('base64')}}]}],generationConfig:{temperature:0}}),signal:AbortSignal.timeout(180000)});
  if(!response.ok) throw new Error(`Secondary QA HTTP ${response.status}`);
  const payload=await response.json();
  const result=payload.candidates?.[0]?.content?.parts?.filter(x=>!x.thought).map(x=>x.text||'').join('\n');
  if(!result) throw new Error('Secondary QA returned no transcript');
  fs.writeFileSync(`${root}/secondary-transcript-qa.txt`,result+'\n');
  console.log(locale,result);
}
