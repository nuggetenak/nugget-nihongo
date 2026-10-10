// ══════════════════════════════════════════════════════════════════
//  CurriculumTrackBrowser.tsx — Nugget Nihongo Original Curriculum Hub
//  Visualized 8-Track Pedagogical Roadmap (JLPT N5–N1 & SSW Vocational)
//  Synthesized from Processability Theory & L1 Indonesian Contrastive Engine
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useMemo } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Clock,
  ArrowRight,
  Lock,
  Unlock,
  Volume2,
  Layers,
  ShieldCheck,
  AlertTriangle,
  HeartPulse,
  Utensils,
  HardHat,
  Briefcase,
  GraduationCap,
  Flame,
  Zap,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';
import {
  useCurriculumStore,
  TrackId,
} from '../../lib/curriculum/curriculumStore';
import {
  loadCurriculumTrack,
  CurriculumTrackData,
  CurriculumUnit,
  NormalizedVocab,
  NormalizedGrammar,
  L1Substratum,
} from '../../lib/data/dataManager';
import { useAppStore } from '../../store/useAppStore';
import { speakJapanese } from '../../lib/audio/tts';
import { playSuccessSfx } from '../../lib/audio/sfx';

interface CurriculumTrackBrowserProps {
  vocabList: NormalizedVocab[];
  grammarList: NormalizedGrammar[];
  onSelectItem: (item: NormalizedVocab | NormalizedGrammar, type: 'vocab' | 'grammar') => void;
  onNavigateToQuiz?: (trackId: string, unitId?: string) => void;
}

const PT_STAGE_NAMES: Record<number, { title: string; desc: string }> = {
  1: { title: 'Akses Lemma', desc: 'Kosakata dasar & sapaan formulaik' },
  2: { title: 'Prosedur Kategori', desc: 'Kopula desu, partikel kasus, kelas kata' },
  3: { title: 'Prosedur Frasa', desc: 'Keselarasan frasa nomina & modifikasi sifat' },
  4: { title: 'Prosedur Kalimat (S)', desc: 'Konjugasi verba, bentuk-Te & klausa dasar' },
  5: { title: 'Klausa Subordinat', desc: 'Klausa relatif, pengandaian ~tara/~ba' },
  6: { title: 'Variasi Pragmatis', desc: 'Keigo (Sonkeigo/Kenjougo) & register formal' },
};

const SUBSTRATUM_OPTIONS: Array<{
  id: L1Substratum;
  label: string;
  badge: string;
  desc: string;
}> = [
  {
    id: 'general_indonesian',
    label: 'Bahasa Indonesia Umum',
    badge: 'Umum',
    desc: 'Fokus interferensi SVO ↔ SOV, kopula adalah vs desu, partikel wa/ga.',
  },
  {
    id: 'javanese',
    label: 'Substratum Jawa',
    badge: 'Jawa',
    desc: 'Waspadai plosif bersuara b/d/g, chōon vokal terbuka, & partikel penegas.',
  },
  {
    id: 'sundanese',
    label: 'Substratum Sunda',
    badge: 'Sunda',
    desc: 'Waspadai netralisasi fonem F/P/V, vokal sentral /ə/, & kelembutan vokalisasi.',
  },
  {
    id: 'batak_eastern',
    label: 'Substratum Batak & Timur',
    badge: 'Batak / Timur',
    desc: 'Waspadai ritme suku kata isokronis, aksen nada Tokyo heiban vs nada dinamis.',
  },
];

