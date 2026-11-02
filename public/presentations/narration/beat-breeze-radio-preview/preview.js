(() => {
  'use strict';
  // This preview is English-only. Do not send new slide numbers to the 15-slide translations.
  const install = () => {
    const stage = document.querySelector('deck-stage');
    const root = stage?.shadowRoot;
    const toolbar = root?.querySelector('.toolbar,[role="toolbar"]');
    if (!toolbar || root.querySelector('#radio-preview-label')) return Boolean(toolbar);
    const label = document.createElement('a');
    label.id = 'radio-preview-label';
    label.textContent = 'English preview';
    label.title = 'Radio preview — return to the official presentation';
    label.style.cssText='font:500 12px/1.2 sans-serif;color:#d7b772;text-decoration:none;padding:8px 12px;white-space:nowrap;';
    const update=()=>{
      const n=Number(location.hash.slice(1))||1;
      const old=n<=8?n:n<=10?8:n-2;
      label.href=new URL(`beat-breeze.html#${old}`,location.href).href;
    };
    update();window.addEventListener('hashchange',update);toolbar.append(label);return true;
  };
  if(!install()){const poll=setInterval(()=>{if(install())clearInterval(poll);},150);setTimeout(()=>clearInterval(poll),15000);}
})();
