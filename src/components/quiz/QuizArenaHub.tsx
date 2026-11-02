// ══════════════════════════════════════════════════════════════════
//  QuizArenaHub.tsx — Nugget Nihongo Quiz Arena Mission Launchpad
//  Streamlined 9-Mode Architecture, Urushi Lacquerware Aesthetics,
//  and Zero-Microfont Readability (WCAG AAA Compliant)
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
  Award,
  ChevronDown,
  Flame,
} from 'lucide-react';
import { QuizMode } from '../../types/quiz';
import { JLPTLevel } from '../../types/vocab';
import { useGamificationStore } from '../../lib/gamification/gamificationStore';
import { useGardenStore } from '../../lib/garden/gardenStore';
import { useAppStore } from '../../store/useAppStore';
import { useModalStore } from '../../store/useModalStore';
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

export type QuizTabCategory = 'all' | 'tantangan' | 'kosakata' | 'tata-bahasa';

export interface QuizCardMeta {
  id: QuizMode | 'cat' | 'kana';
  modeType: QuizMode;
  category: 'tantangan' | 'kosakata' | 'tata-bahasa' | 'specialty';
  name: string;
  nameJp: string;
  icon: string;
  desc: string;
  tag: string;
  estTime: string;
  badgeColor: string;
  actionType: 'standard' | 'modal_cat' | 'modal_kana';
}

// ── The 9 Curated Core Quiz Modes Grouped Into 3 Defined Tabs ──
export const CURATED_QUIZ_MODES: QuizCardMeta[] = [
  // ── Tab 1: Tantangan Cepat ──
  {
    id: 'multiple-choice',
    modeType: 'multiple-choice',
    category: 'tantangan',
    name: 'Kilat 60 Detik',
    nameJp: '60秒スピードクイズ',
    icon: '⚡',
    desc: 'Latih reflek ingatan cepat arti kosakata dan kanji dengan 4 opsi distraktor pintar berkecepatan tinggi.',
    tag: 'Reflek Cepat',
    estTime: '~1 mnt',
    badgeColor: 'border-amber-500/30 text-amber-300 bg-amber-500/10 font-bold',
    actionType: 'standard',
  },
  {
    id: 'cat',
    modeType: 'multiple-choice',
    category: 'tantangan',
    name: 'Ujian Adaptif CAT',
    nameJp: '適応型プレースメントテスト',
    icon: '🎯',
    desc: 'Diagnosa kemampuan bahasa Jepang (JLPT N5–N1) secara presisi dalam 10–12 soal adaptif berbasis IRT 3PL.',
    tag: 'IRT 3PL Presisi',
    estTime: '~5 mnt',
    badgeColor: 'border-cyan-500/30 text-cyan-300 bg-cyan-500/10 font-bold',
    actionType: 'modal_cat',
  },
  {
    id: 'panic-recall',
    modeType: 'panic-recall',
    category: 'tantangan',
    name: 'Kuis Bertarung XP',
    nameJp: 'XPバトルアリーナ',
    icon: '⚔️',
    desc: 'Tantangan intensif dengan batas waktu cepat untuk memacu pemanggilan memori di bawah tekanan kerja dan ujian.',
    tag: 'Poin XP Tinggi',
    estTime: '~3 mnt',
    badgeColor: 'border-rose-500/30 text-rose-300 bg-rose-500/10 font-bold',
    actionType: 'standard',
  },

  // ── Tab 2: Kosakata & Huruf ──
  {
    id: 'flashcard',
    modeType: 'flashcard',
    category: 'kosakata',
    name: 'Tebak Kanji',
    nameJp: '漢字フラッシュカード',
    icon: '🃏',
    desc: 'Metode pengulangan berjarak ilmiah FSRS untuk menguasai bacaan On/Kun dan makna Kanji Jouyou.',
    tag: 'FSRS Ilmiah',
    estTime: '~3 mnt',
    badgeColor: 'border-amber-500/30 text-amber-300 bg-amber-500/10 font-bold',
    actionType: 'standard',
  },
  {
    id: 'kana',
    modeType: 'flashcard',
    category: 'kosakata',
    name: 'Bagan & Kuis Kana',
    nameJp: '五十音・かなドリル',
    icon: '🔤',
    desc: 'Bagan interaktif 46 Hiragana & Katakana lengkap dengan audio penutur asli dan latihan pembacaan huruf.',
    tag: 'Fondasi Aksara',
    estTime: '~2 mnt',
    badgeColor: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10 font-bold',
    actionType: 'modal_kana',
  },
  {
    id: 'collocation-matrix',
    modeType: 'collocation-matrix',
    category: 'kosakata',
    name: 'Pasangan Kata',
    nameJp: '語彙共起コロケーション',
    icon: '📊',
    desc: 'Pahami pasangan kata (kolokasi) dan perbedaan nuansa halus antar kata kerja dan partikel yang lazim.',
    tag: 'Nuansa Alami',
    estTime: '~3 mnt',
    badgeColor: 'border-purple-500/30 text-purple-300 bg-purple-500/10 font-bold',
    actionType: 'standard',
  },

  // ── Tab 3: Tata Bahasa & Audio ──
  {
    id: 'rearrange',
    modeType: 'rearrange',
    category: 'tata-bahasa',
    name: 'Susun Kalimat Bunsetsu',
    nameJp: '文節語順並べ替え',
    icon: '🧩',
    desc: 'Susun potongan frasa bunsetsu acak menjadi kalimat bahasa Jepang yang alami, gramatikal, dan tepat.',
    tag: 'Tata Kalimat',
    estTime: '~4 mnt',
    badgeColor: 'border-amber-500/30 text-amber-300 bg-amber-500/10 font-bold',
    actionType: 'standard',
  },
  {
    id: 'listening',
    modeType: 'listening',
    category: 'tata-bahasa',
    name: 'Audio Menyimak Choukai',
    nameJp: '聴解リスニング特訓',
    icon: '🎧',
    desc: 'Dengarkan percakapan penutur asli tanpa melihat teks terlebih dahulu lalu tentukan maknanya.',
    tag: 'Audio Asli',
    estTime: '~3 mnt',
    badgeColor: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10 font-bold',
    actionType: 'standard',
  },
  {
    id: 'fill-in',
    modeType: 'fill-in',
    category: 'tata-bahasa',
    name: 'Pemilih Partikel',
    nameJp: '助詞穴埋めドリル',
    icon: '✍️',
    desc: 'Lengkapi partikel penghubung (は, が, を, に, で) yang hilang dalam kalimat rumpang sesuai konteks.',
    tag: 'Partikel & Pola',
    estTime: '~3 mnt',
    badgeColor: 'border-cyan-500/30 text-cyan-300 bg-cyan-500/10 font-bold',
    actionType: 'standard',
  },
];

