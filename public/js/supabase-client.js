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
  var SUPABASE_URL  = 'https://oxeuwkpgrtojjzhcboqz.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94ZXV3a3BncnRvamp6aGNib3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNDczNTMsImV4cCI6MjA5MDYyMzM1M30.0kEo4o6U9YNWA0RA5h83W9nMacoxQR9uUL2lHiDiZPk';

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
})();
