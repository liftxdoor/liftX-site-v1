import test from 'node:test';
import assert from 'node:assert/strict';
import worker,{imageDimensions,isVisualizerEnabled} from '../worker/index.js';

function limiter(success=true){return {calls:[],async limit(input){this.calls.push(input);return {success}}}}

function env(overrides={}){
  return {
    VISUALIZER_ENABLED:'true',OPENAI_API_KEY:'test-key',TURNSTILE_SITE_KEY:'site-key',TURNSTILE_SECRET_KEY:'secret-key',
    VISUALIZER_RATE_LIMITER:limiter(),VISUALIZER_GLOBAL_RATE_LIMITER:limiter(),
    ASSETS:{async fetch(request){return new Response(`asset:${new URL(request.url).pathname}`)}},
    ...overrides
  };
}

function png(width=100,height=80){
  const bytes=new Uint8Array(24);bytes.set([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a],0);
  bytes.set([0x49,0x48,0x44,0x52],12);
  new DataView(bytes.buffer).setUint32(16,width);new DataView(bytes.buffer).setUint32(20,height);
  return bytes;
}

async function generateRequest(overrides={}){
  const body=new FormData();
  body.set('photo',new File([png()],'garage.png',{type:'image/png'}));
  body.set('opening','garage-door');body.set('style','modern');body.set('color','black');body.set('windows','side-left');body.set('notes','Keep the brick exactly the same.');body.set('turnstileToken','token');
  for(const [key,value] of Object.entries(overrides.fields||{})) body.set(key,value);
  const draft=new Request('https://www.liftxdoor.com/api/visualizer/generate',{method:'POST',headers:{Origin:'https://www.liftxdoor.com','X-LIFTX-Visualizer':'1'},body});
  const bytes=await draft.arrayBuffer();
  return new Request(draft.url,{method:'POST',headers:{Origin:overrides.origin||'https://www.liftxdoor.com','X-LIFTX-Visualizer':overrides.customHeader??'1','Content-Type':draft.headers.get('Content-Type'),'Content-Length':String(bytes.byteLength),'CF-Connecting-IP':'203.0.113.9'},body:bytes});
}

function okFetch({matches=[{id:'clopay-modern-steel',reason:'Clean modern panels and left-side glazing overlap with this collection.'}],summary='A black modern sectional door with slim left-side glass.'}={}){
  const calls=[];
  const fetchMock=async(url,options={})=>{
    calls.push({url:String(url),options});
    if(String(url).includes('siteverify')) return Response.json({success:true,action:'visualizer_generate',hostname:'www.liftxdoor.com'});
    if(String(url).endsWith('/v1/images/edits')) return Response.json({data:[{b64_json:'aGVsbG8='}]},{headers:{'x-request-id':'img_req'}});
    if(String(url).endsWith('/v1/responses')) return Response.json({output:[{content:[{type:'output_text',text:JSON.stringify({summary,concept_tags:['modern','side-left','black'],verify_tags:['color','glass','opening-fit'],matches})}]}]},{headers:{'x-request-id':'rec_req'}});
    throw new Error(`Unexpected fetch: ${url}`);
  };
  fetchMock.calls=calls;return fetchMock;
}

test('disabled config fails closed and enabled check is a boolean',async()=>{
  const disabled=env({VISUALIZER_ENABLED:'false'});
  assert.equal(isVisualizerEnabled(disabled),false);
  assert.equal(typeof isVisualizerEnabled(disabled),'boolean');
  const response=await worker.fetch(new Request('https://www.liftxdoor.com/api/visualizer/config'),disabled);
  assert.deepEqual(await response.json(),{enabled:false,turnstileSiteKey:null});
});

test('static and unrelated API routes stay on the ASSETS binding',async()=>{
  const e=env();
  assert.equal(await (await worker.fetch(new Request('https://www.liftxdoor.com/garage-door-brands'),e)).text(),'asset:/garage-door-brands');
  assert.equal(await (await worker.fetch(new Request('https://www.liftxdoor.com/api/google-reviews'),e)).text(),'asset:/api/google-reviews');
});

test('foreign origins and missing custom header are rejected',async()=>{
  const e=env();
  assert.equal((await worker.fetch(await generateRequest({origin:'https://evil.example'}),e)).status,403);
  assert.equal((await worker.fetch(await generateRequest({customHeader:'0'}),e)).status,403);
});

test('visitor limiter runs before Turnstile and upstream calls',async()=>{
  const e=env({VISUALIZER_RATE_LIMITER:limiter(false)});let called=false;const previous=globalThis.fetch;globalThis.fetch=async()=>{called=true;throw new Error('should not run')};
  try{const response=await worker.fetch(await generateRequest(),e);assert.equal(response.status,429);assert.equal(called,false);assert.equal(e.VISUALIZER_GLOBAL_RATE_LIMITER.calls.length,0)}finally{globalThis.fetch=previous}
});

