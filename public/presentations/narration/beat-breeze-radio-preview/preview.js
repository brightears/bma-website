(() => {
  'use strict';
  // The approved English presentation now has the same 17-slide sequence.
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
    const update=(n=Number(location.hash.slice(1))||1)=>{
      label.href=new URL(`beat-breeze.html#${Math.max(1,Math.min(17,n))}`,location.href).href;
    };
    update();
    stage.addEventListener('slidechange',event=>{
      if(Number.isInteger(event.detail?.index))update(event.detail.index+1);
    });
    toolbar.append(label);return true;
  };
  if(!install()){const poll=setInterval(()=>{if(install())clearInterval(poll);},150);setTimeout(()=>clearInterval(poll),15000);}
})();
