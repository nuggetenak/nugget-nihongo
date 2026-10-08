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

  // ── CONFIG ───────────────────────────────────────────
  var SUPABASE_URL  = 'https://xipvhxorvwpvfokauboy.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpcHZoeG9ydndwdmZva2F1Ym95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE0NTA2ODYsImV4cCI6MjEwNzAyNjY4Nn0.xz2jvXwkM15rBRnohCYxAC6d7I7WFkzmeu1arPMgNtU';

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
        options: {
          data: { display_name: displayName || '' },
          emailRedirectTo: window.location.origin,
        }
      });
    },

    // Sign in with email
    signIn: function (email, password) {
      return sb.auth.signInWithPassword({ email: email, password: password });
    },

    // Sign in with Google OAuth
    signInGoogle: function () {
      return sb.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        }
      });
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
    upsertCard: async function (card) {
      var u = await sb.auth.getUser();
      var userId = u.data?.user?.id;
      if (!userId) return Promise.reject('Not authenticated');
      return sb.from('srs_cards').upsert({
        user_id:        userId,
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
    logReview: async function (itemType, itemId, rating, responseMs) {
      var u = await sb.auth.getUser();
      var userId = u.data?.user?.id;
      if (!userId) return;
      return sb.from('review_history').insert({
        user_id:     userId,
        item_type:   itemType,
        item_id:     itemId,
        rating:      rating,
        response_ms: responseMs,
      });
    },

    // Bulk sync: push all local SRS state to cloud in chunks of 200
    // cards = { [id]: { card: FSRSCard, history: [], source: 'grammar'|'vocab' } }
    bulkSync: async function (cards) {
      var u = await sb.auth.getUser();
      var userId = u.data?.user?.id;
      if (!userId) return Promise.reject('Not authenticated');
      if (!cards || typeof cards !== 'object') return Promise.reject('Invalid cards data');
      var rows = Object.entries(cards).map(function (kv) {
        var id = kv[0], entry = kv[1];
        var card = entry.card || {};
        return {
          user_id:        userId,
          item_type:      entry.source || (id.startsWith('vg-') ? 'vocab' : 'grammar'),
          item_id:        id,
          stability:      card.stability      || 0,
          difficulty:     card.difficulty     || 0,
          elapsed_days:   card.elapsed_days   || 0,
          scheduled_days: card.scheduled_days || 0,
          reps:           card.reps           || 0,
          lapses:         card.lapses         || 0,
          state:          card.state          || 0,
          due:            card.due            || new Date().toISOString(),
          last_review:    card.last_review    || new Date().toISOString(),
        };
      });
      if (!rows.length) return;
      var CHUNK_SIZE = 200;
      for (var i = 0; i < rows.length; i += CHUNK_SIZE) {
        var chunk = rows.slice(i, i + CHUNK_SIZE);
        var r = await sb.from('srs_cards').upsert(chunk, { onConflict: 'user_id,item_type,item_id' });
        if (r && r.error) throw r.error;
      }
    },

    // Pull all remote cards from Supabase and merge with local
    pullAll: async function () {
      var u = await sb.auth.getUser();
      var userId = u.data?.user?.id;
      if (!userId) return Promise.reject('Not authenticated');
      var res = await sb.from('srs_cards').select('*').eq('user_id', userId);
      if (res.error) throw res.error;
      var remoteCards = res.data || [];
      if (!remoteCards.length) return {};

      var localCards = {};
      try { localCards = JSON.parse(localStorage.getItem('nn_fsrs_cards') || '{}'); } catch (e) {}
      var updated = false;

      remoteCards.forEach(function (rc) {
        var id = rc.item_id;
        var localEntry = localCards[id];
        var remoteLast = new Date(rc.last_review || 0).getTime();
        var localLast = localEntry && localEntry.card && localEntry.card.last_review
          ? new Date(localEntry.card.last_review).getTime()
          : 0;

        if (!localEntry || remoteLast > localLast) {
          localCards[id] = {
            card: {
              due:            rc.due,
              stability:      rc.stability,
              difficulty:     rc.difficulty,
              elapsed_days:   rc.elapsed_days,
              scheduled_days: rc.scheduled_days,
              reps:           rc.reps,
              lapses:         rc.lapses,
              state:          rc.state,
              last_review:    rc.last_review,
            },
            history: (localEntry && localEntry.history) || [],
            source:  rc.item_type || (id.startsWith('vg-') ? 'vocab' : 'grammar')
          };
          updated = true;
          if (window.localState && window.localState.saveCard) {
            window.localState.saveCard(id, localCards[id]);
          }
        }
      });

      if (updated) {
        window.srsData = localCards;
        try { localStorage.setItem('nn_fsrs_cards', JSON.stringify(localCards)); } catch (e) {}
      }
      return localCards;
    },
  };

  // ── 4D FSRS ATOMS ─────────────────────────────────────
  window.sbFSRSAtoms = {
    getAtoms: async function (atomType) {
      var u = await sb.auth.getUser();
      var userId = u.data?.user?.id;
      if (!userId) return Promise.reject('Not authenticated');
      var q = sb.from('fsrs_atoms').select('*').eq('user_id', userId);
      if (atomType) q = q.eq('atom_type', atomType);
      return q;
    },
    upsertAtom: async function (atom) {
      var u = await sb.auth.getUser();
      var userId = u.data?.user?.id;
      if (!userId) return Promise.reject('Not authenticated');
      return sb.from('fsrs_atoms').upsert({
        user_id:             userId,
        atom_type:           atom.atom_type,
        atom_id:             atom.atom_id,
        visual_stability:    atom.dimensions?.visual?.stability    || atom.visual_stability    || 0,
        visual_difficulty:   atom.dimensions?.visual?.difficulty   || atom.visual_difficulty   || 0,
        context_stability:   atom.dimensions?.context?.stability   || atom.context_stability   || 0,
        context_difficulty:  atom.dimensions?.context?.difficulty  || atom.context_difficulty  || 0,
        auditory_stability:  atom.dimensions?.auditory?.stability  || atom.auditory_stability  || 0,
        auditory_difficulty: atom.dimensions?.auditory?.difficulty || atom.auditory_difficulty || 0,
        verbal_stability:    atom.dimensions?.verbal?.stability    || atom.verbal_stability    || 0,
        verbal_difficulty:   atom.dimensions?.verbal?.difficulty   || atom.verbal_difficulty   || 0,
        last_reviewed_at:    atom.last_reviewed_at || new Date().toISOString()
      }, { onConflict: 'user_id,atom_type,atom_id' });
    },
    batchUpsertAtoms: async function (atoms) {
      var u = await sb.auth.getUser();
      var userId = u.data?.user?.id;
      if (!userId) return Promise.reject('Not authenticated');
      if (!Array.isArray(atoms) || atoms.length === 0) return;
      var rows = atoms.map(function (atom) {
        return {
          user_id:             userId,
          atom_type:           atom.atom_type,
          atom_id:             atom.atom_id,
          visual_stability:    atom.dimensions?.visual?.stability    || atom.visual_stability    || 0,
          visual_difficulty:   atom.dimensions?.visual?.difficulty   || atom.visual_difficulty   || 0,
          context_stability:   atom.dimensions?.context?.stability   || atom.context_stability   || 0,
          context_difficulty:  atom.dimensions?.context?.difficulty  || atom.context_difficulty  || 0,
          auditory_stability:  atom.dimensions?.auditory?.stability  || atom.auditory_stability  || 0,
          auditory_difficulty: atom.dimensions?.auditory?.difficulty || atom.auditory_difficulty || 0,
          verbal_stability:    atom.dimensions?.verbal?.stability    || atom.verbal_stability    || 0,
          verbal_difficulty:   atom.dimensions?.verbal?.difficulty   || atom.verbal_difficulty   || 0,
          last_reviewed_at:    atom.last_reviewed_at || new Date().toISOString()
        };
      });
      var CHUNK = 100;
      for (var i = 0; i < rows.length; i += CHUNK) {
        var chunk = rows.slice(i, i + CHUNK);
        var r = await sb.from('fsrs_atoms').upsert(chunk, { onConflict: 'user_id,atom_type,atom_id' });
        if (r && r.error) throw r.error;
      }
    }
  };

  // ── PROFILE ──────────────────────────────────────────
  window.sbProfile = {
    get: function () {
      return sb.from('profiles').select('*').single();
    },
    update: async function (data) {
      var u = await sb.auth.getUser();
      var userId = u.data?.user?.id;
      if (!userId) return;
      return sb.from('profiles').update(data).eq('id', userId);
    },
    getLearningDNA: async function () {
      var user = (await sb.auth.getUser()).data?.user;
      if (!user) return null;
      var resp = await sb.from('profiles').select('learning_dna').eq('id', user.id).single();
      return resp.data?.learning_dna || { mistakes: [], error_cats: {} };
    },
    updateLearningDNA: async function (dna) {
      var user = (await sb.auth.getUser()).data?.user;
      if (!user) return;
      await sb.from('profiles')
        .update({ learning_dna: dna, updated_at: new Date().toISOString() })
        .eq('id', user.id);
    },
  };

  // ── PROGRESS ─────────────────────────────────────────
  window.sbProgress = {
    getAll: function () {
      return sb.from('course_progress').select('*');
    },
    upsert: async function (trackId, currentIndex, completed) {
      var u = await sb.auth.getUser();
      var userId = u.data?.user?.id;
      if (!userId) return;
      return sb.from('course_progress').upsert({
        user_id:       userId,
        track_id:      trackId,
        current_index: currentIndex,
        completed:     completed || false,
      }, { onConflict: 'user_id,track_id' });
    },
  };

  // ── ERROR REPORTS ────────────────────────────────────
  window.sbErrors = {
    report: async function (itemType, itemId, field, description) {
      var u = await sb.auth.getUser();
      var userId = u.data?.user?.id || null;
      return sb.from('error_reports').insert({
        user_id:     userId,
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

  function _onAuthStateChange(event, session) {
    const user = session?.user;
    _updateHeaderAuth(user);
    if (user) {
      _syncProgress();
      if (event === 'SIGNED_IN' && !window._migrationDone) {
        window._migrationDone = true;
        _migrateAllToSupabase();
      }
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

        // Also sync learning_dna (mistake patterns for AI context)
        try {
          var dna = _buildLearningDNA();
          if (dna.mistakes.length > 0) {
            await sbProfile.updateLearningDNA(dna);
          }
        } catch (dnaErr) {
          console.warn('[supabase] learning_dna sync skipped:', dnaErr.message);
        }

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

  // ── Build learning_dna from local FSRS data ──────────
  // Extracts cards with lapses > 0, sorted by lapse count.
  // Blueprint basis: Gap 4 (Adaptive beyond SRS)
  function _buildLearningDNA() {
    var raw = localStorage.getItem('nn_fsrs_cards');
    if (!raw) return { mistakes: [], error_cats: {}, reviewed_at: null };
    var cards;
    try { cards = JSON.parse(raw); } catch (e) { return { mistakes: [], error_cats: {} }; }
    var errorCats = {};
    var mistakes = Object.entries(cards)
      .filter(function (kv) { return kv[1].card && kv[1].card.lapses > 0; })
      .map(function (kv) {
        var id = kv[0], v = kv[1];
        // Try to find the grammar/vocab entry for pattern name
        var pattern = id;
        if (window.grammarDB) {
          var g = window.grammarDB.find(function (e) { return e && e.id === id; });
          if (g) { pattern = g.pattern || g.grammar || id; if (g.cat) errorCats[g.cat] = (errorCats[g.cat] || 0) + v.card.lapses; }
        }
        if (window.vocabDB && pattern === id) {
          var voc = window.vocabDB.find(function (e) { return e && e.id === id; });
          if (voc) pattern = voc.word || id;
        }
        return { item_id: id, pattern: pattern, count: v.card.lapses, last_wrong: v.card.last_review };
      })
      .sort(function (a, b) { return b.count - a.count; })
      .slice(0, 20);
    return { mistakes: mistakes, error_cats: errorCats, reviewed_at: new Date().toISOString() };
  }

  // ── Full localStorage → Supabase migration ──────────
  // Triggered once on first sign-in. Idempotent & bi-directional.
  // Blueprint basis: Phase 4 (Cloud sync)
  async function _migrateAllToSupabase() {
    var user = (await sb.auth.getUser()).data?.user;
    if (!user) return;
    if (localStorage.getItem('nn_migrated_v1') === 'true') return;

    try {
      // 1. Pull remote profile first (prevent wiping cloud profile if new device)
      var remoteProf = null;
      try {
        var profRes = await sbProfile.get();
        if (profRes && profRes.data) remoteProf = profRes.data;
      } catch (profErr) {
        console.warn('[supabase] Could not fetch remote profile:', profErr.message);
      }

      // 2. Resolve XP and streak
      var xpData = {}, streakData = {};
      try { xpData = JSON.parse(localStorage.getItem('nn_xp') || '{"xp":0}'); } catch (e) {}
      try { streakData = JSON.parse(localStorage.getItem('nn_streak') || '{"current":0}'); } catch (e) {}

      var localXP = xpData.xp || 0;
      var localStreak = streakData.current || streakData.count || 0;
      var localStreakLast = streakData.last_active || streakData.lastDate || null;

      if (remoteProf) {
        if ((remoteProf.xp || 0) > localXP) {
          localXP = remoteProf.xp;
          xpData.xp = localXP;
          if (window.xpState) window.xpState.xp = localXP;
          try { localStorage.setItem('nn_xp', JSON.stringify(xpData)); } catch (e) {}
        }
        if ((remoteProf.streak_days || 0) > localStreak) {
          localStreak = remoteProf.streak_days;
          localStreakLast = remoteProf.streak_last;
          streakData.current = localStreak;
          streakData.last_active = localStreakLast;
          if (window.streakState) {
            window.streakState.current = localStreak;
            window.streakState.last_active = localStreakLast;
          }
          try { localStorage.setItem('nn_streak', JSON.stringify(streakData)); } catch (e) {}
        }
      }

      await sbProfile.update({
        xp: localXP,
        streak_days: localStreak,
        streak_last: localStreakLast,
      });

      // 3. Remote achievements pull & merge
      var achievements = [];
      try { achievements = JSON.parse(localStorage.getItem('nn_achievements') || '[]'); } catch (e) {}
      try {
        var remoteAchRes = await sb.from('achievements').select('achievement').eq('user_id', user.id);
        if (remoteAchRes && remoteAchRes.data && remoteAchRes.data.length) {
          var remoteAchs = remoteAchRes.data.map(function (r) { return r.achievement; });
          achievements = Array.from(new Set(achievements.concat(remoteAchs)));
          try { localStorage.setItem('nn_achievements', JSON.stringify(achievements)); } catch (e) {}
        }
      } catch (achErr) {}

      for (var i = 0; i < achievements.length; i++) {
        await sb.from('achievements').upsert(
          { user_id: user.id, achievement: achievements[i], earned_at: new Date().toISOString() },
          { onConflict: 'user_id,achievement', ignoreDuplicates: true }
        );
      }

      // 4. Bi-directional FSRS pull and sync
      await sbSRS.pullAll();
      _syncProgress();

      // 5. learning_dna → profiles.learning_dna
      await sbProfile.updateLearningDNA(_buildLearningDNA());

      // 6. Course progress → course_progress table
      var cp = {};
      try { cp = JSON.parse(localStorage.getItem('nn_course_progress') || '{}'); } catch (e) {}
      for (var trackId in cp) {
        if (cp.hasOwnProperty(trackId)) {
          var prog = cp[trackId];
          await sbProgress.upsert(trackId, prog.currentIndex || 0, prog.completed || false);
        }
      }

      localStorage.setItem('nn_migrated_v1', 'true');
      console.log('[supabase] Full migration complete (bi-directional)');
    } catch (e) {
      console.warn('[supabase] Migration incomplete:', e.message);
    }
  }

  // ── Expose globally ───────────────────────────────────
  window.syncProgress = _syncProgress;
  window.migrateAllToSupabase = _migrateAllToSupabase;
  window._buildLearningDNA = _buildLearningDNA; // used by ai-tutor.js for Sensei context
  // Bug 3 fix: export constants for ai-proxy.js (sbClient.supabaseKey doesn't exist in Supabase v2)
  window._SUPABASE_URL      = SUPABASE_URL;
  window._SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;

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
  sbAuth.signInGoogle().catch(e => {
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
