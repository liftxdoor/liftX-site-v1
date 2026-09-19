(function(){
  'use strict';

  const form=document.getElementById('visualizer-form');
  if(!form) return;

  const photoInput=document.getElementById('visualizer-photo');
  const uploadBox=document.getElementById('visualizer-upload');
  const preview=document.getElementById('visualizer-preview');
  const submit=document.getElementById('visualizer-submit');
  const status=document.getElementById('visualizer-status');
  const result=document.getElementById('visualizer-result');
  const resultHeading=document.getElementById('visualizer-result-heading');
  const conceptImage=document.getElementById('visualizer-concept-image');
  const summary=document.getElementById('visualizer-summary');
  const matchList=document.getElementById('visualizer-match-list');
  const humanHelp=document.getElementById('visualizer-human-help');
  const download=document.getElementById('visualizer-download');
  const share=document.getElementById('visualizer-share');
  const contact=document.getElementById('visualizer-contact');
  const textLink=document.getElementById('visualizer-text');
  const tryAgain=document.getElementById('visualizer-try-again');
  const MAX_SOURCE_BYTES=15*1024*1024;
  const MAX_OUTPUT_BYTES=8*1024*1024;
  const MAX_SOURCE_PIXELS=32000000;
  const MAX_EDGE=2048;
  let preparedFile=null;
  let previewUrl='';
  let resultUrl='';
  let turnstileSiteKey='';
  let turnstileWidgetId=null;
  let selectionId=0;

  function setStatus(message,type){
    status.textContent=message||'';
    status.className='visualizer-status'+(type?` is-${type}`:'');
  }

  function replaceObjectUrl(kind,url){
    const current=kind==='preview'?previewUrl:resultUrl;
    if(current) URL.revokeObjectURL(current);
    if(kind==='preview') previewUrl=url; else resultUrl=url;
  }

  function decodeImage(file){
    return new Promise((resolve,reject)=>{
      const url=URL.createObjectURL(file);
      const image=new Image();
      image.onload=()=>{URL.revokeObjectURL(url);resolve(image)};
      image.onerror=()=>{URL.revokeObjectURL(url);reject(new Error('That photo could not be opened. Try a JPEG, PNG, WebP, HEIC, or HEIF image.'))};
      image.src=url;
    });
  }

  async function normalizePhoto(file,currentSelection){
    if(!file) return;
    if(file.size>MAX_SOURCE_BYTES) throw new Error('That photo is over 15 MB. Choose a smaller image.');
    const image=await decodeImage(file);
    if(image.naturalWidth*image.naturalHeight>MAX_SOURCE_PIXELS) throw new Error('That photo is too large to process. Choose an image under 32 megapixels.');
    const scale=Math.min(1,MAX_EDGE/Math.max(image.naturalWidth,image.naturalHeight));
    const width=Math.max(1,Math.round(image.naturalWidth*scale));
    const height=Math.max(1,Math.round(image.naturalHeight*scale));
    const canvas=document.createElement('canvas');
    canvas.width=width;canvas.height=height;
    const ctx=canvas.getContext('2d',{alpha:false});
    ctx.fillStyle='#fff';ctx.fillRect(0,0,width,height);ctx.drawImage(image,0,0,width,height);
    const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',.86));
    if(currentSelection!==selectionId) return;
    if(!blob||blob.size>MAX_OUTPUT_BYTES) throw new Error('That photo could not be prepared. Try a smaller image.');
    preparedFile=new File([blob],'garage-photo.jpg',{type:'image/jpeg'});
    replaceObjectUrl('preview',URL.createObjectURL(blob));
    preview.src=previewUrl;
    uploadBox.classList.add('has-image');
    setStatus('Photo ready. Choose a direction and generate your concept.');
  }

  photoInput.addEventListener('change',async()=>{
    const currentSelection=++selectionId;
    preparedFile=null;
    setStatus('Preparing your photo…','working');
    try{await normalizePhoto(photoInput.files&&photoInput.files[0],currentSelection)}
    catch(error){if(currentSelection===selectionId){photoInput.value='';uploadBox.classList.remove('has-image');setStatus(error.message,'error')}}
  });

  function loadTurnstile(){
    return new Promise((resolve,reject)=>{
      if(window.turnstile){resolve();return}
      const existing=document.querySelector('script[data-liftx-turnstile]');
      if(existing){existing.addEventListener('load',resolve,{once:true});existing.addEventListener('error',reject,{once:true});return}
      const script=document.createElement('script');
      script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async=true;script.defer=true;script.dataset.liftxTurnstile='true';
      script.onload=resolve;script.onerror=()=>reject(new Error('Verification could not load. Please refresh and try again.'));
      document.head.appendChild(script);
    });
  }

  async function getTurnstileToken(){
    if(!turnstileSiteKey) return '';
    await loadTurnstile();
    return new Promise((resolve,reject)=>{
      const container=document.getElementById('visualizer-turnstile');
      if(turnstileWidgetId!==null) window.turnstile.remove(turnstileWidgetId);
      turnstileWidgetId=window.turnstile.render(container,{
        sitekey:turnstileSiteKey,
        action:'visualizer_generate',
        size:'invisible',
        callback:resolve,
        'error-callback':()=>reject(new Error('Verification failed. Please try again.')),
        'expired-callback':()=>reject(new Error('Verification expired. Please try again.'))
      });
      window.turnstile.execute(turnstileWidgetId);
    });
  }

  async function readConfig(){
    try{
      const response=await fetch('/api/visualizer/config',{headers:{Accept:'application/json'},cache:'no-store'});
      if(!response.ok) return;
      const config=await response.json();
      if(config.enabled&&config.turnstileSiteKey) turnstileSiteKey=config.turnstileSiteKey;
      if(!config.enabled){submit.disabled=true;submit.textContent='Visualizer coming soon';setStatus('The AI visualizer is being prepared. You can still browse the manufacturer tools below.');}
    }catch(_error){submit.disabled=true;submit.textContent='Visualizer temporarily unavailable';setStatus('The AI visualizer is temporarily unavailable. Please use the manufacturer tools below.','error')}
  }

  function base64ToBlob(base64,mime){
    const binary=atob(base64);const chunks=[];
    for(let offset=0;offset<binary.length;offset+=32768){const slice=binary.slice(offset,offset+32768);const bytes=new Uint8Array(slice.length);for(let i=0;i<slice.length;i++) bytes[i]=slice.charCodeAt(i);chunks.push(bytes)}
    return new Blob(chunks,{type:mime});
  }

  function optionLabel(name){
    const checked=form.querySelector(`[name="${name}"]:checked`);
    if(checked){const label=form.querySelector(`label[for="${checked.id}"]`);return label?label.textContent.trim():checked.value}
    const field=form.elements[name];
    if(field&&field.options) return field.options[field.selectedIndex].text;
    return '';
  }

  function setLeadLinks(data){
    const params=new URLSearchParams({source:'ai-visualizer',opening:optionLabel('opening'),style:optionLabel('style'),color:optionLabel('color'),windows:optionLabel('windows')});
    (data.matches||[]).slice(0,3).forEach((match,index)=>params.set(`match${index+1}`,`${match.manufacturer} ${match.collection}`));
    contact.href=`/contact?${params.toString()}#contact-form-card`;
    const message=`Hi LIFTX — I made an AI garage-door concept on your website. My direction: ${optionLabel('style')}, ${optionLabel('color')}, ${optionLabel('windows')}. I can attach the concept image here.`;
    const separator=/iPad|iPhone|iPod/.test(navigator.userAgent)?'&':'?';
    textLink.href=`sms:+12089954321${separator}body=${encodeURIComponent(message)}`;
  }

  function renderMatches(matches,needsHumanHelp){
    matchList.replaceChildren();
    (matches||[]).forEach(match=>{
      const card=document.createElement('article');card.className='visualizer-match';
      const image=document.createElement('img');image.src=match.image;image.alt='';image.loading='lazy';
      const body=document.createElement('div');
      const tier=document.createElement('small');tier.textContent=match.tier;
      const title=document.createElement('h5');title.textContent=`${match.manufacturer} ${match.collection}`;
      const copy=document.createElement('p');copy.textContent=match.reason;
      const links=document.createElement('div');links.className='visualizer-match-links';
      const product=document.createElement('a');product.href=match.productUrl;product.target='_blank';product.rel='noopener';product.textContent='Manufacturer details ↗';
      const local=document.createElement('a');local.href=match.localUrl;local.textContent='Explore with LIFTX →';
      links.append(product,local);body.append(tier,title,copy,links);card.append(image,body);matchList.append(card);
    });
    const showHelp=needsHumanHelp||!matches||!matches.length;
    humanHelp.hidden=!showHelp;
    if(showHelp) humanHelp.textContent='The concept does not line up cleanly with every catalog tag. Send it to LIFTX and we’ll identify the closest buildable options by hand.';
  }

  function showResult(data){
    const blob=base64ToBlob(data.imageBase64,data.mimeType||'image/jpeg');
    replaceObjectUrl('result',URL.createObjectURL(blob));
    conceptImage.src=resultUrl;
    conceptImage.alt='AI-generated conceptual garage-door mockup based on the uploaded home photo';
    summary.textContent=data.summary||'Your conceptual garage-door direction is ready.';
    download.href=resultUrl;download.download='liftx-ai-garage-door-concept.jpg';
    renderMatches(data.matches,data.needsHumanHelp);
    setLeadLinks(data);
    result.classList.add('is-visible');
    resultHeading.focus({preventScroll:true});
    result.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  }

  form.addEventListener('submit',async event=>{
    event.preventDefault();
    if(!preparedFile){setStatus('Choose a clear photo of the home or garage first.','error');photoInput.focus();return}
    if(!form.reportValidity()) return;
    const controls=Array.from(form.elements);controls.forEach(control=>control.disabled=true);
    submit.textContent='Creating your concept…';setStatus('AI is updating the door while keeping the home and surroundings intact. This can take a minute or two.','working');
    try{
      const token=await getTurnstileToken();
      const body=new FormData(form);body.set('photo',preparedFile);body.set('turnstileToken',token);
      const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),230000);
      let response;
      try{response=await fetch('/api/visualizer/generate',{method:'POST',body,headers:{'X-LIFTX-Visualizer':'1',Accept:'application/json'},signal:controller.signal})}finally{clearTimeout(timeout)}
      const data=await response.json().catch(()=>({}));
      if(!response.ok) throw new Error(data.error||'The concept could not be generated. Please try again.');
      showResult(data);setStatus('Concept ready. Compare the closest real product paths below.');
    }catch(error){
      const message=error.name==='AbortError'?'The visualizer took too long to respond. Your previous result is still available; please try again.':error.message;
      setStatus(message,'error');
    }finally{controls.forEach(control=>control.disabled=false);submit.textContent='Generate My Concept'}
  });

  share.addEventListener('click',async()=>{
    if(!resultUrl) return;
    const blob=await fetch(resultUrl).then(response=>response.blob());
    const file=new File([blob],'liftx-ai-garage-door-concept.jpg',{type:blob.type});
    try{
      if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({title:'My LIFTX garage-door concept',files:[file]})}
      else{download.click()}
    }catch(error){if(error.name!=='AbortError') download.click()}
  });

  tryAgain.addEventListener('click',()=>{form.scrollIntoView({behavior:'smooth',block:'start'});document.getElementById('visualizer-notes').focus({preventScroll:true})});
  window.addEventListener('pagehide',event=>{if(!event.persisted){if(previewUrl) URL.revokeObjectURL(previewUrl);if(resultUrl) URL.revokeObjectURL(resultUrl)}});
  readConfig();
})();
