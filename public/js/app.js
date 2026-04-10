// ══════════════════════════════════════
//  app.js — Thin orchestrator
//  Just initializes everything on DOMContentLoaded.
//  All logic lives in core/* and feature JS files.
//
//  Load order (index.html):
//    local-state.js (IndexedDB) → core/version.js → core/state.js
//    → core/router.js → core/theme.js → core/install.js
//    → fsrs-engine.js → gamification.js → streak.js
//    → backup-restore.js → ai-tutor.js → analytics.js
//    → swipe.js → browse.js → quiz.js → feature files...
//    → app.js  ← this file, always last
// ══════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  loadStorage();        // core/state.js
  // srsLoad removed — fsrs-engine.js auto-initialises on load
  updateBookmarkPill(); // core/state.js
  registerSW();         // core/install.js
  loadStreak();         // streak.js (defined there; reads from gamification.js streakState)
  initSwipeGesture();   // swipe.js
  loadTheme();          // core/theme.js

  // Build vocab + grammar indexes (O(1) lookup)
  if (window.buildVocabIndex)   window.buildVocabIndex();
  if (window.buildGrammarIndex) window.buildGrammarIndex();

  if (window.browseInit) window.browseInit(); // browse.js

  // AI Tutor + Analytics init
  if (window.initAITutor)   window.initAITutor();
  if (window.initAnalytics) window.initAnalytics();

  // Daily word di welcome banner
  if (window.initDailyWord) window.initDailyWord();

  // Hide welcome banner jika sudah pernah dismiss
  if (localStorage.getItem('wb-dismissed')) {
    const wb = document.getElementById('welcomeBanner');
    if (wb) wb.style.display = 'none';
  }
});

// ── Tab switch router ───────────────────────────────────────────
// Extends switchTab (defined in core/router.js) to call page-specific hooks
const _origSwitchTab = window.switchTab;
window.switchTab = function (tab, btn) {
  if (_origSwitchTab) _origSwitchTab(tab, btn);

  const pages = ['browsePage', 'quizPage', 'senseiPage', 'statsPage'];
  pages.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });

  const pageMap = {
    browse : 'browsePage',
    quiz   : 'quizPage',
    sensei : 'senseiPage',
    stats  : 'statsPage',
  };
  const targetId = pageMap[tab];
  if (targetId) {
    const el = document.getElementById(targetId);
    if (el) el.classList.add('active');
  }

  // Tab-specific hooks
  if (tab === 'sensei' && window._aiTutorOnTabShow)   window._aiTutorOnTabShow();
  if (tab === 'stats'  && window._analyticsOnTabShow) window._analyticsOnTabShow();
};
