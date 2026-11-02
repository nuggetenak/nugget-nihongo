// ══════════════════════════════════════════════════════════════════
//  CbtRunnerScreen.tsx — Distraction-Free CBT Interactive Test Runner
//  Research Basis: ADR-014, Strict Exam (15m) & Guided Scaffolding Engine
//  15-Question Review Drawer, ADHD Smart Pause, Real-Time Local Sync
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import {
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Award,
  Zap,
  Check,
  X,
  ListOrdered,
  AlertTriangle,
} from 'lucide-react';
import { useExerciseStore } from '../../store/useExerciseStore';
import { useAppStore } from '../../store/useAppStore';
import { StarScrambleWidget } from './StarScrambleWidget';
import { DokkaiSheet } from './DokkaiSheet';
import { ChoukaiPlayer } from './ChoukaiPlayer';
import { FiveLayerExplanationSheet } from './FiveLayerExplanationSheet';
import { playSuccessSfx, playErrorSfx, playFanfareSfx } from '../../lib/audio/sfx';
import { fireConfetti } from '../../lib/ui/confetti';

interface CbtRunnerScreenProps {
  onExit: () => void;
}

export const CbtRunnerScreen: React.FC<CbtRunnerScreenProps> = ({ onExit }) => {
  const {
    currentSet,
    mode,
    currentIndex,
    userAnswers,
    flaggedIndices,
    remainingSeconds,
    isPaused,
    audioReplays,
    starScrambleStates,
    isSubmitted,
    sessionSummary,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    selectOption,
    toggleFlag,
    consumeAudioReplay,
    updateStarScramble,
    tickTimer,
    togglePause,
    submitTest,
    exitSession,
  } = useExerciseStore();

  const { incrementXp } = useAppStore();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isExitGuardOpen, setIsExitGuardOpen] = useState(false);
  const [resultFilter, setResultFilter] = useState<'all' | 'wrong' | 'correct'>('all');

  // Timer Interval Effect
  useEffect(() => {
    if (isSubmitted || isPaused) return;

    const timer = setInterval(() => {
      tickTimer();
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, isPaused, tickTimer]);

  // Audio & Confetti on Submission
  useEffect(() => {
    if (isSubmitted && sessionSummary) {
      if (sessionSummary.isPassed) {
        playFanfareSfx();
        fireConfetti();
        incrementXp(sessionSummary.correctCount * 15);
      } else {
        playErrorSfx();
        incrementXp(sessionSummary.correctCount * 5);
      }
    }
  }, [isSubmitted]);

  if (!currentSet) return null;

  const currentItem = currentSet.items[currentIndex];
  const totalQuestions = currentSet.items.length;
  const answeredCount = Object.keys(userAnswers).length;
  const optionLetters = ['A', 'B', 'C', 'D'];

  // Format Timer mm:ss
  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const isStrict = mode === 'strict';
  const isTimeUrgent = isStrict && remainingSeconds <= 180; // <= 3 minutes
  const isTimeCritical = isStrict && remainingSeconds <= 60; // <= 1 minute

  // Option selection handler with instant feedback sound in Guided mode
  const handleOptionClick = (optIdx: number) => {
    if (isSubmitted) return;
    selectOption(currentIndex, optIdx);

    if (mode === 'guided') {
      if (optIdx === currentItem.correctOptionIndex) {
        playSuccessSfx();
      } else {
        playErrorSfx();
      }
    }
  };

  const handleConfirmExit = () => {
    setIsExitGuardOpen(false);
    exitSession();
    onExit();
  };

  // ══════════════════════════════════════════════════════════════════
  //  VIEW A: POST-SUBMISSION EVALUATION & RESULTS SCREEN
  // ══════════════════════════════════════════════════════════════════
  if (isSubmitted && sessionSummary) {
    const displayItems = currentSet.items.filter((item, idx) => {
      const isCorrect = userAnswers[idx] === item.correctOptionIndex;
      if (resultFilter === 'correct') return isCorrect;
      if (resultFilter === 'wrong') return !isCorrect;
      return true;
    });

    return (
      <div className="fixed inset-0 z-[9999] bg-bg overflow-y-auto pb-16 animate-in fade-in">
        {/* Sticky Result Top Bar */}
        <div className="sticky top-0 z-30 bg-surface/95 backdrop-blur-md border-b border-theme px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-extrabold text-appText-bright truncate">
                Rapor Hasil: {currentSet.title}
              </h2>
              <span className="text-xs text-appText-muted font-mono">
                {sessionSummary.mode === 'strict' ? 'Simulasi Resmi 15 Menit' : 'Latihan Terbimbing'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleConfirmExit}
            className="min-h-[40px] px-4 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-theme text-xs font-bold text-appText-bright transition-all active:scale-95 shadow-sm"
          >
            Kembali ke Portal
          </button>
        </div>

        <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
          {/* Hero Score Card */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border-2 text-center space-y-4 shadow-xl relative overflow-hidden ${
              sessionSummary.isPassed
                ? 'bg-gradient-to-br from-emerald-500/20 via-surface to-surface-2 border-emerald-500/50'
                : 'bg-gradient-to-br from-amber-500/20 via-surface to-surface-2 border-amber-500/50'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border shadow-sm mx-auto">
              {sessionSummary.isPassed ? (
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> LULUS AMBANG BATAS (合格)
                </span>
              ) : (
                <span className="text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> PERLU REMEDIAL (要復習)
                </span>
              )}
            </div>

            {/* Score Numerical */}
            <div className="space-y-1">
              <div className="text-5xl sm:text-7xl font-black font-mono tracking-tight text-appText-bright">
                {sessionSummary.correctCount}{' '}
                <span className="text-2xl sm:text-3xl text-appText-muted">/ {sessionSummary.totalQuestions}</span>
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono text-emerald-400">
                Akurasi: {sessionSummary.percentage}%
              </div>
            </div>

            <p className="text-xs sm:text-sm text-appText-muted max-w-lg mx-auto leading-relaxed">
              {sessionSummary.isPassed
                ? 'Luar biasa! Skor kamu melampaui standar kelulusan resmi. Pertahankan pemahaman dan kunci hafalan ke FSRS.'
                : 'Jangan berkecil hati! Pelajari bedah distraktor dan preskripsi remedial di bawah ini untuk memperkuat kelemahanmu.'}
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 max-w-xl mx-auto text-xs">
              <div className="p-2.5 rounded-xl bg-surface/60 border border-theme">
                <span className="text-appText-muted">Benar</span>
                <div className="text-base font-bold text-emerald-400 font-mono">
                  {sessionSummary.correctCount} Soal
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-surface/60 border border-theme">
                <span className="text-appText-muted">Salah</span>
                <div className="text-base font-bold text-rose-400 font-mono">
                  {sessionSummary.wrongItemIds.length} Soal
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-surface/60 border border-theme">
                <span className="text-appText-muted">Waktu Tempuh</span>
                <div className="text-base font-bold text-appText-bright font-mono">
                  {formatTimer(sessionSummary.timeSpentSeconds)}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-surface/60 border border-theme">
                <span className="text-appText-muted">Bonus XP</span>
                <div className="text-base font-bold text-amber-400 font-mono">
                  +{sessionSummary.correctCount * 15} XP
                </div>
              </div>
            </div>
          </div>

          {/* Section: Comprehensive 5-Layer Question-by-Question Review */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-theme pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-black text-appText-bright">
                  Pembahasan Detail 5 Lapis (Semua Soal)
                </h3>
                <p className="text-xs text-appText-muted">
                  Justifikasi, Bedah Distraktor, Mnemonik Sensei, dan Rujukan MateriHub
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 bg-surface-2 p-1 rounded-xl border border-theme">
                <button
                  type="button"
                  onClick={() => setResultFilter('all')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    resultFilter === 'all'
                      ? 'bg-amber-500 text-stone-950 font-black'
                      : 'text-appText-muted hover:text-appText-bright'
                  }`}
                >
                  Semua ({totalQuestions})
                </button>
                <button
                  type="button"
                  onClick={() => setResultFilter('wrong')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    resultFilter === 'wrong'
                      ? 'bg-rose-500 text-white font-black'
                      : 'text-appText-muted hover:text-appText-bright'
                  }`}
                >
                  Salah ({sessionSummary.wrongItemIds.length})
                </button>
                <button
                  type="button"
                  onClick={() => setResultFilter('correct')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    resultFilter === 'correct'
                      ? 'bg-emerald-500 text-stone-950 font-black'
                      : 'text-appText-muted hover:text-appText-bright'
                  }`}
                >
                  Benar ({sessionSummary.correctCount})
                </button>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {displayItems.map((item) => {
                const itemIdx = currentSet.items.findIndex((q) => q.id === item.id);
                const userAns = userAnswers[itemIdx];
                const isCorrect = userAns === item.correctOptionIndex;

                return (
                  <div
                    key={item.id}
                    className="bg-surface border border-theme rounded-3xl p-5 sm:p-7 space-y-4 shadow-sm"
                  >
                    {/* Item Header */}
                    <div className="flex items-center justify-between gap-2 border-b border-theme/60 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-surface-2 border border-theme text-xs font-black flex items-center justify-center font-mono">
                          {itemIdx + 1}
                        </span>
                        <span className="text-xs font-bold text-appText-muted">
                          {item.instructionId}
                        </span>
                      </div>

                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                          isCorrect
                            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                            : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                        }`}
                      >
                        {isCorrect ? '✓ Benar' : '✗ Salah'}
                      </span>
                    </div>

                    {/* Question Prompt */}
                    <div className="text-base sm:text-lg font-bold font-japanese text-appText-bright leading-relaxed">
                      {item.prompt}
                    </div>

                    {/* 5-Layer Deep-Dive Explanation */}
                    <FiveLayerExplanationSheet item={item} userAnswerIndex={userAns} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════
  //  VIEW B: ACTIVE IN-FLIGHT TEST SCREEN
  // ══════════════════════════════════════════════════════════════════
  const userSelectedOption = userAnswers[currentIndex];
  const isCurrentFlagged = flaggedIndices.includes(currentIndex);
  const currentStarState = starScrambleStates[currentIndex] || {
    availableTokens: currentItem.starScramble?.tokens || [],
    slottedTokens: [null, null, null, null],
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between overflow-hidden">
      {/* ── TOP EXECUTIVE BAR ──────────────────────────────────────── */}
      <div className="bg-surface/95 backdrop-blur-md border-b border-theme px-3.5 sm:px-6 py-2.5 flex items-center justify-between gap-3 shrink-0">
        {/* Left: Exit Trigger */}
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={() => setIsExitGuardOpen(true)}
            className="min-h-[40px] px-3 rounded-xl bg-surface-2 hover:bg-surface-3 border border-theme text-xs font-bold text-appText-muted hover:text-appText-bright flex items-center gap-1.5 transition-all active:scale-95 shrink-0"
            title="Keluar dari sesi"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Keluar</span>
          </button>

          <div className="min-w-0 hidden md:block">
            <h2 className="text-xs font-black uppercase tracking-wider text-amber-400 truncate">
              {currentSet.title}
            </h2>
            <p className="text-xs text-appText-muted truncate">
              Soal {currentIndex + 1} dari {totalQuestions}
            </p>
          </div>
        </div>

        {/* Center: Progress Ticks */}
        <div className="flex items-center gap-1 max-w-xs sm:max-w-md w-full justify-center">
          {currentSet.items.map((_, qIdx) => {
            const isAnswered = userAnswers[qIdx] !== undefined;
            const isFlagged = flaggedIndices.includes(qIdx);
            const isCurrent = qIdx === currentIndex;

            return (
              <button
                key={qIdx}
                type="button"
                onClick={() => goToQuestion(qIdx)}
                className={`h-2 sm:h-2.5 rounded-full transition-all flex-1 ${
                  isCurrent
                    ? 'ring-2 ring-amber-400 bg-amber-400 scale-y-125'
                    : isFlagged
                    ? 'bg-amber-400'
                    : isAnswered
                    ? 'bg-emerald-400'
                    : 'bg-surface-3'
                }`}
                title={`Soal ${qIdx + 1}${isAnswered ? ' (Terjawab)' : ''}${
                  isFlagged ? ' (Ragu-ragu)' : ''
                }`}
              />
            );
          })}
        </div>

        {/* Right: Timer & Drawer Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Timer Display */}
          <div
            className={`min-h-[40px] px-3 rounded-xl font-mono text-xs sm:text-sm font-black flex items-center gap-1.5 border transition-all ${
              isTimeCritical
                ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'
                : isTimeUrgent
                ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                : 'bg-surface-2 border-theme text-appText-bright'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTimer(remainingSeconds)}</span>
          </div>

          {/* Pause Button */}
          <button
            type="button"
            onClick={togglePause}
            className="w-10 h-10 rounded-xl bg-surface-2 hover:bg-surface-3 border border-theme flex items-center justify-center text-appText-bright transition-all active:scale-95"
            title={isPaused ? 'Lanjutkan latihan' : 'Jeda latihan'}
          >
            {isPaused ? <Play className="w-4 h-4 fill-appText-bright" /> : <Pause className="w-4 h-4" />}
          </button>

          {/* Review Drawer Button */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="min-h-[40px] px-3 rounded-xl bg-surface-2 hover:bg-surface-3 border border-theme text-xs font-bold text-appText-bright flex items-center gap-1.5 transition-all active:scale-95"
            title="Buka laci nomor soal"
          >
            <ListOrdered className="w-4 h-4 text-accent" />
            <span className="hidden sm:inline">
              {answeredCount}/{totalQuestions}
            </span>
          </button>
        </div>
      </div>

      {/* ── PAUSE OVERLAY (ADHD SMART PAUSE) ───────────────────────── */}
      {isPaused && (
        <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="max-w-md w-full bg-surface border border-theme rounded-3xl p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
              <Pause className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-appText-bright">Sesi Latihan Dijeda</h3>
            <p className="text-xs text-appText-muted leading-relaxed">
              Tiruan layar buram diaktifkan untuk menjaga integritas ujian. Istirahatkan matamu sejenak lalu
              lanjutkan kembali saat siap.
            </p>
            <button
              type="button"
              onClick={togglePause}
              className="min-h-[44px] w-full px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm flex items-center justify-center gap-2 transition-all shadow-glow active:scale-95"
            >
              <Play className="w-4 h-4 fill-stone-950" />
              <span>Lanjutkan Latihan</span>
            </button>
          </div>
        </div>
      )}

      {/* ── QUESTION BODY (SCROLLABLE) ──────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-5 max-w-4xl w-full mx-auto">
        {/* Question Header & Instructions */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400">
              Soal {currentIndex + 1} dari {totalQuestions} · {currentItem.mondaiType}
            </span>

            <button
              type="button"
              onClick={() => toggleFlag(currentIndex)}
              className={`min-h-[36px] px-3 py-1 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
                isCurrentFlagged
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-surface-2 border-theme text-appText-muted hover:text-appText-bright'
              }`}
            >
              <Flag className={`w-3.5 h-3.5 ${isCurrentFlagged ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{isCurrentFlagged ? 'Ditandai Ragu' : 'Tandai Ragu'}</span>
            </button>
          </div>

          <div className="text-xs sm:text-sm font-japanese text-appText-muted font-medium">
            {currentItem.instructionJp}
          </div>
          <div className="text-xs text-appText-dim">{currentItem.instructionId}</div>
        </div>

        {/* Specialized Stimulus Widgets */}
        {currentItem.readingPassage && (
          <DokkaiSheet passage={currentItem.readingPassage} />
        )}

        {currentItem.choukai && (
          <ChoukaiPlayer
            choukai={currentItem.choukai}
            questionIndex={currentIndex}
            mode={mode}
            playsCount={audioReplays[currentIndex] || 0}
            onPlay={() => consumeAudioReplay(currentIndex)}
            isSubmitted={isSubmitted}
          />
        )}

        {/* SSW Illustration diagram if present */}
        {currentItem.sswIllustrationUrl && (
          <div className="rounded-2xl overflow-hidden border border-theme bg-black/30 p-2 text-center">
            <img
              src={currentItem.sswIllustrationUrl}
              alt="Diagram K3 SSW"
              className="max-h-60 mx-auto object-contain rounded-xl"
              loading="lazy"
            />
          </div>
        )}

        {/* Star Scramble Interactive Widget */}
        {currentItem.starScramble ? (
          <StarScrambleWidget
            item={currentItem}
            questionIndex={currentIndex}
            availableTokens={currentStarState.availableTokens}
            slottedTokens={currentStarState.slottedTokens}
            onTokenChange={(avail, slots) => updateStarScramble(currentIndex, avail, slots)}
            selectedOptionIndex={userSelectedOption}
            onSelectOption={(optIdx) => handleOptionClick(optIdx)}
            isSubmitted={isSubmitted}
          />
        ) : (
          /* Standard Multiple Choice Question Card */
          <div className="bg-surface border border-theme rounded-3xl p-5 sm:p-7 space-y-6 shadow-sm">
            {/* Prompt */}
            <div className="text-lg sm:text-2xl font-bold font-japanese text-appText-bright leading-relaxed sm:leading-loose">
              {currentItem.prompt}
            </div>

            {/* 4 Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentItem.options.map((option, optIdx) => {
                const isSelected = userSelectedOption === optIdx;
                const letter = optionLetters[optIdx] || `${optIdx + 1}`;

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleOptionClick(optIdx)}
                    className={`min-h-[56px] px-4 py-3.5 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all flex items-center justify-between gap-3 active:scale-[0.98] ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-400 text-amber-300 shadow-sm'
                        : 'bg-surface-2 hover:bg-surface-3 border-theme text-appText-bright'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-amber-500 text-stone-950 font-black'
                            : 'bg-surface text-appText-muted border border-theme'
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="font-japanese leading-snug break-words">{option}</span>
                    </div>

                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Guided Practice: Immediate 5-Layer Explanation */}
        {mode === 'guided' && userSelectedOption !== undefined && (
          <FiveLayerExplanationSheet item={currentItem} userAnswerIndex={userSelectedOption} />
        )}
      </div>

      {/* ── BOTTOM CONTROL ROW ─────────────────────────────────────── */}
      <div className="bg-surface/95 backdrop-blur-md border-t border-theme px-4 sm:px-6 py-3 flex items-center justify-between gap-3 shrink-0">
        <button
          type="button"
          onClick={prevQuestion}
          disabled={currentIndex === 0}
          className="min-h-[44px] px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-theme text-xs font-bold text-appText-bright flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Sebelumnya</span>
        </button>

        <div className="flex items-center gap-2">
          {currentIndex === totalQuestions - 1 ? (
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="min-h-[44px] px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-glow active:scale-95"
            >
              <span>Kumpulkan Ujian</span>
              <Check className="w-4 h-4 stroke-[3]" />
            </button>
          ) : (
            <button
              type="button"
              onClick={nextQuestion}
              className="min-h-[44px] px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-glow active:scale-95"
            >
              <span>Lanjut</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          )}
        </div>
      </div>

      {/* ── 15-QUESTION REVIEW DRAWER MODAL ────────────────────────── */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div
            className="w-full max-w-lg bg-surface border border-theme rounded-3xl p-5 sm:p-7 space-y-5 shadow-2xl relative"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between gap-3 border-b border-theme pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-black text-appText-bright">
                  Navigasi 15 Nomor Soal
                </h3>
                <p className="text-xs text-appText-muted">
                  Terjawab: {answeredCount} dari {totalQuestions} Soal
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="w-9 h-9 rounded-xl bg-surface-2 hover:bg-surface-3 border border-theme flex items-center justify-center text-appText-muted hover:text-appText-bright"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid 15 Numbers */}
            <div className="grid grid-cols-5 gap-2.5">
              {currentSet.items.map((_, qIdx) => {
                const isAnswered = userAnswers[qIdx] !== undefined;
                const isFlagged = flaggedIndices.includes(qIdx);
                const isCurrent = qIdx === currentIndex;

                return (
                  <button
                    key={qIdx}
                    type="button"
                    onClick={() => {
                      goToQuestion(qIdx);
                      setIsDrawerOpen(false);
                    }}
                    className={`min-h-[46px] rounded-xl font-mono text-xs font-black transition-all border flex flex-col items-center justify-center relative active:scale-95 ${
                      isCurrent
                        ? 'border-amber-400 ring-2 ring-amber-400/50 bg-amber-500/20 text-amber-300'
                        : isFlagged
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                        : isAnswered
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300'
                        : 'bg-surface-2 border-theme text-appText-muted hover:text-appText-bright'
                    }`}
                  >
                    <span>{qIdx + 1}</span>
                    {isFlagged && <span className="text-xs absolute top-1 right-1">🚩</span>}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 text-xs text-appText-muted pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span>Terjawab</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span>Ragu-ragu</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-surface-3 border border-theme" />
                <span>Kosong</span>
              </span>
            </div>

            {/* Submit Action */}
            <div className="pt-2 border-t border-theme flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-theme text-xs font-bold text-appText-bright"
              >
                Lanjut Mengerjakan
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsDrawerOpen(false);
                  submitTest();
                }}
                className="min-h-[44px] px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-glow active:scale-95"
              >
                <span>Kumpulkan Jawaban</span>
                <Check className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── EXIT GUARD CONFIRMATION MODAL ──────────────────────────── */}
      {isExitGuardOpen && (
        <div className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div
            className="w-full max-w-md bg-surface border border-theme rounded-3xl p-6 space-y-4 shadow-2xl text-center"
            role="dialog"
            aria-modal="true"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-base sm:text-lg font-black text-appText-bright">
              Yakin Ingin Keluar dari Ujian?
            </h3>

            <p className="text-xs text-appText-muted leading-relaxed">
              Jawaban dan sisa waktumu telah disimpan otomatis di browser (IndexedDB). Kamu dapat melanjutkan
              kapan saja dari Portal Ujian.
            </p>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsExitGuardOpen(false)}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-theme text-xs font-bold text-appText-bright active:scale-95"
              >
                Tetap Mengerjakan
              </button>
              <button
                type="button"
                onClick={handleConfirmExit}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-black text-xs flex items-center gap-1.5 active:scale-95"
              >
                <span>Keluar & Simpan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
