// ══════════════════════════════════════════════════════
//  js/core/grammar-query.js — Nugget Nihongo
//  O(1) index + query helpers untuk window.grammarData
//  Load SETELAH data/index.js dan vocab-index.js
// ══════════════════════════════════════════════════════

(function () {

// ── Build index ────────────────────────────────────────
window.buildGrammarIndex = function () {
  const data = window.grammarData || [];

  window.grammarIdx = {
    byId    : new Map(data.map(c => [c.id, c])),
    byLevel : _group(data, 'level'),
    byWeek  : _groupMulti(data, c => `${c.level}-w${c.week}`),
    byCat   : _group(data, 'cat'),
    byDay   : _groupMulti(data, c => `${c.level}-w${c.week}-d${c.day}`),
  };

  // Cross-ref: vocab entries → grammar cards
  // Builds grammarIdx.byVocabId: vocabId → GrammarCard[]
  window.grammarIdx.byVocabId = new Map();
  if (window.vocabDB) {
    for (const v of window.vocabDB) {
      for (const gid of (v.related_grammar || [])) {
        const card = window.grammarIdx.byId.get(gid);
        if (!card) continue;
        if (!window.grammarIdx.byVocabId.has(v.id)) {
          window.grammarIdx.byVocabId.set(v.id, []);
        }
        window.grammarIdx.byVocabId.get(v.id).push(card);
      }
    }
  }
};

function _group(arr, key) {
  const out = {};
  for (const item of arr) {
    const v = item[key];
    if (!out[v]) out[v] = [];
    out[v].push(item);
  }
  return out;
}

function _groupMulti(arr, keyFn) {
  const out = {};
  for (const item of arr) {
    const k = keyFn(item);
    if (!out[k]) out[k] = [];
    out[k].push(item);
  }
  return out;
}

// ── Public query API ───────────────────────────────────

/** Get one card by id */
window.getCard = function (id) {
  return window.grammarIdx?.byId.get(id) || null;
};

/**
 * Query grammar cards
 * @param {{ level, week, day, cat, excludeDummy }} filter
 * @returns GrammarCard[]
 */
window.queryGrammar = function (filter = {}) {
  const idx = window.grammarIdx;
  if (!idx) return [];

  let pool;
  if (filter.level && filter.week && filter.day) {
    pool = idx.byDay[`${filter.level}-w${filter.week}-d${filter.day}`] || [];
  } else if (filter.level && filter.week) {
    pool = idx.byWeek[`${filter.level}-w${filter.week}`] || [];
  } else if (filter.level) {
    pool = idx.byLevel[filter.level] || [];
  } else if (filter.cat) {
    pool = idx.byCat[filter.cat] || [];
  } else {
    pool = window.grammarData || [];
  }

  if (filter.cat && (filter.level || filter.week)) {
    pool = pool.filter(c => c.cat === filter.cat);
  }
  if (filter.excludeDummy !== false) {
    pool = pool.filter(c => c.cat !== 'dummy');
  }

  return pool;
};

/** Random N cards */
window.sampleGrammar = function (filter = {}, n = 5) {
  const pool = window.queryGrammar(filter);
  return pool.sort(() => Math.random() - 0.5).slice(0, n);
};

/** Grammar cards related to a vocab entry */
window.grammarForVocab = function (vocabId) {
  return window.grammarIdx?.byVocabId.get(vocabId) || [];
};

/** Vocab entries related to a grammar card (via related_grammar field) */
window.vocabForGrammar = function (grammarId) {
  if (!window.vocabDB) return [];
  return window.vocabDB.filter(v => v && (v.related_grammar || []).includes(grammarId));
};

/** All available levels with real content */
window.activeLevels = function () {
  const idx = window.grammarIdx;
  if (!idx) return [];
  return Object.keys(idx.byLevel).filter(lv => {
    return (idx.byLevel[lv] || []).some(c => c.cat !== 'dummy');
  });
};

/** All weeks for a level */
window.weeksForLevel = function (level) {
  const idx = window.grammarIdx;
  if (!idx) return [];
  const keys = Object.keys(idx.byWeek).filter(k => k.startsWith(level + '-w'));
  return keys.map(k => parseInt(k.split('-w')[1])).sort((a, b) => a - b);
};

})();
