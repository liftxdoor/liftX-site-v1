import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';

const root=new URL('../',import.meta.url);
const pages=[
  'index.html',
  'residential.html',
  'commercial.html',
  'garage-door-repair-boise.html',
  'garage-door-installation-boise.html',
  'projects.html',
  'garage-door-brands.html',
  'common-questions.html',
  'builders-contractors.html',
  'warranty.html',
  'contact.html',
  'garage-door-openers-boise.html',
  'amarr-garage-doors-boise.html',
  'clopay-garage-doors-boise.html',
  'wayne-dalton-garage-doors-boise.html',
  'high-lift-garage-door-conversion-boise.html',
  'outwest-studios-full-view-doors-garden-city.html'
];

test('internal links never request a new browsing context',async()=>{
  for(const page of pages){
    const html=await readFile(new URL(page,root),'utf8');
    const anchors=[...html.matchAll(/<a\b([^>]*)>/gi)].map(match=>match[1]);
    for(const attributes of anchors){
      const href=attributes.match(/\bhref=["']([^"']+)["']/i)?.[1]||'';
      const target=attributes.match(/\btarget=["']([^"']+)["']/i)?.[1]||'';
      if(href.startsWith('/')&&!href.startsWith('//')){
        assert.notEqual(target.toLowerCase(),'_blank',`${page}: ${href}`);
      }
    }
  }
});

test('mobile menu teardown is deferred past native link activation',async()=>{
  const shared=await readFile(new URL('site.js',root),'utf8');
  const home=await readFile(new URL('index.html',root),'utf8');
  assert.match(shared,/link\.addEventListener\('click',[\s\S]*?window\.setTimeout\(\(\)=>setMenu\(false\),0\)/);
  assert.match(home,/link\.addEventListener\('click',[\s\S]*?window\.setTimeout\(\(\)=>setMenu\(false\),0\)/);
});

test('site code does not open navigation windows programmatically',async()=>{
  for(const file of ['site.js','footer-enhancements.js','index.html']){
    const source=await readFile(new URL(file,root),'utf8');
    assert.doesNotMatch(source,/\bwindow\.open\s*\(/,file);
  }
});
