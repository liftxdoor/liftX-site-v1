const FAQ_DATA=[{"id": "repair", "icon": "⚙", "title": "Repairs & Service", "desc": "Springs, cables, off-track doors, temporary repairs, and scheduling.", "questions": [["Can I use a door with a broken spring?", "No. A broken spring removes part or all of the door’s counterbalance. Operating the door can damage the opener, cables, sections, or hardware and can create a safety hazard."], ["Does LIFTX replace both springs?", "On a two-spring system, LIFTX generally replaces the pair. Both springs have usually completed the same number of cycles, and replacing only one can leave an uneven or short-lived repair."], ["Can a damaged door be repaired temporarily?", "Sometimes. When a safe temporary repair is possible, LIFTX explains what it will and will not accomplish and what permanent work is still required."], ["Is same-day service available?", "Often, depending on location, workload, parts, and the type of failure. LIFTX gives the most realistic arrival window available."]]}, {"id": "pricing", "icon": "$", "title": "Pricing & Estimates", "desc": "First-hour labor, phone estimates, written quotes, and travel.", "questions": [["How does the first hour of labor work?", "The first hour is charged in full when LIFTX arrives. Whether the visit takes 15 minutes or 55 minutes, the first hour is the same. Additional labor is not charged until the next hour begins."], ["Can LIFTX estimate over the phone?", "In many cases, LIFTX can provide minimum pricing or a realistic range. Some conditions still require an on-site inspection before the exact repair and price can be confirmed."], ["Can I send photos or video?", "Yes. Photos or a short video can help identify the likely issue, product label, or parts and can make scheduling more efficient."], ["Does LIFTX price match?", "LIFTX will review legitimate written estimates when the product, installation scope, and warranty are reasonably comparable."]]}, {"id": "doors", "icon": "▤", "title": "New Doors & Full-View", "desc": "Selection, insulation, glass, colors, measurements, and ordering.", "questions": [["What is a Full-View door?", "A Full-View door uses aluminum framing with large glass or acrylic sections. It can be configured for modern residential, studio, showroom, restaurant, commercial, and specialty applications."], ["How do I choose a new door?", "Start with the opening, application, insulation needs, budget, exterior style, and desired maintenance. LIFTX then narrows the product and construction options that fit."], ["Can I design the door online first?", "Yes. The Brands page links to official manufacturer design tools. LIFTX verifies the actual product, size, options, and availability before ordering."], ["How long do new doors take?", "Lead time depends on the manufacturer, model, size, options, finish, and current production schedule. Timing is confirmed as closely as possible before the order is placed."]]}, {"id": "operators", "icon": "⌁", "title": "Openers & Operators", "desc": "Residential openers, wall-mount systems, controls, and commercial operators.", "questions": [["Should I replace the opener when I replace the door?", "Not automatically. LIFTX checks whether the existing opener is compatible, correctly sized, safe, and in reasonable condition."], ["Can LIFTX install a wall-mount opener?", "Yes, when the door, shaft, track configuration, side room, power, and structure are compatible."], ["Why does the door work manually but not with the opener?", "The issue may involve controls, photo eyes, travel limits, force settings, wiring, the trolley, or the operator itself. The complete system should be tested before replacement is recommended."]]}, {"id": "warranty", "icon": "◇", "title": "Warranty & Maintenance", "desc": "Craftsmanship coverage, manufacturer warranties, and maintenance visits.", "questions": [["What is the LIFTX workmanship warranty?", "LIFTX provides a one-year craftsmanship and installation warranty for qualifying work unless different written terms are provided for the project."], ["What does the manufacturer cover?", "Manufacturer warranties apply separately to eligible doors, operators, springs, electronics, windows, and other components. Coverage varies by product."], ["What can affect workmanship coverage?", "Third-party service or adjustment, structural movement, impact, abuse, weather-related damage, and conditions outside LIFTX workmanship may affect coverage."]]}, {"id": "commercial", "icon": "▦", "title": "Commercial & Builders", "desc": "Commercial systems, plans, scheduling, and larger installations.", "questions": [["Does LIFTX work on commercial doors?", "Yes. LIFTX services and installs commercial sectional doors, operators, rolling and specialty systems, and related controls and hardware."], ["Can LIFTX quote from plans?", "Yes. Plans, schedules, elevations, specifications, and opening information help develop an initial scope. Field verification may still be required before ordering."], ["Can LIFTX coordinate multi-door projects?", "Yes. LIFTX can coordinate product selection, openings, lead times, delivery, installation sequencing, operators, controls, and closeout requirements."]]}, {"id": "trust", "icon": "✓", "title": "Recommendations & Trust", "desc": "How LIFTX decides what to recommend and when replacement makes sense.", "questions": [["Does LIFTX upsell?", "No. LIFTX explains the condition, options, cost, and consequences, then lets the customer decide without pressure."], ["Will LIFTX say when a repair is not worth it?", "Yes. If repair makes sense, LIFTX recommends it. If replacement offers better long-term value, the reason is explained."], ["Will LIFTX recommend replacement just because the door is old?", "No. Age alone is not a reason to replace a door. Function, structural condition, safety, repair value, and the customer’s goals matter."]]}];

