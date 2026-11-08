// ══════════════════════════════════════════════════════════════════
//  CanDoCompletionStage.tsx — Tahap 4: Tantangan Nyata & Rangkuman Saku
//  Menuntaskan Pelajaran, Skill Unlocked, Pocket Summary & Alur Lanjut
// ══════════════════════════════════════════════════════════════════

import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Trophy,
  ArrowRight,
  BookOpen,
  Volume2,
  Award,
  FileText,
  Sparkles,
  HeartHandshake,
  Lock,
} from 'lucide-react';
import { CurriculumLesson } from '../../../types/curriculum';
import { useAppStore } from '../../../store/useAppStore';
import { speakJapanese } from '../../../lib/audio/speechEngine';
import { RubyText } from '../../ui/RubyText';
import { IrasutoyaImage } from '../../common/IrasutoyaImage';

interface CanDoCompletionStageProps {
  lesson: CurriculumLesson;
  drillScore: number | null;
  onNextLesson?: () => void;
  onBackToCatalog: () => void;
}

export const CanDoCompletionStage: React.FC<CanDoCompletionStageProps> = ({
  lesson,
  drillScore,
  onNextLesson,
  onBackToCatalog,
}) => {
  const { completedLessonIds, completeLesson } = useAppStore();
  const awardedSet = new Set(completedLessonIds);
  const isLessonPreviouslyCompleted = Boolean(lesson?.id && awardedSet.has(lesson.id));
  const isPassed = isLessonPreviouslyCompleted || (drillScore !== null && drillScore >= 80);
  const [showPocketSummary, setShowPocketSummary] = useState(true);

  // Ticket T-48 & Ticket T-196: Eradicate Infinite XP Exploit & Implement Deduplicated Lesson Completion
  // Uses persistent completed lessons registry ('nn_completed_lesson_xp_ids') to ensure incrementXp(50) only fires once
  useEffect(() => {
    if (isPassed && lesson?.id && !awardedSet.has(lesson.id)) {
      completeLesson(lesson.id, lesson.grammar_ids || [], lesson.vocab_ids || []);
    }
  }, [isPassed, lesson?.id, completedLessonIds, completeLesson]);

  if (!isPassed) {
    return (
      <div className="py-12 px-4 text-center space-y-4 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 flex items-center justify-center mx-auto shadow-sm relative">
          <IrasutoyaImage assetId="senpai_studying" animateFloat className="w-12 h-12 object-contain" alt="Senpai Belajar" />
          <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-surface border border-amber-500/30 text-amber-700 dark:text-amber-400">
            <Lock className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-appText-bright">Tahap 4 Terkunci</h3>
          <p className="text-xs text-appText-muted leading-relaxed">
            Kamu harus menyelesaikan latihan Cek Pemahaman di Tahap 3 dengan skor kelulusan minimal <strong>80%</strong> untuk membuka Tantangan Nyata &amp; menyimpan kosakata ke FSRS.
          </p>
        </div>
        <div className="pt-2">
          <button
            type="button"
            onClick={onBackToCatalog}
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border-theme text-xs font-bold text-appText-bright active:scale-95 card-interactive-lift"
          >
            Kembali ke Kurikulum
          </button>
        </div>
      </div>
    );
  }

  const challenge = lesson.can_do_challenge;
  const pocketSummary = lesson.pocket_summary || challenge?.pocketSummary;
  const skillUnlocked = challenge?.skillUnlocked || [
    lesson.can_do_statement,
    `Menguasai pola ${lesson.title_jp}`,
    'Memahami etika percakapan dasar Jepang',
  ];

  const handlePlayModelAnswer = () => {
    if (challenge?.modelAnswer) {
      speakJapanese(challenge.modelAnswer, 1.0);
    }
  };

  return (
    <div className="space-y-6 animate-scale-in min-w-0">
      {/* ── 1. Banner Skor & Status Kelulusan ────────────────────── */}
      <div
        className={`p-6 sm:p-7 rounded-3xl border text-center space-y-3.5 shadow-sm card-interactive-lift ${
          isPassed
            ? 'bg-gradient-to-br from-emerald-500/15 via-surface to-surface-2 border-emerald-500/30'
            : 'bg-surface-2 border-amber-500/30'
        }`}
      >
        <div className="w-16 h-16 rounded-3xl bg-surface border border-accent/20 flex items-center justify-center mx-auto shadow-sm">
          <IrasutoyaImage
            assetId={isPassed ? 'hanko_excellent' : 'daruma_recovery'}
            animatePop
            className="w-12 h-12 object-contain"
            alt={isPassed ? 'Taihen Yoku Dekimashita' : 'Daruma Pemulihan'}
          />
        </div>

        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
            Hasil Evaluasi Pelajaran #{lesson.lesson_number}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-appText-bright">
            {isPassed ? 'Selamat, Misi Pelajaran Tuntas!' : 'Latihan Selesai — Terus Berlatih!'}
          </h2>
          <p className="text-xs text-appText-muted max-w-md mx-auto leading-relaxed">
            {isPassed
              ? 'Kamu telah mencapai ambang pemahaman ≥ 80%. Butir kosakata dan tata bahasa pelajaran ini telah otomatis dijadwalkan di sistem pengulangan berkala FSRS.'
              : 'Skor latihan kamu belum mencapai 80%. Silakan ulas kembali materi atau ulangi latihan agar pemahaman semakin kokoh.'}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-surface border border-accent/20">
          <span className="text-xs text-appText-muted font-bold">Akurasi Cek Pemahaman:</span>
          <span className="text-2xl font-extrabold text-accent font-mono">{drillScore !== null ? `${drillScore}%` : '—'}</span>
        </div>
      </div>

      {/* ── 2. Tantangan Nyata (Real Communicative Challenge) ──────── */}
      <div className="p-5 sm:p-6 rounded-3xl bg-surface border border-accent/20 space-y-4 shadow-sm card-interactive-lift">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs">
            <CheckCircle2 className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
            Target Kemampuan Nyata
          </span>
        </div>

        <div className="text-sm sm:text-base font-bold text-appText-bright leading-relaxed">
          🎯 {lesson.can_do_statement}
        </div>

        {challenge && (
          <div className="p-4 sm:p-5 rounded-2xl bg-surface-2 border border-accent/15 space-y-3 card-interactive-lift">
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Misi Praktik Mandiri:</span>
              </div>
              <p className="text-xs sm:text-sm text-appText leading-relaxed">
                {challenge.promptTask}
              </p>
            </div>

            {/* Model Jawaban Alami */}
            <div className="pt-2 border-t border-accent/10 flex items-start justify-between gap-3">
              <div className="min-w-0 space-y-1">
                <div className="text-xs uppercase font-bold text-appText-muted">
                  Model Jawaban Alami & Sopan:
                </div>
                <div className="text-sm sm:text-base font-jp font-bold text-accent break-words">
                  {challenge.modelAnswer}
                </div>
                {challenge.modelAnswerId && (
                  <div className="text-xs text-appText-muted italic">
                    {challenge.modelAnswerId}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handlePlayModelAnswer}
                className="min-h-[40px] min-w-[40px] p-2 rounded-xl bg-surface border border-accent/20 text-accent hover:bg-surface-3 transition-colors shrink-0 flex items-center justify-center active:scale-95 card-interactive-lift"
                title="Dengarkan model jawaban alami"
                aria-label="Dengarkan model jawaban alami"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Catatan Etika Budaya Tambahan */}
            {challenge.culturalEtiquette && (
              <div className="pt-2 border-t border-accent/10 text-xs text-amber-950 dark:text-amber-200 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 flex items-start gap-2">
                <HeartHandshake className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-900 dark:text-amber-300 font-bold">Etika Komunikasi:</strong> {challenge.culturalEtiquette}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── 3. Lencana Kemampuan Terbuka (Skill Unlocked) ──────────── */}
      {skillUnlocked && skillUnlocked.length > 0 && (
        <div className="p-5 rounded-3xl bg-surface border border-accent/20 space-y-3 shadow-sm card-interactive-lift">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-800 dark:text-amber-300 text-xs">
              <Award className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              Kemampuan yang Baru Terbuka (Skill Unlocked)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {skillUnlocked.map((skill, sIdx) => (
              <div
                key={sIdx}
                className="p-3 rounded-xl bg-surface-2 border border-accent/15 flex items-center gap-2.5 text-xs text-appText-bright font-medium card-interactive-lift"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                <span className="break-words">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 4. Rangkuman Saku Pelajaran (Pocket Cheat Sheet) ───────── */}
      {pocketSummary && (
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-surface via-surface-2 to-amber-500/10 border border-accent/25 space-y-3.5 shadow-sm card-interactive-lift">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-accent/20 text-accent text-xs">
                <FileText className="w-4 h-4" />
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
                  Rangkuman Saku Pelajaran
                </span>
                <span className="text-xs text-appText-muted">
                  Kartu contekan cepat untuk review 30 detik sebelum tidur
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowPocketSummary(!showPocketSummary)}
              className="text-xs text-accent hover:underline font-bold px-3 py-1.5 min-h-[40px] inline-flex items-center active:scale-95"
            >
              {showPocketSummary ? 'Sembunyikan' : 'Buka'}
            </button>
          </div>

          {showPocketSummary && (
            <div className="space-y-3 pt-2 text-xs animate-fade-in">
              {/* Rumus Utama */}
              <div className="p-3 rounded-2xl bg-surface border border-accent/20 space-y-1 card-interactive-lift">
                <span className="text-xs font-bold uppercase tracking-wider text-appText-muted block">
                  Rumus Utama:
                </span>
                <div className="font-mono text-xs sm:text-sm font-bold text-accent break-words">
                  {pocketSummary.keyFormula}
                </div>
              </div>

              {/* 3 Kata Kunci */}
              {pocketSummary.coreWords && pocketSummary.coreWords.length > 0 && (
                <div className="p-3 rounded-2xl bg-surface border border-accent/20 space-y-1.5 card-interactive-lift">
                  <span className="text-xs font-bold uppercase tracking-wider text-appText-muted block">
                    Kosakata Kunci:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {pocketSummary.coreWords.map((cw, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2.5 py-1 rounded-lg bg-surface-2 border border-accent/15 text-appText-bright font-jp font-semibold text-xs inline-flex items-center"
                      >
                        <RubyText text={cw} />
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Peringatan Utama */}
              {pocketSummary.coreWarning && (
                <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-rose-950 dark:text-rose-200 space-y-0.5 card-interactive-lift">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 block">
                    ⚠️ Waspada Utama:
                  </span>
                  <p className="leading-relaxed">{pocketSummary.coreWarning}</p>
                </div>
              )}

              {/* Dialog Singkat */}
              {pocketSummary.quickDialogue && (
                <div className="p-3 rounded-2xl bg-surface border border-accent/20 space-y-1 card-interactive-lift">
                  <span className="text-xs font-bold uppercase tracking-wider text-appText-muted block">
                    Mini Percakapan Kunci:
                  </span>
                  <p className="font-jp text-appText-bright leading-relaxed italic">
                    "{pocketSummary.quickDialogue}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── 5. Tombol Aksi Berkelanjutan (Seamless Progression) ───── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onBackToCatalog}
          className="w-full sm:w-auto min-h-[48px] px-6 py-2.5 rounded-2xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-appText-bright text-xs font-bold transition-all active:scale-95 card-interactive-lift"
        >
          ← Kembali ke Katalog Kurikulum
        </button>

        {onNextLesson && (
          <button
            type="button"
            onClick={onNextLesson}
            className="w-full sm:w-auto min-h-[48px] px-7 py-2.5 rounded-2xl bg-accent text-bg font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-2 transition-all active:scale-95 card-interactive-lift"
          >
            <span>Lanjut ke Pelajaran Berikutnya</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
