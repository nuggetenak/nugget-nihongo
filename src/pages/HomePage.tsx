// ══════════════════════════════════════════════════════════════════
//  HomePage.tsx — Tab 1: Belajar (Pathway-First Curriculum Hub)
//  Features:
//  - Unified Daily Focus Command Cockpit with dynamic Next Uncompleted Lesson CTA
//  - Balanced Daily Momentum Duo (Target Harian XP & Kotowaza Wisdom)
//  - Focused LMS Unit Roadmap with CEFR-J Can-Do Objectives & 44px Touch Ergonomics
//  - Full Silabus Explorer via Embedded CurriculumTrackBrowser
//  - Deep Practice Hub with Kotoba Hari Ini & 49-Day Learning Rhythm Heatmap
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  const [roadmapViewMode, setRoadmapViewModeState] = useState<'focus' | 'all'>('focus');

  // Restore saved roadmap mode from localStorage on mount (Pillar 2)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nn_roadmap_view_mode');
        if (saved === 'focus' || saved === 'all') {
          setRoadmapViewModeState(saved);
        }
      } catch {}
    }
  }, []);

  const setRoadmapViewMode = (mode: 'focus' | 'all') => {
    setRoadmapViewModeState(mode);
    try {
      localStorage.setItem('nn_roadmap_view_mode', mode);
    } catch {}
  };

  const [selectedUnitId, setSelectedUnitIdState] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        return sessionStorage.getItem(`nn_selected_unit_${activeTrackId}`) || null;
      } catch {}
    }
    return null;
  });
  const setSelectedUnitId = (unitId: string | null) => {
    setSelectedUnitIdState(unitId);
    try {
      if (unitId) {
        sessionStorage.setItem(`nn_selected_unit_${activeTrackId}`, unitId);
      } else {
        sessionStorage.removeItem(`nn_selected_unit_${activeTrackId}`);
      }
    } catch {}
  };

  const [showUnitExpectation, setShowUnitExpectation] = useState(false);
  const [isSpeakingKotowaza, setIsSpeakingKotowaza] = useState(false);
  const [isSpeakingDailyWord, setIsSpeakingDailyWord] = useState(false);
  const unitSwitcherRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll unit switcher to keep active unit centered
  useEffect(() => {
    if (unitSwitcherRef.current && selectedUnitId) {
      const activeEl = unitSwitcherRef.current.querySelector(`[data-unit-id="${selectedUnitId}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [selectedUnitId]);

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
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 pt-3 sm:pt-6 space-y-4 sm:space-y-6 min-w-0 overflow-x-hidden pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12">
      {/* ── TIER 1: GUIDED COMPACT WA-BENTO MISSION COMMAND HERO (~180px) ── */}
      <div className="relative overflow-hidden rounded-2xl bg-surface border border-border p-4 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
          <div className="max-w-2xl space-y-3 min-w-0">
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {/* Status Target XP Riil (Anti-Kontradiksi 0 XP) */}
              <span
                className={`text-xs font-semibold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border ${
                  todayXP === 0
                    ? 'bg-surface-2 text-appText-muted border-border'
                    : isGoalReached
                    ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30'
                    : 'bg-accent/10 text-accent border-accent/20'
                }`}
              >
                <span className="hidden sm:inline">
                  {todayXP === 0
                    ? `🌱 Langkah Pertama (${todayXP}/${dailyGoalXP} XP)`
                    : isGoalReached
                    ? `✨ Target Selesai (${todayXP}/${dailyGoalXP} XP)`
                    : `⚡ Momentum (${todayXP}/${dailyGoalXP} XP)`}
                </span>
                <span className="sm:hidden">
                  {`${todayXP}/${dailyGoalXP} XP`}
                </span>
              </span>

              {dueCount > 0 && (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono">
                  <span className="sr-only">📬 {dueCount} FSRS Due</span>
                  <span className="hidden sm:inline">🌱 {dueCount} Kata Perlu Diulas</span>
                  <span className="sm:hidden">🌱 {dueCount} Diulas</span>
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
              <h1 className="font-display text-xl sm:text-2xl font-bold text-appText-bright tracking-tight leading-snug">
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

            {/* Next Lesson Can-Do Tag (Editorial Fluid Quote) */}
            {nextLesson?.canDo && (
              <div className="border-l-2 border-accent/50 pl-3 py-1 text-xs text-appText-muted leading-relaxed">
                <span className="font-semibold text-accent mr-1.5">🎯 Sasaran Can-Do:</span>
                <span>{nextLesson.canDo}</span>
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
                className="min-h-[48px] px-5 sm:px-6 py-3 rounded-xl bg-accent hover:bg-accent-hot text-white dark:text-stone-950 font-semibold text-xs sm:text-base flex items-center gap-2 sm:gap-2.5 transition-all shadow-glow active:scale-95 cursor-pointer max-w-full"
              >
                <Play className="w-4 h-4 fill-current shrink-0" />
                <span className="font-semibold tracking-wide truncate max-w-[200px] xs:max-w-[260px] sm:max-w-md inline-block align-bottom">
                  {(() => {
                    if (nextLesson) {
                      if (nextLesson.isAllCompleted) {
                        return `Ulas Kembali · Unit ${nextLesson.unitNumber}`;
                      }
                      if (nextLesson.completedLessonsCount > 0) {
                        return `Lanjut Belajar · Unit ${nextLesson.unitNumber}`;
                      }
                      return `Mulai Belajar · Unit ${nextLesson.unitNumber}`;
                    }
                    if (lastStudiedLesson) {
                      const trackLabel = lastStudiedLesson.trackId.toUpperCase();
                      const { unitNum } = extractUnitAndLessonNumbers(
                        lastStudiedLesson.unitId,
                        lastStudiedLesson.lessonId
                      );
                      return `Lanjut Belajar · ${trackLabel} Unit ${unitNum}`;
                    }
                    return `Mulai Belajar · Unit 1`;
                  })()}
                </span>
              </button>

              {/* Dynamic Contextual Secondary Button */}
              {dueCount > 0 ? (
                <button
                  type="button"
                  onClick={() => setActiveTab('kebun')}
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-accent/10 hover:bg-accent/15 text-accent border border-accent/25 font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-current shrink-0" />
                  <span>Ulas FSRS ({dueCount})</span>
                </button>
              ) : totalLearnedCards === 0 ? (
                placementHistory && placementHistory.length > 0 ? null : (
                  <button
                    type="button"
                    onClick={openCatPlacement}
                    className="min-h-[44px] px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-accent border border-border font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
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
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-muted hover:text-appText-bright border border-border font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                >
                  <Sprout className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Kebun Kata</span>
                </button>
              )}
            </div>
          </div>

          <div className="hidden sm:flex shrink-0 items-center justify-center self-center mt-0">
            <IrasutoyaImage
              assetId="sensei_teaching"
              animateFloat
              className="w-14 h-14 sm:w-24 sm:h-24 object-contain filter drop-shadow-xs shrink-0"
              alt="Sensei Nugget Nihongo (いらすとや)"
              showAttributionTooltip
            />
          </div>
        </div>
      </div>

      {/* ── TIER 2: HARMONIOUS DAILY COMPANION DUO (XP GOAL & KOTOWAZA) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {/* Widget A: Target Harian & Momentum Belajar */}
        <div className="bg-surface border border-border rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xs space-y-3 min-w-0">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <Calendar className="w-4 h-4 text-accent shrink-0" />
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-appText-bright truncate">
                  Target Harian & Momentum
                </span>
              </div>
              <span
                className={`text-xs sm:text-sm font-semibold font-mono tabular-nums shrink-0 ${
                  isGoalReached ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-accent-hot dark:text-amber-400 font-semibold'
                }`}
              >
                {todayXP} / {dailyGoalXP} XP {isGoalReached ? '🎯' : ''}
              </span>
            </div>

            <div className="w-full bg-surface-3 h-2.5 rounded-full overflow-hidden my-1">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isGoalReached ? 'bg-emerald-600 dark:bg-emerald-400' : 'bg-accent'
                }`}
                style={{ width: `${todayXP === 0 ? 2 : goalProgressPercent}%` }}
              />
            </div>

            <div className="grid grid-cols-3 divide-x divide-border py-2 border-y border-border text-center">
              <div>
                <div className="text-xs font-medium text-appText-muted">Total XP</div>
                <div className="text-xs sm:text-sm font-semibold font-mono tabular-nums text-appText-bright mt-0.5">{xp}</div>
              </div>
              <div title={streak > 0 ? `Streak ${streak} Hari Aktif` : 'Streak 0 Hari (Mulai Hari Ini)'}>
                <div className="text-xs font-medium text-appText-muted">Streak</div>
                <div className="text-xs sm:text-sm font-semibold font-mono tabular-nums text-accent mt-0.5">
                  <span className="sr-only">{streak > 0 ? `Streak ${streak} Hari Aktif` : 'Streak 0 Hari (Mulai Hari Ini)'}</span>
                  {streak}h
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-appText-muted">
                  <span className="hidden sm:inline">Kartu FSRS</span>
                  <span className="sm:hidden">FSRS</span>
                </div>
                <div className="text-xs sm:text-sm font-semibold font-mono tabular-nums text-appText-bright mt-0.5">{totalLearnedCards}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsBadgesOpen(true)}
              className="flex-1 min-h-[44px] px-3 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border text-appText-bright font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors active:scale-95 cursor-pointer"
            >
              <Award className="w-4 h-4 text-accent shrink-0" />
              <span>Lencana</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('materi')}
              className="flex-1 min-h-[44px] px-3 py-2.5 rounded-xl bg-accent/10 hover:bg-accent/15 border border-accent/25 text-accent font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors active:scale-95 cursor-pointer"
            >
              <span>Latihan Dojo</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>

        {/* Kotowaza: Daily Authentic Japanese Proverb */}
        {/* Daily word card container must have min-h-[180px] to prevent layout shift */}
        <div className="card-interactive-lift relative overflow-hidden bg-surface border border-border rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xs group min-w-0 min-h-[180px]">
          <div
            className="absolute inset-0 bg-radial from-amber-500/10 to-surface-2 bg-cover bg-center opacity-[0.06] group-hover:opacity-[0.10] transition-opacity pointer-events-none"
            style={{ backgroundImage: `url('/images/kotowaza-zen.jpg')` }}
          />
          <div className="relative z-10 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>
                  Peribahasa · <span lang="ja" className="font-jp">ことわざ</span>
                </span>
              </span>
              <span className="text-xs font-medium uppercase px-2.5 py-0.5 rounded-full bg-surface-2 text-appText-muted border border-border shrink-0">
                {dailyKotowaza.category}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 relative">
              <div className="min-w-0 pr-12">
                <div className="font-display text-xl sm:text-2xl font-bold text-appText-bright leading-snug" lang="ja">
                  {dailyKotowaza.jp}
                </div>
                <div className="text-xs sm:text-sm text-accent font-mono mt-0.5">
                  {dailyKotowaza.reading}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (isSpeakingKotowaza) return;
                  setIsSpeakingKotowaza(true);
                  speakJapanese(dailyKotowaza.jp, 1.0, () => setIsSpeakingKotowaza(false), () => setIsSpeakingKotowaza(false));
                }}
                className={`absolute right-0 top-0 w-11 h-11 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] min-w-[44px] min-h-[44px] rounded-xl border text-accent flex items-center justify-center transition-all shrink-0 active:scale-95 cursor-pointer ${
                  isSpeakingKotowaza
                    ? 'bg-accent text-white dark:text-stone-950 border-accent'
                    : 'bg-surface-2 hover:bg-surface-3 border-border'
                }`}
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

          <div className="relative z-10 pt-2.5 border-t border-border flex items-center justify-between text-xs text-appText-muted">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-accent shrink-0" />
              <span>366+ Peribahasa</span>
            </span>
            <button
              type="button"
              onClick={openKotowaza}
              className="text-accent hover:underline font-semibold flex items-center gap-1 hover:text-accent-hot transition-colors cursor-pointer min-h-[44px] px-2 active:scale-95"
            >
              <span>Jelajahi Galeri →</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── TIER 3: QUICK UTILITIES STRIP (3 Direct Tools + 1 Organized Drawer) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          type="button"
          onClick={openKana}
          className="min-h-[44px] p-2 sm:p-2.5 rounded-xl bg-surface border border-border hover:border-accent/40 text-left transition-all hover:bg-surface-2 group flex items-center gap-2.5 active:scale-[0.99] shadow-xs cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent font-jp font-bold flex items-center justify-center text-xs shrink-0 group-hover:scale-105 transition-transform">
            あ/ア
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-appText-bright truncate group-hover:text-accent transition-colors">
              Bagan Kana
            </div>
            <div className="text-xs text-appText-muted line-clamp-1">Hiragana & Katakana</div>
          </div>
        </button>

        <button
          type="button"
          onClick={openConjugation}
          className="min-h-[44px] p-2.5 rounded-xl bg-surface border border-border hover:border-accent/40 text-left transition-all hover:bg-surface-2 group flex items-center gap-2.5 active:scale-[0.99] shadow-xs cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-nippon-fuji/10 text-nippon-fuji font-bold flex items-center justify-center text-xs shrink-0 group-hover:scale-105 transition-transform">
            🔄
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-appText-bright truncate group-hover:text-accent transition-colors">
              Konjugasi Verba
            </div>
            <div className="text-xs text-appText-muted line-clamp-1">Te, Nai, Ta, Masu</div>
          </div>
        </button>

        <button
          type="button"
          onClick={openBookStudio}
          className="min-h-[44px] p-2.5 rounded-xl bg-surface border border-border hover:border-accent/40 text-left transition-all hover:bg-surface-2 group flex items-center gap-2.5 active:scale-[0.99] shadow-xs cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-nippon-tokiwa/10 text-nippon-tokiwa font-bold flex items-center justify-center text-xs shrink-0 group-hover:scale-105 transition-transform">
            📚
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-appText-bright truncate group-hover:text-accent transition-colors">
              Buku Teks Resmi
            </div>
            <div className="text-xs text-appText-muted line-clamp-1">9 Seri Buku Populer</div>
          </div>
        </button>

        <button
          type="button"
          onClick={openToolbox}
          className="min-h-[44px] p-2.5 rounded-xl bg-surface border border-border hover:border-accent/40 text-left transition-all hover:bg-surface-2 group flex items-center gap-2.5 active:scale-[0.99] shadow-xs cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent font-bold flex items-center justify-center text-xs shrink-0 group-hover:scale-105 transition-transform">
            <Wrench className="w-4 h-4 text-accent" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-appText-bright truncate group-hover:text-accent transition-colors flex items-center gap-1">
              <span>Semua Alat</span>
              <ChevronRight className="w-3 h-3 text-accent shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="text-xs text-appText-muted line-clamp-1">Drawer Alat Lengkap</div>
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
          <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-2 border border-border self-start sm:self-auto">
            <button
              type="button"
              onClick={() => {
                setRoadmapViewMode('focus');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className={`min-h-[44px] px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer ${
                roadmapViewMode === 'focus'
                  ? 'bg-accent text-bg shadow-sm font-extrabold'
                  : 'text-appText-muted hover:text-appText-bright'
              }`}
            >
              <span>🎯 Unit Aktif (Fokus)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setRoadmapViewMode('all');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className={`min-h-[44px] px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer ${
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
          <div className="bg-surface border border-border rounded-2xl p-4 sm:p-6 shadow-xs space-y-4 animate-in fade-in duration-200">
            {/* Unit Header with Progress */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-amber-500/15 text-accent border border-amber-500/30 tabular-nums">
                    Unit {activeUnit.unit_number}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-appText-bright truncate">
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
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold tabular-nums">
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

            {/* Horizontal Quick Unit Switcher with Right-edge Fade Mask */}
            {trackData?.units && trackData.units.length > 1 && (
              <div className="relative max-w-full">
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-surface to-transparent sm:hidden z-10" />
                <div ref={unitSwitcherRef} className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 max-w-full">
                  {trackData.units.map((u) => {
                    const isCurrent = activeUnit?.id === u.id;
                    const completedInU =
                      u.lessons?.filter((l) => currentTrackProgress.completedLessons.includes(l.id)).length || 0;
                    const isUnitDone = u.lessons?.length ? completedInU === u.lessons.length : false;
                    return (
                      <button
                        key={u.id}
                        data-unit-id={u.id}
                        type="button"
                        onClick={() => setSelectedUnitId(u.id)}
                        className={`min-h-[44px] px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 active:scale-95 shrink-0 cursor-pointer ${
                          isCurrent
                            ? 'bg-amber-500/15 text-accent border border-amber-500/35 shadow-xs'
                            : 'bg-surface-2 hover:bg-surface-3 text-appText-muted border border-border'
                        }`}
                      >
                        <span>Unit {u.unit_number}</span>
                        {isUnitDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Progressive Disclosure: Compact Target Can-Do Card with Optional Expand */}
            {activeUnit.can_do_summary && (
              <div className="p-3.5 rounded-r-lg bg-amber-500/10 border-l-4 border-accent text-xs space-y-1.5">
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-accent min-w-0">
                    <span>🎯</span>
                    <span className="break-words">Target Kemampuan Nyata (Sasaran Can-Do):</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowUnitExpectation(!showUnitExpectation)}
                    className="min-h-[44px] px-2 text-xs font-semibold text-accent hover:underline flex items-center gap-1 cursor-pointer active:scale-95 shrink-0"
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
              <div className="p-3.5 rounded-r-lg bg-amber-500/8 border-l-4 border-amber-500/40 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-accent">
                  <span className="sr-only">Fokus Analisis Kontrasif L1</span>
                  <span>💡</span>
                  <span>Tips Bahasa (Waspada Pola Bahasa Indonesia):</span>
                </div>
                <p className="text-xs sm:text-sm text-appText leading-relaxed">
                  {activeUnit.l2d_focus_notes
                    .replace(/contrastive-adalah-copula/g, 'pola "adalah" vs desu')
                    .replace(/contrastive-/g, '')
                    .replace(/-/g, ' ')}
                </p>
              </div>
            )}

            {/* Clean, Non-Condensed Lesson Nodes for this Unit (Flattened Single Card) */}
            <div className="divide-y divide-border border-t border-border overflow-hidden">
              {activeUnit.lessons?.map((lesson) => {
                const isLessonDone = currentTrackProgress.completedLessons.includes(lesson.id);
                const isNextTarget = nextLesson?.lessonId === lesson.id;
                const score = currentTrackProgress.lessonScores?.[lesson.id];

                return (
                  <div
                    key={lesson.id}
                    className={`p-3.5 sm:p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isNextTarget
                        ? 'bg-amber-500/8'
                        : isLessonDone
                        ? 'bg-surface hover:bg-surface-2/40'
                        : 'bg-surface hover:bg-surface-2/60'
                    }`}
                  >
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-surface-3 text-appText-muted border border-border tabular-nums">
                          Pelajaran #{lesson.lesson_number}
                        </span>
                        {isLessonDone ? (
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Tuntas {score ? `(${score}%)` : ''}
                          </span>
                        ) : isNextTarget ? (
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-accent border border-amber-500/35 flex items-center gap-1">
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
                          <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40 tabular-nums">
                            {lesson.grammar_ids.length} Tata Bahasa
                          </span>
                        )}
                        {lesson.vocab_ids && lesson.vocab_ids.length > 0 && (
                          <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40 tabular-nums">
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
                        className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 shadow-xs cursor-pointer ${
                          isNextTarget
                            ? 'bg-accent hover:bg-accent-hot text-stone-950 font-bold'
                            : isLessonDone
                            ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25'
                            : 'bg-surface-2 hover:bg-surface-3 text-appText-bright border border-border'
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
                onClick={() => {
                  setRoadmapViewMode('all');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="min-h-[44px] text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1.5 py-1 px-3 rounded-lg hover:bg-amber-500/10 transition-colors cursor-pointer"
              >
                <span>Lihat Seluruh Silabus Kurikulum ({trackData?.units?.length || 0} Unit Lengkap)</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-surface border border-border rounded-2xl p-3 sm:p-5 shadow-xs space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between px-2 pt-1">
              <span className="text-xs text-appText-muted">Menampilkan seluruh unit silabus:</span>
              <button
                type="button"
                onClick={() => {
                  setRoadmapViewMode('focus');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="min-h-[44px] text-xs font-bold text-accent hover:underline flex items-center gap-1 cursor-pointer"
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
          <div className="card-interactive-lift lg:col-span-1 bg-surface border border-border rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-xs min-h-[220px]">
            <div>
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5 whitespace-nowrap">
                  <span>Kotoba Hari Ini · 今日の言葉</span>
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-accent border border-amber-500/30 uppercase whitespace-nowrap">
                    {`JLPT ${dailyWord.level.toUpperCase()}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => openDetailModal(dailyWord, 'vocab')}
                    className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-surface-2 hover:bg-surface-3 border border-border text-appText-muted hover:text-accent flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
                    title="Lihat Detail & Contoh Kalimat"
                    aria-label={`Lihat detail kosakata ${dailyWord.word}`}
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2 my-1.5 sm:my-2">
                <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-appText-bright" lang="ja">
                    {dailyWord.word}
                    <span className="text-sm sm:text-base font-normal text-appText-muted font-ui ml-2">
                      【{dailyWord.reading}】
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (isSpeakingDailyWord) return;
                      setIsSpeakingDailyWord(true);
                      speakJapanese(dailyWord.word, 1.0, () => setIsSpeakingDailyWord(false), () => setIsSpeakingDailyWord(false));
                    }}
                    className={`w-11 h-11 min-w-[40px] min-h-[40px] min-w-[44px] min-h-[44px] rounded-xl border border-border text-accent flex items-center justify-center transition-all active:scale-95 shrink-0 cursor-pointer ${
                      isSpeakingDailyWord
                        ? 'bg-accent text-stone-950 ring-2 ring-accent/50 animate-pulse border-accent'
                        : 'bg-surface-2 hover:bg-surface-3'
                    }`}
                    title="Dengarkan pelafalan"
                    aria-label={`Dengarkan pelafalan ${dailyWord.word}`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-sm sm:text-base font-semibold text-accent leading-snug break-words">
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

            <div className="text-xs text-appText-muted mt-2.5 pt-2.5 sm:mt-3 sm:pt-3 border-t border-border flex items-center justify-between">
              <span className="capitalize font-medium">
                {(() => {
                  if (!dailyWord.pos) return 'Kata kerja · Bentuk kamus';
                  const p = dailyWord.pos.toLowerCase();
                  if (p.includes('noun')) return 'Nomina (Kata Benda)';
                  if (p.includes('verb')) return 'Verba (Kata Kerja)';
                  if (p.includes('adj')) return 'Adjektiva (Kata Sifat)';
                  if (p.includes('adv')) return 'Adverbia (Kata Keterangan)';
                  return dailyWord.pos;
                })()}
              </span>
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
        <div className="lg:col-span-2 bg-surface border border-border rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-2.5">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-appText-bright">
                Ritme Belajar & Konsistensi (49 Hari)
              </span>
            </div>
            <span className="text-xs sm:text-sm font-mono font-bold text-accent tabular-nums">
              Streak {streak} Hari Berturut-turut
            </span>
          </div>

          <div className="w-full max-w-full">
            <HeatmapCalendar days={49} hideWrapper />
          </div>

          <div className="text-xs text-appText-muted flex items-center justify-between pt-2 border-t border-border">
            <span>Aktivitas terekam otomatis setiap kali kamu menyelesaikan latihan atau drill.</span>
            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className="min-h-[44px] px-3 py-1.5 text-xs font-bold text-accent hover:underline inline-flex items-center gap-1 shrink-0 active:scale-95 cursor-pointer"
            >
              <span>Lihat Detail Statistik →</span>
            </button>
          </div>
        </div>
      </div>

      {/* Badges Modal */}
      <BadgesModal isOpen={isBadgesOpen} onClose={() => setIsBadgesOpen(false)} />
    </div>
  );
};