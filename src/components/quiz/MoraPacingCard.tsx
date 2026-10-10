// ══════════════════════════════════════════════════════════════════
//  MoraPacingCard.tsx — Visual Mora Metronome Drill Component
//  Research Basis: ADR-009, Phonological SLA, Elimination of Stress-Timed Rush
//  Visually and rhythmically paces words into equal-duration morae (240 bpm)
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { Volume2, Play, Pause, RotateCcw, Clock, Music } from 'lucide-react';
import { QuizQuestionItem } from '../../types/quiz';
import { speakJapanese } from '../../lib/audio/tts';

interface MoraPacingCardProps {
  question: QuizQuestionItem;
  selectedOption: string | null;
  feedback: { isCorrect: boolean; text: string } | null;
  onSelectOption: (option: string) => void;
}

export const MoraPacingCard: React.FC<MoraPacingCardProps> = ({
  question,
  selectedOption,
  feedback,
  onSelectOption,
}) => {
  const morae = question.moraBeats || [question.questionText];
  const [activeMoraIndex, setActiveMoraIndex] = useState<number>(-1);
  const [isPlayingMetronome, setIsPlayingMetronome] = useState<boolean>(false);

  // Stop metronome when question changes
  useEffect(() => {
    setIsPlayingMetronome(false);
    setActiveMoraIndex(-1);
  }, [question.id]);

  // Metronome beat ticker at ~240 bpm (250ms per mora)
  useEffect(() => {
    if (!isPlayingMetronome || morae.length === 0) return;

    let currentIndex = 0;
    setActiveMoraIndex(0);

    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex >= morae.length) {
        // Pause briefly at the end, then loop once more or stop
        clearInterval(interval);
        setTimeout(() => {
          setIsPlayingMetronome(false);
          setActiveMoraIndex(-1);
        }, 300);
      } else {
        setActiveMoraIndex(currentIndex);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [isPlayingMetronome, morae.length]);

  const toggleMetronome = () => {
    if (isPlayingMetronome) {
      setIsPlayingMetronome(false);
      setActiveMoraIndex(-1);
    } else {
      setIsPlayingMetronome(true);
    }
  };

  const handleSpeak = () => {
    speakJapanese(question.questionText.split(' ')[0] || question.correctAnswer);
  };

  return (
    <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
      {/* Question Card */}
      <div className="bg-surface border-2 border-indigo-500/30 rounded-2xl sm:rounded-3xl p-5 sm:p-7 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-accent/15 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Music className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
              {question.prompt}
            </span>
          </div>

          <button
            onClick={handleSpeak}
            className="p-1.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-muted hover:text-accent transition-all active:scale-95"
            title="Dengarkan pelafalan"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Word Display */}
        <div className="text-center py-2 space-y-1">
          <div className="text-2xl sm:text-3xl font-jp font-extrabold text-appText-bright">
            {question.questionText}
          </div>
          {question.subText && (
            <div className="text-xs text-appText-muted">{question.subText}</div>
          )}
        </div>

        {/* Interactive Mora Rhythm Bar */}
        <div className="bg-surface-2/80 p-4 rounded-2xl border border-indigo-500/20 space-y-3">
          <div className="flex items-center justify-between text-[11px] font-bold text-appText-muted">
            <span>Ketukan Mora Merata (Isokroni Fonetik):</span>
            <span className="font-mono text-indigo-400">{morae.length} Mora</span>
          </div>

          <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-2.5 py-1">
            {morae.map((m, idx) => {
              const isActive = activeMoraIndex === idx;
              return (
                <div
                  key={idx}
                  className={`min-w-[44px] sm:min-w-[52px] h-12 sm:h-14 px-2 rounded-xl sm:rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-150 select-none ${
                    isActive
                      ? 'bg-indigo-600 border-indigo-400 text-white scale-110 shadow-glow font-black'
                      : 'bg-surface border-accent/20 text-appText-bright font-bold'
                  }`}
                >
                  <span className="text-base sm:text-lg font-jp leading-none">{m}</span>
                  <span className="text-[9px] font-mono opacity-60 mt-0.5">{idx + 1}</span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center pt-1">
            <button
              onClick={toggleMetronome}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                isPlayingMetronome
                  ? 'bg-indigo-600 text-white shadow-glow'
                  : 'bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30'
              }`}
            >
              {isPlayingMetronome ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Hentikan Metronom</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Mainkan Tempo Metronom (240 bpm)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Answer Options */}
      {question.options && question.options.length > 0 && (
        <div className="space-y-2">
          <div className="text-xs font-bold text-appText-muted">
            Pilih susunan ketukan mora yang tepat:
          </div>
          <div className="grid grid-cols-1 gap-2.5">
            {question.options.map((opt, idx) => {
              const isSelected = selectedOption === opt;
              const isCorrect = opt.trim() === question.correctAnswer.trim();

              let btnStyle = 'bg-surface-2 border-accent/20 text-appText-bright hover:border-accent/40';
              if (feedback) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-950/40 border-rose-500/60 text-rose-300';
                } else {
                  btnStyle = 'bg-surface-2/40 border-accent/10 text-appText-muted opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={!!feedback}
                  onClick={() => onSelectOption(opt)}
                  className={`w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left text-xs sm:text-sm font-jp transition-all flex items-center justify-between min-h-[44px] active:scale-95 ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {feedback && isCorrect && <span className="text-emerald-400 font-bold text-xs">✓ Benar</span>}
                  {feedback && isSelected && !isCorrect && <span className="text-rose-400 font-bold text-xs">✗ Keliru</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
