const weather = (() => {
  let canvas, ctx, W, H;
  let drops = [], raf = null, ltTimer = null;
  let cloudT = 0;

  const CLOUDS = [
    { bx: 0.0,  by: -0.04, speed: 0.00008, r: 130, puffs: [[0,0,1],[-.5,.15,.8],[.5,.12,.85],[-.25,-.18,.72],[.25,-.2,.75],[.75,.08,.65]] },
    { bx: 0.35, by: -0.06, speed: 0.00005, r: 105, puffs: [[0,0,1],[-.65,.2,.78],[.65,.18,.82],[-.35,-.22,.7],[.35,-.25,.73],[1,.12,.6]] },
    { bx: 0.65, by: -0.02, speed: 0.00006, r: 90,  puffs: [[0,0,1],[-.45,.12,.8],[.45,.1,.77],[.9,.15,.62]] },
    { bx: 0.15, by:  0.05, speed: 0.00004, r: 75,  puffs: [[0,0,1],[-.4,.1,.78],[.4,.14,.8]] },
    { bx: 0.8,  by:  0.03, speed: 0.00007, r: 80,  puffs: [[0,0,1],[-.5,.12,.75],[.5,.1,.78],[-.25,-.15,.68]] },
  ];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    initDrops();
  }

  function initDrops() {
    drops = [];
    const n = Math.floor(W * 0.14);
    for (let i = 0; i < n; i++) pushDrop(Math.random() * H);
  }

  function pushDrop(startY) {
    drops.push({
      x:   Math.random() * W,
      y:   startY,
      len: Math.random() * 16 + 8,
      spd: Math.random() * 7  + 7,
      op:  Math.random() * 0.3 + 0.1
    });
  }

  function drawClouds(t) {
    for (const c of CLOUDS) {
      const cx = ((c.bx * W + t * c.speed * W) % (W + c.r * 2)) - c.r;
      const cy = c.by * H;
      ctx.save();
      ctx.shadowBlur  = 50;
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      for (const [dx, dy, dr] of c.puffs) {
        ctx.beginPath();
        ctx.arc(cx + dx * c.r, cy + dy * c.r, c.r * dr, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(8,8,22,0.72)';
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function drawRain() {
    ctx.clearRect(0, 0, W, H);
    cloudT++;
    drawClouds(cloudT);

    for (const d of drops) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(140,170,255,${d.op})`;
      ctx.lineWidth   = 1;
      ctx.moveTo(d.x,        d.y);
      ctx.lineTo(d.x - 1.5,  d.y + d.len);
      ctx.stroke();

      d.y += d.spd;
      if (d.y > H + d.len) {
        d.y = -d.len;
        d.x = Math.random() * W;
      }
    }
  }

  function zigzag(x0, y0, x1, y1, segs) {
    const pts = [[x0, y0]];
    for (let i = 1; i < segs; i++) {
      const t  = i / segs;
      const mx = x0 + (x1 - x0) * t + (Math.random() - 0.5) * 55;
      const my = y0 + (y1 - y0) * t;
      pts.push([mx, my]);
    }
    pts.push([x1, y1]);
    return pts;
  }

  function drawBolt(pts, alpha) {
    ctx.save();
    ctx.shadowBlur  = 18;
    ctx.shadowColor = `rgba(180,210,255,${alpha * 0.9})`;
    ctx.strokeStyle = `rgba(210,230,255,${alpha})`;
    ctx.lineWidth   = 2;
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.stroke();

    // branch
    if (pts.length > 3) {
      const bi = Math.floor(pts.length * 0.5);
      const bx = pts[bi][0] + (Math.random() - 0.5) * 40;
      ctx.lineWidth   = 1;
      ctx.shadowBlur  = 8;
      ctx.strokeStyle = `rgba(180,210,255,${alpha * 0.6})`;
      ctx.beginPath();
      ctx.moveTo(pts[bi][0], pts[bi][1]);
      ctx.lineTo(bx, pts[bi][1] + Math.random() * 80 + 40);
      ctx.stroke();
    }
    ctx.restore();
  }

  function strikeLightning(side) {
    const margin = 80;
    const x0 = side === 'left'
      ? Math.random() * margin + 10
      : W - Math.random() * margin - 10;
    const y0  = Math.random() * 80;
    const x1  = x0 + (side === 'left' ? 1 : -1) * (Math.random() * 30 + 10);
    const y1  = H  * (Math.random() * 0.25 + 0.45);
    const pts = zigzag(x0, y0, x1, y1, 10);

    // screen flash
    const flash = document.createElement('div');
    flash.style.cssText = 'position:fixed;inset:0;background:rgba(255,255,255,0.07);pointer-events:none;z-index:9990;transition:opacity 0.25s';
    document.body.appendChild(flash);
    setTimeout(() => { flash.style.opacity = '0'; setTimeout(() => flash.remove(), 250); }, 60);

    // fade bolt
    let alpha = 1;
    const fade = () => {
      drawBolt(pts, alpha);
      alpha -= 0.055;
      if (alpha > 0) setTimeout(fade, 28);
    };
    fade();
  }

  function scheduleLightning() {
    const delay = Math.random() * 5000 + 2500;
    ltTimer = setTimeout(() => {
      strikeLightning(Math.random() > 0.5 ? 'left' : 'right');
      // occasionally double-strike
      if (Math.random() > 0.6) {
        setTimeout(() => strikeLightning(Math.random() > 0.5 ? 'left' : 'right'), 400);
      }
      scheduleLightning();
    }, delay);
  }

  function start() {
    if (raf) return;
    canvas.style.display = 'block';
    const loop = () => { drawRain(); raf = requestAnimationFrame(loop); };
    loop();
    scheduleLightning();
  }

  function stop() {
    if (raf)     { cancelAnimationFrame(raf); raf = null; }
    if (ltTimer) { clearTimeout(ltTimer);     ltTimer = null; }
    if (ctx)     { ctx.clearRect(0, 0, W, H); }
    if (canvas)  { canvas.style.display = 'none'; }
  }

  function init() {
    canvas = document.getElementById('weatherCanvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
  }

  return { init, start, stop };
})();
