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
import { IrasutoyaImage } from '../components/common/IrasutoyaImage';

export const ChoukaiSimulatorPage: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
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
          onClick={() => { if (onBack) onBack(); else setActiveTab('materi'); }}
          className="min-h-[40px] px-3.5 py-2 rounded-xl bg-surface border border-theme text-xs sm:text-sm font-semibold hover:border-amber-500/50 active:scale-95 transition-all flex items-center gap-2 text-appText-bright shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        <span className="text-xs font-mono font-medium text-accent-hot dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30 flex items-center gap-1.5 font-bold">
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
                ? 'bg-amber-500 text-bg shadow-md'
                : 'bg-surface border border-theme text-appText-muted hover:text-appText-bright'
            }`}
          >
            {set.title}
          </button>
        ))}
      </div>

      {/* Section Selector Pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-3 mb-6 border-b border-theme">
        {currentSet.sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => handleSelectSection(sec.id)}
            className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 active:scale-95 ${
              activeSectionId === sec.id
                ? 'bg-amber-500/20 text-amber-950 dark:text-amber-300 border border-amber-500/40 font-bold'
                : 'bg-surface/70 border border-theme/80 text-appText-muted hover:text-appText-bright'
            }`}
          >
            <span>{sec.icon || '📝'}</span>
            <span>{sec.name}</span>
            <span className="text-xs opacity-75 font-mono">({sec.questions.length})</span>
          </button>
        ))}
      </div>

      {/* Main Question Card or Completion View */}
      {isSubmitted ? (
        <div className="bg-surface border border-theme rounded-3xl p-6 sm:p-10 text-center shadow-xl animate-fadeIn space-y-6 card-interactive-lift">
          <div className="w-20 h-20 mx-auto mb-2 flex items-center justify-center">
            {scorePercent >= 80 ? (
              <IrasutoyaImage
                assetId="celebration_kusudama"
                className="w-20 h-20"
                containerClassName="w-20 h-20"
                animatePop
              />
            ) : scorePercent >= 50 ? (
              <IrasutoyaImage
                assetId="sensei_praise"
                className="w-20 h-20"
                containerClassName="w-20 h-20"
                animatePop
              />
            ) : (
              <IrasutoyaImage
                assetId="daruma_recovery"
                className="w-20 h-20"
                containerClassName="w-20 h-20"
                animateFloat
              />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-black text-appText-bright mb-1">Simulasi Selesai!</h2>
            <p className="text-sm text-appText-muted">
              Hasil Penilaian CBT {currentSection.name} ({currentSet.title})
            </p>
          </div>

          <div className="flex justify-center items-center gap-4 sm:gap-6">
            <div className="card-interactive-lift p-4 rounded-2xl bg-surface-2 border border-theme min-w-[120px]">
              <div className="text-3xl font-black text-accent font-mono">{scorePercent}%</div>
              <div className="text-xs text-appText-muted mt-1 font-semibold">Skor Akurasi</div>
            </div>
            <div className="card-interactive-lift p-4 rounded-2xl bg-surface-2 border border-theme min-w-[120px]">
              <div className="text-3xl font-black text-emerald-700 dark:text-emerald-400 font-mono">
                {correctCount}/{questions.length}
              </div>
              <div className="text-xs text-appText-muted mt-1 font-semibold">Jawaban Benar</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={handleReset}
              className="min-h-[44px] px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-bg font-bold text-sm active:scale-95 transition-all flex items-center gap-2 shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Simulasi Ini</span>
            </button>
          </div>

          {/* Detailed Question Review List (Ticket T-53) */}
          <div className="mt-8 text-left space-y-4 border-t border-theme/60 pt-6">
            <h3 className="text-base sm:text-lg font-bold text-appText-bright">
              Pembahasan &amp; Kunci Jawaban Resmi ({questions.length} Soal)
            </h3>
            <div className="space-y-3">
              {questions.map((q, idx) => {
                const userAns = userAnswers[q.id];
                const isCorrect = userAns && userAns.toLowerCase() === q.answer.toLowerCase();
                return (
                  <div key={q.id} className="card-interactive-lift p-4 rounded-2xl bg-surface-2 border border-theme space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold text-appText-muted">
                        Soal #{idx + 1}
                      </span>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        isCorrect ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 font-bold' : 'bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-500/30 font-bold'
                      }`}>
                        {isCorrect ? '✓ Benar' : '✗ Salah'}
                      </span>
                    </div>
                    {q.promptText && (
                      <p className="text-sm font-semibold text-appText-bright">{q.promptText}</p>
                    )}
                    <div className="text-xs space-y-1 pt-1 border-t border-theme/40 text-appText-muted">
                      <div>Jawaban Kamu: <span className="font-bold text-appText-bright">{userAns || 'Tidak dijawab'}</span></div>
                      <div>Kunci Benar: <span className="font-bold text-emerald-700 dark:text-emerald-400">{q.answer}</span></div>
                      {q.explanation && (
                        <div className="text-xs text-appText-muted pt-1 italic">{q.explanation}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : currentQ ? (
        <div className="bg-surface border border-theme rounded-3xl p-5 sm:p-7 shadow-xl space-y-5">
          {/* Question Index & Header */}
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-theme/70">
            <div className="flex items-center gap-2 font-mono text-xs text-accent-hot dark:text-amber-400 font-bold">
              <span>SOAL {currentQuestionIndex + 1}</span>
              <span className="text-appText-muted">/ {questions.length}</span>
            </div>
            <div className="text-xs text-appText-muted">
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
            <div className="w-full flex justify-center bg-surface-2 rounded-2xl p-3 border border-theme">
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
            <div className="text-base sm:text-lg font-bold text-appText-bright break-words">
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
                  className={`card-interactive-lift min-h-[50px] p-4 rounded-2xl border text-left transition-all active:scale-95 flex flex-col justify-center ${
                    isChosen
                      ? 'bg-amber-500/20 border-amber-500 text-amber-950 dark:text-amber-300 shadow-md font-bold'
                      : 'bg-surface-2 hover:bg-surface-3 border-theme text-appText'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className="w-6 h-6 rounded-lg bg-surface-3 text-xs font-mono font-bold flex items-center justify-center shrink-0 uppercase text-appText-bright border border-theme">
                      {label}
                    </span>
                    {text && <span className="text-sm font-medium break-words">{text}</span>}
                  </div>
                  {img && (
                    <div className="mt-2 w-full flex justify-center bg-surface/60 p-2 rounded-xl border border-theme">
                      <img src={img} alt={`Option ${label}`} className="max-h-28 object-contain rounded" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-theme/60">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-theme disabled:opacity-40 text-xs sm:text-sm font-semibold transition-all active:scale-95 flex items-center gap-1.5 text-appText-bright"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={() => setIsSubmitted(true)}
                className="min-h-[44px] px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-bg font-bold text-xs sm:text-sm rounded-xl active:scale-95 transition-all shadow-md flex items-center gap-1.5"
              >
                <span>Selesaikan Simulasi</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="min-h-[44px] px-5 py-2 bg-amber-500 hover:bg-amber-400 text-bg font-bold text-xs sm:text-sm rounded-xl active:scale-95 transition-all shadow-md flex items-center gap-1.5"
              >
                <span>Berikutnya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-appText-muted">Tidak ada soal pada seksi ini.</div>
      )}
    </div>
  );
};
