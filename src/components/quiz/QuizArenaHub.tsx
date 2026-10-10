// ══════════════════════════════════════════════════════════════════
//  QuizArenaHub.tsx — Nugget Nihongo Quiz Arena Command Center
//  2-State Architecture: Re-adjusted & Categorized Drill Hub
// ══════════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  SlidersHorizontal,
  Headphones,
  RotateCcw,
  Flame,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Clock,
  Target,
  Trophy,
  Droplets,
  BarChart2,
  Zap,
  Filter,
} from 'lucide-react';
import { QuizMode } from '../../types/quiz';
import { JLPTLevel } from '../../types/vocab';
import { useGamificationStore } from '../../lib/gamification/gamificationStore';
import { useGardenStore } from '../../lib/garden/gardenStore';
import { useAppStore } from '../../store/useAppStore';

interface QuizArenaHubProps {
  onStartMode: (mode: QuizMode) => void;
  onStartFSRSDue: () => void;
  onStartMistakeReview: () => void;
  onOpenConfig: () => void;
  sessionCount: number;
  selectedLevel: JLPTLevel | 'all';
  dueCount: number;
  mistakesCount: number;
  onSelectLevel?: (level: JLPTLevel) => void;
  onSelectSessionCount?: (count: number) => void;
}

interface ModeCard {
  id: QuizMode;
  category: 'core' | 'specialty';
  name: string;
  nameJp: string;
  icon: string;
  desc: string;
  tag: string;
  estTime: string;
  badgeColor: string;
}

const ARENA_MODES: ModeCard[] = [
  // Core Drills (Fondasi & FSRS)
  {
    id: 'flashcard',
    category: 'core',
    name: 'Flashcard 3D FSRS',
    nameJp: '暗記カード',
    icon: '🃏',
    desc: 'Metode pengulangan berjarak ilmiah. Nilai daya ingatmu: Lupa, Ragu, Ingat, atau Mudah.',
    tag: 'Rekomendasi Utama',
    estTime: '~3 mnt',
    badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
  },
  {
    id: 'multiple-choice',
    category: 'core',
    name: 'Pilihan Ganda Cepat',
    nameJp: '四択クイズ',
    icon: '🔘',
    desc: 'Latih reflek ingatan cepat arti kosakata dan kanji dengan 4 opsi distraktor pintar.',
    tag: 'Reflek',
    estTime: '~2 mnt',
    badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-500/10',
  },
  {
    id: 'fill-in',
    category: 'core',
    name: 'Isian Partikel & Pola',
    nameJp: '助詞穴埋め',
    icon: '✍️',
    desc: 'Lengkapi partikel penghubung (は, が, を, に, で) yang hilang dalam kalimat rumpang.',
    tag: 'Grammar',
    estTime: '~3 mnt',
    badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10',
  },
  {
    id: 'rearrange',
    category: 'core',
    name: 'Susun Kalimat (Builder)',
    nameJp: '語順並べ替え',
    icon: '🧩',
    desc: 'Susun potongan kata acak menjadi struktur tata bahasa Jepang yang alami.',
    tag: 'Sintaksis',
    estTime: '~4 mnt',
    badgeColor: 'border-rose-500/40 text-rose-300 bg-rose-500/10',
  },

  // Specialty & Skill Mastery
  {
    id: 'listening',
    category: 'specialty',
    name: 'Latihan Mendengar (Audio)',
    nameJp: 'リスニング特訓',
    icon: '🎧',
    desc: 'Dengarkan suara penutur asli tanpa melihat teks terlebih dahulu lalu tentukan maknanya.',
    tag: 'Audio Asli',
    estTime: '~3 mnt',
    badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
  },
  {
    id: 'conjugation',
    category: 'specialty',
    name: 'Matriks Konjugasi Verba',
    nameJp: '動詞活用ドリル',
    icon: '🔄',
    desc: 'Kuasai perubahan bentuk kata kerja Te, Nai, Ta, Masu, Potensial, dan Pengandaian.',
    tag: 'Penting',
    estTime: '~4 mnt',
    badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
  },
  {
    id: 'translation',
    category: 'specialty',
    name: 'Alih Bahasa Kontekstual',
    nameJp: '文脈翻訳',
    icon: '🌐',
    desc: 'Pahami nuansa kalimat dari bahasa Jepang ke bahasa Indonesia yang wajar dan tepat.',
    tag: 'Nuansa',
    estTime: '~3 mnt',
    badgeColor: 'border-teal-500/40 text-teal-300 bg-teal-500/10',
  },
  {
    id: 'error-find',
    category: 'specialty',
    name: 'Cari Kesalahan Makna',
    nameJp: '誤答検出',
    icon: '🔍',
    desc: 'Uji ketelitianmu membedakan jebakan arti dan pola yang sering tertukar dalam ujian.',
    tag: 'Ujian JLPT',
    estTime: '~3 mnt',
    badgeColor: 'border-orange-500/40 text-orange-300 bg-orange-500/10',
  },
  {
    id: 'panic-recall',
    category: 'specialty',
    name: 'Simulasi Panik K3 & SBAR',
    nameJp: '緊急事態・SBAR訓練',
    icon: '🚨',
    desc: 'Tanggap darurat gemba K3 & Kaigo. Ucapkan komando vokal dalam 5 detik tanpa bantuan pilihan ganda.',
    tag: 'Gemba K3',
    estTime: '~3 mnt',
    badgeColor: 'border-red-500/40 text-red-300 bg-red-500/10',
  },
  {
    id: 'mora-pacing',
    category: 'specialty',
    name: 'Pemandu Irama Mora',
    nameJp: '拍・モーラ拍子器',
    icon: '⏱️',
    desc: 'Ketukan metronom visual per-mora. Latih artikulasi konsonan rangkap (っ), vokal panjang, dan sengau.',
    tag: 'Ritme Bicara',
    estTime: '~2 mnt',
    badgeColor: 'border-indigo-500/40 text-indigo-300 bg-indigo-500/10',
  },
  {
    id: 'pitch-accent',
    category: 'specialty',
    name: 'Aksen Nada Tokyo',
    nameJp: '東京アクセント',
    icon: '📈',
    desc: 'Diskriminasi pola kontur tinggi-rendah: Heiban [⓪], Atamadaka [①], Nakadaka [②], Odaka [④].',
    tag: 'Intonasi Asli',
    estTime: '~3 mnt',
    badgeColor: 'border-pink-500/40 text-pink-300 bg-pink-500/10',
  },
  {
    id: 'discourse-deconstruct',
    category: 'specialty',
    name: 'Dekonstruksi Wacana Makro',
    nameJp: '長文言説解剖',
    icon: '📰',
    desc: 'Analisis struktur retoris bacaan N2/N1: Premis, Antitesis, Bukti Faktual, dan Sintesis Penutup.',
    tag: 'N2–N1 Dokumen',
    estTime: '~5 mnt',
    badgeColor: 'border-violet-500/40 text-violet-300 bg-violet-500/10',
  },
  {
    id: 'collocation-matrix',
    category: 'specialty',
    name: 'Matriks Nuansa Kolokasi',
    nameJp: '語彙共起コロケーション',
    icon: '📊',
    desc: 'Bedakan pola tata bahasa sinonim dengan batasan distribusi pragmatis dan pasangan kata khasnya.',
    tag: 'Nuansa Halus',
    estTime: '~3 mnt',
    badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
  },
];

