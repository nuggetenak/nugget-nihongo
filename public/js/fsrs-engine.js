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
    console.log('[fsrs-engine] ts-fsrs CDN not detected; standalone FSRS 4.5/5.0 engine active');
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

// Standalone FSRS scheduling (delegates to fsrs-math.js if ts-fsrs CDN is absent)
function fallbackSchedule(entry, rating, now) {
  if (typeof window !== 'undefined' && typeof window.fsrsCalculate === 'function') {
    var isKanji = entry.source === 'kanji' || (entry.card && entry.card.is_kanji);
    var res = window.fsrsCalculate(entry.card, rating, now, {
      request_retention: settings.request_retention,
      maximum_interval: settings.maximum_interval,
      is_kanji: isKanji
    });
    entry.card.stability = res.stability;
    entry.card.difficulty = res.difficulty;
    entry.card.scheduled_days = res.interval;
    entry.card.due = res.due_iso;
    entry.card.reps = res.reps;
    entry.card.lapses = res.lapses;
    entry.card.state = res.state;
    entry.card.last_review = res.last_review;
    entry.card.elapsed_days = res.elapsed_days;
    return;
  }

  // Primitive emergency fallback if fsrs-math is not loaded
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
  entry.card.state = (rating <= 1) ? 3 : (entry.card.reps > 1 ? 2 : 1);
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
  var elapsedDays = Math.max(0, (now - lastReview) / DAY_MS);

  // Calibrated FSRS forgetting curve from fsrs-math.js: R(t, S) = (1 + 19/81 * t/S)^(-0.5)
  if (typeof window !== 'undefined' && typeof window.fsrsForgettingCurve === 'function') {
    return window.fsrsForgettingCurve(elapsedDays, S);
  }

  // Pure mathematical fallback: R(S, S) = 0.90
  var R = Math.pow(1 + (19 / 81) * (elapsedDays / S), -0.5);
  return Math.max(0, Math.min(1, R));
}

// ── Public API (backward-compatible) ───────────────────

