// ══════════════════════════════════════════════════════
//  backup-restore.js — Nugget Nihongo
//  Manual data backup (JSON export) and restore (JSON import)
//  Feature Expansion Phase F1
//
//  Exports (window.*):
//    exportBackup()    fn   Download all user data as .json
//    importBackup()    fn   Open file picker → import .json
//    getBackupAge()    fn   Days since last backup (null if never)
// ══════════════════════════════════════════════════════

(function () {
'use strict';

const LS_LAST_BACKUP = 'nn_last_backup';
const BACKUP_REMIND_DAYS = 30;

// All localStorage keys that contain user data
const USER_DATA_KEYS = [
  'nn_fsrs_cards',
  'nn_fsrs_settings',
  'nn_xp',
  'nn_achievements',
  'nn_streak',
  'nn_streak_activity',
  'nn_settings',
  'nn_bookmarks',
  'nn_course_progress',
  'nn_daily_challenge',
  // Legacy keys (preserved for safety)
  'bunpou_progress',
  'bunpou_bookmarks',
  'bunpou_srs',
  'bunpou_streak',
  'bunpou_streak_activity',
  'bunpou-theme',
];

// ── Export ──────────────────────────────────────────────
window.exportBackup = function () {
  var data = {};
  for (var i = 0; i < USER_DATA_KEYS.length; i++) {
    var key = USER_DATA_KEYS[i];
    var val = localStorage.getItem(key);
    if (val !== null) {
      try { data[key] = JSON.parse(val); }
      catch (e) { data[key] = val; }
    }
  }

  var backup = {
    app: 'nugget-nihongo',
    version: window.APP_VERSION || 'unknown',
    exported_at: new Date().toISOString(),
    data: data,
  };

  var json = JSON.stringify(backup, null, 2);
  var blob = new Blob([json], { type: 'application/json' });
  var url = URL.createObjectURL(blob);

  var dateStr = new Date().toISOString().slice(0, 10);
  var filename = 'nugget-nihongo-backup-' + dateStr + '.json';

  var a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  // Record backup time
  localStorage.setItem(LS_LAST_BACKUP, new Date().toISOString());

  console.log('[backup] Exported:', Object.keys(data).length, 'keys →', filename);
  return filename;
};

// ── Import ─────────────────────────────────────────────
window.importBackup = function (mode) {
  // mode: 'merge' (default) or 'replace'
  mode = mode || 'merge';

  var input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';

  input.onchange = function (e) {
    var file = e.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function (ev) {
      try {
        var backup = JSON.parse(ev.target.result);

        // Validate structure
        if (!backup.app || backup.app !== 'nugget-nihongo') {
          alert('File ini bukan backup Nugget Nihongo yang valid.');
          return;
        }
        if (!backup.data || typeof backup.data !== 'object') {
          alert('Backup tidak mengandung data yang valid.');
          return;
        }

        var imported = 0;
        var skipped = 0;

        if (mode === 'replace') {
          // Clear all user data first
          for (var i = 0; i < USER_DATA_KEYS.length; i++) {
            localStorage.removeItem(USER_DATA_KEYS[i]);
          }
        }

        for (var key in backup.data) {
          if (!backup.data.hasOwnProperty(key)) continue;

          // Only import known keys
          if (USER_DATA_KEYS.indexOf(key) === -1) {
            skipped++;
            continue;
          }

          if (mode === 'merge') {
            // Merge strategy: for FSRS cards, keep card with newer last_review
            if (key === 'nn_fsrs_cards') {
              var existing = {};
              try { existing = JSON.parse(localStorage.getItem(key)) || {}; } catch (e) {}
              var incoming = backup.data[key] || {};

              for (var cardId in incoming) {
                if (!incoming.hasOwnProperty(cardId)) continue;
                var inc = incoming[cardId];
                var ext = existing[cardId];

                if (!ext) {
                  // Card doesn't exist locally — import it
                  existing[cardId] = inc;
                } else {
                  // Both exist — keep newer
                  var incDate = inc.card && inc.card.last_review ? new Date(inc.card.last_review) : new Date(0);
                  var extDate = ext.card && ext.card.last_review ? new Date(ext.card.last_review) : new Date(0);
                  if (incDate > extDate) {
                    existing[cardId] = inc;
                  }
                }
              }
              localStorage.setItem(key, JSON.stringify(existing));
            }
            // For achievements: union
            else if (key === 'nn_achievements') {
              var extAch = [];
              try { extAch = JSON.parse(localStorage.getItem(key)) || []; } catch (e) {}
              var incAch = backup.data[key] || [];
              var achIds = {};
              var merged = [];
              for (var j = 0; j < extAch.length; j++) {
                achIds[extAch[j].id || extAch[j]] = true;
                merged.push(extAch[j]);
              }
              for (var j = 0; j < incAch.length; j++) {
                var achId = incAch[j].id || incAch[j];
                if (!achIds[achId]) {
                  merged.push(incAch[j]);
                  achIds[achId] = true;
                }
              }
              localStorage.setItem(key, JSON.stringify(merged));
            }
            // For XP/streak: keep higher value
            else if (key === 'nn_xp' || key === 'nn_streak') {
              var extVal = 0;
              try { extVal = JSON.parse(localStorage.getItem(key)) || 0; } catch (e) {}
              var incVal = backup.data[key] || 0;
              if (typeof extVal === 'object' && typeof incVal === 'object') {
                // Complex object — keep one with higher total
                var extTotal = extVal.total || extVal.xp || 0;
                var incTotal = incVal.total || incVal.xp || 0;
                localStorage.setItem(key, JSON.stringify(incTotal > extTotal ? incVal : extVal));
              } else {
                localStorage.setItem(key, JSON.stringify(Math.max(extVal, incVal)));
              }
            }
            // For everything else: replace with incoming
            else {
              localStorage.setItem(key, JSON.stringify(backup.data[key]));
            }
          } else {
            // Replace mode — just write
            localStorage.setItem(key, JSON.stringify(backup.data[key]));
          }
          imported++;
        }

        var msg = 'Backup berhasil di-import!\n'
          + 'Data dari: ' + (backup.exported_at || 'unknown') + '\n'
          + 'Mode: ' + (mode === 'merge' ? 'Merge (gabung)' : 'Replace (timpa)') + '\n'
          + 'Keys imported: ' + imported;
        if (skipped > 0) msg += '\nKeys skipped: ' + skipped;
        msg += '\n\nApp akan di-reload untuk menerapkan perubahan.';

        alert(msg);
        window.location.reload();

      } catch (err) {
        alert('Gagal membaca backup: ' + err.message);
        console.error('[backup] Import error:', err);
      }
    };
    reader.readAsText(file);
  };

  input.click();
};

// ── Backup Age ─────────────────────────────────────────
window.getBackupAge = function () {
  var last = localStorage.getItem(LS_LAST_BACKUP);
  if (!last) return null;
  var days = (Date.now() - new Date(last).getTime()) / 86400000;
  return Math.floor(days);
};

// ── Auto-reminder check ────────────────────────────────
window.checkBackupReminder = function () {
  var age = window.getBackupAge();
  if (age === null || age >= BACKUP_REMIND_DAYS) {
    return true; // should remind
  }
  return false;
};

console.log('[backup] Module loaded. Last backup:',
  window.getBackupAge() !== null ? window.getBackupAge() + ' days ago' : 'never');

})();
