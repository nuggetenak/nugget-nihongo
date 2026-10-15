// ══════════════════════════════════════════════════════════════════
//  quiz-keyboard.js — Desktop Keyboard Shortcuts for Nugget Nihongo Quiz Arena
//  Hotkeys:
//    Space      : Flip Flashcard / Advance when answer feedback shown
//    1 / 2 / 3  : Flashcard rating (1: Lupa, 2: Ragu, 3: Hafal)
//    1 / 2 / 3 / 4 : Select multiple choice option
//    Enter      : Next question / Confirm
//    Escape     : End quiz prompt
// ══════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  document.addEventListener('keydown', function (e) {
    // Ignore if user is typing in an input field or textarea
    var tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;

    // Ignore if global search or auth modal is open
    var gs = document.getElementById('globalSearchOverlay');
    if (gs && gs.classList.contains('open')) return;
    var authModal = document.getElementById('authModal');
    if (authModal && authModal.style.display !== 'none' && authModal.classList.contains('show')) return;

    // Only active when quiz page is the active tab
    var quizPage = document.getElementById('quizPage');
    if (!quizPage || !quizPage.classList.contains('active')) return;

    var key = e.key;

    // ── 1. FEEDBACK NEXT BUTTON (Enter or Space) ────────────────
    if (key === 'Enter' || key === ' ') {
      var nextBtns = [
        document.querySelector('#mcFeedback button.fill-next-btn'),
        document.querySelector('#vqMcFeedback button.fill-next-btn'),
        document.querySelector('#vqFillFeedback button.fill-next-btn'),
        document.querySelector('#fillFeedback button.fill-next-btn'),
        document.querySelector('#conjFeedback button.fill-next-btn'),
        document.querySelector('#mxFeedback button.fill-next-btn'),
        document.querySelector('#transFeedback button.fill-next-btn'),
        document.querySelector('#errorFindFeedback button.fill-next-btn')
      ];

      for (var i = 0; i < nextBtns.length; i++) {
        var btn = nextBtns[i];
        if (btn && btn.offsetParent !== null) { // visible
          e.preventDefault();
          btn.click();
          return;
        }
      }
    }

    // ── 2. FLASHCARD FLIP (Space) ──────────────────────────────
    if (key === ' ') {
      // Vocab Flashcard
      var vqPanel = document.getElementById('vqFlashPanel');
      if (vqPanel && vqPanel.style.display !== 'none') {
        var vqFront = document.getElementById('vqFlashFront');
        if (vqFront && vqFront.style.display !== 'none' && window.vqFlipCard) {
          e.preventDefault();
          window.vqFlipCard();
          return;
        }
      }

      // Grammar Flashcard
      var qCardWrap = document.getElementById('quizCardWrap');
      if (qCardWrap && qCardWrap.offsetParent !== null && !qCardWrap.classList.contains('flipped')) {
        var activeQuiz = document.getElementById('quizActive');
        if (activeQuiz && activeQuiz.style.display !== 'none') {
          e.preventDefault();
          if (typeof window.flipQuizCard === 'function') window.flipQuizCard();
          else qCardWrap.click();
          return;
        }
      }

      // Mixed Quiz Flashcard
      var mxPanel = document.getElementById('mxFlashPanel');
      if (mxPanel && mxPanel.style.display !== 'none') {
        var mxFront = document.getElementById('mxFlashFront');
        if (mxFront && mxFront.style.display !== 'none' && window.mxFlipCard) {
          e.preventDefault();
          window.mxFlipCard();
          return;
        }
      }
    }

    // ── 3. FLASHCARD ASSESSMENT RATINGS (1: Lupa, 2: Ragu, 3: Hafal) ──
    if (key === '1' || key === '2' || key === '3') {
      var ratingMap = { '1': 'forgot', '2': 'unsure', '3': 'know' };
      var rating = ratingMap[key];

      // Vocab Flashcard Flipped
      var vqBtns = document.getElementById('vqAssessBtns');
      if (vqBtns && vqBtns.style.display !== 'none' && window.vqAssess) {
        e.preventDefault();
        window.vqAssess(rating);
        return;
      }

      // Grammar Flashcard Flipped
      var assessBtns = document.getElementById('assessBtns');
      if (assessBtns && assessBtns.classList.contains('show')) {
        e.preventDefault();
        var targetBtn = assessBtns.querySelector('[data-result="' + rating + '"]') ||
                        assessBtns.querySelector('.assess-btn--' + rating);
        if (targetBtn) targetBtn.click();
        else if (typeof window.assess === 'function') window.assess(rating);
        return;
      }

      // Mixed Quiz Flashcard Flipped
      var mxBtns = document.getElementById('mxAssessBtns');
      if (mxBtns && mxBtns.style.display !== 'none' && window.mxAssess) {
        e.preventDefault();
        window.mxAssess(rating);
        return;
      }
    }

    // ── 4. MULTIPLE CHOICE SELECTION (1, 2, 3, 4) ───────────────
    if (key === '1' || key === '2' || key === '3' || key === '4') {
      var optIdx = parseInt(key, 10) - 1;

      // Multiple choice containers
      var choiceContainers = [
        document.getElementById('mcChoices'),
        document.getElementById('vqMcChoices'),
        document.getElementById('vqFillChoices'),
        document.getElementById('fillChoices'),
        document.getElementById('conjChoices'),
        document.getElementById('mxChoices')
      ];

      for (var c = 0; c < choiceContainers.length; c++) {
        var container = choiceContainers[c];
        if (container && container.offsetParent !== null) { // visible
          var choices = container.querySelectorAll('.fill-choice, .mc-choice, button');
          if (choices && choices.length > optIdx && !choices[optIdx].disabled && !choices[optIdx].classList.contains('disabled')) {
            e.preventDefault();
            choices[optIdx].click();
            return;
          }
        }
      }
    }

    // ── 5. ESCAPE: CANCEL OR CONFIRM QUIT ────────────────────────
    if (key === 'Escape') {
      var endModal = document.getElementById('endQuizModal');
      if (endModal && endModal.classList.contains('show')) {
        e.preventDefault();
        if (typeof window.cancelEndQuiz === 'function') window.cancelEndQuiz();
      }
    }
  });

})();
