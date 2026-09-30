// ══════════════════════════════════════
//  core/router.js — Tab navigation + hash persistence
//
//  Exports (window.*):\
//    switchTab(tab, btn)   Switch active page tab
//    restoreTabFromHash()  Read URL hash and activate matching tab
// ══════════════════════════════════════

const VALID_TABS = ['home', 'browse', 'quiz', 'sensei', 'stats', 'settings'];

window.switchTab = function(tab, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(tab + 'Page');
  if (page) page.classList.add('active');
  // Persist tab in URL hash — no page reload, back button works
  try { history.replaceState(null, '', '#' + tab); } catch(e) {}
};

// Called once on DOMContentLoaded (from app.js) to restore tab from hash
window.restoreTabFromHash = function() {
  const hash = (location.hash || '').replace('#', '').toLowerCase();
  const targetTab = VALID_TABS.includes(hash) ? hash : 'home';
  // Find the matching tab button and activate
  const allBtns = document.querySelectorAll('.tab-btn');
  let found = null;
  allBtns.forEach(function(b) {
    const oc = b.getAttribute('onclick') || '';
    if (oc.includes("'" + targetTab + "'") || oc.includes('"' + targetTab + '"')) found = b;
  });
  window.switchTab(targetTab, found);
};

function _tabLabel(tab) {
  return { home:'Beranda', browse:'Materi', quiz:'Latihan', sensei:'Sensei', stats:'Progress', settings:'Lainnya' }[tab] || '';
}
