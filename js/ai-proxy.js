// ══════════════════════════════════════════════════════
//  ai-proxy.js — Nugget Nihongo AI Client Proxy
//  Bridges to Cloudflare AI Worker (/chat endpoint).
//  NEVER stores API keys — all secrets live server-side.
// ══════════════════════════════════════════════════════

(function () {
  'use strict';

  function getWorkerURL() {
    var stored = (typeof localStorage !== 'undefined') ? localStorage.getItem('nn_ai_worker_url') : null;
    return stored || 'https://nugget-nihongo-ai.nugrohopangestu85.workers.dev/chat';
  }

  async function ask(opts) {
    opts = opts || {};
    var messages = opts.messages || [];
    var workerURL = getWorkerURL();

    try {
      var resp = await fetch(workerURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages,
          dnaSummary: opts.dnaSummary || '',
          taskType: opts.taskType || 'simple'
        })
      });

      if (!resp.ok) {
        return { fallback: true, reason: 'http_' + resp.status };
      }

      var data = await resp.json();
      if (data && typeof data.reply === 'string') {
        return { text: data.reply };
      }
      if (data && typeof data.text === 'string') {
        return { text: data.text };
      }
      return { fallback: true, reason: 'bad_response' };
    } catch (err) {
      console.warn('[ai-proxy] Network error:', err.message);
      return { fallback: true, reason: 'network_error' };
    }
  }

  async function getHint(itemId, context) {
    var label = _resolveLabel(itemId);
    var prompt = 'Berikan satu petunjuk singkat (1–2 kalimat) untuk membantu mengingat ' +
      label + (context ? ' dalam konteks: ' + context : '') + '.';
    var result = await ask({ messages: [{ role: 'user', content: prompt }] });
    return (result && result.text) ? result.text : null;
  }

  async function getExplanation(itemId, context) {
    var label = _resolveLabel(itemId);
    var prompt = 'Jelaskan pola/kata "' + label + '" untuk penutur bahasa Indonesia.' +
      ' Sertakan: arti, cara pakai, 2 contoh kalimat, dan perbedaan dengan pola/kata serupa.' +
      (context ? ' Konteks tambahan: ' + context : '');
    var result = await ask({ messages: [{ role: 'user', content: prompt }] });
    return (result && result.text) ? result.text : null;
  }

  function _resolveLabel(itemId) {
    if (!itemId) return itemId;
    if (window.grammarDB) {
      for (var i = 0; i < window.grammarDB.length; i++) {
        if (window.grammarDB[i].id === itemId) return window.grammarDB[i].pattern || itemId;
      }
    }
    if (window.vocabDB) {
      for (var j = 0; j < window.vocabDB.length; j++) {
        if (window.vocabDB[j].id === itemId) return window.vocabDB[j].word + ' (' + (window.vocabDB[j].meaning_id || '') + ')';
      }
    }
    return itemId;
  }

  window.aiProxy = {
    ask: ask,
    getHint: getHint,
    getExplanation: getExplanation,
    getWorkerURL: getWorkerURL
  };
})();
