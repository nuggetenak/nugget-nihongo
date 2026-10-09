// ══════════════════════════════════════════════════════════════════
//  QuizPage.tsx — Nugget Nihongo Arena Kuis (2-State Architecture)
//  Lobby Dashboard (Hub) → Focused Interactive Drill Arena
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { Layers, RotateCcw, Volume2, Sparkles, Check, ArrowRight, CornerDownLeft, ChevronLeft } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { QuizMode } from '../types/quiz';
import { JLPTLevel } from '../types/vocab';
import { FSRSCard, FSRSRating } from '../types/fsrs';
import { calculateFSRSReview } from '../lib/fsrs/math';
import { loadVocab, loadGrammar } from '../lib/data/dataManager';
import {
  generateQuizQuestions,
  generateFSRSDueQuestions,
  generateMistakeQuestions,
  getFSRSDueCount,
  QuizQuestionItem,
} from '../lib/quiz/quizEngine';
import { speakJapanese } from '../lib/audio/tts';
import { playFlipSfx, playSuccessSfx, playErrorSfx, playFanfareSfx } from '../lib/audio/sfx';
import { QuizArenaHub } from '../components/quiz/QuizArenaHub';
import { QuizAudioListeningCard } from '../components/quiz/QuizAudioListeningCard';
import { QuizExplanationDetail } from '../components/quiz/QuizExplanationDetail';
import { QuizResultView } from '../components/quiz/QuizResultView';
import { useGamificationStore } from '../lib/gamification/gamificationStore';
import { useGardenStore } from '../lib/garden/gardenStore';
import { useSwipeGesture } from '../components/quiz/useSwipeGesture';
import { QuizConfigModal } from '../components/quiz/QuizConfigModal';
import { QuizExitGuardModal } from '../components/quiz/QuizExitGuardModal';

