// ══════════════════════════════════════════════════════════════════
//  analytics.js — Progress & Statistics Dashboard
//  Depends on: core/state.js, fsrs-engine.js, gamification.js
//
//  Exports (window.*):
//    initAnalytics()
// ══════════════════════════════════════════════════════════════════

// ── Colors ─────────────────────────────────────────────────────────
const LEVEL_COLORS = {
  n5: '#4ADE80',
  n4: '#FB923C',
  n3: '#f59e0b',
  n2: '#C084FC',
  n1: '#ef4444',
};

const SRS_COLORS = {
  new      : '#64748b',
  learning : '#FB923C',
  review   : '#4ADE80',
  relearning: '#f59e0b',
};

// ── Init ────────────────────────────────────────────────────────────
function initAnalytics() {
  _renderSummaryCards();
  _renderJLPTRings();
  _renderSRSHealth();
  _renderHeatmap();
  _renderWeakPoints();
  _renderQuizAccuracy();
}

// ── 1. Summary cards (streak + XP) ─────────────────────────────────
function _renderSummaryCards() {
  // Streak
  try {
    const streakData = JSON.parse(localStorage.getItem('bunpou_streak') || localStorage.getItem('nn_streak') || '{}');
    const streakVal  = streakData.count || 0;
    const el = document.getElementById('statStreakVal');
    if (el) el.textContent = streakVal;
  } catch {}

  // XP
  try {
    const xpData = JSON.parse(localStorage.getItem('nn_xp') || '{}');
    const xp     = xpData.total || xpData.xp || 0;
    const el = document.getElementById('statXpVal');
    if (el) el.textContent = xp >= 1000 ? (xp / 1000).toFixed(1) + 'K' : xp;
  } catch {}

  // Update subtitle
  const sub = document.getElementById('statsSubtitle');
  if (sub) {
    const progress = window.progress || {};
    const total    = Object.keys(progress).length;
    const known    = Object.values(progress).filter(v => v === 'know').length;
    sub.textContent = total
      ? `${total} kartu dipelajari · ${known} dikuasai`
      : 'Mulai belajar untuk melihat statistikmu!';
  }
}

// ── 2. JLPT Readiness rings ──────────────────────────────────────────
let _jlptView = 'full'; // 'full' | 'grammar' | 'vocab'

