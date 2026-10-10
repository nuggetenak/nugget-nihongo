import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Layers,
  Flame,
  Sprout,
  ArrowRight,
  Sparkles,
  Award,
  Volume2,
  Info,
  Clock,
  Compass,
  CheckCircle2,
  Calendar,
  Zap,
  TrendingUp,
  ChevronRight,
  BookMarked,
  Quote,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
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
  } = useAppStore();

  const [isBadgesOpen, setIsBadgesOpen] = useState(false);
  const [isKanaOpen, setIsKanaOpen] = useState(false);
  const [isConjugationOpen, setIsConjugationOpen] = useState(false);
  const [isNuanceOpen, setIsNuanceOpen] = useState(false);
  const [dailyWord, setDailyWord] = useState<NormalizedVocab | null>(null);
  const [selectedWordForModal, setSelectedWordForModal] = useState<NormalizedVocab | null>(null);

  const dailyKotowaza: Kotowaza = useMemo(() => getDailyKotowaza(), []);

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

  // Level Progression Mastery breakdown
  const levelMastery = useMemo(() => {
    const levels: Array<{ id: JLPTLevel; label: string; total: number; color: string }> = [
      { id: 'n5', label: 'JLPT N5', total: 1085, color: 'bg-emerald-500' },
      { id: 'n4', label: 'JLPT N4', total: 1038, color: 'bg-blue-500' },
      { id: 'n3', label: 'JLPT N3', total: 2531, color: 'bg-amber-500' },
      { id: 'n2', label: 'JLPT N2', total: 654, color: 'bg-purple-500' },
      { id: 'n1', label: 'JLPT N1', total: 390, color: 'bg-rose-500' },
    ];

    return levels.map((lvl) => {
      // Count cards tagged with this level
      const learned = Object.entries(cards).filter(([id]) => {
        return id.includes(`-${lvl.id}-`) || id.startsWith(`g${lvl.id}-`) || id.startsWith(`v${lvl.id}-`) || id.startsWith(`${lvl.id}-`);
      }).length;
      const percent = Math.min(100, Math.round((learned / lvl.total) * 100));
      return { ...lvl, learned, percent };
    });
  }, [cards]);

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
    <div className="max-w-5xl mx-auto py-6 space-y-7 animate-in fade-in duration-300">
      {/* Hero Greeting Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950/70 via-amber-900/30 to-surface border border-accent/25 p-6 sm:p-9 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-accent-hot text-xs font-bold">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Streak {streak} Hari Aktif · Pertahankan!</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-appText-bright tracking-tight">
              Selamat Belajar! 今日も頑張ろう
            </h1>

            <p className="text-xs sm:text-sm text-appText-muted leading-relaxed">
              Kuasai bahasa Jepang secara terstruktur dengan sistem pengulangan berjarak FSRS ilmiah, materi 5 level JLPT, dan kebun memori kanji.
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5">
              <button
                onClick={() => setActiveTab('quiz')}
                className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hot text-bg font-bold text-xs flex items-center gap-2 transition-all shadow-glow active:scale-95"
              >
                <span>Mulai Latihan Kuis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab('materi')}
                className="px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-bright border border-accent/20 font-bold text-xs transition-all active:scale-95"
              >
                Buka Materi Hub
              </button>
              <button
                onClick={openFeatureGuide}
                className="px-3.5 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-muted hover:text-accent border border-accent/15 text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Panduan Fitur</span>
              </button>
            </div>
          </div>

          <div className="shrink-0 flex items-center justify-center">
            <img
              src="/icons/logo.png"
              alt="Nugget Nihongo"
              className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-glow ring-2 ring-amber-500/40"
            />
          </div>
        </div>
      </div>

      {/* Smart FSRS Daily Review Widget */}
      <div className="relative overflow-hidden rounded-3xl bg-surface border border-accent/25 p-5 sm:p-6 shadow-md transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm ${
                dueCount > 0
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              {dueCount > 0 ? '📬' : '✨'}
            </div>
            <div>
              <div className="font-extrabold text-sm sm:text-base text-appText-bright flex items-center gap-2">
                <span>
                  {dueCount > 0
                    ? `${dueCount} Kartu Menunggu Diulang Hari Ini`
                    : 'Target Ulasan Hari Ini Selesai!'}
                </span>
                <span
                  className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                    dueCount > 0
                      ? 'bg-accent text-bg'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}
                >
                  {dueCount > 0 ? 'FSRS Due' : 'Prima'}
                </span>
              </div>
              <p className="text-xs text-appText-muted mt-1 leading-relaxed">
                {dueCount > 0
                  ? 'Kartu-kartu ini mencapai interval kritis kelupaan. Review selama 3 menit untuk memperkuat daya ingat jangka panjang.'
                  : 'Semua kartu memori telah direview dengan baik. Kamu siap menjelajahi kosakata atau pola tata bahasa baru!'}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2.5">
            {dueCount > 0 ? (
              <button
                onClick={() => setActiveTab('quiz')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hot text-bg text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
              >
                <Zap className="w-4 h-4 fill-bg" />
                <span>Review Sekarang ({dueCount})</span>
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('materi')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/25 text-appText-bright text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-accent" />
                <span>Tambah Materi Baru</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Tools Bar (Kana, Konjugasi, Nuansa, Onboarding) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          onClick={() => setIsKanaOpen(true)}
          className="p-3 rounded-2xl bg-surface border border-accent/20 hover:border-accent/40 text-left transition-all hover:bg-surface-2 group flex items-center gap-3 active:scale-98"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-accent-hot font-jp font-bold flex items-center justify-center text-sm shrink-0 group-hover:scale-105 transition-transform">
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
          className="p-3 rounded-2xl bg-surface border border-accent/20 hover:border-accent/40 text-left transition-all hover:bg-surface-2 group flex items-center gap-3 active:scale-98"
        >
          <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 font-bold flex items-center justify-center text-sm shrink-0 group-hover:scale-105 transition-transform">
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
          className="p-3 rounded-2xl bg-surface border border-accent/20 hover:border-accent/40 text-left transition-all hover:bg-surface-2 group flex items-center gap-3 active:scale-98"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-400 font-bold flex items-center justify-center text-sm shrink-0 group-hover:scale-105 transition-transform">
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
          onClick={openOnboarding}
          className="p-3 rounded-2xl bg-surface border border-accent/20 hover:border-accent/40 text-left transition-all hover:bg-surface-2 group flex items-center gap-3 active:scale-98"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 font-bold flex items-center justify-center text-sm shrink-0 group-hover:scale-105 transition-transform">
            🍙
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-appText-bright truncate group-hover:text-emerald-300 transition-colors">
              Tur Aplikasi
            </div>
            <div className="text-[10px] text-appText-muted truncate">Panduan 5 Langkah</div>
          </div>
        </button>
      </div>

      {/* Two Pillars Grid: Materi Hub & Arena Kuis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <div
          onClick={() => setActiveTab('materi')}
          className="group cursor-pointer bg-surface border border-accent/20 hover:border-accent/40 rounded-3xl p-6 sm:p-7 space-y-4 transition-all duration-200 hover:-translate-y-1 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-accent-hot">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
              5.600+ Bank Data
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-appText-bright group-hover:text-accent transition-colors flex items-center justify-between">
              <span>Materi Hub</span>
              <ArrowRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h2>
            <p className="text-xs text-appText-muted mt-1 leading-relaxed">
              Jelajahi kosakata dan tata bahasa lewat Jalur JLPT (N5–N1), Jalur Buku Teks (Minna, Irodori), atau Jalur Freeway 21 pola survival.
            </p>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('quiz')}
          className="group cursor-pointer bg-surface border border-accent/20 hover:border-accent/40 rounded-3xl p-6 sm:p-7 space-y-4 transition-all duration-200 hover:-translate-y-1 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-accent-hot">
              <Layers className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              8 Mode Latihan
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-appText-bright group-hover:text-accent transition-colors flex items-center justify-between">
              <span>Arena Kuis</span>
              <ArrowRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h2>
            <p className="text-xs text-appText-muted mt-1 leading-relaxed">
              Uji ketangkasan dengan Flashcard 3D FSRS, Pilihan Ganda Cepat, Latihan Audio Mendengar, Isian Partikel, dan Susun Kalimat.
            </p>
          </div>
        </div>
      </div>

      {/* JLPT Progression Mastery Track */}
      <div className="bg-surface border border-accent/20 rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-wider text-appText-bright">
              Progres Penguasaan Kurikulum JLPT
            </span>
          </div>
          <span className="text-[11px] text-appText-muted">
            {totalLearnedCards} item aktif di sistem FSRS
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 pt-1">
          {levelMastery.map((lvl) => (
            <div
              key={lvl.id}
              onClick={() => handleNavigateLevel(lvl.id)}
              className={`p-3 rounded-2xl bg-surface-2 border border-accent/15 hover:border-accent/40 cursor-pointer transition-all hover:bg-surface-3 group ${
                lvl.id === 'n1' ? 'col-span-2 sm:col-span-1' : ''
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="group-hover:text-accent transition-colors text-appText-bright">
                  {lvl.label}
                </span>
                <span className="text-[11px] font-mono text-appText-muted">{lvl.percent}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-surface-3 overflow-hidden">
                <div
                  className={`h-full ${lvl.color} transition-all duration-500`}
                  style={{ width: `${Math.max(lvl.percent, 2)}%` }}
                />
              </div>

              <div className="mt-2 text-[10px] text-appText-muted flex items-center justify-between">
                <span>{lvl.learned} dipelajari</span>
                <ChevronRight className="w-3 h-3 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-accent" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kotoba Hari Ini & Daily Kotowaza (ことわざ) Wisdom */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Kotoba Hari Ini */}
        <div className="md:col-span-2 bg-surface-2 border border-accent/20 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
              <span>Kotoba Hari Ini · 今日の言葉</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase">
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

          <div className="space-y-2 my-2">
            <div className="flex items-center gap-3">
              <div className="text-2xl sm:text-3xl font-jp font-bold text-appText-bright">
                {dailyWord ? dailyWord.word : '頑張る'}
                <span className="text-sm font-normal text-appText-muted font-ui ml-2">
                  【{dailyWord ? dailyWord.reading : 'がんばる'}】
                </span>
              </div>
              <button
                onClick={() => speakJapanese(dailyWord ? dailyWord.word : '頑張る')}
                className="w-8 h-8 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-accent flex items-center justify-center transition-all active:scale-95"
                title="Dengarkan pelafalan"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="text-sm font-semibold text-accent-hot">
              {dailyWord ? dailyWord.meaning : 'Berusaha keras / Bersemangat'}
            </div>

            {dailyWord?.examples?.[0] ? (
              <div className="text-xs text-appText-muted italic leading-relaxed">
                "{dailyWord.examples[0].jp}" ({dailyWord.examples[0].id})
              </div>
            ) : (
              <div className="text-xs text-appText-muted italic leading-relaxed">
                "諦めずに最後まで頑張りましょう。" (Mari berusaha keras sampai akhir tanpa menyerah.)
              </div>
            )}
          </div>

          <div className="text-[11px] text-appText-muted/70 mt-3 pt-3 border-t border-accent/10 flex items-center justify-between">
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
        <div className="relative overflow-hidden bg-surface-2 border border-accent/20 rounded-3xl p-6 flex flex-col justify-between shadow-sm group">
          {/* Subtle ambient Zen Calligraphy art overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15 group-hover:opacity-25 transition-opacity pointer-events-none"
            style={{ backgroundImage: `url('/images/kotowaza-zen.jpg')` }}
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
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
                <div className="text-lg font-jp font-bold text-appText-bright">
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

              <div className="text-xs font-semibold text-appText-bright pt-1">
                "{dailyKotowaza.meaning}"
              </div>

              <p className="text-[11px] text-appText-muted mt-1 leading-relaxed">
                {dailyKotowaza.wisdom}
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-3 pt-3 border-t border-accent/10 flex items-center justify-between text-[11px] text-appText-muted">
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

      {/* User Quick Stats & Activity Heatmap */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-surface-2 border border-accent/20 rounded-3xl p-6 flex flex-col justify-between">
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

            <div className="space-y-3">
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
                <span className="text-xs font-bold text-green-400">Tercapai 🎯</span>
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
