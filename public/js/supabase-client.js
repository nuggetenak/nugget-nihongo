// ══════════════════════════════════════════════════════
//  supabase-client.js — Nugget Nihongo Supabase Integration
//  Load via CDN in index.html BEFORE this file:
//    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
//
//  SETUP: Replace SUPABASE_URL and SUPABASE_ANON_KEY below with your
//  project values from: Supabase Dashboard > Settings > API
// ══════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── CONFIG (replace these) ───────────────────────────
  var SUPABASE_URL  = 'https://YOUR_PROJECT.supabase.co';
  var SUPABASE_ANON_KEY = 'YOUR_ANON_KEY_HERE';

  // ── INIT ─────────────────────────────────────────────
  if (typeof window.supabase === 'undefined') {
    console.warn('[supabase] SDK not loaded. Add CDN script before this file.');
    return;
  }

  var sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  window.sbClient = sb;

  // ── AUTH HELPERS ──────────────────────────────────────
  window.sbAuth = {

    // Sign up with email
    signUp: function (email, password, displayName) {
      return sb.auth.signUp({
        email: email,
        password: password,
        options: { data: { full_name: displayName || '' } }
      });
    },

    // Sign in with email
    signIn: function (email, password) {
      return sb.auth.signInWithPassword({ email: email, password: password });
    },

    // Sign in with Google OAuth
    signInGoogle: function () {
      return sb.auth.signInWithOAuth({ provider: 'google' });
    },

    // Sign out
    signOut: function () {
      return sb.auth.signOut();
    },

    // Get current user (null if not logged in)
    getUser: function () {
      return sb.auth.getUser();
    },

    // Listen for auth state changes
    onAuthChange: function (callback) {
      return sb.auth.onAuthStateChange(function (event, session) {
        callback(event, session);
      });
    },
  };

  // ── SRS SYNC ─────────────────────────────────────────
  window.sbSRS = {

    // Get all due cards for current user
    getDue: function () {
      return sb.from('srs_cards')
        .select('*')
        .lte('due', new Date().toISOString())
        .order('due', { ascending: true });
    },

    // Upsert a card after review
    upsertCard: function (card) {
      return sb.from('srs_cards').upsert({
        user_id:        (sb.auth.getUser()).data?.user?.id,
        item_type:      card.item_type,
        item_id:        card.item_id,
        stability:      card.stability,
        difficulty:     card.difficulty,
        elapsed_days:   card.elapsed_days,
        scheduled_days: card.scheduled_days,
        reps:           card.reps,
        lapses:         card.lapses,
        state:          card.state,
        due:            card.due,
        last_review:    new Date().toISOString(),
      }, { onConflict: 'user_id,item_type,item_id' });
    },

    // Log a review (immutable history)
    logReview: function (itemType, itemId, rating, responseMs) {
      return sb.from('review_history').insert({
        user_id:     (sb.auth.getUser()).data?.user?.id,
        item_type:   itemType,
        item_id:     itemId,
        rating:      rating,
        response_ms: responseMs,
      });
    },

    // Bulk sync: push all local SRS state to cloud
    bulkSync: function (cards) {
      var userId = (sb.auth.getUser()).data?.user?.id;
      if (!userId) return Promise.reject('Not logged in');
      var rows = cards.map(function (c) {
        c.user_id = userId;
        return c;
      });
      return sb.from('srs_cards').upsert(rows, { onConflict: 'user_id,item_type,item_id' });
    },
  };

  // ── PROFILE ──────────────────────────────────────────
  window.sbProfile = {
    get: function () {
      return sb.from('profiles').select('*').single();
    },
    update: function (data) {
      return sb.from('profiles').update(data).eq('id', (sb.auth.getUser()).data?.user?.id);
    },
  };

  // ── PROGRESS ─────────────────────────────────────────
  window.sbProgress = {
    getAll: function () {
      return sb.from('course_progress').select('*');
    },
    upsert: function (trackId, currentIndex, completed) {
      return sb.from('course_progress').upsert({
        user_id:       (sb.auth.getUser()).data?.user?.id,
        track_id:      trackId,
        current_index: currentIndex,
        completed:     completed || false,
      }, { onConflict: 'user_id,track_id' });
    },
  };

  // ── ERROR REPORTS ────────────────────────────────────
  window.sbErrors = {
    report: function (itemType, itemId, field, description) {
      return sb.from('error_reports').insert({
        user_id:     (sb.auth.getUser()).data?.user?.id || null,
        item_type:   itemType,
        item_id:     itemId,
        field:       field,
        description: description,
      });
    },
  };

  console.log('[supabase] Client initialized. Auth + SRS + Progress + Errors ready.');

  // ── AUTH UI WIRING ────────────────────────────────────
  // Connects the #authModal HTML to Supabase auth methods.
  // Called from initAuthUI() below (exposed globally).

  var _syncTimer = null;

  function _onAuthStateChange(session) {
    const user = session?.user;
    _updateHeaderAuth(user);
    if (user) {
      _syncProgress();
    }
  }

  function _updateHeaderAuth(user) {
    const btn   = document.getElementById('authHeaderBtn');
    const label = document.getElementById('authHeaderLabel');
    const syncI = document.getElementById('syncIndicator');

    if (!btn) return;
    btn.style.display = 'flex';

    if (user) {
      const name  = user.user_metadata?.display_name || user.email?.split('@')[0] || 'Kamu';
      if (label) label.textContent = name;
      btn.title   = `Masuk sebagai ${user.email}`;
      btn.onclick = _showUserMenu;
      if (syncI) syncI.style.display = 'flex';
    } else {
      if (label) label.textContent = 'Masuk';
      btn.onclick = showAuthModal;
      if (syncI) syncI.style.display = 'none';
    }
  }

  function _showUserMenu() {
    // Simple: toggle between show profile info and sign out
    if (confirm('Keluar dari akun Nugget Nihongo?')) {
      sbAuth.signOut().then(() => {
        const syncI = document.getElementById('syncIndicator');
        if (syncI) syncI.style.display = 'none';
        const label = document.getElementById('authHeaderLabel');
        if (label) label.textContent = 'Masuk';
        const btn = document.getElementById('authHeaderBtn');
        if (btn) btn.onclick = showAuthModal;
      });
    }
  }

  function _syncProgress() {
    // Debounced cloud sync: push local FSRS cards to Supabase
    clearTimeout(_syncTimer);
    _syncTimer = setTimeout(async () => {
      try {
        const icon = document.getElementById('syncIcon');
        if (icon) icon.textContent = '🔄';

        const raw = localStorage.getItem('nn_fsrs_cards');
        if (!raw) return;
        const cards = JSON.parse(raw);
        await sbSRS.bulkSync(cards);

        if (icon) icon.textContent = '☁️';
      } catch (e) {
        console.warn('[supabase] Sync failed:', e.message);
        const icon = document.getElementById('syncIcon');
        if (icon) icon.textContent = '⚠️';
      }
    }, 3000); // 3s debounce
  }

  // Set up auth state listener
  sbAuth.onAuthChange(_onAuthStateChange);

  // ── Expose globally ───────────────────────────────────
  window.syncProgress = _syncProgress;

})();

