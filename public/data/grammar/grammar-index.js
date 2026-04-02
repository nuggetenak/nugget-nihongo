// ══════════════════════════════════════════════════════
//  grammar-index.js — Nugget Nihongo
//  Replaces: grammar/index.js + grammar/dummy.js
//  Merges all grammar-n*.js → window.grammarDB + query API
//  Also provides backwards-compat: window.grammarData, window.levelMeta
//  Load AFTER all grammar-n*.js files
//  Architecture v3 — 1 April 2026
// ══════════════════════════════════════════════════════

(function () {

  // ── Merge all levels ─────────────────────────────────
  window.grammarDB = [
    ...(window.grammarN5 || []),
    ...(window.grammarN4 || []),
    ...(window.grammarN3 || []),
    ...(window.grammarN2 || []),
    ...(window.grammarN1 || []),
  ];

  // ── Backwards compat alias ───────────────────────────
  // browse.js, quiz.js, detail.js still reference window.grammarData
  window.grammarData = window.grammarDB;

  // Compat shim: old code references d.grammar, new schema uses d.pattern
  // Add 'grammar' getter to every entry that reads from 'pattern'
  for (var i = 0; i < window.grammarDB.length; i++) {
    var entry = window.grammarDB[i];
    if (entry.pattern && !entry.grammar) {
      entry.grammar = entry.pattern;
    }
  }

  // ── Build indexes ────────────────────────────────────
  const byId    = {};
  const byLevel = {};
  const byCat   = {};

  for (const g of window.grammarDB) {
    byId[g.id] = g;

    if (!byLevel[g.level]) byLevel[g.level] = [];
    byLevel[g.level].push(g);

    if (g.cat) {
      if (!byCat[g.cat]) byCat[g.cat] = [];
      byCat[g.cat].push(g);
    }
  }

  window.grammarIdx = { byId, byLevel, byCat };

  // ── Query API ────────────────────────────────────────
  window.getGrammar = function (id) {
    return byId[id] || null;
  };

  window.queryGrammar = function (filter) {
    var results = window.grammarDB;
    if (filter.level) results = results.filter(function(g) { return g.level === filter.level; });
    if (filter.cat)   results = results.filter(function(g) { return g.cat === filter.cat; });
    if (filter.register) results = results.filter(function(g) { return g.register === filter.register; });
    if (filter.excludeDummy) results = results.filter(function(g) { return g.cat !== 'dummy'; });
    return results;
  };

  window.sampleGrammar = function (filter, n) {
    var pool = window.queryGrammar(filter || {});
    var shuffled = pool.slice().sort(function() { return Math.random() - 0.5; });
    return shuffled.slice(0, n);
  };

  // ── Level Meta (backwards compat for browse.js) ──────
  window.levelMeta = {};
  var levels = ['n5', 'n4', 'n3', 'n2', 'n1'];
  var levelNames = { n5: 'Dasar', n4: 'Dasar Menengah', n3: 'Menengah', n2: 'Mahir', n1: 'Mahir Tinggi' };

  for (var i = 0; i < levels.length; i++) {
    var lv = levels[i];
    var entries = byLevel[lv] || [];

    // Collect unique cat values as "topics" for this level
    var cats = {};
    for (var j = 0; j < entries.length; j++) {
      if (entries[j].cat) cats[entries[j].cat] = true;
    }

    window.levelMeta[lv] = {
      label: lv.toUpperCase(),
      name: levelNames[lv],
      total: entries.length,
      weeks: [],  // no more week-based structure in global
      categories: Object.keys(cats),
    };
  }

  console.log('[grammar-index] grammarDB loaded:', window.grammarDB.length, 'entries');
  console.log('[grammar-index] levels:', Object.keys(byLevel).map(function(l) { return l + ':' + byLevel[l].length; }).join(', '));

})();
