// Sitenin sayfalarından statik varlık üretir (headless Chrome):
//   cv → public/cv/*.pdf   (/cv, /en/cv — A4 PDF)
//   og → public/og/*.png   (/og, /en/og — 1200×630 paylaşım kartı)
// Kullanım: node scripts/render.mjs [cv|og]   (argümansız: ikisi de)
// Önce build alır, sonra geçici bir preview sunucusu açar.
import { spawn, execFileSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const PORT = 4329;
const jobs = {
  cv: [
    { path: '/cv/', out: 'public/cv/melih-turgut-cv-tr.pdf' },
    { path: '/en/cv/', out: 'public/cv/melih-turgut-cv-en.pdf' },
  ],
  og: [
    { path: '/og/', out: 'public/og/og-tr.png' },
    { path: '/en/og/', out: 'public/og/og-en.png' },
  ],
};
const selected = process.argv[2] ? [process.argv[2]] : Object.keys(jobs);
if (selected.some((k) => !jobs[k])) throw new Error(`Bilinmeyen hedef: ${process.argv[2]} (cv | og)`);

const browsers = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);
const browser = browsers.find((p) => existsSync(p));
if (!browser) throw new Error('Chrome/Edge bulunamadı; CHROME_PATH ortam değişkeniyle yolunu ver.');

execFileSync('npx', ['astro', 'build'], { stdio: 'inherit', shell: true });

const server = spawn('npx', ['astro', 'preview', '--port', String(PORT)], { shell: true });
const waitForServer = async () => {
  for (let i = 0; i < 50; i++) {
    try {
      if ((await fetch(`http://localhost:${PORT}/`)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error('Preview sunucusu açılmadı.');
};

try {
  await waitForServer();
  for (const kind of selected) {
    for (const { path, out } of jobs[kind]) {
      const file = resolve(out);
      mkdirSync(dirname(file), { recursive: true });
      const common = ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--virtual-time-budget=3000'];
      const target =
        kind === 'cv'
          ? ['--no-pdf-header-footer', `--print-to-pdf=${file}`]
          : ['--window-size=1200,630', '--force-device-scale-factor=1', `--screenshot=${file}`];
      execFileSync(browser, [...common, ...target, `http://localhost:${PORT}${path}`]);
      console.log(`✓ ${out}`);
    }
  }
} finally {
  // Windows'ta shell üzerinden açılan süreç ağacını da kapat
  if (process.platform === 'win32') spawn('taskkill', ['/pid', String(server.pid), '/T', '/F']);
  else server.kill();
}
