// ══════════════════════════════════════════════════════════════════
//  QuizAudioListeningCard.tsx — Specialized Listening Drill Card
//  Auditory reflex training with authentic Choukai audio, dynamic soundwave,
//  speed controls (0.75x, 1.0x, 1.25x), and visual scene prompts
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Eye, EyeOff, Check, Sparkles, Image as ImageIcon } from 'lucide-react';
import { QuizQuestionItem } from '../../types/quiz';
import { speakJapanese, stopJapaneseSpeech } from '../../lib/audio/speechEngine';

interface QuizAudioListeningCardProps {
  question: QuizQuestionItem;
  selectedOption: string | null;
  feedback: { isCorrect: boolean; text: string } | null;
  onSelectOption: (opt: string) => void;
  audioUrl?: string;
  promptImage?: string;
}

export const QuizAudioListeningCard: React.FC<QuizAudioListeningCardProps> = ({
  question,
  selectedOption,
  feedback,
  onSelectOption,
  audioUrl,
  promptImage,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [speed, setSpeed] = useState<number>(1.0);
  const [waveAmplitudes, setWaveAmplitudes] = useState<number[]>([30, 50, 70, 40, 60, 45, 80]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const effectiveAudioUrl = audioUrl || question.audioUrl;
  const effectivePromptImage = promptImage || question.promptImage;

  // Soundwave animation loop
  const startSoundwaveAnimation = () => {
    let phase = 0;
    const animate = () => {
      phase += 0.2;
      setWaveAmplitudes([
        35 + Math.sin(phase) * 25,
        55 + Math.sin(phase + 1) * 35,
        80 + Math.sin(phase + 2) * 20,
        45 + Math.cos(phase) * 30,
        70 + Math.sin(phase + 3) * 25,
        50 + Math.cos(phase + 1) * 35,
        85 + Math.sin(phase + 4) * 15,
      ]);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
  };

  const stopSoundwaveAnimation = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    setWaveAmplitudes([25, 25, 25, 25, 25, 25, 25]);
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    stopJapaneseSpeech();
    stopSoundwaveAnimation();
    setIsPlaying(false);
  };

  // Play audio on question mount or user tap
  const playAudio = async (customSpeed = speed) => {
    stopAudio();
    setIsPlaying(true);
    startSoundwaveAnimation();

    if (effectiveAudioUrl) {
      try {
        const audio = new Audio(effectiveAudioUrl);
        audioRef.current = audio;
        audio.playbackRate = customSpeed;

        audio.onended = () => {
          stopSoundwaveAnimation();
          setIsPlaying(false);
        };

        audio.onerror = () => {
          // Fall back to Web Speech synthesis
          speakJapanese(question.questionText, customSpeed, () => {
            stopSoundwaveAnimation();
            setIsPlaying(false);
          });
        };

        await audio.play();
        return;
      } catch {
        // Fall back to speechEngine
      }
    }

    // Default: Web Speech API synthesis
    await speakJapanese(question.questionText, customSpeed, () => {
      stopSoundwaveAnimation();
      setIsPlaying(false);
    });
  };

  useEffect(() => {
    setShowHint(false);
    playAudio(speed);

    return () => {
      stopAudio();
    };
  }, [question.id]);

  const cycleSpeed = () => {
    const speeds = [0.75, 1.0, 1.25];
    const nextIdx = (speeds.indexOf(speed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setSpeed(nextSpeed);
    playAudio(nextSpeed);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Audio Wave Player Box */}
      <div className="relative overflow-hidden rounded-3xl bg-surface border-2 border-accent/30 p-6 sm:p-8 text-center space-y-5 shadow-xl">
        <div className="text-xs font-bold text-accent uppercase tracking-wider flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Latihan Mendengar (Choukai Listening Drill)</span>
        </div>

        {/* Visual Scene Prompt Image (if present) */}
        {effectivePromptImage && (
          <div className="rounded-2xl overflow-hidden border border-accent/20 bg-surface-2 p-2 max-w-sm mx-auto shadow-inner">
            <img
              src={effectivePromptImage}
              alt="Ilustrasi Soal Mendengar"
              className="w-full max-h-48 object-contain rounded-xl mx-auto"
              loading="lazy"
            />
          </div>
        )}

        {/* Central Audio Soundwave Sphere */}
        <div className="py-3 flex flex-col items-center justify-center">
          <button
            onClick={() => playAudio(speed)}
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl relative cursor-pointer ${
              isPlaying
                ? 'bg-amber-500 text-bg scale-105 shadow-glow ring-8 ring-amber-500/20'
                : 'bg-surface-2 hover:bg-surface-3 text-accent border-2 border-accent/40 hover:border-accent hover:scale-105 active:scale-95'
            }`}
            title="Dengarkan kembali audio"
            aria-label="Putar audio latihan"
          >
            <Volume2 className={`w-10 h-10 sm:w-12 sm:h-12 ${isPlaying ? 'animate-bounce' : ''}`} />
          </button>

          {/* Dynamic Real-time Soundwave Frequency Bars */}
          <div className="flex items-center gap-1.5 mt-4 h-7">
            {waveAmplitudes.map((h, i) => (
              <span
                key={i}
                className={`w-1.5 rounded-full bg-accent transition-all duration-75 ${
                  isPlaying ? 'opacity-100 shadow-glow' : 'opacity-25'
                }`}
                style={{
                  height: isPlaying ? `${Math.max(15, Math.min(100, h))}%` : '20%',
                }}
              />
            ))}
          </div>

          <p className="text-xs text-appText-muted mt-2">
            Ketuk tombol di atas untuk memutar ulang audio
          </p>
        </div>

        {/* Controls: Speed Toggle & Subtitle Hint */}
        <div className="flex items-center justify-center gap-3 pt-2 border-t border-accent/15">
          <button
            onClick={cycleSpeed}
            className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all min-h-[40px] flex items-center gap-1.5 active:scale-95 cursor-pointer ${
              speed !== 1.0
                ? 'bg-amber-500/20 text-accent border-amber-500/40'
                : 'bg-surface-2 text-appText-muted border-accent/20 hover:text-appText-bright'
            }`}
            title="Atur kecepatan putar (0.75x, 1.0x, 1.25x)"
          >
            <span>⚡ Kecepatan:</span>
            <span className="font-mono text-accent">{speed}x</span>
          </button>

          <button
            onClick={() => setShowHint(!showHint)}
            className="px-3.5 py-2 rounded-xl bg-surface-2 border border-accent/20 hover:border-accent/40 text-appText-muted hover:text-appText-bright text-xs font-semibold flex items-center gap-1.5 transition-all min-h-[40px] active:scale-95 cursor-pointer"
            aria-label={showHint ? 'Sembunyikan teks subtitle' : 'Tampilkan teks subtitle'}
          >
            {showHint ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showHint ? 'Tutup Transkrip' : 'Intip Transkrip'}</span>
          </button>
        </div>

        {/* Revealed text hint if user requested */}
        {showHint && (
          <div className="p-3.5 rounded-2xl bg-surface-2/90 border border-accent/20 text-sm font-jp font-bold text-appText-bright animate-in zoom-in-95 duration-150 leading-relaxed">
            <div>{question.questionText}</div>
            {question.subText && (
              <div className="text-xs font-normal text-appText-muted mt-1">{question.subText}</div>
            )}
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
              className={`w-full p-4 rounded-2xl border text-sm font-semibold text-left transition-all flex items-center justify-between ${btnStyle} active:scale-[0.99] min-h-[44px] cursor-pointer`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="w-7 h-7 rounded-xl bg-surface border border-accent/15 flex items-center justify-center text-xs font-mono text-appText-muted shrink-0">
                  {idx + 1}
                </span>
                <span className="break-words whitespace-normal leading-snug">{opt}</span>
              </div>
              {feedback && isCorrect && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
