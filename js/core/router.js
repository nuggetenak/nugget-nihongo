// ══════════════════════════════════════
//  core/router.js — Tab navigation
//
//  Exports (window.*):
//    switchTab(tab, btn)   Switch active page tab
// ══════════════════════════════════════

window.switchTab = function(tab, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(tab + 'Page').classList.add('active');
};
