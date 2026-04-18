// ══════════════════════════════════════
//  streak.js — Streak badge UI + broken streak modal
//  Loaded AFTER gamification.js.
//  Storage is owned by gamification.js (window.streakState / nn_streak key).
//  This module is display-only + provides window.markStudyActivity alias.
//
//  Exports (window.*):
//    markStudyActivity()   fn   Record study activity (delegates to gamification.js)
//    closeStreakBroken()   fn   Close the broken-streak modal
// ══════════════════════════════════════

const STREAK_TIPS = [
  "Jangan nyerah! Satu hari absen bukan akhir segalanya. 始めましょう！",
  "Streak putus = kesempatan baru mulai lebih kuat. がんばれ！",
  "Otak butuh istirahat juga — yang penting balik lagi hari ini!",
  "Konsistensi bukan tentang sempurna, tapi tentang balik lagi. 頑張って！",
  "Anki pun bilang: review hari ini lebih baik dari tidak sama sekali!",
];

// loadStreak — reads from gamification.js window.streakState (already loaded)
function loadStreak() {
  const data = window.streakState || { current: 0 };
  const badge = document.getElementById('streakBadge');
  const num   = document.getElementById('streakNum');
  if (badge && num) {
    num.textContent = data.current || 0;
    badge.style.display = 'flex';
    if ((data.current || 0) >= 7) badge.classList.add('streak-hot');
  }
}

// markStudyActivity — delegates to gamification.js streakRecordActivity
window.markStudyActivity = function () {
  if (window.streakRecordActivity) {
    window.streakRecordActivity();
    // Refresh badge after recording
    loadStreak();
  }
};

window.showStreakBroken = function() {
  const tip = STREAK_TIPS[Math.floor(Math.random() * STREAK_TIPS.length)];
  const modal = document.getElementById('streakBrokenModal');
  if (!modal) return;
  const tipEl = document.getElementById('streakTipText');
  if (tipEl) tipEl.textContent = tip;
  modal.classList.add('show');
  const fire = document.getElementById('streakBrokenFire');
  if (fire) fire.classList.add('crack');
};

function showStreakBroken() { window.showStreakBroken(); }

window.closeStreakBroken = function () {
  document.getElementById('streakBrokenModal')?.classList.remove('show');
};
