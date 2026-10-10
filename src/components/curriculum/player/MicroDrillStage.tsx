// ══════════════════════════════════════════════════════════════════
//  MicroDrillStage.tsx — Tahap 3: Latihan Tersemat di Tempat
//  100% In-Place, Zero Menu-Jumping, Umpan Balik Instan & Retry Loop
// ══════════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { LessonDrillItem } from '../../../types/curriculum';

interface MicroDrillStageProps {
  drills?: LessonDrillItem[];
  onComplete: (score: number) => void;
}

export const MicroDrillStage: React.FC<MicroDrillStageProps> = ({ drills = [], onComplete }) => {
  // Antrean soal aktif (mendukung retry loop untuk soal yang salah)
  const [activeQueue, setActiveQueue] = useState<LessonDrillItem[]>(drills);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [reorderedTokens, setReorderedTokens] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  
  // Statistik
  const [firstAttemptCorrect, setFirstAttemptCorrect] = useState<Record<string, boolean>>({});
  const [retryQueue, setRetryQueue] = useState<LessonDrillItem[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  if (!drills || drills.length === 0) {
    return (
      <div className="py-12 text-center space-y-4">
        <p className="text-appText-muted text-sm">
          Tidak ada latihan khusus pada pelajaran ini.
        </p>
        <button
          type="button"
          onClick={() => onComplete(100)}
          className="min-h-[44px] px-6 py-2.5 rounded-xl bg-accent text-bg font-bold shadow-md active:scale-95"
        >
          Lanjut ke Verifikasi Can-Do
        </button>
      </div>
    );
  }

  const currentItem = activeQueue[currentIndex];

  // Handler untuk kepingan kata pada tipe 'reorder'
  const handleToggleToken = (token: string, fromPlaced: boolean) => {
    if (feedback) return;
    if (fromPlaced) {
      setReorderedTokens((prev) => prev.filter((t, i) => i !== prev.indexOf(token)));
    } else {
      setReorderedTokens((prev) => [...prev, token]);
    }
  };

  // Submit jawaban
  const handleSubmitAnswer = (answerToTest: string) => {
    if (feedback || !currentItem) return;

    const cleanAnswer = answerToTest.trim().replace(/\s+/g, ' ');
    const cleanCorrect = currentItem.correctAnswer.trim().replace(/\s+/g, ' ');
    const isCorrect = cleanAnswer.toLowerCase() === cleanCorrect.toLowerCase();

    // Catat apakah benar pada percobaan pertama
    if (firstAttemptCorrect[currentItem.id] === undefined) {
      setFirstAttemptCorrect((prev) => ({
        ...prev,
        [currentItem.id]: isCorrect,
      }));
    }

    if (!isCorrect) {
      // Masukkan ke retry loop jika belum ada
      setRetryQueue((prev) => (prev.some((q) => q.id === currentItem.id) ? prev : [...prev, currentItem]));
    }

    setFeedback({
      isCorrect,
      text: isCorrect
        ? `Tepat sekali! ${currentItem.explanation}`
        : `Belum tepat. Jawaban yang benar adalah "${currentItem.correctAnswer}". ${currentItem.explanation}`,
    });
  };

  // Pindah ke soal berikutnya
  const handleNextQuestion = () => {
    setFeedback(null);
    setSelectedAnswer(null);
    setReorderedTokens([]);

    if (currentIndex + 1 < activeQueue.length) {
      setCurrentIndex((prev) => prev + 1);
    } else if (retryQueue.length > 0) {
      // Masuk ke putaran perbaikan (Retry Loop) untuk soal yang salah
      setActiveQueue(retryQueue);
      setRetryQueue([]);
      setCurrentIndex(0);
    } else {
      // Selesai seluruh soal! Hitung skor awal
      const totalInitial = drills.length;
      const totalCorrectFirstTry = Object.values(firstAttemptCorrect).filter(Boolean).length;
      const finalScore = Math.max(0, Math.min(100, Math.round((totalCorrectFirstTry / totalInitial) * 100)));

      setIsFinished(true);
      onComplete(finalScore);
    }
  };

  if (isFinished) {
    const totalInitial = drills.length;
    const totalCorrectFirstTry = Object.values(firstAttemptCorrect).filter(Boolean).length;
    const finalScore = Math.round((totalCorrectFirstTry / totalInitial) * 100);

    return (
      <div className="py-10 text-center space-y-4 bg-surface-2 rounded-3xl border border-accent/20 p-6 animate-scale-in">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-3xl mx-auto">
          <Sparkles className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-appText-bright">Latihan Tersemat Selesai!</h3>
          <p className="text-xs text-appText-muted">
            Seluruh butir soal telah dijawab dan dipahami dengan tuntas.
          </p>
        </div>
        <div className="text-3xl font-extrabold text-accent font-mono">
          {finalScore}%
        </div>
        <p className="text-xs text-appText">
          {finalScore >= 80 ? '🎉 Anda memenuhi ambang batas kelulusan (≥ 80%)!' : '💪 Tetap semangat, silakan ulas kembali materi jika perlu.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ── Progress Counter Bilah Atas ──────────────────────────── */}
      <div className="flex items-center justify-between text-xs text-appText-muted font-bold">
        <span>
          Latihan Soal #{currentIndex + 1} dari {activeQueue.length}
        </span>
        {retryQueue.length > 0 && (
          <span className="text-amber-400 flex items-center gap-1 text-[11px]">
            <RotateCcw className="w-3 h-3" />
            Putaran Koreksi: {retryQueue.length} Soal
          </span>
        )}
      </div>

      {/* ── Kartu Soal Utama ─────────────────────────────────────── */}
      <div className="p-5 sm:p-6 rounded-3xl bg-surface border border-accent/25 space-y-5 shadow-sm">
        <div className="space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
            {currentItem.type === 'trap_detect' ? (
              <span className="text-red-400 font-extrabold">⚠️ Spot the Edge Case</span>
            ) : currentItem.type === 'reorder' ? (
              <span>🧩 Susun Kepingan Kata</span>
            ) : (
              <span>📝 Pilihan Partikel & Kosakata</span>
            )}
          </div>
          <h3 className="text-sm sm:text-base font-bold text-appText-bright leading-relaxed">
            {currentItem.instruction}
          </h3>
          {currentItem.sentencePrompt && (
            <div className="p-3 rounded-2xl bg-surface-2 border border-accent/15 text-sm sm:text-base font-jp font-semibold text-appText-bright mt-2">
              {currentItem.sentencePrompt}
            </div>
          )}
        </div>

        {/* ── Area Interaksi Tipe Reorder ─────────────────────────── */}
        {currentItem.type === 'reorder' && currentItem.tokens && (
          <div className="space-y-4">
            {/* Slot Kalimat yang Tersusun */}
            <div className="min-h-[56px] p-3 rounded-2xl bg-surface-2/80 border-2 border-dashed border-accent/30 flex flex-wrap items-center gap-2">
              {reorderedTokens.length === 0 ? (
                <span className="text-xs text-appText-muted italic">
                  Ketuk kepingan kata di bawah untuk menyusun kalimat...
                </span>
              ) : (
                reorderedTokens.map((token, tIdx) => (
                  <button
                    key={tIdx}
                    type="button"
                    onClick={() => handleToggleToken(token, true)}
                    className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-accent text-bg font-jp font-bold text-sm shadow-sm active:scale-95"
                  >
                    {token} ✕
                  </button>
                ))
              )}
            </div>

            {/* Kepingan Kata yang Tersedia */}
            <div className="flex flex-wrap gap-2 pt-1">
              {currentItem.tokens
                .filter((t) => !reorderedTokens.includes(t))
                .map((token, tIdx) => (
                  <button
                    key={tIdx}
                    type="button"
                    onClick={() => handleToggleToken(token, false)}
                    className="min-h-[44px] px-4 py-2 rounded-xl bg-surface-3 hover:bg-surface border border-accent/20 text-appText-bright font-jp font-bold text-sm transition-all active:scale-95"
                  >
                    {token}
                  </button>
                ))}
            </div>

            {!feedback && (
              <button
                type="button"
                disabled={reorderedTokens.length === 0}
                onClick={() => handleSubmitAnswer(reorderedTokens.join(' '))}
                className="w-full min-h-[46px] py-2.5 rounded-xl bg-accent text-bg font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-110 disabled:opacity-40 disabled:pointer-events-none transition-all active:scale-98"
              >
                Periksa Susunan Kalimat
              </button>
            )}
          </div>
        )}

        {/* ── Area Interaksi Pilihan Ganda (Cloze & Trap Detect) ───── */}
        {currentItem.options && currentItem.type !== 'reorder' && (
          <div className="space-y-2 pt-1">
            {currentItem.options.map((opt, oIdx) => {
              const isSelected = selectedAnswer === opt;
              return (
                <button
                  key={oIdx}
                  type="button"
                  disabled={!!feedback}
                  onClick={() => {
                    setSelectedAnswer(opt);
                    handleSubmitAnswer(opt);
                  }}
                  className={`w-full min-h-[48px] p-3.5 sm:p-4 rounded-2xl border text-left text-xs sm:text-sm font-jp transition-all flex items-center justify-between gap-3 active:scale-98 ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500 text-appText-bright shadow-sm font-bold'
                      : 'bg-surface-2 hover:bg-surface-3 border-accent/15 text-appText hover:text-appText-bright'
                  }`}
                >
                  <span className="break-words">{opt}</span>
                  <span className="w-5 h-5 rounded-full border border-accent/20 shrink-0 flex items-center justify-center text-[10px]">
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* ── Kartu Umpan Balik Instan ─────────────────────────────── */}
        {feedback && (
          <div
            className={`p-4 rounded-2xl border space-y-3 animate-fade-in ${
              feedback.isCorrect
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                : 'bg-red-500/15 border-red-500/40 text-red-300'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              {feedback.isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Jawaban Tepat!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-400" />
                  <span>Perlu Diperbaiki!</span>
                </>
              )}
            </div>
            <p className="text-xs leading-relaxed text-appText">
              {feedback.text}
            </p>

            <button
              type="button"
              onClick={handleNextQuestion}
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-accent text-bg font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-110 flex items-center gap-2 ml-auto active:scale-95"
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