// ══ Auth UI helpers (called from index.html inline handlers) ═══════
// These are defined outside the IIFE so they work even if
// Supabase CDN is blocked (they degrade gracefully).

var _authMode = 'signin'; // 'signin' | 'signup'

function showAuthModal() {
  const overlay = document.getElementById('authOverlay');
  if (overlay) {
    overlay.style.display = 'flex';
    document.getElementById('authEmail')?.focus();
  }
}

function hideAuthModal() {
  const overlay = document.getElementById('authOverlay');
  if (overlay) overlay.style.display = 'none';
  const err = document.getElementById('authError');
  if (err) err.style.display = 'none';
}

function toggleAuthMode() {
  _authMode = _authMode === 'signin' ? 'signup' : 'signin';
  const isSignup = _authMode === 'signup';

  const title      = document.getElementById('authTitle');
  const submitBtn  = document.getElementById('authSubmitBtn');
  const toggleText = document.getElementById('authToggleText');
  const toggleBtn  = document.getElementById('authToggleBtn');

  if (title)      title.textContent      = isSignup ? 'Buat Akun Baru' : 'Masuk ke Akun';
  if (submitBtn)  submitBtn.textContent  = isSignup ? 'Daftar' : 'Masuk';
  if (toggleText) toggleText.textContent = isSignup ? 'Sudah punya akun?' : 'Belum punya akun?';
  if (toggleBtn)  toggleBtn.textContent  = isSignup ? 'Masuk' : 'Daftar Sekarang';
}

function authGoogleSignIn() {
  if (typeof sbAuth === 'undefined') {
    alert('Supabase belum dikonfigurasi. Lihat SETUP.md untuk panduan.');
    return;
  }
  sbAuth.signInWithGoogle().catch(e => {
    const err = document.getElementById('authError');
    if (err) { err.textContent = e.message; err.style.display = 'block'; }
  });
}

function authEmailSubmit(event) {
  event.preventDefault();
  if (typeof sbAuth === 'undefined') {
    alert('Supabase belum dikonfigurasi. Lihat SETUP.md untuk panduan.');
    return;
  }

  const email    = document.getElementById('authEmail')?.value;
  const password = document.getElementById('authPassword')?.value;
  const errEl    = document.getElementById('authError');
  const submitEl = document.getElementById('authSubmitBtn');

  if (submitEl) { submitEl.disabled = true; submitEl.textContent = 'Memproses...'; }
  if (errEl)    errEl.style.display = 'none';

  const action = _authMode === 'signup'
    ? sbAuth.signUp(email, password)
    : sbAuth.signIn(email, password);

  action
    .then(() => { hideAuthModal(); })
    .catch(e => {
      if (errEl) { errEl.textContent = e.message || 'Gagal masuk. Coba lagi.'; errEl.style.display = 'block'; }
    })
    .finally(() => {
      if (submitEl) {
        submitEl.disabled = false;
        submitEl.textContent = _authMode === 'signup' ? 'Daftar' : 'Masuk';
      }
    });
}
