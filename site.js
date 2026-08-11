const toggle=document.querySelector('.menu-toggle');
const menu=document.querySelector('.mobile-menu');
const isHomepage=location.pathname==='/'||location.pathname==='/index.html';

const brandEntries=[
  {slug:'amarr-garage-doors-boise',name:'Amarr',logo:'assets/brands/amarr-logo.svg'},
  {slug:'clopay-garage-doors-boise',name:'Clopay',logo:'assets/brands/Clopay-GoldBar_RGB.png'},
  {slug:'wayne-dalton-garage-doors-boise',name:'Wayne Dalton'}
];

function runNonCriticalEnhancements(){
  document.querySelectorAll('.nav-dropmenu a').forEach(link=>{
    const href=(link.getAttribute('href')||'').toLowerCase();
    const brand=brandEntries.find(item=>href.includes(item.slug));
    if(!brand||link.classList.contains('nav-brand-entry')) return;
    link.classList.add('nav-brand-entry');
    link.textContent='';
    if(brand.logo){
      const mark=document.createElement('span');
      mark.className='nav-brand-mark';
      const image=document.createElement('img');
      image.src=brand.logo;
      image.alt='';
      image.setAttribute('aria-hidden','true');
      mark.appendChild(image);
      link.appendChild(mark);
    }
    const name=document.createElement('span');
    name.className='nav-brand-name';
    name.textContent=brand.name;
    link.appendChild(name);
  });

  const currentPath=window.location.pathname.toLowerCase();
  const currentBrand=brandEntries.find(item=>currentPath.includes(item.slug));
  const heroCopy=document.querySelector('.page-hero-copy');
  if(currentBrand?.logo&&heroCopy&&!heroCopy.querySelector('.manufacturer-hero-brand')){
    const heroBrand=document.createElement('div');
    heroBrand.className='manufacturer-hero-brand';
    const image=document.createElement('img');
    image.src=currentBrand.logo;
    image.alt=`${currentBrand.name} logo`;
    heroBrand.appendChild(image);
    heroCopy.insertBefore(heroBrand,heroCopy.firstChild);
  }

  document.querySelectorAll('a').forEach(link=>{
    if(link.textContent.trim()==='Design a Amarr Door') link.textContent='Design an Amarr Door';
    const href=link.getAttribute('href')||'';
    const isManufacturerTool=/^https:\/\/(www\.)?(amarr\.com|clopaydoor\.com|wayne-dalton\.com|designcentre\.garaga\.com|haasdoor\.com|liftmaster\.com)\//i.test(href);
    if(isManufacturerTool){link.target='_blank';link.rel='noopener';}
  });

  if(menu&&!menu.querySelector('.mobile-socials')){
    const socialRow=document.createElement('div');
    socialRow.className='mobile-socials';
    socialRow.innerHTML=`<span class="mobile-social-label">Follow LIFTX</span><div class="mobile-social-icons"><a class="mobile-social-link" href="https://www.instagram.com/liftxdoor/" target="_blank" rel="noopener" aria-label="LIFTX on Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1"></circle></svg></a><a class="mobile-social-link" href="https://www.facebook.com/p/LiftX-Door-Systems-61573926893748/" target="_blank" rel="noopener" aria-label="LIFTX on Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.7.3-1 1-1z"></path></svg></a></div>`;
    menu.appendChild(socialRow);
  }
}

if(isHomepage){
  window.addEventListener('load',()=>setTimeout(runNonCriticalEnhancements,1500),{once:true});
}else{
  runNonCriticalEnhancements();
}

document.querySelectorAll('.nav-dropdown').forEach(dropdown=>{
  const button=dropdown.querySelector('.nav-dropbtn');
  const panel=dropdown.querySelector('.nav-dropmenu');
  if(!button||!panel) return;
  const setDropdown=(open,{focusButton=false}={})=>{
    dropdown.classList.toggle('open',open);
    button.setAttribute('aria-expanded',String(open));
    if(focusButton) button.focus();
  };
  button.addEventListener('click',event=>{event.preventDefault();setDropdown(!dropdown.classList.contains('open'));});
  dropdown.addEventListener('mouseenter',()=>button.setAttribute('aria-expanded','true'));
  dropdown.addEventListener('mouseleave',()=>{if(!dropdown.classList.contains('open')) button.setAttribute('aria-expanded','false');});
  dropdown.addEventListener('focusin',()=>button.setAttribute('aria-expanded','true'));
  dropdown.addEventListener('focusout',event=>{if(!dropdown.contains(event.relatedTarget)&&!dropdown.classList.contains('open')) button.setAttribute('aria-expanded','false');});
  dropdown.addEventListener('keydown',event=>{if(event.key==='Escape') setDropdown(false,{focusButton:true});});
  document.addEventListener('click',event=>{if(!dropdown.contains(event.target)) setDropdown(false);});
});

if(toggle&&menu){
  const setMenu=(open,{returnFocus=false}={})=>{
    if(!open&&menu.contains(document.activeElement)) toggle.focus({preventScroll:true});
    menu.classList.toggle('open',open);
    document.body.classList.toggle('menu-open',open);
    toggle.setAttribute('aria-expanded',String(open));
    menu.setAttribute('aria-hidden',String(!open));
    menu.toggleAttribute('inert',!open);
    toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
    if(returnFocus) toggle.focus();
  };
  toggle.addEventListener('click',()=>setMenu(!menu.classList.contains('open')));
  menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.classList.contains('open')) setMenu(false,{returnFocus:true});});
  window.matchMedia('(min-width: 961px)').addEventListener('change',event=>{if(event.matches) setMenu(false);});
}

const footerIsEnhanced=document.querySelector('.footer-contact')&&document.querySelector('.footer-built-logo');
if(!footerIsEnhanced) import('/footer-enhancements.js').catch(()=>{});
