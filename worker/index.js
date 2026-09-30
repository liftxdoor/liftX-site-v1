import {CATALOG_BY_ID,CATALOG_VERSION,PRODUCT_CATALOG,hydrateMatches} from './catalog.js';

const JSON_HEADERS={
  'Content-Type':'application/json; charset=utf-8',
  'Cache-Control':'private, no-store, max-age=0',
  'CDN-Cache-Control':'no-store',
  'X-Content-Type-Options':'nosniff',
  'X-Robots-Tag':'noindex, nofollow'
};
const MAX_REQUEST_BYTES=9*1024*1024;
const MAX_PHOTO_BYTES=8*1024*1024;
const MAX_EDGE=6000;
const MAX_PIXELS=20000000;
const MAX_IMAGE_BASE64=6000000;
const MAX_OPENAI_JSON_BYTES=6500000;
const ALLOWED_ORIGINS=new Set(['https://liftxdoor.com','https://www.liftxdoor.com']);
const ENUMS={
  opening:{'garage-door':'garage door only','garage-opening':'garage door and immediately surrounding opening details'},
  style:{modern:'modern, clean-lined sectional door',traditional:'traditional sectional door',carriage:'carriage-house door','full-view':'true Full-View aluminum-and-glass door'},
  color:{black:'black finish',white:'white finish','dark-bronze':'dark bronze finish','wood-look':'realistic wood-look finish',gray:'gray finish','match-home':'a finish that coordinates naturally with the home'},
  windows:{none:'no glass','top-row':'a row of rectangular windows across the top door section','side-left':'slim rectangular windows stacked vertically within the left side of the garage door, not separate sidelights','side-right':'slim rectangular windows stacked vertically within the right side of the garage door, not separate sidelights','side-both':'slim rectangular windows stacked vertically within both sides of the garage door, not separate sidelights','every-section':'rectangular windows incorporated into every sectional door section, distinct from a true Full-View door','full-view':'a true Full-View door made primarily of framed glass sections'}
};

function json(data,status=200,extraHeaders={}){
  return new Response(JSON.stringify(data),{status,headers:{...JSON_HEADERS,...extraHeaders}});
}

export function isVisualizerEnabled(env){
  return Boolean(env&&env.VISUALIZER_ENABLED==='true'&&env.OPENAI_API_KEY&&env.TURNSTILE_SITE_KEY&&env.TURNSTILE_SECRET_KEY&&env.VISUALIZER_RATE_LIMITER&&env.VISUALIZER_GLOBAL_RATE_LIMITER);
}

function allowedHosts(env){
  const hosts=new Set(['liftxdoor.com','www.liftxdoor.com','localhost','127.0.0.1']);
  String(env.VISUALIZER_ALLOWED_HOSTS||'').split(',').map(value=>value.trim().toLowerCase()).filter(Boolean).forEach(host=>hosts.add(host));
  return hosts;
}

function validOrigin(request,env){
  const url=new URL(request.url);
  if(!allowedHosts(env).has(url.hostname.toLowerCase())) return false;
  const origin=request.headers.get('Origin');
  if(!origin) return url.hostname==='localhost'||url.hostname==='127.0.0.1';
  if(ALLOWED_ORIGINS.has(origin)) return true;
  try{return allowedHosts(env).has(new URL(origin).hostname.toLowerCase())&&new URL(origin).origin===url.origin}catch(_error){return false}
}

function visitorKey(request){
  return request.headers.get('CF-Connecting-IP')||request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim()||'unknown';
}

async function applyLimit(binding,key){
  try{const result=await binding.limit({key});return result&&result.success===true}catch(_error){return false}
}

function textValue(form,name,maxLength=100){
  const value=form.get(name);
  return typeof value==='string'?value.trim().slice(0,maxLength):'';
}

function enumValue(form,name){
  const key=textValue(form,name,40);
  return Object.prototype.hasOwnProperty.call(ENUMS[name],key)?key:null;
}

function readU32(bytes,offset,littleEndian=false){
  if(offset+4>bytes.length) return 0;
  return littleEndian?(bytes[offset]|bytes[offset+1]<<8|bytes[offset+2]<<16|bytes[offset+3]<<24)>>>0:((bytes[offset]<<24|bytes[offset+1]<<16|bytes[offset+2]<<8|bytes[offset+3])>>>0);
}

