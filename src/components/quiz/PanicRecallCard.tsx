// ══════════════════════════════════════════════════════════════════
//  PanicRecallCard.tsx — Cover-Recall-Check Drill for Gemba K3 & SBAR
//  Research Basis: ADR-009, Sakamoto et al. (2014), Emergency SLA Washback Mitigation
//  Forces Spoken Production Under 5s/8s Countdown without Multiple Choice Cues
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { AlertOctagon, Volume2, CheckCircle2, AlertTriangle, XCircle, Clock, ShieldAlert } from 'lucide-react';
import { QuizQuestionItem } from '../../types/quiz';
import { speakJapanese } from '../../lib/audio/tts';
import { playErrorSfx, playSuccessSfx } from '../../lib/audio/sfx';

interface PanicRecallCardProps {
  question: QuizQuestionItem;
  onRateSelf: (rating: 'gagal' | 'ragu' | 'lancar') => void;
  onOpenReport?: () => void;
}

export const PanicRecallCard: React.FC<PanicRecallCardProps> = ({
  question,
  onRateSelf,
}) => {
  const timeoutLimit = question.panicTimeoutSeconds || 5;
  const [secondsLeft, setSecondsLeft] = useState<number>(timeoutLimit);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Reset timer whenever question changes
  useEffect(() => {
    setSecondsLeft(timeoutLimit);
    setIsRevealed(false);
    setIsTimerRunning(true);
  }, [question.id, timeoutLimit]);

  // Countdown ticker
  useEffect(() => {
    if (!isTimerRunning || isRevealed) return;

    if (secondsLeft <= 0) {
      setIsRevealed(true);
      setIsTimerRunning(false);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRevealed(true);
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, isTimerRunning, isRevealed]);

  const handleManualReveal = () => {
    setIsRevealed(true);
    setIsTimerRunning(false);
  };

  const handleSpeak = () => {
    speakJapanese(question.correctAnswer);
  };

  const progressPercent = Math.max(0, Math.min(100, (secondsLeft / timeoutLimit) * 100));

  return (
    <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
      {/* Emergency Header & Timer Banner */}
      <div className="bg-red-950/40 border-2 border-red-500/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
        {/* Animated Background Pulse on Low Timer */}
        {secondsLeft <= 2 && !isRevealed && (
          <div className="absolute inset-0 bg-red-600/10 animate-ping pointer-events-none rounded-3xl" />
        )}

        <div className="flex items-center justify-between gap-3 border-b border-red-500/20 pb-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="p-1.5 rounded-xl bg-red-500/20 text-red-400 shrink-0">
              <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
            <div className="min-w-0">
              <div className="text-[11px] font-bold text-red-400 uppercase tracking-wider truncate">
                Simulasi Darurat Gemba K3
              </div>
              <div className="text-[10px] text-appText-muted truncate">
                {question.subText || 'Tanggap Darurat < 5 Detik'}
              </div>
            </div>
          </div>

          {/* Countdown Indicator */}
          <div className="flex items-center gap-2 shrink-0">
            <Clock className={`w-4 h-4 ${secondsLeft <= 2 ? 'text-red-400 animate-pulse' : 'text-accent'}`} />
            <span
              className={`font-mono font-extrabold text-base sm:text-lg ${
                secondsLeft <= 2 ? 'text-red-400' : 'text-accent'
              }`}
            >
              {secondsLeft}s
            </span>
          </div>
        </div>

        {/* Timer Bar */}
        <div className="w-full bg-surface-2 rounded-full h-1.5 overflow-hidden my-3">
          <div
            className={`h-full transition-all duration-1000 rounded-full ${
              secondsLeft <= 2 ? 'bg-red-500' : 'bg-accent'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Situation Prompt */}
        <div className="space-y-2 pt-1">
          <div className="text-xs font-bold text-appText-muted uppercase tracking-wider">
            Situasi Lapangan:
          </div>
          <div className="text-base sm:text-xl font-bold text-appText-bright leading-relaxed break-words">
            {question.questionText}
          </div>
        </div>

        {/* Spoken Production Directive */}
        {!isRevealed ? (
          <div className="mt-5 p-4 rounded-2xl bg-surface/80 border border-accent/20 text-center space-y-3">
            <div className="text-xs font-bold text-accent animate-pulse">
              🗣️ SEBUTKAN KOMANDO / UJARAN BAHASA JEPANG SECARA LISAN!
            </div>
            <p className="text-[11px] text-appText-muted">
              Latih reflek bicara tanpa melihat contekan pilihan ganda. Waktu terus berjalan!
            </p>
            <button
              onClick={handleManualReveal}
              className="w-full py-3 rounded-xl bg-accent text-bg font-extrabold text-xs shadow-glow hover:bg-accent-hot transition-all active:scale-95"
            >
              Buka Kunci Komando & Verifikasi Jawaban
            </button>
          </div>
        ) : (
          <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-surface/90 border-2 border-emerald-500/40 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                🎯 Komando Wajib SBAR:
              </span>
              <button
                onClick={handleSpeak}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-xs font-bold transition-all active:scale-95"
                title="Dengarkan pelafalan komando"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Dengarkan</span>
              </button>
            </div>

            <div className="text-xl sm:text-2xl font-jp font-extrabold text-appText-bright leading-relaxed break-words">
              {question.correctAnswer}
            </div>

            {question.actionChecklist && question.actionChecklist.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-accent/15">
                <div className="text-[11px] font-bold text-appText-muted">Langkah Tindakan Wajib:</div>
                <div className="space-y-1">
                  {question.actionChecklist.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-appText-bright/90">
                      <span className="font-mono font-bold text-emerald-400 shrink-0">{idx + 1}.</span>
                      <span className="break-words">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Self-Rating Verification Buttons (Visible Once Revealed) */}
      {isRevealed && (
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="text-center text-xs font-bold text-appText-muted">
            Evaluasi Kemandirian: Seberapa lancar Anda melafalkan komando tadi?
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <button
              onClick={() => {
                playErrorSfx();
                onRateSelf('gagal');
              }}
              className="py-3 sm:py-3.5 rounded-2xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 text-xs font-bold transition-all flex flex-col items-center gap-1 active:scale-95"
            >
              <XCircle className="w-4 h-4 text-red-400" />
              <span>Gagal / Terbata</span>
              <span className="text-[9px] opacity-60">Tidak hafal komando</span>
            </button>

            <button
              onClick={() => {
                playSuccessSfx();
                onRateSelf('ragu');
              }}
              className="py-3 sm:py-3.5 rounded-2xl bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/30 text-amber-300 text-xs font-bold transition-all flex flex-col items-center gap-1 active:scale-95"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Ragu / Lambat</span>
              <span className="text-[9px] opacity-60">Hafal tapi &gt; 5 detik</span>
            </button>

            <button
              onClick={() => {
                playSuccessSfx();
                onRateSelf('lancar');
              }}
              className="py-3 sm:py-3.5 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-all flex flex-col items-center gap-1 active:scale-95 shadow-glow"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Lancar &amp; Sigap</span>
              <span className="text-[9px] opacity-60">Reflek vokal &lt; 5 detik</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