// ── Specialty Modes for Progressive Disclosure & Historical Contract Compatibility ──
export const SPECIALTY_MODES: QuizCardMeta[] = [
  {
    id: 'conjugation',
    modeType: 'conjugation',
    category: 'specialty',
    name: 'Latihan Konjugasi Kata Kerja',
    nameJp: '動詞活用ドリル',
    icon: '🔄',
    desc: 'Kuasai perubahan bentuk kata kerja Te, Nai, Ta, Masu, Potensial, dan Pengandaian.',
    tag: 'Penting',
    estTime: '~4 mnt',
    badgeColor: 'border-purple-500/30 text-purple-300 bg-purple-500/10 font-bold',
    actionType: 'standard',
  },
  {
    id: 'translation',
    modeType: 'translation',
    category: 'specialty',
    name: 'Latihan Terjemahan Kalimat',
    nameJp: '文脈翻訳',
    icon: '🌐',
    desc: 'Pahami makna kalimat dari bahasa Jepang ke bahasa Indonesia yang wajar dan tepat.',
    tag: 'Nuansa',
    estTime: '~3 mnt',
    badgeColor: 'border-teal-500/30 text-teal-300 bg-teal-500/10 font-bold',
    actionType: 'standard',
  },
  {
    id: 'error-find',
    modeType: 'error-find',
    category: 'specialty',
    name: 'Cari Kesalahan Makna',
    nameJp: '誤答検出',
    icon: '🔍',
    desc: 'Uji ketelitianmu membedakan jebakan arti dan pola yang sering tertukar dalam ujian.',
    tag: 'Ujian JLPT',
    estTime: '~3 mnt',
    badgeColor: 'border-orange-500/30 text-orange-300 bg-orange-500/10 font-bold',
    actionType: 'standard',
  },
  {
    id: 'mora-pacing',
    modeType: 'mora-pacing',
    category: 'specialty',
    name: 'Latihan Ketukan & Irama Bicara',
    nameJp: '拍・モーラ拍子器',
    icon: '⏱️',
    desc: 'Pemandu ketukan visual untuk melatih panjang-pendek vokal dan konsonan ganda (っ).',
    tag: 'Ritme Bicara',
    estTime: '~2 mnt',
    badgeColor: 'border-indigo-500/30 text-indigo-300 bg-indigo-500/10 font-bold',
    actionType: 'standard',
  },
  {
    id: 'pitch-accent',
    modeType: 'pitch-accent',
    category: 'specialty',
    name: 'Aksen Nada Tokyo',
    nameJp: '東京アクセント',
    icon: '📈',
    desc: 'Kenali pola nada tinggi-rendah kata bahasa Jepang (Heiban, Atamadaka, Nakadaka, Odaka).',
    tag: 'Intonasi Asli',
    estTime: '~3 mnt',
    badgeColor: 'border-pink-500/30 text-pink-300 bg-pink-500/10 font-bold',
    actionType: 'standard',
  },
  {
    id: 'discourse-deconstruct',
    modeType: 'discourse-deconstruct',
    category: 'specialty',
    name: 'Bedah Paragraf & Teks Panjang',
    nameJp: '長文言説解剖',
    icon: '📰',
    desc: 'Pahami alur bacaan panjang N2/N1: ide utama, alasan pendukung, dan kesimpulan.',
    tag: 'N2–N1 Dokumen',
    estTime: '~5 mnt',
    badgeColor: 'border-violet-500/30 text-violet-300 bg-violet-500/10 font-bold',
    actionType: 'standard',
  },
  {
    id: 'onomatopoeia',
    modeType: 'onomatopoeia',
    category: 'specialty',
    name: 'Onomatopoeia Nyeri Lansia (Kaigo)',
    nameJp: '痛みのオノマトペ臨床演習',
    icon: '🩺',
    desc: 'Latih kepekaan mendengar keluhan fisik lansia (ズキズキ, チクチク) dan tentukan tindakan klinis darurat yang tepat.',
    tag: 'SSW Kaigo',
    estTime: '~4 mnt',
    badgeColor: 'border-rose-500/30 text-rose-300 bg-rose-500/10 font-bold',
    actionType: 'standard',
  },
];