export const QuizArenaHub: React.FC<QuizArenaHubProps> = ({
  onStartMode,
  onStartFSRSDue,
  onStartMistakeReview,
  onOpenConfig,
  sessionCount,
  selectedLevel,
  dueCount,
  mistakesCount,
  onSelectLevel,
  onSelectSessionCount,
}) => {
  const { getModeStat, getOverallQuizStats } = useGamificationStore();
  const { waterDrops } = useGardenStore();
  const { cards } = useAppStore();
  const overall = getOverallQuizStats();

  const [activeCategory, setActiveCategory] = useState<'all' | 'core' | 'specialty'>('all');

  const filteredModes = ARENA_MODES.filter((m) => {
    if (activeCategory === 'all') return true;
    return m.category === activeCategory;
  });

  const jlptLevels: JLPTLevel[] = ['n5', 'n4', 'n3', 'n2', 'n1'];
  const sessionOptions = [10, 15, 20, 30];

  return (
    <div className="space-y-6 sm:space-y-7 animate-in fade-in duration-300">
      {/* Header with Title and Quick Session Selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-accent-hot text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pusat Latihan · 練習アリーナ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-appText-bright tracking-tight">
            Arena Kuis & Spaced Repetition
          </h1>
          <p className="text-xs sm:text-sm text-appText-muted mt-0.5">
            Pilih mode latihan terarah untuk mengasah memori jangka panjang berbasis algoritma FSRS.
          </p>
        </div>

        {/* Level Quick Pills & Config Modal Trigger */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {onSelectLevel && (
            <div className="flex items-center gap-1 bg-surface-2 p-1 rounded-xl border border-accent/15">
              {jlptLevels.map((lvl) => {
                const isSelected = (selectedLevel === 'all' ? 'n5' : selectedLevel) === lvl;
                return (
                  <button
                    key={lvl}
                    onClick={() => onSelectLevel(lvl)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg uppercase transition-all ${
                      isSelected
                        ? 'bg-accent text-bg shadow-sm font-extrabold'
                        : 'text-appText-muted hover:text-appText-bright'
                    }`}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
          )}

          <button
            onClick={onOpenConfig}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface border border-accent/25 hover:border-accent text-accent-hot text-xs font-bold transition-all shadow-sm active:scale-95"
            title="Pengaturan Sesi Kuis Lengkap"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{sessionCount} Soal</span>
          </button>
        </div>
      </div>

      {/* Real-time Arena Metric Overview Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        <div className="p-2.5 sm:p-3 rounded-2xl bg-surface border border-accent/20 flex items-center gap-2.5 sm:gap-3 shadow-sm min-w-0 overflow-hidden">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-accent text-sm sm:text-lg shrink-0">
            🎯
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[9px] sm:text-[10px] font-bold text-appText-muted uppercase tracking-wider truncate">Soal Dijawab</div>
            <div className="text-xs sm:text-base font-extrabold text-appText-bright font-mono truncate">
              {overall.totalAnswered} <span className="text-[9px] sm:text-[10px] font-normal text-appText-muted">soal</span>
            </div>
          </div>
        </div>

        <div className="p-2.5 sm:p-3 rounded-2xl bg-surface border border-accent/20 flex items-center gap-2.5 sm:gap-3 shadow-sm min-w-0 overflow-hidden">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 text-sm sm:text-lg shrink-0">
            📊
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[9px] sm:text-[10px] font-bold text-appText-muted uppercase tracking-wider truncate">Akurasi Rata-rata</div>
            <div className="text-xs sm:text-base font-extrabold text-emerald-400 font-mono truncate">
              {overall.overallAccuracy}%
            </div>
          </div>
        </div>

        <div className="p-2.5 sm:p-3 rounded-2xl bg-surface border border-accent/20 flex items-center gap-2.5 sm:gap-3 shadow-sm min-w-0 overflow-hidden">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center text-purple-400 text-sm sm:text-lg shrink-0">
            🧠
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[9px] sm:text-[10px] font-bold text-appText-muted uppercase tracking-wider truncate">Kartu FSRS</div>
            <div className="text-xs sm:text-base font-extrabold text-appText-bright font-mono truncate">
              {Object.keys(cards).length} <span className="text-[9px] sm:text-[10px] font-normal text-appText-muted">kartu</span>
            </div>
          </div>
        </div>

        <div className="p-2.5 sm:p-3 rounded-2xl bg-surface border border-accent/20 flex items-center gap-2.5 sm:gap-3 shadow-sm min-w-0 overflow-hidden">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center text-cyan-400 text-sm sm:text-lg shrink-0">
            💧
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[9px] sm:text-[10px] font-bold text-appText-muted uppercase tracking-wider truncate">Tetes Air</div>
            <div className="text-xs sm:text-base font-extrabold text-cyan-400 font-mono truncate">
              {waterDrops} <span className="text-[9px] sm:text-[10px] font-normal text-appText-muted">tetes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Special Banner 1: FSRS Due Today Review */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950/70 via-surface to-surface-2 border-2 border-amber-500/40 p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-3xl shrink-0 shadow-glow">
              📬
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-extrabold text-appText-bright">
                  Review Harian Spaced Repetition (FSRS)
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-accent text-bg">
                  Prioritas
                </span>
              </div>
              <p className="text-xs text-appText-muted leading-relaxed max-w-xl">
                {dueCount > 0
                  ? `Ada ${dueCount} kartu yang mencapai interval kritis kelupaan hari ini. Ulas sekarang untuk menjaga retensi ingatan.`
                  : 'Seluruh kartu hafalan harianmu telah direview! Kamu bisa berlatih bebas untuk mempertajam refleks memori.'}
              </p>
            </div>
          </div>

          <button
            onClick={onStartFSRSDue}
            className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-accent hover:bg-accent-hot text-bg font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-glow shrink-0 active:scale-95"
          >
            <Zap className="w-4 h-4 fill-bg" />
            <span>{dueCount > 0 ? `Review Sekarang (${dueCount} Kartu)` : 'Mulai Sesi Review Cerdas'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Special Banner 2: Mistake Notebook (if any mistakes recorded) */}
      {mistakesCount > 0 && (
        <div className="rounded-3xl bg-red-950/30 border border-red-500/35 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-red-300">
                Catatan Kilaf: Ada {mistakesCount} soal yang pernah salah dijawab
              </div>
              <div className="text-[11px] text-appText-muted">
                Latih ulang sekarang sebelum pola yang keliru terpatri di ingatan.
              </div>
            </div>
          </div>

          <button
            onClick={onStartMistakeReview}
            className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shrink-0 active:scale-95 self-end sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Latih Ulang ({mistakesCount} Soal)</span>
          </button>
        </div>
      )}

      {/* Categorized Mode Section */}
      <div className="space-y-4">
        {/* Category Selector Tabs */}
        <div className="flex items-center justify-between border-b border-accent/15 pb-2.5 gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none max-w-full pb-0.5">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 active:scale-95 ${
                activeCategory === 'all'
                  ? 'bg-accent text-bg shadow-sm font-extrabold'
                  : 'text-appText-muted hover:text-appText-bright bg-surface-2'
              }`}
            >
              Semua Mode (8)
            </button>
            <button
              onClick={() => setActiveCategory('core')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 active:scale-95 ${
                activeCategory === 'core'
                  ? 'bg-accent text-bg shadow-sm font-extrabold'
                  : 'text-appText-muted hover:text-appText-bright bg-surface-2'
              }`}
            >
              Fondasi & FSRS (4)
            </button>
            <button
              onClick={() => setActiveCategory('specialty')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 active:scale-95 ${
                activeCategory === 'specialty'
                  ? 'bg-accent text-bg shadow-sm font-extrabold'
                  : 'text-appText-muted hover:text-appText-bright bg-surface-2'
              }`}
            >
              Keahlian Khusus (4)
            </button>
          </div>

          <span className="text-[11px] text-appText-muted font-mono font-bold hidden sm:inline-block shrink-0">
            Level {(selectedLevel === 'all' ? 'n5' : selectedLevel).toUpperCase()}
          </span>
        </div>

        {/* 8 Modes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {filteredModes.map((mode) => {
            const stat = getModeStat(mode.id);
            return (
              <div
                key={mode.id}
                onClick={() => onStartMode(mode.id)}
                className="group cursor-pointer bg-surface hover:bg-surface-2 border border-accent/20 hover:border-accent/50 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 flex flex-col justify-between space-y-3 sm:space-y-4 transition-all duration-200 hover:-translate-y-1 shadow-sm active:scale-[0.98]"
              >
                {/* Card Header */}
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <span className="text-xl sm:text-2xl p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-surface-2 border border-accent/15 group-hover:scale-110 transition-transform shrink-0">
                        {mode.icon}
                      </span>
                      <div className="sm:hidden min-w-0 flex-1">
                        <h3 className="font-extrabold text-xs sm:text-sm text-appText-bright group-hover:text-accent transition-colors truncate">
                          {mode.name}
                        </h3>
                        <div className="text-[10px] font-jp font-semibold text-amber-400/80 truncate">
                          {mode.nameJp}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-[9px] sm:text-[10px] font-bold uppercase px-2 sm:px-2.5 py-0.5 rounded-full border shrink-0 ${mode.badgeColor}`}
                    >
                      {mode.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="hidden sm:flex font-extrabold text-sm sm:text-base text-appText-bright group-hover:text-accent transition-colors items-center justify-between">
                      <span>{mode.name}</span>
                    </h3>
                    <div className="hidden sm:block text-[11px] font-jp font-semibold text-amber-400/80 mt-0.5">
                      {mode.nameJp}
                    </div>
                    <p className="text-xs text-appText-muted mt-1 sm:mt-2 leading-relaxed line-clamp-2">
                      {mode.desc}
                    </p>

                    {/* Atomized Mode Progress Pill */}
                    <div className="pt-2 flex items-center justify-between text-[10px] sm:text-[11px]">
                      {stat.answered > 0 ? (
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-400">
                          <Target className="w-3 h-3" />
                          <span>Akurasi {stat.accuracy}% ({stat.answered} soal)</span>
                        </span>
                      ) : (
                        <span className="text-appText-muted/60 text-[10px]">
                          Belum dicoba
                        </span>
                      )}
                      {stat.sessions > 0 && (
                        <span className="text-[10px] text-accent font-mono">
                          {stat.sessions} sesi
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-2.5 sm:pt-3 border-t border-accent/10 flex items-center justify-between text-[11px] text-appText-muted">
                  <span className="flex items-center gap-1 font-mono text-[10px] sm:text-xs">
                    <Clock className="w-3 h-3 text-accent" />
                    {mode.estTime}
                  </span>
                  <span className="text-accent font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1 text-xs">
                    <span>Mulai</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