window.setJlptView = function(view, btn) {
  _jlptView = view;
  document.querySelectorAll('.jlpt-toggle-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  _renderJLPTRings();
};

function _renderJLPTRings() {
  const container = document.getElementById('jlptRingsRow');
  if (!container) return;

  const levels = ['n5', 'n4', 'n3', 'n2', 'n1'];
  const progress = window.progress || {};

  const grammarStats = {}, vocabStats = {};
  levels.forEach(l => {
    grammarStats[l] = { total: 0, known: 0 };
    vocabStats[l]   = { total: 0, known: 0 };
  });

  // Grammar entries
  (window.grammarData || window.grammarDB || []).forEach(c => {
    const l = c.level?.toLowerCase();
    if (grammarStats[l]) {
      grammarStats[l].total++;
      if (progress[c.id] === 'know') grammarStats[l].known++;
    }
  });

  // Vocab entries
  (window.vocabDB || []).forEach(v => {
    const l = v.jlpt?.toLowerCase();
    if (vocabStats[l]) {
      vocabStats[l].total++;
      if (progress[v.id] === 'know') vocabStats[l].known++;
    }
  });

  const LEVEL_COLORS_NEW = {
    n5: 'var(--n5)', n4: 'var(--n4)', n3: 'var(--n3)', n2: 'var(--n2)', n1: 'var(--n1)',
  };

  container.innerHTML = '';
  levels.forEach(l => {
    const g = grammarStats[l], v = vocabStats[l];
    let s;
    if (_jlptView === 'grammar')     s = g;
    else if (_jlptView === 'vocab')  s = v;
    else s = { total: g.total + v.total, known: g.known + v.known };

    const pct = s.total > 0 ? Math.round((s.known / s.total) * 100) : 0;
    const col = LEVEL_COLORS_NEW[l] || '#64748b';

    const subLabel = _jlptView === 'full'
      ? `G:${g.known}/${g.total} · V:${v.known}/${v.total}`
      : `${s.known}/${s.total}`;

    const card = document.createElement('div');
    card.className = 'jlpt-ring-card';
    card.innerHTML = `
      <div class="jlpt-ring-wrap">
        <svg viewBox="0 0 36 36" class="jlpt-ring-svg">
          <circle cx="18" cy="18" r="15" fill="none" stroke="var(--border)" stroke-width="3"/>
          <circle cx="18" cy="18" r="15" fill="none" stroke="${col}" stroke-width="3"
            stroke-dasharray="${pct * 0.942} 94.2"
            stroke-dashoffset="23.55"
            stroke-linecap="round"
            style="transition:stroke-dasharray 0.8s ease"/>
        </svg>
        <div class="jlpt-ring-pct">${pct}%</div>
      </div>
      <div class="jlpt-ring-label" style="color:${col}">${l.toUpperCase()}</div>
      <div class="jlpt-ring-sub">${subLabel}</div>
    `;
    container.appendChild(card);
  });
}

// ── 3. SRS Health ─────────────────────────────────────────────────
function _renderSRSHealth() {
  const container = document.getElementById('srsHealthGrid');
  if (!container) return;

  const fsrsCards = _getFSRSCards();
  const counts = { new: 0, learning: 0, review: 0, relearning: 0 };

  fsrsCards.forEach(([id]) => {
    try {
      const status = typeof srsStatus === 'function' ? srsStatus(id) : 'new';
      if (counts[status] !== undefined) counts[status]++;
      else counts.new++;
    } catch {
      counts.new++;
    }
  });

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  const labels = {
    new       : 'Baru',
    learning  : 'Dipelajari',
    review    : 'Review',
    relearning: 'Diulangi',
  };

  container.innerHTML = '';
  Object.entries(counts).forEach(([state, count]) => {
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    const col = SRS_COLORS[state] || '#64748b';
    const div = document.createElement('div');
    div.className = 'srs-health-item';
    div.innerHTML = `
      <div class="srs-health-bar-wrap">
        <div class="srs-health-bar" style="width:${pct}%;background:${col}"></div>
      </div>
      <div class="srs-health-meta">
        <span class="srs-health-label">${labels[state]}</span>
        <span class="srs-health-count">${count}</span>
      </div>
    `;
    container.appendChild(div);
  });

  if (total === 0) {
    container.innerHTML = '<div class="stats-empty">Belum ada data SRS. Mulai latihan dulu!</div>';
  }
}

// ── 4. Study Heatmap ─────────────────────────────────────────────
function _renderHeatmap() {
  const canvas = document.getElementById('heatmapCanvas');
  if (!canvas) return;

  let heatmap = {};
  try {
    heatmap = JSON.parse(localStorage.getItem('nn_heatmap') || '{}');
  } catch {}

  const WEEKS = 52;
  const CELL  = 12;
  const GAP   = 2;
  const COLS  = WEEKS;
  const ROWS  = 7;

  canvas.width  = COLS * (CELL + GAP);
  canvas.height = ROWS * (CELL + GAP);

  const ctx = canvas.getContext('2d');

  // Build date grid: last 52 weeks
  const today    = new Date();
  const dayOfWeek = today.getDay(); // 0=Sun
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - (WEEKS * 7) + (7 - dayOfWeek) % 7);

  const maxVal = Math.max(1, ...Object.values(heatmap));

  // Theme-aware colors
  const isDark   = document.body.classList.contains('dark') || localStorage.getItem('bunpou-theme') === 'dark';
  const emptyCol = isDark ? '#1e293b' : '#e2e8f0';

  for (let w = 0; w < COLS; w++) {
    for (let d = 0; d < ROWS; d++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + w * 7 + d);
      const key   = date.toISOString().slice(0, 10);
      const val   = heatmap[key] || 0;
      const alpha = val === 0 ? 0 : 0.15 + (val / maxVal) * 0.85;

      ctx.fillStyle = val === 0 ? emptyCol : `rgba(34, 197, 94, ${alpha})`;
      ctx.beginPath();
      ctx.roundRect(w * (CELL + GAP), d * (CELL + GAP), CELL, CELL, 2);
      ctx.fill();
    }
  }

  // Legend
  const legendContainer = document.getElementById('heatmapLegend');
  if (legendContainer) {
    legendContainer.innerHTML = '';
    [0, 0.3, 0.6, 0.85, 1].forEach(a => {
      const span = document.createElement('span');
      span.className = 'heatmap-legend-cell';
      span.style.background = a === 0 ? emptyCol : `rgba(34, 197, 94, ${a})`;
      legendContainer.appendChild(span);
    });
  }
}

