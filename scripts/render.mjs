// Sitenin sayfalarından statik varlık üretir (headless Chrome):
//   cv → public/cv/*.pdf   (/cv, /en/cv — A4 PDF)
//   og → public/og/*.png   (/og, /en/og — 1200×630 paylaşım kartı)
//   icon → public/apple-touch-icon.png (scripts/apple-touch-icon.svg — 180×180)
// Kullanım: node scripts/render.mjs [cv|og|icon]   (argümansız: hepsi)
// Sayfa gerektiren işler için önce build alır, sonra geçici bir preview sunucusu açar.
import { spawn, execFileSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

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
  // Sayfa değil, yerel dosya: sunucu gerekmez
  icon: [{ file: 'scripts/apple-touch-icon.svg', out: 'public/apple-touch-icon.png', size: 180 }],
};
const selected = process.argv[2] ? [process.argv[2]] : Object.keys(jobs);
if (selected.some((k) => !jobs[k])) throw new Error(`Bilinmeyen hedef: ${process.argv[2]} (cv | og | icon)`);

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

const common = ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--virtual-time-budget=3000'];

for (const { file, out, size } of selected.includes('icon') ? jobs.icon : []) {
  mkdirSync(dirname(resolve(out)), { recursive: true });
  execFileSync(browser, [
    ...common,
    `--window-size=${size},${size}`,
    '--force-device-scale-factor=1',
    `--screenshot=${resolve(out)}`,
    pathToFileURL(resolve(file)).href,
  ]);
  console.log(`✓ ${out}`);
}
const pageJobs = selected.filter((k) => k !== 'icon');
if (pageJobs.length === 0) process.exit(0);

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
  for (const kind of pageJobs) {
    for (const { path, out } of jobs[kind]) {
      const file = resolve(out);
      mkdirSync(dirname(file), { recursive: true });
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
