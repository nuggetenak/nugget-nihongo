// ══════════════════════════════════════════════════════════════════
//  HomePage.tsx — Tab 1: Belajar (Pathway-First Curriculum Hub)
//  Features:
//  - Unified Daily Focus Command Hero with dynamic Next Uncompleted Lesson CTA
//  - Embedded CurriculumTrackBrowser for interactive roadmap & Can-Do progression
//  - Synchronous cached Gamification (Streak, XP, Heatmap, Target Harian)
//  - Zero-CLS Daily Kotoba & Kotowaza (ことわざ) cards
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Flame,
  ArrowRight,
  Sparkles,
  Award,
  Volume2,
  Info,
  Compass,
  Calendar,
  Zap,
  ChevronRight,
  Quote,
  Play,
  Wrench,
  CheckCircle2,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useCurriculumStore, TrackId } from '../lib/curriculum/curriculumStore';
import { useGamificationStore } from '../lib/gamification/gamificationStore';
import { HeatmapCalendar } from '../components/gamification/HeatmapCalendar';
import { BadgesModal } from '../components/gamification/BadgesModal';
import { loadVocab, loadGrammar, NormalizedVocab, NormalizedGrammar, loadCurriculumTrack, CurriculumTrackData } from '../lib/data/dataManager';
import type { Kotowaza } from '../lib/data/kotowaza';
import { speakJapanese } from '../lib/audio/tts';
import { JapaneseFormattedText } from '../components/ui/JapaneseFormattedText';
import { SkeletonCard } from '../components/ui/SkeletonCard';
import { SyncStatusPill } from '../components/ui/SyncStatusPill';
import { CurriculumTrackBrowser } from '../components/materi/CurriculumTrackBrowser';
import { getNextUncompletedLesson, NextUncompletedLessonResult } from '../lib/curriculum/curriculumProgressHelper';

// Seed proverb for instant, zero-CLS landing page render before dynamic chunk hydration
const DEFAULT_DAILY_KOTOWAZA: Kotowaza = {
  id: "ktw-001",
  jp: "七転び八起き",
  reading: "ななころびやおき",
  romaji: "Nana korobi ya oki",
  meaning: "Jatuh tujuh kali, bangkit delapan kali",
  wisdom: "Simbol ketabahan sejati (ganbaru). Jangan pernah menyerah meskipun berkali-kali menghadapi kesulitan dalam mengingat kanji atau gagal dalam tes.",
  category: "Ketekunan & Tekad",
  origin: "Filosofi boneka Daruma yang selalu berdiri tegak kembali saat digulingkan.",
};

// Robust, sanitized unit and lesson extractor (safely prevents "Unit 51" concatenation bug)
function extractUnitAndLessonNumbers(
  unitId?: string,
  lessonId?: string
): { unitNum: number; lessonNum: number } {
  let unitNum = 1;
  let lessonNum = 1;

  if (unitId) {
    const parts = unitId.split('-');
    const lastPart = parts[parts.length - 1]?.replace(/\D/g, '');
    if (lastPart) {
      const parsed = parseInt(lastPart, 10);
      if (!isNaN(parsed) && parsed > 0) {
        unitNum = Math.min(parsed, 20);
      }
    }
  }

  if (lessonId) {
    const parts = lessonId.split('-');
    const lastPart = parts[parts.length - 1]?.replace(/\D/g, '');
    if (lastPart) {
      const parsed = parseInt(lastPart, 10);
      if (!isNaN(parsed) && parsed > 0) {
        lessonNum = Math.min(parsed, 50);
      }
    }
  }

  return { unitNum, lessonNum };
}

