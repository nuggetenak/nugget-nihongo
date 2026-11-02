// ══════════════════════════════════════════════════════════════════
//  ChoukaiPlayer.tsx — Authentic Listening Drill Audio Wave Player
//  Research Basis: Choukai Immersion, 2x Playback Limiter (JFT-Basic)
//  Hidden Script Invariant During CBT & Post-Submission Reveal
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useRef } from 'react';
import { Headphones, Play, Pause, RotateCcw, Volume2, Lock, Unlock, AlertCircle } from 'lucide-react';
import { ChoukaiPayload, ScaffoldingMode } from '../../types/exercise';
import { speakJapanese } from '../../lib/audio/tts';

interface ChoukaiPlayerProps {
  choukai: ChoukaiPayload;
  questionIndex: number;
  mode: ScaffoldingMode;
  playsCount: number;
  onPlay: () => boolean;
  isSubmitted?: boolean;
}

export const ChoukaiPlayer: React.FC<ChoukaiPlayerProps> = ({
  choukai,
  mode,
  playsCount,
  onPlay,
  isSubmitted = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  const maxPlays = choukai.maxReplays || 2;
  const isStrict = mode === 'strict';
  const remainingPlays = Math.max(0, maxPlays - playsCount);
  const isQuotaExhausted = isStrict && remainingPlays <= 0;

  // Cleanup on unmount or question change
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [choukai]);

  const handlePlayToggle = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    if (isQuotaExhausted && !isSubmitted) {
      return;
    }

    // Call onPlay callback to consume quota
    const allowed = onPlay();
    if (!allowed && !isSubmitted) return;

    if (choukai.audioUrl) {
      if (!audioRef.current) {
        audioRef.current = new Audio(choukai.audioUrl);
        audioRef.current.onended = () => {
          setIsPlaying(false);
          setPlaybackProgress(0);
          if (intervalRef.current) clearInterval(intervalRef.current);
        };
      }
      audioRef.current.play().catch((err) => {
        console.warn('[ChoukaiPlayer] Audio file play failed, fallback to TTS:', err);
        fallbackTts();
      });
      setIsPlaying(true);
    } else {
      fallbackTts();
    }
  };

  const fallbackTts = () => {
    setIsPlaying(true);
    speakJapanese(choukai.transcriptText);

    // Simulate progress animation for TTS duration estimate (~50ms per character)
    const durationMs = Math.max(3000, choukai.transcriptText.length * 90);
    const stepMs = 100;
    let elapsed = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      elapsed += stepMs;
      const progress = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setPlaybackProgress(progress);

      if (elapsed >= durationMs) {
        setIsPlaying(false);
        setPlaybackProgress(0);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, stepMs);
  };

  return (
    <div className="bg-surface border border-theme rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-4 shadow-sm">
      {/* ── HEADER WITH STATUS BADGE & QUOTA ───────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-theme/60 pb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <Headphones className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
              Audio Menyimak (Choukai)
            </span>
            <p className="text-xs text-appText-muted truncate">
              {choukai.situationId || 'Dengarkan dialog penutur asli bahasa Jepang.'}
            </p>
          </div>
        </div>

        {/* Quota Badge (Strict vs Guided) */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          {isStrict ? (
            <span
              className={`text-xs font-bold px-3 py-1 rounded-xl border flex items-center gap-1.5 ${
                remainingPlays === 2
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                  : remainingPlays === 1
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                  : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>
                {remainingPlays > 0
                  ? `Sisa ${remainingPlays}x Putar (Standar CBT)`
                  : 'Kuota Habis (2/2 Putaran)'}
              </span>
            </span>
          ) : (
            <span className="text-xs font-bold px-3 py-1 rounded-xl bg-surface-2 border border-theme text-appText-muted flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-accent" />
              <span>Putar Bebas (Mode Terbimbing)</span>
            </span>
          )}
        </div>
      </div>

      {/* ── INTERACTIVE PLAYER & WAVEFORM ANIMATION ─────────────────── */}
      <div className="bg-surface-2/60 border border-theme/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={handlePlayToggle}
          disabled={isQuotaExhausted && !isSubmitted}
          className={`min-h-[52px] px-6 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all shadow-md active:scale-95 shrink-0 ${
            isQuotaExhausted && !isSubmitted
              ? 'bg-surface-3 text-appText-dim border border-theme cursor-not-allowed'
              : isPlaying
              ? 'bg-amber-500 text-stone-950 shadow-glow'
              : 'bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-stone-950 shadow-sm'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-5 h-5 fill-stone-950" />
              <span>Jeda Audio</span>
            </>
          ) : isQuotaExhausted && !isSubmitted ? (
            <>
              <Lock className="w-4 h-4 text-appText-dim" />
              <span>Terkunci</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-stone-950" />
              <span>{playsCount > 0 ? 'Putar Ulang' : 'Dengarkan Audio'}</span>
            </>
          )}
        </button>

        {/* Audio Waveform SVG Bars */}
        <div className="flex-1 flex items-center gap-1.5 h-10 px-3 bg-surface rounded-xl border border-theme overflow-hidden">
          {[12, 28, 16, 36, 24, 40, 18, 30, 14, 38, 22, 34, 16, 28, 20, 36, 14, 26, 32, 18, 24, 30].map(
            (height, bIdx) => (
              <div
                key={bIdx}
                className={`flex-1 rounded-full transition-all duration-300 ${
                  isPlaying
                    ? 'bg-emerald-400 animate-pulse'
                    : 'bg-theme/40'
                }`}
                style={{
                  height: isPlaying ? `${Math.max(20, (height * (bIdx % 2 === 0 ? 1.2 : 0.8)))}%` : '20%',
                  animationDelay: `${bIdx * 40}ms`,
                }}
              />
            )
          )}
        </div>
      </div>

      {/* ── SITUATION / ROLE CONTEXT ───────────────────────────────── */}
      {choukai.situationJp && (
        <div className="text-xs sm:text-sm text-appText-muted font-japanese bg-surface-2/30 border border-theme/40 rounded-xl p-3">
          <span className="font-bold text-appText-bright">場面 (Situasi):</span> {choukai.situationJp}
        </div>
      )}

      {/* ── SCRIPT TRANSCRIPT: STRICTLY GUARDED ─────────────────────── */}
      <div className="pt-1">
        {isSubmitted ? (
          <div className="bg-surface-2 border border-theme rounded-2xl p-4 space-y-2.5 animate-in fade-in">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <Unlock className="w-3.5 h-3.5" />
              <span>Transkrip Resmi Dialog (Terbuka):</span>
            </div>
            <div className="text-sm font-japanese text-appText-bright leading-relaxed whitespace-pre-wrap">
              {choukai.transcriptText}
            </div>
          </div>
        ) : (
          <div className="bg-surface-2/40 border border-dashed border-theme rounded-xl p-3 flex items-center gap-2.5 text-xs text-appText-muted">
            <Lock className="w-4 h-4 text-accent shrink-0" />
            <span>
              Transkrip teks disembunyikan untuk menjaga validitas ujian menyimak. Transkrip akan dibuka pada lembar pembahasan akhir.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