// ── 5. Weak Points ───────────────────────────────────────────────
function _renderWeakPoints() {
  const container = document.getElementById('weakPointsList');
  if (!container) return;

  const progress   = window.progress || {};
  const grammarMap = new Map();

  // Build grammar id → card map
  (window.grammarData || window.grammarDB || []).forEach(c => grammarMap.set(c.id, c));
  (window.vocabDB || []).forEach(v => grammarMap.set(v.id, v));

  // Cards marked 'forgot' most recently — pull from progress
  const forgotIds = Object.entries(progress)
    .filter(([, v]) => v === 'forgot')
    .map(([id]) => id);

  // Supplement with FSRS low-retrievability cards
  const lowR = [];
  try {
    if (typeof srsRetrievability === 'function') {
      const fsrsCards = _getFSRSCards();
      fsrsCards.forEach(([id]) => {
        const r = srsRetrievability(id);
        if (r < 0.7) lowR.push({ id, r });
      });
      lowR.sort((a, b) => a.r - b.r);
    }
  } catch {}

  const topIds = [...new Set([...lowR.map(x => x.id), ...forgotIds])].slice(0, 8);

  if (!topIds.length) {
    container.innerHTML = '<div class="stats-empty">Belum ada titik lemah terdeteksi. Terus belajar! 💪</div>';
    return;
  }

  container.innerHTML = '';
  topIds.forEach(id => {
    const card = grammarMap.get(id);
    if (!card) return;

    const label  = card.grammar || card.pattern || card.word || id;
    const level  = (card.level || card.jlpt || 'n5').toLowerCase();
    const rEntry = lowR.find(x => x.id === id);
    const acc    = rEntry ? Math.round(rEntry.r * 100) : null;
    const accColor = acc !== null ? (acc < 50 ? 'var(--n4)' : acc < 70 ? 'var(--n3)' : 'var(--muted)') : 'var(--muted)';

    const btn = document.createElement('button');
    btn.className = 'perlu-item';
    btn.onclick = () => { if (window.openDetail) window.openDetail(id); };
    btn.innerHTML = `
      <span class="perlu-dot" style="background:var(--${level})"></span>
      <span class="perlu-pattern jp">${_escHtml(label)}</span>
      ${acc !== null ? `<span class="perlu-acc" style="color:${accColor}">${acc}%</span>` : ''}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    `;
    container.appendChild(btn);
  });
}

// ── 6. Quiz Accuracy per mode ─────────────────────────────────────
function _renderQuizAccuracy() {
  const canvas = document.getElementById('quizAccuracyCanvas');
  if (!canvas) return;

  // Read from localStorage: gamification.js stores per-mode stats in nn_quiz_stats
  let stats = {};
  try {
    stats = JSON.parse(localStorage.getItem('nn_quiz_stats') || '{}');
  } catch {}

  const modes = [
    { key: 'flip',        label: 'Flashcard' },
    { key: 'fill',        label: 'Fill-In' },
    { key: 'multi_choice', label: 'Pilihan Ganda' },
    { key: 'conjugation', label: 'Konjugasi' },
    { key: 'translation', label: 'Terjemahan' },
    { key: 'vocab_mc',    label: 'Vocab MC' },
  ];

  const data = modes.map(m => {
    const s = stats[m.key] || { correct: 0, total: 0 };
    return {
      label: m.label,
      pct  : s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0,
      total: s.total,
    };
  });

  const BAR_H   = 24;
  const GAP     = 12;
  const LABEL_W = 110;
  const CHART_W = 220;
  const PADDING = 12;

  canvas.width  = LABEL_W + CHART_W + PADDING * 2 + 50;
  canvas.height = modes.length * (BAR_H + GAP) + PADDING * 2;

  const ctx = canvas.getContext('2d');
  const isDark = localStorage.getItem('bunpou-theme') === 'dark';

  ctx.font = '13px system-ui, sans-serif';
  ctx.textBaseline = 'middle';

  data.forEach((d, i) => {
    const y    = PADDING + i * (BAR_H + GAP);
    const barY = y + BAR_H / 2;

    // Label
    ctx.fillStyle = isDark ? '#94a3b8' : '#475569';
    ctx.textAlign = 'right';
    ctx.fillText(d.label, LABEL_W, barY);

    // Background bar
    ctx.fillStyle = isDark ? '#1e293b' : '#e2e8f0';
    ctx.beginPath();
    ctx.roundRect(LABEL_W + PADDING, y, CHART_W, BAR_H, 4);
    ctx.fill();

    // Filled bar
    if (d.total > 0) {
      const fillW = Math.max(0, (d.pct / 100) * CHART_W);
      const color = d.pct >= 80 ? '#4ADE80' : d.pct >= 60 ? '#f59e0b' : '#ef4444';
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(LABEL_W + PADDING, y, fillW, BAR_H, 4);
      ctx.fill();

      // Pct label
      ctx.fillStyle = isDark ? '#e2e8f0' : '#1e293b';
      ctx.textAlign = 'left';
      ctx.fillText(`${d.pct}%  (${d.total})`, LABEL_W + PADDING + CHART_W + 6, barY);
    } else {
      ctx.fillStyle = isDark ? '#475569' : '#94a3b8';
      ctx.textAlign = 'left';
      ctx.fillText('—', LABEL_W + PADDING + CHART_W + 6, barY);
    }
  });
}

