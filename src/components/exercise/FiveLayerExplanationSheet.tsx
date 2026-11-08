// ══════════════════════════════════════════════════════════════════
//  FiveLayerExplanationSheet.tsx — 5-Layer Pedagogical Deep-Dive Sheet
//  Research Basis: ADR-014, The 5-Layer Pedagogical Explanation Standard
//  Justification, Distractor Autopsy, Sensei Mnemonic, L1 Alert, Remedial
// ══════════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  AlertTriangle,
  BookOpen,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  BookmarkPlus,
  Check,
} from 'lucide-react';
import { ExerciseItem } from '../../types/exercise';
import { useAppStore } from '../../store/useAppStore';
import { IrasutoyaImage } from '../common/IrasutoyaImage';
import { resolveDistractorLabel } from '../../lib/exercise/dokkaiExplainer';

interface FiveLayerExplanationSheetProps {
  item: ExerciseItem;
  userAnswerIndex?: number;
  className?: string;
}

export const FiveLayerExplanationSheet: React.FC<FiveLayerExplanationSheetProps> = ({
  item,
  userAnswerIndex,
  className = '',
}) => {
  const { openLessonStudy, showToast, setCard, cards } = useAppStore();
  const [isSavedToFsrs, setIsSavedToFsrs] = useState(false);

  if (!item || !item.explanation) return null;

  const exp = item.explanation;
  const options = Array.isArray(item.options) ? item.options : [];
  const isCorrect = userAnswerIndex !== undefined && userAnswerIndex === item.correctOptionIndex;
  const correctOptionText = options[item.correctOptionIndex] || '';
  const optionLetters = ['A', 'B', 'C', 'D'];

  // Handle 1-Tap save to FSRS
  const handleSaveToFsrs = () => {
    const cardId = `exercise_${item.id.toLowerCase()}`;
    const targetWord = item.targetWord || correctOptionText || item.prompt;

    // Build FSRS card item
    const nowIso = new Date().toISOString();
    const newCard = {
      card: {
        due: nowIso,
        stability: 1.0,
        difficulty: 5.0,
        elapsed_days: 0,
        scheduled_days: 1,
        reps: 0,
        lapses: 0,
        state: 0 as any, // New
        last_review: nowIso,
      },
      source: `CBT:${item.id}`,
    };

    setCard(cardId, newCard);
    setIsSavedToFsrs(true);
    showToast(`"${targetWord}" berhasil ditambahkan ke antrean FSRS harian! ⭐`, '⭐');
  };

  // Handle open MateriHub unit
  const handleOpenCurriculum = () => {
    const ref = item.curriculumRef;
    if (ref && ref.unitId) {
      openLessonStudy(ref.trackId || 'curriculum-n5', ref.unitId, ref.lessonId || 'l01');
    }
  };

  return (
    <div className={`space-y-4 sm:space-y-5 animate-in fade-in duration-300 ${className}`}>
      {/* ── STATUS BANNER (BENAR / SALAH) ─────────────────────────── */}
      <div
        className={`card-interactive-lift p-4 sm:p-5 rounded-2xl sm:rounded-3xl border-2 flex items-center justify-between gap-3 shadow-sm ${
          isCorrect
            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-800 dark:text-emerald-300 font-bold'
            : 'bg-rose-500/10 border-rose-500/40 text-rose-800 dark:text-rose-300 font-bold'
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="shrink-0">
            {isCorrect ? (
              <IrasutoyaImage
                assetId="sensei_praise"
                className="w-11 h-11"
                containerClassName="w-11 h-11 shrink-0"
                animatePop
              />
            ) : (
              <IrasutoyaImage
                assetId="sensei_thinking"
                className="w-11 h-11"
                containerClassName="w-11 h-11 shrink-0"
                animateFloat
              />
            )}
          </div>
          <div className="min-w-0">
            <h4 className="text-sm sm:text-base font-extrabold tracking-tight truncate">
              {isCorrect ? 'Jawaban Kamu Tepat! (正解) 🎉' : 'Kurang Tepat (不正解) 💡'}
            </h4>
            <p className="text-xs text-appText-muted mt-0.5 truncate">
              Kunci Benar: <strong className="text-appText-bright font-mono">{optionLetters[item.correctOptionIndex]}. {correctOptionText}</strong>
              {userAnswerIndex !== undefined && !isCorrect && (
                <span> (Kamu memilih: {optionLetters[userAnswerIndex]})</span>
              )}
            </p>
          </div>
        </div>

        {/* 1-Tap FSRS Ingestion Button */}
        <button
          type="button"
          onClick={handleSaveToFsrs}
          disabled={isSavedToFsrs}
          className={`min-h-[40px] px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shrink-0 shadow-sm ${
            isSavedToFsrs
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-800 dark:text-emerald-300 font-bold cursor-default'
              : 'bg-surface hover:bg-surface-2 border-theme text-appText-bright'
          }`}
          title="Simpan butir materi ini ke hafalan ilmiah FSRS"
        >
          {isSavedToFsrs ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Tersimpan di FSRS</span>
            </>
          ) : (
            <>
              <BookmarkPlus className="w-3.5 h-3.5 text-amber-400" />
              <span>Simpan FSRS</span>
            </>
          )}
        </button>
      </div>

      {/* ── LAPIS 1: ALASAN KUNCI BENAR (DIRECT JUSTIFICATION) ──────── */}
      <div className="card-interactive-lift bg-emerald-500/5 border border-emerald-500/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-black text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Lapis 1: Alasan Kunci Benar (Justifikasi)</span>
        </div>
        <p className="text-xs sm:text-sm text-appText-bright leading-relaxed">
          {exp.justification}
        </p>
      </div>

      {/* ── LAPIS 2: BEDAH DISTRAKTOR (DISTRACTOR AUTOPSY) ──────────── */}
      {exp.distractorAutopsy && Object.keys(exp.distractorAutopsy).length > 0 && (
        <div className="card-interactive-lift bg-surface border border-theme rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-black text-rose-800 dark:text-rose-400 uppercase tracking-wider">
            <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span>Lapis 2: Bedah Opsi Salah (Bedah Distraktor)</span>
          </div>
          <div className="space-y-2.5 pt-1">
            {Object.entries(exp.distractorAutopsy).map(([key, reason]) => {
              const { letter, text: optionText } = resolveDistractorLabel(key, options);

              return (
                <div
                  key={key}
                  className="p-3 rounded-xl bg-surface-2/60 border border-theme/60 flex items-start gap-2.5 text-xs sm:text-sm"
                >
                  <span className="w-5 h-5 rounded-md bg-rose-500/20 text-rose-700 dark:text-rose-400 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {letter}
                  </span>
                  <div className="min-w-0 flex-1 leading-relaxed text-appText-muted">
                    {optionText && (
                      <span className="font-bold text-appText-bright font-japanese mr-1">
                        "{optionText}":
                      </span>
                    )}
                    <span>{reason}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── LAPIS 3: MNEMONIK SENSEI NUGGET ─────────────────────────── */}
      {exp.mnemonicSensei && (
        <div className="card-interactive-lift bg-amber-500/10 border border-amber-500/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-black text-amber-800 dark:text-amber-400 uppercase tracking-wider">
            <IrasutoyaImage assetId="sensei_thinking" className="w-5 h-5" containerClassName="w-5 h-5 shrink-0" animateFloat />
            <span>Lapis 3: Jembatan Ingatan Sensei Nugget (Mnemonik)</span>
          </div>
          <p className="text-xs sm:text-sm text-appText-bright leading-relaxed italic bg-surface/50 p-3.5 rounded-xl border border-amber-500/20">
            "{exp.mnemonicSensei}"
          </p>
        </div>
      )}

      {/* ── LAPIS 4: PERINGATAN INTERFERENSI BAHASA INDONESIA (L1) ──── */}
      {exp.l1InterferenceAlert && (
        <div className="card-interactive-lift bg-orange-500/10 border border-orange-500/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-black text-orange-800 dark:text-orange-400 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span>Lapis 4: Peringatan Interferensi Bahasa Indonesia (L1 Alert)</span>
          </div>
          <p className="text-xs sm:text-sm text-appText-bright leading-relaxed">
            {exp.l1InterferenceAlert}
          </p>
        </div>
      )}

      {/* ── SSW K3 SAFETY TIP (KHUSUS VOKASIONAL) ───────────────────── */}
      {exp.safetyTip && (
        <div className="card-interactive-lift bg-rose-500/10 border border-rose-500/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-black text-rose-800 dark:text-rose-400 uppercase tracking-wider">
            <IrasutoyaImage assetId="ssw_construction" className="w-5 h-5" containerClassName="w-5 h-5 shrink-0" />
            <span>Regulasi Keselamatan Kerja Gemba K3 (Kementerian Jepang)</span>
          </div>
          <p className="text-xs sm:text-sm text-appText-bright leading-relaxed font-medium">
            {exp.safetyTip}
          </p>
        </div>
      )}

      {/* ── LAPIS 5: PRESKRIPSI REMEDIAL & MATERIHUB BRIDGE ─────────── */}
      {exp.remedialPrescription && (
        <div className="card-interactive-lift bg-gradient-to-r from-cyan-500/10 via-surface to-surface-2 border border-cyan-500/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-3.5">
          <div className="flex items-center gap-2 text-xs font-black text-cyan-800 dark:text-cyan-400 uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Lapis 5: Preskripsi Remedial & Rujukan MateriHub</span>
          </div>

          <p className="text-xs sm:text-sm text-appText-bright leading-relaxed">
            {exp.remedialPrescription.advice}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs font-bold text-appText-muted truncate">
              Rujukan Modul: <span className="text-appText-bright font-mono">Unit {exp.remedialPrescription.unitNumber}: {exp.remedialPrescription.unitTitleId}</span>
            </div>

            <button
              type="button"
              onClick={handleOpenCurriculum}
              className="min-h-[42px] px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm shrink-0"
            >
              <span>Pelajari Modul Ini</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