// Unified list retaining all mode IDs for full historical regression tests
export const ARENA_MODES = [...CURATED_QUIZ_MODES, ...SPECIALTY_MODES];

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
  const { cards, streak } = useAppStore();
  const { openModal } = useModalStore();
  const overall = getOverallQuizStats();

  const [activeTab, setActiveTab] = useState<QuizTabCategory>('all');
  const [isSpecialtyExpanded, setIsSpecialtyExpanded] = useState<boolean>(false);
  const [isPrometricModalOpen, setIsPrometricModalOpen] = useState(false);
  const [isJftModalOpen, setIsJftModalOpen] = useState(false);

  const jlptLevels: JLPTLevel[] = ['n5', 'n4', 'n3', 'n2', 'n1'];
  const sessionOptions = [10, 15, 20, 30];

  // Filter the 9 core curated modes based on selected tab
  const displayedCuratedModes = CURATED_QUIZ_MODES.filter((m) => {
    if (activeTab === 'all') return true;
    return m.category === activeTab;
  });

  const handleLaunchCard = (card: QuizCardMeta) => {
    if (card.actionType === 'modal_cat') {
      openModal('catPlacement');
    } else if (card.actionType === 'modal_kana') {
      openModal('kana');
    } else {
      onStartMode(card.modeType);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-7 animate-in fade-in duration-300">
      {/* ── MISSION COMMAND HEADER & QUICK SETUP ──────────────────── */}
      <div className="bg-surface border border-theme rounded-3xl p-5 sm:p-7 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-theme pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-accent font-bold text-xs mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Pusat Latihan · 練習アリーナ</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold text-appText-bright tracking-tight">
              Arena Kuis & Spaced Repetition
            </h1>
            <p className="text-xs sm:text-sm text-appText-muted mt-1 leading-relaxed">
              Atur target level dan panjang sesi, lalu pilih latihan terarah berbasis memori ilmiah FSRS.
            </p>
          </div>

          <button
            onClick={onOpenConfig}
            className="self-start md:self-auto min-h-[40px] flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-theme text-appText-bright text-xs font-bold transition-all shadow-sm active:scale-95"
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
              <div className="text-xs font-bold text-appText-muted uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-accent" />
                <span>Pilih Level JLPT:</span>
              </div>
              <div className="flex items-center gap-1 bg-surface-2 p-1 rounded-xl border border-theme overflow-x-auto scrollbar-none max-w-full">
                {jlptLevels.map((lvl) => {
                  const isSelected = (selectedLevel === 'all' ? 'n5' : selectedLevel) === lvl;
                  return (
                    <button
                      key={lvl}
                      onClick={() => onSelectLevel(lvl)}
                      className={`px-3 py-1.5 text-xs font-extrabold rounded-lg uppercase transition-all min-h-[38px] active:scale-95 shrink-0 ${
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
              <div className="text-xs font-bold text-appText-muted uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-accent" />
                <span>Panjang Sesi Soal:</span>
              </div>
              <div className="flex items-center gap-1 bg-surface-2 p-1 rounded-xl border border-theme overflow-x-auto scrollbar-none max-w-full">
                {sessionOptions.map((cnt) => {
                  const isSelected = sessionCount === cnt;
                  return (
                    <button
                      key={cnt}
                      onClick={() => onSelectSessionCount(cnt)}
                      className={`px-3 py-1.5 text-xs font-extrabold rounded-lg transition-all min-h-[38px] active:scale-95 shrink-0 ${
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

      {/* ── REAL-TIME STATS TICKER (4-COL RESPONSIVE, ANTI-MICROFONT) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        <div className="p-3 sm:p-4 rounded-2xl bg-surface border border-theme flex items-center gap-3 shadow-sm min-w-0 overflow-hidden">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-accent text-base sm:text-lg shrink-0">
            🎯
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-appText-muted uppercase tracking-wider truncate">Total Soal</div>
            <div className="text-base sm:text-lg font-extrabold text-appText-bright font-mono truncate">
              {overall.totalAnswered}
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-4 rounded-2xl bg-surface border border-theme flex items-center gap-3 shadow-sm min-w-0 overflow-hidden">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-500 dark:text-emerald-400 text-base sm:text-lg shrink-0">
            📊
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-appText-muted uppercase tracking-wider truncate">Akurasi</div>
            <div className="text-base sm:text-lg font-extrabold text-emerald-600 dark:text-emerald-400 font-mono truncate">
              {overall.overallAccuracy}%
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-4 rounded-2xl bg-surface border border-theme flex items-center gap-3 shadow-sm min-w-0 overflow-hidden">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center text-purple-500 dark:text-purple-400 text-base sm:text-lg shrink-0">
            🧠
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-appText-muted uppercase tracking-wider truncate">Kartu FSRS</div>
            <div className="text-base sm:text-lg font-extrabold text-appText-bright font-mono truncate">
              {Object.keys(cards).length}
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-4 rounded-2xl bg-surface border border-theme flex items-center gap-3 shadow-sm min-w-0 overflow-hidden">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center text-cyan-500 dark:text-cyan-400 text-base sm:text-lg shrink-0">
            💧
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-appText-muted uppercase tracking-wider truncate">Tetes Air</div>
            <div className="text-base sm:text-lg font-extrabold text-cyan-600 dark:text-cyan-400 font-mono truncate">
              {waterDrops}
            </div>
          </div>
        </div>
      </div>

      {/* ── PROMINENT HERO CARD: REKOMENDASI HARI INI ──────────────── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/15 via-surface to-surface-2 border-2 border-amber-500/40 p-5 sm:p-7 shadow-lg space-y-5">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2 min-w-0 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Rekomendasi Hari Ini · 今日のおすすめ</span>
            </div>

            <h2 className="text-lg sm:text-2xl font-black text-appText-bright tracking-tight">
              {dueCount > 0
                ? `Review Harian FSRS (${dueCount} Kartu Menanti)`
                : 'Sesi Latihan Harian · Tebak Kanji & Flashcard 3D'}
            </h2>

            <p className="text-sm text-appText-muted leading-relaxed max-w-2xl">
              {dueCount > 0
                ? `Ada ${dueCount} kartu yang mencapai interval kritis kelupaan hari ini. Selesaikan pengulangan terjadwal untuk mengunci hafalan ke memori jangka panjang.`
                : 'Seluruh kartu hafalan harianmu telah aman! Asah reflek dan pemahamanmu dengan latihan kilat terarah berbasis memori ilmiah FSRS.'}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-2 border border-theme text-xs font-mono font-bold text-appText-bright">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span>~3 Menit</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-2 border border-theme text-xs font-mono font-bold text-amber-400">
                <Zap className="w-3.5 h-3.5" />
                <span>+10-15 XP / Soal</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-2 border border-theme text-xs font-mono font-bold text-appText-bright uppercase">
                <Target className="w-3.5 h-3.5 text-accent" />
                <span>Target: {(selectedLevel === 'all' ? 'n5' : selectedLevel).toUpperCase()}</span>
              </span>
              {streak > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs font-mono font-bold text-amber-400">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Streak {streak} Hari</span>
                </span>
              )}
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="flex flex-col sm:flex-row md:flex-col items-stretch gap-2.5 shrink-0 sm:self-start">
            <button
              onClick={dueCount > 0 ? onStartFSRSDue : () => onStartMode('flashcard')}
              className="min-h-[48px] px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-glow transition-all active:scale-95"
            >
              <Zap className="w-5 h-5 fill-stone-950 text-stone-950" />
              <span>{dueCount > 0 ? `Mulai Review (${dueCount} Kartu)` : 'Mulai Latihan Hari Ini'}</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>

            {mistakesCount > 0 && (
              <button
                onClick={onStartMistakeReview}
                className="min-h-[44px] px-4 py-2 rounded-2xl bg-surface-2 hover:bg-surface-3 border border-red-500/40 text-red-400 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Catatan Evaluasi ({mistakesCount} Soal)</span>
              </button>
            )}
          </div>
        </div>

        {/* Official CBT Quick Triggers Banner */}
        <div className="pt-3 border-t border-theme/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-appText-muted font-bold">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Simulasi Ujian Resmi Standar Kementerian Jepang:</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPrometricModalOpen(true)}
              className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
            >
              <span>Prometric SSW CBT</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setIsJftModalOpen(true)}
              className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
            >
              <span>JFT-Basic CBT</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── 3 CATEGORIZED TABS: ARENA KUIS STREAMLINING ───────────── */}
      <div className="space-y-4">
        {/* Tab Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-theme pb-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none max-w-full pb-0.5">
            <button
              onClick={() => setActiveTab('all')}
              className={`min-h-[40px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 active:scale-95 ${
                activeTab === 'all'
                  ? 'bg-amber-500 text-stone-950 shadow-md font-black'
                  : 'text-appText-muted hover:text-appText-bright bg-surface border border-theme'
              }`}
            >
              Semua Mode (9)
            </button>

            <button
              onClick={() => setActiveTab('tantangan')}
              className={`min-h-[40px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 active:scale-95 ${
                activeTab === 'tantangan'
                  ? 'bg-amber-500 text-stone-950 shadow-md font-black'
                  : 'text-appText-muted hover:text-appText-bright bg-surface border border-theme'
              }`}
            >
              ⚡ Tantangan Cepat (3)
            </button>

            <button
              onClick={() => setActiveTab('kosakata')}
              className={`min-h-[40px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 active:scale-95 ${
                activeTab === 'kosakata'
                  ? 'bg-amber-500 text-stone-950 shadow-md font-black'
                  : 'text-appText-muted hover:text-appText-bright bg-surface border border-theme'
              }`}
            >
              🔤 Kosakata & Huruf (3)
            </button>

            <button
              onClick={() => setActiveTab('tata-bahasa')}
              className={`min-h-[40px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 active:scale-95 ${
                activeTab === 'tata-bahasa'
                  ? 'bg-amber-500 text-stone-950 shadow-md font-black'
                  : 'text-appText-muted hover:text-appText-bright bg-surface border border-theme'
              }`}
            >
              🧩 Tata Bahasa & Audio (3)
            </button>
          </div>

          <span className="text-xs text-appText-muted font-mono font-bold hidden md:inline-block shrink-0">
            Target: {(selectedLevel === 'all' ? 'n5' : selectedLevel).toUpperCase()} · {sessionCount} Soal
          </span>
        </div>

        {/* 9 Curated Cards Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {displayedCuratedModes.map((mode) => {
            const stat = getModeStat(mode.modeType);
            return (
              <div
                key={mode.id}
                onClick={() => handleLaunchCard(mode)}
                className="group cursor-pointer bg-surface hover:bg-surface-2 border border-theme hover:border-amber-500/50 rounded-2xl sm:rounded-3xl p-4 sm:p-5 transition-all duration-200 hover:-translate-y-1 shadow-sm active:scale-[0.98] flex flex-col justify-between min-h-[140px] sm:min-h-[200px]"
              >
                {/* Mobile View: Compact Row Layout */}
                <div className="flex sm:hidden items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl p-2.5 rounded-xl bg-surface-2 border border-theme shrink-0">
                      {mode.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-sm text-appText-bright group-hover:text-amber-400 transition-colors truncate">
                          {mode.name}
                        </h3>
                        <span className={`text-xs uppercase px-2 py-0.5 rounded-full border shrink-0 ${mode.badgeColor}`}>
                          {mode.tag}
                        </span>
                      </div>
                      <p className="text-xs text-appText-muted truncate mt-0.5">
                        {mode.desc}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-appText-muted mt-1 font-mono">
                        <span>⏱️ {mode.estTime}</span>
                        {stat.answered > 0 && (
                          <span className="text-emerald-500 dark:text-emerald-400 font-bold">· {stat.accuracy}% akurasi</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="min-w-[40px] min-h-[40px] rounded-xl bg-surface-2 text-accent flex items-center justify-center group-hover:translate-x-0.5 transition-transform shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Desktop/Tablet View: Rich Card Layout */}
                <div className="hidden sm:flex sm:flex-col sm:justify-between h-full space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-3xl p-2.5 rounded-2xl bg-surface-2 border border-theme group-hover:scale-110 transition-transform shrink-0">
                        {mode.icon}
                      </span>
                      <span className={`text-xs uppercase px-2.5 py-1 rounded-full border shrink-0 ${mode.badgeColor}`}>
                        {mode.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-base text-appText-bright group-hover:text-amber-400 transition-colors">
                        {mode.name}
                      </h3>
                      <div className="text-xs font-jp font-semibold text-amber-500 dark:text-amber-400/80 mt-0.5">
                        {mode.nameJp}
                      </div>
                      <p className="text-sm text-appText-muted mt-1.5 leading-relaxed line-clamp-2">
                        {mode.desc}
                      </p>

                      <div className="pt-2 flex items-center justify-between text-xs">
                        {stat.answered > 0 ? (
                          <span className="inline-flex items-center gap-1 font-semibold text-emerald-500 dark:text-emerald-400">
                            <Target className="w-3.5 h-3.5" />
                            <span>Akurasi {stat.accuracy}% ({stat.answered} soal)</span>
                          </span>
                        ) : (
                          <span className="text-appText-muted text-xs">
                            Belum dicoba
                          </span>
                        )}
                        {stat.sessions > 0 && (
                          <span className="text-xs text-accent font-mono font-bold">
                            {stat.sessions} sesi
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-theme flex items-center justify-between text-xs text-appText-muted">
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

      {/* ── PROGRESSIVE DISCLOSURE: 7 SPECIALTY MODES ─────────────── */}
      <div className="pt-2">
        <button
          onClick={() => setIsSpecialtyExpanded((prev) => !prev)}
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-surface hover:bg-surface-2 border border-theme transition-all text-left shadow-sm active:scale-[0.99]"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">🩺</span>
            <div>
              <div className="text-sm font-extrabold text-appText-bright">
                Mode Tambahan & Spesialis Gemba (7 Mode)
              </div>
              <div className="text-xs text-appText-muted">
                Konjugasi kata kerja, komparasi nuansa, ritme bicara mora, aksen Tokyo, dan onomatopoeia Kaigo.
              </div>
            </div>
          </div>

          <ChevronDown
            className={`w-5 h-5 text-accent transition-transform duration-200 shrink-0 ${
              isSpecialtyExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isSpecialtyExpanded && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
            {SPECIALTY_MODES.map((mode) => {
              const stat = getModeStat(mode.modeType);
              return (
                <div
                  key={mode.id}
                  onClick={() => handleLaunchCard(mode)}
                  className="group cursor-pointer bg-surface hover:bg-surface-2 border border-theme hover:border-amber-500/40 rounded-2xl p-4 transition-all duration-200 hover:-translate-y-0.5 shadow-sm active:scale-[0.98] flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl p-2 rounded-xl bg-surface-2 border border-theme">
                        {mode.icon}
                      </span>
                      <span className={`text-xs uppercase px-2 py-0.5 rounded-full border ${mode.badgeColor}`}>
                        {mode.tag}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-sm text-appText-bright group-hover:text-amber-400 transition-colors">
                        {mode.name}
                      </h4>
                      <p className="text-xs text-appText-muted mt-1 line-clamp-2 leading-relaxed">
                        {mode.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-theme mt-3 flex items-center justify-between text-xs text-appText-muted">
                    <span className="font-mono text-xs">⏱️ {mode.estTime}</span>
                    <span className="text-accent font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1 text-xs">
                      <span>Buka</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
