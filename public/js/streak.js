// ══════════════════════════════════════
//  streak.js — Daily streak tracking + broken modal
//  Depends on: LS_STREAK (core/state.js)
//
//  Exports (window.*):
//    closeStreakBroken()
// ══════════════════════════════════════

const STREAK_TIPS = [
  "Jangan nyerah! Satu hari absen bukan akhir segalanya. 始めましょう！",
  "Streak putus = kesempatan baru mulai lebih kuat. がんばれ！",
  "Otak butuh istirahat juga — yang penting balik lagi hari ini!",
  "Konsistensi bukan tentang sempurna, tapi tentang balik lagi. 頑張って！",
  "Anki pun bilang: review hari ini lebih baik dari tidak sama sekali!",
];

function loadStreak() {
  let data = { count: 0, lastDate: null, broken: false };
  try { data = JSON.parse(localStorage.getItem(LS_STREAK)) || data; } catch(e) {}

  const badge = document.getElementById('streakBadge');
  const num   = document.getElementById('streakNum');
  if (badge && num) {
    num.textContent = data.count;
    badge.style.display = 'flex';
    if (data.count >= 7) badge.classList.add('streak-hot');
  }
  return data.count;
}

// TASK-UI-7: dipanggil saat user benar-benar belajar (bukan saat load page)
window.markStudyActivity = function() {
  const today = new Date().toDateString();
  // Cegah double-count hari yang sama
  let activityDate = null;
  try { activityDate = localStorage.getItem(LS_STREAK_ACTIVITY); } catch(e) {}
  if (activityDate === today) return; // sudah dihitung hari ini
  try { localStorage.setItem(LS_STREAK_ACTIVITY, today); } catch(e) {}

  // Sekarang increment streak
  let data = { count: 0, lastDate: null, broken: false };
  try { data = JSON.parse(localStorage.getItem(LS_STREAK)) || data; } catch(e) {}

  let showBroken = false;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (data.lastDate === yesterday) {
    data.count++;
    data.broken = false;
  } else if (data.lastDate !== null && data.lastDate !== today) {
    showBroken = data.count > 1;
    data.count = 1;
    data.broken = true;
  } else if (data.lastDate === null) {
    data.count = 1;
  }
  data.lastDate = today;
  try { localStorage.setItem(LS_STREAK, JSON.stringify(data)); } catch(e) {}

  // Update badge
  const badge = document.getElementById('streakBadge');
  const num   = document.getElementById('streakNum');
  if (badge && num) {
    num.textContent = data.count;
    if (data.count >= 7) badge.classList.add('streak-hot');
  }
  if (showBroken) setTimeout(showStreakBroken, 800);
};

function showStreakBroken() {
  const tip = STREAK_TIPS[Math.floor(Math.random() * STREAK_TIPS.length)];
  const modal = document.getElementById('streakBrokenModal');
  if (!modal) return;
  document.getElementById('streakTipText').textContent = tip;
  modal.classList.add('show');
  const fire = document.getElementById('streakBrokenFire');
  if (fire) fire.classList.add('crack');
}

window.closeStreakBroken = function() {
  document.getElementById('streakBrokenModal')?.classList.remove('show');
};