export function imageDimensions(bytes){
  if(bytes.length>=24&&bytes[0]===0x89&&bytes[1]===0x50&&bytes[2]===0x4e&&bytes[3]===0x47) return {type:'image/png',width:readU32(bytes,16),height:readU32(bytes,20)};
  if(bytes.length>=30&&String.fromCharCode(...bytes.slice(0,4))==='RIFF'&&String.fromCharCode(...bytes.slice(8,12))==='WEBP'){
    const kind=String.fromCharCode(...bytes.slice(12,16));
    if(kind==='VP8X') return {type:'image/webp',width:1+bytes[24]+(bytes[25]<<8)+(bytes[26]<<16),height:1+bytes[27]+(bytes[28]<<8)+(bytes[29]<<16)};
    if(kind==='VP8 '&&bytes.length>=30) return {type:'image/webp',width:bytes[26]|(bytes[27]&0x3f)<<8,height:bytes[28]|(bytes[29]&0x3f)<<8};
    if(kind==='VP8L'&&bytes.length>=25){const bits=readU32(bytes,21,true);return {type:'image/webp',width:(bits&0x3fff)+1,height:((bits>>14)&0x3fff)+1}}
  }
  if(bytes.length>=4&&bytes[0]===0xff&&bytes[1]===0xd8){
    let offset=2;
    while(offset+9<bytes.length){
      if(bytes[offset]!==0xff){offset++;continue}
      const marker=bytes[offset+1];
      if(marker===0xd8||marker===0xd9){offset+=2;continue}
      if(offset+4>bytes.length) break;
      const length=(bytes[offset+2]<<8)|bytes[offset+3];
      if(length<2||offset+2+length>bytes.length) break;
      if([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker)) return {type:'image/jpeg',height:(bytes[offset+5]<<8)|bytes[offset+6],width:(bytes[offset+7]<<8)|bytes[offset+8]};
      offset+=2+length;
    }
  }
  return null;
}

async function verifyTurnstile(token,request,env){
  if(!token) return false;
  const body=new URLSearchParams({secret:env.TURNSTILE_SECRET_KEY,response:token,remoteip:visitorKey(request)});
  const response=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body,signal:AbortSignal.timeout(12000)});
  if(!response.ok) return false;
  const result=await response.json();
  return result.success===true&&result.action==='visualizer_generate'&&allowedHosts(env).has(String(result.hostname||'').toLowerCase());
}

function editPrompt(selections,notes){
  return `Photorealistically edit this customer-supplied home or garage photo. Change only the ${ENUMS.opening[selections.opening]}. Install a ${ENUMS.style[selections.style]} with ${ENUMS.color[selections.color]} and ${ENUMS.windows[selections.windows]}. Preserve the home's architecture, siding, trim, roof, driveway, landscaping, lighting, camera viewpoint, perspective, people, vehicles, and surroundings unless a tiny opening detail must change to make the garage door plausible. Keep the original number, size, and location of garage openings. Make panel proportions, tracks, glazing, shadows, reflections, and fit physically believable. Do not add signs, words, logos, watermarks, extra openings, separate pedestrian doors, or separate sidelights. This is a conceptual garage-door visualization, not a manufacturer-specific product rendering.${notes?` Customer appearance note: ${notes}`:''}`;
}

async function readLimitedJson(response,maxBytes){
  const declared=Number(response.headers.get('Content-Length')||0);
  if(declared>maxBytes) throw new Error('upstream_response_too_large');
  if(!response.body) return response.json();
  const reader=response.body.getReader();const chunks=[];let total=0;
  while(true){const {done,value}=await reader.read();if(done) break;total+=value.byteLength;if(total>maxBytes){await reader.cancel();throw new Error('upstream_response_too_large')}chunks.push(value)}
  const bytes=new Uint8Array(total);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength}
  return JSON.parse(new TextDecoder().decode(bytes));
}

async function openAIRequest(url,options,timeoutMs,stage,internalId){
  const response=await fetch(url,{...options,signal:AbortSignal.timeout(timeoutMs)});
  if(!response.ok){
    console.error(JSON.stringify({stage,status:response.status,requestId:internalId,openaiRequestId:response.headers.get('x-request-id')||undefined}));
    throw new Error(`${stage}_failed`);
  }
  return response;
}

