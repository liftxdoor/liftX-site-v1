const toggle=document.querySelector('.menu-toggle');
const menu=document.querySelector('.mobile-menu');

if(!document.querySelector('link[href="brand-navigation.css"]')){
  const brandStyles=document.createElement('link');
  brandStyles.rel='stylesheet';
  brandStyles.href='brand-navigation.css';
  document.head.appendChild(brandStyles);
}

const brandEntries=[
  {
    slug:'amarr-garage-doors-boise',
    name:'Amarr',
    logo:'assets/brands/amarr-logo.svg'
  },
  {
    slug:'clopay-garage-doors-boise',
    name:'Clopay',
    logo:'assets/brands/Clopay-GoldBar_RGB.png'
  },
  {
    slug:'wayne-dalton-garage-doors-boise',
    name:'Wayne Dalton'
  }
];

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

if(currentBrand&&heroCopy&&!heroCopy.querySelector('.manufacturer-hero-brand')){
  const heroBrand=document.createElement('div');
  heroBrand.className='manufacturer-hero-brand';

  if(currentBrand.logo){
    const image=document.createElement('img');
    image.src=currentBrand.logo;
    image.alt=`${currentBrand.name} logo`;
    heroBrand.appendChild(image);
  }else{
    heroBrand.classList.add('manufacturer-hero-brand-text');
    heroBrand.textContent=currentBrand.name;
    heroBrand.setAttribute('aria-label',currentBrand.name);
  }

  heroCopy.insertBefore(heroBrand,heroCopy.firstChild);
}

if(menu&&!menu.querySelector('.mobile-socials')){
  const socialRow=document.createElement('div');
  socialRow.className='mobile-socials';
  socialRow.innerHTML=`
    <span class="mobile-social-label">Follow LIFTX</span>
    <div class="mobile-social-icons">
      <a class="mobile-social-link" href="https://www.instagram.com/liftxdoor/" target="_blank" rel="noopener" aria-label="LIFTX on Instagram">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5"></rect>
          <circle cx="12" cy="12" r="4"></circle>
          <circle cx="17.5" cy="6.5" r="1"></circle>
        </svg>
      </a>
      <a class="mobile-social-link" href="https://www.facebook.com/p/LiftX-Door-Systems-61573926893748/" target="_blank" rel="noopener" aria-label="LIFTX on Facebook">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.7.3-1 1-1z"></path>
        </svg>
      </a>
    </div>`;
  menu.appendChild(socialRow);
}

if(toggle&&menu){
  toggle.addEventListener('click',()=>{
    const open=menu.classList.toggle('open');
    document.body.classList.toggle('menu-open',open);
    toggle.setAttribute('aria-expanded',String(open));
    menu.setAttribute('aria-hidden',String(!open));
  });

  menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    menu.classList.remove('open');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded','false');
    menu.setAttribute('aria-hidden','true');
  }));
}
