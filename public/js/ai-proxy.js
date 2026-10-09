// ══════════════════════════════════════════════════════
//  ai-proxy.js — Nugget Nihongo AI Client Proxy
//  Calls supabase/functions/ai-router (Edge Function).
//  NEVER stores API keys — all secrets live server-side.
//
//  Requires: supabase-client.js loaded first (for SUPABASE_URL + anon key).
//  Exposes:  window.aiProxy
//
//  Usage:
//    const result = await window.aiProxy.ask({
//      messages: [{role:'user', content:'Apa perbedaan は dan が?'}],
//      dnaSummary: window.dnaSummarizer?.summarize('simple') || '',
//    });
//    if (result && result.text) { ... } else { /* fallback */ }
// ══════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── Config ─────────────────────────────────────────────
  // Read from supabase-client.js globals at call time (not init time,
  // since supabase-client.js configures these after page load).
  function getEdgeURL() {
    var base = window._SUPABASE_URL || '';
    if (!base || base.indexOf('YOUR_PROJECT') !== -1) return null;
    return base.replace(/\/$/, '') + '/functions/v1/ai-router';
  }

  function getAnonKey() {
    return window._SUPABASE_ANON_KEY || '';
  }

  // Timeouts per task type (ms)
  var TIMEOUTS = { simple: 12000, complex: 22000 };

  // ── Request classifier ────────────────────────────────
  // Determines whether a request should be routed to Groq (simple)
  // or Gemini (complex) by inspecting the last user message.
  function classify(messages) {
    if (!Array.isArray(messages) || messages.length === 0) return 'simple';

    var lastUser = '';
    for (var i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'user') { lastUser = messages[i].content || ''; break; }
    }

    // Signals of complexity:
    var complexSignals = [
      lastUser.length > 300,            // long question
      messages.length > 4,              // multi-turn conversation
      /jelaskan|bandingkan|analisis|kenapa|perbedaan|mengapa|contoh.{0,20}kalimat/i.test(lastUser),
      /compare|explain|difference|why|because|example/i.test(lastUser),
    ];

    return complexSignals.filter(Boolean).length >= 2 ? 'complex' : 'simple';
  }

  // ── Core fetch with timeout ───────────────────────────
  function fetchWithTimeout(url, options, timeoutMs) {
    return new Promise(function (resolve, reject) {
      var controller = new AbortController();
      var timer = setTimeout(function () {
        controller.abort();
        reject(new Error('Request timed out after ' + timeoutMs + 'ms'));
      }, timeoutMs);

      fetch(url, Object.assign({}, options, { signal: controller.signal }))
        .then(function (resp) { clearTimeout(timer); resolve(resp); })
        .catch(function (err) { clearTimeout(timer); reject(err); });
    });
  }

  // ── Main API call ─────────────────────────────────────
  // Returns: { text: string } | { fallback: true } | null (on network error)
  async function ask(opts) {
    var messages   = opts.messages   || [];
    var dnaSummary = opts.dnaSummary || '';
    var taskType   = opts.taskType   || classify(messages);

    var edgeURL = getEdgeURL();
    if (!edgeURL) {
      console.warn('[ai-proxy] Supabase URL not configured — entering fallback mode');
      return { fallback: true, reason: 'not_configured' };
    }

    var anonKey = getAnonKey();
    var timeout = TIMEOUTS[taskType] || TIMEOUTS.simple;

    try {
      var resp = await fetchWithTimeout(
        edgeURL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + anonKey,
          },
          body: JSON.stringify({
            task_type:   taskType,
            messages:    messages,
            dna_summary: dnaSummary,
          }),
        },
        timeout
      );

      if (!resp.ok) {
        console.warn('[ai-proxy] Edge Function HTTP', resp.status);
        return { fallback: true, reason: 'http_' + resp.status };
      }

      var data = await resp.json();

      // Edge function signals offline fallback
      if (data.fallback) {
        console.info('[ai-proxy] Providers unavailable, using fallback');
        return { fallback: true, reason: data.reason || 'providers_failed' };
      }

      if (typeof data.text === 'string' && data.text.length > 0) {
        return { text: data.text };
      }

      console.warn('[ai-proxy] Unexpected response shape:', data);
      return { fallback: true, reason: 'bad_response' };

    } catch (err) {
      // Network error, offline, or timeout
      if (err.name === 'AbortError' || err.message.indexOf('timed out') !== -1) {
        console.warn('[ai-proxy] Request timed out');
      } else {
        console.warn('[ai-proxy] Network error:', err.message);
      }
      return { fallback: true, reason: 'network_error' };
    }
  }

  // ── Convenience helpers ───────────────────────────────

  // getHint: ask for a one-sentence study hint for a specific item.
  // itemId: e.g. 'gn5-00001' or 'vg-n5-00001'
  // context: optional extra context string
  async function getHint(itemId, context) {
    var label = _resolveLabel(itemId);
    var prompt = 'Berikan satu petunjuk singkat (1–2 kalimat) untuk membantu mengingat ' +
      label + (context ? ' dalam konteks: ' + context : '') + '.';

    var dna = (window.dnaSummarizer && window.dnaSummarizer.summarize)
      ? window.dnaSummarizer.summarize('simple') : '';

    var result = await ask({
      messages:    [{ role: 'user', content: prompt }],
      dnaSummary:  dna,
      taskType:    'simple',
    });
    return (result && result.text) ? result.text : null;
  }

  // getExplanation: ask for a detailed explanation of an item.
  async function getExplanation(itemId, context) {
    var label = _resolveLabel(itemId);
    var prompt = 'Jelaskan pola/kata "' + label + '" untuk penutur bahasa Indonesia.' +
      ' Sertakan: arti, cara pakai, 2 contoh kalimat, dan perbedaan dengan pola/kata serupa.' +
      (context ? ' Konteks tambahan: ' + context : '');

    var dna = (window.dnaSummarizer && window.dnaSummarizer.summarize)
      ? window.dnaSummarizer.summarize('complex') : '';

    var result = await ask({
      messages:    [{ role: 'user', content: prompt }],
      dnaSummary:  dna,
      taskType:    'complex',
    });
    return (result && result.text) ? result.text : null;
  }

  // ── Internal: resolve human-readable label from item ID ──
  function _resolveLabel(itemId) {
    if (!itemId) return itemId;
    // Try grammar DB
    if (window.grammarDB) {
      for (var i = 0; i < window.grammarDB.length; i++) {
        if (window.grammarDB[i].id === itemId) return window.grammarDB[i].pattern || itemId;
      }
    }
    if (window.grammarData) {
      for (var i = 0; i < window.grammarData.length; i++) {
        if (window.grammarData[i].id === itemId) return window.grammarData[i].pattern || itemId;
      }
    }
    // Try vocab DB
    if (window.vocabDB) {
      for (var i = 0; i < window.vocabDB.length; i++) {
        if (window.vocabDB[i].id === itemId) {
          return window.vocabDB[i].word + ' (' + (window.vocabDB[i].meaning_id || '') + ')';
        }
      }
    }
    return itemId;
  }

  // ── Expose supabase URL/key accessors for Edge Function ──
  // supabase-client.js keeps these in a closure. We hook into the
  // window.sbClient's supabaseUrl property after it initialises.
  function _syncSupabaseConfig() {
    if (window.sbClient && window.sbClient.supabaseUrl) {
      window._SUPABASE_URL     = window.sbClient.supabaseUrl;
      window._SUPABASE_ANON_KEY = window.sbClient.supabaseKey || '';
    }
  }

  // ── Public API ────────────────────────────────────────
  window.aiProxy = {
    classify:       classify,
    ask:            ask,
    getHint:        getHint,
    getExplanation: getExplanation,
    _syncConfig:    _syncSupabaseConfig,
  };

  // Sync config once on load (supabase-client.js loads before this)
  _syncSupabaseConfig();

  console.log('[ai-proxy] Ready. Edge URL:', getEdgeURL() || '(not configured)');
})();
