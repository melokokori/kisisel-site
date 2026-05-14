const THEMES = ['dark', 'light', 'bad'];
const ICONS  = { dark: '🌙', light: '☀️', bad: '🤮' };

function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = ICONS[theme];

  if (typeof weather      !== 'undefined') theme === 'dark'  ? weather.start()     : weather.stop();
  if (typeof sunEffect    !== 'undefined') theme === 'light' ? sunEffect.start()   : sunEffect.stop();
  if (typeof chaosEffect  !== 'undefined') theme === 'bad'   ? chaosEffect.start() : chaosEffect.stop();
}

function cycleTheme() {
  const current = document.body.getAttribute('data-theme') || 'light';
  applyTheme(THEMES[(THEMES.indexOf(current) + 1) % THEMES.length]);
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof weather      !== 'undefined') weather.init();
  if (typeof sunEffect    !== 'undefined') sunEffect.init();
  if (typeof chaosEffect  !== 'undefined') chaosEffect.init();

  const saved = localStorage.getItem('theme') || 'light';
  applyTheme(saved);

  document.getElementById('themeBtn')?.addEventListener('click', cycleTheme);
});
