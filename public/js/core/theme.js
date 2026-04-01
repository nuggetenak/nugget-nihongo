// ══════════════════════════════════════
//  core/theme.js — Dark / light toggle
//  Depends on: LS_THEME (core/state.js)
//
//  Exports (window.*):
//    toggleTheme()   Toggle and persist theme
// ══════════════════════════════════════

function toggleTheme() {
  const isLight = document.body.classList.toggle('light');
  document.getElementById('themeToggle').textContent = isLight ? '🌙' : '☀️';
  localStorage.setItem(LS_THEME, isLight ? 'light' : 'dark');
}

function loadTheme() {
  if (localStorage.getItem(LS_THEME) === 'light') {
    document.body.classList.add('light');
    document.getElementById('themeToggle').textContent = '🌙';
  }
}
