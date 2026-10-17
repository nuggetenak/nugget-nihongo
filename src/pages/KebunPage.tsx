// ══════════════════════════════════════════════════════════════════
//  KebunPage.tsx — Pusat Retensi FSRS & Kebun Memori (Memory Vault)
//  Scientific Memory Retention Curves, FSRS v4 Metrics & Kanji Garden
// ══════════════════════════════════════════════════════════════════

import React, { useState, useMemo, useEffect } from 'react';
import {
  Brain,
  Sprout,
  Droplets,
  Sparkles,
  Zap,
  TrendingUp,
  Target,
  Clock,
  Layers,
  CheckCircle2,
  AlertCircle,
  Volume2,
  Calendar,
  ChevronRight,
  Info,
  BookOpen,
} from 'lucide-react';
import { useGardenStore, PlantItem } from '../lib/garden/gardenStore';
import { useAppStore } from '../store/useAppStore';
import { speakJapanese } from '../lib/audio/tts';
import { playWaterSfx } from '../lib/audio/sfx';
import { SkeletonGrid } from '../components/ui/SkeletonCard';
import { fsrsForgettingCurve } from '../lib/fsrs/math';

export const KebunPage: React.FC = () => {
  const { waterDrops, plants, waterPlant, waterAll, checkDailyRefill } = useGardenStore();
  const { cards, showToast, incrementXp, setActiveTab, startFSRSDueSession } = useAppStore();

  const [activeTab, setVaultTab] = useState<'vault' | 'garden'>('vault');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<'all' | 'n5' | 'n4' | 'n3' | 'n2'>('all');
  const [wateringId, setWateringId] = useState<string | null>(null);

  // Ticket T-199: Check and grant daily morning water refill (+3 drops)
  useEffect(() => {
    checkDailyRefill();
  }, [checkDailyRefill]);

  // ── FSRS METRICS COMPUTATION (Ye et al. 2022) ───────────────────
  const fsrsStats = useMemo(() => {
    const cardList = Object.entries(cards)
      .map(([id, entry]) => ({ id, ...entry.card }))
      .filter((c) => c && c.due);

    const now = Date.now();
    let dueCount = 0;
    let totalStability = 0;
    let totalDifficulty = 0;
    let totalRetrievability = 0;
    let stateCounts = { new: 0, learning: 0, review: 0, relearning: 0 };

    cardList.forEach((c) => {
      const dueTime = new Date(c.due).getTime();
      if (dueTime <= now) dueCount++;

      totalStability += c.stability || 1;
      totalDifficulty += c.difficulty || 5;

      const elapsedDays = c.last_review
        ? Math.max(0, (now - new Date(c.last_review).getTime()) / 86400000)
        : (c.elapsed_days || 0);
      const r = fsrsForgettingCurve(elapsedDays, c.stability || 1);
      totalRetrievability += r;

      const state = c.state;
      if (state === 0) stateCounts.new++;
      else if (state === 1) stateCounts.learning++;
      else if (state === 2) stateCounts.review++;
      else if (state === 3) stateCounts.relearning++;
      else stateCounts.review++;
    });

    const totalCards = cardList.length;
    const avgStability = totalCards > 0 ? (totalStability / totalCards).toFixed(1) : '0.0';
    const avgDifficulty = totalCards > 0 ? (totalDifficulty / totalCards).toFixed(1) : '0.0';
    // True FSRS Retrievability based on Ye et al. (2022) forgetting curve
    const estimatedRetrievability = totalCards > 0
      ? Math.round((totalRetrievability / totalCards) * 100)
      : 90;

    return {
      totalCards,
      dueCount,
      avgStability,
      avgDifficulty,
      stateCounts,
      estimatedRetrievability,
      cardList,
    };
  }, [cards]);

  // ── KANJI GARDEN COMPUTATION ────────────────────────────────────
  const STAGE_LABELS = [
    { label: 'Benih Ditabur', icon: '🌰', desc: 'Butuh air untuk berkecambah' },
    { label: 'Mulai Bertunas', icon: '🌱', desc: 'Tunas hijau muda mulai muncul' },
    { label: 'Tumbuh Batang', icon: '🌿', desc: 'Daun kanji semakin rimbun' },
    { label: 'Kuncup Bunga', icon: '🪴', desc: 'Hampir mekar sepenuhnya' },
    { label: 'Mekar Sempurna', icon: '🌸', desc: 'Kanji telah terpatri di memori' },
  ];

  const handleWaterSingle = (plant: PlantItem) => {
    if (plant.stage >= 4) {
      showToast(`Kanji ${plant.kanji} sudah mekar sempurna! 🌸`, '✨');
      return;
    }
    if (waterDrops <= 0) {
      showToast('Tetes air habis! Selesaikan latihan kuis untuk mendapatkan air 💧', '⚠️');
      return;
    }
    const success = waterPlant(plant.id);
    if (success) {
      playWaterSfx();
      setWateringId(plant.id);
      setTimeout(() => setWateringId(null), 500);
      incrementXp(5);
      showToast(`Menyiram kanji "${plant.kanji}" (+5 XP)! 💧`, '🌱');
    }
  };

  const handleWaterAll = () => {
    if (waterDrops <= 0) {
      showToast('Tetes air habis! Selesaikan latihan kuis untuk mendapatkan air 💧', '⚠️');
      return;
    }
    const count = waterAll();
    if (count > 0) {
      playWaterSfx();
      incrementXp(count * 5);
      showToast(`Menyiram ${count} tanaman di kebun (+${count * 5} XP)! 🌸`, '✨');
    } else {
      showToast('Semua tanaman yang bisa disiram sudah segar! 🌿', '✨');
    }
  };

  const filteredPlants = selectedLevelFilter === 'all'
    ? plants
    : plants.filter((p) => p.level === selectedLevelFilter);

  const bloomingCount = plants.filter((p) => p.stage === 4).length;

  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-6 pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12 space-y-6 sm:space-y-8 animate-in fade-in duration-300 min-w-0 overflow-x-hidden">
      {/* ── HEADER & DUAL-TAB SWITCHER ────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-accent font-bold text-xs mb-1.5">
            <Brain className="w-3.5 h-3.5" />
            <span>Pusat Retensi FSRS · 記憶保持センター</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-appText-bright tracking-tight">
            Pusat Retensi & Brankas Memori
          </h1>
          <p className="text-xs sm:text-sm text-appText-muted mt-0.5">
            Pantau kekuatan memori jangka panjang berbasis sains FSRS v4 dan siram pertumbuhan kanjimu.
          </p>
        </div>

        {/* Dual Tab Switcher */}
        <div className="flex items-center gap-1 bg-surface-2 p-1 rounded-2xl border border-theme self-start sm:self-auto shrink-0">
          <button
            onClick={() => setVaultTab('vault')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all active:scale-95 ${
              activeTab === 'vault'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-appText-muted hover:text-appText-bright'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>Brankas FSRS</span>
          </button>
          <button
            onClick={() => setVaultTab('garden')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all active:scale-95 ${
              activeTab === 'garden'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-appText-muted hover:text-appText-bright'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span>Kebun Kanji</span>
            {waterDrops > 0 && (
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          TAB 1: BRANKAS RETENSI FSRS (SCIENTIFIC RETENTION VAULT)
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'vault' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Hero Retention Overview Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/10 via-surface to-surface border border-amber-500/35 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-accent font-extrabold text-xs">
                  <span>🔬 Algoritma Free Spaced Repetition (FSRS v4)</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-appText-bright">
                  Retensi Aktif: {fsrsStats.estimatedRetrievability}% Daya Ingat
                </h2>
                <p className="text-xs sm:text-sm text-appText-muted leading-relaxed">
                  FSRS mengestimasi probabilitas kelupaan setiap kartu berdasarkan <b>Stabilitas ($S$)</b> dan <b>Tingkat Kesulitan ($D$)</b>. Sistem menjadwalkan review tepat sebelum ingatanmu pudar, menghemat waktu belajar hingga 40% dibanding flashcard biasa.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                {fsrsStats.totalCards === 0 ? (
                  <button
                    onClick={() => setActiveTab('materi')}
                    className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Mulai Pelajaran Pertama di Materi Hub</span>
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>
                ) : fsrsStats.dueCount === 0 ? (
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className="px-5 py-3 rounded-2xl bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700/60 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Latihan Bebas (Semua Kartu Segar)</span>
                    <ChevronRight className="w-4 h-4 stroke-[2]" />
                  </button>
                ) : (
                  <button
                    onClick={startFSRSDueSession}
                    className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                  >
                    <Zap className="w-4 h-4 fill-stone-950" />
                    <span>Review {fsrsStats.dueCount} Kartu Jatuh Tempo</span>
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>
                )}
                <div className="text-[11px] text-center text-appText-muted">
                  {fsrsStats.totalCards === 0
                    ? '🌱 Pelajari materi baru untuk menumbuhkan tanaman memori'
                    : fsrsStats.dueCount === 0
                    ? '✨ Semua kartu segar & up-to-date!'
                    : '⚠️ Review harian menjaga daya ingat stabil'}
                </div>
              </div>
            </div>
          </div>

          {/* 4 Core Scientific Retention Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-theme space-y-1">
              <div className="text-[11px] font-bold text-appText-muted uppercase tracking-wider flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-accent" />
                <span>Kartu Terdaftar</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-appText-bright font-mono">
                {fsrsStats.totalCards}
              </div>
              <div className="text-[11px] text-appText-muted">
                Kosakata & grammar di memori
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-theme space-y-1">
              <div className="text-[11px] font-bold text-appText-muted uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Jatuh Tempo Hari Ini</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-500 font-mono">
                {fsrsStats.dueCount}
              </div>
              <div className="text-[11px] text-appText-muted">
                Perlu diulas sebelum lupa
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-theme space-y-1">
              <div className="text-[11px] font-bold text-appText-muted uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                <span>Rata-rata Stabilitas</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-500 font-mono">
                {fsrsStats.avgStability} <span className="text-xs font-normal text-appText-muted">hari</span>
              </div>
              <div className="text-[11px] text-appText-muted">
                Daya tahan ingatan rata-rata
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-theme space-y-1">
              <div className="text-[11px] font-bold text-appText-muted uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-sky-500" />
                <span>Indeks Kesulitan (D)</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-sky-500 font-mono">
                {fsrsStats.avgDifficulty} <span className="text-xs font-normal text-appText-muted">/ 10</span>
              </div>
              <div className="text-[11px] text-appText-muted">
                Tingkat kesulitan relatif materi
              </div>
            </div>
          </div>

          {/* Retention Distribution Spectrum */}
          <div className="bg-surface border border-theme rounded-3xl p-5 sm:p-7 space-y-4">
            <h3 className="text-sm sm:text-base font-extrabold text-appText-bright flex items-center gap-2 border-b border-theme pb-3">
              <Layers className="w-4 h-4 text-accent" />
              <span>Distribusi Status Kartu Memori</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-surface-2 border border-theme space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-500 dark:text-blue-300">Baru (New)</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                </div>
                <div className="text-xl font-black font-mono text-appText-bright">
                  {fsrsStats.stateCounts.new}
                </div>
                <div className="text-[10px] text-appText-muted">Belum pernah diulas</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-surface-2 border border-theme space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-500 dark:text-amber-300">Belajar (Learning)</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                </div>
                <div className="text-xl font-black font-mono text-appText-bright">
                  {fsrsStats.stateCounts.learning}
                </div>
                <div className="text-[10px] text-appText-muted">Fase awal pembentukan</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-surface-2 border border-theme space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-500 dark:text-emerald-300">Pengulangan (Review)</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <div className="text-xl font-black font-mono text-appText-bright">
                  {fsrsStats.stateCounts.review}
                </div>
                <div className="text-[10px] text-appText-muted">Interval memori jangka panjang</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-surface-2 border border-theme space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-500 dark:text-rose-300">Evaluasi Ulang</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                </div>
                <div className="text-xl font-black font-mono text-appText-bright">
                  {fsrsStats.stateCounts.relearning}
                </div>
                <div className="text-[10px] text-appText-muted">Pernah lupa dan diperbaiki</div>
              </div>
            </div>

            {/* Scientific Explanation Footer */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-appText-muted leading-relaxed flex items-start gap-3">
              <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div>
                <b className="text-appText-bright font-semibold">Mengapa FSRS v4 lebih efisien?</b> Algoritma FSRS memodelkan kurva peluruhan memori secara matematis. Saat kamu menjawab kartu dengan mudah (Easy), interval review berikutnya akan dilipatgandakan secara aman sehingga kamu tidak membuang waktu mengulang apa yang sudah kamu hafal di luar kepala.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 2: KEBUN KANJI BERKEMBANG (KANJI GROWTH GARDEN)
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'garden' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Garden Stats & Water Drops Hero */}
          <div className="relative overflow-hidden bg-gradient-to-r from-emerald-950/40 via-surface to-surface border border-emerald-500/35 rounded-3xl p-5 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                <Sprout className="w-4 h-4 text-emerald-400" />
                <span>{bloomingCount} dari {plants.length} Kanji Telah Mekar</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-appText-bright">
                Metafora Pertumbuhan Memori Kanji 🌸
              </h2>

              <p className="text-xs text-appText-muted max-w-md leading-relaxed hidden sm:block">
                Selesaikan latihan di Arena Kuis untuk mendapatkan tetesan air segar dan menyiram pohon kanjimu setiap hari.
              </p>
            </div>

            {/* Water Stock Card & Action */}
            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3">
              <div className="flex-1 sm:flex-initial flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-surface-2 border border-theme shadow-sm">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <Droplets className="w-5 h-5 fill-cyan-400 text-cyan-400" />
                </div>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-appText-muted">Air Tersedia</div>
                  <div className="text-base sm:text-xl font-bold font-mono text-cyan-500 dark:text-cyan-400">{waterDrops} Tetes</div>
                </div>
              </div>

              <button
                onClick={handleWaterAll}
                disabled={waterDrops <= 0}
                className="flex-1 sm:flex-initial px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:pointer-events-none text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 min-h-[44px]"
              >
                <Droplets className="w-4 h-4 fill-white" />
                <span>Siram Semua</span>
              </button>
            </div>
          </div>

          {/* Empty Water Drops Guide Banner */}
          {waterDrops === 0 && (
            <div className="bg-surface-2 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-accent border border-amber-500/30 flex items-center justify-center text-lg shrink-0">
                  💧
                </div>
                <div>
                  <div className="text-xs font-bold text-appText-bright">Persediaan Air Habis</div>
                  <div className="text-[11px] text-appText-muted">Selesaikan 1 sesi latihan di Arena Kuis untuk mengumpulkan 2–5 tetes air segar.</div>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('quiz')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm shrink-0 active:scale-95"
              >
                <span>Latihan Kuis Sekarang →</span>
              </button>
            </div>
          )}

          {/* Level Filter Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
            {(['all', 'n5', 'n4', 'n3', 'n2'] as const).map((lvl) => {
              const isSelected = selectedLevelFilter === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevelFilter(lvl)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border uppercase whitespace-nowrap shrink-0 active:scale-95 ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-sm font-black'
                      : 'bg-surface border-theme text-appText-muted hover:text-appText-bright'
                  }`}
                >
                  {lvl === 'all' ? 'Semua Kanji' : `JLPT ${lvl}`}
                </button>
              );
            })}
          </div>

          {/* Responsive Plants Grid */}
          {plants.length === 0 ? (
            <SkeletonGrid count={8} type="plant" />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filteredPlants.map((plant) => {
              const stageInfo = STAGE_LABELS[plant.stage];
              const isMaxBloom = plant.stage >= 4;

              return (
                <div
                  key={plant.id}
                  className={`rounded-2xl sm:rounded-3xl border p-3.5 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-sm ${
                    wateringId === plant.id ? 'animate-water-pulse' : ''
                  } ${
                    isMaxBloom
                      ? 'bg-amber-500/5 border-amber-500/35'
                      : 'bg-surface border-theme hover:border-amber-500/40'
                  }`}
                >
                  {/* Plant Card Header */}
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold uppercase text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-surface-2 border border-theme text-accent">
                      {plant.level.toUpperCase()}
                    </span>
                    <span className="text-base" title={stageInfo.label}>
                      {stageInfo.icon}
                    </span>
                  </div>

                  {/* Kanji Display & Audio */}
                  <div className="text-center py-1 sm:py-2 space-y-1">
                    <div className="flex items-center justify-center gap-2">
                      <div className="text-3xl sm:text-5xl font-jp font-bold text-appText-bright">
                        {plant.kanji}
                      </div>
                      <button
                        onClick={() => speakJapanese(plant.kanji)}
                        className="p-1.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-muted hover:text-accent transition-all active:scale-95"
                        title="Dengarkan pelafalan"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-xs font-jp text-amber-500 dark:text-amber-300 font-semibold truncate">
                      【{plant.reading}】
                    </div>
                    <div className="text-xs font-medium text-appText-bright truncate">
                      {plant.meaning}
                    </div>
                  </div>

                  {/* Growth Progress Bar */}
                  <div className="mt-3 pt-3 border-t border-theme space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-appText-muted font-medium">
                      <span className="truncate">{stageInfo.label}</span>
                      <span className="font-mono tabular-nums shrink-0">{plant.waterCount}/{plant.maxWater}</span>
                    </div>

                    <div className="w-full bg-surface-2 rounded-full h-1.5 sm:h-2 overflow-hidden border border-theme">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-amber-400 h-full rounded-full transition-all duration-300"
                        style={{ width: `${(plant.waterCount / plant.maxWater) * 100}%` }}
                      />
                    </div>

                    {/* Single Water Button */}
                    <button
                      onClick={() => handleWaterSingle(plant)}
                      disabled={isMaxBloom || waterDrops <= 0}
                      className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all mt-2 min-h-[40px] active:scale-95 ${
                        isMaxBloom
                          ? 'bg-surface-2 text-amber-500 dark:text-amber-300 border border-theme cursor-default'
                          : 'bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:pointer-events-none text-white shadow-sm'
                      }`}
                    >
                      <Droplets className="w-3.5 h-3.5" />
                      <span>{isMaxBloom ? 'Mekar Sempurna' : 'Siram (+1)'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </div>
      )}
    </div>
  );
};
