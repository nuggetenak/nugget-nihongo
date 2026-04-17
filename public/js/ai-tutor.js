// ══════════════════════════════════════════════════════════════════
//  ai-tutor.js — Sensei Nugget: Multi-model AI Japanese tutor
//  Depends on: core/state.js (window.xpState, window.progress)
//              fsrs-engine.js (srsDueToday, srsStatus)
//
//  Exports (window.*):
//    initAITutor()
//    aiSetMode(mode, btn)
//    aiSend()
//    aiClearContext()
//    showAuthModal() [delegated to supabase-client]
// ══════════════════════════════════════════════════════════════════

// ── Config ─────────────────────────────────────────────────────────
// Worker URL — update after deploying to Cloudflare
// For local dev with `wrangler dev`, use: http://localhost:8787/chat
const AI_WORKER_URL = (() => {
  const stored = localStorage.getItem('nn_ai_worker_url');
  if (stored) return stored;
  // Default: same subdomain pattern as GitHub Pages org
  return 'https://nugget-nihongo-ai.nugrohopangestu85.workers.dev/chat';
})();

const AI_QUOTA_KEY   = 'nn_ai_quota';   // { date, used }
const AI_HISTORY_KEY = 'nn_ai_history'; // per-session (sessionStorage)
const DAILY_LIMIT    = 15;

// ── State ───────────────────────────────────────────────────────────
let aiMode      = 'explain'; // 'explain' | 'quiz' | 'chat'
let aiPending   = false;
let aiContext   = null; // { level, currentCard, recentWeak, mode }
let aiHistory   = [];   // [{ role, content }] — conversation buffer

// ── Init ────────────────────────────────────────────────────────────
function initAITutor() {
  _loadHistory();
  _renderQuota();
  _detectContext();
  _checkWorkerConfig();

  // Show auth header button (always visible whether Supabase wired or not)
  const authBtn = document.getElementById('authHeaderBtn');
  if (authBtn) authBtn.style.display = 'flex';
}

// ── Mode switch ─────────────────────────────────────────────────────
function aiSetMode(mode, btn) {
  aiMode = mode;
  document.querySelectorAll('.ai-mode-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const hints = {
    explain : 'Tanya atau paste pola grammar/kosakata untuk penjelasan lengkap dengan contoh.',
    quiz    : 'Aku akan buat soal berdasarkan level dan titik lemahmu. Siap?',
    chat    : 'Ngobrol bebas dalam bahasa Jepang atau Indonesia. Boleh tanya apa saja!',
  };
  _showBotHint(hints[mode] || '');
}

// ── Send message ────────────────────────────────────────────────────
async function aiSend() {
  if (aiPending) return;

  const textarea = document.getElementById('aiInputText');
  const text = (textarea?.value || '').trim();
  if (!text) return;

  // Check quota
  const quota = _getQuota();
  if (quota.used >= DAILY_LIMIT) {
    _showBotError('Kamu sudah mencapai 15 pertanyaan gratis hari ini. Coba lagi besok! 🌙');
    return;
  }

  // Add user message
  textarea.value = '';
  textarea.style.height = 'auto';
  _appendMessage('user', text);
  aiHistory.push({ role: 'user', content: text });
  _saveHistory();

  // Set pending state
  aiPending = true;
  _setInputEnabled(false);
  const typingId = _showTyping();

  // Build context
  const ctx = _buildContext();

  try {
    // STEP 1: Check offline cache (L1 pre-baked + L2 IndexedDB)
    const cache = window.offlineAI;
    if (cache && cache.ready) {
      const cached = await cache.getAnswer(text);
      if (cached) {
        _removeTyping(typingId);
        const cacheNote = cached.offline ? '\n\n_📦 Jawaban dari cache — tersedia offline_' : '';
        _appendMessage('bot', cached.reply + cacheNote);
        aiHistory.push({ role: 'assistant', content: cached.reply });
        _saveHistory();
        if (aiHistory.length > 20) aiHistory = aiHistory.slice(-20);
        return;
      }
    }

    // STEP 2: Try API
    let data = null;
    let apiError = null;

    if (navigator.onLine !== false) {
      try {
        const res = await fetch(AI_WORKER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-User-ID': _getUserId() },
          body: JSON.stringify({ messages: aiHistory.slice(-10), context: ctx, userId: _getUserId() }),
        });
        _removeTyping(typingId);
        if (res.status === 429) {
          _showBotRetry('Kamu sudah pakai batas pertanyaan hari ini. Besok bisa tanya lagi ya! ☀️');
          _setQuota(DAILY_LIMIT);
          return;
        } else if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          apiError = err.message || 'server error';
        } else {
          data = await res.json();
        }
      } catch (fetchErr) {
        apiError = fetchErr.message;
        _removeTyping(typingId);
      }
    } else {
      _removeTyping(typingId);
      apiError = 'offline';
    }

    // STEP 3: API success — show and cache reply
    if (data && data.reply) {
      const reply = data.reply;
      _appendMessage('bot', reply);
      aiHistory.push({ role: 'assistant', content: reply });
      _saveHistory();
      _setQuota(quota.used + 1);
      if (typeof data.remaining === 'number') _renderQuotaFromRemaining(data.remaining);
      if (aiHistory.length > 20) aiHistory = aiHistory.slice(-20);
      if (cache && cache.ready && !data.from_cache) cache.saveAnswer(text, data).catch(() => {});
      return;
    }

    // STEP 4: All failed — friendly offline message
    if (apiError === 'offline' || !navigator.onLine) {
      _showBotRetry('Kamu sedang offline. Coba tanya grammar umum — Sensei punya 200+ jawaban tersimpan!\n\nContoh: "に vs で", "は vs が", "te form", "masu form", "keigo" 💡');
    } else {
      _showBotRetry('Sensei lagi istirahat sebentar. Coba lagi ya! 🙏');
    }
    console.error('[ai-tutor] apiError:', apiError);
  } finally {
    aiPending = false;
    _setInputEnabled(true);
    document.getElementById('aiInputText')?.focus();
  }
}

