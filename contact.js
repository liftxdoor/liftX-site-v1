const form=document.getElementById('contact-form');
const submitButton=document.getElementById('form-submit');
const statusBox=document.getElementById('form-status');

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
