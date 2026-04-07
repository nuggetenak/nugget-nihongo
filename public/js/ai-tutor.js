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
  return 'https://nugget-nihongo-ai.workers.dev/chat';
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
    const res = await fetch(AI_WORKER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-ID': _getUserId(),
      },
      body: JSON.stringify({
        messages: aiHistory.slice(-10), // last 10 turns
        context: ctx,
        userId: _getUserId(),
      }),
    });

    _removeTyping(typingId);

    if (res.status === 429) {
      _showBotError('Batas harian tercapai (15 pertanyaan). Coba lagi besok! ☀️');
      _setQuota(DAILY_LIMIT);
    } else if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      _showBotError(err.message || 'AI sedang tidak tersedia. Coba lagi sebentar.');
    } else {
      const data = await res.json();
      const reply = data.reply || '(Tidak ada balasan)';
      _appendMessage('bot', reply);
      aiHistory.push({ role: 'assistant', content: reply });
      _saveHistory();

      // Update quota
      _setQuota(quota.used + 1);

      // Update remaining from header
      if (typeof data.remaining === 'number') {
        _renderQuotaFromRemaining(data.remaining);
      }

      // Trim history to last 20 turns (memory)
      if (aiHistory.length > 20) aiHistory = aiHistory.slice(-20);
    }
  } catch (e) {
    _removeTyping(typingId);
    _showBotError('Tidak bisa terhubung ke AI. Periksa koneksi internet kamu.');
    console.error('[ai-tutor]', e);
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

  // Add weak cards from FSRS
  try {
    if (window.srsDueToday) {
      const due = srsDueToday();
      ctx.recentWeak = due.slice(0, 5).map(c => c.pattern || c.word || c.id);
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