export const HomePage: React.FC = () => {
  const {
    streak,
    xp,
    setActiveTab,
    openBookStudio,
    dailyGoalXP,
    openFeatureGuide,
    openKotowaza,
    cards,
    openLessonStudy,
    lastStudiedLesson,
    openToolbox,
    openCatPlacement,
    openKana,
    openConjugation,
    openNuance,
    openDetailModal,
  } = useAppStore();

  const { activeTrackId, trackProgress } = useCurriculumStore();

  const [isBadgesOpen, setIsBadgesOpen] = useState(false);
  const [dailyWord, setDailyWord] = useState<NormalizedVocab | null>(null);
  const [vocabList, setVocabList] = useState<NormalizedVocab[]>([]);
  const [grammarList, setGrammarList] = useState<NormalizedGrammar[]>([]);
  const [trackData, setTrackData] = useState<CurriculumTrackData | null>(null);

  const heatmap = useGamificationStore((s) => s.heatmap);
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const todayXP = heatmap[todayStr]?.xp || 0;
  const isGoalReached = todayXP >= dailyGoalXP;
  const goalProgressPercent = Math.min(100, Math.round((todayXP / dailyGoalXP) * 100));

  const [dailyKotowaza, setDailyKotowaza] = useState<Kotowaza>(DEFAULT_DAILY_KOTOWAZA);

  // Load track data for active curriculum track
  useEffect(() => {
    let isMounted = true;
    loadCurriculumTrack(activeTrackId)
      .then((data) => {
        if (isMounted) setTrackData(data);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [activeTrackId]);

  // Load proverb
  useEffect(() => {
    let isMounted = true;
    import('../lib/data/kotowaza')
      .then((mod) => {
        if (isMounted && mod.getDailyKotowaza) {
          setDailyKotowaza(mod.getDailyKotowaza());
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  // Calculate FSRS due cards today
  const dueCount = useMemo(() => {
    const now = Date.now();
    return Object.values(cards).filter((entry) => {
      if (!entry?.card?.due) return false;
      const dueTime = new Date(entry.card.due).getTime();
      return dueTime <= now;
    }).length;
  }, [cards]);

  // Total learned cards count
  const totalLearnedCards = useMemo(() => Object.keys(cards).length, [cards]);

  // Load daily word and lists for track browser
  useEffect(() => {
    let isMounted = true;
    Promise.all([loadVocab('n5'), loadGrammar('n5')])
      .then(([vList, gList]) => {
        if (!isMounted) return;
        setVocabList(vList || []);
        setGrammarList(gList || []);
        if (vList && vList.length > 0) {
          const dayIndex = Math.floor(Date.now() / 86400000);
          setDailyWord(vList[dayIndex % vList.length]);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  // Feature F4: Dynamically compute next uncompleted lesson
  const nextLesson: NextUncompletedLessonResult | null = useMemo(() => {
    return getNextUncompletedLesson(activeTrackId, trackData, trackProgress);
  }, [activeTrackId, trackData, trackProgress]);

  return (
    <div className="max-w-6xl mx-auto pt-3 sm:pt-6 pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12 space-y-5 sm:space-y-7">
      {/* ── TIER 1: GUIDED DAILY MISSION COMMAND HERO ── */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-950/70 via-amber-900/30 to-surface border border-accent/25 p-4 sm:p-7 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-accent-hot text-[11px] sm:text-xs font-bold">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>Streak {streak} Hari Aktif</span>
              </div>
              <span
                className={`text-[10.5px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  dueCount > 0
                    ? 'bg-amber-500/20 text-accent border border-amber-500/30'
                    : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                }`}
              >
                {dueCount > 0 ? `📬 ${dueCount} FSRS Due` : '✨ Target Hari Ini Selesai'}
              </span>
              <SyncStatusPill />
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-appText-bright tracking-tight">
                Misi Belajar Hari Ini 今日も頑張ろう
              </h1>
              <p className="text-xs sm:text-sm text-appText-muted mt-1 leading-relaxed">
                {nextLesson && !nextLesson.isAllCompleted
                  ? `Fokus aktif: ${nextLesson.unitTitle} · ${nextLesson.title}. Selesaikan tahapan pembelajaran dan latih kemampuan Can-Do nyatamu.`
                  : dueCount > 0
                  ? `Ada ${dueCount} kartu memori FSRS yang siap diulas. Jaga retensi jangka panjangmu sebelum lanjut ke unit baru.`
                  : 'Semua target belajar tuntas! Lanjutkan penguasaan materi di jalur aktifmu atau uji kemampuan di Dojo.'}
              </p>
            </div>

            {/* Next Lesson Can-Do Tag */}
            {nextLesson?.canDo && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-accent-hot text-xs font-semibold">
                <span>🎯 Target Can-Do:</span>
                <span className="font-normal text-appText-bright truncate max-w-[280px] sm:max-w-md">
                  {nextLesson.canDo}
                </span>
              </div>
            )}

            {/* Core Action Buttons: 1-Tap Next Lesson CTA, FSRS Review, Kotak Peralatan */}
            <div className="pt-1 flex flex-wrap gap-2 sm:gap-2.5 items-center">
              {/* Primary 1-Tap Dynamic Next Uncompleted Lesson CTA */}
              <button
                type="button"
                onClick={() => {
                  if (nextLesson) {
                    openLessonStudy(
                      nextLesson.trackId,
                      nextLesson.unitId,
                      nextLesson.lessonId
                    );
                  } else if (lastStudiedLesson) {
                    openLessonStudy(
                      lastStudiedLesson.trackId,
                      lastStudiedLesson.unitId,
                      lastStudiedLesson.lessonId
                    );
                  } else {
                    openLessonStudy('n5', 'n5-u1', 'n5-l1');
                  }
                }}
                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-accent hover:bg-accent-hot text-bg font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-glow active:scale-95 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-bg shrink-0" />
                <span className="truncate max-w-[270px] sm:max-w-none">
                  {(() => {
                    if (nextLesson) {
                      if (nextLesson.isAllCompleted) {
                        return `Ulas Kembali · Unit ${nextLesson.unitNumber} (${nextLesson.title})`;
                      }
                      if (nextLesson.completedLessonsCount > 0) {
                        return `Lanjut Belajar · Unit ${nextLesson.unitNumber} (${nextLesson.title})`;
                      }
                      return `Mulai Belajar · Unit ${nextLesson.unitNumber} (${nextLesson.title})`;
                    }
                    if (lastStudiedLesson) {
                      const trackLabel = lastStudiedLesson.trackId.toUpperCase();
                      const { unitNum, lessonNum } = extractUnitAndLessonNumbers(
                        lastStudiedLesson.unitId,
                        lastStudiedLesson.lessonId
                      );
                      return `Lanjut Belajar · ${trackLabel} Unit ${unitNum} (Pelajaran ${lessonNum})`;
                    }
                    return 'Mulai Belajar · Bab 1 (N5)';
                  })()}
                </span>
              </button>

              {dueCount > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveTab('kebun')}
                  className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-accent-hot border border-amber-500/35 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 fill-accent-hot" />
                  <span>Review FSRS ({dueCount})</span>
                </button>
              )}

              <button
                type="button"
                onClick={openToolbox}
                className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-bright border border-accent/25 hover:border-accent/40 font-bold text-xs transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                title="Buka Kotak Peralatan Belajar Lengkap"
              >
                <Wrench className="w-3.5 h-3.5 text-accent" />
                <span>Kotak Peralatan</span>
              </button>

              <button
                type="button"
                onClick={openFeatureGuide}
                className="px-3 py-2.5 sm:py-3 rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-muted hover:text-accent border border-accent/15 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Panduan</span>
              </button>
            </div>
          </div>

          <div className="hidden sm:flex shrink-0 items-center justify-center">
            <img
              src="/icons/logo.png"
              alt="Nugget Nihongo"
              className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-glow ring-2 ring-amber-500/40"
            />
          </div>
        </div>
      </div>

      {/* ── TIER 2: PATHWAY GUIDANCE & QUICK UTILITIES ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          type="button"
          onClick={openKana}
          className="p-2.5 rounded-2xl bg-surface border border-accent/20 hover:border-accent/40 text-left transition-all hover:bg-surface-2 group flex items-center gap-2.5 active:scale-98 shadow-sm"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-accent-hot font-jp font-bold flex items-center justify-center text-xs shrink-0 group-hover:scale-105 transition-transform">
            あ/ア
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-appText-bright truncate group-hover:text-accent transition-colors">
              Bagan Kana
            </div>
            <div className="text-[10px] text-appText-muted truncate">Hiragana & Katakana</div>
          </div>
        </button>

        <button
          type="button"
          onClick={openConjugation}
          className="p-2.5 rounded-2xl bg-surface border border-accent/20 hover:border-accent/40 text-left transition-all hover:bg-surface-2 group flex items-center gap-2.5 active:scale-98 shadow-sm"
        >
          <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-400 font-bold flex items-center justify-center text-xs shrink-0 group-hover:scale-105 transition-transform">
            🔄
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-appText-bright truncate group-hover:text-purple-300 transition-colors">
              Konjugasi Verba
            </div>
            <div className="text-[10px] text-appText-muted truncate">Te, Nai, Ta, Masu</div>
          </div>
        </button>

        <button
          type="button"
          onClick={openNuance}
          className="p-2.5 rounded-2xl bg-surface border border-accent/20 hover:border-accent/40 text-left transition-all hover:bg-surface-2 group flex items-center gap-2.5 active:scale-98 shadow-sm"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-400 font-bold flex items-center justify-center text-xs shrink-0 group-hover:scale-105 transition-transform">
            ⚖️
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-appText-bright truncate group-hover:text-blue-300 transition-colors">
              Inspektor Nuansa
            </div>
            <div className="text-[10px] text-appText-muted truncate">Komparasi Pola Mirip</div>
          </div>
        </button>

        <button
          type="button"
          onClick={openBookStudio}
          className="p-2.5 rounded-2xl bg-surface border border-accent/20 hover:border-accent/40 text-left transition-all hover:bg-surface-2 group flex items-center gap-2.5 active:scale-98 shadow-sm"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 font-bold flex items-center justify-center text-xs shrink-0 group-hover:scale-105 transition-transform">
            📚
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-appText-bright truncate group-hover:text-emerald-300 transition-colors">
              Buku Teks Resmi
            </div>
            <div className="text-[10px] text-appText-muted truncate">9 Seri Buku Populer</div>
          </div>
        </button>
      </div>

      {/* ── TIER 3: DEDICATED PATHWAY-FIRST CURRICULUM ROADMAP (Feature F3) ── */}
      <section aria-label="Peta Jalur Kurikulum Terpandu" className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-wider text-appText-bright">
              Alur Kurikulum & Peta Belajar Terstruktur
            </span>
          </div>
          <span className="text-[11px] text-appText-muted">
            {nextLesson?.completedLessonsCount || 0} dari {nextLesson?.totalLessons || 0} Pelajaran Tuntas
          </span>
        </div>

        {/* Embedded Curriculum Track Browser */}
        <div className="bg-surface border border-accent/20 rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-sm">
          <CurriculumTrackBrowser
            vocabList={vocabList}
            grammarList={grammarList}
            onSelectItem={(item, type) => {
              openDetailModal(item, type);
            }}
            onNavigateToQuiz={() => {
              setActiveTab('quiz');
            }}
          />
        </div>
      </section>

      {/* ── TIER 4: DAILY INSPIRATION (KOTOBA & KOTOWAZA) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5">
        {/* Kotoba Hari Ini */}
        {!dailyWord ? (
          <SkeletonCard type="word" className="md:col-span-2" />
        ) : (
          <div className="md:col-span-2 bg-surface-2 border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col justify-between shadow-sm min-h-[180px]">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                <span>Kotoba Hari Ini · 今日の言葉</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10.5px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-accent border border-amber-500/30 uppercase">
                  {`JLPT ${dailyWord.level.toUpperCase()}`}
                </span>
                <button
                  type="button"
                  onClick={() => openDetailModal(dailyWord, 'vocab')}
                  className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-surface hover:bg-surface-3 text-appText-muted hover:text-accent flex items-center justify-center transition-colors active:scale-95"
                  title="Lihat Detail & Contoh Kalimat"
                  aria-label={`Lihat detail kosakata ${dailyWord.word}`}
                >
                  <Info className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-1.5 sm:space-y-2 my-1.5 sm:my-2">
              <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                <div className="text-xl sm:text-2xl font-jp font-bold text-appText-bright" lang="ja">
                  {dailyWord.word}
                  <span className="text-xs sm:text-sm font-normal text-appText-muted font-ui ml-2">
                    【{dailyWord.reading}】
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => speakJapanese(dailyWord.word)}
                  className="w-11 h-11 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-accent flex items-center justify-center transition-all active:scale-95 shrink-0"
                  title="Dengarkan pelafalan"
                  aria-label={`Dengarkan pelafalan ${dailyWord.word}`}
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div className="text-xs sm:text-sm font-semibold text-accent-hot">
                {dailyWord.meaning}
              </div>

              {(() => {
                const ex = dailyWord.examples?.find((e) => e.id && !e.id.includes('[TBD]')) || dailyWord.examples?.[0];
                if (ex && ex.jp) {
                  return (
                    <div className="text-xs text-appText-muted italic leading-relaxed">
                      <JapaneseFormattedText text={`"${ex.jp}"`} /> {ex.id && !ex.id.includes('[TBD]') ? `(${ex.id})` : ''}
                    </div>
                  );
                }
                return (
                  <div className="text-xs text-appText-muted italic leading-relaxed">
                    "諦めずに最後まで頑張りましょう。" (Mari berusaha keras sampai akhir tanpa menyerah.)
                  </div>
                );
              })()}
            </div>

            <div className="text-[11px] text-appText-muted/70 mt-2.5 pt-2.5 sm:mt-3 sm:pt-3 border-t border-accent/10 flex items-center justify-between">
              <span className="capitalize">{dailyWord.pos || 'Kata kerja · Bentuk kamus'}</span>
              <button
                type="button"
                onClick={() => openDetailModal(dailyWord, 'vocab')}
                className="text-accent hover:underline font-semibold text-[11px] flex items-center gap-1 min-h-[44px] px-2 active:scale-95"
                aria-label={`Pelajari selengkapnya tentang ${dailyWord.word}`}
              >
                <span>Pelajari Selengkapnya</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Kotowaza: Daily Authentic Japanese Proverb */}
        <div className="relative overflow-hidden bg-surface-2 border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col justify-between shadow-sm group">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15 group-hover:opacity-25 transition-opacity pointer-events-none"
            style={{ backgroundImage: `url('/images/kotowaza-zen.jpg')` }}
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5 text-accent" />
                <span>Peribahasa · <span lang="ja">ことわざ</span></span>
              </span>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-500/15 text-accent border border-amber-500/25">
                {dailyKotowaza.category}
              </span>
            </div>

            <div className="space-y-1.5 my-1">
              <div className="flex items-center justify-between gap-2">
                <div className="text-base sm:text-lg font-jp font-bold text-appText-bright" lang="ja">
                  {dailyKotowaza.jp}
                </div>
                <button
                  type="button"
                  onClick={() => speakJapanese(dailyKotowaza.jp)}
                  className="w-11 h-11 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] rounded-full bg-amber-500/15 hover:bg-amber-500/25 text-accent flex items-center justify-center transition-all shrink-0 active:scale-95"
                  title="Dengarkan peribahasa"
                  aria-label={`Dengarkan peribahasa ${dailyKotowaza.jp}`}
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div className="text-[11px] text-amber-400 font-mono">
                {dailyKotowaza.reading}
              </div>

              <div className="text-xs font-semibold text-appText-bright pt-0.5 sm:pt-1">
                "{dailyKotowaza.meaning}"
              </div>

              <p className="text-[11px] text-appText-muted mt-1 leading-relaxed line-clamp-3 sm:line-clamp-none">
                {dailyKotowaza.wisdom}
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-2.5 pt-2.5 sm:mt-3 sm:pt-3 border-t border-accent/10 flex items-center justify-between text-[11px] text-appText-muted">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>366+ Peribahasa</span>
            </span>
            <button
              type="button"
              onClick={openKotowaza}
              className="text-accent hover:underline font-bold flex items-center gap-1 hover:text-accent-hot transition-colors"
            >
              <span>Jelajahi Galeri →</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── TIER 5: TARGET HARIAN, STATS & HEATMAP ── */}
      <div className="bg-surface border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-accent/15 pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-wider text-appText-bright">
              Target Harian & Pemantauan Belajar
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsBadgesOpen(true)}
            className="text-xs font-bold text-accent-hot hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <Award className="w-4 h-4" />
            <span>Koleksi Lencana ({xp} XP)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          <div className="bg-surface-2 border border-accent/20 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-appText-bright">Target Harian</span>
                <span className={`text-xs font-bold font-mono ${isGoalReached ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {todayXP} / {dailyGoalXP} XP {isGoalReached ? '🎯' : ''}
                </span>
              </div>

              <div className="w-full bg-surface-3 h-2 rounded-full overflow-hidden border border-accent/10">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isGoalReached ? 'bg-emerald-400 shadow-glow' : 'bg-amber-400'
                  }`}
                  style={{ width: `${goalProgressPercent}%` }}
                />
              </div>

              <div className="pt-2 border-t border-accent/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-appText-muted">Total Pengalaman:</span>
                  <span className="font-bold font-mono text-appText-bright">{xp} XP</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-appText-muted">Streak Rutin:</span>
                  <span className="font-bold font-mono text-accent-hot">{streak} Hari</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-appText-muted">Total Kartu FSRS:</span>
                  <span className="font-bold font-mono text-appText-bright">{totalLearnedCards}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={openCatPlacement}
              className="mt-4 w-full py-2 px-3 rounded-xl bg-accent/15 hover:bg-accent text-accent hover:text-bg border border-accent/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-98"
            >
              <span>Uji Level (Tes CAT Kilat)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="md:col-span-2">
            <HeatmapCalendar days={49} />
          </div>
        </div>
      </div>

      {/* Badges Modal */}
      <BadgesModal isOpen={isBadgesOpen} onClose={() => setIsBadgesOpen(false)} />
    </div>
  );
};
