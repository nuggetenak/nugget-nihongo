// ══════════════════════════════════════════════════════
//  local-state.js — Nugget Nihongo IndexedDB Layer
//  Provides a promise-based IndexedDB wrapper for FSRS card state
//  and a sync queue for background Supabase uploads.
//
//  Falls back to localStorage-only mode if IndexedDB is unavailable
//  (e.g. Safari private mode, some older WebViews).
//
//  Load order: BEFORE fsrs-engine.js (so the hook can reference window.localState).
//  Exposes: window.localState
//
//  Object stores:
//    fsrs_cards   — keyPath: 'id'   (mirrors nn_fsrs_cards localStorage key)
//    review_queue — keyPath: 'queueId' (autoIncrement), index: 'timestamp'
// ══════════════════════════════════════════════════════

(function () {
  'use strict';

  var DB_NAME    = 'nugget-nihongo';
  var DB_VERSION = 1;
  var STORE_CARDS = 'fsrs_cards';
  var STORE_QUEUE = 'review_queue';

  var _db = null;  // IDBDatabase instance or null if unavailable

  // ── Open / upgrade DB ─────────────────────────────────
  function openDB() {
    return new Promise(function (resolve, reject) {
      if (!window.indexedDB) {
        reject(new Error('IndexedDB not available'));
        return;
      }

      var req = window.indexedDB.open(DB_NAME, DB_VERSION);

      req.onupgradeneeded = function (e) {
        var db = e.target.result;

        // fsrs_cards store
        if (!db.objectStoreNames.contains(STORE_CARDS)) {
          db.createObjectStore(STORE_CARDS, { keyPath: 'id' });
        }

        // review_queue store
        if (!db.objectStoreNames.contains(STORE_QUEUE)) {
          var queueStore = db.createObjectStore(STORE_QUEUE, {
            keyPath:       'queueId',
            autoIncrement: true,
          });
          queueStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };

      req.onsuccess = function (e) { resolve(e.target.result); };
      req.onerror   = function (e) { reject(e.target.error); };
    });
  }

  // ── Generic IDB transaction helpers ──────────────────

  function idbGet(storeName, key) {
    return new Promise(function (resolve, reject) {
      if (!_db) { resolve(null); return; }
      try {
        var tx  = _db.transaction(storeName, 'readonly');
        var req = tx.objectStore(storeName).get(key);
        req.onsuccess = function () { resolve(req.result || null); };
        req.onerror   = function () { reject(req.error); };
      } catch (e) { reject(e); }
    });
  }

  function idbPut(storeName, value) {
    return new Promise(function (resolve, reject) {
      if (!_db) { resolve(); return; }
      try {
        var tx  = _db.transaction(storeName, 'readwrite');
        var req = tx.objectStore(storeName).put(value);
        req.onsuccess = function () { resolve(req.result); };
        req.onerror   = function () { reject(req.error); };
      } catch (e) { reject(e); }
    });
  }

  function idbGetAll(storeName) {
    return new Promise(function (resolve, reject) {
      if (!_db) { resolve([]); return; }
      try {
        var tx   = _db.transaction(storeName, 'readonly');
        var req  = tx.objectStore(storeName).getAll();
        req.onsuccess = function () { resolve(req.result || []); };
        req.onerror   = function () { reject(req.error); };
      } catch (e) { reject(e); }
    });
  }

  function idbDeleteMany(storeName, keys) {
    return new Promise(function (resolve, reject) {
      if (!_db || keys.length === 0) { resolve(); return; }
      try {
        var tx    = _db.transaction(storeName, 'readwrite');
        var store = tx.objectStore(storeName);
        var pending = keys.length;
        var errored = false;

        keys.forEach(function (key) {
          var req = store.delete(key);
          req.onerror = function () {
            if (!errored) { errored = true; reject(req.error); }
          };
          req.onsuccess = function () {
            pending--;
            if (pending === 0 && !errored) resolve();
          };
        });
      } catch (e) { reject(e); }
    });
  }

  // ── Public API ────────────────────────────────────────

  var localState = {
    isAvailable: false,

    // ── init ──────────────────────────────────────────────
    // Call once on app startup. Sets isAvailable.
    init: function () {
      return openDB()
        .then(function (db) {
          _db = db;
          localState.isAvailable = true;
          console.log('[local-state] IndexedDB ready:', DB_NAME, 'v' + DB_VERSION);
        })
        .catch(function (err) {
          _db = null;
          localState.isAvailable = false;
          console.warn('[local-state] IndexedDB unavailable, localStorage-only mode:', err.message);
        });
    },

    // ── FSRS card operations ──────────────────────────────

    // saveCard: write to IndexedDB + mirror to localStorage (via srsData)
    // cardData: the full entry object from window.srsData[id]
    saveCard: function (id, cardData) {
      var record = Object.assign({ id: id }, cardData);
      return idbPut(STORE_CARDS, record).catch(function (e) {
        console.warn('[local-state] saveCard IDB error (non-fatal):', e);
      });
    },

    // getCard: read from IndexedDB (returns null if not found or IDB unavailable)
    getCard: function (id) {
      return idbGet(STORE_CARDS, id);
    },

    // getAllCards: returns a flat array of card records from IndexedDB
    getAllCards: function () {
      return idbGetAll(STORE_CARDS);
    },

    // ── Sync queue ────────────────────────────────────────

    // queueSync: add a review event to the outgoing Supabase sync queue
    // record: { type: 'review'|'card', id: string, data: object, timestamp: number }
    queueSync: function (record) {
      if (!record.timestamp) record.timestamp = Date.now();
      return idbPut(STORE_QUEUE, record).catch(function (e) {
        console.warn('[local-state] queueSync IDB error (non-fatal):', e);
      });
    },

    // getPendingSync: return all queued records (oldest first via timestamp index)
    getPendingSync: function () {
      return new Promise(function (resolve, reject) {
        if (!_db) { resolve([]); return; }
        try {
          var tx      = _db.transaction(STORE_QUEUE, 'readonly');
          var index   = tx.objectStore(STORE_QUEUE).index('timestamp');
          var req     = index.getAll();
          req.onsuccess = function () { resolve(req.result || []); };
          req.onerror   = function () { reject(req.error); };
        } catch (e) { reject(e); }
      });
    },

    // clearSynced: delete records from queue by their autoIncrement queueId keys
    clearSynced: function (queueIds) {
      return idbDeleteMany(STORE_QUEUE, queueIds).catch(function (e) {
        console.warn('[local-state] clearSynced IDB error (non-fatal):', e);
      });
    },
  };

  window.localState = localState;

  // Auto-init on load so fsrs-engine.js can find isAvailable immediately.
  // We use a microtask delay to avoid blocking the parser.
  Promise.resolve().then(function () {
    localState.init().catch(function () { /* already handled inside init() */ });
  });

  console.log('[local-state] Module loaded, initialising IndexedDB...');
})();
