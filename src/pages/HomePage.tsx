// ══════════════════════════════════════════════════════════════════
//  HomePage.tsx — Tab 1: Belajar (Pathway-First Curriculum Hub)
//  Features:
//  - Unified Daily Focus Command Cockpit with dynamic Next Uncompleted Lesson CTA
//  - Balanced Daily Momentum Duo (Target Harian XP & Kotowaza Wisdom)
//  - Focused LMS Unit Roadmap with CEFR-J Can-Do Objectives & 44px Touch Ergonomics
//  - Full Silabus Explorer via Embedded CurriculumTrackBrowser
//  - Deep Practice Hub with Kotoba Hari Ini & 49-Day Learning Rhythm Heatmap
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
  Clock,
  ChevronDown,
  Sprout,
  AlertTriangle,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useCurriculumStore, TrackId } from '../lib/curriculum/curriculumStore';
import { useGamificationStore } from '../lib/gamification/gamificationStore';
import { HeatmapCalendar } from '../components/gamification/HeatmapCalendar';
import { BadgesModal } from '../components/gamification/BadgesModal';
import {
  loadVocab,
  loadGrammar,
  NormalizedVocab,
  NormalizedGrammar,
  loadCurriculumTrack,
  CurriculumTrackData,
} from '../lib/data/dataManager';
import type { Kotowaza } from '../lib/data/kotowaza';
import { speakJapanese } from '../lib/audio/tts';
import { JapaneseFormattedText } from '../components/ui/JapaneseFormattedText';
import { SkeletonCard } from '../components/ui/SkeletonCard';
import { SyncStatusPill } from '../components/ui/SyncStatusPill';
import { IrasutoyaImage } from '../components/common/IrasutoyaImage';
import { CurriculumTrackBrowser } from '../components/materi/CurriculumTrackBrowser';
import {
  getNextUncompletedLesson,
  NextUncompletedLessonResult,
} from '../lib/curriculum/curriculumProgressHelper';