const grid=document.getElementById('category-grid');
const home=document.getElementById('category-home');
const view=document.getElementById('category-view');
const searchView=document.getElementById('search-results');
const list=document.getElementById('accordion-list');
const searchList=document.getElementById('result-list');
const title=document.getElementById('category-title');
const description=document.getElementById('category-description');
const search=document.getElementById('faq-search');
const clear=document.getElementById('clear-search');
const resultCount=document.getElementById('result-count');

function item(q,a){
  const el=document.createElement('article');
  el.className='faq-item';
  el.innerHTML=`<button class="faq-question" type="button" aria-expanded="false"><span>${q}</span><span class="faq-plus">+</span></button><div class="faq-answer">${a}</div>`;
  const button=el.querySelector('button');
  button.addEventListener('click',()=>{
    const open=el.classList.toggle('open');
    button.setAttribute('aria-expanded',String(open));
  });
  return el;
}
FAQ_DATA.forEach(cat=>{
  const button=document.createElement('button');
  button.className='category-card';
  button.type='button';
  button.innerHTML=`<span class="category-icon">${cat.icon}</span><h3>${cat.title}</h3><p>${cat.desc}</p><b>View questions →</b>`;
  button.addEventListener('click',()=>{
    home.hidden=true;searchView.hidden=true;view.hidden=false;
    title.textContent=cat.title;description.textContent=cat.desc;list.innerHTML='';
    cat.questions.forEach(([q,a])=>list.appendChild(item(q,a)));
    window.scrollTo({top:document.querySelector('.faq-main').offsetTop-70,behavior:'smooth'});
  });
  grid.appendChild(button);
});
document.getElementById('back-button').addEventListener('click',()=>{
  view.hidden=true;searchView.hidden=true;home.hidden=false;search.value='';clear.hidden=true;
});
function runSearch(){
  const term=search.value.trim().toLowerCase();
  clear.hidden=!term;
  if(!term){searchView.hidden=true;view.hidden=true;home.hidden=false;return;}
  home.hidden=true;view.hidden=true;searchView.hidden=false;searchList.innerHTML='';
  const matches=[];
  FAQ_DATA.forEach(cat=>cat.questions.forEach(([q,a])=>{
    if(`${cat.title} ${q} ${a}`.toLowerCase().includes(term))matches.push([q,a]);
  }));
  resultCount.textContent=`${matches.length} matching question${matches.length===1?'':'s'}.`;
  if(!matches.length){searchList.innerHTML='<p class="note">No exact match. Try a broader term or text LIFTX.</p>';return;}
  matches.forEach(([q,a])=>searchList.appendChild(item(q,a)));
}
search.addEventListener('input',runSearch);
clear.addEventListener('click',()=>{search.value='';runSearch();search.focus();});
