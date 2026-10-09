const {chromium}=require('playwright');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const base=process.argv[2]||'http://127.0.0.1:8788';
const slug='/high-lift-garage-door-conversion-boise';

(async()=>{
  fs.mkdirSync('qa',{recursive:true});
  const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  const report=[];
  for(const [name,width,height] of [['small-phone',320,740],['phone',390,844],['tablet',768,1024],['desktop',1440,1000]]){
    const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    const response=await page.goto(base+slug,{waitUntil:'networkidle'});
    assert.equal(response.status(),200);
    await page.evaluate(()=>document.fonts.ready);
    const info=await page.evaluate(()=>({
      width:innerWidth,scrollWidth:document.documentElement.scrollWidth,
      h1:document.querySelectorAll('h1').length,
      canonical:document.querySelector('link[rel=canonical]').href,
      title:document.title,
      images:[...document.querySelectorAll('main img')].map(i=>({src:i.currentSrc,loaded:i.complete&&i.naturalWidth>0})),
      cta:[...document.querySelectorAll('main .btn')].map(a=>({text:a.textContent,width:a.getBoundingClientRect().width,height:a.getBoundingClientRect().height})),
      nav:[...document.querySelectorAll('.desktop-nav>a')].map(a=>a.textContent),
      schema:JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent)['@graph'].map(x=>x['@type'])
    }));
    assert.equal(info.scrollWidth,width,'Horizontal overflow at '+width);
    assert.equal(info.h1,1);
    assert.equal(info.canonical,'https://www.liftxdoor.com'+slug);
    assert(info.cta.every(a=>a.height>=44));
    assert(!info.nav.some(n=>n.includes('High-Lift')));
    for(const img of await page.locator('main img').all()) await img.scrollIntoViewIfNeeded();
    await page.locator('main img').last().evaluate(img=>img.decode());
    assert(await page.locator('main img').evaluateAll(imgs=>imgs.every(i=>i.naturalWidth>0)));
    await page.evaluate(()=>scrollTo(0,0));
    await page.screenshot({path:`qa/${name}-full.png`,fullPage:true});
    await page.screenshot({path:`qa/${name}-hero.png`});
    await page.locator('.faq-list summary').first().click();
    assert(await page.locator('.faq-list details').first().getAttribute('open')!==null);
    if(width<961){
      await page.locator('.menu-toggle').click();
      assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
    }
    await page.locator('main .btn-primary').first().click();
    await page.waitForURL('**/contact?source=high-lift#contact-form-card');
    assert.equal(await page.locator('#service').inputValue(),'High-Lift Conversion');
    assert.equal(await page.locator('#contact-source').inputValue(),'high-lift');
    assert((await page.locator('#message').inputValue()).includes('assessment'));
    assert.equal(await page.locator('#contact-form').getAttribute('action'),'https://formspree.io/f/mgogpvwg');
    assert.equal(errors.length,0,errors.join('\n'));
    report.push({name,...info,errors,assessmentFlow:'pass'});
    await page.close();
  }
  const page=await browser.newPage();
  await page.goto(base+slug);
  const links=await page.locator('main a[href^="/"]').evaluateAll(as=>[...new Set(as.map(a=>a.getAttribute('href').split('#')[0]))]);
  for(const href of links){const r=await page.request.get(base+href);assert.equal(r.status(),200,'Broken link: '+href);}
  for(const path of ['/residential','/commercial','/garage-door-openers-boise']){
    await page.goto(base+path);assert(await page.locator(`a[href="${slug}"]`).count()>0);
  }
  await page.goto(base+'/contact');
  assert.equal(await page.locator('#service').inputValue(),'Repair');
  await page.goto(base+'/contact?source=ai-visualizer&style=modern');
  assert.equal(await page.locator('#service').inputValue(),'New Door / Replacement');
  assert.equal(await page.locator('#contact-source').inputValue(),'ai-visualizer');
  fs.writeFileSync('qa/report.json',JSON.stringify(report,null,2));
  console.log(JSON.stringify({layouts:report.map(r=>({name:r.name,width:r.width,scrollWidth:r.scrollWidth,assessmentFlow:r.assessmentFlow})),linksChecked:links.length,existingContactFlows:'pass'},null,2));
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
