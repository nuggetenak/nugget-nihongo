import React, { useMemo } from 'react';
import {
  BarChart3,
  BookOpen,
  Briefcase,
  Flame,
  Brain,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Flower2,
} from 'lucide-react';
import { FSRSCard } from '../../types/fsrs';
import { fsrsForgettingCurve } from '../../lib/fsrs/math';
import { JLPTLevel } from '../../types/vocab';
import { TrackId, TrackProgressState } from '../../lib/curriculum/curriculumStore';

export interface JLPTMasteryItem {
  level: JLPTLevel;
  title: string;
  subtitle: string;
  colorClass: string;
  badgeBg: string;
  completedLessons: number;
  totalLessons: number;
  percent: number;
  isRecommendedByCat?: boolean;
}

interface LearnerMasteryReportProps {
  cards: Record<string, { card: FSRSCard; source?: string; level?: string }>;
  trackProgress: Record<TrackId, TrackProgressState>;
  streakInfo: { count: number; lastDate: string; isTodayActive: boolean; isProtected: boolean };
  placementHistory?: Array<{ theta: number; recommendedLevel: JLPTLevel }>;
  bloomedKanjiCount?: number;
}

export const LearnerMasteryReport: React.FC<LearnerMasteryReportProps> = ({
  cards,
  trackProgress,
  streakInfo,
  placementHistory = [],
  bloomedKanjiCount = 0,
}) => {
  // 1. Calculate JLPT Progress Breakdown (N5 to N1)
  const latestRecommendedLevel = placementHistory.length > 0 ? placementHistory[0].recommendedLevel : null;

  const jlptLevelsData: JLPTMasteryItem[] = useMemo(() => {
    // Estimated authoritative units/lessons per level in Nugget Nihongo curriculum
    const levelsMeta: Array<{ level: JLPTLevel; title: string; subtitle: string; totalLessons: number; colorClass: string; badgeBg: string }> = [
      {
        level: 'n5',
        title: 'N5 Fondasi Dasar',
        subtitle: 'Hiragana, Katakana, Sapaan & Tata Bahasa Dasar',
        totalLessons: 60,
        colorClass: 'text-emerald-500',
        badgeBg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      },
      {
        level: 'n4',
        title: 'N4 Percakapan Sehari-hari',
        subtitle: 'Bentuk Te/Nai, Pengandaian & Komunikasi Harian',
        totalLessons: 60,
        colorClass: 'text-sky-500',
        badgeBg: 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30',
      },
      {
        level: 'n3',
        title: 'N3 Jembatan Menengah',
        subtitle: 'Nuansa Kalimat, Wacana & Keigo Awal',
        totalLessons: 60,
        colorClass: 'text-amber-500',
        badgeBg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
      },
      {
        level: 'n2',
        title: 'N2 Praktisi Mahir',
        subtitle: 'Bisnis Gemba, Berita Resmi & Struktur Majemuk',
        totalLessons: 60,
        colorClass: 'text-indigo-500',
        badgeBg: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
      },
      {
        level: 'n1',
        title: 'N1 Penguasaan Paripurna',
        subtitle: 'Sastra, Opini Abstrak & Retorika Tingkat Tinggi',
        totalLessons: 60,
        colorClass: 'text-rose-500',
        badgeBg: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
      },
    ];

    return levelsMeta.map((m) => {
      const progress = trackProgress[m.level as TrackId];
      const completedCount = progress?.completedLessons?.length || 0;
      const pct = Math.min(100, Math.round((completedCount / m.totalLessons) * 100));
      return {
        ...m,
        completedLessons: completedCount,
        percent: pct,
        isRecommendedByCat: latestRecommendedLevel === m.level,
      };
    });
  }, [trackProgress, latestRecommendedLevel]);

  // 2. Aggregate FSRS Card Metrics & Memory Health
  const {
    totalCards,
    kanjiCardsCount,
    grammarCardsCount,
    sswVocabCount,
    avgRetentionRate,
    healthStatus,
    retentionBadge,
  } = useMemo(() => {
    const cardValues = Object.values(cards);
    let totalR = 0;
    let cardCountWithStability = 0;
    let kanjiCount = 0;
    let grammarCount = 0;
    let sswCount = 0;

    // Scan completed lessons across SSW tracks in trackProgress
    Object.entries(trackProgress).forEach(([trackKey, state]) => {
      if (trackKey.startsWith('ssw-') && state?.completedLessons) {
        sswCount += state.completedLessons.length * 6; // ~6 vocab items per vocational lesson
      }
    });

    cardValues.forEach((item) => {
      const card = item.card;
      if (card && card.stability > 0) {
        const r = fsrsForgettingCurve(card.elapsed_days || 0, card.stability);
        totalR += r;
        cardCountWithStability++;
      }

      const src = (item.source || '').toLowerCase();
      if (src === 'kanji' || src.includes('kanji')) {
        kanjiCount++;
      } else if (src === 'grammar' || src.includes('grammar') || src.includes('bunpou')) {
        grammarCount++;
      } else if (src.includes('ssw') || src.includes('kaigo') || src.includes('k3') || src.includes('gemba')) {
        sswCount++;
      }
    });

    const retention =
      cardCountWithStability > 0
        ? Math.round((totalR / cardCountWithStability) * 100)
        : 90; // Default target retention

    let status = 'Prima (Sangat Kuat)';
    let badgeClass = 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
    if (retention < 75) {
      status = 'Kritis (Perlu Review)';
      badgeClass = 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30';
    } else if (retention < 88) {
      status = 'Stabil (Penguatan Rutin)';
      badgeClass = 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30';
    }

    return {
      totalCards: cardValues.length,
      kanjiCardsCount: kanjiCount + bloomedKanjiCount,
      grammarCardsCount: grammarCount,
      sswVocabCount: sswCount,
      avgRetentionRate: retention,
      healthStatus: status,
      retentionBadge: badgeClass,
    };
  }, [cards, trackProgress, bloomedKanjiCount]);

  return (
    <div className="bg-surface border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-6">
      {/* Title & Introduction */}
      <div className="border-b border-accent/15 pb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-accent" />
          <h2 className="text-base sm:text-lg font-bold text-appText-bright">
            Rapor Kemahiran Visual (Visual Learner Mastery Report)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-appText-muted mt-1 leading-relaxed">
          Portofolio kemahiran bahasa Jepang komprehensif: capaian kurikulum JLPT N5–N1, penguasaan kosakata SSW vokasional, dan kesehatan retensi memori FSRS.
        </p>
      </div>

      {/* 4 Core Competency Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: Vocational SSW Vocab */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-surface-2/60 border border-accent/15 flex flex-col justify-between space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-appText-muted flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-accent" />
              Kosakata SSW
            </span>
            <span className="text-xs font-mono font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded">
              Vokasional
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-appText-bright font-mono tracking-tight">
              {sswVocabCount} <span className="text-xs text-appText-muted font-sans font-normal">Istilah</span>
            </div>
            <p className="text-xs text-appText-muted mt-0.5">
              Kaigo, Pengolahan, Pertanian & 12 Sektor
            </p>
          </div>
        </div>

        {/* Metric 2: Kanji Memorized */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-surface-2/60 border border-accent/15 flex flex-col justify-between space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-appText-muted flex items-center gap-1.5">
              <Flower2 className="w-4 h-4 text-accent-hot" />
              Kanji Melekat
            </span>
            <span className="text-xs font-mono font-bold text-accent-hot bg-amber-500/10 px-1.5 py-0.5 rounded">
              Kebun & FSRS
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-appText-bright font-mono tracking-tight">
              {kanjiCardsCount} <span className="text-xs text-appText-muted font-sans font-normal">Karakter</span>
            </div>
            <p className="text-xs text-appText-muted mt-0.5">
              Kanji mekar & kartu memori aktif
            </p>
          </div>
        </div>

        {/* Metric 3: Grammar Patterns */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-surface-2/60 border border-accent/15 flex flex-col justify-between space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-appText-muted flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-sky-500" />
              Pola Bunpou
            </span>
            <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded">
              Tata Bahasa
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-appText-bright font-mono tracking-tight">
              {grammarCardsCount} <span className="text-xs text-appText-muted font-sans font-normal">Pola</span>
            </div>
            <p className="text-xs text-appText-muted mt-0.5">
              Struktur kalimat & konjugasi verba
            </p>
          </div>
        </div>

        {/* Metric 4: FSRS Total Cards */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-surface-2/60 border border-accent/15 flex flex-col justify-between space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-appText-muted flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-indigo-500" />
              Kartu FSRS
            </span>
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">
              Total Dek
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-appText-bright font-mono tracking-tight">
              {totalCards} <span className="text-xs text-appText-muted font-sans font-normal">Item</span>
            </div>
            <p className="text-xs text-appText-muted mt-0.5">
              Interval Spaced Repetition otomatis
            </p>
          </div>
        </div>
      </div>

      {/* FSRS Retention Health Visualizer */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface-2/70 border border-accent/20 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-bold text-appText-bright">
                  Kesehatan Retensi Memori Jangka Panjang (FSRS Memory Health)
                </h3>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${retentionBadge}`}>
                  {avgRetentionRate}% · {healthStatus}
                </span>
              </div>
              <p className="text-xs text-appText-muted mt-0.5">
                Dihitung dari model peluruhan eksponensial Ye et al. (2022) & kompensasi karakter Matsunaga.
              </p>
            </div>
          </div>
        </div>

        {/* Retention Meter Bar */}
        <div className="space-y-1">
          <div className="w-full bg-surface-3 h-2.5 rounded-full overflow-hidden flex">
            <div
              className={`h-full transition-all duration-500 ${
                avgRetentionRate >= 88 ? 'bg-emerald-500' : avgRetentionRate >= 75 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${Math.min(100, avgRetentionRate)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-appText-muted font-mono">
            <span>0% Lupa Total</span>
            <span className="text-accent font-bold">Target Optimal: 90%</span>
            <span>100% Ingatan Kuat</span>
          </div>
        </div>

        {/* Plain-Language Explanation */}
        <p className="text-xs sm:text-sm text-appText-muted leading-relaxed bg-surface/50 p-3 rounded-xl border border-accent/10">
          💡 <strong className="text-appText-bright">Arti Skor Ini:</strong> Algoritma FSRS memproyeksikan stabilitas memori jangka panjangmu. Tingkat retensi optimal (90%+) memastikan kamu mengingat materi secara alami saat ujian JLPT atau berbicara di tempat kerja tanpa perlu sistem kebut semalam.
        </p>
      </div>

      {/* Streak & 36-Hour Grace Window Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-surface-2/80 to-surface-2/60 border border-amber-500/25 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border-2 border-amber-500/30 flex items-center justify-center text-2xl shrink-0 shadow-inner">
              🔥
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black text-appText-bright font-mono">
                  {streakInfo.count} Hari Beruntun
                </h3>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                  streakInfo.isTodayActive
                    ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                    : streakInfo.isProtected
                    ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30'
                    : 'bg-surface-3 text-appText-muted border-accent/15'
                }`}>
                  {streakInfo.isTodayActive ? '✓ Aktif Hari Ini' : streakInfo.isProtected ? '🛡️ Grace Window (36h) Aktif' : 'Belum Belajar'}
                </span>
              </div>
              <p className="text-xs text-appText-muted mt-0.5">
                {streakInfo.isTodayActive
                  ? 'Selamat! Kamu sudah menyelesaikan sesi belajar hari ini dan memperpanjang streak.'
                  : streakInfo.isProtected
                  ? 'Streak kamu saat ini dilindungi oleh jendela tenggang 36 jam. Belajar sebelum jendela habis!'
                  : 'Selesaikan 1 materi atau sesi kuis hari ini untuk mempertahankan api belajarmu.'}
              </p>
            </div>
          </div>
        </div>

        {/* Grace Window Explanation Pill */}
        <div className="flex items-center gap-2 text-xs text-appText-muted bg-surface/60 p-2.5 rounded-xl border border-amber-500/15">
          <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
          <span>
            <strong className="text-appText-bright">Perlindungan 36 Jam:</strong> Nugget Nihongo memberikan toleransi 36 jam antar sesi belajar agar streak tidak hangus karena perbedaan zona waktu WIB/WITA/WIT/JST atau kesibukan mendadak.
          </span>
        </div>
      </div>

      {/* Visual JLPT Progress Breakdown (N5 to N1) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-appText-bright flex items-center gap-2">
            <Layers className="w-4 h-4 text-accent" />
            Kemajuan Kurikulum JLPT (N5 hingga N1)
          </h3>
          <span className="text-xs text-appText-muted font-mono">5 Tingkatan Standar</span>
        </div>

        <div className="space-y-2.5">
          {jlptLevelsData.map((item) => (
            <div
              key={item.level}
              className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                item.isRecommendedByCat
                  ? 'bg-accent/10 border-accent shadow-xs ring-1 ring-accent/20'
                  : 'bg-surface-2/60 border-accent/15'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`text-xs font-mono font-black uppercase px-2 py-0.5 rounded-md border shrink-0 ${item.badgeBg}`}>
                    {item.level.toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <span className="text-sm font-bold text-appText-bright truncate block">
                      {item.title}
                    </span>
                    <span className="text-xs text-appText-muted truncate block">
                      {item.subtitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 font-mono text-xs">
                  {item.isRecommendedByCat && (
                    <span className="px-2 py-0.5 rounded-full bg-accent text-bg font-sans font-bold text-xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Rekomendasi CAT
                    </span>
                  )}
                  <span className="text-appText-muted">
                    {item.completedLessons} / {item.totalLessons} Selesai
                  </span>
                  <span className="font-bold text-accent min-w-[36px] text-right">
                    {item.percent}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-surface-3 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    item.percent >= 100 ? 'bg-emerald-500' : 'bg-accent'
                  }`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