// ── Context injection ───────────────────────────────────────────────
function aiSetContext(label, ctx) {
  aiContext = ctx;
  const chip = document.getElementById('aiContextChip');
  const lbl  = document.getElementById('aiContextLabel');
  if (chip && lbl) {
    lbl.textContent = label;
    chip.style.display = 'flex';
  }
}

function aiClearContext() {
  aiContext = null;
  const chip = document.getElementById('aiContextChip');
  if (chip) chip.style.display = 'none';
}

// ── Private helpers ─────────────────────────────────────────────────
function _detectContext() {
  // Try to detect current study level from gamification/SRS state
  try {
    const xp = window.xpState || {};
    const level = xp.jlptLevel || _inferLevel();
    if (level) aiContext = { level };
  } catch {}
}

function _inferLevel() {
  // Infer level from progress: which level has most activity?
  const prog = window.progress || {};
  const ids = Object.keys(prog);
  if (!ids.length) return 'n5';
  const counts = { n5: 0, n4: 0, n3: 0, n2: 0, n1: 0 };
  ids.forEach(id => {
    const m = id.match(/-(n\d)-/);
    if (m && counts[m[1]] !== undefined) counts[m[1]]++;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'n5';
}

function _buildContext() {
  const ctx = { ...(aiContext || {}) };
  ctx.mode = aiMode;

  // Inject learner goals from onboarding (Phase 5 §5.3 — system prompt uses
  // {goals} to prioritize relevant examples). Set during Phase 3 onboarding;
  // empty array if user skipped or on pre-Phase-3 installs.
  try {
    const rawGoals = localStorage.getItem('nn_goals');
    if (rawGoals) {
      const goals = JSON.parse(rawGoals);
      if (Array.isArray(goals) && goals.length) ctx.goals = goals;
    }
  } catch {}

  // Add weak cards from FSRS
  try {
    if (window.srsDueToday) {
      const due = srsDueToday();
      ctx.recentWeak = due.slice(0, 5).map(c => c.pattern || c.word || c.id);
    }
  } catch {}

  // Inject learning_dna (adaptive mistake memory) for AI context
  try {
    const raw = localStorage.getItem('nn_fsrs_cards');
    if (raw && window._buildLearningDNA) {
      ctx.learning_dna = window._buildLearningDNA();
    }
  } catch {}

  return ctx;
}

function _getUserId() {
  let uid = localStorage.getItem('nn_user_id');
  if (!uid) {
    uid = 'u-' + Math.random().toString(36).slice(2, 10);
    localStorage.setItem('nn_user_id', uid);
  }
  return uid;
}

function _getQuota() {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const q = JSON.parse(localStorage.getItem(AI_QUOTA_KEY) || '{}');
    if (q.date === today) return q;
  } catch {}
  return { date: today, used: 0 };
}

function _setQuota(used) {
  const today = new Date().toISOString().slice(0, 10);
  localStorage.setItem(AI_QUOTA_KEY, JSON.stringify({ date: today, used }));
  _renderQuota();
}

function _renderQuota() {
  const q = _getQuota();
  _renderQuotaFromRemaining(DAILY_LIMIT - q.used);
}

function _renderQuotaFromRemaining(remaining) {
  const text = document.getElementById('aiQuotaText');
  const fill = document.getElementById('aiQuotaFill');
  if (text) text.textContent = `${remaining} pertanyaan gratis tersisa hari ini`;
  if (fill) fill.style.width = `${Math.max(0, (remaining / DAILY_LIMIT) * 100)}%`;
}

function _checkWorkerConfig() {
  const notice = document.getElementById('aiSetupNotice');
  if (!notice) return;
  // Show setup notice if worker URL is still default and we're not on localhost
  const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  if (!isLocal && AI_WORKER_URL.includes('REPLACE')) {
    notice.style.display = 'block';
  }
}

function _loadHistory() {
  try {
    aiHistory = JSON.parse(sessionStorage.getItem(AI_HISTORY_KEY) || '[]');
  } catch {
    aiHistory = [];
  }
}

function _saveHistory() {
  try {
    sessionStorage.setItem(AI_HISTORY_KEY, JSON.stringify(aiHistory.slice(-20)));
  } catch {}
}

// ── DOM helpers ─────────────────────────────────────────────────────
function _appendMessage(role, text) {
  const container = document.getElementById('aiChatMessages');
  if (!container) return;

  const div = document.createElement('div');
  div.className = `ai-msg ai-msg--${role}`;

  const bubble = document.createElement('div');
  bubble.className = 'ai-msg-bubble';

  // Render markdown-ish: bold, code blocks, line breaks
  bubble.innerHTML = _renderMarkdown(text);
  div.appendChild(bubble);
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function _showBotHint(msg) {
  if (!msg) return;
  _appendMessage('bot', msg);
}

function _showBotError(msg) {
  const container = document.getElementById('aiChatMessages');
  if (!container) return;

  const div = document.createElement('div');
  div.className = 'ai-msg ai-msg--error';
  div.innerHTML = `<div class="ai-msg-bubble ai-msg-bubble--error">⚠️ ${_escHtml(msg)}</div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function _showBotRetry(msg) {
  const container = document.getElementById('aiChatMessages');
  if (!container) return;

  const div = document.createElement('div');
  div.className = 'ai-msg ai-msg--bot';
  const bubble = document.createElement('div');
  bubble.className = 'ai-msg-bubble';
  bubble.innerHTML = _escHtml(msg) +
    ' <a href="#" class="ai-retry-link" onclick="aiSend(); return false;">Coba lagi →</a>';
  div.appendChild(bubble);
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function _showTyping() {
  const container = document.getElementById('aiChatMessages');
  if (!container) return null;

  const id = 'ai-typing-' + Date.now();
  const div = document.createElement('div');
  div.className = 'ai-msg ai-msg--bot';
  div.id = id;
  div.innerHTML = `<div class="ai-msg-bubble ai-typing">
    <span></span><span></span><span></span>
  </div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return id;
}

function _removeTyping(id) {
  if (id) document.getElementById(id)?.remove();
}

function _setInputEnabled(enabled) {
  const btn = document.getElementById('aiSendBtn');
  const inp = document.getElementById('aiInputText');
  if (btn) btn.disabled = !enabled;
  if (inp) inp.disabled = !enabled;

  const statusDot  = document.getElementById('senseiStatusDot');
  const statusText = document.getElementById('senseiStatusText');
  if (statusDot)  statusDot.className  = 'ai-status-dot' + (enabled ? '' : ' ai-status-dot--thinking');
  if (statusText) statusText.textContent = enabled ? 'Siap' : 'Berpikir...';
}

function _renderMarkdown(text) {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^(.*)$/, '<p>$1</p>');
}

function _escHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ── Tab switch hook (called by app.js switchTab) ──────────────────
window._aiTutorOnTabShow = function () {
  _renderQuota();
  _detectContext();
  document.getElementById('aiInputText')?.focus();
};
