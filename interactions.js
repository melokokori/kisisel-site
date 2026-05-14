/* ── CSS enjeksiyonu ─────────────────────────────────────────── */
(function injectCSS() {
  const s = document.createElement('style');
  s.textContent = `
    * { cursor: none !important; }

    #cur-dot {
      position: fixed; pointer-events: none; z-index: 99999;
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--accent, #4ecca3);
      transform: translate(-50%,-50%);
      transition: width .2s, height .2s, background .2s;
    }
    #cur-ring {
      position: fixed; pointer-events: none; z-index: 99998;
      width: 34px; height: 34px; border-radius: 50%;
      border: 1.5px solid var(--accent, #4ecca3);
      transform: translate(-50%,-50%);
      opacity: .55;
      transition: width .25s, height .25s, border-color .25s, opacity .25s;
    }
    #cur-dot.big  { width: 14px; height: 14px; background: var(--accent2, #7b61ff); }
    #cur-ring.big { width: 52px; height: 52px; border-color: var(--accent2, #7b61ff); opacity: .3; }

    .slide-up    { opacity:0; transform:translateY(36px);  transition:opacity .65s ease, transform .65s ease; }
    .slide-left  { opacity:0; transform:translateX(-36px); transition:opacity .65s ease, transform .65s ease; }
    .slide-right { opacity:0; transform:translateX(36px);  transition:opacity .65s ease, transform .65s ease; }
    .slide-up.visible, .slide-left.visible, .slide-right.visible { opacity:1; transform:none; }

    .typewriter-cursor { display:inline-block; width:2px; height:1em;
      background:var(--accent,#4ecca3); margin-left:4px;
      vertical-align:middle; animation:blink .7s infinite; }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

    /* contact form */
    .contact-form { margin-top:32px; display:flex; flex-direction:column; gap:14px; }
    .contact-form input, .contact-form textarea {
      background: rgba(255,255,255,0.04);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 14px 18px;
      color: var(--text);
      font-family: inherit;
      font-size: .95rem;
      outline: none;
      transition: border-color .2s;
      resize: vertical;
    }
    body[data-theme="light"] .contact-form input,
    body[data-theme="light"] .contact-form textarea {
      background: rgba(255,255,255,0.7);
    }
    .contact-form input:focus, .contact-form textarea:focus { border-color: var(--accent); }
    .contact-form textarea { min-height: 120px; }
    .contact-form button {
      align-self: flex-start;
      background: var(--accent);
      color: #0d0d0d;
      border: none;
      padding: 12px 32px;
      border-radius: 8px;
      font-weight: 700;
      font-size: .95rem;
      cursor: none;
      transition: opacity .2s, transform .2s;
    }
    .contact-form button:hover { opacity:.85; transform:translateY(-2px); }
    .form-success { color: var(--accent); font-size:.9rem; margin-top:8px; display:none; }

    /* cv button */
    .cv-btn {
      display: inline-flex; align-items: center; gap: 8px;
      border: 1px solid var(--border);
      color: var(--text);
      padding: 10px 22px;
      border-radius: 8px;
      text-decoration: none;
      font-size: .9rem;
      transition: border-color .2s, color .2s, transform .2s;
      margin-top: 24px;
    }
    .cv-btn:hover { border-color:var(--accent); color:var(--accent); transform:translateY(-2px); }
  `;
  document.head.appendChild(s);
})();

/* ── CUSTOM CURSOR ───────────────────────────────────────────── */
function initCursor() {
  const dot  = Object.assign(document.createElement('div'), { id: 'cur-dot'  });
  const ring = Object.assign(document.createElement('div'), { id: 'cur-ring' });
  document.body.append(dot, ring);

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('big'); ring.classList.add('big'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('big'); ring.classList.remove('big'); });
  });

  (function loop() {
    rx += (mx - rx) * 0.13; ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();
}

/* ── 3D CARD TILT ────────────────────────────────────────────── */
function init3DTilt() {
  document.querySelectorAll('.about-card, .contact-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transition = 'transform .1s, box-shadow .1s');
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform  = `perspective(700px) rotateX(${y * -13}deg) rotateY(${x * 13}deg) scale(1.04)`;
      card.style.boxShadow  = `${-x * 18}px ${-y * 18}px 28px rgba(78,204,163,0.12)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform .45s ease, box-shadow .45s ease';
      card.style.transform = card.style.boxShadow = '';
    });
  });
}

/* ── MAGNETIC BUTTONS ────────────────────────────────────────── */
function initMagnetic() {
  document.querySelectorAll('.nav-btn, .cv-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => btn.style.transition = 'transform .1s');
    btn.addEventListener('mousemove', e => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) * 0.28;
      const dy = (e.clientY - (r.top  + r.height / 2)) * 0.28;
      btn.style.transform = `translate(${dx}px,${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform .4s ease';
      btn.style.transform  = '';
    });
  });
}

/* ── SCROLL ANIMATIONS ───────────────────────────────────────── */
function initScroll() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.slide-up, .slide-left, .slide-right, .fade-in').forEach(el => obs.observe(el));
}

/* ── TYPEWRITER ──────────────────────────────────────────────── */
function initTypewriter(el, phrases, speed = 85, pause = 2200) {
  if (!el) return;
  const cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  el.after(cursor);

  let pi = 0, ci = 0, del = false;
  const tick = () => {
    const ph = phrases[pi];
    el.textContent = del ? ph.slice(0, --ci) : ph.slice(0, ++ci);
    if (!del && ci === ph.length) { del = true; return setTimeout(tick, pause); }
    if (del && ci === 0)          { del = false; pi = (pi + 1) % phrases.length; }
    setTimeout(tick, del ? speed * 0.45 : speed);
  };
  tick();
}

/* ── CONTACT FORM (Formspree) ────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const msg = document.getElementById('formSuccess');
    btn.textContent = 'Gönderiliyor...'; btn.disabled = true;
    try {
      const res = await fetch(form.action, { method:'POST', body: new FormData(form), headers:{ Accept:'application/json' } });
      if (res.ok) {
        form.reset();
        msg.style.display = 'block';
        msg.textContent   = '✓ Mesajınız iletildi!';
        btn.textContent   = 'Gönder';
        btn.disabled      = false;
      } else { throw new Error(); }
    } catch {
      btn.textContent = 'Hata — tekrar dene';
      btn.disabled    = false;
    }
  });
}

/* ── INIT ────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  init3DTilt();
  initMagnetic();
  initScroll();
  initContactForm();

  const tw = document.getElementById('typewriter');
  if (tw) {
    initTypewriter(tw, [
      'Bilgisayar Mühendisi',
      'Veri Bilimi Araştırmacısı',
      'Yüksek Lisans Öğrencisi',
      'Analitik Düşünür',
    ]);
  }
});