// ── Helpers ─────────────────────────────────────────────────────────
function _getFSRSCards() {
  try {
    const raw = localStorage.getItem('nn_fsrs_cards');
    if (!raw) return [];
    return Object.entries(JSON.parse(raw));
  } catch {
    return [];
  }
}

function _escHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ── Tab visibility hook ──────────────────────────────────────────
window._analyticsOnTabShow = function () {
  initAnalytics();
};

// ── Weak points — "Perlu Perhatian" section ────────────────────────────────
function _renderWeakPoints() {
  var section = document.getElementById('weakPointsSection');
  var list    = document.getElementById('weakPointsList');
  if (!section || !list) return;

  var grammar = window.grammarData || [];
  var srs     = window.srsData    || {};
  var LVL_COL = { n5:'var(--n5)', n4:'var(--n4)', n3:'var(--n3)', n2:'var(--n2)', n1:'var(--n1)' };

  // Find cards with low accuracy (answered, but < 70% correct)
  // Proxy: cards with reps > 0 but short interval (≤ 7 days = still struggling)
  var weak = [];
  Object.keys(srs).forEach(function(id) {
    var c = srs[id];
    if (!c || !c.reps || c.reps < 1) return;
    if (c.interval > 14) return; // already doing well
    var entry = grammar.find(function(g) { return g && g.id === id; });
    if (!entry) return;
    // Estimate accuracy from ease factor: lower ease = more mistakes
    var ease = c.ease_factor || 2.5;
    var acc = Math.round(Math.min(100, Math.max(0, (ease - 1.3) / 1.7 * 100)));
    weak.push({ id: id, entry: entry, acc: acc, interval: c.interval || 0 });
  });

  if (!weak.length) { section.style.display = 'none'; return; }

  // Sort by accuracy ascending (worst first), take top 5
  weak.sort(function(a, b) { return a.acc - b.acc; });
  weak = weak.slice(0, 5);

  section.style.display = 'block';
  list.innerHTML = weak.map(function(w) {
    var col = LVL_COL[w.entry.level] || 'var(--muted)';
    var accColor = w.acc < 50 ? 'var(--accent-red)' : w.acc < 70 ? 'var(--n4)' : 'var(--muted)';
    return '<div class="weak-point-row" onclick="openDetail(\'' + w.id + '\')">'
      + '<span class="weak-dot" style="background:' + col + '"></span>'
      + '<div class="weak-body">'
      + '<div class="weak-grammar">' + w.entry.grammar + '</div>'
      + '<div class="weak-meaning">' + w.entry.meaning + '</div>'
      + '</div>'
      + '<div class="weak-acc" style="color:' + accColor + '">' + w.acc + '%</div>'
      + '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted-2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>'
      + '</div>';
  }).join('');
}

// Patch into the main analytics render
var _origRender = window.renderAnalytics || function(){};
window.renderAnalytics = function() {
  _origRender();
  _renderWeakPoints();
};
// Also call directly if analytics already ran
if (document.getElementById('weakPointsList')) {
  _renderWeakPoints();
}
