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

function getDrillOptions(drill: AuthenticDrillItem): string[] {
  if (drill.options && Array.isArray(drill.options) && drill.options.length > 0) return drill.options;
  const dAny = drill as any;
  if (dAny.tokens && Array.isArray(dAny.tokens) && dAny.tokens.length > 0) return dAny.tokens;
  if (dAny.scrambled_tokens && Array.isArray(dAny.scrambled_tokens) && dAny.scrambled_tokens.length > 0) return dAny.scrambled_tokens;
  if (dAny.assessment_criteria && Array.isArray(dAny.assessment_criteria) && dAny.assessment_criteria.length > 0) return dAny.assessment_criteria;
  if (dAny.confusing_pair && Array.isArray(dAny.confusing_pair) && dAny.confusing_pair.length > 0) {
    if (drill.sentence_prompt) {
      const match = drill.sentence_prompt.match(/\[\s*([^/\]]+)\s*\/\s*([^/\]]+)\s*\]/);
      if (match) return [match[1].trim(), match[2].trim()];
    }
    return dAny.confusing_pair;
  }
  return [];
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
  const activeOptions = currentDrill ? getDrillOptions(currentDrill) : [];

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
                {chapterTitle.replace(/:\s*$/, '').trim()}
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

              {/* Target Pattern (e.g. cue_substitution, pattern_expansion) */}
              {currentDrill.target_pattern && (
                <div className="p-2.5 rounded-xl bg-surface-2 border border-accent/20 flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase text-accent">Pola Target:</span>
                  <span className="text-xs font-jp font-bold text-accent-hot">{currentDrill.target_pattern}</span>
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

              {/* Situational Context */}
              {(currentDrill.situation_context || currentDrill.situation) && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-300">
                  <span className="font-bold">Konteks Situasi: </span>
                  {currentDrill.situation_context || currentDrill.situation}
                </div>
              )}

              {/* Dialogue Scenario (e.g. Quartet speaking roleplay) */}
              {currentDrill.dialogue_scenario && (
                <div className="p-3.5 rounded-xl bg-surface-2 border border-accent/20 text-xs text-appText-bright">
                  <span className="font-bold text-accent block mb-1">Skenario Roleplay:</span>
                  <p className="leading-relaxed">{currentDrill.dialogue_scenario}</p>
                </div>
              )}

              {/* Sign Example (e.g. Irodori life_sign_reading) */}
              {currentDrill.sign_example && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-amber-400 block mb-0.5">Tanda / Rambu Seikatsu:</span>
                    <div className="text-base sm:text-lg font-jp font-bold text-appText-bright">
                      {currentDrill.sign_example}
                    </div>
                  </div>
                </div>
              )}

              {/* Task Can-Do (e.g. Irodori cando_listening_match) */}
              {currentDrill.task_can_do && (
                <div className="p-3 rounded-xl bg-surface-2 border border-accent/15 text-xs text-appText-bright">
                  <span className="font-bold text-accent">Target Can-Do: </span>
                  {currentDrill.task_can_do}
                </div>
              )}

              {/* Speech Bubble Prompt & Illustration Cue (e.g. Marugoto katsudoo) */}
              {(currentDrill.speech_bubble_prompt || currentDrill.illustration_cue) && (
                <div className="p-3.5 rounded-2xl bg-surface-2 border border-accent/20 space-y-1.5">
                  {currentDrill.illustration_cue && (
                    <span className="text-[10px] font-bold text-accent uppercase block">
                      Ilustrasi: {currentDrill.illustration_cue}
                    </span>
                  )}
                  {currentDrill.speech_bubble_prompt && (
                    <div className="text-sm font-jp font-bold text-appText-bright italic">
                      💭 "{currentDrill.speech_bubble_prompt}"
                    </div>
                  )}
                </div>
              )}

              {/* Target Word & Requested Form (e.g. form transformation) */}
              {(currentDrill.target_word || currentDrill.requested_form) && (
                <div className="p-3.5 rounded-2xl bg-surface-2 border border-accent/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  {currentDrill.target_word && (
                    <div className="text-base sm:text-lg font-jp font-bold text-appText-bright">
                      {currentDrill.target_word}
                    </div>
                  )}
                  {currentDrill.requested_form && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-surface-3 text-accent border border-accent/20">
                      Ubah ke: {currentDrill.requested_form}
                    </span>
                  )}
                </div>
              )}

              {/* Universal Coalesced Prompt */}
              {(() => {
                const promptText =
                  currentDrill.sentence_prompt ||
                  currentDrill.prompt ||
                  currentDrill.question_prompt ||
                  currentDrill.scrambled_prompt ||
                  currentDrill.passage_context ||
                  currentDrill.passage_snippet ||
                  currentDrill.discussion_prompt ||
                  null;

                if (!promptText) return null;

                return (
                  <div className="p-4 rounded-2xl bg-surface-2 border border-accent/20 flex items-center justify-between gap-3">
                    <div className="text-base sm:text-lg font-jp font-bold text-appText-bright leading-relaxed min-w-0 flex-1">
                      {promptText}
                    </div>
                    <button
                      onClick={() => speakJapanese(promptText)}
                      className="w-8 h-8 rounded-full bg-surface-3 hover:bg-surface border border-accent/20 text-accent flex items-center justify-center shrink-0 active:scale-95"
                      title="Dengarkan kalimat"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })()}

              {/* Syntactic Hint or Pedagogical Tip (e.g. SKM star order) */}
              {(currentDrill.syntactic_hint || currentDrill.pedagogical_tip) && (
                <div className="p-2.5 rounded-xl bg-surface-2/60 border border-accent/15 text-xs text-appText-muted">
                  <span className="font-bold text-accent">Petunjuk: </span>
                  {currentDrill.syntactic_hint || currentDrill.pedagogical_tip}
                </div>
              )}

              {/* Contrastive Nuance (e.g. SKM nuance comparison) */}
              {currentDrill.contrastive_nuance && (
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-300">
                  <span className="font-bold">Distingsi Nuansa: </span>
                  {currentDrill.contrastive_nuance}
                </div>
              )}

              {/* Choices (Options) */}
              <div className="space-y-2 pt-1">
                {activeOptions.map((option, idx) => {
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
                      className={`w-full min-h-[44px] p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 active:scale-98 cursor-pointer ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <span className="w-6 h-6 rounded-lg bg-surface-3/80 font-mono text-xs flex items-center justify-center shrink-0 border border-accent/10">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="font-jp break-words whitespace-normal leading-snug">{option}</span>
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
