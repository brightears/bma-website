// Approved currency-only edit. The Thai deck and all non-pricing slides stay intact.
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { pricing, usdOnlyLocales, narrationFolder } from './pricing-copy.mjs';
const base='63216976dc06a479f9f216f12c5b5f0d3aacdf8f';
const old=p=>execFileSync('git',['show',`${base}:${p}`],{maxBuffer:40e6}).toString();
const oldConfig=await import(`data:text/javascript;base64,${Buffer.from(old('scripts/presentations/pricing-copy.mjs')).toString('base64')}`);
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const marker='<script type="__bundler/template">';
const sections=s=>[...s.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g)];
for(const l of usdOnlyLocales){
  const root=`public/presentations/narration/${narrationFolder(l)}`;
  const source=old(`${root}/script.json`), script=JSON.parse(source);
  const p=pricing[l], before=oldConfig.pricing[l];
  const currentScript=JSON.parse(fs.readFileSync(`${root}/script.json`));
  for(let i=0;i<15;i++)if(i!==12&&JSON.stringify(script.slides[i])!==JSON.stringify(currentScript.slides[i]))throw Error('Unrelated narration edits found');
  fs.writeFileSync(`${root}/script.json`,source.replace(JSON.stringify(script.slides[12].text),JSON.stringify(p.text)));
  const file=`public/presentations/beat-breeze${l==='en'?'':`-${l}`}.html`;
  let html=fs.readFileSync(file,'utf8');
  const start=html.indexOf(marker)+marker.length,end=html.indexOf('</script>',start);
  const template=JSON.parse(html.slice(start,end));
  const originalTemplate=JSON.parse(old(file).split(marker)[1].split('</script>')[0]);
  const list=sections(template), originalList=sections(originalTemplate);
  for(let i=0;i<15;i++)if(i!==12&&list[i][0]!==originalList[i][0])throw Error('Unrelated visual edits found');
  const update=section=>{
    for(const key of ['monthly','annual','managed']){
      const from=`>${before[key]}<`,to=`>${p[key]}<`;
      if(!section.includes(from)&&!section.includes(to))throw Error(`${l}: missing ${key}`);
      section=section.replace(from,to);
    }
    return section.replace(/data-speaker-notes="[^"]*"/,`data-speaker-notes="${esc(p.text)}"`);
  };
  html=html.slice(0,start)+JSON.stringify(template.replace(list[12][0],update(list[12][0]))).replaceAll('</script','<\\/script')+html.slice(end);
  const guard=html.match(/<template id="[^"]*layout-guard-source"[\s\S]*?<\/template>/)[0];
  html=html.replace(guard,guard.replace(sections(guard)[12][0],update(sections(guard)[12][0])));
  fs.writeFileSync(file,html);
  if(l!=='en'){
    const copy=JSON.parse(old(`${root}/copy.json`));
    for(const key of ['monthly','annual','managed']){delete copy[oldConfig.pricing.en[key]];copy[pricing.en[key]]=p[key];}
    fs.writeFileSync(`${root}/copy.json`,JSON.stringify(copy,null,2)+'\n');
  }
  console.log(`${l}: THB removed from pricing slide and narration script`);
}
