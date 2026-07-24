
const toggle=document.querySelector('.menu-toggle');
const menu=document.querySelector('.mobile-menu');
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
