const toggle=document.querySelector('.menu-toggle');
const menu=document.querySelector('.mobile-menu');

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
