// ══════════════════════════════════════════════════════════════════
//  ai-feedback.js — User feedback on AI-generated content
//  FRONTEND-OVERHAUL-PLAN.md §15.6
//
//  Exports (window.AIFeedback):
//    renderWidget(container, item, opts) → void
//      Renders 👍 / 👎 / ✏️ controls inside `container`.
//      `item` must have `source: 'ai-gen'` and a `lineage` object.
//    recordVerdict(item, verdict, payload) → Promise<void>
//      Raw API — can be called programmatically.
//    isQuarantined(lineageId) → bool
//    _store (for tests)
//
//  Flow on 👎:
//    1. Immediately quarantine in localStorage blocklist
//    2. Remove item from nn_ai_cache IndexedDB
//    3. Show reason picker (grammar_wrong / out_of_level / unnatural /
//       not_relevant / other)
//    4. On confirm: sync to Supabase ai_feedback table
//
//  Flow on 👍:
//    1. Log positive signal to Supabase (async, fire-and-forget)
//
//  Flow on ✏️:
//    1. Show textarea pre-filled with original prompt/answer
//    2. On submit: record correction + sync
// ══════════════════════════════════════════════════════════════════

(function (global) {
  'use strict';

  var QUARANTINE_KEY    = 'nn_ai_quarantine'; // localStorage: Set of lineage_ids
  var SUPABASE_URL_KEY  = 'nn_supabase_url';
  var SUPABASE_KEY_KEY  = 'nn_supabase_anon_key';

  var REASON_LABELS = {
    grammar_wrong:  'Grammar salah',
    out_of_level:   'Kata di luar level',
    unnatural:      'Terdengar tidak natural',
    wrong_answer:   'Jawaban/pilihan tidak benar',
    not_relevant:   'Tidak relevan ke topik yang dipelajari',
    other:          'Lainnya',
  };

  // ── Quarantine store ────────────────────────────────────────────
  function _loadQuarantine() {
    try {
      return new Set(JSON.parse(localStorage.getItem(QUARANTINE_KEY) || '[]'));
    } catch { return new Set(); }
  }

  function _saveQuarantine(set) {
    try {
      localStorage.setItem(QUARANTINE_KEY, JSON.stringify(Array.from(set)));
    } catch {}
  }

  function isQuarantined(lineageId) {
    return _loadQuarantine().has(lineageId);
  }

  function _addToQuarantine(lineageId) {
    var q = _loadQuarantine();
    q.add(lineageId);
    _saveQuarantine(q);
    // Also remove from IndexedDB quiz cache
    try {
      if (global.offlineAI && global.offlineAI.removeQuiz) {
        global.offlineAI.removeQuiz(lineageId).catch(function () {});
      }
    } catch {}
  }

  // ── Supabase sync ───────────────────────────────────────────────
  function _getUserId() {
    try {
      var uid = localStorage.getItem('nn_user_id');
      if (!uid) {
        uid = 'u-' + Math.random().toString(36).slice(2, 10);
        localStorage.setItem('nn_user_id', uid);
      }
      return uid;
    } catch { return 'anon'; }
  }

  function _getSupabaseConfig() {
    try {
      var url = localStorage.getItem(SUPABASE_URL_KEY)
        || (global.SUPABASE_URL || '');
      var key = localStorage.getItem(SUPABASE_KEY_KEY)
        || (global.SUPABASE_ANON_KEY || '');
      return { url: url, key: key };
    } catch { return { url: '', key: '' }; }
  }

  function _syncToSupabase(row) {
    var cfg = _getSupabaseConfig();
    if (!cfg.url || !cfg.key) return Promise.resolve(); // graceful no-op
    return fetch(cfg.url + '/rest/v1/ai_feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': cfg.key,
        'Authorization': 'Bearer ' + cfg.key,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(row),
    }).catch(function (e) {
      console.warn('[ai-feedback] Supabase sync failed (non-blocking):', e.message);
    });
  }

  // ── Core verdict recording ──────────────────────────────────────
  function recordVerdict(item, verdict, payload) {
    payload = payload || {};
    var lineage = (item && item.lineage) || {};
    var lineageId = lineage.lineage_id || item.id || 'unknown';

    // Quarantine immediately on thumbs_down
    if (verdict === 'thumbs_down') {
      _addToQuarantine(lineageId);
    }

    var row = {
      user_id:           _getUserId(),
      ai_item_id:        lineageId,
      item_type:         payload.item_type || 'quiz_question',
      verdict:           verdict,
      reason_codes:      payload.reason_codes || [],
      reason_other:      payload.reason_other || null,
      correction:        payload.correction || null,
      generator_provider: lineage.generator_provider || null,
      generator_model:   lineage.generator_model || null,
      critic_provider:   lineage.critic_provider || null,
      critic_verdict:    lineage.critic_verdict || null,
      prompt_version:    lineage.prompt_version || null,
      quarantined:       verdict === 'thumbs_down',
    };

    return _syncToSupabase(row);
  }

  // ── UI helpers ──────────────────────────────────────────────────
  function _el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html) e.innerHTML = html;
    return e;
  }

  function _showToast(msg) {
    if (global.showToast) { global.showToast(msg); return; }
    // fallback
    var t = _el('div', 'ai-fb-toast', msg);
    Object.assign(t.style, {
      position:'fixed', bottom:'80px', left:'50%', transform:'translateX(-50%)',
      background:'#1a1a1a', color:'#fff', padding:'8px 16px',
      borderRadius:'20px', fontSize:'13px', zIndex:'9999',
      pointerEvents:'none', opacity:'1', transition:'opacity .4s',
    });
    document.body.appendChild(t);
    setTimeout(function () { t.style.opacity = '0'; setTimeout(function () { t.remove(); }, 400); }, 2000);
  }

  // Reason picker (shown after 👎)
  function _showReasonPicker(item, container) {
    var picker = _el('div', 'ai-fb-reason-picker');
    picker.innerHTML = [
      '<div class="ai-fb-reason-title">Ada yang aneh?</div>',
      '<div class="ai-fb-reason-opts">',
      Object.entries(REASON_LABELS).map(function (kv) {
        return '<label class="ai-fb-reason-opt">' +
          '<input type="checkbox" value="' + kv[0] + '"> ' + kv[1] +
          '</label>';
      }).join(''),
      '</div>',
      '<textarea class="ai-fb-reason-other" placeholder="Keterangan tambahan (opsional)" rows="2"></textarea>',
      '<div class="ai-fb-reason-actions">',
        '<button class="ai-fb-btn-cancel">Batal</button>',
        '<button class="ai-fb-btn-confirm">Kirim</button>',
      '</div>',
    ].join('');

    container.appendChild(picker);

    picker.querySelector('.ai-fb-btn-cancel').addEventListener('click', function () {
      picker.remove();
    });

    picker.querySelector('.ai-fb-btn-confirm').addEventListener('click', function () {
      var codes = Array.from(picker.querySelectorAll('input:checked')).map(function (i) { return i.value; });
      var other = picker.querySelector('textarea').value.trim();
      recordVerdict(item, 'thumbs_down', {
        reason_codes: codes,
        reason_other: other || null,
      });
      picker.remove();
      _showToast('Terima kasih! Soal ini tidak akan muncul lagi.');
    });
  }

  // Edit picker (shown after ✏️)
  function _showEditPicker(item, container) {
    var original = (item.answer || '') + (item.prompt ? ' | ' + item.prompt : '');
    var editor = _el('div', 'ai-fb-edit-picker');
    editor.innerHTML = [
      '<div class="ai-fb-reason-title">Versi yang benar menurutmu:</div>',
      '<textarea class="ai-fb-edit-area" rows="3">' + original + '</textarea>',
      '<div class="ai-fb-reason-actions">',
        '<button class="ai-fb-btn-cancel">Batal</button>',
        '<button class="ai-fb-btn-confirm">Kirim</button>',
      '</div>',
    ].join('');

    container.appendChild(editor);

    editor.querySelector('.ai-fb-btn-cancel').addEventListener('click', function () { editor.remove(); });
    editor.querySelector('.ai-fb-btn-confirm').addEventListener('click', function () {
      var correction = editor.querySelector('textarea').value.trim();
      if (!correction) return;
      recordVerdict(item, 'edit', { correction: correction });
      editor.remove();
      _showToast('Koreksi terkirim — makasih!');
    });
  }

  // ── Public: renderWidget ─────────────────────────────────────────
  // container: DOM element to inject controls into
  // item: the question/example object (must have .lineage from ai-content-engine)
  // opts: { itemType: 'quiz_question'|'example_sentence'|'chat_reply' }
  function renderWidget(container, item, opts) {
    if (!container || !item) return;
    // Only render for AI-generated items
    if (item.source !== 'ai-gen') return;
    // Don't re-render if already there
    if (container.querySelector('.ai-fb-bar')) return;

    opts = opts || {};
    var lineageId = (item.lineage && item.lineage.lineage_id) || item.id;

    var bar = _el('div', 'ai-fb-bar');
    bar.setAttribute('data-lineage', lineageId);

    // If already quarantined, show a muted "reported" state, no controls
    if (isQuarantined(lineageId)) {
      bar.innerHTML = '<span class="ai-fb-reported">✓ Dilaporkan</span>';
      container.appendChild(bar);
      return;
    }

    var btnUp   = _el('button', 'ai-fb-btn ai-fb-up',   '👍');
    var btnDown = _el('button', 'ai-fb-btn ai-fb-down', '👎');
    var btnEdit = _el('button', 'ai-fb-btn ai-fb-edit', '✏️');

    btnUp.title   = 'Soal ini bagus';
    btnDown.title = 'Ada yang aneh';
    btnEdit.title = 'Usulkan koreksi';

    btnUp.addEventListener('click', function () {
      recordVerdict(item, 'thumbs_up', { item_type: opts.itemType });
      btnUp.classList.add('ai-fb-voted');
      btnUp.disabled = true;
      btnDown.disabled = true;
      btnEdit.disabled = true;
    });

    btnDown.addEventListener('click', function () {
      btnUp.disabled = true;
      btnDown.disabled = true;
      btnEdit.disabled = true;
      btnDown.classList.add('ai-fb-voted');
      _showReasonPicker(item, container);
    });

    btnEdit.addEventListener('click', function () {
      _showEditPicker(item, container);
    });

    bar.appendChild(btnUp);
    bar.appendChild(btnDown);
    bar.appendChild(btnEdit);

    var providerLabel = item.lineage && item.lineage.generator_provider
      ? _el('span', 'ai-fb-provider', 'AI')
      : null;
    if (providerLabel) {
      providerLabel.title = 'Soal dibuat AI (' +
        (item.lineage.generator_provider || '?') + ' → ' +
        (item.lineage.critic_provider || '?') + ')';
      bar.appendChild(providerLabel);
    }

    container.appendChild(bar);
  }

  // ── CSS (injected once) ─────────────────────────────────────────
  function _injectStyles() {
    if (document.getElementById('ai-fb-styles')) return;
    var s = document.createElement('style');
    s.id = 'ai-fb-styles';
    s.textContent = [
      '.ai-fb-bar{display:flex;align-items:center;gap:4px;margin-top:6px;opacity:.7;transition:opacity .2s}',
      '.ai-fb-bar:hover{opacity:1}',
      '.ai-fb-btn{background:none;border:1px solid transparent;border-radius:6px;cursor:pointer;',
        'font-size:14px;padding:2px 6px;transition:background .15s,border-color .15s}',
      '.ai-fb-btn:hover{background:var(--clr-surface,#f0f0f0);border-color:var(--clr-border,#ddd)}',
      '.ai-fb-btn:disabled{opacity:.4;cursor:default}',
      '.ai-fb-voted{background:var(--clr-surface,#f0f0f0)!important}',
      '.ai-fb-provider{font-size:10px;color:var(--clr-muted,#888);margin-left:4px;',
        'border:1px solid var(--clr-border,#ddd);border-radius:4px;padding:1px 4px;cursor:help}',
      '.ai-fb-reported{font-size:11px;color:var(--clr-muted,#888)}',
      '.ai-fb-reason-picker,.ai-fb-edit-picker{background:var(--clr-surface,#f8f8f8);',
        'border:1px solid var(--clr-border,#ddd);border-radius:8px;padding:12px;margin-top:8px}',
      '.ai-fb-reason-title{font-size:13px;font-weight:600;margin-bottom:8px}',
      '.ai-fb-reason-opts{display:flex;flex-direction:column;gap:4px;margin-bottom:8px}',
      '.ai-fb-reason-opt{font-size:13px;display:flex;align-items:center;gap:6px;cursor:pointer}',
      '.ai-fb-reason-other,.ai-fb-edit-area{width:100%;box-sizing:border-box;',
        'border:1px solid var(--clr-border,#ddd);border-radius:6px;padding:6px;',
        'font-size:13px;resize:vertical;margin-bottom:8px}',
      '.ai-fb-reason-actions{display:flex;gap:8px;justify-content:flex-end}',
      '.ai-fb-btn-cancel,.ai-fb-btn-confirm{border:none;border-radius:6px;',
        'padding:6px 14px;font-size:13px;cursor:pointer}',
      '.ai-fb-btn-cancel{background:var(--clr-surface,#eee)}',
      '.ai-fb-btn-confirm{background:var(--clr-primary,#2563eb);color:#fff}',
      '.ai-fb-toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%);',
        'background:#1a1a1a;color:#fff;padding:8px 16px;border-radius:20px;',
        'font-size:13px;z-index:9999;pointer-events:none}',
    ].join('');
    document.head.appendChild(s);
  }

  if (typeof document !== 'undefined') _injectStyles();

  // ── Public API ──────────────────────────────────────────────────
  var API = {
    renderWidget:    renderWidget,
    recordVerdict:   recordVerdict,
    isQuarantined:   isQuarantined,
    _store: {
      REASON_LABELS:     REASON_LABELS,
      _addToQuarantine:  _addToQuarantine,
      _loadQuarantine:   _loadQuarantine,
    },
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = API;
  } else {
    global.AIFeedback = API;
  }
})(typeof window !== 'undefined' ? window : globalThis);
