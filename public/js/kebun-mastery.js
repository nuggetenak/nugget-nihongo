// ══════════════════════════════════════════════════════════════════
//  kebun-mastery.js — Kebun Mastery: SRS Card Garden Visualization
//  DRAFT v0.1 — ready to wire up, not yet loaded by index.html
//
//  Concept:
//    Each grammar card = one "plant" in a garden grid.
//    Plant visual state reflects FSRS SRS state:
//      🌱 New/Unseen  → seed dot, muted
//      🌿 Learning    → small sprout, amber
//      🌻 Young       → growing flower, orange
//      🌳 Mature      → full tree, green
//      🥀 Lapsing     → wilting, red (lapses > 0, low stability)
//
//  Interactions:
//    - Tap plant → open detail modal for that card
//    - Filter by N-level (tabs at top)
//    - Toggle between "Grammar" / "Vocab"
//    - Stats bar: total seen / mature / due today
//
//  Load order: after grammar-index.js, fsrs-engine.js, detail.js
//  Exposes: window.initKebunMastery()
// ══════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── SRS state classifier ──────────────────────────────────────
  // Returns: 'unseen' | 'learning' | 'young' | 'mature' | 'lapsing'
  function classifyCard(id) {
    var entry = window.srsData && window.srsData[id];
    if (!entry || !entry.card || entry.card.state === 0) return 'unseen';
    var card = entry.card;
    if (card.lapses > 1 && card.stability < 7) return 'lapsing';
    if (card.scheduled_days >= 21) return 'mature';
    if (card.scheduled_days >= 7)  return 'young';
    return 'learning';
  }

  // ── Plant SVG per state ───────────────────────────────────────
  var PLANT_SVG = {
    unseen: '<circle cx="12" cy="16" r="4" fill="var(--surface-3)" stroke="var(--border-2)" stroke-width="1.5"/>',

    learning: [
      '<line x1="12" y1="20" x2="12" y2="10" stroke="var(--accent)" stroke-width="1.5"/>',
      '<ellipse cx="12" cy="9" rx="3" ry="4" fill="var(--accent)" opacity="0.7"/>',
    ].join(''),

    young: [
      '<line x1="12" y1="21" x2="12" y2="10" stroke="#6B7280" stroke-width="1.5"/>',
      '<circle cx="12" cy="7" r="5" fill="var(--n4)" opacity="0.85"/>',
      '<circle cx="9" cy="10" r="3" fill="var(--n4)" opacity="0.6"/>',
      '<circle cx="15" cy="10" r="3" fill="var(--n4)" opacity="0.6"/>',
    ].join(''),

    mature: [
      '<line x1="12" y1="22" x2="12" y2="12" stroke="#4B5563" stroke-width="2"/>',
      '<circle cx="12" cy="8" r="6" fill="var(--n2)" opacity="0.9"/>',
      '<circle cx="7" cy="12" r="4" fill="var(--n2)" opacity="0.7"/>',
      '<circle cx="17" cy="12" r="4" fill="var(--n2)" opacity="0.7"/>',
      '<circle cx="12" cy="14" r="3" fill="var(--n2)" opacity="0.6"/>',
    ].join(''),

    lapsing: [
      '<line x1="12" y1="20" x2="12" y2="12" stroke="#9CA3AF" stroke-width="1.5"/>',
      '<ellipse cx="10" cy="10" rx="4" ry="5" fill="var(--n4)" opacity="0.5" transform="rotate(-20 10 10)"/>',
      '<ellipse cx="14" cy="12" rx="3" ry="4" fill="var(--n4)" opacity="0.3" transform="rotate(15 14 12)"/>',
    ].join(''),
  };

  var STATE_LABEL = {
    unseen:   'Belum dipelajari',
    learning: 'Sedang dipelajari',
    young:    'Mulai hafal',
    mature:   'Sudah hafal',
    lapsing:  'Perlu diulang',
  };

  var STATE_COLOR = {
    unseen:   'var(--muted-2)',
    learning: 'var(--accent)',
    young:    'var(--n4)',
    mature:   'var(--n2)',
    lapsing:  'var(--n1)',
  };

  // ── Render ────────────────────────────────────────────────────
  var _activeLevel  = 'all';
  var _activeSource = 'grammar'; // 'grammar' | 'vocab'

  function _getPool() {
    var data = [];
    if (_activeSource === 'grammar') {
      data = (window.grammarDB || window.grammarData || []).filter(Boolean);
    } else {
      data = (window.vocabDB || []).filter(Boolean);
    }
    if (_activeLevel !== 'all') {
      data = data.filter(function(d) {
        return (d.level || d.jlpt || '').toLowerCase() === _activeLevel;
      });
    }
    return data;
  }

  function _renderStats(pool) {
    var srs = window.srsData || {};
    var seen    = pool.filter(function(d) { return srs[d.id] && srs[d.id].card && srs[d.id].card.state > 0; });
    var mature  = seen.filter(function(d) { return classifyCard(d.id) === 'mature'; });
    var nowMs   = Date.now();
    var due     = seen.filter(function(d) {
      var e = srs[d.id];
      return e && e.card && new Date(e.card.due).getTime() <= nowMs;
    });

    var bar = document.getElementById('kebunStatsBar');
    if (!bar) return;
    bar.innerHTML =
      '<span class="kebun-stat"><span class="kebun-stat-val">' + seen.length + '</span><span class="kebun-stat-lbl"> dipelajari</span></span>' +
      '<span class="kebun-stat-sep">·</span>' +
      '<span class="kebun-stat"><span class="kebun-stat-val" style="color:var(--n2)">' + mature.length + '</span><span class="kebun-stat-lbl"> hafal</span></span>' +
      '<span class="kebun-stat-sep">·</span>' +
      '<span class="kebun-stat"><span class="kebun-stat-val" style="color:var(--accent)">' + due.length + '</span><span class="kebun-stat-lbl"> jatuh tempo</span></span>' +
      '<span class="kebun-stat-sep">·</span>' +
      '<span class="kebun-stat"><span class="kebun-stat-val" style="color:var(--muted)">' + pool.length + '</span><span class="kebun-stat-lbl"> total</span></span>';
  }

  function _renderGrid(pool) {
    var grid = document.getElementById('kebunGrid');
    if (!grid) return;

    grid.innerHTML = '';

    pool.forEach(function(d) {
      var state  = classifyCard(d.id);
      var label  = d.grammar || d.pattern || d.word || d.id;
      var color  = STATE_COLOR[state];
      var svg    = PLANT_SVG[state] || PLANT_SVG.unseen;

      var cell = document.createElement('button');
      cell.className   = 'kebun-cell kebun-cell--' + state;
      cell.title       = label + ' · ' + STATE_LABEL[state];
      cell.setAttribute('aria-label', label);

      cell.innerHTML =
        '<svg viewBox="0 0 24 24" class="kebun-plant" xmlns="http://www.w3.org/2000/svg">' +
          svg +
        '</svg>' +
        '<span class="kebun-cell-label" style="color:' + color + '">' +
          _escHtml(label.length > 8 ? label.slice(0, 7) + '…' : label) +
        '</span>';

      cell.addEventListener('click', function() {
        if (_activeSource === 'vocab') {
          if (window.openVocabDetail) window.openVocabDetail(d.id);
        } else {
          if (window.openDetail) window.openDetail(d.id);
        }
      });

      grid.appendChild(cell);
    });

    // Empty state
    if (!pool.length) {
      grid.innerHTML = '<div class="kebun-empty">🌱 Belum ada kartu di level ini.</div>';
    }
  }

  function _render() {
    var pool = _getPool();
    _renderStats(pool);
    _renderGrid(pool);
  }

  // ── Tab controls ──────────────────────────────────────────────
  window.kebunSetLevel = function(lv, btn) {
    _activeLevel = lv;
    document.querySelectorAll('.kebun-level-btn').forEach(function(b) {
      b.classList.toggle('active', b === btn);
    });
    _render();
  };

  window.kebunSetSource = function(src, btn) {
    _activeSource = src;
    document.querySelectorAll('.kebun-source-btn').forEach(function(b) {
      b.classList.toggle('active', b === btn);
    });
    _render();
  };

  // ── Legend toggle ─────────────────────────────────────────────
  window.kebunToggleLegend = function() {
    var leg = document.getElementById('kebunLegend');
    if (leg) leg.classList.toggle('open');
  };

  // ── Helper ────────────────────────────────────────────────────
  function _escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ── Public init ───────────────────────────────────────────────
  window.initKebunMastery = function() {
    _render();
  };

})();
