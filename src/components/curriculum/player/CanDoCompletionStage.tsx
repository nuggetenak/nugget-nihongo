// ══════════════════════════════════════════════════════════════════
//  CanDoCompletionStage.tsx — Tahap 4: Verifikasi Can-Do & Retensi
//  Menyelesaikan pelajaran, klaim tuntas, dan alur ke pelajaran berikut
// ══════════════════════════════════════════════════════════════════

import React, { useEffect } from 'react';
import { CheckCircle2, Trophy, ArrowRight, BookOpen, Volume2 } from 'lucide-react';
import { CanDoChallenge, CurriculumLesson } from '../../../types/curriculum';
import { useAppStore } from '../../../store/useAppStore';
import { speakJapanese } from '../../../lib/audio/speechEngine';

interface CanDoCompletionStageProps {
  lesson: CurriculumLesson;
  drillScore: number;
  onNextLesson?: () => void;
  onBackToCatalog: () => void;
}

export const CanDoCompletionStage: React.FC<CanDoCompletionStageProps> = ({
  lesson,
  drillScore,
  onNextLesson,
  onBackToCatalog,
}) => {
  const { injectLessonItemsToFSRS, incrementXp } = useAppStore();
  const isPassed = drillScore >= 80;

  useEffect(() => {
    if (isPassed) {
      // Injeksi kosakata dan tata bahasa pelajaran ini ke antrean FSRS Beranda
      injectLessonItemsToFSRS(lesson.grammar_ids || [], lesson.vocab_ids || []);
      incrementXp(50);
    }
  }, [isPassed, lesson, injectLessonItemsToFSRS, incrementXp]);

  const challenge = lesson.can_do_challenge;

  const handlePlayModelAnswer = () => {
    if (challenge?.modelAnswer) {
      speakJapanese(challenge.modelAnswer, 1.0);
    }
  };

  return (
    <div className="space-y-6 animate-scale-in">
      {/* ── 1. Banner Skor & Status Kelulusan ────────────────────── */}
      <div
        className={`p-6 sm:p-7 rounded-3xl border text-center space-y-3.5 shadow-sm ${
          isPassed
            ? 'bg-gradient-to-br from-emerald-500/15 via-surface to-surface-2 border-emerald-500/30'
            : 'bg-surface-2 border-amber-500/30'
        }`}
      >
        <div className="w-16 h-16 rounded-3xl bg-surface border border-accent/20 flex items-center justify-center text-3xl mx-auto shadow-sm">
          {isPassed ? <Trophy className="w-8 h-8 text-amber-400" /> : <BookOpen className="w-8 h-8 text-accent" />}
        </div>

        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-accent">
            Hasil Evaluasi Pelajaran #{lesson.lesson_number}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-appText-bright">
            {isPassed ? 'Selamat, Pelajaran Tuntas!' : 'Latihan Selesai — Terus Berlatih!'}
          </h2>
          <p className="text-xs text-appText-muted max-w-md mx-auto">
            {isPassed
              ? 'Anda telah mencapai ambang kelulusan ≥ 80%. Poin kosakata dan tata bahasa telah otomatis terjadwal di FSRS.'
              : 'Skor latihan Anda belum mencapai 80%. Silakan ulas kembali materi atau ulangi latihan.'}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-surface border border-accent/20">
          <span className="text-xs text-appText-muted font-bold">Akurasi Latihan:</span>
          <span className="text-2xl font-extrabold text-accent font-mono">{drillScore}%</span>
        </div>
      </div>

      {/* ── 2. Verifikasi Can-Do Target ─────────────────────────── */}
      <div className="p-5 rounded-2xl bg-surface border border-accent/20 space-y-3 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs">
            <CheckCircle2 className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Target Capaian Komunikasi (CEFR-J Can-Do)
          </span>
        </div>

        <p className="text-sm font-semibold text-appText-bright leading-relaxed">
          🎯 {lesson.can_do_statement}
        </p>

        {challenge && (
          <div className="p-4 rounded-xl bg-surface-2 border border-accent/15 space-y-2 mt-2">
            <div className="text-xs text-appText-muted font-bold">
              Tantangan Praktik Mandiri:
            </div>
            <p className="text-xs text-appText leading-relaxed">
              {challenge.promptTask}
            </p>

            <div className="pt-2 border-t border-accent/10 flex items-start justify-between gap-2">
              <div className="min-w-0 space-y-0.5">
                <div className="text-[10px] uppercase font-bold text-appText-muted">
                  Model Jawaban Alami:
                </div>
                <div className="text-xs sm:text-sm font-jp font-semibold text-accent break-words">
                  {challenge.modelAnswer}
                </div>
                {challenge.modelAnswerId && (
                  <div className="text-[11px] text-appText-muted italic">
                    {challenge.modelAnswerId}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handlePlayModelAnswer}
                className="min-h-[36px] min-w-[36px] p-2 rounded-xl bg-surface border border-accent/20 text-accent hover:bg-surface-3 transition-colors shrink-0 flex items-center justify-center active:scale-95"
                title="Dengarkan model jawaban"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── 3. Tombol Aksi Berkelanjutan (Seamless Progression) ───── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onBackToCatalog}
          className="w-full sm:w-auto min-h-[48px] px-6 py-2.5 rounded-2xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-appText-bright text-xs font-bold transition-all active:scale-95"
        >
          ← Kembali ke Katalog Kurikulum
        </button>

        {onNextLesson && (
          <button
            type="button"
            onClick={onNextLesson}
            className="w-full sm:w-auto min-h-[48px] px-7 py-2.5 rounded-2xl bg-accent text-bg font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <span>Lanjut ke Pelajaran Berikutnya</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
