
const form=document.getElementById('contact-form');
if(form){
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const data=new FormData(form);
    const subject=encodeURIComponent(`LIFTX website inquiry — ${data.get('service') || 'General'}`);
    const body=encodeURIComponent(
`Name: ${data.get('name') || ''}
Phone: ${data.get('phone') || ''}
Email: ${data.get('email') || ''}
City: ${data.get('city') || ''}
Customer type: ${data.get('customer_type') || ''}
Service: ${data.get('service') || ''}

Message:
${data.get('message') || ''}`
    );
    window.location.href=`mailto:josh@liftxdoor.com?subject=${subject}&body=${body}`;
  });
}
