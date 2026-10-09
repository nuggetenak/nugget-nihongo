// ══════════════════════════════════════════════════════════════════
//  QuizAudioListeningCard.tsx — Specialized Listening Drill Card
//  Auditory reflex training with animated soundwave and speed toggle
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, RotateCcw, Eye, EyeOff, Check, Sparkles } from 'lucide-react';
import { QuizQuestionItem } from '../../lib/quiz/quizEngine';
import { speakJapanese } from '../../lib/audio/tts';

interface QuizAudioListeningCardProps {
  question: QuizQuestionItem;
  selectedOption: string | null;
  feedback: { isCorrect: boolean; text: string } | null;
  onSelectOption: (opt: string) => void;
}

export const QuizAudioListeningCard: React.FC<QuizAudioListeningCardProps> = ({
  question,
  selectedOption,
  feedback,
  onSelectOption,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [speed, setSpeed] = useState<number>(1.0);

  // Play audio on question mount
  const playAudio = (customSpeed = speed) => {
    setIsPlaying(true);
    speakJapanese(question.questionText, customSpeed);
    setTimeout(() => setIsPlaying(false), 1200);
  };

  useEffect(() => {
    setShowHint(false);
    playAudio(speed);
  }, [question.id]);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Audio Wave Player Box */}
      <div className="relative overflow-hidden rounded-3xl bg-surface border-2 border-accent/30 p-6 sm:p-8 text-center space-y-5 shadow-xl">
        <div className="text-xs font-bold text-accent uppercase tracking-wider flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Latihan Mendengar (Listening Drill)</span>
        </div>

        {/* Central Audio Soundwave Sphere */}
        <div className="py-4 flex flex-col items-center justify-center">
          <button
            onClick={() => playAudio(speed)}
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl relative ${
              isPlaying
                ? 'bg-amber-500 text-bg scale-105 shadow-glow ring-8 ring-amber-500/20'
                : 'bg-surface-2 hover:bg-surface-3 text-accent border-2 border-accent/40 hover:border-accent hover:scale-105'
            }`}
            title="Dengarkan kembali audio"
          >
            <Volume2 className={`w-10 h-10 sm:w-12 sm:h-12 ${isPlaying ? 'animate-bounce' : ''}`} />
          </button>

          {/* Soundwave Bars Simulation */}
          <div className="flex items-center gap-1.5 mt-4 h-6">
            {[40, 75, 100, 60, 90, 45, 80].map((h, i) => (
              <span
                key={i}
                className={`w-1 rounded-full bg-accent transition-all duration-200 ${
                  isPlaying ? 'opacity-100' : 'opacity-30'
                }`}
                style={{
                  height: isPlaying ? `${h}%` : '20%',
                  animationDelay: `${i * 100}ms`,
                }}
              />
            ))}
          </div>

          <p className="text-xs text-appText-muted mt-2">
            Ketuk tombol di atas untuk memutar ulang suara
          </p>
        </div>

        {/* Controls: Speed Toggle & Hint */}
        <div className="flex items-center justify-center gap-3 pt-2 border-t border-accent/15">
          <button
            onClick={() => {
              const next = speed === 1.0 ? 0.75 : 1.0;
              setSpeed(next);
              playAudio(next);
            }}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
              speed === 0.75
                ? 'bg-amber-500/20 text-accent border-amber-500/40'
                : 'bg-surface-2 text-appText-muted border-accent/20 hover:text-appText-bright'
            }`}
          >
            🐢 Kecepatan: {speed}x
          </button>

          <button
            onClick={() => setShowHint(!showHint)}
            className="px-3 py-1.5 rounded-xl bg-surface-2 border border-accent/20 hover:border-accent/40 text-appText-muted hover:text-appText-bright text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            {showHint ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showHint ? 'Tutup Teks' : 'Intip Teks'}</span>
          </button>
        </div>

        {/* Revealed text hint if user requested */}
        {showHint && (
          <div className="p-3 rounded-2xl bg-surface-2/80 border border-accent/20 text-sm font-jp font-bold text-appText-bright animate-in zoom-in-95 duration-150">
            {question.questionText} {question.subText ? `(${question.subText})` : ''}
          </div>
        )}
      </div>

      {/* Answer Options Grid */}
      <div className="grid grid-cols-1 gap-2.5">
        {question.options?.map((opt, idx) => {
          const isSelected = selectedOption === opt;
          const isCorrect = opt.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase();

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
              onClick={() => onSelectOption(opt)}
              disabled={!!feedback}
              className={`w-full p-4 rounded-2xl border text-sm font-semibold text-left transition-all flex items-center justify-between ${btnStyle} active:scale-[0.99]`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-surface border border-accent/15 flex items-center justify-center text-xs font-mono text-appText-muted shrink-0">
                  {idx + 1}
                </span>
                <span>{opt}</span>
              </div>
              {feedback && isCorrect && <Check className="w-4 h-4 text-emerald-400" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
