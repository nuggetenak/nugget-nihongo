// ══════════════════════════════════════════════════════
//  dna-summarizer.js — Nugget Nihongo Learning DNA Compressor
//  Reads local SRS/XP/streak state and compresses it into a
//  token-efficient string for the AI context payload.
//
//  Requires: fsrs-engine.js + gamification.js loaded first.
//  Exposes:  window.dnaSummarizer
//
//  Usage:
//    // Simple task (~50 tokens):
//    const dna = window.dnaSummarizer.summarize('simple');
//
//    // Complex task (~200 tokens):
//    const dna = window.dnaSummarizer.summarize('complex');
// ══════════════════════════════════════════════════════

(function () {
  'use strict';

  var DAY_MS = 86400000;

  // ── FSRS retrievability formula ───────────────────────
  // R = (1 + t / (9 * S))^(-1)  (power forgetting curve)
  function retrievability(card) {
    if (!card || card.state === 0) return 0; // New — never reviewed
    var S = card.stability || 1;
    var lastReview = card.last_review ? new Date(card.last_review) : null;
    if (!lastReview) return 0;
    var elapsedDays = (Date.now() - lastReview.getTime()) / DAY_MS;
    var R = Math.pow(1 + elapsedDays / (9 * S), -1);
    return Math.max(0, Math.min(1, R));
  }

  // ── Round R to 2 decimal places ───────────────────────
  function round2(n) {
    return Math.round(n * 100) / 100;
  }

  // ── Elapsed time label (human-readable) ──────────────
  function elapsedLabel(isoDate) {
    if (!isoDate) return '';
    var elapsed = (Date.now() - new Date(isoDate).getTime()) / 60000; // minutes
    if (elapsed < 2)   return 'baru saja';
    if (elapsed < 60)  return Math.round(elapsed) + ' mnt lalu';
    var hours = elapsed / 60;
    if (hours < 24)    return Math.round(hours) + ' jam lalu';
    return Math.round(hours / 24) + ' hr lalu';
  }

  // ── Rating label ──────────────────────────────────────
  var RATING_LABELS = { 1: 'Lupa', 2: 'Susah', 3: 'Ingat', 4: 'Mudah' };

  // ── Resolve human-readable label from card ID ─────────
  function resolveLabel(cardId) {
    if (!cardId) return cardId;
    // Grammar pattern
    if (window.grammarDB) {
      for (var i = 0; i < window.grammarDB.length; i++) {
        if (window.grammarDB[i].id === cardId)
          return window.grammarDB[i].pattern || cardId;
      }
    }
    if (window.grammarData) {
      for (var i = 0; i < window.grammarData.length; i++) {
        if (window.grammarData[i].id === cardId)
          return window.grammarData[i].pattern || cardId;
      }
    }
    // Vocab word
    if (window.vocabDB) {
      for (var i = 0; i < window.vocabDB.length; i++) {
        if (window.vocabDB[i].id === cardId)
          return window.vocabDB[i].word || cardId;
      }
    }
    return cardId;
  }

  // ── Get N weakest items (lowest retrievability) ───────
  function getWeakItems(n) {
    n = n || 3;
    var srsData = window.srsData;
    if (!srsData || typeof srsData !== 'object') return [];

    var scored = [];
    for (var id in srsData) {
      if (!srsData.hasOwnProperty(id)) continue;
      var entry = srsData[id];
      if (!entry || !entry.card || entry.card.state === 0) continue; // skip New
      var R = retrievability(entry.card);
      scored.push({ id: id, R: R, entry: entry });
    }

    // Sort ascending (weakest first)
    scored.sort(function (a, b) { return a.R - b.R; });
    scored = scored.slice(0, n);

    return scored.map(function (s) {
      return {
        id:            s.id,
        type:          s.entry.source || (s.id.startsWith('vg-') ? 'vocab' : 'grammar'),
        retrievability: round2(s.R),
        label:         resolveLabel(s.id),
      };
    });
  }

  // ── Get N most recent review interactions ─────────────
  function getRecentHistory(n) {
    n = n || 2;
    var srsData = window.srsData;
    if (!srsData || typeof srsData !== 'object') return [];

    // Collect last review from each card's history
    var reviews = [];
    for (var id in srsData) {
      if (!srsData.hasOwnProperty(id)) continue;
      var entry = srsData[id];
      if (!entry || !Array.isArray(entry.history) || entry.history.length === 0) continue;
      var last = entry.history[entry.history.length - 1];
      if (!last || !last.date) continue;
      reviews.push({
        id:     id,
        type:   entry.source || (id.startsWith('vg-') ? 'vocab' : 'grammar'),
        rating: last.rating,
        date:   last.date,
        label:  resolveLabel(id),
      });
    }

    // Sort by most recent first
    reviews.sort(function (a, b) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return reviews.slice(0, n);
  }

  // ── Get learner profile ───────────────────────────────
  function getProfile() {
    // XP + level
    var xpRaw = {};
    try { xpRaw = JSON.parse(localStorage.getItem('nn_xp') || '{}'); } catch (e) {}
    var xp    = xpRaw.xp || 0;

    // Level label (from gamification.js LEVELS array if available)
    var levelLabel = 'N5';
    if (window.xpState && window.xpState.level) {
      levelLabel = 'Lv' + window.xpState.level;
      if (window.xpState.title) levelLabel += ' ' + window.xpState.title;
    }

    // Streak
    var streakRaw = {};
    try { streakRaw = JSON.parse(localStorage.getItem('nn_streak') || '{}'); } catch (e) {}
    var streak = streakRaw.current || (window.streakState && window.streakState.current) || 0;

    // Daily goal
    var dailyGoal = 20;
    try {
      var settings = JSON.parse(localStorage.getItem('nn_fsrs_settings') || '{}');
      dailyGoal = settings.new_cards_per_day || 20;
    } catch (e) {}

    return { levelLabel: levelLabel, xp: xp, streak: streak, dailyGoal: dailyGoal };
  }

  // ── Get 7-day heatmap summary ─────────────────────────
  function getWeekPattern() {
    var heatRaw = {};
    try { heatRaw = JSON.parse(localStorage.getItem('nn_heatmap') || '{}'); } catch (e) {}

    var days = [];
    var now = new Date();
    for (var i = 6; i >= 0; i--) {
      var d = new Date(now.getTime() - i * DAY_MS);
      var key = d.toISOString().slice(0, 10);
      var entry = heatRaw[key] || { reviews: 0 };
      days.push(entry.reviews || 0);
    }

    var total = days.reduce(function (a, b) { return a + b; }, 0);
    var activeDays = days.filter(function (x) { return x > 0; }).length;
    return { days: days, total: total, activeDays: activeDays };
  }

  // ── Build compact DNA string ──────────────────────────
  // simple: ~50 tokens — weak items + minimal profile
  // complex: ~200 tokens — full DNA
  function summarize(taskType) {
    taskType = taskType || 'simple';

    var profile = getProfile();
    var weak    = getWeakItems(3);

    var profil  = profile.levelLabel + ', ' + profile.xp + ' XP, streak ' + profile.streak + 'hr';

    var lemah = weak.map(function (w) {
      return w.label + ' (R=' + w.retrievability + ')';
    });

    var output = {
      profil: profil,
      lemah:  lemah,
    };

    if (taskType === 'complex') {
      var history = getRecentHistory(2);
      var week    = getWeekPattern();

      var riwayat = history.map(function (h) {
        return h.label + ': ' + (RATING_LABELS[h.rating] || h.rating) + ' (' + elapsedLabel(h.date) + ')';
      });

      var aktivitas = week.activeDays + '/7 hr aktif, ' + week.total + ' ulasan minggu ini';

      output.riwayat   = riwayat;
      output.aktivitas = aktivitas;
    }

    // Serialize to compact JSON string
    try {
      return JSON.stringify(output);
    } catch (e) {
      return '{}';
    }
  }

  // ── Public API ────────────────────────────────────────
  window.dnaSummarizer = {
    summarize:        summarize,
    getWeakItems:     getWeakItems,
    getRecentHistory: getRecentHistory,
    getProfile:       getProfile,
  };

  console.log('[dna-summarizer] Ready');
})();
