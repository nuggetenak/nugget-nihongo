// ══════════════════════════════════════════════════════════════════
//  AuthenticDrillModal.tsx — Interactive Player for Authentic Textbook Drills
//  Faithfully executes Minna Renshuu B/C, Soumatome Star Order ★,
//  SKM Nuance Contrast, Genki Cue Substitution, & Quartet Roleplay
// ══════════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Volume2,
  Award,
  Zap,
} from 'lucide-react';
import { AuthenticDrillItem } from '../../lib/data/authenticExerciseManager';
import { speakJapanese } from '../../lib/audio/tts';
import { playSuccessSfx, playErrorSfx, playFanfareSfx } from '../../lib/audio/sfx';
import { useAppStore } from '../../store/useAppStore';

interface AuthenticDrillModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookTitle: string;
  chapterTitle: string;
  drills: AuthenticDrillItem[];
}

export const AuthenticDrillModal: React.FC<AuthenticDrillModalProps> = ({
  isOpen,
  onClose,
  bookTitle,
  chapterTitle,
  drills,
}) => {
  const { incrementXp, showToast } = useAppStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen || drills.length === 0) return null;

  const currentDrill = drills[currentIndex];

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option === currentDrill.correct_answer;
    if (isCorrect) {
      playSuccessSfx();
      setScore((s) => s + 1);
      incrementXp(15);
    } else {
      playErrorSfx();
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= drills.length) {
      playFanfareSfx();
      setIsFinished(true);
      showToast(`Latihan selesai! +${(score + (selectedOption === currentDrill?.correct_answer ? 1 : 0)) * 15} XP`, '🎉');
      return;
    }

    setCurrentIndex((i) => i + 1);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
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
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xs sm:text-sm font-extrabold text-appText-bright truncate">
                {bookTitle}
              </h2>
              <div className="text-[11px] text-accent font-semibold truncate">
                {chapterTitle}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-surface hover:bg-surface-3 text-appText-muted hover:text-appText-bright transition-colors"
            title="Tutup"
            aria-label="Tutup modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 min-w-0">
          {isFinished ? (
            /* Results Screen */
            <div className="text-center py-6 space-y-4 animate-in fade-in duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/20 text-accent-hot border border-amber-500/40 shadow-glow mb-1">
                <Award className="w-9 h-9" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-accent">
                Latihan Otentik Selesai
              </div>
              <h3 className="text-2xl font-black text-appText-bright">
                Skor: {score} / {drills.length}
              </h3>
              <p className="text-xs sm:text-sm text-appText-muted max-w-sm mx-auto leading-relaxed">
                Anda telah menyelesaikan seluruh variasi latihan otentik bab ini sesuai standar silabus resmi.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-2 max-w-xs mx-auto">
                <button
                  onClick={handleRestart}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-appText-bright font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ulangi Latihan</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-accent hover:bg-accent-hot text-bg font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-glow"
                >
                  <span>Selesai</span>
                </button>
              </div>
            </div>
          ) : currentDrill ? (
            /* Active Drill Screen */
            <div className="space-y-4">
              {/* Stage Progress & Mechanic Badge */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-accent font-bold">
                    Drill {currentIndex + 1} dari {drills.length}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-accent-hot border border-amber-500/25 uppercase">
                    {currentDrill.mechanic.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-3 overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / drills.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Drill Title & Instruction */}
              <div className="space-y-1">
                <div className="text-sm font-extrabold text-appText-bright">
                  {currentDrill.title}
                </div>
                <p className="text-xs text-appText-muted leading-relaxed">
                  {currentDrill.instruction}
                </p>
              </div>

              {/* Cue Tokens (e.g. Renshuu B keywords) */}
              {currentDrill.cue_tokens && currentDrill.cue_tokens.length > 0 && (
                <div className="p-3 rounded-xl bg-surface-2 border border-accent/15 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase text-accent/80">Isyarat Kata:</span>
                  {currentDrill.cue_tokens.map((token, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-jp font-bold px-2 py-0.5 rounded-md bg-surface-3 text-appText-bright border border-accent/15"
                    >
                      {token}
                    </span>
                  ))}
                </div>
              )}

              {/* Dialogue Prompt (e.g. Renshuu C roleplay) */}
              {currentDrill.dialogue_prompt && (
                <div className="p-3.5 rounded-2xl bg-surface-2 border border-accent/20 space-y-2">
                  <div className="text-xs font-jp font-bold text-appText-bright">
                    {currentDrill.dialogue_prompt.speaker_a}
                  </div>
                  <div className="text-xs font-jp text-accent-hot border-l-2 border-accent pl-2.5">
                    {currentDrill.dialogue_prompt.speaker_b_blank}
                  </div>
                </div>
              )}

              {/* Sentence Prompt (e.g. Mondai cloze) */}
              {currentDrill.sentence_prompt && (
                <div className="p-4 rounded-2xl bg-surface-2 border border-accent/20 flex items-center justify-between gap-3">
                  <div className="text-base sm:text-lg font-jp font-bold text-appText-bright">
                    {currentDrill.sentence_prompt}
                  </div>
                  <button
                    onClick={() => speakJapanese(currentDrill.sentence_prompt || '')}
                    className="w-8 h-8 rounded-full bg-surface-3 hover:bg-surface border border-accent/20 text-accent flex items-center justify-center shrink-0 active:scale-95"
                    title="Dengarkan kalimat"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* 4 Choices */}
              <div className="space-y-2 pt-1">
                {currentDrill.options.map((option, idx) => {
                  const isSelected = selectedOption === option;
                  const isCorrect = option === currentDrill.correct_answer;

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
                      onClick={() => handleSelectOption(option)}
                      className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 active:scale-98 cursor-pointer ${btnStyle}`}
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

              {/* Explanation & Feedback */}
              {isAnswered && (
                <div className="p-3.5 rounded-2xl bg-surface-2 border border-accent/20 space-y-2 animate-in fade-in duration-200">
                  <div className="text-xs text-appText-muted leading-relaxed">
                    <span className="font-bold text-accent">Kunci: </span>
                    {currentDrill.explanation}
                  </div>

                  {selectedOption && currentDrill.diagnostic_feedback?.[selectedOption] && (
                    <div className="text-[11px] text-amber-300 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/25">
                      ⚠️ {currentDrill.diagnostic_feedback[selectedOption]}
                    </div>
                  )}

                  <button
                    onClick={handleNext}
                    className="w-full py-2.5 px-4 rounded-xl bg-accent hover:bg-accent-hot text-bg font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-glow active:scale-98 cursor-pointer mt-2"
                  >
                    <span>
                      {currentIndex + 1 >= drills.length ? 'Lihat Hasil Akhir' : 'Lanjut ke Drill Berikutnya'}
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
