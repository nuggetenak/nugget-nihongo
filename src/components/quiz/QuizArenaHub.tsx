// ══════════════════════════════════════════════════════════════════
//  QuizArenaHub.tsx — Nugget Nihongo Quiz Arena Mission Launchpad
//  Architected for Clarity, High Contrast (WCAG AAA), and Intuitive Flow
// ══════════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import {
  Sparkles,
  SlidersHorizontal,
  RotateCcw,
  AlertTriangle,
  ArrowRight,
  Clock,
  Target,
  Zap,
  ChevronRight,
  Layers,
  Brain,
  Droplets,
  Award,
} from 'lucide-react';
import { QuizMode } from '../../types/quiz';
import { JLPTLevel } from '../../types/vocab';
import { useGamificationStore } from '../../lib/gamification/gamificationStore';
import { useGardenStore } from '../../lib/garden/gardenStore';
import { useAppStore } from '../../store/useAppStore';
import { PrometricCbtModal } from './PrometricCbtModal';
import { JftBasicCbtModal } from './JftBasicCbtModal';

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
    badgeColor: 'border-amber-500/40 text-accent-hot bg-amber-500/10 font-bold',
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
    badgeColor: 'border-blue-500/40 text-blue-500 dark:text-blue-300 bg-blue-500/10 font-bold',
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
    badgeColor: 'border-cyan-500/40 text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 font-bold',
  },
  {
    id: 'rearrange',
    category: 'core',
    name: 'Susun Kalimat (Builder)',
    nameJp: '語順並べ替え',
    icon: '🧩',
    desc: 'Susun potongan kata acak menjadi kalimat bahasa Jepang yang alami.',
    tag: 'Tata Kalimat',
    estTime: '~4 mnt',
    badgeColor: 'border-rose-500/40 text-rose-600 dark:text-rose-300 bg-rose-500/10 font-bold',
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
    badgeColor: 'border-emerald-500/40 text-emerald-600 dark:text-emerald-300 bg-emerald-500/10 font-bold',
  },
  {
    id: 'conjugation',
    category: 'specialty',
    name: 'Latihan Konjugasi Kata Kerja',
    nameJp: '動詞活用ドリル',
    icon: '🔄',
    desc: 'Kuasai perubahan bentuk kata kerja Te, Nai, Ta, Masu, Potensial, dan Pengandaian.',
    tag: 'Penting',
    estTime: '~4 mnt',
    badgeColor: 'border-purple-500/40 text-purple-600 dark:text-purple-300 bg-purple-500/10 font-bold',
  },
  {
    id: 'translation',
    category: 'specialty',
    name: 'Latihan Terjemahan Kalimat',
    nameJp: '文脈翻訳',
    icon: '🌐',
    desc: 'Pahami makna kalimat dari bahasa Jepang ke bahasa Indonesia yang wajar dan tepat.',
    tag: 'Nuansa',
    estTime: '~3 mnt',
    badgeColor: 'border-teal-500/40 text-teal-600 dark:text-teal-300 bg-teal-500/10 font-bold',
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
    badgeColor: 'border-orange-500/40 text-orange-600 dark:text-orange-300 bg-orange-500/10 font-bold',
  },
  {
    id: 'panic-recall',
    category: 'specialty',
    name: 'Simulasi Tanggap Darurat & K3',
    nameJp: '緊急事態・SBAR訓練',
    icon: '🚨',
    desc: 'Latih respons cepat situasi darurat kerja & perawat lansia. Ucapkan kalimat penting dalam 5 detik.',
    tag: 'Gemba K3',
    estTime: '~3 mnt',
    badgeColor: 'border-red-500/40 text-red-600 dark:text-red-300 bg-red-500/10 font-bold',
  },
  {
    id: 'mora-pacing',
    category: 'specialty',
    name: 'Latihan Ketukan & Irama Bicara',
    nameJp: '拍・モーラ拍子器',
    icon: '⏱️',
    desc: 'Pemandu ketukan visual untuk melatih panjang-pendek vokal, bunyi konsonan ganda (っ), dan pengucapan alami.',
    tag: 'Ritme Bicara',
    estTime: '~2 mnt',
    badgeColor: 'border-indigo-500/40 text-indigo-600 dark:text-indigo-300 bg-indigo-500/10 font-bold',
  },
  {
    id: 'pitch-accent',
    category: 'specialty',
    name: 'Aksen Nada Tokyo',
    nameJp: '東京アクセント',
    icon: '📈',
    desc: 'Kenali pola nada tinggi-rendah kata bahasa Jepang (Heiban, Atamadaka, Nakadaka, Odaka) agar intonasimu alami.',
    tag: 'Intonasi Asli',
    estTime: '~3 mnt',
    badgeColor: 'border-pink-500/40 text-pink-600 dark:text-pink-300 bg-pink-500/10 font-bold',
  },
  {
    id: 'discourse-deconstruct',
    category: 'specialty',
    name: 'Bedah Paragraf & Teks Panjang',
    nameJp: '長文言説解剖',
    icon: '📰',
    desc: 'Pahami alur bacaan panjang N2/N1: ide utama, alasan pendukung, sudut pandang penulis, hingga kesimpulan.',
    tag: 'N2–N1 Dokumen',
    estTime: '~5 mnt',
    badgeColor: 'border-violet-500/40 text-violet-600 dark:text-violet-300 bg-violet-500/10 font-bold',
  },
  {
    id: 'collocation-matrix',
    category: 'specialty',
    name: 'Pasangan Kata & Perbedaan Nuansa',
    nameJp: '語彙共起コロケーション',
    icon: '📊',
    desc: 'Pahami tata bahasa yang mirip artinya dan pelajari pasangan kata yang paling lazim digunakan.',
    tag: 'Nuansa Halus',
    estTime: '~3 mnt',
    badgeColor: 'border-amber-500/40 text-amber-600 dark:text-amber-300 bg-amber-500/10 font-bold',
  },
  {
    id: 'onomatopoeia',
    category: 'specialty',
    name: 'Onomatopoeia Nyeri Lansia (Kaigo)',
    nameJp: '痛みのオノマトペ臨床演習',
    icon: '🩺',
    desc: 'Latih kepekaan mendengar keluhan fisik lansia (ズキズキ, チクチク) dan tentukan tindakan klinis darurat yang tepat.',
    tag: 'SSW Kaigo',
    estTime: '~4 mnt',
    badgeColor: 'border-rose-500/40 text-rose-600 dark:text-rose-300 bg-rose-500/10 font-bold',
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
  const [isPrometricModalOpen, setIsPrometricModalOpen] = useState(false);
  const [isJftModalOpen, setIsJftModalOpen] = useState(false);

  const filteredModes = ARENA_MODES.filter((m) => {
    if (activeCategory === 'all') return true;
    return m.category === activeCategory;
  });

  const jlptLevels: JLPTLevel[] = ['n5', 'n4', 'n3', 'n2', 'n1'];
  const sessionOptions = [10, 15, 20, 30];

  return (
    <div className="space-y-6 sm:space-y-7 animate-in fade-in duration-300">
      {/* ── MISSION COMMAND HEADER & QUICK SETUP ──────────────────── */}
      <div className="bg-surface border border-theme rounded-3xl p-5 sm:p-7 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-theme pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-accent font-bold text-xs mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pusat Latihan · 練習アリーナ</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold text-appText-bright tracking-tight">
              Arena Kuis & Spaced Repetition
            </h1>
            <p className="text-xs sm:text-sm text-appText-muted mt-1 leading-relaxed">
              Atur target level dan jumlah soal, lalu pilih latihan terarah berbasis memori ilmiah FSRS.
            </p>
          </div>

          <button
            onClick={onOpenConfig}
            className="self-start md:self-auto flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-theme text-appText-bright text-xs font-bold transition-all shadow-sm active:scale-95"
            title="Pengaturan Kuis Lanjutan"
          >
            <SlidersHorizontal className="w-4 h-4 text-accent" />
            <span>Pengaturan Lanjutan</span>
          </button>
        </div>

        {/* Quick Launchpad Controls (Level + Length Chips) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-0.5">
          {/* Level Selector Segment */}
          {onSelectLevel && (
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-appText-muted uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-accent" />
                <span>Pilih Level JLPT:</span>
              </div>
              <div className="flex items-center gap-1 bg-surface-2 p-1 rounded-xl border border-theme overflow-x-auto scrollbar-none max-w-full">
                {jlptLevels.map((lvl) => {
                  const isSelected = (selectedLevel === 'all' ? 'n5' : selectedLevel) === lvl;
                  return (
                    <button
                      key={lvl}
                      onClick={() => onSelectLevel(lvl)}
                      className={`px-3 py-1.5 text-xs font-extrabold rounded-lg uppercase transition-all min-h-[36px] active:scale-95 shrink-0 ${
                        isSelected
                          ? 'bg-amber-500 text-stone-950 shadow-sm'
                          : 'text-appText-muted hover:text-appText-bright'
                      }`}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Session Length Segment */}
          {onSelectSessionCount && (
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-appText-muted uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3 h-3 text-accent" />
                <span>Panjang Sesi Soal:</span>
              </div>
              <div className="flex items-center gap-1 bg-surface-2 p-1 rounded-xl border border-theme overflow-x-auto scrollbar-none max-w-full">
                {sessionOptions.map((cnt) => {
                  const isSelected = sessionCount === cnt;
                  return (
                    <button
                      key={cnt}
                      onClick={() => onSelectSessionCount(cnt)}
                      className={`px-3 py-1.5 text-xs font-extrabold rounded-lg transition-all min-h-[36px] active:scale-95 shrink-0 ${
                        isSelected
                          ? 'bg-amber-500 text-stone-950 shadow-sm'
                          : 'text-appText-muted hover:text-appText-bright'
                      }`}
                    >
                      {cnt} Soal
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── REAL-TIME STATS TICKER (4-COL RESPONSIVE) ─────────────── */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        <div className="p-2.5 sm:p-3.5 rounded-2xl bg-surface border border-theme flex flex-col sm:flex-row items-center text-center sm:text-left gap-1.5 sm:gap-3 shadow-sm min-w-0 overflow-hidden">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-accent text-sm sm:text-lg shrink-0">
            🎯
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[9px] sm:text-[10px] font-bold text-appText-muted uppercase tracking-wider truncate">Total Soal</div>
            <div className="text-sm sm:text-base font-extrabold text-appText-bright font-mono truncate">
              {overall.totalAnswered}
            </div>
          </div>
        </div>

        <div className="p-2.5 sm:p-3.5 rounded-2xl bg-surface border border-theme flex flex-col sm:flex-row items-center text-center sm:text-left gap-1.5 sm:gap-3 shadow-sm min-w-0 overflow-hidden">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-500 dark:text-emerald-400 text-sm sm:text-lg shrink-0">
            📊
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[9px] sm:text-[10px] font-bold text-appText-muted uppercase tracking-wider truncate">Akurasi</div>
            <div className="text-sm sm:text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono truncate">
              {overall.overallAccuracy}%
            </div>
          </div>
        </div>

        <div className="p-2.5 sm:p-3.5 rounded-2xl bg-surface border border-theme flex flex-col sm:flex-row items-center text-center sm:text-left gap-1.5 sm:gap-3 shadow-sm min-w-0 overflow-hidden">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center text-purple-500 dark:text-purple-400 text-sm sm:text-lg shrink-0">
            🧠
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[9px] sm:text-[10px] font-bold text-appText-muted uppercase tracking-wider truncate">Kartu FSRS</div>
            <div className="text-sm sm:text-base font-extrabold text-appText-bright font-mono truncate">
              {Object.keys(cards).length}
            </div>
          </div>
        </div>

        <div className="p-2.5 sm:p-3.5 rounded-2xl bg-surface border border-theme flex flex-col sm:flex-row items-center text-center sm:text-left gap-1.5 sm:gap-3 shadow-sm min-w-0 overflow-hidden">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center text-cyan-500 dark:text-cyan-400 text-sm sm:text-lg shrink-0">
            💧
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[9px] sm:text-[10px] font-bold text-appText-muted uppercase tracking-wider truncate">Tetes Air</div>
            <div className="text-sm sm:text-base font-extrabold text-cyan-600 dark:text-cyan-400 font-mono truncate">
              {waterDrops}
            </div>
          </div>
        </div>
      </div>

      {/* ── PRIORITY REVIEW CARDS ─────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Banner 1: FSRS Due Today Review */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/10 via-surface to-surface border border-amber-500/35 p-5 sm:p-6 shadow-md flex flex-col justify-between space-y-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl shrink-0">
              📬
            </div>
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-appText-bright">
                  Review Harian FSRS
                </h3>
                <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-500 text-stone-950">
                  Prioritas
                </span>
              </div>
              <p className="text-xs text-appText-muted leading-relaxed">
                {dueCount > 0
                  ? `Ada ${dueCount} kartu yang mencapai interval kritis kelupaan hari ini. Ulas sekarang untuk menjaga retensi jangka panjang.`
                  : 'Seluruh kartu hafalan harianmu telah direview! Kamu bisa berlatih bebas untuk mengasah kecepatan reflek.'}
              </p>
            </div>
          </div>

          <button
            onClick={onStartFSRSDue}
            className="w-full py-3 px-5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
          >
            <Zap className="w-4 h-4 fill-stone-950" />
            <span>Mulai Review Cerdas ({dueCount} Kartu)</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Banner 2: Mistake Notebook (Catatan Evaluasi) */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-500/10 via-surface to-surface border border-red-500/30 p-5 sm:p-6 shadow-md flex flex-col justify-between space-y-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-500 dark:text-red-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-appText-bright">
                  Catatan Evaluasi
                </h3>
                <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-600 dark:text-red-300">
                  {mistakesCount} Soal Keliru
                </span>
              </div>
              <p className="text-xs text-appText-muted leading-relaxed">
                {mistakesCount > 0
                  ? `Latih ulang ${mistakesCount} soal yang pernah salah dijawab agar kesalahan tidak terpatri di memori jangka panjang.`
                  : 'Bagus sekali! Tidak ada soal keliru yang tersimpan di catatan evaluasimu saat ini.'}
              </p>
            </div>
          </div>

          <button
            onClick={onStartMistakeReview}
            disabled={mistakesCount === 0}
            className="w-full py-3 px-5 rounded-2xl bg-surface-2 hover:bg-surface-3 disabled:opacity-40 disabled:pointer-events-none border border-red-500/40 text-red-600 dark:text-red-300 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Latih Ulang ({mistakesCount} Soal)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── OFFICIAL JAPANESE PROMETRIC CBT SIMULATOR ─────────────── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-stone-900 via-surface to-stone-900 border-2 border-amber-500/35 p-5 sm:p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl shrink-0">
            🏛️
          </div>
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm sm:text-base font-extrabold text-appText-bright">
                Simulasi Ujian Prometric CBT (Tokutei Ginou SSW)
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 font-black text-[9px] uppercase tracking-wider">
                19 Sektor Resmi
              </span>
            </div>
            <p className="text-xs text-appText-muted leading-relaxed">
              Simulasi ujian komputer resmi berstandar Prometric Jepang dengan penilaian ganda (Dual-Pass Statutory Scoring) standar kementerian MHLW, METI, MLIT, dan MAFF.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsPrometricModalOpen(true)}
            className="min-h-[44px] px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-stone-950 font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 hover:from-amber-400 hover:to-amber-300"
          >
            <Sparkles className="w-4 h-4 text-stone-950" />
            <span>Prometric SSW CBT</span>
          </button>

          <button
            type="button"
            onClick={() => setIsJftModalOpen(true)}
            className="min-h-[44px] px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-stone-950 font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 hover:from-emerald-400 hover:to-emerald-300"
          >
            <Award className="w-4 h-4 text-stone-950" />
            <span>JFT-Basic CBT (A2)</span>
          </button>
        </div>
      </div>

      {/* ── CATEGORIZED DRILL CATALOG ─────────────────────────────── */}
      <div className="space-y-4">
        {/* Category Tabs */}
        <div className="flex items-center justify-between border-b border-theme pb-3 gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none max-w-full pb-0.5">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 active:scale-95 ${
                activeCategory === 'all'
                  ? 'bg-amber-500 text-stone-950 shadow-sm font-black'
                  : 'text-appText-muted hover:text-appText-bright bg-surface border border-theme'
              }`}
            >
              Semua Mode ({ARENA_MODES.length})
            </button>
            <button
              onClick={() => setActiveCategory('core')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 active:scale-95 ${
                activeCategory === 'core'
                  ? 'bg-amber-500 text-stone-950 shadow-sm font-black'
                  : 'text-appText-muted hover:text-appText-bright bg-surface border border-theme'
              }`}
            >
              Fondasi & FSRS (4)
            </button>
            <button
              onClick={() => setActiveCategory('specialty')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 active:scale-95 ${
                activeCategory === 'specialty'
                  ? 'bg-amber-500 text-stone-950 shadow-sm font-black'
                  : 'text-appText-muted hover:text-appText-bright bg-surface border border-theme'
              }`}
            >
              Keahlian & Gemba ({ARENA_MODES.length - 4})
            </button>
          </div>

          <span className="text-[11px] text-appText-muted font-mono font-bold hidden sm:inline-block shrink-0">
            Target: {(selectedLevel === 'all' ? 'n5' : selectedLevel).toUpperCase()} · {sessionCount} Soal
          </span>
        </div>

        {/* 13 Modes Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredModes.map((mode) => {
            const stat = getModeStat(mode.id);
            return (
              <div
                key={mode.id}
                onClick={() => onStartMode(mode.id)}
                className="group cursor-pointer bg-surface hover:bg-surface-2 border border-theme hover:border-amber-500/40 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 transition-all duration-200 hover:-translate-y-1 shadow-sm active:scale-[0.98] flex flex-col justify-between"
              >
                {/* Mobile View: Compact Row Layout */}
                <div className="flex sm:hidden items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl p-2 rounded-xl bg-surface-2 border border-theme shrink-0">
                      {mode.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-extrabold text-xs text-appText-bright group-hover:text-accent transition-colors truncate">
                          {mode.name}
                        </h3>
                        <span className={`text-[9px] uppercase px-1.5 py-0.2 rounded-full border shrink-0 ${mode.badgeColor}`}>
                          {mode.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-appText-muted truncate mt-0.5">
                        {mode.desc}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-appText-muted mt-1 font-mono">
                        <span>⏱️ {mode.estTime}</span>
                        {stat.answered > 0 && (
                          <span className="text-emerald-500 dark:text-emerald-400 font-bold">· {stat.accuracy}% akurasi</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-2 rounded-xl bg-surface-2 text-accent group-hover:translate-x-0.5 transition-transform shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Desktop/Tablet View: Rich Card Layout */}
                <div className="hidden sm:flex sm:flex-col sm:justify-between h-full space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-2xl p-2.5 rounded-2xl bg-surface-2 border border-theme group-hover:scale-110 transition-transform shrink-0">
                        {mode.icon}
                      </span>
                      <span
                        className={`text-[10px] uppercase px-2.5 py-0.5 rounded-full border shrink-0 ${mode.badgeColor}`}
                      >
                        {mode.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base text-appText-bright group-hover:text-accent transition-colors">
                        {mode.name}
                      </h3>
                      <div className="text-[11px] font-jp font-semibold text-amber-500 dark:text-amber-400/80 mt-0.5">
                        {mode.nameJp}
                      </div>
                      <p className="text-xs text-appText-muted mt-1.5 leading-relaxed line-clamp-2">
                        {mode.desc}
                      </p>

                      <div className="pt-2 flex items-center justify-between text-[11px]">
                        {stat.answered > 0 ? (
                          <span className="inline-flex items-center gap-1 font-semibold text-emerald-500 dark:text-emerald-400">
                            <Target className="w-3 h-3" />
                            <span>Akurasi {stat.accuracy}% ({stat.answered} soal)</span>
                          </span>
                        ) : (
                          <span className="text-appText-muted/60 text-[10px]">
                            Belum dicoba
                          </span>
                        )}
                        {stat.sessions > 0 && (
                          <span className="text-[10px] text-accent font-mono font-bold">
                            {stat.sessions} sesi
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-theme flex items-center justify-between text-[11px] text-appText-muted">
                    <span className="flex items-center gap-1 font-mono text-xs">
                      <Clock className="w-3.5 h-3.5 text-accent" />
                      {mode.estTime}
                    </span>
                    <span className="text-accent font-extrabold group-hover:translate-x-1 transition-transform flex items-center gap-1 text-xs">
                      <span>Mulai</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Japanese Prometric CBT Simulator Modal */}
      <PrometricCbtModal
        isOpen={isPrometricModalOpen}
        onClose={() => setIsPrometricModalOpen(false)}
      />

      {/* Official Japan Foundation JFT-Basic CBT Simulator Modal */}
      <JftBasicCbtModal
        isOpen={isJftModalOpen}
        onClose={() => setIsJftModalOpen(false)}
      />
    </div>
  );
};
