function toggleDropdown(e){
  e.preventDefault();
  const d = document.getElementById('services-dropdown');
  d.style.display = d.style.display === 'block' ? 'none' : 'block';
}
function openMobileMenu(){
  const el = document.getElementById('mobile-menu');
  el.classList.toggle('show');
}
function closeMobileMenu(){ document.getElementById('mobile-menu').classList.remove('show'); }
async function subscribeNewsletter(e){
  e.preventDefault();
  const btn = document.getElementById('subscribe-btn');
  const status = document.getElementById('subscribe-status');
  const form = document.getElementById('newsletter-form');
  const data = {email: form.email.value, name: form.name.value};
  btn.disabled = true; btn.textContent='Signing up...';
  status.textContent='';
  try{
    const res = await fetch('/api/subscribe', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });
    const j = await res.json();
    if(res.ok){ status.textContent = 'Thanks — check your inbox!'; form.reset(); } else { status.textContent = j.error || 'Failed to subscribe'; }
  }catch(err){
    status.textContent = 'Network error. Try again later.'; console.error(err);
  } finally { btn.disabled=false; btn.textContent='Subscribe'; }
}
function createGoogleCalendarLink(opts){
  const base = 'https://calendar.google.com/calendar/r/eventedit';
  const params = new URLSearchParams({
  text: opts.title || 'Offargu Consultation',
  details: opts.details || '30-minute discovery call with Offargu AI Security',
    location: opts.location || 'Google Meet',
    dates: opts.dates || ''
  });
  return base + '?' + params.toString();
}
function bookNow(){
  // prefill a 30-minute event today at 10am local time as an example - user can change when opening
  const start = new Date();
  start.setDate(start.getDate()+1);
  start.setHours(10,0,0,0);
  const end = new Date(start.getTime()+30*60000);
  function toGd(d){ return d.toISOString().replace(/-|:|\.\d+/g,''); }
  const link = createGoogleCalendarLink({title:'Offargu Discovery Call', details:'30-minute consult to discuss AI security for your SMB', dates: toGd(start)+'/'+toGd(end)});
  window.open(link,'_blank');
}
