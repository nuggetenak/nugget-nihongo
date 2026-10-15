// ══════════════════════════════════════════════════════════════════
//  CatPlacementModal.tsx — Adaptive Diagnostic Placement Test (CAT)
//  Diagnoses JLPT level (N5–N1) in 10 questions using IRT Algorithm
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import {
  X,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpen,
  Zap,
  TrendingUp,
  Award,
} from 'lucide-react';
import {
  buildCATQuestionPool,
  selectNextCATQuestion,
  updateThetaEstimate,
  finalizeCATResult,
  CATQuestion,
  CATResult,
} from '../../lib/cat/catEngine';
import { useAppStore } from '../../store/useAppStore';
import { useCurriculumStore, TrackId } from '../../lib/curriculum/curriculumStore';
import { playSuccessSfx, playErrorSfx, playFanfareSfx } from '../../lib/audio/sfx';

interface CatPlacementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOTAL_QUESTIONS = 10;

export const CatPlacementModal: React.FC<CatPlacementModalProps> = ({ isOpen, onClose }) => {
  const { setSelectedLevel, setActiveTab, showToast } = useAppStore();
  const { setActiveTrack } = useCurriculumStore();

  const [isLoading, setIsLoading] = useState(true);
  const [questionPool, setQuestionPool] = useState<CATQuestion[]>([]);
  const [usedQuestionIds, setUsedQuestionIds] = useState<Set<string>>(new Set());
  const [currentTheta, setCurrentTheta] = useState<number>(0.0);
  const [currentQuestion, setCurrentQuestion] = useState<CATQuestion | null>(null);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [answeredHistory, setAnsweredHistory] = useState<
    Array<{ question: CATQuestion; isCorrect: boolean }>
  >([]);
  const [result, setResult] = useState<CATResult | null>(null);

  // Initialize and load question bank
  const startNewTest = async () => {
    setIsLoading(true);
    setResult(null);
    setAnsweredHistory([]);
    setQuestionIndex(0);
    setCurrentTheta(0.0);
    setSelectedOption(null);
    setIsAnswered(false);

    try {
      const pool = await buildCATQuestionPool();
      setQuestionPool(pool);
      const used = new Set<string>();
      const firstQ = selectNextCATQuestion(pool, used, 0.0);
      if (firstQ) {
        used.add(firstQ.id);
        setCurrentQuestion(firstQ);
        setUsedQuestionIds(used);
      }
    } catch (err) {
      console.error('[CatPlacementModal] Failed to load question bank', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      startNewTest();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectOption = (idx: number) => {
    if (isAnswered || !currentQuestion) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQuestion.correctIndex;
    if (isCorrect) {
      playSuccessSfx();
    } else {
      playErrorSfx();
    }

    const nextHistory = [...answeredHistory, { question: currentQuestion, isCorrect }];
    setAnsweredHistory(nextHistory);

    // Update theta
    const updatedTheta = updateThetaEstimate(
      currentTheta,
      isCorrect,
      currentQuestion.difficulty,
      questionIndex + 1,
      TOTAL_QUESTIONS
    );
    setCurrentTheta(updatedTheta);
  };

  const handleNextQuestion = () => {
    if (questionIndex + 1 >= TOTAL_QUESTIONS) {
      // Test finished, calculate final result
      playFanfareSfx();
      const finalRes = finalizeCATResult(answeredHistory, currentTheta);
      setResult(finalRes);
      return;
    }

    const nextIndex = questionIndex + 1;
    setQuestionIndex(nextIndex);
    setSelectedOption(null);
    setIsAnswered(false);

    const nextQ = selectNextCATQuestion(questionPool, usedQuestionIds, currentTheta);
    if (nextQ) {
      const updatedUsed = new Set(usedQuestionIds);
      updatedUsed.add(nextQ.id);
      setUsedQuestionIds(updatedUsed);
      setCurrentQuestion(nextQ);
    } else {
      // Fallback if pool exhausted
      playFanfareSfx();
      const finalRes = finalizeCATResult(answeredHistory, currentTheta);
      setResult(finalRes);
    }
  };

  const handleApplyResult = () => {
    if (!result) return;
    setSelectedLevel(result.estimatedLevel);
    setActiveTrack(result.recommendedTrack as TrackId);
    showToast(
      `Level disetel ke ${result.estimatedLevel.toUpperCase()} · Jalur ${result.recommendedTrack.toUpperCase()} aktif!`,
      '🎯'
    );
    setActiveTab('materi');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card / Bottom Sheet on Mobile */}
      <div className="relative w-full max-w-xl bg-surface border border-accent/25 rounded-3xl shadow-2xl z-10 max-h-[90dvh] sm:max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Mobile Drag Indicator */}
        <div className="flex sm:hidden justify-center pt-2.5 pb-1">
          <div className="w-12 h-1.5 rounded-full bg-accent/30" />
        </div>

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-accent/15 bg-surface-2/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-accent flex items-center justify-center shrink-0 border border-amber-500/30">
              <Target className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-extrabold text-appText-bright truncate">
                Tes Penempatan Mandiri (CAT)
              </h2>
              <div className="text-[11px] text-accent font-semibold truncate flex items-center gap-1.5">
                <span>Computer Adaptive Testing · 10 Soal</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-surface hover:bg-surface-3 text-appText-muted hover:text-appText-bright transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 min-w-0">
          {isLoading ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-10 h-10 border-3 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-appText-muted">Menyiapkan bank soal adaptif IRT...</p>
            </div>
          ) : result ? (
            /* Result Screen */
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="text-center space-y-2 py-2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/20 text-accent-hot border border-amber-500/40 shadow-glow mb-2">
                  <Award className="w-9 h-9" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-accent">
                  Hasil Diagnosis Kemampuan
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-appText-bright">
                  {result.levelName}
                </h3>
                <p className="text-xs sm:text-sm text-appText-muted max-w-md mx-auto leading-relaxed">
                  {result.summary}
                </p>
              </div>

              {/* Score Metric Cards */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="p-3 rounded-2xl bg-surface-2 border border-accent/15 text-center">
                  <div className="text-[10px] text-appText-muted uppercase font-bold">Akurasi</div>
                  <div className="text-base sm:text-lg font-black text-accent-hot font-mono">
                    {result.accuracy}%
                  </div>
                  <div className="text-[10px] text-appText-muted">
                    {result.correctCount}/{result.totalCount} Benar
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-surface-2 border border-accent/15 text-center">
                  <div className="text-[10px] text-appText-muted uppercase font-bold">Skor Kemampuan (θ)</div>
                  <div className="text-base sm:text-lg font-black text-blue-400 font-mono">
                    {result.theta > 0 ? `+${result.theta}` : result.theta}
                  </div>
                  <div className="text-[10px] text-appText-muted">Skala IRT 3PL</div>
                </div>

                <div className="p-3 rounded-2xl bg-surface-2 border border-accent/15 text-center">
                  <div className="text-[10px] text-appText-muted uppercase font-bold">Rekomendasi</div>
                  <div className="text-base sm:text-lg font-black text-emerald-400 font-mono uppercase">
                    {result.estimatedLevel}
                  </div>
                  <div className="text-[10px] text-appText-muted">Kurikulum</div>
                </div>
              </div>

              {/* Strengths & Focus Areas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 space-y-1">
                  <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Kekuatanmu:</span>
                  </div>
                  <p className="text-appText-muted text-[11px] leading-relaxed">
                    {result.strengths.join(', ')}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-1">
                  <div className="font-bold text-accent-hot flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Fokus Pembelajaran:</span>
                  </div>
                  <p className="text-appText-muted text-[11px] leading-relaxed">
                    {result.weaknesses.join(', ')}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={handleApplyResult}
                  className="w-full py-3 px-4 rounded-xl bg-accent hover:bg-accent-hot text-bg font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-glow active:scale-98 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 fill-bg" />
                  <span>Terapkan Level Ini & Mulai Belajar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={startNewTest}
                  className="w-full py-2.5 px-4 rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-muted hover:text-appText-bright font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ulangi Tes Penempatan</span>
                </button>
              </div>
            </div>
          ) : currentQuestion ? (
            /* Active Question Screen */
            <div className="space-y-4">
              {/* Progress Bar & Stage Indicator */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-accent font-bold">
                    Soal {questionIndex + 1} dari {TOTAL_QUESTIONS}
                  </span>
                  <span className="text-appText-muted font-mono text-[11px]">
                    Kalibrasi: Level {currentQuestion.level.toUpperCase()}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-3 overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{ width: `${((questionIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}
                  />
                </div>
              </div>

              {/* Prompt / Situation Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-surface-2 border border-accent/20 space-y-1.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-accent/80">
                  Terjemahkan atau Pilih Kalimat yang Benar:
                </div>
                <div className="text-base sm:text-lg font-bold text-appText-bright leading-relaxed">
                  "{currentQuestion.stimulus}"
                </div>
              </div>

              {/* 4 Shuffled Choices */}
              <div className="space-y-2">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQuestion.correctIndex;

                  let btnStyle = 'bg-surface-2 hover:bg-surface-3 border-accent/15 text-appText-bright';
                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-red-500/20 border-red-500/50 text-red-300';
                    } else {
                      btnStyle = 'bg-surface-2/40 border-accent/10 text-appText-muted opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 active:scale-98 ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-6 h-6 rounded-lg bg-surface-3/80 font-mono text-xs flex items-center justify-center shrink-0 border border-accent/10">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="font-jp truncate">{option}</span>
                      </div>

                      {isAnswered && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {isAnswered && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Diagnostic Feedback upon answering */}
              {isAnswered && (
                <div className="p-3.5 rounded-2xl bg-surface-2 border border-accent/20 space-y-2 animate-in fade-in duration-200">
                  <div className="text-xs text-appText-muted leading-relaxed">
                    <span className="font-bold text-accent">Penjelasan: </span>
                    {currentQuestion.explanation}
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    className="w-full py-2.5 px-4 rounded-xl bg-accent hover:bg-accent-hot text-bg font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-glow active:scale-98 cursor-pointer mt-2"
                  >
                    <span>
                      {questionIndex + 1 >= TOTAL_QUESTIONS ? 'Lihat Hasil Diagnosis' : 'Lanjut ke Soal Berikutnya'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
