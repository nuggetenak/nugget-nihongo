// ══════════════════════════════════════
//  app.js — Thin orchestrator
//  Just initializes everything on DOMContentLoaded.
//  All logic lives in core/* and feature JS files.
//
//  Load order (index.html):
//    core/version.js → core/state.js → core/router.js
//    → core/theme.js → core/install.js
//    → srs.js → streak.js → swipe.js
//    → browse.js → quiz.js → feature files...
//    → app.js  ← this file, always last
// ══════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  loadStorage();        // core/state.js
  srsLoad();            // srs.js
  updateBookmarkPill(); // core/state.js
  registerSW();         // core/install.js
  loadStreak();         // streak.js
  initSwipeGesture();   // swipe.js
  loadTheme();          // core/theme.js

  // Build vocab + grammar indexes (O(1) lookup)
  if (window.buildVocabIndex) window.buildVocabIndex();
  if (window.buildGrammarIndex) window.buildGrammarIndex();

  if (window.browseInit) window.browseInit(); // browse.js

  // Daily word di welcome banner
  if (window.initDailyWord) window.initDailyWord();

  // Hide welcome banner jika sudah pernah dismiss
  if (localStorage.getItem('wb-dismissed')) {
    const wb = document.getElementById('welcomeBanner');
    if (wb) wb.style.display = 'none';
  }
});
