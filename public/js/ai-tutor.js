// ══════════════════════════════════════════════════════
//  ai-tutor.js — Nugget Nihongo AI Tutor Orchestrator
//  High-level interface for AI-powered hints & explanations.
//  Falls back seamlessly to static drills when AI is unavailable.
//
//  Requires: ai-proxy.js + dna-summarizer.js loaded first.
//  Exposes:  window.aiTutor
//
//  Usage:
//    // Get a contextual hint for the current card:
//    const hint = await window.aiTutor.getHint('gn5-00001', 'grammar');
//
//    // Get a full explanation:
//    const exp = await window.aiTutor.getExplanation('vg-n5-00001', 'vocab');
//
//    // Get a fallback drill (works offline, no AI needed):
//    const drill = window.aiTutor.getDrill('grammar');
// ══════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── Fallback data stores ──────────────────────────────
  var _fallbackGrammar = [];
  var _fallbackVocab   = [];
  var _fallbackIdx     = { grammar: 0, vocab: 0 };
  var _fallbackLoaded  = false;

  // ── Session-level response cache ──────────────────────
  // Keyed by itemId → cached AI response (string)
  // Clears on page reload (sessionStorage persists tabs but not hard reload).
  var CACHE_PREFIX = 'nn_ai_';

  function cacheGet(key) {
    try { return sessionStorage.getItem(CACHE_PREFIX + key) || null; } catch (e) { return null; }
  }
  function cacheSet(key, value) {
    try { sessionStorage.setItem(CACHE_PREFIX + key, value); } catch (e) {}
  }

  // ── Load fallback JSON files ──────────────────────────
  function loadFallback() {
    if (_fallbackLoaded) return Promise.resolve();

    var baseUrl = (function () {
      // Derive base from current script location for robustness
      var scripts = document.querySelectorAll('script[src*="ai-tutor"]');
      if (scripts.length > 0) {
        return scripts[0].src.replace(/js\/ai-tutor\.js.*$/, '');
      }
      return './';
    })();

    var grammarUrl = baseUrl + 'data/fallback/grammar-drills.json';
    var vocabUrl   = baseUrl + 'data/fallback/vocab-drills.json';

    function loadJSON(url) {
      return fetch(url)
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status + ' for ' + url);
          return r.json();
        });
    }

    return Promise.all([loadJSON(grammarUrl), loadJSON(vocabUrl)])
      .then(function (results) {
        _fallbackGrammar = (results[0] && results[0].items) ? results[0].items : [];
        _fallbackVocab   = (results[1] && results[1].items) ? results[1].items : [];
        _fallbackLoaded  = true;
        console.log('[ai-tutor] Fallback loaded:', _fallbackGrammar.length, 'grammar,', _fallbackVocab.length, 'vocab drills');
      })
      .catch(function (err) {
        console.warn('[ai-tutor] Could not load fallback JSONs:', err.message);
        _fallbackLoaded = true; // prevent repeated failures
      });
  }

  // ── Get next fallback drill (round-robin) ─────────────
  function getDrill(type) {
    type = (type === 'vocab') ? 'vocab' : 'grammar';
    var arr = (type === 'vocab') ? _fallbackVocab : _fallbackGrammar;

    if (!arr || arr.length === 0) return null;

    var idx = _fallbackIdx[type] % arr.length;
    _fallbackIdx[type] = idx + 1;
    return arr[idx];
  }

  // ── Build fallback text from a drill item ─────────────
  function drillToText(drill) {
    if (!drill) return null;
    if (drill.type === 'vocab' || drill.source_id.startsWith('vg-')) {
      // Vocab drill → format as hint
      return drill.explanation_id || null;
    }
    // Grammar drill → format as explanation
    return drill.explanation_id || null;
  }

  // ── getHint ───────────────────────────────────────────
  // Returns a short 1–2 sentence hint string, or null on total failure.
  async function getHint(itemId, itemType) {
    // Check session cache first
    var cacheKey = 'hint_' + (itemId || '');
    var cached = cacheGet(cacheKey);
    if (cached) return cached;

    // Try AI
    if (window.aiProxy && window.aiProxy.getHint) {
      var aiText = await window.aiProxy.getHint(itemId, itemType || '');
      if (aiText) {
        cacheSet(cacheKey, aiText);
        return aiText;
      }
    }

    // AI unavailable — use static fallback
    var type = (itemId && itemId.startsWith('vg-')) ? 'vocab' : 'grammar';
    var drill = getDrill(type);
    var text  = drillToText(drill);
    if (text) {
      console.info('[ai-tutor] AI unavailable, serving static hint');
      return text;
    }

    return null;
  }

  // ── getExplanation ────────────────────────────────────
  // Returns a detailed explanation string, or null on total failure.
  async function getExplanation(itemId, itemType) {
    var cacheKey = 'exp_' + (itemId || '');
    var cached = cacheGet(cacheKey);
    if (cached) return cached;

    if (window.aiProxy && window.aiProxy.getExplanation) {
      var aiText = await window.aiProxy.getExplanation(itemId, itemType || '');
      if (aiText) {
        cacheSet(cacheKey, aiText);
        return aiText;
      }
    }

    // Fallback: find matching drill by source_id, else get next in rotation
    var type  = (itemId && itemId.startsWith('vg-')) ? 'vocab' : 'grammar';
    var arr   = (type === 'vocab') ? _fallbackVocab : _fallbackGrammar;
    var drill = null;

    for (var i = 0; i < arr.length; i++) {
      if (arr[i].source_id === itemId) { drill = arr[i]; break; }
    }
    if (!drill) drill = getDrill(type);

    var text = drillToText(drill);
    if (text) {
      console.info('[ai-tutor] AI unavailable, serving static explanation');
      return text;
    }

    return null;
  }

  // ── preloadFallback ───────────────────────────────────
  // Called on startup to warm the fallback data.
  function preloadFallback() {
    return loadFallback();
  }

  // ── Public API ────────────────────────────────────────
  window.aiTutor = {
    getHint:         getHint,
    getExplanation:  getExplanation,
    getDrill:        getDrill,
    preloadFallback: preloadFallback,
  };

  // Preload fallback data on load (non-blocking)
  loadFallback();

  console.log('[ai-tutor] Ready. AI proxy:', window.aiProxy ? 'linked' : 'not yet loaded');
})();
