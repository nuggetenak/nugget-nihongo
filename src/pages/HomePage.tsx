import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Layers,
  Flame,
  ArrowRight,
  Sparkles,
  Award,
  Volume2,
  Info,
  Compass,
  Calendar,
  Zap,
  TrendingUp,
  ChevronRight,
  BookMarked,
  Quote,
  Play,
  Target,
  Wrench,
  CheckCircle2,
  Briefcase,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useCurriculumStore, TrackId } from '../lib/curriculum/curriculumStore';
import { HeatmapCalendar } from '../components/gamification/HeatmapCalendar';
import { BadgesModal } from '../components/gamification/BadgesModal';
import { DetailModal } from '../components/ui/DetailModal';
import { KanaChartModal } from '../components/kana/KanaChartModal';
import { ConjugationModal } from '../components/grammar/ConjugationModal';
import { NuanceCompareModal } from '../components/grammar/NuanceCompareModal';
import { loadVocab, NormalizedVocab } from '../lib/data/dataManager';
import { getDailyKotowaza, Kotowaza } from '../lib/data/kotowaza';
import { speakJapanese } from '../lib/audio/tts';
import { JLPTLevel } from '../types/vocab';
import { JapaneseFormattedText } from '../components/ui/JapaneseFormattedText';

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
    openOnboarding,
    openFeatureGuide,
    openKotowaza,
    cards,
    setSelectedLevel,
    openLessonStudy,
    lastStudiedLesson,
    openToolbox,
    openCatPlacement,
  } = useAppStore();

  const [isBadgesOpen, setIsBadgesOpen] = useState(false);
  const [isKanaOpen, setIsKanaOpen] = useState(false);
  const [isConjugationOpen, setIsConjugationOpen] = useState(false);
  const [isNuanceOpen, setIsNuanceOpen] = useState(false);
  const [dailyWord, setDailyWord] = useState<NormalizedVocab | null>(null);
  const [selectedWordForModal, setSelectedWordForModal] = useState<NormalizedVocab | null>(null);
  const [activeSection, setActiveSection] = useState<'grammar' | 'vocab' | 'ssw' | 'stats'>('grammar');

  const { trackProgress, setActiveTrack } = useCurriculumStore();

  const dailyKotowaza: Kotowaza = useMemo(() => getDailyKotowaza(), []);

  // 1. Tata Bahasa Tracks (Grammar JLPT N5–N1)
  const grammarTracks = useMemo(() => {
    const list: Array<{
      id: JLPTLevel;
      label: string;
      title: string;
      desc: string;
      patterns: string;
      color: string;
      icon: string;
    }> = [
      { id: 'n5', label: 'JLPT N5', title: 'Tata Bahasa Dasar', desc: 'Partikel dasar は/が/を, kalimat nominal, bentuk -te, -nai, -ta', patterns: '120+ Pola', color: 'bg-emerald-500', icon: '🌱' },
      { id: 'n4', label: 'JLPT N4', title: 'Tata Bahasa Percakapan', desc: 'Pengandaian たら/ば, keinginan たい, izin てもいい, alasan から/ので', patterns: '140+ Pola', color: 'bg-blue-500', icon: '📘' },
      { id: 'n3', label: 'JLPT N3', title: 'Tata Bahasa Menengah', desc: 'Kausatif, pasif, ekspresi alami, konjungsi wacana & nuansa perasaan', patterns: '160+ Pola', color: 'bg-amber-500', icon: '📙' },
      { id: 'n2', label: 'JLPT N2', title: 'Tata Bahasa Mahir & Bisnis', desc: 'Ekspresi opini formal, bahasa berita, artikel opini, dokumen kantor', patterns: '220+ Pola', color: 'bg-purple-500', icon: '📕' },
      { id: 'n1', label: 'JLPT N1', title: 'Tata Bahasa Tingkat Ahli', desc: 'Nuansa sastra, pola klasik, bahasa hukum, wacana filosofis mendalam', patterns: '210+ Pola', color: 'bg-rose-500', icon: '👑' },
    ];

    return list.map((g) => {
      const learned = Object.entries(cards).filter(([id]) => id.startsWith(`g${g.id}-`)).length;
      const totalPatterns = parseInt(g.patterns, 10) || 120;
      const percent = Math.min(100, Math.round((learned / totalPatterns) * 100));
      return { ...g, learned, percent };
    });
  }, [cards]);

  // 2. Kosakata & Kanji Tracks (Vocab JLPT N5–N1)
  const vocabTracks = useMemo(() => {
    const list: Array<{
      id: JLPTLevel;
      label: string;
      title: string;
      desc: string;
      words: string;
      kanji: string;
      color: string;
      icon: string;
    }> = [
      { id: 'n5', label: 'JLPT N5', title: 'Kosakata Dasar', desc: 'Kata benda harian, kata sifat dasar, kata kerja golongan 1-3', words: '800+ Kata', kanji: '103 Kanji', color: 'bg-emerald-500', icon: '🌱' },
      { id: 'n4', label: 'JLPT N4', title: 'Kosakata Sehari-hari', desc: 'Aktivitas umum, perjalanan, belanja, arah, keluarga, emosi', words: '1.500+ Kata', kanji: '181 Kanji', color: 'bg-blue-500', icon: '📘' },
      { id: 'n3', label: 'JLPT N3', title: 'Kosakata Menengah', desc: 'Istilah abstrak, idiom, kata majemuk, situasi sosial & kerja', words: '3.750+ Kata', kanji: '361 Kanji', color: 'bg-amber-500', icon: '📙' },
      { id: 'n2', label: 'JLPT N2', title: 'Kosakata Lanjutan & Berita', desc: 'Istilah koran, bisnis, teknologi, lingkungan, sains, masyarakat', words: '6.000+ Kata', kanji: '415 Kanji', color: 'bg-purple-500', icon: '📕' },
      { id: 'n1', label: 'JLPT N1', title: 'Kosakata Ahli & Komprehensif', desc: 'Perbendaharaan luas, sinonim presisi tinggi, wacana akademik', words: '10.000+ Kata', kanji: '1.130 Kanji', color: 'bg-rose-500', icon: '👑' },
    ];

    return list.map((v) => {
      const learned = Object.entries(cards).filter(([id]) => id.startsWith(`v${v.id}-`) || id.includes(`-${v.id}-`)).length;
      const totalEstimated = v.id === 'n5' ? 800 : v.id === 'n4' ? 1500 : v.id === 'n3' ? 2500 : 1000;
      const percent = Math.min(100, Math.round((learned / totalEstimated) * 100));
      return { ...v, learned, percent };
    });
  }, [cards]);

  // 3. Vokasional SSW Tracks (Kerja Tokutei Ginou di Jepang)
  const sswTracks = useMemo(() => {
    const list: Array<{
      id: TrackId;
      label: string;
      badge: string;
      units: number;
      lessons: number;
      icon: string;
      focus: string;
    }> = [
      { id: 'ssw-kaigo', label: 'SSW Kaigo (Perawat Lansia)', badge: 'Keperawatan & Medis', units: 8, lessons: 18, icon: '🏥', focus: 'Komunikasi hangat pasien, etika mandi & makan, istilah vital sign & catatan medis' },
      { id: 'ssw-food', label: 'SSW Restoran (Gaishoku)', badge: 'Kuliner & Layanan Tamu', units: 6, lessons: 14, icon: '🍳', focus: 'Sanitasi dapur & standar HACCP, pelayanan ramah omotenashi, instruksi pesanan' },
      { id: 'ssw-construction', label: 'SSW Konstruksi (Kensetsu)', badge: 'Teknik Bangunan & K3', units: 6, lessons: 13, icon: '🦺', focus: 'K3 Keselamatan kerja lapangan, instruksi mandor & alat berat, rambu bahaya' },
    ];

    return list.map((trk) => {
      const prog = trackProgress[trk.id] || { completedLessons: [], completedUnits: [], lessonScores: {} };
      const completed = prog.completedLessons.length;
      const percent = Math.min(100, Math.round((completed / trk.lessons) * 100));
      return { ...trk, completed, percent };
    });
  }, [trackProgress]);

  const handleNavigateCurriculum = (trackId: TrackId) => {
    setActiveTrack(trackId);
    setActiveTab('materi');
  };

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

  // Load daily word
  useEffect(() => {
    let isMounted = true;
    loadVocab('n5')
      .then((vocabList) => {
        if (!isMounted || !vocabList || vocabList.length === 0) return;
        const dayIndex = Math.floor(Date.now() / 86400000);
        const chosen = vocabList[dayIndex % vocabList.length];
        setDailyWord(chosen);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const handleNavigateLevel = (level: JLPTLevel) => {
    setSelectedLevel(level);
    setActiveTab('materi');
  };

  return (
    <div className="max-w-5xl mx-auto pt-3 sm:pt-6 pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12 space-y-4 sm:space-y-6">
      {/* Tier 1: Unified Daily Focus Command Hero (Hero + FSRS Status) */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-950/70 via-amber-900/30 to-surface border border-accent/25 p-4 sm:p-7 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6">
          <div className="max-w-xl space-y-2.5 sm:space-y-3">
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
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-appText-bright tracking-tight">
              Selamat Belajar! 今日も頑張ろう
            </h1>

            <p className="text-xs sm:text-sm text-appText-muted leading-relaxed line-clamp-2 sm:line-clamp-none">
              {dueCount > 0
                ? `Ada ${dueCount} kartu memori yang mencapai interval kritis kelupaan FSRS. Ulas sekarang atau lanjutkan pelajaran terpandumu.`
                : 'Semua kartu memori telah direview dengan baik. Lanjutkan pelajaran kurikulum atau uji kemampuanmu dengan tes adaptif!'}
            </p>

            {/* Core Action Buttons: 1-Tap Lanjut Belajar, FSRS Review, Kotak Peralatan */}
            <div className="pt-1 flex flex-wrap gap-2 sm:gap-2.5">
              {/* Primary 1-Tap Resume Lesson */}
              <button
                onClick={() => {
                  if (lastStudiedLesson) {
                    openLessonStudy(
                      lastStudiedLesson.trackId,
                      lastStudiedLesson.unitId,
                      lastStudiedLesson.lessonId
                    );
                  } else {
                    openLessonStudy('n5', 'n5-u1', 'n5-l1');
                  }
                }}
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-accent hover:bg-accent-hot text-bg font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-glow active:scale-95 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-bg shrink-0" />
                <span className="truncate max-w-[270px] sm:max-w-none">
                  {(() => {
                    if (!lastStudiedLesson) return 'Mulai Belajar · Bab 1 (N5)';
                    const trackLabel = lastStudiedLesson.trackId.toUpperCase();
                    const { unitNum, lessonNum } = extractUnitAndLessonNumbers(
                      lastStudiedLesson.unitId,
                      lastStudiedLesson.lessonId
                    );
                    return `Lanjut Belajar · ${trackLabel} Unit ${unitNum} (Pelajaran ${lessonNum})`;
                  })()}
                </span>
              </button>

              {dueCount > 0 && (
                <button
                  onClick={() => setActiveTab('quiz')}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-accent-hot border border-amber-500/35 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <Zap className="w-3.5 h-3.5 fill-accent-hot" />
                  <span>Review FSRS ({dueCount})</span>
                </button>
              )}

              <button
                onClick={openToolbox}
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-bright border border-accent/25 hover:border-accent/40 font-bold text-xs transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                title="Buka Kotak Peralatan Belajar Lengkap"
              >
                <Wrench className="w-3.5 h-3.5 text-accent" />
                <span>Kotak Peralatan</span>
              </button>

              <button
                onClick={openFeatureGuide}
                className="px-3 py-2 sm:py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-muted hover:text-accent border border-accent/15 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
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

      {/* Tier 2: "Mulai Dari Mana? (Where to Start)" Pathway Guidance Cards */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-wider text-appText-bright">
              Mulai Dari Mana? · Panduan Memilih Jalur
            </span>
          </div>
          <span className="text-[11px] text-appText-muted">Pilih alur belajarmu</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Pathway 1: Absolute Beginner */}
          <div className="p-4 rounded-2xl bg-surface border border-accent/20 hover:border-accent/40 transition-all flex flex-col justify-between space-y-3 group shadow-sm">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xl">🌱</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                  Dari Nol
                </span>
              </div>
              <h3 className="text-sm font-bold text-appText-bright group-hover:text-emerald-400 transition-colors">
                Belum Hafal Huruf?
              </h3>
              <p className="text-[11px] text-appText-muted leading-relaxed">
                Mulai dari menguasai Hiragana & Katakana dengan Bagan Kana bersuara penutur asli dan latihan goresan stroke.
              </p>
            </div>
            <button
              onClick={() => setIsKanaOpen(true)}
              className="w-full py-2 px-3 rounded-xl bg-surface-2 group-hover:bg-emerald-500/20 text-emerald-400 border border-accent/15 group-hover:border-emerald-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
            >
              <span>Buka Bagan Kana</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pathway 2: Has Background / Placement Test */}
          <div className="p-4 rounded-2xl bg-surface border border-accent/20 hover:border-accent/40 transition-all flex flex-col justify-between space-y-3 group shadow-sm">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xl">🎯</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-accent-hot border border-amber-500/25">
                  10 Soal Kilat
                </span>
              </div>
              <h3 className="text-sm font-bold text-appText-bright group-hover:text-accent transition-colors">
                Sudah Punya Dasar?
              </h3>
              <p className="text-[11px] text-appText-muted leading-relaxed">
                Uji kemampuanmu lewat Tes Penempatan Mandiri. Sistem akan menentukan rekomendasi level belajarmu secara akurat.
              </p>
            </div>
            <button
              onClick={openCatPlacement}
              className="w-full py-2 px-3 rounded-xl bg-accent/15 group-hover:bg-accent text-accent group-hover:text-bg border border-accent/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
            >
              <span>Tes Penempatan Kilat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pathway 3: Authentic Textbook Follower */}
          <div className="p-4 rounded-2xl bg-surface border border-accent/20 hover:border-accent/40 transition-all flex flex-col justify-between space-y-3 group shadow-sm">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xl">📚</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/25">
                  9 Seri Buku
                </span>
              </div>
              <h3 className="text-sm font-bold text-appText-bright group-hover:text-blue-400 transition-colors">
                Pakai Buku Teks Resmi?
              </h3>
              <p className="text-[11px] text-appText-muted leading-relaxed">
                Akses materi dan bank latihan otentik Minna, Genki, Soumatome, Tobira, Quartet, TRY!, dan Shin Kanzen Master.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('materi')}
              className="w-full py-2 px-3 rounded-xl bg-surface-2 group-hover:bg-blue-500/20 text-blue-400 border border-accent/15 group-hover:border-blue-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
            >
              <span>Perpustakaan Buku</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tier 2B: Sleek Low-Profile Quick Utilities Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          onClick={() => setIsKanaOpen(true)}
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
          onClick={() => setIsConjugationOpen(true)}
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
          onClick={() => setIsNuanceOpen(true)}
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
          onClick={openToolbox}
          className="p-2.5 rounded-2xl bg-surface border border-accent/20 hover:border-accent/40 text-left transition-all hover:bg-surface-2 group flex items-center gap-2.5 active:scale-98 shadow-sm"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 font-bold flex items-center justify-center text-xs shrink-0 group-hover:scale-105 transition-transform">
            🧰
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-appText-bright truncate group-hover:text-emerald-300 transition-colors">
              Semua Alat
            </div>
            <div className="text-[10px] text-appText-muted truncate">7 Referensi Belajar</div>
          </div>
        </button>
      </div>

      {/* Tier 3: Daily Inspiration: Kotoba Hari Ini & Daily Kotowaza (ことわざ) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5">
        {/* Kotoba Hari Ini */}
        <div className="md:col-span-2 bg-surface-2 border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
              <span>Kotoba Hari Ini · 今日の言葉</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10.5px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-accent border border-amber-500/30 uppercase">
                {dailyWord ? `JLPT ${dailyWord.level.toUpperCase()}` : 'JLPT N5'}
              </span>
              {dailyWord && (
                <button
                  onClick={() => setSelectedWordForModal(dailyWord)}
                  className="p-1 rounded-lg bg-surface hover:bg-surface-3 text-appText-muted hover:text-accent transition-colors"
                  title="Lihat Detail & Contoh Kalimat"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-1.5 sm:space-y-2 my-1.5 sm:my-2">
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              <div className="text-xl sm:text-2xl font-jp font-bold text-appText-bright">
                {dailyWord ? dailyWord.word : '頑張る'}
                <span className="text-xs sm:text-sm font-normal text-appText-muted font-ui ml-2">
                  【{dailyWord ? dailyWord.reading : 'がんばる'}】
                </span>
              </div>
              <button
                onClick={() => speakJapanese(dailyWord ? dailyWord.word : '頑張る')}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-accent flex items-center justify-center transition-all active:scale-95 shrink-0"
                title="Dengarkan pelafalan"
              >
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            <div className="text-xs sm:text-sm font-semibold text-accent-hot">
              {dailyWord ? dailyWord.meaning : 'Berusaha keras / Bersemangat'}
            </div>

            {dailyWord ? (() => {
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
            })() : (
              <div className="text-xs text-appText-muted italic leading-relaxed">
                "諦めずに最後まで頑張りましょう。" (Mari berusaha keras sampai akhir tanpa menyerah.)
              </div>
            )}
          </div>

          <div className="text-[11px] text-appText-muted/70 mt-2.5 pt-2.5 sm:mt-3 sm:pt-3 border-t border-accent/10 flex items-center justify-between">
            <span className="capitalize">{dailyWord?.pos || 'Kata kerja · Bentuk kamus'}</span>
            {dailyWord && (
              <button
                onClick={() => setSelectedWordForModal(dailyWord)}
                className="text-accent hover:underline font-semibold text-[11px] flex items-center gap-1"
              >
                <span>Pelajari Selengkapnya</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Kotowaza: Daily Authentic Japanese Proverb */}
        <div className="relative overflow-hidden bg-surface-2 border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col justify-between shadow-sm group">
          {/* Subtle ambient Zen Calligraphy art overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15 group-hover:opacity-25 transition-opacity pointer-events-none"
            style={{ backgroundImage: `url('/images/kotowaza-zen.jpg')` }}
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5 text-accent" />
                <span>Peribahasa · ことわざ</span>
              </span>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-500/15 text-accent border border-amber-500/25">
                {dailyKotowaza.category}
              </span>
            </div>

            <div className="space-y-1.5 my-1">
              <div className="flex items-center justify-between gap-2">
                <div className="text-base sm:text-lg font-jp font-bold text-appText-bright">
                  {dailyKotowaza.jp}
                </div>
                <button
                  onClick={() => speakJapanese(dailyKotowaza.jp)}
                  className="w-7 h-7 rounded-full bg-amber-500/15 hover:bg-amber-500/25 text-accent flex items-center justify-center transition-all shrink-0 active:scale-95"
                  title="Dengarkan peribahasa"
                >
                  <Volume2 className="w-3.5 h-3.5" />
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
              <span>52 Peribahasa</span>
            </span>
            <button
              onClick={openKotowaza}
              className="text-accent hover:underline font-bold flex items-center gap-1 hover:text-accent-hot transition-colors"
            >
              <span>Jelajahi Galeri →</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tier 4: Growth & Progress (Segmented Toggle: Kurikulum JLPT vs Heatmap & Statistik) */}
      <div className="bg-surface border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-3 sm:space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 border-b border-accent/15 pb-2.5 sm:pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-wider text-appText-bright">
              Pemantauan Belajar & Progres
            </span>
          </div>

          {/* Segmented Switcher */}
          <div className="flex items-center gap-1 bg-surface-2 p-1 rounded-xl border border-accent/15 overflow-x-auto scrollbar-none w-full sm:w-auto shrink-0">
            <button
              onClick={() => setActiveSection('grammar')}
              className={`flex-1 sm:flex-initial justify-center px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap active:scale-95 ${
                activeSection === 'grammar'
                  ? 'bg-amber-500 text-stone-950 shadow-sm font-extrabold'
                  : 'text-appText-muted hover:text-appText-bright'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5" />
              <span>Tata Bahasa</span>
            </button>
            <button
              onClick={() => setActiveSection('vocab')}
              className={`flex-1 sm:flex-initial justify-center px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap active:scale-95 ${
                activeSection === 'vocab'
                  ? 'bg-amber-500 text-stone-950 shadow-sm font-extrabold'
                  : 'text-appText-muted hover:text-appText-bright'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kosakata & Kanji</span>
            </button>
            <button
              onClick={() => setActiveSection('ssw')}
              className={`flex-1 sm:flex-initial justify-center px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap active:scale-95 ${
                activeSection === 'ssw'
                  ? 'bg-amber-500 text-stone-950 shadow-sm font-extrabold'
                  : 'text-appText-muted hover:text-appText-bright'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Vokasional SSW</span>
            </button>
            <button
              onClick={() => setActiveSection('stats')}
              className={`flex-1 sm:flex-initial justify-center px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap active:scale-95 ${
                activeSection === 'stats'
                  ? 'bg-amber-500 text-stone-950 shadow-sm font-extrabold'
                  : 'text-appText-muted hover:text-appText-bright'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Statistik</span>
            </button>
          </div>
        </div>

        {activeSection === 'grammar' ? (
          /* View 1: JLPT Grammar Progression (N5–N1) */
          <div className="space-y-3 animate-in fade-in duration-200">
            <div className="flex flex-wrap items-center justify-between text-xs text-appText-muted gap-2">
              <span>Kurikulum Tata Bahasa JLPT N5–N1 (850+ Pola Terstruktur):</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsConjugationOpen(true)}
                  className="font-bold text-accent hover:underline flex items-center gap-1"
                >
                  <span>Simulator Konjugasi ⚙️</span>
                </button>
                <button
                  onClick={() => setActiveTab('materi')}
                  className="font-bold text-accent hover:underline flex items-center gap-1"
                >
                  <span>Buka Materi Hub →</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3 pt-1">
              {grammarTracks.map((g) => (
                <div
                  key={g.id}
                  onClick={() => handleNavigateLevel(g.id)}
                  className="p-3.5 rounded-2xl bg-surface-2 border border-accent/15 hover:border-accent/40 cursor-pointer transition-all hover:bg-surface-3 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-sm shrink-0">{g.icon}</span>
                        <span className="group-hover:text-accent transition-colors text-appText-bright truncate">
                          {g.label}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/15 text-accent-hot border border-amber-500/25 shrink-0 font-mono">
                        {g.patterns}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-appText-bright truncate mb-1">
                      {g.title}
                    </div>

                    <p className="text-[10.5px] text-appText-muted line-clamp-2 leading-tight h-[28px] mb-2">
                      {g.desc}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    {/* Progress bar */}
                    <div className="w-full h-1.5 rounded-full bg-surface-3 overflow-hidden">
                      <div
                        className={`h-full ${g.color} transition-all duration-500`}
                        style={{ width: `${Math.max(g.percent, 3)}%` }}
                      />
                    </div>

                    <div className="text-[10px] text-appText-muted flex items-center justify-between">
                      <span>{g.learned} pola dikuasai</span>
                      <ChevronRight className="w-3 h-3 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-accent" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeSection === 'vocab' ? (
          /* View 2: JLPT Vocabulary & Kanji Progression (N5–N1) */
          <div className="space-y-3 animate-in fade-in duration-200">
            <div className="flex flex-wrap items-center justify-between text-xs text-appText-muted gap-2">
              <span>Perbendaharaan Kosakata & 2.136 Kanji Jouyou (10.000+ Kosakata):</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsKanaOpen(true)}
                  className="font-bold text-accent hover:underline flex items-center gap-1"
                >
                  <span>Tabel Kana あ</span>
                </button>
                <button
                  onClick={() => setActiveTab('materi')}
                  className="font-bold text-accent hover:underline flex items-center gap-1"
                >
                  <span>Buka Materi Hub →</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3 pt-1">
              {vocabTracks.map((v) => (
                <div
                  key={v.id}
                  onClick={() => handleNavigateLevel(v.id)}
                  className="p-3.5 rounded-2xl bg-surface-2 border border-accent/15 hover:border-accent/40 cursor-pointer transition-all hover:bg-surface-3 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-sm shrink-0">{v.icon}</span>
                        <span className="group-hover:text-accent transition-colors text-appText-bright truncate">
                          {v.label}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-appText-muted shrink-0">{v.percent}%</span>
                    </div>

                    <div className="text-xs font-semibold text-appText-bright truncate mb-0.5">
                      {v.title}
                    </div>

                    <div className="text-[10px] text-accent font-mono font-bold mb-1">
                      {v.words} · {v.kanji}
                    </div>

                    <p className="text-[10.5px] text-appText-muted line-clamp-2 leading-tight h-[28px] mb-2">
                      {v.desc}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    {/* Progress bar */}
                    <div className="w-full h-1.5 rounded-full bg-surface-3 overflow-hidden">
                      <div
                        className={`h-full ${v.color} transition-all duration-500`}
                        style={{ width: `${Math.max(v.percent, 3)}%` }}
                      />
                    </div>

                    <div className="text-[10px] text-appText-muted flex items-center justify-between">
                      <span>{v.learned} item dipelajari</span>
                      <ChevronRight className="w-3 h-3 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-accent" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeSection === 'ssw' ? (
          /* View 3: Vokasional SSW (Kerja Tokutei Ginou di Jepang) */
          <div className="space-y-3 animate-in fade-in duration-200">
            {/* Informative SSW Explanatory Banner */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs text-appText-bright flex items-start gap-2.5">
              <Briefcase className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold text-accent">Jalur Karir Vokasional SSW (特定技能): </span>
                <span className="text-appText-muted leading-relaxed">
                  Kurikulum resmi bagi calon tenaga kerja visa Tokutei Ginou 1 & 2 ke Jepang. Materi difokuskan pada kosakata teknis lapangan, SOP keselamatan kerja, dan simulasi percakapan di lingkungan kerja nyata.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {sswTracks.map((trk) => (
                <div
                  key={trk.id}
                  onClick={() => handleNavigateCurriculum(trk.id)}
                  className="p-4 rounded-2xl bg-surface-2 border border-accent/15 hover:border-accent/40 cursor-pointer transition-all hover:bg-surface-3 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-base shrink-0">{trk.icon}</span>
                        <span className="group-hover:text-accent transition-colors text-appText-bright font-bold truncate">
                          {trk.label}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-accent shrink-0">{trk.percent}%</span>
                    </div>

                    <span className="inline-block px-2 py-0.5 rounded-md bg-amber-500/15 text-accent text-[10px] font-bold border border-amber-500/25 mb-2">
                      {trk.badge}
                    </span>

                    <p className="text-[11px] text-appText-muted line-clamp-2 leading-relaxed mb-3">
                      {trk.focus}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-accent/10">
                    <div className="w-full h-1.5 rounded-full bg-surface-3 overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all duration-500"
                        style={{ width: `${Math.max(trk.percent, 3)}%` }}
                      />
                    </div>

                    <div className="text-[10.5px] text-appText-muted flex items-center justify-between">
                      <span>{trk.units} Unit · {trk.lessons} Pelajaran</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-accent shrink-0" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* View 2: User Stats Summary + Activity Heatmap */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 animate-in fade-in duration-200">
            <div className="bg-surface-2 border border-accent/20 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-accent">Statistik Kamu</span>
                  <button
                    onClick={() => setIsBadgesOpen(true)}
                    className="text-[11px] font-bold text-accent-hot hover:underline flex items-center gap-1"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Lencana</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-appText-muted">Total XP</span>
                    <span className="text-sm font-bold font-mono text-appText-bright">{xp} XP</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-appText-muted">Streak Rutin</span>
                    <span className="text-sm font-bold font-mono text-accent-hot">{streak} Hari</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-appText-muted">Total Kartu FSRS</span>
                    <span className="text-sm font-bold font-mono text-appText-bright">{totalLearnedCards}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-appText-muted">Target Harian</span>
                    <span className="text-xs font-bold text-emerald-400">Tercapai 🎯</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-accent/10 flex items-center justify-between text-xs text-appText-muted">
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-accent" />
                  <span>Prestasi</span>
                </span>
                <button onClick={() => setIsBadgesOpen(true)} className="text-accent hover:underline font-semibold">
                  Lihat Lencana →
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <HeatmapCalendar days={49} />
            </div>
          </div>
        )}
      </div>

      {/* Badges Modal */}
      <BadgesModal isOpen={isBadgesOpen} onClose={() => setIsBadgesOpen(false)} />

      {/* Word Detail Modal */}
      <DetailModal item={selectedWordForModal} type="vocab" onClose={() => setSelectedWordForModal(null)} />

      {/* Kana Chart Modal */}
      <KanaChartModal isOpen={isKanaOpen} onClose={() => setIsKanaOpen(false)} />

      {/* Conjugation Modal */}
      <ConjugationModal isOpen={isConjugationOpen} onClose={() => setIsConjugationOpen(false)} />

      {/* Nuance Compare Modal */}
      <NuanceCompareModal isOpen={isNuanceOpen} onClose={() => setIsNuanceOpen(false)} />
    </div>
  );
};