async function generateImage(photo,selections,notes,env,internalId){
  const body=new FormData();
  body.set('model','gpt-image-2.5-sunburst');
  body.append('image[]',photo,'garage-photo.jpg');
  body.set('prompt',editPrompt(selections,notes));
  body.set('size','auto');body.set('quality','medium');body.set('output_format','jpeg');body.set('output_compression','85');body.set('moderation','auto');
  const response=await openAIRequest('https://api.openai.com/v1/images/edits',{method:'POST',headers:{Authorization:`Bearer ${env.OPENAI_API_KEY}`},body},150000,'image',internalId);
  const payload=await readLimitedJson(response,MAX_OPENAI_JSON_BYTES);
  const imageBase64=payload?.data?.[0]?.b64_json;
  if(typeof imageBase64!=='string'||!imageBase64||imageBase64.length>MAX_IMAGE_BASE64) throw new Error('image_payload_invalid');
  return imageBase64;
}

const MATCH_SCHEMA={
  type:'object',additionalProperties:false,required:['summary','concept_tags','verify_tags','matches'],properties:{
    summary:{type:'string',maxLength:320},
    concept_tags:{type:'array',maxItems:8,items:{type:'string',enum:['modern','traditional','carriage','full-view','raised','recessed','flush','wood-look','top-row','side-left','side-right','side-both','every-section','none','black','white','dark-bronze','gray']}},
    verify_tags:{type:'array',maxItems:6,items:{type:'string',enum:['color','glass','panel-pattern','window-layout','opening-fit','material','availability']}},
    matches:{type:'array',maxItems:3,items:{type:'object',additionalProperties:false,required:['id','reason'],properties:{id:{type:'string',enum:PRODUCT_CATALOG.map(product=>product.id)},reason:{type:'string',maxLength:220}}}}
  }
};

function extractOutputText(payload){
  if(typeof payload.output_text==='string') return payload.output_text;
  for(const item of payload.output||[]) for(const content of item.content||[]) if(content.type==='output_text'&&typeof content.text==='string') return content.text;
  return '';
}

function fallbackMatches(selections){
  const windowTag=selections.windows==='full-view'?'full-view-window':selections.windows;
  return PRODUCT_CATALOG.map(product=>{
    const meaningful=[selections.style,windowTag].filter(tag=>product.tags.includes(tag));
    const color=product.tags.includes(selections.color)?1:0;
    return {product,meaningful,score:meaningful.length*5+color};
  }).filter(item=>item.meaningful.length).sort((a,b)=>b.score-a.score).slice(0,3).map(item=>item.product.id);
}

