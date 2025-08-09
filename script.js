(function(){
  const cards = Array.from(document.querySelectorAll('.card[data-tilt]'));
  const damp = 12;
  const maxTilt = 8; // deg
  function onMove(e){
    const rect = this.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    this.style.setProperty('--px', (x*100).toFixed(2)+'%');
    this.style.setProperty('--py', (y*100).toFixed(2)+'%');
    const rx = (maxTilt * (y - 0.5));
    const ry = (-maxTilt * (x - 0.5));
    this.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
  }
  function onLeave(){
    this.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
    this.style.setProperty('--px','50%');
    this.style.setProperty('--py','50%');
  }
  cards.forEach(c=>{
    c.style.setProperty('--px','50%');
    c.style.setProperty('--py','50%');
    c.addEventListener('pointermove', onMove);
    c.addEventListener('pointerleave', onLeave);
    c.addEventListener('pointerdown', ()=>{ c.style.transition='transform .05s ease';});
    c.addEventListener('pointerup', ()=>{ c.style.transition='transform .15s ease,box-shadow .15s ease,border-color .2s ease';});
  });

  // Reactive buttons
  const btns = Array.from(document.querySelectorAll('.btn.reactive'));
  function onBtnMove(e){
    const r = this.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width * 100;
    const y = (e.clientY - r.top) / r.height * 100;
    this.style.setProperty('--bx', x.toFixed(2)+'%');
    this.style.setProperty('--by', y.toFixed(2)+'%');
  }
  function onBtnLeave(){
    this.style.setProperty('--bx','50%');
    this.style.setProperty('--by','50%');
  }
  btns.forEach(b=>{
    b.addEventListener('pointermove', onBtnMove);
    b.addEventListener('pointerleave', onBtnLeave);
  });

  // Nav reactive underline follows cursor
  const navFollows = Array.from(document.querySelectorAll('.nav-reactive[data-follow]'));
  function onNavMove(e){
    const r = this.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width * 100;
    this.style.setProperty('--nx', x.toFixed(2)+'%');
  }
  function onNavLeave(){
    this.style.setProperty('--nx','50%');
  }
  navFollows.forEach(n=>{
    n.addEventListener('pointermove', onNavMove);
    n.addEventListener('pointerleave', onNavLeave);
  });
})();

// Reactive sections: follow-cursor outline/glow
(function(){
  const sections = Array.from(document.querySelectorAll('.reactive-section'));
  function onMove(e){
    const r = this.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width * 100;
    const y = (e.clientY - r.top) / r.height * 100;
    this.style.setProperty('--sx', x.toFixed(2)+'%');
    this.style.setProperty('--sy', y.toFixed(2)+'%');
  }
  function onLeave(){
    this.style.setProperty('--sx','50%');
    this.style.setProperty('--sy','50%');
  }
  sections.forEach(s=>{
    s.addEventListener('pointermove', onMove);
    s.addEventListener('pointerleave', onLeave);
  });
})();

// Contact form: opens default mail client with prefilled subject/body
(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const d = new FormData(form);
    const name = (d.get('name')||'').toString().trim();
    const email = (d.get('email')||'').toString().trim();
    const msg = (d.get('message')||'').toString().trim();
    const subject = encodeURIComponent('Clippy contact');
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
    window.location.href = `mailto:jrileypersonal@yahoo.com?subject=${subject}&body=${body}`;
  });
})();


