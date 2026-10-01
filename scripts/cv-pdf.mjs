// /cv ve /en/cv sayfalarını Chrome (headless) ile A4 PDF'e çevirir → public/cv/
// Kullanım: npm run cv:pdf   (önce build alır, sonra geçici bir preview sunucusu açar)
import { spawn, execFileSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const PORT = 4329;
const OUT = resolve('public/cv');
const pages = [
  { path: '/cv/', file: 'melih-turgut-cv-tr.pdf' },
  { path: '/en/cv/', file: 'melih-turgut-cv-en.pdf' },
];

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
      if ((await fetch(`http://localhost:${PORT}/cv/`)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error('Preview sunucusu açılmadı.');
};

try {
  await waitForServer();
  mkdirSync(OUT, { recursive: true });
  for (const { path, file } of pages) {
    execFileSync(browser, [
      '--headless=new',
      '--disable-gpu',
      '--no-pdf-header-footer',
      '--virtual-time-budget=3000',
      `--print-to-pdf=${resolve(OUT, file)}`,
      `http://localhost:${PORT}${path}`,
    ]);
    console.log(`✓ public/cv/${file}`);
  }
} finally {
  // Windows'ta shell üzerinden açılan süreç ağacını da kapat
  if (process.platform === 'win32') spawn('taskkill', ['/pid', String(server.pid), '/T', '/F']);
  else server.kill();
}