export const CurriculumTrackBrowser: React.FC<CurriculumTrackBrowserProps> = ({
  vocabList,
  grammarList,
  onSelectItem,
  onNavigateToQuiz,
}) => {
  const {
    activeTrackId,
    setActiveTrack,
    trackProgress,
    completeLesson,
    userSubstratum,
    setUserSubstratum,
    getTrackStats,
  } = useCurriculumStore();

  const {
    showToast,
    incrementXp,
    setActiveTab,
    setUserSubstratum: setAppSubstratum,
  } = useAppStore();

  // Category filter: JLPT academic vs SSW vocational
  const [trackCategory, setTrackCategory] = useState<'jlpt' | 'ssw'>(
    activeTrackId.startsWith('ssw') ? 'ssw' : 'jlpt'
  );

  // Loaded curriculum data
  const [trackData, setTrackData] = useState<CurriculumTrackData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Expanded units state: track which unit IDs are expanded (defaults to first unit)
  const [expandedUnitIds, setExpandedUnitIds] = useState<Record<string, boolean>>({});

  // Substratum picker dropdown open state
  const [isSubstratumDropdownOpen, setIsSubstratumDropdownOpen] = useState(false);

  // Mobile track picker modal state
  const [isMobileTrackPickerOpen, setIsMobileTrackPickerOpen] = useState(false);

  // Track definitions metadata
  const jlptTracks: Array<{
    id: TrackId;
    title: string;
    level: string;
    units: string;
    grammarCount: string;
    icon: string;
    themeColor: string;
  }> = [
    { id: 'n5', title: 'Jalur N5', level: 'N5 · Pemula', units: '10 Unit', grammarCount: '94 Pola', icon: '🌱', themeColor: 'amber' },
    { id: 'n4', title: 'Jalur N4', level: 'N4 · Dasar Harian', units: '12 Unit', grammarCount: '92 Pola', icon: '🌿', themeColor: 'emerald' },
    { id: 'n3', title: 'Jalur N3', level: 'N3 · Menengah', units: '20 Unit', grammarCount: '163 Pola', icon: '🌊', themeColor: 'sky' },
    { id: 'n2', title: 'Jalur N2', level: 'N2 · Pra-Lanjutan', units: '16 Unit', grammarCount: '310 Pola', icon: '⛰️', themeColor: 'indigo' },
    { id: 'n1', title: 'Jalur N1', level: 'N1 · Mahir', units: '16 Unit', grammarCount: '200 Pola', icon: '⛩️', themeColor: 'rose' },
  ];

  const sswTracks: Array<{
    id: TrackId;
    title: string;
    sector: string;
    units: string;
    desc: string;
    icon: string;
    themeColor: string;
  }> = [
    {
      id: 'ssw-kaigo',
      title: 'SSW Keperawatan Lansia',
      sector: 'Kaigo (介護)',
      units: '8 Unit · 24 Pelajaran',
      desc: 'Prosedur Koe-kake, komunikasi empatik lansia, & laporan SBAR medis darurat.',
      icon: '👵',
      themeColor: 'rose',
    },
    {
      id: 'ssw-food',
      title: 'SSW Pengolahan & Restoran',
      sector: 'Food Service & Processing (外食・飲食)',
      units: '8 Unit · 24 Pelajaran',
      desc: 'Protokol sanitasi 5S/HACCP, instruksi koki, mitigasi alergen, & etika Omotenashi.',
      icon: '🍱',
      themeColor: 'amber',
    },
    {
      id: 'ssw-construction',
      title: 'SSW Konstruksi & Gemba',
      sector: 'Construction (建設業)',
      units: '8 Unit · 24 Pelajaran',
      desc: 'Pencegahan celaka K3 Gemba, komando akustik KYT, & instruksi alat berat.',
      icon: '👷',
      themeColor: 'orange',
    },
  ];

  // Load track data whenever activeTrackId changes
  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    loadCurriculumTrack(activeTrackId)
      .then((data) => {
        if (!isCancelled) {
          setTrackData(data);
          setIsLoading(false);
          // Expand first unit by default
          if (data && data.units && data.units.length > 0) {
            setExpandedUnitIds((prev) => ({
              ...prev,
              [data.units[0].id]: true,
            }));
          }
        }
      })
      .catch((err) => {
        console.error('[CurriculumTrackBrowser] Failed to load track:', err);
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [activeTrackId]);

  // Track progress stats
  const currentProgress = trackProgress[activeTrackId] || {
    completedUnits: [],
    completedLessons: [],
    lessonScores: {},
  };

  const totalLessons = useMemo(() => {
    if (!trackData?.units) return 0;
    return trackData.units.reduce((acc, u) => acc + (u.lessons?.length || 0), 0);
  }, [trackData]);

  const completedLessonsCount = currentProgress.completedLessons.length;
  const progressPercent = totalLessons > 0
    ? Math.min(100, Math.round((completedLessonsCount / totalLessons) * 100))
    : 0;

  const averageScore = useMemo(() => {
    const scores = Object.values(currentProgress.lessonScores || {});
    if (scores.length === 0) return 100;
    const sum = scores.reduce((a, b) => a + b, 0);
    return Math.round(sum / scores.length);
  }, [currentProgress.lessonScores]);

  // Toggle unit expansion
  const toggleUnit = (unitId: string) => {
    setExpandedUnitIds((prev) => ({
      ...prev,
      [unitId]: !prev[unitId],
    }));
  };

  // Expand all / collapse all
  const handleToggleAllUnits = () => {
    if (!trackData?.units) return;
    const allExpanded = trackData.units.every((u) => expandedUnitIds[u.id]);
    const nextState: Record<string, boolean> = {};
    trackData.units.forEach((u) => {
      nextState[u.id] = !allExpanded;
    });
    setExpandedUnitIds(nextState);
  };

  // Toggle complete lesson
  const handleToggleLessonComplete = (unitId: string, lessonId: string) => {
    const isCompleted = currentProgress.completedLessons.includes(lessonId);
    if (isCompleted) {
      // Toggle off requires direct manipulation or score reset
      showToast('Status pelajaran diperbarui', 'ℹ️');
    } else {
      completeLesson(activeTrackId, unitId, lessonId, 100, 25);
      incrementXp(25);
      playSuccessSfx();
      showToast('Pelajaran selesai! +25 XP didapatkan ⭐', '🎉');
    }
  };

  // Switch Substratum
  const handleSelectSubstratum = (sub: L1Substratum) => {
    setUserSubstratum(sub);
    setAppSubstratum(sub);
    setIsSubstratumDropdownOpen(false);
    showToast(`Dialek disetel ke: ${SUBSTRATUM_OPTIONS.find((s) => s.id === sub)?.label}`, '🗣️');
  };

  const activeSubstratumMeta = SUBSTRATUM_OPTIONS.find((s) => s.id === userSubstratum) || SUBSTRATUM_OPTIONS[0];

  const activeTrackMeta = useMemo(() => {
    return [...jlptTracks, ...sswTracks].find((t) => t.id === activeTrackId);
  }, [activeTrackId, jlptTracks, sswTracks]);

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300">
      {/* ─────────────────────────────────────────────────────────────
          STREAMLINED MOBILE TRACK CARD (Mobile Only: sm:hidden)
          Consolidates Category + Track Selector + Progress into 1 compact bar
         ───────────────────────────────────────────────────────────── */}
      <div className="block sm:hidden bg-gradient-to-r from-surface-2 to-surface border border-accent/25 rounded-2xl p-3.5 space-y-2.5 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          {/* Track selector button */}
          <button
            type="button"
            onClick={() => setIsMobileTrackPickerOpen(true)}
            className="flex items-center gap-2.5 min-w-0 text-left p-1 -m-1 rounded-xl active:scale-95 transition-transform"
          >
            <span className="text-2xl shrink-0 p-1.5 rounded-xl bg-surface-3 border border-accent/15">
              {activeTrackMeta?.icon || '🌱'}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <h2 className="font-extrabold text-sm text-appText-bright truncate">
                  {trackData?.meta?.title || `${activeTrackMeta?.title || 'Jalur N5'} · Kurikulum`}
                </h2>
                <ChevronDown className="w-3.5 h-3.5 text-accent shrink-0" />
              </div>
              <div className="text-[10px] text-appText-muted truncate">
                {trackData?.units?.length || 0} Unit · {totalLessons} Pelajaran
              </div>
            </div>
          </button>

          {/* Dialect selector button */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setIsSubstratumDropdownOpen(!isSubstratumDropdownOpen)}
              className="px-2.5 py-1.5 rounded-xl bg-surface-3 hover:bg-surface border border-accent/20 text-[11px] font-bold text-appText-bright flex items-center gap-1 active:scale-95"
            >
              <span>🗣️ {activeSubstratumMeta.label.split(' ')[0]}</span>
              <ChevronDown className="w-3 h-3 text-appText-muted" />
            </button>

            {isSubstratumDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-surface-2 border border-accent/30 rounded-2xl shadow-xl p-2 z-40 space-y-1 animate-in fade-in">
                <div className="px-2 py-1 text-[10px] font-bold uppercase text-appText-muted tracking-wider border-b border-accent/15 mb-1">
                  Pilih Substratum Bahasa
                </div>
                {SUBSTRATUM_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectSubstratum(opt.id)}
                    className={`w-full min-h-[40px] p-2 rounded-xl text-left text-xs transition-colors flex items-center gap-2 active:scale-95 ${
                      userSubstratum === opt.id
                        ? 'bg-accent text-bg font-bold shadow-sm'
                        : 'text-appText hover:bg-surface-3'
                    }`}
                  >
                    <span>{opt.badge}</span>
                    <span className="truncate">{opt.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Progress summary & bar */}
        <div className="space-y-1 pt-0.5">
          <div className="flex items-center justify-between text-[10px] text-appText-muted font-medium tabular-nums">
            <span>Kesiapan Jalur</span>
            <span>
              <strong className="text-accent">{progressPercent}%</strong> ({completedLessonsCount}/{totalLessons} Pelajaran)
            </span>
          </div>
          <div className="w-full h-1.5 bg-surface-3 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          DESKTOP / TABLET CURRICULUM SELECTOR & HERO (hidden sm:block)
         ───────────────────────────────────────────────────────────── */}
      <div className="hidden sm:block space-y-4 sm:space-y-6">
        {/* 1. TWO-TIER CATEGORY & TRACK SELECTOR */}
        <div className="space-y-2.5 sm:space-y-3">
          {/* Category Switcher: JLPT vs SSW */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-surface-2/90 rounded-2xl border border-accent/20 w-full sm:w-fit">
          <button
            onClick={() => {
              setTrackCategory('jlpt');
              if (activeTrackId.startsWith('ssw')) {
                setActiveTrack('n5');
              }
            }}
            className={`min-h-[44px] px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 active:scale-95 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none ${
              trackCategory === 'jlpt'
                ? 'bg-accent text-bg shadow-sm font-extrabold'
                : 'text-appText-muted hover:text-appText-bright hover:bg-surface-3'
            }`}
          >
            <GraduationCap className="w-4 h-4 shrink-0" />
            <span className="truncate">Jalur JLPT Akademik (N5–N1)</span>
          </button>

          <button
            onClick={() => {
              setTrackCategory('ssw');
              if (!activeTrackId.startsWith('ssw')) {
                setActiveTrack('ssw-kaigo');
              }
            }}
            className={`min-h-[44px] px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 active:scale-95 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none ${
              trackCategory === 'ssw'
                ? 'bg-accent text-bg shadow-sm font-extrabold'
                : 'text-appText-muted hover:text-appText-bright hover:bg-surface-3'
            }`}
          >
            <Briefcase className="w-4 h-4 shrink-0" />
            <span className="truncate">Jalur Kerja SSW Vokasional</span>
          </button>
        </div>

        {/* Track Pills: Horizontal Scroll with Touch Targets >= 44px */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none pb-1 max-w-full">
          {trackCategory === 'jlpt' ? (
            jlptTracks.map((trk) => {
              const isSelected = activeTrackId === trk.id;
              const stats = trackProgress[trk.id];
              const completedCount = stats?.completedLessons?.length || 0;

              return (
                <button
                  key={trk.id}
                  onClick={() => setActiveTrack(trk.id)}
                  className={`min-h-[44px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors border flex items-center gap-1.5 sm:gap-2 shrink-0 active:scale-95 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none ${
                    isSelected
                      ? 'bg-amber-500 text-bg border-amber-500 shadow-md font-extrabold'
                      : 'bg-surface-2 border-accent/20 text-appText-muted hover:text-appText-bright hover:border-accent/40'
                  }`}
                >
                  <span className="text-sm sm:text-base">{trk.icon}</span>
                  <div className="text-left">
                    <div className="leading-tight text-xs font-bold">{trk.title}</div>
                    <div className="text-[10px] opacity-80 font-normal tabular-nums hidden sm:block">
                      {trk.units} · {completedCount > 0 ? `${completedCount} selesai` : trk.grammarCount}
                    </div>
                  </div>
                </button>
              );
            })
          ) : (
            sswTracks.map((trk) => {
              const isSelected = activeTrackId === trk.id;
              const stats = trackProgress[trk.id];
              const completedCount = stats?.completedLessons?.length || 0;

              return (
                <button
                  key={trk.id}
                  onClick={() => setActiveTrack(trk.id)}
                  className={`min-h-[44px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors border flex items-center gap-2 shrink-0 active:scale-95 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none ${
                    isSelected
                      ? 'bg-amber-500 text-bg border-amber-500 shadow-md font-extrabold'
                      : 'bg-surface-2 border-accent/20 text-appText-muted hover:text-appText-bright hover:border-accent/40'
                  }`}
                >
                  <span className="text-sm sm:text-base">{trk.icon}</span>
                  <div className="text-left">
                    <div className="leading-tight text-xs font-bold">{trk.title}</div>
                    <div className="text-[10px] opacity-80 font-normal tabular-nums hidden sm:block">
                      {trk.units} {completedCount > 0 ? `· ${completedCount} selesai` : ''}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. TRACK HERO & MASTER PROGRESS DASHBOARD (Mobile Zen Layout)
         ───────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-surface-2 via-surface to-surface-2 border border-accent/25 rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-3.5 sm:space-y-5 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          <div className="space-y-1 sm:space-y-1.5 max-w-2xl min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-accent-hot text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wide">
                <Sparkles className="w-3 h-3" />
                {trackCategory === 'jlpt' ? 'Kurikulum Orisinal Nugget Nihongo' : 'Standar Kompetensi Kerja Jepang (SSW)'}
              </span>
              <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-surface-3 text-appText-muted text-[10px] font-mono border border-accent/15 tabular-nums">
                {trackData?.units?.length || 0} Unit · {totalLessons} Pelajaran
              </span>
            </div>

            <h2 className="text-lg sm:text-2xl font-black text-appText-bright tracking-tight break-words">
              {trackData?.meta?.title || 'Memuat Kurikulum…'}
            </h2>

            <p className="text-xs sm:text-sm text-appText-muted leading-relaxed break-words line-clamp-2 sm:line-clamp-none hidden sm:block">
              {trackCategory === 'jlpt'
                ? 'Jalur belajar bertahap yang diorkestrasi menggunakan Processability Theory (Pienemann) dan Analisis Kontrasif L1 Bahasa Indonesia untuk menjamin pemahaman alami tanpa salah kaprah.'
                : 'Kurikulum vokasional berbasis skenario kerja nyata: protokol keselamatan K3 Gemba, komunikasi Koe-kake lansia, standar HACCP, dan pelaporan SBAR baku kepada penyelia Jepang.'}
            </p>
          </div>

          {/* Quick Stats Pill Block (Desktop/Tablet) */}
          <div className="hidden md:flex items-center gap-3 bg-surface-3/90 border border-accent/20 rounded-2xl p-3.5 shrink-0 shadow-inner">
            <div className="text-center px-2">
              <div className="text-[10px] text-appText-muted font-medium uppercase tracking-wider">Progres</div>
              <div className="text-xl font-black text-accent tabular-nums">
                {progressPercent}%
              </div>
            </div>
            <div className="w-px h-8 bg-accent/20" />
            <div className="text-center px-2">
              <div className="text-[10px] text-appText-muted font-medium uppercase tracking-wider">Tuntas</div>
              <div className="text-xl font-black text-appText-bright tabular-nums">
                {completedLessonsCount}/{totalLessons}
              </div>
            </div>
            <div className="w-px h-8 bg-accent/20" />
            <div className="text-center px-2">
              <div className="text-[10px] text-appText-muted font-medium uppercase tracking-wider">Akurasi</div>
              <div className="text-xl font-black text-emerald-400 tabular-nums">
                {averageScore}%
              </div>
            </div>
          </div>
        </div>

        {/* Visual Progress Bar & Summary */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] text-appText-muted font-medium tabular-nums">
            <span>Kesiapan Jalur</span>
            <span>{progressPercent}% Selesai ({completedLessonsCount}/{totalLessons} Pelajaran · Akurasi {averageScore}%)</span>
          </div>
          <div className="w-full h-2 sm:h-2.5 bg-surface-3 rounded-full overflow-hidden p-0.5 border border-accent/15">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-[width] duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. L1 SUBSTRATUM DIALECT SELECTOR BANNER (Sleek Compact Bar)
           ───────────────────────────────────────────────────────────── */}
        <div className="bg-surface/90 border border-amber-500/30 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 flex items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="text-base sm:text-xl p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-amber-500/15 text-accent-hot shrink-0">
              🗣️
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-appText-bright truncate text-xs sm:text-sm">
                  Dialek L1: {activeSubstratumMeta.label}
                </span>
                <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-accent font-bold text-[9px] sm:text-[10px] shrink-0">
                  Aktif
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-appText-muted mt-0.5 leading-normal truncate hidden sm:block">
                {activeSubstratumMeta.desc}
              </p>
            </div>
          </div>

          <div className="relative shrink-0">
            <button
              onClick={() => setIsSubstratumDropdownOpen(!isSubstratumDropdownOpen)}
              className="min-h-[40px] sm:min-h-[44px] px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/25 text-appText-bright font-bold text-xs flex items-center gap-1.5 transition-colors active:scale-95 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
              aria-expanded={isSubstratumDropdownOpen}
              aria-haspopup="listbox"
            >
              <span>Ganti Dialek</span>
              <ChevronDown className="w-3.5 h-3.5 text-appText-muted" />
            </button>

            {isSubstratumDropdownOpen && (
              <div
                className="absolute right-0 bottom-full sm:bottom-auto sm:top-full mt-2 mb-2 w-72 bg-surface-2 border border-accent/30 rounded-2xl shadow-xl p-2 z-30 space-y-1 animate-in fade-in duration-150"
                role="listbox"
              >
                <div className="px-2 py-1 text-[10px] font-bold uppercase text-appText-muted tracking-wider border-b border-accent/15 mb-1">
                  Pilih Substratum Bahasa Daerah
                </div>
                {SUBSTRATUM_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectSubstratum(opt.id)}
                    className={`w-full min-h-[44px] p-2 rounded-xl text-left text-xs transition-colors flex items-start gap-2 active:scale-95 ${
                      userSubstratum === opt.id
                        ? 'bg-accent text-bg font-bold shadow-sm'
                        : 'text-appText hover:bg-surface-3'
                    }`}
                    role="option"
                    aria-selected={userSubstratum === opt.id}
                  >
                    <span className="font-bold shrink-0">{opt.badge}</span>
                    <div className="min-w-0">
                      <div className="leading-tight">{opt.label}</div>
                      <div className={`text-[10px] mt-0.5 line-clamp-1 ${userSubstratum === opt.id ? 'opacity-90' : 'text-appText-muted'}`}>
                        {opt.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. PROCESSABILITY THEORY STAGE ROADMAP RIBBON (Desktop/Tablet)
         ───────────────────────────────────────────────────────────── */}
      {trackCategory === 'jlpt' && (
        <div className="hidden sm:block space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="font-bold text-appText-bright flex items-center gap-1.5">
              <span>Tangga Perkembangan Bahasa (Processability Theory)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-3 text-appText-muted font-normal">
                Pienemann
              </span>
            </div>
          </div>

          {/* Desktop 6-stage roadmap grid */}
          <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((stageNum) => {
              const info = PT_STAGE_NAMES[stageNum];
              const hasUnitsInTrack = trackData?.units?.some((u) => u.pt_stage === stageNum);

              return (
                <div
                  key={stageNum}
                  className={`p-2.5 rounded-xl border text-left transition-colors min-w-0 ${
                    hasUnitsInTrack
                      ? 'bg-surface-2 border-amber-500/40 text-appText-bright shadow-sm'
                      : 'bg-surface/50 border-accent/10 text-appText-muted/50 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-1 text-[10px] font-mono font-extrabold text-accent">
                    <span>Tahap {stageNum}</span>
                    {hasUnitsInTrack && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                  </div>
                  <div className="font-bold text-xs truncate mt-0.5 text-appText-bright">{info.title}</div>
                  <div className="text-[10px] text-appText-muted line-clamp-1 mt-0.5">{info.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. UNITS & LESSONS HIERARCHICAL ACCORDION
         ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between pt-1">
        <h3 className="text-xs font-bold uppercase tracking-wider text-appText-muted">
          Daftar Unit & Pelajaran
        </h3>
        <button
          onClick={handleToggleAllUnits}
          className="text-xs font-bold text-accent hover:underline active:scale-95 focus-visible:ring-1 focus-visible:ring-amber-500 rounded px-2 py-1"
        >
          Buka / Tutup Semua
        </button>
      </div>
      {isLoading ? (
        <div className="py-16 text-center space-y-3">
          <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="text-xs text-appText-muted animate-pulse">
            Memuat materi kurikulum {activeTrackId.toUpperCase()}… 📖
          </div>
        </div>
      ) : !trackData?.units || trackData.units.length === 0 ? (
        <div className="py-16 text-center bg-surface-2 rounded-2xl border border-accent/20 p-6 space-y-3">
          <div className="text-3xl">📭</div>
          <div className="text-sm font-bold text-appText-bright">Kurikulum sedang disiapkan</div>
          <p className="text-xs text-appText-muted max-w-md mx-auto">
            Materi untuk jalur ini sedang disinkronkan dari repositori riset. Silakan pilih jalur lain di atas.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {trackData.units.map((unit) => {
            const isExpanded = !!expandedUnitIds[unit.id];
            const unitLessons = unit.lessons || [];
            const completedInUnit = unitLessons.filter((l) =>
              currentProgress.completedLessons.includes(l.id)
            ).length;
            const isUnitFullyCompleted =
              unitLessons.length > 0 && completedInUnit === unitLessons.length;
            const stageInfo = PT_STAGE_NAMES[unit.pt_stage] || {
              title: `Tahap ${unit.pt_stage}`,
              desc: '',
            };

            return (
              <div
                key={unit.id}
                className={`bg-surface border transition-colors rounded-2xl overflow-hidden shadow-sm ${
                  isUnitFullyCompleted
                    ? 'border-emerald-500/40 bg-surface/95'
                    : 'border-accent/20 hover:border-accent/40'
                }`}
              >
                {/* Unit Header (Interactive Click to Expand) */}
                <button
                  type="button"
                  onClick={() => toggleUnit(unit.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-start sm:items-center justify-between gap-3 cursor-pointer min-h-[56px] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                    <span className="text-2xl sm:text-3xl p-2 rounded-xl bg-surface-2 border border-accent/15 shrink-0 select-none">
                      {unit.icon || '📘'}
                    </span>

                    <div className="min-w-0 space-y-0.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-500/15 text-accent border border-amber-500/25 tabular-nums">
                          Unit {unit.unit_number}
                        </span>
                        {unit.pt_stage && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-surface-2 text-appText-muted border border-accent/15">
                            Tahap {unit.pt_stage}: {stageInfo.title}
                          </span>
                        )}
                        {isUnitFullyCompleted && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Tuntas
                          </span>
                        )}
                      </div>

                      <div className="text-base sm:text-lg font-bold text-appText-bright tracking-tight break-words">
                        {unit.title_id}
                      </div>

                      <div className="text-xs text-appText-muted font-jp font-medium">
                        {unit.title_jp} · <span className="italic">{unit.theme}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-center">
                    {/* Unit Lesson Progress Tally */}
                    <div className="hidden sm:flex flex-col items-end text-right">
                      <div className="text-xs font-bold text-appText-bright tabular-nums">
                        {completedInUnit} / {unitLessons.length} Pelajaran
                      </div>
                      <div className="text-[10px] text-appText-muted">
                        {Math.round((completedInUnit / (unitLessons.length || 1)) * 100)}% Selesai
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-surface-2 text-appText-muted hover:text-appText-bright transition-colors">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Unit Details Body */}
                {isExpanded && (
                  <div className="px-4 sm:px-6 pb-6 pt-1 space-y-4 border-t border-accent/10 animate-in fade-in duration-200">
                    {/* Can-Do Statement Card */}
                    <div className="bg-surface-2/90 border border-accent/20 rounded-2xl p-4 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-appText-bright">
                        <span className="text-sm">🎯</span>
                        <span>Sasaran Kemampuan (Can-Do Descriptors · CEFR-J):</span>
                      </div>
                      <p className="text-xs text-appText leading-relaxed break-words">
                        {unit.can_do_summary}
                      </p>
                    </div>

                    {/* L1 Contrastive & Focus Note (if present) */}
                    {unit.l2d_focus_notes && (
                      <div className="bg-amber-950/20 border border-amber-500/35 rounded-2xl p-4 space-y-1 text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-accent-hot">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          <span>Fokus Analisis Kontrasif L1 Bahasa Indonesia:</span>
                        </div>
                        <p className="text-[11px] text-appText leading-relaxed break-words">
                          {unit.l2d_focus_notes}
                        </p>
                      </div>
                    )}

                    {/* Lesson List Header */}
                    <div className="flex items-center justify-between text-xs font-bold text-appText-muted pt-2 border-t border-accent/10">
                      <span>Daftar Pelajaran di Unit Ini:</span>
                      <span className="text-[11px] font-normal tabular-nums">
                        {unitLessons.length} Pelajaran Tersedia
                      </span>
                    </div>

                    {/* Lessons Grid */}
                    <div className="space-y-3">
                      {unitLessons.map((lesson) => {
                        const isLessonDone = currentProgress.completedLessons.includes(lesson.id);
                        const lessonScore = currentProgress.lessonScores?.[lesson.id] || 100;

                        // Match grammar items
                        const matchedGrammars = (lesson.grammar_ids || [])
                          .map((gid) => grammarList.find((g) => g.id === gid))
                          .filter(Boolean) as NormalizedGrammar[];

                        // Match vocab items
                        const matchedVocabs = (lesson.vocab_ids || [])
                          .map((vid) => vocabList.find((v) => v.id === vid))
                          .filter(Boolean) as NormalizedVocab[];

                        return (
                          <div
                            key={lesson.id}
                            className={`p-4 rounded-2xl border transition-colors space-y-3 ${
                              isLessonDone
                                ? 'bg-surface-2/90 border-emerald-500/30'
                                : 'bg-surface-2/40 border-accent/15 hover:border-accent/30'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                              <div className="space-y-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-surface-3 text-appText-muted border border-accent/15 tabular-nums">
                                    Pelajaran #{lesson.lesson_number}
                                  </span>

                                  {isLessonDone ? (
                                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3" />
                                      Tuntas ({lessonScore}%)
                                    </span>
                                  ) : (
                                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-surface-3 text-appText-muted">
                                      Belum Tuntas
                                    </span>
                                  )}

                                  {lesson.estimated_minutes && (
                                    <span className="text-[10px] text-appText-muted flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {lesson.estimated_minutes} Menit
                                    </span>
                                  )}
                                </div>

                                <div className="text-sm sm:text-base font-bold text-appText-bright break-words">
                                  {lesson.title_id}
                                </div>

                                <div className="text-xs text-appText-muted font-jp">
                                  {lesson.title_jp}
                                </div>

                                <p className="text-xs text-appText leading-relaxed mt-1 break-words">
                                  {lesson.desc_id}
                                </p>

                                {lesson.can_do_statement && (
                                  <div className="text-[11px] text-accent-hot font-medium flex items-start gap-1 mt-1">
                                    <span>🎯</span>
                                    <span className="break-words">Can-Do: {lesson.can_do_statement}</span>
                                  </div>
                                )}
                              </div>

                              {/* Lesson Action Buttons */}
                              <div className="flex sm:flex-col items-center gap-2 shrink-0 self-end sm:self-auto">
                                <button
                                  type="button"
                                  onClick={() => handleToggleLessonComplete(unit.id, lesson.id)}
                                  className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 active:scale-95 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none ${
                                    isLessonDone
                                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                                      : 'bg-accent text-bg shadow-sm hover:brightness-110'
                                  }`}
                                >
                                  {isLessonDone ? (
                                    <>
                                      <CheckCircle2 className="w-3.5 h-3.5" />
                                      <span>Selesai ✓</span>
                                    </>
                                  ) : (
                                    <>
                                      <Circle className="w-3.5 h-3.5" />
                                      <span>Tandai Selesai</span>
                                    </>
                                  )}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    if (onNavigateToQuiz) {
                                      onNavigateToQuiz(activeTrackId, unit.id);
                                    } else {
                                      setActiveTab('quiz');
                                    }
                                  }}
                                  className="min-h-[44px] px-3 py-2 rounded-xl bg-surface-3 hover:bg-surface border border-accent/20 text-appText-bright text-xs font-semibold flex items-center gap-1 transition-colors active:scale-95 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
                                  title="Latihan materi di Arena Kuis"
                                >
                                  <Zap className="w-3 h-3 text-accent" />
                                  <span>Latihan</span>
                                </button>
                              </div>
                            </div>

                            {/* Grammar Points Chips */}
                            {matchedGrammars.length > 0 && (
                              <div className="pt-2 border-t border-accent/10 space-y-1.5">
                                <div className="text-[10px] font-bold uppercase tracking-wider text-appText-muted">
                                  Pola Tata Bahasa Terkait ({matchedGrammars.length}):
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {matchedGrammars.map((g) => (
                                    <button
                                      key={g.id}
                                      onClick={() => onSelectItem(g, 'grammar')}
                                      className="min-h-[36px] px-2.5 py-1 rounded-lg bg-surface hover:bg-surface-3 border border-accent/20 hover:border-accent text-left text-xs transition-colors flex items-center gap-1.5 group active:scale-95 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
                                    >
                                      <span className="font-jp font-bold text-accent group-hover:text-amber-300">
                                        {g.pattern}
                                      </span>
                                      <span className="text-[10px] text-appText-muted truncate max-w-[140px]">
                                        {g.meaning}
                                      </span>
                                      <ExternalLink className="w-2.5 h-2.5 text-appText-muted group-hover:text-appText-bright shrink-0" />
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Vocabulary Chips */}
                            {matchedVocabs.length > 0 && (
                              <div className="pt-1.5 space-y-1.5">
                                <div className="text-[10px] font-bold uppercase tracking-wider text-appText-muted">
                                  Kosakata Inti ({matchedVocabs.length}):
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {matchedVocabs.map((v) => (
                                    <button
                                      key={v.id}
                                      onClick={() => onSelectItem(v, 'vocab')}
                                      className="min-h-[36px] px-2.5 py-1 rounded-lg bg-surface hover:bg-surface-3 border border-accent/15 hover:border-accent text-left text-xs transition-colors flex items-center gap-1.5 group active:scale-95 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
                                    >
                                      <span className="font-jp font-bold text-appText-bright group-hover:text-accent">
                                        {v.word}
                                      </span>
                                      <span className="text-[10px] text-appText-muted truncate max-w-[120px]">
                                        {v.meaning}
                                      </span>
                                      <ExternalLink className="w-2.5 h-2.5 text-appText-muted group-hover:text-appText-bright shrink-0" />
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MOBILE TRACK PICKER BOTTOM SHEET MODAL
         ───────────────────────────────────────────────────────────── */}
      {isMobileTrackPickerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setIsMobileTrackPickerOpen(false)}
        >
          <div
            className="w-full sm:max-w-md bg-surface-2 border border-accent/25 rounded-t-3xl sm:rounded-3xl p-4 sm:p-6 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200"
            role="dialog"
            aria-modal="true"
            aria-label="Pilih Jalur Kurikulum"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2 border-b border-accent/15">
              <div className="flex items-center gap-2">
                <span className="text-lg">📚</span>
                <span className="font-extrabold text-sm text-appText-bright">Pilih Jalur Kurikulum</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileTrackPickerOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-3 hover:bg-surface text-appText-muted hover:text-appText-bright flex items-center justify-center text-xs font-bold active:scale-95"
                aria-label="Tutup"
              >
                ✕
              </button>
            </div>

            {/* Category Switcher in Modal */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-surface rounded-xl border border-accent/15">
              <button
                type="button"
                onClick={() => setTrackCategory('jlpt')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all min-h-[40px] ${
                  trackCategory === 'jlpt'
                    ? 'bg-accent text-bg shadow-sm font-extrabold'
                    : 'text-appText-muted hover:text-appText-bright'
                }`}
              >
                JLPT (N5–N1)
              </button>
              <button
                type="button"
                onClick={() => setTrackCategory('ssw')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all min-h-[40px] ${
                  trackCategory === 'ssw'
                    ? 'bg-accent text-bg shadow-sm font-extrabold'
                    : 'text-appText-muted hover:text-appText-bright'
                }`}
              >
                SSW Vokasional
              </button>
            </div>

            {/* Track Options Grid */}
            <div className="space-y-2">
              {trackCategory === 'jlpt' ? (
                jlptTracks.map((trk) => {
                  const isSelected = activeTrackId === trk.id;
                  const stats = trackProgress[trk.id];
                  const completedCount = stats?.completedLessons?.length || 0;
                  return (
                    <button
                      key={trk.id}
                      type="button"
                      onClick={() => {
                        setActiveTrack(trk.id);
                        setIsMobileTrackPickerOpen(false);
                      }}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-colors min-h-[52px] active:scale-98 ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 text-appText-bright font-bold ring-1 ring-amber-500'
                          : 'bg-surface hover:bg-surface-3 border-accent/15 text-appText'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-xl shrink-0">{trk.icon}</span>
                        <div className="min-w-0">
                          <div className="font-bold text-xs text-appText-bright">{trk.title}</div>
                          <div className="text-[10px] text-appText-muted">{trk.level} · {trk.units}</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        {completedCount > 0 ? (
                          <span className="text-[10px] text-emerald-400 font-bold">{completedCount} tuntas</span>
                        ) : (
                          <span className="text-[10px] text-appText-muted">{trk.grammarCount}</span>
                        )}
                      </div>
                    </button>
                  );
                })
              ) : (
                sswTracks.map((trk) => {
                  const isSelected = activeTrackId === trk.id;
                  const stats = trackProgress[trk.id];
                  const completedCount = stats?.completedLessons?.length || 0;
                  return (
                    <button
                      key={trk.id}
                      type="button"
                      onClick={() => {
                        setActiveTrack(trk.id);
                        setIsMobileTrackPickerOpen(false);
                      }}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-colors min-h-[52px] active:scale-98 ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 text-appText-bright font-bold ring-1 ring-amber-500'
                          : 'bg-surface hover:bg-surface-3 border-accent/15 text-appText'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-xl shrink-0">{trk.icon}</span>
                        <div className="min-w-0">
                          <div className="font-bold text-xs text-appText-bright">{trk.title}</div>
                          <div className="text-[10px] text-appText-muted">{trk.sector}</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        {completedCount > 0 ? (
                          <span className="text-[10px] text-emerald-400 font-bold">{completedCount} tuntas</span>
                        ) : (
                          <span className="text-[10px] text-appText-muted">{trk.units}</span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