test('failed Turnstile does not consume the aggregate limit',async()=>{
  const e=env();const previous=globalThis.fetch;globalThis.fetch=async()=>Response.json({success:false});
  try{const response=await worker.fetch(await generateRequest(),e);assert.equal(response.status,403);assert.equal(e.VISUALIZER_GLOBAL_RATE_LIMITER.calls.length,0)}finally{globalThis.fetch=previous}
});

test('valid generation keeps secrets server-side and hydrates catalog facts',async()=>{
  const e=env();const previous=globalThis.fetch;const mock=okFetch();globalThis.fetch=mock;
  try{
    const response=await worker.fetch(await generateRequest(),e);assert.equal(response.status,200);
    const data=await response.json();assert.equal(data.matches[0].collection,'Modern Steel');assert.equal(data.matches[0].productUrl,'https://www.clopaydoor.com/modern-steel-collection');assert.equal(data.imageBase64,'aGVsbG8=');
    const imageCall=mock.calls.find(call=>call.url.endsWith('/v1/images/edits'));const imageBody=imageCall.options.body;
    assert.equal(imageCall.options.headers.Authorization,'Bearer test-key');assert.equal(imageBody.get('model'),'gpt-image-2.5-sunburst');assert.match(imageBody.get('prompt'),/Preserve the home's architecture/);assert.match(imageBody.get('prompt'),/slim rectangular windows stacked vertically within the left side/);
    const recommendationCall=mock.calls.find(call=>call.url.endsWith('/v1/responses'));const recommendationBody=JSON.parse(recommendationCall.options.body);
    assert.equal(recommendationBody.model,'gpt-5.4-mini-2026-03-17');assert.equal(recommendationBody.store,false);assert.equal(recommendationBody.text.format.strict,true);assert.equal(Object.hasOwn(recommendationBody.text.format.schema.properties.matches.items,'uniqueItems'),false);
    assert.equal(JSON.stringify(data).includes('test-key'),false);
  }finally{globalThis.fetch=previous}
});

test('color-only AI suggestions are omitted and flagged for human help',async()=>{
  const e=env();const previous=globalThis.fetch;globalThis.fetch=okFetch({matches:[{id:'clopay-classic-steel',reason:'It is black.'}]});
  try{const data=await (await worker.fetch(await generateRequest(),e)).json();assert.equal(data.matches.length,0);assert.equal(data.needsHumanHelp,true)}finally{globalThis.fetch=previous}
});

test('recommendation failure preserves the generated image with safe fallback paths',async()=>{
  const e=env();const previous=globalThis.fetch;const mock=okFetch();globalThis.fetch=async(url,options)=>{if(String(url).endsWith('/v1/responses')) return new Response('failed',{status:500,headers:{'x-request-id':'rec_fail'}});return mock(url,options)};
  try{const response=await worker.fetch(await generateRequest(),e);assert.equal(response.status,200);const data=await response.json();assert.equal(data.imageBase64,'aGVsbG8=');assert.equal(data.needsHumanHelp,true);assert.ok(data.matches.length>0)}finally{globalThis.fetch=previous}
});

test('JPEG, PNG, and WebP headers are dimension-checked',()=>{
  assert.deepEqual(imageDimensions(png(640,480)),{type:'image/png',width:640,height:480});
  const jpeg=Uint8Array.from([0xff,0xd8,0xff,0xc0,0x00,0x11,0x08,0x01,0xe0,0x02,0x80,0x03,0x01,0x11,0x00,0x02,0x11,0x00,0x03,0x11,0x00,0xff,0xd9]);
  assert.deepEqual(imageDimensions(jpeg),{type:'image/jpeg',width:640,height:480});
  const webp=new Uint8Array(30);webp.set([...Buffer.from('RIFF')],0);webp.set([...Buffer.from('WEBPVP8X')],8);webp[24]=0x7f;webp[25]=0x02;webp[27]=0xdf;webp[28]=0x01;
  assert.deepEqual(imageDimensions(webp),{type:'image/webp',width:640,height:480});
});

test('spoofed image MIME is rejected before OpenAI',async()=>{
  const request=await generateRequest();const body=await request.formData();body.set('photo',new File([new TextEncoder().encode('not an image')],'fake.png',{type:'image/png'}));
  const draft=new Request(request.url,{method:'POST',headers:{Origin:'https://www.liftxdoor.com','X-LIFTX-Visualizer':'1'},body});const bytes=await draft.arrayBuffer();
  const rebuilt=new Request(draft.url,{method:'POST',headers:{Origin:'https://www.liftxdoor.com','X-LIFTX-Visualizer':'1','Content-Type':draft.headers.get('Content-Type'),'Content-Length':String(bytes.byteLength)},body:bytes});
  let called=false;const previous=globalThis.fetch;globalThis.fetch=async()=>{called=true;throw new Error('not expected')};
  try{const response=await worker.fetch(rebuilt,env());assert.equal(response.status,400);assert.equal(called,false)}finally{globalThis.fetch=previous}
});
