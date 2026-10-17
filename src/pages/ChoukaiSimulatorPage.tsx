// ══════════════════════════════════════════════════════════════════
//  ChoukaiSimulatorPage.tsx — Official JFT-Basic CBT Exam Simulator
//  Research Basis: ADR-013, 38 Audio Tracks, 372 Illustrations, 163 Questions
// ══════════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import {
  Headphones,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Award,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import {
  CHOUKAI_QUESTION_SETS,
  ChoukaiQuestionSet,
  ChoukaiSection,
  ChoukaiQuestionItem,
  ChoukaiOptionItem,
} from '../lib/data/choukaiExamBank';
import { ChoukaiAudioPlayer } from '../components/audio/ChoukaiAudioPlayer';

export const ChoukaiSimulatorPage: React.FC = () => {
  const { setActiveTab } = useAppStore();

  const [activeSetId, setActiveSetId] = useState<number>(1);
  const [activeSectionId, setActiveSectionId] = useState<string>('listening');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const currentSet: ChoukaiQuestionSet =
    CHOUKAI_QUESTION_SETS.find((s) => s.id === activeSetId) || CHOUKAI_QUESTION_SETS[0];

  const currentSection: ChoukaiSection =
    currentSet.sections.find((sec) => sec.id === activeSectionId) || currentSet.sections[0];

  const questions: ChoukaiQuestionItem[] = currentSection.questions || [];
  const currentQ: ChoukaiQuestionItem | undefined = questions[currentQuestionIndex];

  const handleSelectSet = (id: number) => {
    setActiveSetId(id);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsSubmitted(false);
  };

  const handleSelectSection = (secId: string) => {
    setActiveSectionId(secId);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsSubmitted(false);
  };

  const handleChooseOption = (labelOrText: string) => {
    if (!currentQ || isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: labelOrText,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
  };

  // Score Calculation
  let correctCount = 0;
  questions.forEach((q) => {
    const chosen = userAnswers[q.id];
    if (chosen && chosen.toLowerCase() === q.answer.toLowerCase()) {
      correctCount++;
    }
  });
  const scorePercent = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-bg text-appText pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12 pt-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full overflow-x-hidden">
      {/* Top Navigation */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <button
          onClick={() => setActiveTab('materi')}
          className="min-h-[40px] px-3.5 py-2 rounded-xl bg-card border border-border text-xs sm:text-sm font-semibold hover:border-amber-500/50 active:scale-95 transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Materi</span>
        </button>

        <span className="text-[11px] font-mono font-medium text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30 flex items-center gap-1.5">
          <Headphones className="w-3.5 h-3.5" />
          <span>JFT-Basic CBT Simulator</span>
        </span>
      </div>

      {/* Set Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 mb-4">
        {CHOUKAI_QUESTION_SETS.map((set) => (
          <button
            key={set.id}
            onClick={() => handleSelectSet(set.id)}
            className={`min-h-[42px] px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all active:scale-95 shrink-0 ${
              activeSetId === set.id
                ? 'bg-amber-500 text-neutral-950 shadow-md'
                : 'bg-card border border-border text-muted hover:text-white'
            }`}
          >
            {set.title}
          </button>
        ))}
      </div>

      {/* Section Selector Pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-3 mb-6 border-b border-border">
        {currentSet.sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => handleSelectSection(sec.id)}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
              activeSectionId === sec.id
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-card/70 border border-border/80 text-muted hover:text-white'
            }`}
          >
            <span>{sec.icon || '📝'}</span>
            <span>{sec.name}</span>
            <span className="text-[10px] opacity-75 font-mono">({sec.questions.length})</span>
          </button>
        ))}
      </div>

      {/* Main Question Card or Completion View */}
      {isSubmitted ? (
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 text-center shadow-xl animate-fadeIn">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
            <Award className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white mb-1">Simulasi Selesai!</h2>
          <p className="text-sm text-muted mb-6">
            Hasil Penilaian CBT {currentSection.name} ({currentSet.title})
          </p>

          <div className="flex justify-center items-center gap-6 mb-8">
            <div className="p-4 rounded-2xl bg-neutral-900 border border-border min-w-[120px]">
              <div className="text-3xl font-black text-amber-400">{scorePercent}%</div>
              <div className="text-xs text-muted mt-1">Skor Akurasi</div>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-900 border border-border min-w-[120px]">
              <div className="text-3xl font-black text-emerald-400">
                {correctCount}/{questions.length}
              </div>
              <div className="text-xs text-muted mt-1">Jawaban Benar</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={handleReset}
              className="min-h-[44px] px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm active:scale-95 transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Simulasi Ini</span>
            </button>
          </div>
        </div>
      ) : currentQ ? (
        <div className="bg-card border border-border rounded-3xl p-5 sm:p-7 shadow-xl space-y-5">
          {/* Question Index & Header */}
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-border/70">
            <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-bold">
              <span>SOAL {currentQuestionIndex + 1}</span>
              <span className="text-muted">/ {questions.length}</span>
            </div>
            <div className="text-xs text-muted">
              {Object.keys(userAnswers).length} dari {questions.length} terjawab
            </div>
          </div>

          {/* Audio Player if present */}
          {currentSection.audioFiles && currentQ.audioIndex !== undefined && currentSection.audioFiles[currentQ.audioIndex] && (
            <div className="mb-4">
              <ChoukaiAudioPlayer audio={currentSection.audioFiles[currentQ.audioIndex]} />
            </div>
          )}

          {/* Prompt Image if present */}
          {currentQ.promptImage && (
            <div className="w-full flex justify-center bg-neutral-900/90 rounded-2xl p-3 border border-border">
              <img
                src={currentQ.promptImage}
                alt={`Prompt Soal ${currentQ.id}`}
                className="max-h-64 object-contain rounded-xl"
                loading="lazy"
              />
            </div>
          )}

          {/* Prompt Text if present */}
          {currentQ.promptText && (
            <div className="text-base sm:text-lg font-bold text-white break-words">
              {currentQ.promptText}
            </div>
          )}

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentQ.options.map((opt, idx) => {
              const isObj = typeof opt === 'object';
              const label = isObj ? (opt as ChoukaiOptionItem).label || String.fromCharCode(97 + idx) : String.fromCharCode(97 + idx);
              const text = isObj ? (opt as ChoukaiOptionItem).text : (opt as string);
              const img = isObj ? (opt as ChoukaiOptionItem).image : undefined;

              const isChosen = userAnswers[currentQ.id]?.toLowerCase() === label.toLowerCase();

              return (
                <button
                  key={idx}
                  onClick={() => handleChooseOption(label)}
                  className={`min-h-[50px] p-4 rounded-2xl border text-left transition-all active:scale-95 flex flex-col justify-center ${
                    isChosen
                      ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-md'
                      : 'bg-neutral-900/80 hover:bg-neutral-850 border-border text-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className="w-6 h-6 rounded-lg bg-neutral-800 text-xs font-mono font-bold flex items-center justify-center shrink-0 uppercase">
                      {label}
                    </span>
                    {text && <span className="text-sm font-medium break-words">{text}</span>}
                  </div>
                  {img && (
                    <div className="mt-2 w-full flex justify-center bg-neutral-950/60 p-2 rounded-xl">
                      <img src={img} alt={`Option ${label}`} className="max-h-28 object-contain rounded" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-border/60">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-750 disabled:opacity-40 text-xs sm:text-sm font-semibold transition-all active:scale-95 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={() => setIsSubmitted(true)}
                className="min-h-[44px] px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs sm:text-sm rounded-xl active:scale-95 transition-all shadow-md flex items-center gap-1.5"
              >
                <span>Selesaikan Simulasi</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="min-h-[44px] px-5 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm rounded-xl active:scale-95 transition-all shadow-md flex items-center gap-1.5"
              >
                <span>Berikutnya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-muted">Tidak ada soal pada seksi ini.</div>
      )}
    </div>
  );
};
