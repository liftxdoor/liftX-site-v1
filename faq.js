const FAQ_DATA = [
  {
    id: 'repair',
    icon: '⚙',
    title: 'Repairs & Service',
    desc: 'Broken springs, cables, off-track doors, temporary repairs, and scheduling.',
    questions: [
      [
        'How can I tell if my garage door spring is broken?',
        'Common signs include a visible gap in a torsion spring, a loud bang from the garage, a door that will not lift, or a door that suddenly feels much heavier than normal.',
      ],
      [
        'Can I use a door with a broken spring?',
        'No. A broken spring removes part or all of the door’s counterbalance. Operating the door can damage the opener, cables, sections, or hardware and can create a safety hazard.',
      ],
      [
        'Does LIFTX replace both springs?',
        'Yes. On a two-spring system, LIFTX replaces both springs as a matched pair. They have completed the same number of cycles, and replacing only the broken spring leaves the other spring near the end of the same service life.',
      ],
      [
        'How long does a garage door spring replacement take?',
        'Most standard residential spring replacements take about an hour once work begins. Unusual spring setups, damaged hardware, or a door that needs additional balancing can take longer.',
      ],
      [
        'Do you offer higher-cycle garage door springs?',
        'Yes. When the door and available space allow it, LIFTX can install higher-cycle springs designed to last through more open-and-close cycles than standard springs.',
      ],
      [
        'Why do garage door springs break?',
        'Most springs break because they have reached the end of their rated cycle life. Rust, incorrect sizing, added door weight, or a door that is out of balance can cause earlier failure.',
      ],
      [
        'Can a damaged garage door be repaired temporarily?',
        'Sometimes, but only when the door can be made safe. A temporary repair may secure the opening or restore limited operation while the correct parts are ordered. If the door is unsafe to use, LIFTX will say so.',
      ],
      [
        'Can I get same-day garage door service?',
        'Often. Availability depends on your location, the current schedule, and whether the required parts are on hand. Call or text and LIFTX will give you an honest arrival window.',
      ],
      [
        'Should a garage door feel heavy when disconnected from the opener?',
        'No. With the opener disconnected, a properly balanced door should lift by hand without excessive force and stay near halfway open. If it feels very heavy, drops, or rises on its own, stop using it and have the spring balance inspected.',
      ],
    ],
  },
  {
    id: 'pricing',
    icon: '$',
    title: 'Pricing & Estimates',
    desc: 'First-hour labor, estimates, deposits, payments, and written quotes.',
    questions: [
      [
        'How does the first hour of labor work?',
        'The first hour is billed in full when LIFTX arrives, whether the visit takes 15 minutes or 55 minutes. The separate first-hour charge is waived when LIFTX installs a door, opener, spring system, or major component whose quoted price exceeds the standard first-hour charge during the same visit. Small parts, adjustments, and minor repairs do not qualify. Additional or quoted installation labor still applies.',
      ],
      [
        'Can LIFTX estimate over the phone?',
        'In many cases, LIFTX can provide minimum pricing or a realistic range. Some conditions still require an on-site inspection before the exact repair and price can be confirmed.',
      ],
      [
        'Can I send photos or video?',
        'Yes. Photos or a short video can help identify the likely issue, product label, or parts and can make scheduling more efficient.',
      ],
      [
        'Does LIFTX price match?',
        'LIFTX will review legitimate written estimates when the product, installation scope, and warranty are reasonably comparable. A price match is not guaranteed because a lower quote may use different products or leave out parts of the work.',
      ],
      [
        'What does a deposit cover?',
        'A deposit normally covers the quoted materials or equipment, including markup and applicable sales tax. The exact deposit amount and what it covers are shown on the written estimate.',
      ],
      [
        'When does a deposit become nonrefundable?',
        'A deposit becomes nonrefundable once LIFTX orders the materials or equipment for the project. Any project-specific cancellation, return, or restocking terms will be included in the written estimate or agreement.',
      ],
      [
        'What happens to the deposit if I cancel before materials are ordered?',
        'If you cancel before LIFTX orders the materials or equipment, LIFTX will refund the unused portion of the deposit, less any completed work or nonrecoverable costs disclosed in writing.',
      ],
      [
        'When is the remaining balance due?',
        'The remaining balance is due when the work is completed. Larger or multi-phase projects may include progress payments shown in the written estimate or agreement.',
      ],
    ],
  },
  {
    id: 'doors',
    icon: '▤',
    title: 'New Doors & Full-View',
    desc: 'Selection, insulation, glass, colors, measurements, and ordering.',
    questions: [
      [
        'What is a Full-View door?',
        'A Full-View door uses aluminum framing with large glass or acrylic sections. It can be configured for modern residential, studio, showroom, restaurant, commercial, and specialty applications.',
      ],
      [
        'How do I choose a new door?',
        'Start with the opening, application, insulation needs, budget, exterior style, and desired maintenance. LIFTX then narrows the product and construction options that fit.',
      ],
      [
        'Can I design the door online first?',
        'Yes. The Brands page links to official manufacturer design tools. LIFTX verifies the actual product, size, options, and availability before ordering.',
      ],
      [
        'How long do new doors take?',
        'Lead time depends on the manufacturer, model, size, options, finish, and current production schedule. Timing is confirmed as closely as possible before the order is placed.',
      ],
    ],
  },
  {
    id: 'operators',
    icon: '⌁',
    title: 'Openers & Operators',
    desc: 'Residential openers, wall-mount systems, controls, and commercial operators.',
    questions: [
      [
        'Should I replace the garage door opener when I replace the door?',
        'Not necessarily. If the existing opener is properly sized, safely attached, compatible with the new door, and still operating well, it can usually stay. LIFTX will inspect it and explain whether keeping or replacing it makes more sense.',
      ],
      [
        'Can LIFTX install a wall-mount garage door opener?',
        'Yes, when the door has a compatible torsion system, enough side room, suitable power, and proper structural support. LIFTX verifies the setup before recommending one.',
      ],
      [
        'Why does my garage door work by hand but not with the opener?',
        'If the door moves smoothly by hand, the fault is likely in the opener or its controls. LIFTX checks the photo eyes, wiring, settings, trolley, motor, and door balance before recommending repair or replacement.',
      ],
      [
        'Why is the opener bracket pulling away from the door?',
        'The opener bracket can pull away when the top section is not properly reinforced, the door is too heavy or out of balance, or the attachment is failing. Stop using the opener until the door balance, bracket, and reinforcement are inspected.',
      ],
    ],
  },
  {
    id: 'warranty',
    icon: '◇',
    title: 'Warranty & Maintenance',
    desc: 'Craftsmanship coverage, manufacturer warranties, and maintenance visits.',
    questions: [
      [
        'What is the LIFTX workmanship warranty?',
        'LIFTX provides a one-year craftsmanship and installation warranty for qualifying work unless different written terms are provided for the project.',
      ],
      [
        'What does the manufacturer cover?',
        'Manufacturer warranties apply separately to eligible doors, operators, springs, electronics, windows, and other components. Coverage varies by product.',
      ],
      [
        'What can affect workmanship coverage?',
        'Third-party service or adjustment, structural movement, impact, abuse, weather-related damage, and conditions outside LIFTX workmanship may affect coverage.',
      ],
    ],
  },
  {
    id: 'commercial',
    icon: '▦',
    title: 'Commercial & Builders',
    desc: 'Commercial door service, plan review, scheduling, and multi-door projects.',
    questions: [
      [
        'Does LIFTX service and install commercial doors?',
        'Yes. LIFTX works on commercial sectional, Full-View, rolling steel, sheet, and high-speed doors, along with operators, controls, and related hardware.',
      ],
      [
        'Can LIFTX quote a commercial door project from plans?',
        'Yes. Send the door schedule, plans, elevations, and specifications. LIFTX can prepare an initial quote, then verify the openings, headroom, power, mounting surfaces, and site access before anything is ordered.',
      ],
      [
        'Can LIFTX coordinate projects with multiple doors?',
        'Yes. LIFTX can coordinate product selection, opening requirements, lead times, delivery, installation sequencing, operators, controls, and final testing through one point of contact.',
      ],
    ],
  },
  {
    id: 'trust',
    icon: '✓',
    title: 'Recommendations & Trust',
    desc: 'How LIFTX decides what to recommend and when replacement makes sense.',
    questions: [
      [
        'Does LIFTX upsell?',
        'No. LIFTX explains the condition, options, cost, and consequences, then lets the customer decide without pressure.',
      ],
      [
        'Will LIFTX say when a repair is not worth it?',
        'Yes. If repair makes sense, LIFTX recommends it. If replacement offers better long-term value, the reason is explained.',
      ],
      [
        'Will LIFTX recommend replacement just because the door is old?',
        'No. Age alone is not a reason to replace a door. Function, structural condition, safety, repair value, and the customer’s goals matter.',
      ],
    ],
  },
];

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
