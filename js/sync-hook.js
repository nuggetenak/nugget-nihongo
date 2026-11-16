// ══════════════════════════════════════════════════════
//  sync-hook.js — Nugget Nihongo Background Sync Engine
//  Silently drains the IndexedDB review_queue to Supabase
//  whenever the user comes back online or the tab becomes visible.
//
//  Requires: local-state.js + supabase-client.js loaded first.
//  Exposes:  window.syncHook
//
//  Events fired on window:
//    'nugget-sync-complete'  → detail: { synced: n, failed: n }
// ══════════════════════════════════════════════════════

(function () {
  'use strict';

  var BATCH_SIZE  = 20;    // records per Supabase upsert batch
  var MAX_RETRIES = 3;
  var RETRY_BASE  = 2000;  // 2s, 4s, 8s

  // ── Exponential backoff delay ─────────────────────────
  function delay(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  // ── Check if user is logged in ────────────────────────
  function isLoggedIn() {
    // sbAuth.getUser() returns a promise but we need sync guard.
    // We check the Supabase session stored in localStorage.
    try {
      var keys = Object.keys(localStorage);
      for (var i = 0; i < keys.length; i++) {
        if (keys[i].indexOf('supabase.auth.token') !== -1 ||
            keys[i].indexOf('sb-') !== -1) {
          var raw = localStorage.getItem(keys[i]);
          if (raw) {
            var parsed = JSON.parse(raw);
            // Has a non-null access token → logged in
            if (parsed && (parsed.access_token || (parsed.currentSession && parsed.currentSession.access_token))) {
              return true;
            }
          }
        }
      }
    } catch (e) {}
    return false;
  }

  // ── Push a single batch of records to Supabase ────────
  // Returns: { pushed: [queueIds], failed: [queueIds] }
  async function pushBatch(records) {
    var pushed = [];
    var failed = [];

    for (var i = 0; i < records.length; i++) {
      var rec = records[i];
      var attempts = 0;
      var success  = false;

      while (attempts < MAX_RETRIES && !success) {
        try {
          if (window.sbSRS) {
            // Map queue record → srs_cards row shape
            await window.sbSRS.upsertCard({
              item_type:      rec.item_type || (rec.id.startsWith('vg-') ? 'vocab' : 'grammar'),
              item_id:        rec.item_id || rec.id,
              stability:      rec.data ? rec.data.stability      : 0,
              difficulty:     rec.data ? rec.data.difficulty     : 0,
              elapsed_days:   rec.data ? rec.data.elapsed_days   : 0,
              scheduled_days: rec.data ? rec.data.scheduled_days : 0,
              reps:           rec.data ? rec.data.reps           : 0,
              lapses:         rec.data ? rec.data.lapses         : 0,
              state:          rec.data ? rec.data.state          : 0,
              due:            rec.data ? rec.data.due            : new Date().toISOString(),
            });
            success = true;
          } else {
            // sbSRS not available — skip this record
            failed.push(rec.queueId);
            break;
          }
        } catch (e) {
          attempts++;
          if (attempts < MAX_RETRIES) {
            await delay(RETRY_BASE * Math.pow(2, attempts - 1));
          }
        }
      }

      if (success) {
        pushed.push(rec.queueId);
      } else if (attempts >= MAX_RETRIES) {
        failed.push(rec.queueId);
      }
    }

    return { pushed: pushed, failed: failed };
  }

  // ── Main sync function ────────────────────────────────
  var _isRunning = false;

  async function sync() {
    // Guard: only one sync at a time
    if (_isRunning) return { synced: 0, failed: 0 };
    // Guard: user must be logged in (anon users don't sync)
    if (!isLoggedIn()) return { synced: 0, failed: 0 };
    // Guard: localState must be available
    if (!window.localState || !window.localState.isAvailable) return { synced: 0, failed: 0 };

    _isRunning = true;
    var totalSynced = 0;
    var totalFailed = 0;

    try {
      var pending = await window.localState.getPendingSync();
      if (pending.length === 0) {
        _isRunning = false;
        return { synced: 0, failed: 0 };
      }

      console.log('[sync-hook] Syncing', pending.length, 'queued records...');

      // Process in batches
      for (var offset = 0; offset < pending.length; offset += BATCH_SIZE) {
        var batch  = pending.slice(offset, offset + BATCH_SIZE);
        var result = await pushBatch(batch);

        if (result.pushed.length > 0) {
          await window.localState.clearSynced(result.pushed);
          totalSynced += result.pushed.length;
        }
        totalFailed += result.failed.length;
      }

      console.log('[sync-hook] Sync complete. Synced:', totalSynced, '| Failed:', totalFailed);

      window.dispatchEvent(new CustomEvent('nugget-sync-complete', {
        detail: { synced: totalSynced, failed: totalFailed },
      }));

    } catch (err) {
      console.warn('[sync-hook] Sync error:', err.message);
    } finally {
      _isRunning = false;
    }

    return { synced: totalSynced, failed: totalFailed };
  }

  // ── Event listeners ───────────────────────────────────

  // Trigger sync when network comes back online
  window.addEventListener('online', function () {
    console.log('[sync-hook] Online detected, triggering sync...');
    sync();
  });

  // Trigger sync when tab becomes visible and we're online
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible' && navigator.onLine) {
      sync();
    }
  });

  // ── Public API ────────────────────────────────────────
  window.syncHook = {
    sync:       sync,
    isRunning:  function () { return _isRunning; },
    isLoggedIn: isLoggedIn,
  };

  console.log('[sync-hook] Ready. Listening for online/visibility events.');
})();