// Seed proverb for instant, zero-CLS landing page render before dynamic chunk hydration
const DEFAULT_DAILY_KOTOWAZA: Kotowaza = {
  id: 'ktw-001',
  jp: '七転び八起き',
  reading: 'ななころびやおき',
  romaji: 'Nana korobi ya oki',
  meaning: 'Jatuh tujuh kali, bangkit delapan kali',
  wisdom:
    'Simbol ketabahan sejati (ganbaru). Jangan pernah menyerah meskipun berkali-kali menghadapi kesulitan dalam mengingat kanji atau gagal dalam tes.',
  category: 'Ketekunan & Tekad',
  origin: 'Filosofi boneka Daruma yang selalu berdiri tegak kembali saat digulingkan.',
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
    placementHistory,
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
  const [roadmapViewMode, setRoadmapViewMode] = useState<'focus' | 'all'>('all');
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const [showUnitExpectation, setShowUnitExpectation] = useState(false);

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

  // Load daily word and lists for track browser (dynamic per active track)
  useEffect(() => {
    let isMounted = true;
    const targetLevel = activeTrackId.startsWith('ssw')
      ? 'n4'
      : activeTrackId.startsWith('minna')
      ? 'n5'
      : (activeTrackId as any);

    Promise.all([loadVocab(targetLevel), loadGrammar(targetLevel)])
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
  }, [activeTrackId]);

  // Dynamically compute next uncompleted lesson
  const nextLesson: NextUncompletedLessonResult | null = useMemo(() => {
    return getNextUncompletedLesson(activeTrackId, trackData, trackProgress);
  }, [activeTrackId, trackData, trackProgress]);

  const activeUnit = useMemo(() => {
    if (!trackData?.units || trackData.units.length === 0) return null;
    if (selectedUnitId) {
      const found = trackData.units.find((u) => u.id === selectedUnitId);
      if (found) return found;
    }
    if (nextLesson?.unitId) {
      const found = trackData.units.find((u) => u.id === nextLesson.unitId);
      if (found) return found;
    }
    return trackData.units[0];
  }, [trackData, selectedUnitId, nextLesson]);

  const currentTrackProgress = useMemo(() => {
    return (
      trackProgress[activeTrackId] || {
        completedUnits: [],
        completedLessons: [],
        lessonScores: {},
      }
    );
  }, [trackProgress, activeTrackId]);

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 pt-3 sm:pt-6 pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12 space-y-4 sm:space-y-6 min-w-0 overflow-x-hidden">
      {/* ── TIER 1: GUIDED COMPACT WA-BENTO MISSION COMMAND HERO (~180px) ── */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-amber-500/10 via-surface to-surface-2 border border-accent/25 p-4 sm:p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
          <div className="max-w-2xl space-y-3 min-w-0">
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-accent-hot text-xs font-bold font-mono tabular-nums">
                <Flame className={`w-3.5 h-3.5 shrink-0 ${streak > 0 ? 'fill-amber-500 text-amber-500' : 'text-appText-muted opacity-60'}`} />
                <span>{streak > 0 ? `Streak ${streak} Hari Aktif` : 'Streak 0 Hari (Mulai Hari Ini)'}</span>
              </div>

              {/* Status Target XP Riil (Anti-Kontradiksi 0 XP) */}
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  todayXP === 0
                    ? 'bg-amber-500/15 border-amber-500/30 text-accent-hot'
                    : isGoalReached
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-black'
                    : 'bg-amber-500/15 border-amber-500/30 text-accent-hot'
                }`}
              >
                {todayXP === 0
                  ? `🌱 Langkah Pertama (${todayXP}/${dailyGoalXP} XP)`
                  : isGoalReached
                  ? `✨ Target Selesai (${todayXP}/${dailyGoalXP} XP)`
                  : `⚡ Momentum (${todayXP}/${dailyGoalXP} XP)`}
              </span>

              {dueCount > 0 && (
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/35 text-accent font-mono">
                  📬 {dueCount} FSRS Due
                </span>
              )}

              <SyncStatusPill />
            </div>

            {/* Hierarchical Title & Clear Kicker */}
            <div className="space-y-0.5">
              <div className="text-xs font-semibold font-jp text-accent tracking-wide flex items-center gap-1.5">
                <span>今日も頑張ろう</span>
                <span className="text-appText-muted font-ui">· Misi Hari Ini</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-appText-bright tracking-tight leading-snug">
                Selamat Belajar 🍙
              </h1>
              <p className="text-xs sm:text-sm text-appText-muted leading-relaxed line-clamp-2 mt-1">
                {nextLesson && !nextLesson.isAllCompleted
                  ? `Unit aktif: ${nextLesson.unitTitle}. Tuntaskan materi dan latih pemahaman nyatamu.`
                  : dueCount > 0
                  ? `Ada ${dueCount} kartu memori FSRS yang siap diulas untuk menjaga retensimu.`
                  : 'Target belajarmu tuntas! Lanjutkan unit materi baru atau latih kemampuan di Dojo.'}
              </p>
            </div>

            {/* Next Lesson Can-Do Tag (Compact 1-Baris) */}
            {nextLesson?.canDo && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-accent-hot text-xs font-semibold max-w-full">
                <span className="shrink-0 font-bold">🎯 Target Can-Do:</span>
                <span className="font-normal text-appText-bright truncate">
                  {nextLesson.canDo}
                </span>
              </div>
            )}

            {/* Focused Dynamic Action Bar */}
            <div className="pt-0.5 flex flex-wrap gap-2.5 items-center">
              {/* Primary 1-Tap Dynamic Next Lesson CTA */}
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
                    openLessonStudy(
                      activeTrackId || 'n5',
                      `${activeTrackId || 'n5'}-u1`,
                      `${activeTrackId || 'n5'}-l1`
                    );
                  }
                }}
                className="min-h-[48px] px-6 py-3 rounded-xl bg-accent hover:bg-accent-hot text-bg font-extrabold text-sm sm:text-base flex items-center gap-2.5 transition-all shadow-glow hover:shadow-lg active:scale-95 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-bg shrink-0" />
                <span className="font-extrabold tracking-wide">
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
                    return `Mulai Belajar · Bab 1 (${(activeTrackId || 'n5').toUpperCase()})`;
                  })()}
                </span>
              </button>

              {/* Dynamic Contextual Secondary Button */}
              {dueCount > 0 ? (
                <button
                  type="button"
                  onClick={() => setActiveTab('kebun')}
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-accent-hot border border-amber-500/30 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-accent-hot shrink-0" />
                  <span>Ulas FSRS ({dueCount})</span>
                </button>
              ) : totalLearnedCards === 0 ? (
                placementHistory && placementHistory.length > 0 ? null : (
                  <button
                    type="button"
                    onClick={openCatPlacement}
                    className="min-h-[44px] px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-accent border border-accent/25 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                    title="Uji level adaptif 3 menit"
                  >
                    <Compass className="w-4 h-4 text-accent shrink-0" />
                    <span>Uji Level (CAT)</span>
                  </button>
                )
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveTab('kebun')}
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-muted hover:text-appText-bright border border-accent/20 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                >
                  <Sprout className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Kebun Kata</span>
                </button>
              )}
            </div>
          </div>

          <div className="hidden sm:flex shrink-0 items-center justify-center">
            <IrasutoyaImage
              assetId="sensei_teaching"
              animateFloat
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain filter drop-shadow-md"
              alt="Sensei Nugget Nihongo (いらすとや)"
              showAttributionTooltip
            />
          </div>
        </div>
      </div>

      {/* ── TIER 2: HARMONIOUS DAILY COMPANION DUO (XP GOAL & KOTOWAZA) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {/* Widget A: Target Harian & Momentum Belajar */}
        <div className="bg-surface border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-between shadow-sm space-y-3 min-w-0 card-interactive-lift">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <Calendar className="w-4 h-4 text-accent shrink-0" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-appText-bright truncate">
                  Target Harian & Momentum
                </span>
              </div>
              <span
                className={`text-xs sm:text-sm font-bold font-mono tabular-nums shrink-0 ${
                  isGoalReached ? 'text-emerald-700 dark:text-emerald-400 font-black' : 'text-accent-hot dark:text-amber-400 font-bold'
                }`}
              >
                {todayXP} / {dailyGoalXP} XP {isGoalReached ? '🎯' : ''}
              </span>
            </div>

            <div className="w-full bg-surface-3 h-2.5 rounded-full overflow-hidden border border-accent/15 my-1">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isGoalReached ? 'bg-emerald-500 shadow-glow' : 'bg-accent'
                }`}
                style={{ width: `${goalProgressPercent}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-surface-2/70 rounded-xl border border-accent/15 text-center">
              <div>
                <div className="text-xs font-medium text-appText-muted">Total XP</div>
                <div className="text-xs sm:text-sm font-bold font-mono tabular-nums text-appText-bright mt-0.5">{xp}</div>
              </div>
              <div>
                <div className="text-xs font-medium text-appText-muted">Streak</div>
                <div className="text-xs sm:text-sm font-bold font-mono tabular-nums text-accent-hot mt-0.5">{streak} Hari</div>
              </div>
              <div>
                <div className="text-xs font-medium text-appText-muted">Kartu FSRS</div>
                <div className="text-xs sm:text-sm font-bold font-mono tabular-nums text-appText-bright mt-0.5">{totalLearnedCards}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsBadgesOpen(true)}
              className="flex-1 min-h-[40px] px-3 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-accent font-bold text-xs flex items-center justify-center gap-1.5 transition-colors active:scale-95 cursor-pointer"
            >
              <Award className="w-4 h-4 text-accent shrink-0" />
              <span>Lencana</span>
            </button>
            <button
              type="button"
              onClick={openCatPlacement}
              className="flex-1 min-h-[40px] px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-accent-hot font-bold text-xs flex items-center justify-center gap-1.5 transition-colors active:scale-95 cursor-pointer"
            >
              <span>Uji CAT</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>

        {/* Kotowaza: Daily Authentic Japanese Proverb */}
        {/* Daily word card container must have min-h-[180px] to prevent layout shift */}
        <div className="relative overflow-hidden bg-surface-2 border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-between shadow-sm group min-w-0 min-h-[180px] card-interactive-lift">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15 group-hover:opacity-25 transition-opacity pointer-events-none"
            style={{ backgroundImage: `url('/images/kotowaza-zen.jpg')` }}
          />
          <div className="relative z-10 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>
                  Peribahasa · <span lang="ja">ことわざ</span>
                </span>
              </span>
              <span className="text-xs font-bold uppercase px-2.5 py-1 rounded-full bg-amber-500/15 text-accent border border-amber-500/25 shrink-0">
                {dailyKotowaza.category}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-base sm:text-lg font-jp font-bold text-appText-bright" lang="ja">
                  {dailyKotowaza.jp}
                </div>
                <div className="text-xs sm:text-sm text-accent-hot dark:text-amber-400 font-mono mt-0.5">
                  {dailyKotowaza.reading}
                </div>
              </div>
              <button
                type="button"
                onClick={() => speakJapanese(dailyKotowaza.jp)}
                className="w-11 h-11 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-accent flex items-center justify-center transition-all shrink-0 active:scale-95 cursor-pointer"
                title="Dengarkan peribahasa"
                aria-label={`Dengarkan peribahasa ${dailyKotowaza.jp}`}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="text-sm sm:text-base font-semibold text-appText-bright leading-snug break-words">
              "{dailyKotowaza.meaning}"
            </div>

            <p className="text-xs sm:text-sm text-appText-muted leading-relaxed break-words">
              {dailyKotowaza.wisdom}
            </p>
          </div>

          <div className="relative z-10 pt-2.5 border-t border-accent/10 flex items-center justify-between text-xs text-appText-muted">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-accent shrink-0" />
              <span>366+ Peribahasa</span>
            </span>
            <button
              type="button"
              onClick={openKotowaza}
              className="text-accent hover:underline font-bold flex items-center gap-1 hover:text-accent-hot transition-colors cursor-pointer min-h-[40px] px-2 active:scale-95"
            >
              <span>Jelajahi Galeri →</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── TIER 3: QUICK UTILITIES STRIP ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          type="button"
          onClick={openKana}
          className="min-h-[44px] p-2.5 rounded-2xl bg-surface border border-accent/20 hover:border-accent/40 text-left transition-all hover:bg-surface-2 group flex items-center gap-2.5 active:scale-98 shadow-sm cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-accent-hot font-jp font-bold flex items-center justify-center text-xs shrink-0 group-hover:scale-105 transition-transform">
            あ/ア
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-appText-bright truncate group-hover:text-accent transition-colors">
              Bagan Kana
            </div>
            <div className="text-xs text-appText-muted truncate">Hiragana & Katakana</div>
          </div>
        </button>

        <button
          type="button"
          onClick={openConjugation}
          className="min-h-[44px] p-2.5 rounded-2xl bg-surface border border-accent/20 hover:border-accent/40 text-left transition-all hover:bg-surface-2 group flex items-center gap-2.5 active:scale-98 shadow-sm cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-400 font-bold flex items-center justify-center text-xs shrink-0 group-hover:scale-105 transition-transform">
            🔄
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-appText-bright truncate group-hover:text-purple-300 transition-colors">
              Konjugasi Verba
            </div>
            <div className="text-xs text-appText-muted truncate">Te, Nai, Ta, Masu</div>
          </div>
        </button>

        <button
          type="button"
          onClick={openNuance}
          className="min-h-[44px] p-2.5 rounded-2xl bg-surface border border-accent/20 hover:border-accent/40 text-left transition-all hover:bg-surface-2 group flex items-center gap-2.5 active:scale-98 shadow-sm cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-400 font-bold flex items-center justify-center text-xs shrink-0 group-hover:scale-105 transition-transform">
            ⚖️
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-appText-bright truncate group-hover:text-blue-300 transition-colors">
              Inspektor Nuansa
            </div>
            <div className="text-xs text-appText-muted truncate">Komparasi Pola Mirip</div>
          </div>
        </button>

        <button
          type="button"
          onClick={openBookStudio}
          className="min-h-[44px] p-2.5 rounded-2xl bg-surface border border-accent/20 hover:border-accent/40 text-left transition-all hover:bg-surface-2 group flex items-center gap-2.5 active:scale-98 shadow-sm cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 font-bold flex items-center justify-center text-xs shrink-0 group-hover:scale-105 transition-transform">
            📚
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-appText-bright truncate group-hover:text-emerald-300 transition-colors">
              Buku Teks Resmi
            </div>
            <div className="text-xs text-appText-muted truncate">9 Seri Buku Populer</div>
          </div>
        </button>
      </div>

      {/* ── TIER 4: DEDICATED PATHWAY-FIRST CURRICULUM ROADMAP (Feature F3) ── */}
      <section aria-label="Peta Jalur Kurikulum Terpandu" className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2 flex-wrap">
            <BookOpen className="w-4 h-4 text-accent shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider text-appText-bright">
              Alur Kurikulum & Peta Belajar
            </span>
            <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-500/15 text-accent border border-amber-500/25">
              {activeTrackId.toUpperCase()}
            </span>
          </div>

          {/* Segmented View Mode Switcher: Fokus vs Seluruh Silabus */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-2 border border-accent/20 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setRoadmapViewMode('focus')}
              className={`min-h-[40px] px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer ${
                roadmapViewMode === 'focus'
                  ? 'bg-accent text-bg shadow-sm font-extrabold'
                  : 'text-appText-muted hover:text-appText-bright'
              }`}
            >
              <span>🎯 Unit Aktif (Fokus)</span>
            </button>
            <button
              type="button"
              onClick={() => setRoadmapViewMode('all')}
              className={`min-h-[40px] px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer ${
                roadmapViewMode === 'all'
                  ? 'bg-accent text-bg shadow-sm font-extrabold'
                  : 'text-appText-muted hover:text-appText-bright'
              }`}
            >
              <span>🗺️ Semua Unit ({trackData?.units?.length || 0})</span>
            </button>
          </div>
        </div>

        {roadmapViewMode === 'focus' && activeUnit ? (
          <div className="bg-surface border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-4 animate-in fade-in duration-200">
            {/* Unit Header with Progress */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-accent/15">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-amber-500/15 text-accent border border-amber-500/30 tabular-nums">
                    Unit {activeUnit.unit_number}
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-appText-bright truncate">
                    {activeUnit.title_id}
                  </h3>
                </div>
                <div className="text-xs text-appText-muted font-jp mt-0.5">
                  {activeUnit.title_jp} · <span className="italic">{activeUnit.theme}</span>
                </div>
              </div>

              {/* Progress Count Badge */}
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <div className="text-right">
                  <div className="text-xs font-bold text-appText-bright tabular-nums">
                    {activeUnit.lessons?.filter((l) => currentTrackProgress.completedLessons.includes(l.id)).length || 0} /{' '}
                    {activeUnit.lessons?.length || 0} Pelajaran
                  </div>
                  <div className="text-xs text-emerald-400 font-bold tabular-nums">
                    {Math.round(
                      ((activeUnit.lessons?.filter((l) => currentTrackProgress.completedLessons.includes(l.id)).length || 0) /
                        (activeUnit.lessons?.length || 1)) *
                        100
                    )}
                    % Selesai
                  </div>
                </div>
              </div>
            </div>

            {/* Horizontal Quick Unit Switcher (One-tap jumping without 3000px vertical scrolling) */}
            {trackData?.units && trackData.units.length > 1 && (
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 max-w-full">
                {trackData.units.map((u) => {
                  const isCurrent = activeUnit?.id === u.id;
                  const completedInU =
                    u.lessons?.filter((l) => currentTrackProgress.completedLessons.includes(l.id)).length || 0;
                  const isUnitDone = u.lessons?.length ? completedInU === u.lessons.length : false;
                  return (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => setSelectedUnitId(u.id)}
                      className={`min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 active:scale-95 shrink-0 cursor-pointer ${
                        isCurrent
                          ? 'bg-amber-500/20 text-accent border border-amber-500/40 shadow-xs'
                          : 'bg-surface-2 hover:bg-surface-3 text-appText-muted border border-accent/10'
                      }`}
                    >
                      <span>Unit {u.unit_number}</span>
                      {isUnitDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Progressive Disclosure: Compact Target Can-Do Card with Optional Expand */}
            {activeUnit.can_do_summary && (
              <div className="p-3.5 rounded-2xl bg-surface-2 border border-accent/15 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-accent">
                    <span>🎯</span>
                    <span>Target Kemampuan Nyata (Sasaran Can-Do):</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowUnitExpectation(!showUnitExpectation)}
                    className="min-h-[40px] px-2.5 text-xs font-semibold text-accent hover:underline flex items-center gap-1 cursor-pointer active:scale-95"
                  >
                    <span>{showUnitExpectation ? 'Ringkas' : 'Baca Harapan Topik'}</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform ${showUnitExpectation ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
                <p className={`text-appText leading-relaxed text-xs sm:text-sm ${showUnitExpectation ? '' : 'line-clamp-2'}`}>
                  {activeUnit.can_do_summary}
                </p>
              </div>
            )}

            {/* L1 Contrastive Analysis Notes (if present in curriculum) */}
            {activeUnit.l2d_focus_notes && (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-accent-hot">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>Fokus Analisis Kontrasif L1 (Tips Bahasa Indonesia):</span>
                </div>
                <p className="text-xs sm:text-sm text-appText leading-relaxed">
                  {activeUnit.l2d_focus_notes}
                </p>
              </div>
            )}

            {/* Clean, Non-Condensed Lesson Nodes for this Unit */}
            <div className="space-y-2.5 pt-1">
              {activeUnit.lessons?.map((lesson) => {
                const isLessonDone = currentTrackProgress.completedLessons.includes(lesson.id);
                const isNextTarget = nextLesson?.lessonId === lesson.id;
                const score = currentTrackProgress.lessonScores?.[lesson.id];

                return (
                  <div
                    key={lesson.id}
                    className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isNextTarget
                        ? 'bg-amber-500/10 border-accent/40 shadow-sm ring-1 ring-amber-500/30'
                        : isLessonDone
                        ? 'bg-surface-2/80 border-emerald-500/30'
                        : 'bg-surface-2/40 border-accent/15 hover:border-accent/30'
                    }`}
                  >
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-surface-3 text-appText-muted border border-accent/15 tabular-nums">
                          Pelajaran #{lesson.lesson_number}
                        </span>
                        {isLessonDone ? (
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Tuntas {score ? `(${score}%)` : ''}
                          </span>
                        ) : isNextTarget ? (
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-accent-hot border border-amber-500/35 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" />
                            Target Berikutnya
                          </span>
                        ) : null}
                        {lesson.estimated_minutes && (
                          <span className="text-xs text-appText-muted flex items-center gap-1 tabular-nums">
                            <Clock className="w-3.5 h-3.5" />
                            {lesson.estimated_minutes} Menit
                          </span>
                        )}
                        {lesson.grammar_ids && lesson.grammar_ids.length > 0 && (
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-purple-950/80 text-purple-200 border border-purple-400/50 shadow-xs">
                            {lesson.grammar_ids.length} Tata Bahasa
                          </span>
                        )}
                        {lesson.vocab_ids && lesson.vocab_ids.length > 0 && (
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-950/80 text-blue-200 border border-blue-400/50 shadow-xs">
                            {lesson.vocab_ids.length} Kosakata
                          </span>
                        )}
                      </div>

                      <div className="text-sm sm:text-base font-bold text-appText-bright truncate">
                        {lesson.title_id}
                      </div>
                      <div className="text-xs text-appText-muted font-jp">
                        {lesson.title_jp}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                      <button
                        type="button"
                        onClick={() => openLessonStudy(activeTrackId, activeUnit.id, lesson.id)}
                        className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 active:scale-95 shadow-sm cursor-pointer ${
                          isNextTarget
                            ? 'bg-accent hover:bg-accent-hot text-bg shadow-glow'
                            : isLessonDone
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                            : 'bg-surface-3 hover:bg-surface text-appText-bright border border-accent/20'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{isLessonDone ? 'Ulas' : 'Mulai Belajar'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Link to expand all units if desired */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setRoadmapViewMode('all')}
                className="min-h-[44px] text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1.5 py-1 px-3 rounded-lg hover:bg-amber-500/10 transition-colors cursor-pointer"
              >
                <span>Lihat Seluruh Silabus Kurikulum ({trackData?.units?.length || 0} Unit Lengkap)</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-surface border border-accent/20 rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-sm space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between px-2 pt-1">
              <span className="text-xs text-appText-muted">Menampilkan seluruh unit silabus:</span>
              <button
                type="button"
                onClick={() => setRoadmapViewMode('focus')}
                className="min-h-[40px] text-xs font-bold text-accent hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>← Kembali ke Tampilan Unit Aktif</span>
              </button>
            </div>
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
        )}
      </section>

      {/* ── TIER 5: DEEP PRACTICE & LEARNING RHYTHM (KOTOBA & HEATMAP) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Kotoba Hari Ini */}
        {!dailyWord ? (
          <SkeletonCard type="word" className="lg:col-span-1" />
        ) : (
          <div className="lg:col-span-1 bg-surface-2 border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col justify-between shadow-sm min-h-[220px]">
            <div>
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                  <span>Kotoba Hari Ini · 今日の言葉</span>
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-accent border border-amber-500/30 uppercase">
                    {`JLPT ${dailyWord.level.toUpperCase()}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => openDetailModal(dailyWord, 'vocab')}
                    className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-surface hover:bg-surface-3 text-appText-muted hover:text-accent flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
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
                    <span className="text-sm sm:text-base font-normal text-appText-muted font-ui ml-2">
                      【{dailyWord.reading}】
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => speakJapanese(dailyWord.word)}
                    className="w-11 h-11 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-accent flex items-center justify-center transition-all active:scale-95 shrink-0 cursor-pointer"
                    title="Dengarkan pelafalan"
                    aria-label={`Dengarkan pelafalan ${dailyWord.word}`}
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-sm sm:text-base font-semibold text-accent-hot leading-snug break-words">
                  {dailyWord.meaning}
                </div>

                {(() => {
                  const ex =
                    dailyWord.examples?.find((e) => e.id && !e.id.includes('[TBD]')) || dailyWord.examples?.[0];
                  if (ex && ex.jp) {
                    return (
                      <div className="text-xs sm:text-sm text-appText-muted italic leading-relaxed break-words">
                        <JapaneseFormattedText text={`"${ex.jp}"`} />{' '}
                        {ex.id && !ex.id.includes('[TBD]') ? `(${ex.id})` : ''}
                      </div>
                    );
                  }
                  return (
                    <div className="text-xs sm:text-sm text-appText-muted italic leading-relaxed break-words">
                      "諦めずに最後まで頑張りましょう。" (Mari berusaha keras sampai akhir tanpa menyerah.)
                    </div>
                  );
                })()}
              </div>
            </div>

            <div className="text-xs text-appText-muted mt-2.5 pt-2.5 sm:mt-3 sm:pt-3 border-t border-accent/10 flex items-center justify-between">
              <span className="capitalize font-medium">{dailyWord.pos || 'Kata kerja · Bentuk kamus'}</span>
              <button
                type="button"
                onClick={() => openDetailModal(dailyWord, 'vocab')}
                className="text-accent hover:underline font-semibold text-xs flex items-center gap-1 min-h-[44px] px-2 active:scale-95 cursor-pointer"
                aria-label={`Pelajari selengkapnya tentang ${dailyWord.word}`}
              >
                <span>Pelajari Selengkapnya</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Heatmap Konsistensi 49 Hari */}
        <div className="lg:col-span-2 bg-surface border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col justify-between shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-accent/15 pb-2.5">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-appText-bright">
                Ritme Belajar & Konsistensi (49 Hari)
              </span>
            </div>
            <span className="text-xs sm:text-sm font-mono font-bold text-accent-hot tabular-nums">
              Streak {streak} Hari Berturut-turut
            </span>
          </div>

          <div className="w-full max-w-full overflow-x-auto scrollbar-none py-1">
            <HeatmapCalendar days={49} hideWrapper />
          </div>

          <div className="text-xs text-appText-muted flex items-center justify-between pt-2 border-t border-accent/10">
            <span>Aktivitas terekam otomatis setiap kali kamu menyelesaikan latihan atau drill.</span>
            <button
              type="button"
              onClick={openCatPlacement}
              className="min-h-[40px] px-2 text-xs font-bold text-accent hover:underline inline-flex items-center gap-1 shrink-0 active:scale-95 cursor-pointer"
            >
              <span>Tes Kemampuan CAT →</span>
            </button>
          </div>
        </div>
      </div>

      {/* Badges Modal */}
      <BadgesModal isOpen={isBadgesOpen} onClose={() => setIsBadgesOpen(false)} />
    </div>
  );
};