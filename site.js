const toggle=document.querySelector('.menu-toggle');
const menu=document.querySelector('.mobile-menu');

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