export const QuizPage: React.FC = () => {
  const { selectedLevel, setSelectedLevel, showToast, incrementXp, setActiveTab, setCard, cards } = useAppStore();

  // Navigation state within Quiz Arena: 'hub' (dashboard) | 'quiz' (active session)
  const [viewState, setViewState] = useState<'hub' | 'quiz'>('hub');
  const [activeMode, setActiveMode] = useState<QuizMode>('flashcard');

  // Session configuration state
  const [sessionCount, setSessionCount] = useState<number>(10);
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);
  const [isExitGuardOpen, setIsExitGuardOpen] = useState<boolean>(false);

  // Question & progress state
  const [questions, setQuestions] = useState<QuizQuestionItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Interaction state
  const [isFlipped, setIsFlipped] = useState(false); // for flashcards
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Rearrange mode tokens state
  const [assembledTokens, setAssembledTokens] = useState<string[]>([]);
  const [availableTokens, setAvailableTokens] = useState<string[]>([]);

  // Results & Mistake tracking
  const [userAnswers, setUserAnswers] = useState<Array<{ question: QuizQuestionItem; isCorrect: boolean; selected: string }>>([]);
  const [mistakesList, setMistakesList] = useState<QuizQuestionItem[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);
  const [sessionEarnedWater, setSessionEarnedWater] = useState(0);

  // Calculate count of due cards in FSRS
  const dueCount = getFSRSDueCount(cards);

  // Load questions for standard mode
  const startStandardSession = async (mode: QuizMode) => {
    setIsLoading(true);
    setIsFinished(false);
    setCurrentIndex(0);
    setSessionScore(0);
    setSessionXp(0);
    setUserAnswers([]);
    setSelectedOption(null);
    setFeedback(null);
    setIsFlipped(false);
    setActiveMode(mode);
    setViewState('quiz');

    try {
      const targetLevel: JLPTLevel = selectedLevel === 'all' ? 'n5' : selectedLevel;
      const [vocabs, grammars] = await Promise.all([
        loadVocab(targetLevel),
        loadGrammar(targetLevel),
      ]);

      const items = generateQuizQuestions(mode, vocabs, grammars, targetLevel, sessionCount);
      setQuestions(items);

      if (items.length > 0 && mode === 'rearrange' && items[0].tokens) {
        setAvailableTokens(items[0].tokens);
        setAssembledTokens([]);
      }
    } catch (e) {
      console.error('[QuizPage] Failed to generate quiz questions', e);
      showToast('Gagal memuat bank soal', '⚠️');
    } finally {
      setIsLoading(false);
    }
  };

  // Load FSRS Due session
  const startFSRSDueSession = async () => {
    setIsLoading(true);
    setIsFinished(false);
    setCurrentIndex(0);
    setSessionScore(0);
    setSessionXp(0);
    setUserAnswers([]);
    setSelectedOption(null);
    setFeedback(null);
    setIsFlipped(false);
    setActiveMode('flashcard');
    setViewState('quiz');

    try {
      const targetLevel: JLPTLevel = selectedLevel === 'all' ? 'n5' : selectedLevel;
      const [vocabs, grammars] = await Promise.all([
        loadVocab(targetLevel),
        loadGrammar(targetLevel),
      ]);

      const items = generateFSRSDueQuestions(cards, vocabs, grammars, targetLevel, sessionCount);
      setQuestions(items);
    } catch (e) {
      console.error('[QuizPage] Failed to generate FSRS questions', e);
      showToast('Gagal memuat sesi review FSRS', '⚠️');
    } finally {
      setIsLoading(false);
    }
  };

  // Load Mistake Retry session
  const startMistakeSession = () => {
    if (mistakesList.length === 0) {
      showToast('Belum ada catatan soal yang salah!', '✨');
      return;
    }

    setIsLoading(true);
    setIsFinished(false);
    setCurrentIndex(0);
    setSessionScore(0);
    setSessionXp(0);
    setUserAnswers([]);
    setSelectedOption(null);
    setFeedback(null);
    setIsFlipped(false);
    setViewState('quiz');

    const retryQuestions = generateMistakeQuestions(mistakesList);
    setQuestions(retryQuestions);
    setActiveMode(retryQuestions[0]?.mode || 'multiple-choice');
    setIsLoading(false);
  };

  const currentQ = questions[currentIndex];

  // Request to exit back to hub
  const handleRequestExitToHub = () => {
    if (currentIndex > 0 && !isFinished) {
      setIsExitGuardOpen(true);
    } else {
      setViewState('hub');
    }
  };

  const handleConfirmExit = () => {
    setIsExitGuardOpen(false);
    setViewState('hub');
  };

  // Touch Swipe Gesture for Mobile Flashcards
  const { swipeHint, touchHandlers } = useSwipeGesture({
    enabled: activeMode === 'flashcard' && isFlipped && viewState === 'quiz',
    onSwipeLeft: () => handleFlashcardRate(3),
    onSwipeRight: () => handleFlashcardRate(1),
    onSwipeDown: () => handleFlashcardRate(2),
  });

  // Set up tokens when moving to next rearrange question
  useEffect(() => {
    if (currentQ && activeMode === 'rearrange' && currentQ.tokens) {
      setAvailableTokens(currentQ.tokens);
      setAssembledTokens([]);
    }
  }, [currentIndex, currentQ, activeMode]);

  const toggleFlip = () => {
    setIsFlipped((prev) => {
      playFlipSfx();
      return !prev;
    });
  };

  // Keyboard shortcut listener (Space to flip, 1-4 for choices)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewState !== 'quiz' || isFinished || !currentQ) return;
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      const numpadMap: Record<string, number> = {
        Digit1: 1, Numpad1: 1,
        Digit2: 2, Numpad2: 2,
        Digit3: 3, Numpad3: 3,
        Digit4: 4, Numpad4: 4,
      };

      // Flashcard mode
      if (activeMode === 'flashcard') {
        if (e.code === 'Space') {
          e.preventDefault();
          toggleFlip();
        } else if (isFlipped && e.code in numpadMap) {
          const rating = numpadMap[e.code];
          handleFlashcardRate(rating);
        }
        return;
      }

      // Choice-based modes
      if (['multiple-choice', 'listening', 'conjugation', 'fill-in', 'translation', 'error-find'].includes(activeMode)) {
        if (!feedback && e.code in numpadMap && currentQ.options) {
          const idx = numpadMap[e.code] - 1;
          if (idx >= 0 && idx < currentQ.options.length) {
            handleSelectOption(currentQ.options[idx]);
          }
        } else if (feedback && (e.code === 'Enter' || e.code === 'Space')) {
          e.preventDefault();
          handleNextQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewState, isFinished, currentQ, activeMode, isFlipped, feedback]);

  // Atomized calculation helper: updates FSRS spaced repetition and seeds Kanji garden
  const updateItemFSRSAndGarden = (
    target: QuizQuestionItem['targetItem'],
    isCorrect: boolean,
    customRating?: FSRSRating
  ) => {
    const itemId = target.id;
    const isVocab = 'word' in target;
    const itemType = isVocab ? 'vocab' : 'grammar';

    const existing: FSRSCard = cards[itemId]?.card || {
      due: new Date().toISOString(),
      stability: 0,
      difficulty: 5,
      elapsed_days: 0,
      scheduled_days: 0,
      reps: 0,
      lapses: 0,
      state: 0,
    };

    const rating: FSRSRating = customRating || (isCorrect ? 3 : 1);
    const updatedCard = calculateFSRSReview(existing, rating);

    setCard(itemId, {
      card: updatedCard,
      source: itemType,
    });

    // Dynamic Kanji garden seeding on correct answer if item contains kanji
    if (isCorrect && isVocab) {
      const v = target as any;
      const kanjiMatch = v.word?.match(/[\u4e00-\u9faf]/);
      if (kanjiMatch) {
        useGardenStore.getState().seedPlant(
          kanjiMatch[0],
          v.reading || v.word,
          v.meaning,
          (v.level || 'n5').toLowerCase() as any
        );
      }
    }
  };

  // Flashcard FSRS Rating handler
  const handleFlashcardRate = (rating: number) => {
    if (!currentQ) return;
    const isCorrect = rating >= 3;
    const xpGain = isCorrect ? (rating === 4 ? 15 : 10) : 2;

    if (isCorrect) playSuccessSfx();
    else playErrorSfx();

    incrementXp(xpGain);
    setSessionScore((prev) => (isCorrect ? prev + 1 : prev));
    setSessionXp((prev) => prev + xpGain);

    // Save FSRS state with mathematical memory model & garden seeding
    updateItemFSRSAndGarden(currentQ.targetItem, isCorrect, rating as FSRSRating);

    // Record atomized mode statistics
    useGamificationStore.getState().recordQuizAnswer('flashcard', isCorrect);

    setUserAnswers((prev) => [
      ...prev,
      {
        question: currentQ,
        isCorrect,
        selected: rating === 4 ? 'Mudah' : rating === 3 ? 'Ingat' : rating === 2 ? 'Ragu' : 'Lupa',
      },
    ]);

    if (!isCorrect) {
      setMistakesList((prev) => (prev.some((m) => m.id === currentQ.id) ? prev : [...prev, currentQ]));
    }

    handleNextQuestion();
  };

  // Option selection handler for choices (Multiple choice, Audio listening, Conjugation, Fill-in, etc.)
  const handleSelectOption = (opt: string) => {
    if (feedback || !currentQ) return;
    setSelectedOption(opt);

    const isCorrect = opt.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();
    const xpGain = isCorrect ? 10 : 2;

    if (isCorrect) {
      playSuccessSfx();
      setSessionScore((prev) => prev + 1);
    } else {
      playErrorSfx();
      setMistakesList((prev) => (prev.some((m) => m.id === currentQ.id) ? prev : [...prev, currentQ]));
    }

    incrementXp(xpGain);
    setSessionXp((prev) => prev + xpGain);

    // Atomized FSRS calculation & Garden seeding across ALL modes
    updateItemFSRSAndGarden(currentQ.targetItem, isCorrect);

    // Record atomized mode statistics
    useGamificationStore.getState().recordQuizAnswer(activeMode, isCorrect);

    setFeedback({
      isCorrect,
      text: isCorrect
        ? `Tepat sekali! ${currentQ.explanation}`
        : `Belum tepat. Jawaban yang benar adalah "${currentQ.correctAnswer}". ${currentQ.explanation}`,
    });

    setUserAnswers((prev) => [
      ...prev,
      {
        question: currentQ,
        isCorrect,
        selected: opt,
      },
    ]);
  };

  // Rearrange tokens handlers
  const handleAddToken = (token: string, tokenIndex: number) => {
    if (feedback) return;
    playFlipSfx();
    setAssembledTokens((prev) => [...prev, token]);
    setAvailableTokens((prev) => prev.filter((_, i) => i !== tokenIndex));
  };

  const handleRemoveToken = (token: string, tokenIndex: number) => {
    if (feedback) return;
    playFlipSfx();
    setAvailableTokens((prev) => [...prev, token]);
    setAssembledTokens((prev) => prev.filter((_, i) => i !== tokenIndex));
  };

  const handleCheckRearrange = () => {
    if (!currentQ || feedback) return;
    const assembledStr = assembledTokens.join('');
    const targetClean = currentQ.correctAnswer.replace(/[\s、。！？]/g, '');
    const userClean = assembledStr.replace(/[\s、。！？]/g, '');
    const isCorrect = userClean === targetClean;
    const xpGain = isCorrect ? 15 : 2;

    if (isCorrect) {
      playSuccessSfx();
      setSessionScore((prev) => prev + 1);
    } else {
      playErrorSfx();
      setMistakesList((prev) => (prev.some((m) => m.id === currentQ.id) ? prev : [...prev, currentQ]));
    }

    incrementXp(xpGain);
    setSessionXp((prev) => prev + xpGain);

    // Atomized FSRS update & Garden seeding for Rearrange
    updateItemFSRSAndGarden(currentQ.targetItem, isCorrect, isCorrect ? 4 : 1);

    // Record atomized mode statistics
    useGamificationStore.getState().recordQuizAnswer('rearrange', isCorrect);

    setFeedback({
      isCorrect,
      text: isCorrect
        ? `Hebat! Susunan kalimatmu sempurna: "${currentQ.correctAnswer}"`
        : `Susunan belum tepat. Yang benar: "${currentQ.correctAnswer}".`,
    });

    setUserAnswers((prev) => [
      ...prev,
      {
        question: currentQ,
        isCorrect,
        selected: assembledStr,
      },
    ]);
  };

  const finishSession = () => {
    setIsFinished(true);
    playFanfareSfx();
    const appStore = useAppStore.getState();
    appStore.recordStudyActivity();
    useGamificationStore.getState().recordActivity(questions.length, sessionXp);

    // Atomized dynamic water drop rewards (1 base + 1 per 3 correct + 1 bonus for 100% accuracy)
    const baseDrops = 1;
    const scoreDrops = Math.floor(sessionScore / 3);
    const perfectBonus = sessionScore === questions.length && questions.length > 0 ? 1 : 0;
    const earnedDrops = baseDrops + scoreDrops + perfectBonus;
    setSessionEarnedWater(earnedDrops);
    useGardenStore.getState().addWaterDrop(earnedDrops);

    // Record session completion in gamification stats
    useGamificationStore.getState().recordQuizSessionComplete(activeMode, sessionScore, questions.length);

    const allCards = Object.values(appStore.cards);
    const vocabCount = allCards.filter((c) => c.source === 'vocab' || !c.source).length;
    const grammarCount = allCards.filter((c) => c.source === 'grammar').length;

    const newly = useGamificationStore.getState().checkAndAwardBadges({
      streak: appStore.streak,
      vocabCount,
      grammarCount,
      perfectQuizSession: sessionScore === questions.length && questions.length > 0,
    });
    if (newly.length > 0) {
      showToast(`Lencana baru: ${newly[0].name} ${newly[0].icon}!`, '🏆');
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setFeedback(null);
    setIsFlipped(false);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      finishSession();
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-6 space-y-6 animate-in fade-in duration-300">
      {/* State 1: Arena Hub Dashboard */}
      {viewState === 'hub' ? (
        <QuizArenaHub
          onStartMode={(m) => startStandardSession(m)}
          onStartFSRSDue={startFSRSDueSession}
          onStartMistakeReview={startMistakeSession}
          onOpenConfig={() => setIsConfigOpen(true)}
          sessionCount={sessionCount}
          selectedLevel={selectedLevel}
          dueCount={dueCount}
          mistakesCount={mistakesList.length}
        />
      ) : (
        /* State 2: Active Focused Quiz Arena */
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Top In-Quiz Control Bar */}
          <div className="flex items-center justify-between gap-3 border-b border-accent/15 pb-3">
            <button
              onClick={handleRequestExitToHub}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-appText-muted hover:text-appText-bright text-xs font-bold transition-all shrink-0 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Dasbor Kuis</span>
            </button>

            {!isFinished && questions.length > 0 && (
              <div className="flex items-center gap-3 flex-1 max-w-xs sm:max-w-md mx-2">
                <div className="w-full bg-surface-2 rounded-full h-2 overflow-hidden border border-accent/10">
                  <div
                    className="bg-accent h-full transition-all duration-300 rounded-full"
                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>
                <span className="text-[11px] font-mono font-bold text-accent shrink-0">
                  {currentIndex + 1}/{questions.length}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-accent font-mono">
                {currentQ?.level || selectedLevel}
              </span>
            </div>
          </div>

          {/* Main Quiz Arena Views */}
          {isLoading ? (
            <div className="py-24 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/20 text-accent animate-pulse flex items-center justify-center text-2xl">
                🍙
              </div>
              <p className="text-xs text-appText-muted">Menyiapkan butir latihan kuis...</p>
            </div>
          ) : isFinished ? (
            <QuizResultView
              score={sessionScore}
              total={questions.length}
              xpEarned={sessionXp}
              waterEarned={sessionEarnedWater}
              answers={userAnswers}
              onRestart={() => startStandardSession(activeMode)}
              onGoHome={() => setActiveTab('home')}
              onRetryMistakes={mistakesList.length > 0 ? startMistakeSession : undefined}
              onGoToHub={() => setViewState('hub')}
            />
          ) : !currentQ ? (
            <div className="bg-surface border border-accent/20 rounded-3xl p-8 text-center space-y-3">
              <p className="text-xs text-appText-muted">Belum ada bank soal yang tersedia untuk mode ini.</p>
              <button
                onClick={() => setViewState('hub')}
                className="px-4 py-2 rounded-xl bg-accent text-bg font-bold text-xs"
              >
                Kembali ke Dasbor
              </button>
            </div>
          ) : (
            <div className="max-w-xl mx-auto space-y-5">
              {/* Mode: Listening Drill */}
              {activeMode === 'listening' && (
                <QuizAudioListeningCard
                  question={currentQ}
                  selectedOption={selectedOption}
                  feedback={feedback}
                  onSelectOption={handleSelectOption}
                />
              )}

              {/* Mode: Flashcard 3D */}
              {activeMode === 'flashcard' && (
                <div className="space-y-4">
                  <div
                    {...touchHandlers}
                    onClick={toggleFlip}
                    className={`relative cursor-pointer min-h-[300px] rounded-3xl border-2 p-8 flex flex-col justify-between text-center transition-all duration-300 select-none shadow-xl overflow-hidden ${
                      isFlipped
                        ? 'bg-amber-950/40 border-amber-500/60'
                        : 'bg-surface border-accent/30 hover:border-accent/50'
                    }`}
                  >
                    {/* Visual Swipe Gesture Hint Badges */}
                    {isFlipped && swipeHint === 'left' && (
                      <div className="absolute inset-0 bg-green-500/25 backdrop-blur-[2px] rounded-3xl flex items-center justify-center pointer-events-none z-20 animate-in fade-in duration-150">
                        <span className="text-xl sm:text-2xl font-bold text-green-300 bg-surface/95 px-5 py-2.5 rounded-2xl border border-green-500/50 shadow-2xl">
                          ✅ Hafal (Geser Kiri)
                        </span>
                      </div>
                    )}
                    {isFlipped && swipeHint === 'right' && (
                      <div className="absolute inset-0 bg-red-500/25 backdrop-blur-[2px] rounded-3xl flex items-center justify-center pointer-events-none z-20 animate-in fade-in duration-150">
                        <span className="text-xl sm:text-2xl font-bold text-red-300 bg-surface/95 px-5 py-2.5 rounded-2xl border border-red-500/50 shadow-2xl">
                          ❌ Lupa (Geser Kanan)
                        </span>
                      </div>
                    )}
                    {isFlipped && swipeHint === 'down' && (
                      <div className="absolute inset-0 bg-amber-500/25 backdrop-blur-[2px] rounded-3xl flex items-center justify-center pointer-events-none z-20 animate-in fade-in duration-150">
                        <span className="text-xl sm:text-2xl font-bold text-amber-300 bg-surface/95 px-5 py-2.5 rounded-2xl border border-amber-500/50 shadow-2xl">
                          😅 Ragu (Geser Bawah)
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-appText-muted">
                      <span className="font-semibold text-accent">{currentQ.prompt}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakJapanese(currentQ.questionText);
                        }}
                        className="p-1.5 rounded-xl bg-surface hover:bg-surface-2 text-appText-muted hover:text-accent transition-all"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="my-auto space-y-3">
                      {!isFlipped ? (
                        <>
                          <div className="text-4xl sm:text-5xl font-jp font-bold text-appText-bright">
                            {currentQ.questionText}
                          </div>
                          {currentQ.subText && (
                            <div className="text-sm font-jp text-amber-300">
                              {currentQ.subText}
                            </div>
                          )}
                          <div className="text-xs text-appText-muted pt-3">
                            Tap kartu atau tekan <kbd className="font-mono bg-surface-2 px-1.5 py-0.5 rounded text-[10px]">Spasi</kbd> untuk membalik
                          </div>
                        </>
                      ) : (
                        <div className="space-y-3 animate-in zoom-in-95 duration-200">
                          <div className="text-2xl sm:text-3xl font-bold text-appText-bright">
                            {currentQ.correctAnswer}
                          </div>
                          <div className="text-xs text-appText-muted bg-surface-2/60 p-3 rounded-2xl border border-accent/15 leading-relaxed">
                            {currentQ.explanation}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="text-[11px] text-appText-muted/50">
                      {isFlipped ? 'Pilih tingkat pengingatan di bawah' : 'Nugget Nihongo Flashcard'}
                    </div>
                  </div>

                  {/* FSRS Rating Buttons */}
                  {isFlipped ? (
                    <div className="grid grid-cols-4 gap-2 sm:gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
                      <button
                        onClick={() => handleFlashcardRate(1)}
                        className="py-3.5 sm:py-4 rounded-2xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 text-xs font-bold transition-all flex flex-col items-center gap-1 active:scale-95"
                      >
                        <span>Lupa</span>
                        <kbd className="text-[9px] opacity-60">1</kbd>
                      </button>
                      <button
                        onClick={() => handleFlashcardRate(2)}
                        className="py-3.5 sm:py-4 rounded-2xl bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/30 text-amber-300 text-xs font-bold transition-all flex flex-col items-center gap-1 active:scale-95"
                      >
                        <span>Ragu</span>
                        <kbd className="text-[9px] opacity-60">2</kbd>
                      </button>
                      <button
                        onClick={() => handleFlashcardRate(3)}
                        className="py-3.5 sm:py-4 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-all flex flex-col items-center gap-1 active:scale-95"
                      >
                        <span>Ingat</span>
                        <kbd className="text-[9px] opacity-60">3</kbd>
                      </button>
                      <button
                        onClick={() => handleFlashcardRate(4)}
                        className="py-3.5 sm:py-4 rounded-2xl bg-sky-950/40 hover:bg-sky-900/60 border border-sky-500/30 text-sky-300 text-xs font-bold transition-all flex flex-col items-center gap-1 active:scale-95"
                      >
                        <span>Mudah</span>
                        <kbd className="text-[9px] opacity-60">4</kbd>
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <button
                        onClick={toggleFlip}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-accent text-bg font-extrabold text-xs shadow-glow hover:bg-accent-hot transition-all active:scale-95"
                      >
                        Lihat Jawaban (Spasi)
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Modes: Multiple Choice, Conjugation, Fill-in, Translation, Error Find */}
              {activeMode !== 'flashcard' && activeMode !== 'listening' && activeMode !== 'rearrange' && (
                <div className="space-y-4">
                  {/* Question Card */}
                  <div className="bg-surface border-2 border-accent/25 rounded-3xl p-6 sm:p-8 space-y-3 shadow-lg relative">
                    <div className="text-xs font-bold text-accent">{currentQ.prompt}</div>
                    <div className="text-3xl sm:text-4xl font-jp font-bold text-appText-bright">
                      {currentQ.questionText}
                    </div>
                    {currentQ.subText && (
                      <div className="text-xs text-appText-muted">{currentQ.subText}</div>
                    )}
                    <button
                      onClick={() => speakJapanese(currentQ.questionText)}
                      className="absolute right-5 top-5 p-2 rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-muted hover:text-accent transition-all"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Options Grid */}
                  <div className="grid grid-cols-1 gap-2.5">
                    {currentQ.options?.map((opt, idx) => {
                      const isSelected = selectedOption === opt;
                      const isCorrect = opt.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();

                      let btnStyle = 'bg-surface-2 border-accent/20 text-appText-bright hover:border-accent/40';
                      if (feedback) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-300 font-bold';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-red-950/50 border-red-500 text-red-300 font-bold';
                        } else {
                          btnStyle = 'bg-surface-2/40 border-transparent text-appText-muted opacity-50';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(opt)}
                          disabled={!!feedback}
                          className={`w-full p-4 rounded-2xl border text-sm font-semibold text-left transition-all flex items-center justify-between ${btnStyle} active:scale-[0.99]`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-xl bg-surface border border-accent/15 flex items-center justify-center text-xs font-mono text-appText-muted shrink-0">
                              {idx + 1}
                            </span>
                            <span className="font-jp">{opt}</span>
                          </div>
                          {feedback && isCorrect && <Check className="w-4 h-4 text-emerald-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Mode: Rearrange (Sentence Builder) */}
              {activeMode === 'rearrange' && (
                <div className="space-y-4">
                  <div className="bg-surface border-2 border-accent/25 rounded-3xl p-6 space-y-2">
                    <div className="text-xs font-bold text-accent">{currentQ.prompt}</div>
                    <div className="text-lg font-bold text-appText-bright">"{currentQ.questionText}"</div>
                  </div>

                  {/* Assembled Sentence Box */}
                  <div className="min-h-[70px] bg-surface-2 border border-accent/30 rounded-2xl p-4 flex flex-wrap gap-2 items-center">
                    {assembledTokens.length === 0 ? (
                      <span className="text-xs text-appText-muted/60 italic">
                        Ketuk kata di bawah untuk mulai menyusun kalimat...
                      </span>
                    ) : (
                      assembledTokens.map((token, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleRemoveToken(token, idx)}
                          className="px-3.5 py-2 rounded-xl bg-amber-500 text-bg font-jp font-bold text-sm shadow-sm hover:opacity-90 transition-all active:scale-95"
                        >
                          {token}
                        </button>
                      ))
                    )}
                  </div>

                  {/* Available Token Chips */}
                  <div className="flex flex-wrap gap-2.5 p-2">
                    {availableTokens.map((token, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAddToken(token, idx)}
                        className="px-4 py-2.5 rounded-xl bg-surface border border-accent/25 hover:border-accent text-appText-bright font-jp font-bold text-sm hover:-translate-y-0.5 transition-all shadow-sm active:scale-95"
                      >
                        {token}
                      </button>
                    ))}
                  </div>

                  {/* Check Answer Button */}
                  {!feedback && (
                    <div className="text-center pt-2">
                      <button
                        onClick={handleCheckRearrange}
                        disabled={assembledTokens.length === 0}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-accent text-bg font-bold text-xs shadow-glow hover:bg-accent-hot transition-all disabled:opacity-50 active:scale-95"
                      >
                        Periksa Jawaban
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Rich Feedback Breakdown & Next Action Button */}
              {feedback && (
                <div className="space-y-3">
                  <div
                    className={`p-4 rounded-2xl border flex items-center justify-between gap-3 animate-in fade-in duration-200 ${
                      feedback.isCorrect
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                        : 'bg-red-950/40 border-red-500/40 text-red-300'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-semibold leading-relaxed">
                      {feedback.text}
                    </div>
                    <button
                      onClick={handleNextQuestion}
                      className="px-5 py-2.5 rounded-xl bg-accent text-bg font-extrabold text-xs flex items-center gap-1.5 shrink-0 hover:bg-accent-hot transition-all shadow-glow active:scale-95"
                    >
                      <span>Lanjut</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Pedagogical Particle & Sentence Structure Detail */}
                  <QuizExplanationDetail
                    rawExplanation={currentQ.explanation}
                    jpSentence={currentQ.targetItem?.examples?.[0]?.jp || (activeMode !== 'flashcard' ? currentQ.questionText : undefined)}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Quiz Session Configuration Modal */}
      <QuizConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        selectedCount={sessionCount}
        onSelectCount={setSessionCount}
        selectedLevel={selectedLevel}
        onSelectLevel={setSelectedLevel}
        selectedMode={activeMode}
        onSelectMode={setActiveMode}
        onStartSession={() => {
          setIsConfigOpen(false);
          startStandardSession(activeMode);
        }}
      />

      {/* Mid-Quiz Accidental Exit Guard Modal */}
      <QuizExitGuardModal
        isOpen={isExitGuardOpen}
        onStay={() => setIsExitGuardOpen(false)}
        onConfirmExit={handleConfirmExit}
      />
    </div>
  );
};
