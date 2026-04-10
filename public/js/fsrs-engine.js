// ══════════════════════════════════════════════════════
//  fsrs-engine.js — Nugget Nihongo FSRS SRS Engine
//  Replaces: srs.js (SM-2)
//  Uses: ts-fsrs via CDN (loaded in index.html before this file)
//  Architecture v3 / Feature Expansion v1
//
//  Exports (window.*):
//    srsData          object   Raw FSRS card data per cardId
//    srsDueToday()    fn       Returns cards due today
//    srsStatus(id)    fn       'new'|'learning'|'review'|'relearning'|'mature'
//    srsReview(id,q)  fn       Record a review (quality 0-4)
//    srsUpdate(id,q)  fn       Alias for srsReview
//    saveProgress(id,result)   Enhanced — feeds FSRS
//    srsRetrievability(id) fn  Get current R value (0-1)
//    srsStrength(id)  fn       Get strength label + color
//    srsDueCount()    fn       Count of cards due today
//    srsNextDue(id)   fn       Next review date for a card
//    fsrsInstance      object  Raw FSRS instance (advanced)
//    fsrsSettings      object  User-adjustable FSRS settings
// ══════════════════════════════════════════════════════

(function () {
'use strict';

// ── Constants ──────────────────────────────────────────
const LS_FSRS = 'nn_fsrs_cards';
const LS_FSRS_SETTINGS = 'nn_fsrs_settings';
const LS_OLD_SRS = 'bunpou_srs';  // legacy SM-2 key
const DAY_MS = 86400000;

// ── FSRS library detection ─────────────────────────────
// ts-fsrs loaded via CDN sets window.tsfsrs (UMD) or we import
let FSRS, Rating, State, createEmptyCard, generatorParameters;

function initFSRSLib() {
  const lib = window.tsfsrs;
  if (!lib) {
    console.error('[fsrs-engine] ts-fsrs library not loaded! Falling back to basic scheduling.');
    return false;
  }
  FSRS = lib.FSRS || lib.fsrs;
  Rating = lib.Rating;
  State = lib.State;
  createEmptyCard = lib.createEmptyCard;
  generatorParameters = lib.generatorParameters;
  return true;
}

// ── Settings ───────────────────────────────────────────
const DEFAULT_SETTINGS = {
  request_retention: 0.9,
  maximum_interval: 365,
  new_cards_per_day: 20,
  reviews_per_day: 200,
};

let settings = DEFAULT_SETTINGS;
function loadSettings() {
  try {
    const stored = JSON.parse(localStorage.getItem(LS_FSRS_SETTINGS));
    if (stored) settings = { ...DEFAULT_SETTINGS, ...stored };
  } catch (e) {}
}
function saveSettings() {
  try { localStorage.setItem(LS_FSRS_SETTINGS, JSON.stringify(settings)); } catch (e) {}
}
window.fsrsSettings = settings;

// ── Card Storage ───────────────────────────────────────
// { [cardId]: { card: FSRSCard, history: [], source: 'grammar'|'vocab' } }
window.srsData = {};

function loadCards() {
  try {
    window.srsData = JSON.parse(localStorage.getItem(LS_FSRS)) || {};
  } catch (e) {
    window.srsData = {};
  }
}

function saveCards() {
  try {
    localStorage.setItem(LS_FSRS, JSON.stringify(window.srsData));
  } catch (e) {}
}

// ── SM-2 → FSRS Migration ─────────────────────────────
function migrateSM2() {
  let oldData;
  try {
    oldData = JSON.parse(localStorage.getItem(LS_OLD_SRS));
  } catch (e) { return; }

  if (!oldData || typeof oldData !== 'object') return;

  // Skip if already migrated
  const fsrsData = JSON.parse(localStorage.getItem(LS_FSRS) || '{}');
  if (Object.keys(fsrsData).length > 0) {
    console.log('[fsrs-engine] FSRS data exists, skipping SM-2 migration');
    return;
  }

  let migrated = 0;
  const now = new Date();

  for (const [cardId, sm2] of Object.entries(oldData)) {
    if (!sm2 || typeof sm2 !== 'object') continue;

    // Convert SM-2 ease factor → FSRS difficulty
    // SM-2 ef range: 1.3–3.0 (higher = easier)
    // FSRS difficulty: 1.0–10.0 (higher = harder)
    const ef = sm2.ef || 2.5;
    const difficulty = Math.max(1, Math.min(10, 11 - ef * 3.33));

    // Convert SM-2 interval → FSRS stability
    const stability = Math.max(0.1, sm2.interval || 1);

    // Convert SM-2 due (days since epoch) → ISO date
    const dueDate = new Date((sm2.due || Math.floor(Date.now() / DAY_MS)) * DAY_MS);

    // Determine state
    let state = 2; // Review
    if (!sm2.reps || sm2.reps === 0) state = 0; // New
    else if (sm2.interval < 1) state = 1; // Learning

    const card = {
      due: dueDate.toISOString(),
      stability: stability,
      difficulty: difficulty,
      elapsed_days: 0,
      scheduled_days: sm2.interval || 0,
      reps: sm2.reps || 0,
      lapses: 0,
      state: state,
      last_review: sm2.lastReview
        ? new Date(sm2.lastReview * DAY_MS).toISOString()
        : now.toISOString(),
    };

    // Preserve history
    const history = (sm2.history || []).map(function (h) {
      return {
        date: new Date((h.date || 0) * DAY_MS).toISOString(),
        rating: h.q >= 4 ? 3 : h.q >= 2 ? 2 : 1, // map to FSRS ratings
      };
    });

    window.srsData[cardId] = {
      card: card,
      history: history.slice(-20),
      source: cardId.startsWith('vg-') ? 'vocab' : 'grammar',
    };
    migrated++;
  }

  if (migrated > 0) {
    saveCards();
    console.log('[fsrs-engine] Migrated', migrated, 'cards from SM-2 to FSRS');
    // Don't delete old data yet — keep as backup
    // localStorage.removeItem(LS_OLD_SRS);
  }
}

// ── FSRS Instance ──────────────────────────────────────
let fsrs = null;
let fsrsAvailable = false;

function initFSRS() {
  if (!initFSRSLib()) {
    fsrsAvailable = false;
    return;
  }

  try {
    const params = generatorParameters({
      request_retention: settings.request_retention,
      maximum_interval: settings.maximum_interval,
    });
    fsrs = new FSRS(params);
    fsrsAvailable = true;
    window.fsrsInstance = fsrs;
    console.log('[fsrs-engine] FSRS initialized (retention:', settings.request_retention, ')');
  } catch (e) {
    console.error('[fsrs-engine] FSRS init failed:', e);
    fsrsAvailable = false;
  }
}

// ── Core Review Function ───────────────────────────────
// rating: 1=Again, 2=Hard, 3=Good, 4=Easy
function reviewCard(cardId, rating) {
  const now = new Date();
  let entry = window.srsData[cardId];

  if (!entry) {
    // New card — create empty FSRS card
    if (fsrsAvailable && createEmptyCard) {
      const emptyCard = createEmptyCard(now);
      entry = {
        card: {
          due: emptyCard.due.toISOString(),
          stability: emptyCard.stability,
          difficulty: emptyCard.difficulty,
          elapsed_days: emptyCard.elapsed_days,
          scheduled_days: emptyCard.scheduled_days,
          reps: emptyCard.reps,
          lapses: emptyCard.lapses,
          state: emptyCard.state,
          last_review: emptyCard.last_review
            ? emptyCard.last_review.toISOString()
            : now.toISOString(),
        },
        history: [],
        source: cardId.startsWith('vg-') ? 'vocab' : 'grammar',
      };
    } else {
      // Fallback: basic card
      entry = {
        card: {
          due: now.toISOString(),
          stability: 0,
          difficulty: 5,
          elapsed_days: 0,
          scheduled_days: 0,
          reps: 0,
          lapses: 0,
          state: 0,
          last_review: now.toISOString(),
        },
        history: [],
        source: cardId.startsWith('vg-') ? 'vocab' : 'grammar',
      };
    }
  }

  // Check custom FSRS hook (fsrs-math.js) before standard ts-fsrs
  if (window._customFSRS) {
    try {
      var custom = window._customFSRS(entry.card, rating, now);
      if (custom) {
        entry.card.stability = custom.stability;
        entry.card.difficulty = custom.difficulty;
        entry.card.scheduled_days = custom.interval;
        entry.card.due = new Date(now.getTime() + custom.interval * 86400000).toISOString();
        entry.card.reps = (entry.card.reps || 0) + 1;
        if (rating === 1) entry.card.lapses = (entry.card.lapses || 0) + 1;
        entry.card.last_review = now.toISOString();
        entry.card.elapsed_days = Math.max(0, Math.round((now - new Date(entry.card.last_review)) / 86400000));
        window.srsData[cardId] = entry;
        entry.history = (entry.history || []).slice(-19);
        entry.history.push({ date: now.toISOString(), rating: rating });
        saveCards();
        return entry;
      }
    } catch (e) {
      console.warn('[fsrs-engine] Custom FSRS hook error, falling through to ts-fsrs:', e);
    }
  }

  // Schedule next review via FSRS
  if (fsrsAvailable && fsrs) {
    try {
      // Reconstruct FSRS card object with Date objects
      const fsrsCard = {
        due: new Date(entry.card.due),
        stability: entry.card.stability,
        difficulty: entry.card.difficulty,
        elapsed_days: entry.card.elapsed_days,
        scheduled_days: entry.card.scheduled_days,
        reps: entry.card.reps,
        lapses: entry.card.lapses,
        state: entry.card.state,
        last_review: entry.card.last_review
          ? new Date(entry.card.last_review)
          : undefined,
      };

      const scheduling = fsrs.repeat(fsrsCard, now);
      const result = scheduling[rating];

      if (result && result.card) {
        const newCard = result.card;
        entry.card = {
          due: newCard.due.toISOString(),
          stability: newCard.stability,
          difficulty: newCard.difficulty,
          elapsed_days: newCard.elapsed_days,
          scheduled_days: newCard.scheduled_days,
          reps: newCard.reps,
          lapses: newCard.lapses,
          state: newCard.state,
          last_review: newCard.last_review
            ? newCard.last_review.toISOString()
            : now.toISOString(),
        };
      }
    } catch (e) {
      console.warn('[fsrs-engine] FSRS scheduling error, using fallback:', e);
      fallbackSchedule(entry, rating, now);
    }
  } else {
    fallbackSchedule(entry, rating, now);
  }

  // Update history
  entry.history = (entry.history || []).slice(-19);
  entry.history.push({
    date: now.toISOString(),
    rating: rating,
  });

  window.srsData[cardId] = entry;
  saveCards();

  // ── local-state.js hook: persist to IndexedDB + queue Supabase sync ──
  // localState is loaded before this file; guard in case it isn't ready yet.
  if (window.localState && window.localState.isAvailable) {
    window.localState.saveCard(cardId, entry);
    window.localState.queueSync({
      type:      'review',
      id:        cardId,
      item_type: entry.source === 'vocab' ? 'vocab' : 'grammar',
      item_id:   cardId,
      data:      entry.card,
      timestamp: Date.now(),
    });
  }

  return entry;
}

// Simple fallback if FSRS lib fails to load
function fallbackSchedule(entry, rating, now) {
  var intervals = { 1: 1, 2: 3, 3: 7, 4: 14 };
  var multipliers = { 1: 0.5, 2: 0.8, 3: 1.5, 4: 2.5 };
  var baseInterval = entry.card.scheduled_days || 1;
  var newInterval = Math.max(1, Math.round(
    rating <= 1 ? intervals[1] : baseInterval * (multipliers[rating] || 1.5)
  ));
  var dueDate = new Date(now.getTime() + newInterval * DAY_MS);

  entry.card.due = dueDate.toISOString();
  entry.card.scheduled_days = newInterval;
  entry.card.elapsed_days = 0;
  entry.card.reps = (entry.card.reps || 0) + 1;
  entry.card.last_review = now.toISOString();
  entry.card.stability = newInterval;
  if (rating <= 1) entry.card.lapses = (entry.card.lapses || 0) + 1;
}

// ── Retrievability Calculation ─────────────────────────
function getRetrievability(cardId) {
  var entry = window.srsData[cardId];
  if (!entry || !entry.card || !entry.card.last_review) return 0;
  if (entry.card.state === 0) return 0; // New card

  var S = entry.card.stability || 1;
  var lastReview = new Date(entry.card.last_review);
  var now = new Date();
  var elapsedDays = (now - lastReview) / DAY_MS;

  // FSRS retrievability formula: R = (1 + t / (9 * S))^(-1)
  // This is the power forgetting curve
  var R = Math.pow(1 + elapsedDays / (9 * S), -1);
  return Math.max(0, Math.min(1, R));
}

// ── Public API (backward-compatible) ───────────────────

// Review: accepts quality 0-4 (old SM-2 scale) OR 1-4 (FSRS scale)
window.srsReview = function (id, quality) {
  // Map old SM-2 quality (0,2,3,4) to FSRS rating (1,2,3,4)
  var rating;
  if (quality === 0) rating = 1;      // forgot → Again
  else if (quality <= 2) rating = 2;  // unsure → Hard
  else if (quality === 3) rating = 3; // know (hesitant) → Good
  else rating = 4;                     // know (confident) → Easy
  return reviewCard(id, rating);
};

// Direct FSRS rating (1-4) — for new 4-button UI
window.srsReviewFSRS = function (id, rating) {
  return reviewCard(id, Math.max(1, Math.min(4, rating)));
};

// Alias for backward compat
window.srsUpdate = function (id, quality) {
  return window.srsReview(id, quality);
};

// Due today: returns array of card objects from grammarDB + vocabDB
window.srsDueToday = function () {
  var now = new Date();
  var allCards = [];

  // Collect from grammarDB
  if (window.grammarDB) {
    for (var i = 0; i < window.grammarDB.length; i++) {
      allCards.push(window.grammarDB[i]);
    }
  }
  // Fallback to old grammarData
  if (!allCards.length && window.grammarData) {
    for (var i = 0; i < window.grammarData.length; i++) {
      if (window.grammarData[i].cat !== 'dummy') allCards.push(window.grammarData[i]);
    }
  }
  // Collect from vocabDB
  if (window.vocabDB) {
    for (var i = 0; i < window.vocabDB.length; i++) {
      allCards.push(window.vocabDB[i]);
    }
  }

  return allCards.filter(function (d) {
    var entry = window.srsData[d.id];
    if (!entry) return false; // only show cards user has seen
    var due = new Date(entry.card.due);
    return due <= now;
  });
};

// Due count
window.srsDueCount = function () {
  return window.srsDueToday().length;
};

// Card status
window.srsStatus = function (id) {
  var entry = window.srsData[id];
  if (!entry || !entry.card) return 'new';
  var state = entry.card.state;
  if (state === 0) return 'new';
  if (state === 1) return 'learning';
  if (state === 3) return 'relearning';
  // State 2 = Review — check maturity
  var stability = entry.card.stability || 0;
  if (stability >= 21) return 'mature';
  if (stability >= 7) return 'young';
  return 'learning';
};

// Retrievability (0-1)
window.srsRetrievability = function (id) {
  return getRetrievability(id);
};

// Strength label + color for UI
window.srsStrength = function (id) {
  var entry = window.srsData[id];
  if (!entry || !entry.card || entry.card.state === 0) {
    return { label: 'Belum Dipelajari', color: '#666', level: 'none' };
  }
  var R = getRetrievability(id);
  if (R >= 0.90) return { label: 'Kuat', color: '#4ade80', level: 'strong' };
  if (R >= 0.70) return { label: 'Mulai Pudar', color: '#facc15', level: 'fading' };
  if (R >= 0.50) return { label: 'Lemah', color: '#fb923c', level: 'weak' };
  return { label: 'Hampir Lupa', color: '#f87171', level: 'critical' };
};

// Next due date
window.srsNextDue = function (id) {
  var entry = window.srsData[id];
  if (!entry || !entry.card) return null;
  return new Date(entry.card.due);
};

// Stats for dashboard
window.srsStats = function () {
  var total = 0, newCount = 0, learning = 0, review = 0, mature = 0;
  for (var id in window.srsData) {
    if (!window.srsData.hasOwnProperty(id)) continue;
    total++;
    var status = window.srsStatus(id);
    if (status === 'new') newCount++;
    else if (status === 'learning' || status === 'relearning') learning++;
    else if (status === 'young') review++;
    else if (status === 'mature') mature++;
  }
  return {
    total: total,
    new: newCount,
    learning: learning,
    review: review,
    mature: mature,
    due_today: window.srsDueCount(),
  };
};

// ── Hook into saveProgress ─────────────────────────────
var _origSaveProgress = window.saveProgress;
window.saveProgress = function (id, result) {
  // Call original (updates progress object + localStorage)
  if (_origSaveProgress) _origSaveProgress(id, result);
  // Feed FSRS
  var q = result === 'know' ? 4 : result === 'unsure' ? 2 : 0;
  window.srsReview(id, q);
  if (window.updateProgressPanel) window.updateProgressPanel();
};

// ── Initialize ─────────────────────────────────────────
loadSettings();
loadCards();
migrateSM2();
initFSRS();

var stats = window.srsStats();
console.log('[fsrs-engine] Loaded:', stats.total, 'cards |',
  'Due today:', stats.due_today, '|',
  'Mature:', stats.mature, '|',
  'FSRS:', fsrsAvailable ? 'active' : 'fallback mode');

})();
