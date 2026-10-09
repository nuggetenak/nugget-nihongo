// ══════════════════════════════════════
//  core/theme.js — Dark / light toggle
//  Depends on: LS_THEME (core/state.js)
//  NOTE: themeToggle element removed from HTML (legacy button).
//  Theme is now controlled via settings.js _bindThemeSelect().
//  This file is kept for toggleTheme() backward compat only.
//
//  Exports (window.*):\
//    toggleTheme()   Toggle and persist theme
// ══════════════════════════════════════

function toggleTheme() {
  const isLight = document.body.classList.toggle('light');
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = isLight ? '🌙' : '☀️';
  localStorage.setItem(LS_THEME, isLight ? 'light' : 'dark');
}

function loadTheme() {
  const saved = localStorage.getItem(LS_THEME);
  // Also check the newer nn_theme key written by older settings.js versions
  const legacy = localStorage.getItem('nn_theme');
  const theme  = saved || legacy || 'dark';
  if (theme === 'light') {
    document.body.classList.add('light');
  } else {
    document.body.classList.remove('light');
  }
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'light' ? '🌙' : '☀️';
  // Migrate legacy nn_theme key → bunpou-theme
  if (legacy && !saved) {
    try { localStorage.setItem(LS_THEME, legacy); } catch(e) {}
  }
}
