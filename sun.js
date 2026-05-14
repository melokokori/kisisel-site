const sunEffect = (() => {
  let canvas, ctx, W, H, raf = null;

  // Türkiye: UTC+3
  const TZ   = 3;
  const RISE = 6.0;   // 06:00
  const SET  = 20.5;  // 20:30

  function getTRHour() {
    const n = new Date();
    return ((n.getUTCHours() + TZ) % 24) + n.getUTCMinutes() / 60 + n.getUTCSeconds() / 3600;
  }

  function sunState(h) {
    if (h < RISE || h > SET) return null;
    const p  = (h - RISE) / (SET - RISE); // 0=gündoğumu, 1=günbatımı
    // x: SAĞ (gündoğumu/doğu) → SOL (günbatımı/batı)
    const x  = (1 - p) * W;
    // y: yayı: sabah ve akşam alçak, öğlen yüksek
    const arc = 0.18 + 0.55 * Math.pow(2 * p - 1, 2);
    const y   = arc * H;
    const dawn = p < 0.12;
    const dusk = p > 0.88;
    return { p, x, y, dawn, dusk, golden: dawn || dusk };
  }

  function lerp(a, b, t) { return a + (b - a) * t; }

  function skyColor(p, top) {
    // dawn:  dark purple → orange horizon
    // day:   sky blue
    // dusk:  orange/red
    if (p < 0.12) {
      const t = p / 0.12;
      if (top) return `rgb(${lerp(20,80,t)|0},${lerp(10,120,t)|0},${lerp(60,180,t)|0})`;
      return       `rgb(${lerp(180,250,t)|0},${lerp(80,160,t)|0},${lerp(20,80,t)|0})`;
    }
    if (p > 0.88) {
      const t = (1 - p) / 0.12;
      if (top) return `rgb(${lerp(20,80,t)|0},${lerp(10,120,t)|0},${lerp(60,180,t)|0})`;
      return       `rgb(${lerp(180,250,t)|0},${lerp(80,160,t)|0},${lerp(20,80,t)|0})`;
    }
    if (top) return '#5ba3d9';
    return '#d4edfb';
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const h  = getTRHour();
    const st = sunState(h);

    if (!st) {
      // gece — açık temada görünmez çünkü gece karanlık temaya geçilir
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, '#0d0d2e');
      g.addColorStop(1, '#1a1a3e');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      return;
    }

    const { p, x, y, golden } = st;

    // --- Gökyüzü gradyanı (dikey) ---
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0,   skyColor(p, true));
    sky.addColorStop(0.6, skyColor(p, false));
    sky.addColorStop(1,   '#e8f0f8');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    // --- Yatay ışık gradyanı (güneşin olduğu tarafa doğru parlaklık) ---
    const hg = ctx.createLinearGradient(0, 0, W, 0);
    const ha = golden ? 0.18 : 0.07;
    const hc = golden ? '255,190,60' : '255,245,180';
    const side = x / W; // 0=sol, 1=sağ
    hg.addColorStop(0,    `rgba(${hc},${ha * (1 - side) * 2})`);
    hg.addColorStop(side, `rgba(${hc},${ha * 2})`);
    hg.addColorStop(1,    `rgba(${hc},${ha * side * 2})`);
    ctx.fillStyle = hg;
    ctx.fillRect(0, 0, W, H);

    // --- Güneş halesi ---
    const glowR = Math.max(W, H) * 0.38;
    const glow  = ctx.createRadialGradient(x, y, 0, x, y, glowR);
    if (golden) {
      glow.addColorStop(0,    'rgba(255,210,60,0.75)');
      glow.addColorStop(0.12, 'rgba(255,150,20,0.35)');
      glow.addColorStop(0.45, 'rgba(255,90,10,0.08)');
      glow.addColorStop(1,    'rgba(255,40,0,0)');
    } else {
      glow.addColorStop(0,    'rgba(255,255,200,0.65)');
      glow.addColorStop(0.1,  'rgba(255,245,120,0.28)');
      glow.addColorStop(0.4,  'rgba(255,230,60,0.05)');
      glow.addColorStop(1,    'rgba(255,220,0,0)');
    }
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // --- Güneş diski ---
    const r = golden ? 30 : 24;
    ctx.save();
    ctx.shadowBlur  = golden ? 40 : 28;
    ctx.shadowColor = golden ? '#ff9900' : '#ffffaa';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = golden ? '#ffc800' : '#fff8d0';
    ctx.fill();
    ctx.restore();

    // --- Zemin parlaması ---
    const ground = ctx.createLinearGradient(0, H * 0.75, 0, H);
    ground.addColorStop(0, 'rgba(255,255,240,0)');
    ground.addColorStop(1, golden ? 'rgba(255,200,80,0.12)' : 'rgba(220,240,255,0.1)');
    ctx.fillStyle = ground;
    ctx.fillRect(0, H * 0.75, W, H * 0.25);
  }

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function start() {
    if (raf) return;
    canvas.style.display = 'block';
    const loop = () => { draw(); raf = requestAnimationFrame(loop); };
    loop();
  }

  function stop() {
    if (raf) { cancelAnimationFrame(raf); raf = null; }
    if (ctx) ctx.clearRect(0, 0, W, H);
    if (canvas) canvas.style.display = 'none';
  }

  function init() {
    canvas = document.getElementById('sunCanvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
  }

  return { init, start, stop };
})();
