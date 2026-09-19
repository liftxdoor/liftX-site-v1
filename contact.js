const form=document.getElementById('contact-form');
const submitButton=document.getElementById('form-submit');
const statusBox=document.getElementById('form-status');

const visualizerParams=new URLSearchParams(window.location.search);
if(visualizerParams.get('source')==='ai-visualizer'&&form){
  const allowed=new Set(['opening','style','color','windows','match1','match2','match3']);
  const lines=['I created an AI garage-door concept on the LIFTX website and want help finding the closest real product.'];
  for(const [key,value] of visualizerParams){
    if(allowed.has(key)&&value&&value.length<=100) lines.push(`${key.replace(/^match(\d)$/,'Closest match $1').replace(/^./,letter=>letter.toUpperCase())}: ${value}`);
  }
  const messageField=document.getElementById('message');
  const serviceField=document.getElementById('service');
  const sourceField=document.getElementById('contact-source');
  const note=document.getElementById('visualizer-contact-note');
  if(messageField) messageField.value=lines.join('\n');
  if(serviceField) serviceField.value='New Door / Replacement';
  if(sourceField) sourceField.value='ai-visualizer';
  if(note) note.hidden=false;
}

function showFormStatus(message,type){
  if(!statusBox) return;
  statusBox.textContent=message;
  statusBox.className=`form-status is-visible is-${type}`;
}

if(form&&submitButton){
  form.addEventListener('submit',async event=>{
    event.preventDefault();

    if(!form.reportValidity()) return;

    const originalLabel=submitButton.textContent;
    submitButton.disabled=true;
    submitButton.textContent='Sending…';

    if(statusBox){
      statusBox.textContent='';
      statusBox.className='form-status';
    }

    try{
      const response=await fetch(form.action,{
        method:'POST',
        body:new FormData(form),
        headers:{Accept:'application/json'}
      });

      if(response.ok){
        form.reset();
        showFormStatus('Request sent. LIFTX will review it and follow up as soon as possible.','success');
      }else{
        let message='The request could not be sent. Please try again, call, or text LIFTX.';
        try{
          const data=await response.json();
          if(Array.isArray(data.errors)&&data.errors.length){
            message=data.errors.map(error=>error.message).join(' ');
          }
        }catch(_error){}
        showFormStatus(message,'error');
      }
    }catch(_error){
      showFormStatus('The request could not be sent. Check your connection and try again, or call or text LIFTX.','error');
    }finally{
      submitButton.disabled=false;
      submitButton.textContent=originalLabel;
    }
  });
}
