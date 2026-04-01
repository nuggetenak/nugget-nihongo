// ══════════════════════════════════════
//  srs.js — SM-2 Spaced Repetition Algorithm
//  Depends on: LS_SRS, saveProgress (core/state.js)
//
//  Card data shape: { reps, interval, ef, due, lastReview, history[] }
//  quality: know=4, unsure=3, forgot=0
//
//  Exports (window.*):
//    srsData         object   Raw SRS data per cardId
//    srsDueToday()   fn       Returns cards due today from grammarData
//    srsStatus(id)   fn       'new' | 'learning' | 'young' | 'mature'
// ══════════════════════════════════════

window.srsData = {};

function srsLoad() {
  try { window.srsData = JSON.parse(localStorage.getItem(LS_SRS)) || {}; } catch(e) { window.srsData = {}; }
}
function srsSave() {
  try { localStorage.setItem(LS_SRS, JSON.stringify(window.srsData)); } catch(e) {}
}

function srsReview(id, quality) {
  const today = Math.floor(Date.now() / 86400000);
  let c = window.srsData[id] || { reps: 0, interval: 1, ef: 2.5, due: today, history: [] };

  c.history = (c.history || []).slice(-19);
  c.history.push({ date: today, q: quality });

  if (quality < 3) {
    c.reps = 0;
    c.interval = quality === 0 ? 1 : 2;
  } else {
    if      (c.reps === 0) c.interval = 1;
    else if (c.reps === 1) c.interval = 6;
    else                   c.interval = Math.round(c.interval * c.ef);
    c.reps++;
  }

  c.ef = Math.min(3.0, Math.max(1.3,
    c.ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  ));
  c.due        = today + c.interval;
  c.lastReview = today;
  window.srsData[id] = c;
  srsSave();
  return c;
}

window.srsDueToday = function() {
  const today = Math.floor(Date.now() / 86400000);
  return (window.grammarData || []).filter(d => {
    if (d.cat === 'dummy') return false;
    const c = window.srsData[d.id];
    return !c || c.due <= today;
  });
};

window.srsStatus = function(id) {
  const c = window.srsData[id];
  if (!c || c.reps === 0) return 'new';
  if (c.interval < 7)    return 'learning';
  if (c.interval < 21)   return 'young';
  return 'mature';
};

// Hook into saveProgress so SRS updates on every card review
const _origSaveProgress = window.saveProgress;
window.saveProgress = function(id, result) {
  _origSaveProgress && _origSaveProgress(id, result);
  const q = result === 'know' ? 4 : result === 'unsure' ? 3 : 0;
  srsReview(id, q);
  if (window.updateProgressPanel) window.updateProgressPanel();
};

// TASK-UI-5: alias window.srsUpdate → srsReview (dipanggil fillin.js:343)
window.srsUpdate = function(id, quality) { srsReview(id, quality); };
