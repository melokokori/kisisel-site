const chaosEffect = (() => {
  let canvas, ctx, W, H, raf = null;
  let t = 0;
  let eqTimer = null;
  let cracks = [];
  let particles = [];

  const WAVES = [
    { amp:95,  freq:0.006, spd:0.04,  yBase:0.73, color:'rgba(0,70,200,0.2)',   foam:'rgba(180,220,255,0.12)', rise:0.00012 },
    { amp:70,  freq:0.009, spd:-0.06, yBase:0.79, color:'rgba(0,110,230,0.16)', foam:'rgba(200,235,255,0.1)', rise:0.00009 },
    { amp:50,  freq:0.013, spd:0.07,  yBase:0.84, color:'rgba(0,150,255,0.14)', foam:'rgba(220,245,255,0.08)',rise:0.00007 },
    { amp:30,  freq:0.018, spd:-0.05, yBase:0.88, color:'rgba(80,190,255,0.12)',foam:'rgba(255,255,255,0.08)',rise:0.00005 },
  ];

  function resetWaves() {
    const defaults = [0.73, 0.79, 0.84, 0.88];
    WAVES.forEach((w, i) => { w.yBase = defaults[i]; });
  }

  /* ─── DEPREM ─────────────────────────────────────────── */
  function triggerEQ() {
    let intensity = Math.random() * 20 + 10;
    addCracks();
    addCracks();

    const shakeStep = () => {
      if (intensity < 0.4) {
        document.body.style.transform = '';
        document.documentElement.style.filter = '';
        eqTimer = setTimeout(triggerEQ, Math.random() * 7000 + 3000);
        return;
      }
      const dx = (Math.random() - 0.5) * intensity;
      const dy = (Math.random() - 0.5) * intensity * 0.6;
      const dr = (Math.random() - 0.5) * intensity * 0.18;
      document.body.style.transform = `translate(${dx}px,${dy}px) rotate(${dr}deg)`;
      if (intensity > 8) {
        const h = (Math.random() * 30) | 0;
        document.documentElement.style.filter = `hue-rotate(${h}deg) brightness(${0.85 + Math.random() * 0.3})`;
      }
      intensity *= 0.87;
      eqTimer = setTimeout(shakeStep, 38);
    };
    shakeStep();
  }

  function addCracks() {
    const n = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < n; i++) {
      const sx = Math.random() * W, sy = Math.random() * H;
      const angle = Math.random() * Math.PI;
      const len = Math.random() * 220 + 80;
      const segs = [];
      let x = sx, y = sy;
      for (let j = 0; j < 9; j++) {
        const nx = x + Math.cos(angle + (Math.random() - 0.5) * 0.9) * (len / 9);
        const ny = y + Math.sin(angle + (Math.random() - 0.5) * 0.9) * (len / 9);
        segs.push([x, y, nx, ny]);
        x = nx; y = ny;
      }
      cracks.push({ segs, alpha: 0.9, decay: Math.random() * 0.009 + 0.003 });
    }
  }

  function drawCracks() {
    for (let i = cracks.length - 1; i >= 0; i--) {
      const c = cracks[i];
      ctx.save();
      ctx.lineWidth = 1.5;
      ctx.shadowBlur  = 6;
      ctx.shadowColor = `rgba(255,120,0,${c.alpha})`;
      ctx.strokeStyle = `rgba(255,210,60,${c.alpha})`;
      ctx.beginPath();
      for (const [x1,y1,x2,y2] of c.segs) { ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); }
      ctx.stroke();
      ctx.restore();
      c.alpha -= c.decay;
      if (c.alpha <= 0) cracks.splice(i, 1);
    }
  }

  /* ─── KASIRGA / TORNADO ──────────────────────────────── */
  function initParticles() {
    particles = [];
    for (let i = 0; i < 220; i++) {
      particles.push({
        angle:  Math.random() * Math.PI * 2,
        rFrac:  Math.random(),                          // 0=funnel edge, 1=wide top
        yFrac:  Math.random(),                          // 0=top, 1=bottom
        spd:    (Math.random() * 0.03 + 0.012) * (Math.random() > 0.25 ? 1 : -1),
        size:   Math.random() * 3.5 + 0.8,
        hue:    Math.random() * 80 + 200,
        alpha:  Math.random() * 0.22 + 0.08,
      });
    }
  }

  function drawTornado() {
    const cx   = W / 2 + Math.sin(t * 0.007) * W * 0.07;
    const topY = H * 0.04;
    const botY = H * 0.80;
    const topR = Math.min(W, H) * 0.26 + Math.sin(t * 0.014) * 14;
    const botR = 6 + Math.abs(Math.sin(t * 0.045)) * 6;

    // funnel body
    const fg = ctx.createLinearGradient(0, topY, 0, botY);
    fg.addColorStop(0,   'rgba(50,10,130,0.08)');
    fg.addColorStop(0.5, 'rgba(80,0,200,0.12)');
    fg.addColorStop(1,   'rgba(20,0,70,0.18)');
    ctx.beginPath();
    ctx.moveTo(cx - topR, topY);
    ctx.quadraticCurveTo(cx - (topR + botR) * 0.3, (topY + botY) * 0.55, cx - botR, botY);
    ctx.quadraticCurveTo(cx, botY + 12, cx + botR, botY);
    ctx.quadraticCurveTo(cx + (topR + botR) * 0.3, (topY + botY) * 0.55, cx + topR, topY);
    ctx.closePath();
    ctx.fillStyle = fg;
    ctx.fill();

    // particles
    for (const p of particles) {
      p.angle += p.spd;
      const fR  = topR * p.rFrac + botR * (1 - p.rFrac);
      const mixR = topR * (1 - p.yFrac) + botR * p.yFrac;
      const r   = mixR * p.rFrac;
      const px  = cx + Math.cos(p.angle) * r;
      const py  = topY + (botY - topY) * p.yFrac + Math.sin(t * 0.018 + p.angle) * 8;
      ctx.save();
      ctx.globalAlpha = p.alpha * (0.5 + 0.5 * (1 - p.yFrac));
      ctx.shadowBlur  = 3;
      ctx.shadowColor = `hsl(${p.hue},80%,55%)`;
      ctx.fillStyle   = `hsl(${p.hue},70%,65%)`;
      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // ground debris ring
    const dg = ctx.createRadialGradient(cx, botY, 0, cx, botY, botR * 5);
    dg.addColorStop(0,  'rgba(120,60,0,0.2)');
    dg.addColorStop(0.5,'rgba(80,30,0,0.08)');
    dg.addColorStop(1,  'rgba(60,10,0,0)');
    ctx.beginPath();
    ctx.ellipse(cx, botY, botR * 5, botR * 2, 0, 0, Math.PI * 2);
    ctx.fillStyle = dg;
    ctx.fill();
  }

  /* ─── TSUNAMİ ────────────────────────────────────────── */
  function drawTsunami() {
    for (const w of WAVES) {
      w.yBase = Math.max(0.32, w.yBase - w.rise);

      ctx.beginPath();
      ctx.moveTo(0, H);
      for (let x = 0; x <= W; x += 4) {
        ctx.lineTo(x, w.yBase * H + w.amp * Math.sin(x * w.freq + t * w.spd));
      }
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fillStyle = w.color;
      ctx.fill();

      // foam crest
      ctx.beginPath();
      ctx.moveTo(0, w.yBase * H + w.amp * Math.sin(0));
      for (let x = 0; x <= W; x += 4) {
        ctx.lineTo(x, w.yBase * H + w.amp * Math.sin(x * w.freq + t * w.spd));
      }
      ctx.strokeStyle = w.foam;
      ctx.lineWidth   = 2.5;
      ctx.stroke();
    }
  }

  /* ─── MAIN LOOP ──────────────────────────────────────── */
  function draw() {
    ctx.clearRect(0, 0, W, H);
    t++;
    drawTornado();
    drawTsunami();
    drawCracks();
  }

  /* ─── LIFECYCLE ──────────────────────────────────────── */
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    initParticles();
  }

  function start() {
    if (raf) return;
    document.documentElement.style.overflow = 'hidden';
    canvas.style.display = 'block';
    ctx.clearRect(0, 0, W, H);
    resetWaves();
    initParticles();
    t = 0;
    const loop = () => { draw(); raf = requestAnimationFrame(loop); };
    loop();
    eqTimer = setTimeout(triggerEQ, 1800);
  }

  function stop() {
    if (raf)     { cancelAnimationFrame(raf); raf = null; }
    if (eqTimer) { clearTimeout(eqTimer);     eqTimer = null; }
    document.body.style.transform            = '';
    document.documentElement.style.filter   = '';
    document.documentElement.style.overflow = '';
    cracks = [];
    if (ctx)    ctx.clearRect(0, 0, W, H);
    if (canvas) canvas.style.display = 'none';
  }

  function init() {
    canvas = document.getElementById('chaosCanvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
  }

  return { init, start, stop };
})();
