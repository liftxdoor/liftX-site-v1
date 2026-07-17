const categoryGrid=document.getElementById('category-grid');
const categoryHome=document.getElementById('category-home');
const categoryView=document.getElementById('category-view');
const categoryTitle=document.getElementById('category-title');
const categoryDescription=document.getElementById('category-description');
const accordion=document.getElementById('accordion-list');
const backButton=document.getElementById('back-button');
const searchInput=document.getElementById('faq-search');
const clearSearch=document.getElementById('clear-search');
const searchResults=document.getElementById('search-results');
const resultList=document.getElementById('result-list');
const resultCount=document.getElementById('result-count');
let categories=[];

function itemMarkup(question,answer){
  const wrap=document.createElement('article');
  wrap.className='faq-item';
  wrap.innerHTML=`<button class="faq-question" type="button" aria-expanded="false"><span>${question}</span><span class="faq-plus">+</span></button><div class="faq-answer">${answer}</div>`;
  const btn=wrap.querySelector('.faq-question');
  btn.addEventListener('click',()=>{
    const open=wrap.classList.toggle('open');
    btn.setAttribute('aria-expanded',String(open));
  });
  return wrap;
}
function renderCategories(){
  categoryGrid.innerHTML='';
  categories.forEach(cat=>{
    const btn=document.createElement('button');
    btn.className='faq-category';
    btn.type='button';
    btn.innerHTML=`<span class="faq-icon">${cat.icon}</span><h3>${cat.title}</h3><p>${cat.desc}</p><b>View questions →</b>`;
    btn.addEventListener('click',()=>openCategory(cat));
    categoryGrid.appendChild(btn);
  });
}
function openCategory(cat){
  categoryHome.hidden=true;searchResults.hidden=true;categoryView.hidden=false;
  categoryTitle.textContent=cat.title;categoryDescription.textContent=cat.desc;accordion.innerHTML='';
  cat.questions.forEach(([q,a])=>accordion.appendChild(itemMarkup(q,a)));
  window.scrollTo({top:document.querySelector('.faq-shell').offsetTop-80,behavior:'smooth'});
}
function showHome(){
  categoryView.hidden=true;searchResults.hidden=true;categoryHome.hidden=false;searchInput.value='';clearSearch.hidden=true;
}
function runSearch(){
  const q=searchInput.value.trim().toLowerCase();
  clearSearch.hidden=!q;
  if(!q){showHome();return;}
  categoryHome.hidden=true;categoryView.hidden=true;searchResults.hidden=false;resultList.innerHTML='';
  const matches=[];
  categories.forEach(cat=>cat.questions.forEach(([question,answer])=>{
    if(`${question} ${answer} ${cat.title}`.toLowerCase().includes(q))matches.push({question,answer});
  }));
  resultCount.textContent=`${matches.length} matching question${matches.length===1?'':'s'}.`;
  if(!matches.length){resultList.innerHTML='<p class="no-results">No exact match. Try a broader word or text LIFTX.</p>';return;}
  matches.forEach(m=>resultList.appendChild(itemMarkup(m.question,m.answer)));
}
backButton.addEventListener('click',showHome);
searchInput.addEventListener('input',runSearch);
clearSearch.addEventListener('click',showHome);
fetch('faq-data.json').then(r=>r.json()).then(data=>{categories=data;renderCategories();}).catch(()=>{categoryGrid.innerHTML='<p>FAQ content could not load. Please text or call LIFTX.</p>';});