// Review: accepts quality 0-4 (old SM-2 scale), string ('know'|'unsure'|'forgot'), OR 1-4 (FSRS scale)
window.srsReview = function (id, quality) {
  var rating;
  if (quality === 'forgot' || quality === 0 || quality === 1) rating = 1;      // forgot → Again
  else if (quality === 'unsure' || quality === 2) rating = 2;  // unsure → Hard
  else if (quality === 'know' || quality === 3) rating = 3;   // know (hesitant) → Good
  else if (quality === 'easy' || quality >= 4) rating = 4;    // know (confident) → Easy
  else rating = 3;
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
    for (var gi = 0; gi < window.grammarDB.length; gi++) {
      allCards.push(window.grammarDB[gi]);
    }
  }
  // Fallback to old grammarData
  if (!allCards.length && window.grammarData) {
    for (var di = 0; di < window.grammarData.length; di++) {
      if (window.grammarData[di].cat !== 'dummy') allCards.push(window.grammarData[di]);
    }
  }
  // Collect from vocabDB
  if (window.vocabDB) {
    for (var vi = 0; vi < window.vocabDB.length; vi++) {
      allCards.push(window.vocabDB[vi]);
    }
  }

  return allCards.filter(function (d) {
    if (!d || !d.id) return false; // guard against null/undefined entries
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

// ── 4-Button Next Interval Prediction ─────────────────
// Predicts intervals, due dates, stability, and difficulty for ratings 1-4
// Used by the 4-button review UI for dynamic interval labels (Again, Hard, Good, Easy)
window.fsrsPredictNext = function (cardId, now) {
  var nowDate = (now instanceof Date) ? now : new Date();
  var entry = window.srsData[cardId];
  var card = entry ? entry.card : {
    due: nowDate.toISOString(),
    stability: 0,
    difficulty: 5.0,
    elapsed_days: 0,
    scheduled_days: 0,
    reps: 0,
    lapses: 0,
    state: 0,
    last_review: nowDate.toISOString(),
  };

  var predictions = {};
  var labels = { 1: 'Again', 2: 'Hard', 3: 'Good', 4: 'Easy' };

  for (var r = 1; r <= 4; r++) {
    var pred = null;

    // 1. Try ts-fsrs library if available
    if (fsrsAvailable && fsrs) {
      try {
        var fsrsCard = {
          due: new Date(card.due),
          stability: card.stability || 0,
          difficulty: card.difficulty || 5,
          elapsed_days: card.elapsed_days || 0,
          scheduled_days: card.scheduled_days || 0,
          reps: card.reps || 0,
          lapses: card.lapses || 0,
          state: card.state || 0,
          last_review: card.last_review ? new Date(card.last_review) : undefined,
        };
        var sched = fsrs.repeat(fsrsCard, nowDate);
        var result = sched[r];
        if (result && result.card) {
          var intv = Math.max(1, Math.round((result.card.due - nowDate) / DAY_MS));
          pred = {
            rating: r,
            label: labels[r],
            interval: intv,
            intervalStr: (typeof window.fsrsFormatInterval === 'function')
              ? window.fsrsFormatInterval(intv)
              : (intv + 'd'),
            stability: Number(result.card.stability.toFixed(2)),
            difficulty: Number(result.card.difficulty.toFixed(2)),
            due: result.card.due,
            due_iso: result.card.due.toISOString(),
            state: result.card.state,
          };
        }
      } catch (e) {}
    }

    // 2. Fall back to standalone fsrsCalculate
    if (!pred) {
      if (typeof window.fsrsCalculate === 'function') {
        var isKanji = (entry && entry.source === 'kanji') || (card && card.is_kanji);
        var calc = window.fsrsCalculate(card, r, nowDate, {
          request_retention: settings.request_retention,
          maximum_interval: settings.maximum_interval,
          is_kanji: isKanji,
        });
        pred = {
          rating: r,
          label: labels[r],
          interval: calc.interval,
          intervalStr: (typeof window.fsrsFormatInterval === 'function')
            ? window.fsrsFormatInterval(calc.interval)
            : (calc.interval + 'd'),
          stability: Number(calc.stability.toFixed(2)),
          difficulty: Number(calc.difficulty.toFixed(2)),
          due: calc.due,
          due_iso: calc.due_iso,
          state: calc.state,
        };
      } else {
        // 3. Static fallback
        var staticIntervals = { 1: 1, 2: 3, 3: 7, 4: 14 };
        var iv = staticIntervals[r];
        var d = new Date(nowDate.getTime() + iv * DAY_MS);
        pred = {
          rating: r,
          label: labels[r],
          interval: iv,
          intervalStr: iv + 'd',
          stability: iv,
          difficulty: 5.0,
          due: d,
          due_iso: d.toISOString(),
          state: r === 1 ? 3 : 2,
        };
      }
    }
    predictions[r] = pred;
  }

  return predictions;
};

// ── Level Ladder Mastery Engine ───────────────────────
// Implements Level Ladder exit criteria & milestone gates
// Research: LEVEL-LADDER-SPEC-v1.md & Blueprint Part 2
window.srsLevelMastery = function (level) {
  var targetLevel = (level || 'n5').toLowerCase();
  var grammarList = [];
  if (window.grammarDB && window.grammarDB.length) {
    grammarList = window.grammarDB;
  } else if (window.grammarData && window.grammarData.length) {
    grammarList = window.grammarData.filter(function (d) { return d.cat !== 'dummy'; });
  }
  var vocabList = window.vocabDB || [];

  var levelGrammar = grammarList.filter(function (g) {
    var l = (g.level || g.jlpt || '').toLowerCase();
    return targetLevel === 'all' || l === targetLevel;
  });

  var levelVocab = vocabList.filter(function (v) {
    var l = (v.level || v.jlpt || '').toLowerCase();
    return targetLevel === 'all' || l === targetLevel;
  });

  var countTiers = function (items) {
    var total = items.length;
    var studied = 0;
    var young = 0;        // stability >= 21d (Young mature)
    var mature = 0;       // stability >= 90d (Mature - N5 milestone gate)
    var deepMature = 0;   // stability >= 180d (Deep mature - N4 milestone gate)
    var annualMature = 0; // stability >= 365d (Annual mature - N3 milestone gate)
    var totalStability = 0;
    var totalR = 0;

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (!item || !item.id) continue;
      var entry = window.srsData[item.id];
      if (!entry || !entry.card || entry.card.state === 0) continue;

      studied++;
      var s = entry.card.stability || 0;
      totalStability += s;
      totalR += getRetrievability(item.id);

      if (s >= 365) annualMature++;
      if (s >= 180) deepMature++;
      if (s >= 90) mature++;
      if (s >= 21) young++;
    }

    return {
      total: total,
      studied: studied,
      coverage_pct: total > 0 ? Number(((studied / total) * 100).toFixed(1)) : 0,
      young: young,
      young_pct: total > 0 ? Number(((young / total) * 100).toFixed(1)) : 0,
      mature: mature,
      mature_pct: total > 0 ? Number(((mature / total) * 100).toFixed(1)) : 0,
      deep_mature: deepMature,
      annual_mature: annualMature,
      avg_stability: studied > 0 ? Number((totalStability / studied).toFixed(1)) : 0,
      avg_retrievability: studied > 0 ? Number((totalR / studied).toFixed(3)) : 0,
    };
  };

  var gStats = countTiers(levelGrammar);
  var vStats = countTiers(levelVocab);

  // Targets from Level Ladder Specification:
  // N5: Vocab >= 80% (>=21d), Grammar >= 75% (>=21d), Mature >= 500 (>=90d)
  // N4: Vocab >= 80% (>=21d), Grammar >= 75% (>=21d), Deep mature >= 1200 (>=180d)
  // N3: Vocab >= 75% (>=30d), Grammar >= 80% (>=30d), Annual mature >= 3000 (>=365d)
  // N2: Vocab >= 70% (>=30d), Annual mature >= 5000 (>=365d)
  // N1: Vocab >= 65% (>=30d), Annual mature >= 8000 (>=365d)
  var milestones = {
    n5: { vocabPct: 80, grammarPct: 75, matureCount: 500, matureStability: 90 },
    n4: { vocabPct: 80, grammarPct: 75, matureCount: 1200, matureStability: 180 },
    n3: { vocabPct: 75, grammarPct: 80, matureCount: 3000, matureStability: 365 },
    n2: { vocabPct: 70, grammarPct: 75, matureCount: 5000, matureStability: 365 },
    n1: { vocabPct: 65, grammarPct: 70, matureCount: 8000, matureStability: 365 },
  };

  var ms = milestones[targetLevel] || milestones.n5;
  var vocabPassed = vStats.young_pct >= ms.vocabPct;
  var grammarPassed = gStats.young_pct >= ms.grammarPct;

  var currentMilestoneCount = (ms.matureStability === 90) ? (vStats.mature + gStats.mature)
    : (ms.matureStability === 180) ? (vStats.deep_mature + gStats.deep_mature)
    : (vStats.annual_mature + gStats.annual_mature);

  var milestonePassed = currentMilestoneCount >= ms.matureCount;
  var levelComplete = vocabPassed && grammarPassed && milestonePassed;

  return {
    level: targetLevel,
    total_cards: gStats.total + vStats.total,
    studied_cards: gStats.studied + vStats.studied,
    overall_coverage_pct: (gStats.total + vStats.total > 0)
      ? Number((((gStats.studied + vStats.studied) / (gStats.total + vStats.total)) * 100).toFixed(1))
      : 0,
    vocab: vStats,
    grammar: gStats,
    gates: {
      vocab_gate: {
        metric: 'stability >= 21d',
        target_pct: ms.vocabPct,
        current_pct: vStats.young_pct,
        passed: vocabPassed,
      },
      grammar_gate: {
        metric: 'stability >= 21d',
        target_pct: ms.grammarPct,
        current_pct: gStats.young_pct,
        passed: grammarPassed,
      },
      milestone_gate: {
        metric: 'stability >= ' + ms.matureStability + 'd',
        target_count: ms.matureCount,
        current_count: currentMilestoneCount,
        passed: milestonePassed,
      },
      level_promoted: levelComplete,
    },
  };
};

// ── Hook into saveProgress ─────────────────────────────
var _origSaveProgress = window.saveProgress;
window.saveProgress = function (id, result) {
  // Call original (updates progress object + localStorage)
  if (_origSaveProgress) _origSaveProgress(id, result);
  // Feed FSRS: map 3-button know/unsure/forgot to standard FSRS 3(Good) / 2(Hard) / 1(Again)
  var q = (result === 'know') ? 3 : (result === 'unsure') ? 2 : 1;
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
  'FSRS:', fsrsAvailable ? 'active' : 'standalone mode');

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    srsData: window.srsData,
    srsReview: window.srsReview,
    srsReviewFSRS: window.srsReviewFSRS,
    srsDueToday: window.srsDueToday,
    srsDueCount: window.srsDueCount,
    srsStatus: window.srsStatus,
    srsStats: window.srsStats,
    srsNextDue: window.srsNextDue,
    srsRetrievability: window.srsRetrievability,
    srsStrength: window.srsStrength,
    fsrsPredictNext: window.fsrsPredictNext,
    srsLevelMastery: window.srsLevelMastery,
  };
}

})();