async function recommend(imageBase64,selections,env,internalId){
  const catalog=PRODUCT_CATALOG.map(product=>({id:product.id,manufacturer:product.manufacturer,collection:product.collection,category:product.category,tags:product.tags}));
  const body={
    model:'gpt-5.4-mini-2026-03-17',store:false,
    input:[
      {role:'system',content:[{type:'input_text',text:'You match an AI garage-door concept to a server-controlled dealer catalog. Select only catalog IDs supplied by the user. A match means overlapping structural style, panel language, or glass layout; color alone is never enough. Do not claim the concept is an exact manufacturer product. Summarize the visible concept briefly and identify details LIFTX must verify.'}]},
      {role:'user',content:[{type:'input_text',text:JSON.stringify({requested:selections,catalog})},{type:'input_image',image_url:`data:image/jpeg;base64,${imageBase64}`,detail:'low'}]}
    ],
    text:{format:{type:'json_schema',name:'liftx_product_matches',strict:true,schema:MATCH_SCHEMA}}
  };
  const response=await openAIRequest('https://api.openai.com/v1/responses',{method:'POST',headers:{Authorization:`Bearer ${env.OPENAI_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify(body)},45000,'recommendation',internalId);
  const payload=await readLimitedJson(response,1024*1024);
  const parsed=JSON.parse(extractOutputText(payload));
  const reasons=Object.fromEntries((parsed.matches||[]).map(match=>[match.id,match.reason]));
  const windowTag=selections.windows==='full-view'?'full-view-window':selections.windows;
  const validIds=(parsed.matches||[]).map(match=>match.id).filter(id=>{const product=CATALOG_BY_ID.get(id);return product&&(product.tags.includes(selections.style)||product.tags.includes(windowTag))});
  return {summary:String(parsed.summary||'Your conceptual garage-door direction is ready.').slice(0,320),matches:hydrateMatches(validIds,reasons),needsHumanHelp:validIds.length<(parsed.matches||[]).length};
}

async function handleGenerate(request,env){
  if(!isVisualizerEnabled(env)) return json({error:'The visualizer is not enabled yet.'},503);
  if(!validOrigin(request,env)||request.headers.get('X-LIFTX-Visualizer')!=='1') return json({error:'Request not allowed.'},403);
  const contentType=request.headers.get('Content-Type')||'';
  const contentLength=Number(request.headers.get('Content-Length')||0);
  if(!contentType.toLowerCase().startsWith('multipart/form-data;')||!contentLength||contentLength>MAX_REQUEST_BYTES) return json({error:'The upload is missing or too large.'},413);
  if(!await applyLimit(env.VISUALIZER_RATE_LIMITER,visitorKey(request))) return json({error:'Please wait a minute before generating another concept.'},429,{'Retry-After':'60'});

  let form;
  try{form=await request.formData()}catch(_error){return json({error:'The upload could not be read.'},400)}
  const photo=form.get('photo');
  if(!(photo instanceof File)||!photo.size||photo.size>MAX_PHOTO_BYTES) return json({error:'Choose a photo under 8 MB.'},400);
  const bytes=new Uint8Array(await photo.arrayBuffer());
  const dimensions=imageDimensions(bytes);
  if(!dimensions||dimensions.type!==photo.type||!dimensions.width||!dimensions.height||Math.max(dimensions.width,dimensions.height)>MAX_EDGE||dimensions.width*dimensions.height>MAX_PIXELS) return json({error:'Use a valid JPEG, PNG, or WebP photo under 20 megapixels.'},400);
  const selections={opening:enumValue(form,'opening'),style:enumValue(form,'style'),color:enumValue(form,'color'),windows:enumValue(form,'windows')};
  if(Object.values(selections).some(value=>!value)) return json({error:'Choose each visualizer option.'},400);
  const notes=textValue(form,'notes',600).replace(/[\u0000-\u001f\u007f]/g,' ');
  let turnstileOK=false;
  try{turnstileOK=await verifyTurnstile(textValue(form,'turnstileToken',2048),request,env)}catch(_error){}
  if(!turnstileOK) return json({error:'Verification failed. Please refresh and try again.'},403);
  if(!await applyLimit(env.VISUALIZER_GLOBAL_RATE_LIMITER,'visualizer')) return json({error:'The visualizer is busy right now. Please try again shortly.'},429,{'Retry-After':'60'});

  const internalId=crypto.randomUUID();
  let imageBase64;
  try{imageBase64=await generateImage(new File([bytes],'garage-photo.jpg',{type:dimensions.type}),selections,notes,env,internalId)}
  catch(error){console.error(JSON.stringify({stage:'image-result',requestId:internalId,code:error.message}));return json({error:'The concept could not be generated. Please try another photo or description.'},502)}

  let recommendation;
  try{recommendation=await recommend(imageBase64,selections,env,internalId)}
  catch(error){
    console.error(JSON.stringify({stage:'recommendation-result',requestId:internalId,code:error.message}));
    const fallbackIds=fallbackMatches(selections);
    recommendation={summary:'Your conceptual garage-door direction is ready. LIFTX should verify the buildable product details and closest collection.',matches:hydrateMatches(fallbackIds),needsHumanHelp:true};
  }
  return json({imageBase64,mimeType:'image/jpeg',catalogVersion:CATALOG_VERSION,...recommendation});
}

export default{
  async fetch(request,env){
    const url=new URL(request.url);
    if(url.pathname==='/api/visualizer/config'&&request.method==='GET') return json({enabled:isVisualizerEnabled(env),turnstileSiteKey:isVisualizerEnabled(env)?env.TURNSTILE_SITE_KEY:null});
    if(url.pathname==='/api/visualizer/generate'&&request.method==='POST') return handleGenerate(request,env);
    if(url.pathname.startsWith('/api/visualizer/')) return json({error:'Not found.'},404);
    return env.ASSETS.fetch(request);
  }
};
