// ══════════════════════════════════════════════════════════════════
//  MicroDrillStage.tsx — Tahap 3: Cek Pemahaman (5-Step Progressive Ladder)
//  100% In-Place, Zero Menu-Jumping, Umpan Balik Diagnostik & Retry Loop
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { LessonDrillItem } from '../../../types/curriculum';
import { cleanOptionText } from '../../../lib/curriculum/lessonContentAdapter';
import { RubyText } from '../../ui/RubyText';
import { playSuccessSfx, playErrorSfx } from '../../../lib/audio/sfx';
import { IrasutoyaImage } from '../../common/IrasutoyaImage';
import { calculateDrillScore } from '../../../lib/curriculum/lessonStageEngine';

interface MicroDrillStageProps {
  drills?: LessonDrillItem[];
  onComplete: (score: number) => void;
}

export const MicroDrillStage: React.FC<MicroDrillStageProps> = ({ drills = [], onComplete }) => {
  // Antrean soal aktif (mendukung retry loop untuk soal yang salah)
  const [activeQueue, setActiveQueue] = useState<LessonDrillItem[]>(drills);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [placedTokenIndices, setPlacedTokenIndices] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Statistik & Anti-Race Guards
  const [firstAttemptCorrect, setFirstAttemptCorrect] = useState<Record<string, boolean>>({});
  const [retryQueue, setRetryQueue] = useState<LessonDrillItem[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const isSubmittingRef = useRef(false);

  const currentItem = activeQueue[currentIndex];

  // Handler untuk kepingan kata pada tipe 'reorder' (bebas tabrakan duplikat)
  const handleToggleTokenSlot = (slotIdx: number) => {
    if (feedback) return;
    setPlacedTokenIndices((prev) => prev.filter((_, idx) => idx !== slotIdx));
  };

  const handlePlaceToken = (tokenIdx: number) => {
    if (feedback) return;
    setPlacedTokenIndices((prev) => [...prev, tokenIdx]);
  };

  // Submit jawaban
  const handleSubmitAnswer = (answerToTest: string) => {
    if (feedback || !currentItem || isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    const cleanAnswer = (answerToTest || '').trim().replace(/\s+/g, ' ');
    const cleanCorrect = (currentItem.correctAnswer || '').trim().replace(/\s+/g, ' ');

    // Japanese token answers may or may not include spaces; compare both direct and whitespace-stripped
    const isCorrect =
      cleanAnswer.length > 0 &&
      cleanCorrect.length > 0 &&
      (cleanAnswer.toLowerCase() === cleanCorrect.toLowerCase() ||
        cleanAnswer.replace(/\s+/g, '').toLowerCase() === cleanCorrect.replace(/\s+/g, '').toLowerCase());

    // Catat apakah benar pada percobaan pertama
    if (firstAttemptCorrect[currentItem.id] === undefined) {
      setFirstAttemptCorrect((prev) => ({
        ...prev,
        [currentItem.id]: isCorrect,
      }));
    }

    if (isCorrect) {
      playSuccessSfx();
    } else {
      playErrorSfx();
      // Masukkan ke retry loop jika belum ada
      setRetryQueue((prev) => (prev.some((q) => q.id === currentItem.id) ? prev : [...prev, currentItem]));
    }

    // Umpan balik diagnostik spesifik bila opsi tertentu dipilih
    const specificDiagnostic =
      !isCorrect && currentItem.diagnosticFeedback
        ? currentItem.diagnosticFeedback[answerToTest] || currentItem.diagnosticFeedback[cleanAnswer]
        : null;

    const safeExplanation = currentItem.explanation || '';
    const safeCorrectAnswer = currentItem.correctAnswer || '';
    const feedbackText = isCorrect
      ? `Tepat sekali! ${safeExplanation}`
      : specificDiagnostic
      ? `${specificDiagnostic} (Kunci yang benar: "${safeCorrectAnswer}")`
      : `Belum tepat. Jawaban yang benar adalah "${safeCorrectAnswer}". ${safeExplanation}`;

    setFeedback({
      isCorrect,
      text: feedbackText,
    });
    isSubmittingRef.current = false;
  };

  // Pindah ke soal berikutnya
  const handleNextQuestion = () => {
    setFeedback(null);
    setSelectedAnswer(null);
    setPlacedTokenIndices([]);
    isSubmittingRef.current = false;

    if (currentIndex + 1 < activeQueue.length) {
      setCurrentIndex((prev) => prev + 1);
    } else if (retryQueue.length > 0) {
      // Masuk ke putaran perbaikan (Retry Loop) untuk soal yang salah
      setActiveQueue(retryQueue);
      setRetryQueue([]);
      setCurrentIndex(0);
    } else {
      // Selesai seluruh soal! Hitung skor awal dengan engine canonical
      const totalCorrectFirstTry = Object.values(firstAttemptCorrect).filter(Boolean).length;
      const finalScore = calculateDrillScore(drills.length, totalCorrectFirstTry);

      setIsFinished(true);
      onComplete(finalScore);
    }
  };

  // Keyboard shortcut support: 1-4 / A-D to select, Enter/Space to advance (Hook must precede early returns)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentItem) return;
      if (feedback) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNextQuestion();
        }
        return;
      }
      if (currentItem.options && (currentItem.type !== 'reorder' || !currentItem.tokens || currentItem.tokens.length === 0)) {
        const key = e.key.toUpperCase();
        let targetIdx = -1;
        if (key === '1' || key === 'A') targetIdx = 0;
        else if (key === '2' || key === 'B') targetIdx = 1;
        else if (key === '3' || key === 'C') targetIdx = 2;
        else if (key === '4' || key === 'D') targetIdx = 3;

        if (targetIdx >= 0 && targetIdx < currentItem.options.length) {
          e.preventDefault();
          const opt = currentItem.options[targetIdx];
          setSelectedAnswer(opt);
          handleSubmitAnswer(opt);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentItem, feedback, activeQueue, currentIndex, retryQueue]);

  if (!drills || drills.length === 0) {
    return (
      <div className="py-12 text-center space-y-4">
        <p className="text-appText-muted text-xs">
          Tidak ada latihan khusus pada pelajaran ini.
        </p>
        <button
          type="button"
          onClick={() => onComplete(100)}
          className="min-h-[44px] px-6 py-2.5 rounded-xl bg-accent text-stone-950 font-bold text-xs uppercase tracking-wider shadow-xs hover:bg-accent-hot active:scale-95 cursor-pointer"
        >
          Lanjut ke Tantangan Nyata
        </button>
      </div>
    );
  }

  if (isFinished) {
    const totalCorrectFirstTry = Object.values(firstAttemptCorrect).filter(Boolean).length;
    const finalScore = calculateDrillScore(drills.length, totalCorrectFirstTry);

    return (
      <div className="py-10 text-center space-y-4 bg-surface-2 rounded-2xl border border-border p-6 animate-scale-in">
        <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center mx-auto shadow-xs">
          <IrasutoyaImage
            assetId={finalScore >= 80 ? 'hanko_excellent' : 'daruma_recovery'}
            animatePop
            className="w-12 h-12 object-contain"
            alt={finalScore >= 80 ? 'Taihen Yoku Dekimashita' : 'Daruma Pemulihan'}
          />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-appText-bright">Cek Pemahaman Tuntas!</h3>
          <p className="text-xs text-appText-muted">
            Seluruh butir pemahaman telah kamu selesaikan dan pahami dengan tuntas.
          </p>
        </div>
        <div className="text-3xl font-extrabold text-accent font-mono">
          {finalScore}%
        </div>
        <p className="text-xs text-appText">
          {finalScore >= 80 ? '🎉 Pemahaman mantap (≥ 80%)! Siap lanjut ke tantangan nyata.' : '💪 Tetap semangat, silakan ulas kembali materi jika perlu.'}
        </p>
        {finalScore < 80 && (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setActiveQueue(drills);
                setRetryQueue([]);
                setCurrentIndex(0);
                setSelectedAnswer(null);
                setFeedback(null);
                setFirstAttemptCorrect({});
                setIsFinished(false);
              }}
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto active:scale-95 shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Latih Ulang Soal Cek Pemahaman</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // Label badge berdasarkan tipe soal tangga progresif
  const getBadgeLabel = () => {
    switch (currentItem.type) {
      case 'vocab_context':
        return { label: '📚 Arti Kosakata dalam Konteks', color: 'text-blue-700 dark:text-blue-400 font-bold' };
      case 'trap_detect':
        return { label: '🔍 Deteksi Kesalahan Umum', color: 'text-rose-700 dark:text-rose-400 font-bold' };
      case 'reorder':
        return { label: '🧩 Susun Kepingan Kalimat', color: 'text-amber-700 dark:text-amber-300 font-bold' };
      case 'response':
        return { label: '💬 Respons Percakapan Alami', color: 'text-emerald-700 dark:text-emerald-400 font-bold' };
      case 'cloze':
      default:
        return { label: '📝 Pilihan Partikel & Pola', color: 'text-accent font-bold' };
    }
  };

  const badge = getBadgeLabel();

  return (
    <div className="space-y-4">
      {/* ── Progress Counter Bilah Atas ──────────────────────────── */}
      <div className="flex items-center justify-between text-xs text-appText-muted font-bold">
        <span>
          Cek Pemahaman #{currentIndex + 1} dari {activeQueue.length}
        </span>
        {retryQueue.length > 0 && (
          <span className="text-amber-700 dark:text-amber-300 font-bold flex items-center gap-1 text-xs">
            <RotateCcw className="w-3 h-3" />
            Putaran Ulas: {retryQueue.length} Soal
          </span>
        )}
      </div>

      {/* ── Progress Bar ─────────────────────────────────────────── */}
      <div className="w-full h-1.5 bg-surface-3 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent transition-all duration-300 rounded-full"
          style={{ width: `${Math.round(((currentIndex + 1) / activeQueue.length) * 100)}%` }}
        />
      </div>

      {/* ── Kartu Soal Utama ─────────────────────────────────────── */}
      <div className="p-5 sm:p-6 rounded-2xl bg-surface border border-border space-y-5 shadow-xs">
        <div className="space-y-1.5">
          <div className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${badge.color}`}>
            <span>{badge.label}</span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-appText-bright leading-relaxed">
            {currentItem.instruction}
          </h3>
          {currentItem.sentencePrompt && (
            <div className="p-3.5 rounded-2xl bg-surface-2 border border-border text-sm sm:text-base font-jp font-semibold text-appText-bright mt-2">
              <RubyText text={currentItem.sentencePrompt} />
            </div>
          )}
        </div>

        {/* ── Area Interaksi Tipe Reorder ─────────────────────────── */}
        {currentItem.type === 'reorder' && currentItem.tokens && currentItem.tokens.length > 0 && (
          <div className="space-y-4">
            {/* Slot Kalimat yang Tersusun */}
            <div className="min-h-[56px] p-3 rounded-2xl bg-surface-2 border-2 border-dashed border-border flex flex-wrap items-center gap-2">
              {placedTokenIndices.length === 0 ? (
                <span className="text-xs text-appText-muted italic">
                  Ketuk kepingan kata di bawah untuk menyusun kalimat...
                </span>
              ) : (
                placedTokenIndices.map((tokenIdx, slotIdx) => {
                  const token = currentItem.tokens![tokenIdx];
                  return (
                    <button
                      key={slotIdx}
                      type="button"
                      disabled={!!feedback}
                      onClick={() => handleToggleTokenSlot(slotIdx)}
                      className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-accent text-stone-950 font-jp font-bold text-sm shadow-xs active:scale-95 inline-flex items-center gap-1.5 hover:bg-accent-hot cursor-pointer"
                      title="Ketuk untuk melepas kata ini"
                    >
                      <RubyText text={token} /> ✕
                    </button>
                  );
                })
              )}
            </div>

            {/* Kepingan Kata yang Tersedia */}
            <div className="flex flex-wrap gap-2 pt-1">
              {currentItem.tokens.map((token, tIdx) => {
                const isPlaced = placedTokenIndices.includes(tIdx);
                if (isPlaced) return null;
                return (
                  <button
                    key={tIdx}
                    type="button"
                    disabled={!!feedback}
                    onClick={() => handlePlaceToken(tIdx)}
                    className="min-h-[44px] px-4 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border text-appText-bright font-jp font-bold text-sm transition-all active:scale-95 inline-flex items-center justify-center cursor-pointer hover:border-border-hover shadow-xs"
                  >
                    <RubyText text={token} />
                  </button>
                );
              })}
            </div>

            {!feedback && (
              <button
                type="button"
                disabled={placedTokenIndices.length === 0}
                onClick={() => {
                  const hasSpaces = currentItem.correctAnswer.includes(' ');
                  const assembled = placedTokenIndices
                    .map((idx) => currentItem.tokens![idx])
                    .join(hasSpaces ? ' ' : '');
                  handleSubmitAnswer(assembled);
                }}
                className="w-full min-h-[46px] py-2.5 rounded-xl bg-accent text-stone-950 font-bold text-xs uppercase tracking-wider shadow-xs hover:bg-accent-hot disabled:opacity-40 disabled:pointer-events-none transition-all active:scale-98 cursor-pointer"
              >
                Periksa Susunan Kalimat
              </button>
            )}
          </div>
        )}

        {/* ── Area Interaksi Pilihan Ganda (Cloze, Trap Detect, Vocab Context, Response, atau Fallback Reorder) ─ */}
        {currentItem.options && (currentItem.type !== 'reorder' || !currentItem.tokens || currentItem.tokens.length === 0) && (
          <div className="space-y-2 pt-1">
            {currentItem.options.map((opt, oIdx) => {
              const isSelected = selectedAnswer === opt;
              const isSubmitted = !!feedback;
              const isCorrectAnswer = opt === currentItem.correctAnswer;

              let btnStyle = 'bg-surface-2 hover:bg-surface-3 border-border text-appText hover:text-appText-bright';
              if (isSubmitted) {
                if (isSelected && feedback.isCorrect) {
                  btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-bold';
                } else if (isSelected && !feedback.isCorrect) {
                  btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-950 dark:text-rose-200 font-bold';
                } else if (isCorrectAnswer) {
                  btnStyle = 'border-emerald-500/60 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200 font-medium';
                } else {
                  btnStyle = 'opacity-50 bg-surface-2 border-border text-appText-muted';
                }
              } else if (isSelected) {
                btnStyle = 'bg-amber-500/15 border-amber-500 text-appText-bright shadow-xs font-bold';
              }

              return (
                <button
                  key={oIdx}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => {
                    setSelectedAnswer(opt);
                    handleSubmitAnswer(opt);
                  }}
                  className={`w-full min-h-[48px] p-3.5 sm:p-4 rounded-xl border text-left text-xs sm:text-sm font-jp transition-all flex items-center justify-between gap-3 active:scale-98 cursor-pointer card-interactive-lift ${btnStyle}`}
                >
                  <span className="break-words font-medium min-w-0 flex-1">{cleanOptionText(opt)}</span>
                  <span className="w-6 h-6 rounded-full border border-border shrink-0 flex items-center justify-center text-xs font-bold font-mono">
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                </button>
              );
            })}
            {!feedback && (
              <p className="text-xs text-appText-muted text-right font-medium pr-1">
                Tip: Tekan tombol <kbd className="px-1.5 py-0.5 rounded bg-surface-3 border border-border font-mono text-xs">1-4</kbd> atau <kbd className="px-1.5 py-0.5 rounded bg-surface-3 border border-border font-mono text-xs">A-D</kbd> di keyboard
              </p>
            )}
          </div>
        )}

        {/* ── Fallback untuk butir soal tanpa opsi & token (safety valve) ── */}
        {(!currentItem.options || currentItem.options.length === 0) && (!currentItem.tokens || currentItem.tokens.length === 0) && (
          <div className="p-4 rounded-xl bg-surface-2 border border-border text-center space-y-3">
            <p className="text-xs text-appText-muted">Butir soal konseptual. Silakan lanjutkan.</p>
            <button
              type="button"
              onClick={() => handleSubmitAnswer(currentItem.correctAnswer || 'ok')}
              className="px-4 py-2 rounded-xl bg-accent text-stone-950 font-bold text-xs uppercase tracking-wider active:scale-95 cursor-pointer shadow-xs"
            >
              Lanjut
            </button>
          </div>
        )}

        {/* ── Kartu Umpan Balik Diagnostik Instan ───────────────────── */}
        {feedback && (
          <div
            className={`p-4 rounded-2xl border space-y-3 animate-fade-in ${
              feedback.isCorrect
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-900 dark:text-emerald-300'
                : 'bg-rose-500/15 border-rose-500/40 text-rose-900 dark:text-rose-300'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              {feedback.isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                  <span>Jawaban Tepat!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-700 dark:text-rose-400" />
                  <span>Perlu Koreksi!</span>
                </>
              )}
            </div>
            <p className="text-xs leading-relaxed text-appText">
              {feedback.text}
            </p>

            <button
              type="button"
              onClick={handleNextQuestion}
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-accent text-stone-950 font-bold text-xs uppercase tracking-wider shadow-xs hover:bg-accent-hot flex items-center gap-2 ml-auto active:scale-95 cursor-pointer"
            >
              <span>Lanjut Soal Berikutnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
