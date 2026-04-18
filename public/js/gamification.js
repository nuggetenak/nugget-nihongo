// ══════════════════════════════════════════════════════
//  gamification.js — Nugget Nihongo
//  XP, levels, achievements, enhanced streak, daily challenges
//  Feature Expansion Phase F3
//
//  Exports (window.*):
//    xpState           object   { xp, level, title, title_jp }
//    xpAdd(amount,reason) fn    Award XP
//    achievements       array   Earned badges
//    checkAchievements() fn     Check & award new badges
//    dailyChallenge     object  Today's challenge
//    streakState        object  Enhanced streak data
//    heatMapData()      fn      Get study activity for calendar
// ══════════════════════════════════════════════════════

(function () {
'use strict';

const LS_XP = 'nn_xp';
const LS_ACHIEVEMENTS = 'nn_achievements';
const LS_STREAK = 'nn_streak';
const LS_HEATMAP = 'nn_heatmap';
const LS_DAILY = 'nn_daily_challenge';

// ── XP LEVELS ──────────────────────────────────────────
const LEVELS = [
  { level: 1,  xp: 0,      title: 'Pemula',           title_jp: '初心者' },
  { level: 2,  xp: 100,    title: 'Pelajar Baru',     title_jp: '新入生' },
  { level: 3,  xp: 300,    title: 'Murid Tekun',      title_jp: '勤勉な生徒' },
  { level: 4,  xp: 600,    title: 'Pencari Ilmu',     title_jp: '学び人' },
  { level: 5,  xp: 1000,   title: 'Pejuang Kanji',    title_jp: '漢字戦士' },
  { level: 6,  xp: 1500,   title: 'Penerjemah Muda',  title_jp: '若き通訳' },
  { level: 7,  xp: 2500,   title: 'Ahli Bunpou',      title_jp: '文法達人' },
  { level: 8,  xp: 4000,   title: 'Pembaca Lancar',   title_jp: '速読家' },
  { level: 9,  xp: 6000,   title: 'Penguasa Bahasa',  title_jp: '言葉の主' },
  { level: 10, xp: 10000,  title: 'Nihongo Master',   title_jp: '日本語マスター' },
];

function getLevelForXP(xp) {
  for (var i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xp) return LEVELS[i];
  }
  // Beyond level 10
  if (xp >= 10000) {
    var extraLevels = Math.floor((xp - 10000) / 5000);
    return {
      level: 10 + extraLevels,
      xp: 10000 + extraLevels * 5000,
      title: 'Nihongo Master ' + toRoman(10 + extraLevels),
      title_jp: '日本語マスター'
    };
  }
  return LEVELS[0];
}

function toRoman(n) {
  if (n <= 10) return '' + n;
  return '' + n;
}

function getNextLevelXP(currentXP) {
  for (var i = 0; i < LEVELS.length; i++) {
    if (LEVELS[i].xp > currentXP) return LEVELS[i].xp;
  }
  // Beyond max — next level every 5000
  var currentLevel = getLevelForXP(currentXP);
  return currentLevel.xp + 5000;
}

// ── XP STATE ───────────────────────────────────────────
var xpData = { xp: 0, history: [] };

function loadXP() {
  try { xpData = JSON.parse(localStorage.getItem(LS_XP)) || { xp: 0, history: [] }; }
  catch (e) { xpData = { xp: 0, history: [] }; }
  updateXPState();
}

function saveXP() {
  try { localStorage.setItem(LS_XP, JSON.stringify(xpData)); } catch (e) {}
}

function updateXPState() {
  var levelInfo = getLevelForXP(xpData.xp);
  window.xpState = {
    xp: xpData.xp,
    level: levelInfo.level,
    title: levelInfo.title,
    title_jp: levelInfo.title_jp,
    next_level_xp: getNextLevelXP(xpData.xp),
    progress: xpData.xp - levelInfo.xp,
    progress_needed: getNextLevelXP(xpData.xp) - levelInfo.xp,
  };
}

window.xpAdd = function (amount, reason) {
  var oldLevel = getLevelForXP(xpData.xp).level;
  xpData.xp += amount;
  xpData.history = (xpData.history || []).slice(-99);
  xpData.history.push({
    amount: amount,
    reason: reason || 'unknown',
    date: new Date().toISOString(),
  });
  saveXP();
  updateXPState();

  var newLevel = getLevelForXP(xpData.xp).level;
  if (newLevel > oldLevel) {
    var info = getLevelForXP(xpData.xp);
    console.log('[gamification] LEVEL UP!', oldLevel, '→', newLevel, info.title);
    if (window.showLevelUp) window.showLevelUp(info);
    window.checkAchievements();
  }
  return window.xpState;
};

// ── ACHIEVEMENTS ───────────────────────────────────────
const BADGE_DEFS = [
  // Vocab
  { id: 'vocab-10',    name: 'First Words',        icon: '🌱', condition: function() { return countLearned('vocab') >= 10; } },
  { id: 'vocab-100',   name: 'Word Collector',      icon: '📚', condition: function() { return countLearned('vocab') >= 100; } },
  { id: 'vocab-500',   name: 'Vocabulary Warrior',   icon: '⚔️', condition: function() { return countLearned('vocab') >= 500; } },
  { id: 'vocab-1000',  name: 'Lexicon Master',      icon: '👑', condition: function() { return countLearned('vocab') >= 1000; } },
  { id: 'vocab-3000',  name: 'Walking Dictionary',  icon: '📖', condition: function() { return countLearned('vocab') >= 3000; } },
  // Grammar
  { id: 'grammar-10',  name: 'Grammar Beginner',    icon: '🔤', condition: function() { return countLearned('grammar') >= 10; } },
  { id: 'grammar-50',  name: 'Pattern Spotter',     icon: '🔍', condition: function() { return countLearned('grammar') >= 50; } },
  { id: 'grammar-100', name: 'Grammar Architect',   icon: '🏗️', condition: function() { return countLearned('grammar') >= 100; } },
  { id: 'grammar-200', name: 'Bunpou Sensei',       icon: '🎓', condition: function() { return countLearned('grammar') >= 200; } },
  // Streak
  { id: 'streak-3',    name: 'Getting Started',     icon: '🔥', condition: function() { return getStreakLength() >= 3; } },
  { id: 'streak-7',    name: 'One Week Strong',     icon: '💪', condition: function() { return getStreakLength() >= 7; } },
  { id: 'streak-30',   name: 'Monthly Warrior',     icon: '🏆', condition: function() { return getStreakLength() >= 30; } },
  { id: 'streak-90',   name: 'Quarter Champion',    icon: '🌟', condition: function() { return getStreakLength() >= 90; } },
  { id: 'streak-365',  name: 'Year of Learning',    icon: '🎊', condition: function() { return getStreakLength() >= 365; } },
  // Special
  { id: 'comeback',    name: 'Comeback Kid',        icon: '🔄', condition: function() { return streakData.comebacks >= 1; } },
  { id: 'night-owl',   name: 'Night Owl',           icon: '🦉', condition: function() { return new Date().getHours() >= 0 && new Date().getHours() < 5; } },
  { id: 'early-bird',  name: 'Early Bird',          icon: '🐦', condition: function() { return new Date().getHours() >= 4 && new Date().getHours() < 6; } },
  // Level-based
  { id: 'level-5',     name: 'Dedicated Learner',   icon: '⭐', condition: function() { return window.xpState && window.xpState.level >= 5; } },
  { id: 'level-10',    name: 'Nihongo Master',      icon: '🏅', condition: function() { return window.xpState && window.xpState.level >= 10; } },
];

var earnedBadges = [];

function loadAchievements() {
  try { earnedBadges = JSON.parse(localStorage.getItem(LS_ACHIEVEMENTS)) || []; }
  catch (e) { earnedBadges = []; }
  window.achievements = earnedBadges;
}

function saveAchievements() {
  try { localStorage.setItem(LS_ACHIEVEMENTS, JSON.stringify(earnedBadges)); } catch (e) {}
  window.achievements = earnedBadges;
}

function countLearned(type) {
  var count = 0;
  var data = window.srsData || {};
  for (var id in data) {
    if (!data.hasOwnProperty(id)) continue;
    var isType = type === 'vocab' ? id.startsWith('vg-') : !id.startsWith('vg-');
    if (isType && data[id].card && data[id].card.reps > 0) count++;
  }
  return count;
}

window.checkAchievements = function () {
  var newBadges = [];
  var earnedIds = {};
  for (var i = 0; i < earnedBadges.length; i++) {
    earnedIds[earnedBadges[i].id] = true;
  }

  for (var i = 0; i < BADGE_DEFS.length; i++) {
    var badge = BADGE_DEFS[i];
    if (earnedIds[badge.id]) continue;
    try {
      if (badge.condition()) {
        var earned = {
          id: badge.id,
          name: badge.name,
          icon: badge.icon,
          earned_at: new Date().toISOString(),
        };
        earnedBadges.push(earned);
        newBadges.push(earned);
        console.log('[gamification] Badge earned:', badge.icon, badge.name);
      }
    } catch (e) {}
  }

  if (newBadges.length > 0) {
    saveAchievements();
    if (window.showBadgeEarned) {
      for (var i = 0; i < newBadges.length; i++) {
        window.showBadgeEarned(newBadges[i]);
      }
    }
  }
  return newBadges;
};

window.getAllBadges = function () {
  var earnedIds = {};
  for (var i = 0; i < earnedBadges.length; i++) {
    earnedIds[earnedBadges[i].id] = earnedBadges[i];
  }
  return BADGE_DEFS.map(function (def) {
    return {
      id: def.id,
      name: def.name,
      icon: def.icon,
      earned: !!earnedIds[def.id],
      earned_at: earnedIds[def.id] ? earnedIds[def.id].earned_at : null,
    };
  });
};

// ── ENHANCED STREAK ────────────────────────────────────
var streakData = {
  current: 0,
  longest: 0,
  last_active: null,
  freezes: 0,       // earned freeze count (max 2 stored)
  comebacks: 0,     // times user resumed after 7+ day break
  endangered: false, // true if missed yesterday
};

function getStreakLength() { return streakData.current; }

function loadStreak() {
  try {
    var stored = JSON.parse(localStorage.getItem(LS_STREAK));
    if (stored) streakData = { ...streakData, ...stored };
  } catch (e) {}
}

function saveStreak() {
  try { localStorage.setItem(LS_STREAK, JSON.stringify(streakData)); } catch (e) {}
  window.streakState = streakData;
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayStr() {
  var d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

window.streakRecordActivity = function () {
  var today = todayStr();
  if (streakData.last_active === today) return; // already recorded today

  var yesterday = yesterdayStr();

  if (streakData.last_active === yesterday) {
    // Consecutive day — extend streak
    streakData.current++;
    streakData.endangered = false;
  } else if (streakData.last_active) {
    // Missed at least one day
    var daysMissed = Math.floor(
      (new Date(today) - new Date(streakData.last_active)) / 86400000
    );

    if (daysMissed === 2 && streakData.freezes > 0) {
      // One day missed, have freeze → use it
      streakData.freezes--;
      streakData.current++;
      console.log('[gamification] Streak freeze used! Remaining:', streakData.freezes);
    } else if (daysMissed >= 7) {
      // Long break — comeback
      streakData.comebacks++;
      streakData.current = 1; // restart
      console.log('[gamification] Comeback! Break was', daysMissed, 'days');
    } else {
      // Streak broken — show modal (streak.js exports window.showStreakBroken)
      streakData.current = 1;
      setTimeout(function() {
        if (window.showStreakBroken) window.showStreakBroken();
      }, 500);
    }
  } else {
    // First ever activity
    streakData.current = 1;
  }

  // Update longest
  if (streakData.current > streakData.longest) {
    streakData.longest = streakData.current;
  }

  // Earn freezes: 1 per 7-day streak milestone (max 2 stored)
  if (streakData.current > 0 && streakData.current % 7 === 0 && streakData.freezes < 2) {
    streakData.freezes++;
    console.log('[gamification] Streak freeze earned! Total:', streakData.freezes);
  }

  streakData.last_active = today;
  streakData.endangered = false;
  saveStreak();

  // Award streak XP
  var streakXP = 5 * streakData.current;
  window.xpAdd(streakXP, 'streak-day-' + streakData.current);

  // Check streak achievements
  window.checkAchievements();

  // Record in heat map
  recordHeatMap(today);
};

// ── HEAT MAP ───────────────────────────────────────────
function recordHeatMap(dateStr) {
  var heatmap = {};
  try { heatmap = JSON.parse(localStorage.getItem(LS_HEATMAP)) || {}; } catch (e) {}
  if (!heatmap[dateStr]) heatmap[dateStr] = { reviews: 0, xp: 0, challenge: false };
  heatmap[dateStr].reviews++;
  try { localStorage.setItem(LS_HEATMAP, JSON.stringify(heatmap)); } catch (e) {}
}

window.heatMapData = function (days) {
  days = days || 90;
  var heatmap = {};
  try { heatmap = JSON.parse(localStorage.getItem(LS_HEATMAP)) || {}; } catch (e) {}

  var result = [];
  var d = new Date();
  for (var i = 0; i < days; i++) {
    var ds = d.toISOString().slice(0, 10);
    result.unshift({
      date: ds,
      reviews: heatmap[ds] ? heatmap[ds].reviews : 0,
      xp: heatmap[ds] ? heatmap[ds].xp : 0,
      challenge: heatmap[ds] ? heatmap[ds].challenge : false,
      active: !!heatmap[ds],
    });
    d.setDate(d.getDate() - 1);
  }
  return result;
};

// ── DAILY CHALLENGES ───────────────────────────────────
const CHALLENGE_TEMPLATES = [
  { type: 'vocab_sprint',  text: 'Pelajari {n} vocab {level} baru hari ini', xp: 50, n: 5 },
  { type: 'review_all',    text: 'Selesaikan semua review hari ini',          xp: 40 },
  { type: 'perfect_10',    text: '10 review benar berturut-turut',            xp: 60 },
  { type: 'speed_20',      text: 'Review 20 kartu dalam 5 menit',            xp: 55 },
  { type: 'grammar_focus', text: 'Review semua grammar {cat}',               xp: 45 },
  { type: 'new_cards',     text: 'Pelajari {n} kartu baru',                   xp: 50, n: 10 },
];

function generateDailyChallenge() {
  // Deterministic per day (same challenge all day)
  var seed = Math.floor(Date.now() / 86400000);
  var idx = seed % CHALLENGE_TEMPLATES.length;
  var template = CHALLENGE_TEMPLATES[idx];

  return {
    ...template,
    date: todayStr(),
    completed: false,
    progress: 0,
  };
}

function loadDailyChallenge() {
  var stored = null;
  try { stored = JSON.parse(localStorage.getItem(LS_DAILY)); } catch (e) {}

  if (!stored || stored.date !== todayStr()) {
    // New day — new challenge
    var challenge = generateDailyChallenge();
    try { localStorage.setItem(LS_DAILY, JSON.stringify(challenge)); } catch (e) {}
    window.dailyChallenge = challenge;
  } else {
    window.dailyChallenge = stored;
  }
}

window.completeDailyChallenge = function () {
  if (window.dailyChallenge && !window.dailyChallenge.completed) {
    window.dailyChallenge.completed = true;
    window.xpAdd(window.dailyChallenge.xp, 'daily-challenge');
    try { localStorage.setItem(LS_DAILY, JSON.stringify(window.dailyChallenge)); } catch (e) {}

    // Mark on heat map
    var heatmap = {};
    try { heatmap = JSON.parse(localStorage.getItem(LS_HEATMAP)) || {}; } catch (e) {}
    var today = todayStr();
    if (!heatmap[today]) heatmap[today] = { reviews: 0, xp: 0, challenge: false };
    heatmap[today].challenge = true;
    try { localStorage.setItem(LS_HEATMAP, JSON.stringify(heatmap)); } catch (e) {}

    console.log('[gamification] Daily challenge completed! +' + window.dailyChallenge.xp + ' XP');
  }
};

// ── XP HOOKS ───────────────────────────────────────────
// Hook into FSRS reviews to award XP
var _origSrsReview = window.srsReview;
if (_origSrsReview) {
  window.srsReview = function (id, quality) {
    var result = _origSrsReview(id, quality);

    // Award XP based on rating
    var rating = quality === 0 ? 1 : quality <= 2 ? 2 : quality === 3 ? 3 : 4;
    if (rating >= 3) {
      window.xpAdd(10, 'review-correct');
    } else {
      window.xpAdd(5, 'review-attempt');
    }

    // Record activity for streak
    window.streakRecordActivity();

    // Check achievements periodically
    var stats = window.srsStats ? window.srsStats() : {};
    if (stats.total && stats.total % 10 === 0) {
      window.checkAchievements();
    }

    return result;
  };
}

// Same for srsReviewFSRS
var _origSrsReviewFSRS = window.srsReviewFSRS;
if (_origSrsReviewFSRS) {
  window.srsReviewFSRS = function (id, rating) {
    var result = _origSrsReviewFSRS(id, rating);
    if (rating >= 3) {
      window.xpAdd(10, 'review-correct');
    } else {
      window.xpAdd(5, 'review-attempt');
    }
    window.streakRecordActivity();
    return result;
  };
}

// ── INITIALIZE ─────────────────────────────────────────
loadXP();
loadAchievements();
loadStreak();
loadDailyChallenge();

window.streakState = streakData;

console.log('[gamification] Loaded | XP:', xpData.xp,
  '| Level:', window.xpState.level, window.xpState.title,
  '| Streak:', streakData.current,
  '| Badges:', earnedBadges.length,
  '| Challenge:', window.dailyChallenge.completed ? 'done' : 'active');

})();
