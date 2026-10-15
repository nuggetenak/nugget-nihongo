// ══════════════════════════════════════════════════════════════════
//  LessonStudyPage.tsx — Dedicated Full-Page Study Studio
//  100% In-Place, Zero Menu-Jumping, Stepper 4-Tahap, & Seamless Flow
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  BookOpen,
  MessageSquare,
  HelpCircle,
  Trophy,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useCurriculumStore, TrackId } from '../lib/curriculum/curriculumStore';
import { loadCurriculumTrack, loadGrammar, loadVocab } from '../lib/data/dataManager';
import { getAdaptiveLessonContent } from '../lib/curriculum/lessonContentAdapter';
import { CurriculumLesson } from '../types/curriculum';
import { DialogueStage } from '../components/curriculum/player/DialogueStage';
import { ExplanationStage } from '../components/curriculum/player/ExplanationStage';
import { MicroDrillStage } from '../components/curriculum/player/MicroDrillStage';
import { CanDoCompletionStage } from '../components/curriculum/player/CanDoCompletionStage';

export const LessonStudyPage: React.FC = () => {
  const { activeLessonContext, closeLessonStudy, openLessonStudy } = useAppStore();
  const { trackProgress, completeLesson } = useCurriculumStore();

  const [activeStage, setActiveStage] = useState<'dialogue' | 'explanation' | 'drills' | 'cando'>('dialogue');
  const [currentLesson, setCurrentLesson] = useState<CurriculumLesson | null>(null);
  const [currentUnit, setCurrentUnit] = useState<any>(null);
  const [trackData, setTrackData] = useState<any>(null);
  const [drillScore, setDrillScore] = useState<number>(100);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const trackId = (activeLessonContext?.trackId || 'n5') as TrackId;
  const unitId = activeLessonContext?.unitId || '';
  const lessonId = activeLessonContext?.lessonId || '';

  // Muat data track dan pelajaran aktif
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setNotFound(false);

    const loadContent = async () => {
      try {
        const targetTrackId = trackId as any;
        const rawTrack = await loadCurriculumTrack(targetTrackId);
        if (!isMounted) return;

        setTrackData(rawTrack);

        // Cari unit dan lesson secara ketat bila ID ditentukan (F-10)
        const foundUnit = unitId
          ? rawTrack?.units?.find((u: any) => u.id === unitId)
          : rawTrack?.units?.[0];

        if (unitId && !foundUnit) {
          if (isMounted) setNotFound(true);
          return;
        }

        const foundLesson = lessonId
          ? foundUnit?.lessons?.find((l: any) => l.id === lessonId)
          : foundUnit?.lessons?.[0];

        if (lessonId && !foundLesson) {
          if (isMounted) setNotFound(true);
          return;
        }

        setCurrentUnit(foundUnit);

        if (foundLesson) {
          const isSsw = trackId?.includes('ssw');
          const jlptLevel = (['n5', 'n4', 'n3', 'n2', 'n1'].includes(trackId) ? trackId : (isSsw ? 'n4' : 'n5')) as any;
          const [grammarList, vocabList] = await Promise.all([
            loadGrammar(jlptLevel).catch(() => []),
            isSsw
              ? Promise.all([loadVocab(trackId).catch(() => []), loadVocab('n4').catch(() => [])]).then(([vSsw, vN4]) => [...vSsw, ...vN4])
              : loadVocab(jlptLevel).catch(() => []),
          ]);

          if (!isMounted) return;

          const adaptedLesson = getAdaptiveLessonContent(
            trackId,
            foundUnit,
            foundLesson,
            grammarList,
            vocabList
          );
          setCurrentLesson(adaptedLesson);

          // Cek skor sebelumnya jika pernah selesai
          const prevScore = trackProgress[trackId]?.lessonScores?.[foundLesson.id] || 100;
          setDrillScore(prevScore);
        }
      } catch (err) {
        console.error('[LessonStudyPage] Failed to load lesson data:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadContent();
    return () => {
      isMounted = false;
    };
  }, [trackId, unitId, lessonId, trackProgress]);

  // Cek apakah pelajaran ini sudah pernah tuntas
  const isLessonDone =
    currentLesson &&
    trackProgress[trackId]?.completedLessons?.includes(currentLesson.id);

  // Navigasi langkah internal
  const stages: Array<{
    id: 'dialogue' | 'explanation' | 'drills' | 'cando';
    label: string;
    shortLabel: string;
    icon: React.ReactNode;
  }> = [
    { id: 'dialogue', label: '1. Dialog Otentik', shortLabel: '1. Dialog', icon: <MessageSquare className="w-4 h-4 shrink-0" /> },
    { id: 'explanation', label: '2. Bedah Materi & Pola', shortLabel: '2. Bedah', icon: <BookOpen className="w-4 h-4 shrink-0" /> },
    { id: 'drills', label: '3. Cek Pemahaman', shortLabel: '3. Kuis', icon: <HelpCircle className="w-4 h-4 shrink-0" /> },
    { id: 'cando', label: '4. Tantangan Nyata', shortLabel: '4. Can-Do', icon: <Trophy className="w-4 h-4 shrink-0" /> },
  ];

  // Handler saat latihan selesai
  const handleDrillComplete = (score: number) => {
    setDrillScore(score);
    if (currentLesson && currentUnit) {
      if (score >= 80) {
        completeLesson(trackId, currentUnit.id, currentLesson.id, score, 50);
      }
    }
    // Otomatis arahkan ke tahap Can-Do
    setActiveStage('cando');
  };

  // Cari pelajaran berikutnya dalam unit/track yang sama
  const findNextLesson = (): { unitId: string; lessonId: string } | null => {
    if (!trackData?.units || !currentUnit || !currentLesson) return null;

    const unitLessons = currentUnit.lessons || [];
    const currentLessonIndex = unitLessons.findIndex((l: any) => l.id === currentLesson.id);

    // 1. Jika masih ada pelajaran di unit yang sama
    if (currentLessonIndex >= 0 && currentLessonIndex + 1 < unitLessons.length) {
      return {
        unitId: currentUnit.id,
        lessonId: unitLessons[currentLessonIndex + 1].id,
      };
    }

    // 2. Jika unit ini selesai, cari pelajaran pertama di unit berikutnya
    const currentUnitIndex = trackData.units.findIndex((u: any) => u.id === currentUnit.id);
    if (currentUnitIndex >= 0 && currentUnitIndex + 1 < trackData.units.length) {
      const nextUnit = trackData.units[currentUnitIndex + 1];
      if (nextUnit.lessons && nextUnit.lessons.length > 0) {
        return {
          unitId: nextUnit.id,
          lessonId: nextUnit.lessons[0].id,
        };
      }
    }

    return null;
  };

  const nextLessonInfo = findNextLesson();

  const handleNextLesson = () => {
    if (nextLessonInfo) {
      setActiveStage('dialogue');
      openLessonStudy(trackId, nextLessonInfo.unitId, nextLessonInfo.lessonId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      closeLessonStudy();
    }
  };

  if (isLoading) {
    return (
      <div className="py-24 text-center space-y-4">
        <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-appText-muted animate-pulse">
          Memuat studio materi pelajaran... 📖
        </p>
      </div>
    );
  }

  if (notFound || !currentLesson) {
    return (
      <div className="w-full max-w-xl mx-auto py-16 px-4 text-center space-y-5 animate-fade-in">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto text-2xl shadow-sm">
          🔍
        </div>
        <div className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-appText-bright">
            Materi Pelajaran Tidak Ditemukan
          </h2>
          <p className="text-xs sm:text-sm text-appText-muted max-w-md mx-auto">
            Pelajaran dengan ID <code className="px-1.5 py-0.5 rounded bg-surface-2 text-accent font-mono">{lessonId || unitId || 'terpilih'}</code> tidak ditemukan dalam kurikulum jalur ini, atau tautan telah diperbarui.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={closeLessonStudy}
            className="min-h-[44px] px-4 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-surface-0 text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Silabus Track
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5 pb-12 animate-fade-in min-w-0 overflow-x-hidden">
      {/* ── 1. HEADER STUDIO BELAJAR FOKUS ───────────────────────── */}
      <div className="p-4 sm:p-5 rounded-3xl bg-surface border border-accent/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={closeLessonStudy}
            className="min-h-[44px] min-w-[44px] p-2.5 rounded-2xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-appText-muted hover:text-appText-bright transition-colors flex items-center justify-center shrink-0 active:scale-95"
            title="Kembali ke Katalog Materi Hub"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="min-w-0 space-y-0.5">
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold">
              <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-accent border border-amber-500/25 uppercase">
                {trackId.toUpperCase()} · Unit {currentUnit?.unit_number}
              </span>
              <span className="text-appText-muted">Pelajaran #{currentLesson.lesson_number}</span>
              {isLessonDone && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 text-[10px] font-extrabold">
                  <CheckCircle2 className="w-3 h-3" />
                  Tuntas ({drillScore}%)
                </span>
              )}
            </div>

            <h1 className="text-base sm:text-xl font-extrabold text-appText-bright tracking-tight break-words">
              {currentLesson.title_id}
            </h1>
            <div className="text-xs text-appText-muted font-jp font-medium">
              {currentLesson.title_jp}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={closeLessonStudy}
          className="text-xs font-bold text-accent hover:underline hidden sm:block shrink-0 px-2 py-1"
        >
          Tutup & Kembali
        </button>
      </div>

      {/* ── 2. BILAH STEPPER 4-TAHAP INTERAKTIF (RESPONSIF & ANTI-TABRAKAN) ───── */}
      <div className="grid grid-cols-4 gap-1 sm:gap-2 p-1 sm:p-1.5 bg-surface rounded-2xl border border-accent/20 shadow-sm w-full max-w-full overflow-hidden">
        {stages.map((st) => {
          const isActive = activeStage === st.id;
          return (
            <button
              key={st.id}
              type="button"
              onClick={() => setActiveStage(st.id)}
              className={`min-w-0 flex-1 min-h-[44px] px-1 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 overflow-hidden active:scale-95 ${
                isActive
                  ? 'bg-accent text-bg shadow-sm font-extrabold'
                  : 'text-appText-muted hover:text-appText-bright hover:bg-surface-2'
              }`}
            >
              <span className="shrink-0">{st.icon}</span>
              <span className="min-w-0 truncate text-[11px] sm:text-xs">
                <span className="sm:hidden">{st.shortLabel}</span>
                <span className="hidden sm:inline">{st.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* ── 3. PANEL TAHAP KONTEN DINAMIS ────────────────────────── */}
      <div className="p-4 sm:p-7 rounded-3xl bg-surface border border-accent/20 shadow-sm min-h-[380px]">
        {activeStage === 'dialogue' && (
          <DialogueStage
            dialogue={currentLesson.dialogue}
            onCompleteStage={() => setActiveStage('explanation')}
          />
        )}

        {activeStage === 'explanation' && (
          <ExplanationStage
            explanations={currentLesson.explanations}
            pedagogicalFramework={currentLesson.pedagogical_framework}
            vocabBreakdown={currentLesson.vocab_breakdown}
            commonPitfalls={currentLesson.common_pitfalls || currentLesson.pedagogical_framework?.common_pitfalls}
          />
        )}

        {activeStage === 'drills' && (
          <MicroDrillStage
            drills={currentLesson.drills}
            onComplete={handleDrillComplete}
          />
        )}

        {activeStage === 'cando' && (
          <CanDoCompletionStage
            lesson={currentLesson}
            drillScore={drillScore}
            onNextLesson={nextLessonInfo ? handleNextLesson : undefined}
            onBackToCatalog={closeLessonStudy}
          />
        )}
      </div>

      {/* ── 4. FOOTER NAVIGASI LANGKAH INTERNAL ─────────────────── */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          type="button"
          disabled={activeStage === 'dialogue'}
          onClick={() => {
            if (activeStage === 'explanation') setActiveStage('dialogue');
            if (activeStage === 'drills') setActiveStage('explanation');
            if (activeStage === 'cando') setActiveStage('drills');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="min-h-[44px] px-4 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-xs font-bold text-appText-muted hover:text-appText-bright disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95"
        >
          ← Tahap Sebelumnya
        </button>

        {activeStage !== 'cando' ? (
          <button
            type="button"
            onClick={() => {
              if (activeStage === 'dialogue') setActiveStage('explanation');
              else if (activeStage === 'explanation') setActiveStage('drills');
              else if (activeStage === 'drills') setActiveStage('cando');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="min-h-[44px] px-5 py-2 rounded-xl bg-accent text-bg text-xs font-extrabold uppercase tracking-wider shadow-md hover:brightness-110 flex items-center gap-1.5 transition-all active:scale-95"
          >
            <span>Lanjut Tahap Berikutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : nextLessonInfo ? (
          <button
            type="button"
            onClick={handleNextLesson}
            className="min-h-[44px] px-6 py-2 rounded-xl bg-accent text-bg text-xs font-extrabold uppercase tracking-wider shadow-md hover:brightness-110 flex items-center gap-1.5 transition-all active:scale-95"
          >
            <span>Pelajaran Berikutnya</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
};
