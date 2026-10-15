// ══════════════════════════════════════
//  swipe.js — Touch swipe gesture on quiz card
//  Left=✅ Hafal  Down=😅 Ragu  Right=❌ Lupa
//  Depends on: assess() from quiz.js
// ══════════════════════════════════════

function initSwipeGesture() {
  const wrap    = document.getElementById('quizCardWrap');
  const overlay = document.getElementById('swipeOverlay');
  if (!wrap) return;

  let startX = 0, startY = 0, isDragging = false;
  const THRESHOLD = 72;
  const PREVIEW   = 45;

  function showOverlay(cls, icon) {
    overlay.className = 'swipe-hint-overlay ' + cls;
    overlay.textContent = icon;
  }
  function hideOverlay() {
    overlay.className = 'swipe-hint-overlay';
    overlay.textContent = '';
  }

  wrap.addEventListener('touchstart', e => {
    if (!window.quizFlipped) return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isDragging = true;
  }, { passive: true });

  wrap.addEventListener('touchmove', e => {
    if (!isDragging || !window.quizFlipped) return;
    const dx = e.touches[0].clientX - startX;
    const dy = e.touches[0].clientY - startY;
    const adx = Math.abs(dx), ady = Math.abs(dy);
    if (adx < 12 && ady < 12) { hideOverlay(); return; }
    if      (adx > ady && dx < -PREVIEW) showOverlay('show-know',   '✅');
    else if (adx > ady && dx >  PREVIEW) showOverlay('show-forgot', '❌');
    else if (ady > adx && dy >  PREVIEW) showOverlay('show-unsure', '😅');
    else                                 hideOverlay();
  }, { passive: true });

  wrap.addEventListener('touchend', e => {
    if (!isDragging || !window.quizFlipped) { isDragging = false; return; }
    isDragging = false;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    const adx = Math.abs(dx), ady = Math.abs(dy);
    hideOverlay();
    if      (adx > ady && dx < -THRESHOLD) assess('know');
    else if (adx > ady && dx >  THRESHOLD) assess('forgot');
    else if (ady > adx && dy >  THRESHOLD) assess('unsure');
  }, { passive: true });
}

// Safe accessor for quizFlipped (defined in quiz.js)
Object.defineProperty(window, 'quizFlipped', {
  get: () => typeof quizFlipped !== 'undefined' ? quizFlipped : false,
  configurable: true
});
