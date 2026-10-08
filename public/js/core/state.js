// ══════════════════════════════════════
//  core/state.js — localStorage keys + global state
//  Loaded first. All other JS files depend on this.
//
//  Exports (window.*):
//    progress        object   { [cardId]: 'know'|'unsure'|'forgot' }
//    bookmarks       Set      Set of bookmarked card IDs
//    saveProgress()  fn       Save card result + trigger SRS + update panel
//    toggleBookmark() fn      Toggle bookmark on a card
// ══════════════════════════════════════

// ── localStorage keys (single source of truth) ──
window.LS_PROGRESS        = 'bunpou_progress';
window.LS_BOOKMARKS       = 'bunpou_bookmarks';
window.LS_STREAK          = 'bunpou_streak';
window.LS_THEME           = 'bunpou-theme';
window.LS_SRS             = 'bunpou_srs';
window.LS_STREAK_ACTIVITY = 'bunpou_streak_activity'; // TASK-UI-7: flag aktivitas harian

const LS_PROGRESS        = window.LS_PROGRESS;
const LS_BOOKMARKS       = window.LS_BOOKMARKS;
const LS_STREAK          = window.LS_STREAK;
const LS_THEME           = window.LS_THEME;
const LS_SRS             = window.LS_SRS;
const LS_STREAK_ACTIVITY = window.LS_STREAK_ACTIVITY;


// ── Global state ──
window.progress  = {};
window.bookmarks = new Set();

function loadStorage() {
  try {
    const p = localStorage.getItem(LS_PROGRESS);
    window.progress = p ? JSON.parse(p) : {};
  } catch(e) { window.progress = {}; }
  try {
    const b = localStorage.getItem(LS_BOOKMARKS);
    window.bookmarks = b ? new Set(JSON.parse(b)) : new Set();
  } catch(e) { window.bookmarks = new Set(); }
}
window.loadStorage = loadStorage;
loadStorage();

window.saveProgress = function(id, result) {
  window.progress[id] = result;
  try { localStorage.setItem(LS_PROGRESS, JSON.stringify(window.progress)); } catch(e) {}
  if (window.updateProgressPanel) window.updateProgressPanel();
};

window.toggleBookmark = function(id, btn, e) {
  e.stopPropagation();
  if (window.bookmarks.has(id)) {
    window.bookmarks.delete(id);
    btn.classList.remove('bookmarked');
    // SVG button (peel card): toggle fill attribute; text button (detail): set emoji
    const svg = btn.querySelector('svg');
    if (svg) { svg.setAttribute('fill', 'none'); }
    else { btn.textContent = '☆'; }
  } else {
    window.bookmarks.add(id);
    btn.classList.add('bookmarked');
    const svg = btn.querySelector('svg');
    if (svg) { svg.setAttribute('fill', 'currentColor'); }
    else { btn.textContent = '⭐'; }
  }
  try { localStorage.setItem(LS_BOOKMARKS, JSON.stringify([...window.bookmarks])); } catch(e) {}
  updateBookmarkPill();
};

function updateBookmarkPill() {
  const pill = document.getElementById('pill-bookmark');
  if (!pill) return;
  const n = window.bookmarks.size;
  pill.textContent = n > 0 ? `⭐ ${n}` : '⭐ Bookmark';
}
