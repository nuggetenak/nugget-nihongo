import React from 'react';
import { Zap, CheckCircle2, Target, Sparkles } from 'lucide-react';

export interface DailyGoalTier {
  id: string;
  xp: number;
  label: string;
  sublabel: string;
  desc: string;
  icon: string;
  badge?: string;
}

export const DAILY_GOAL_TIERS: DailyGoalTier[] = [
  {
    id: 'santai',
    xp: 30,
    label: 'Santai',
    sublabel: '30 XP / hari',
    desc: '5–10 menit latihan ringan harian. Cocok untuk membangun kebiasaan tanpa beban.',
    icon: '☕',
  },
  {
    id: 'standar',
    xp: 50,
    label: 'Standar',
    sublabel: '50 XP / hari',
    desc: '1–2 materi + 1 sesi review kuis. Ritme ideal yang direkomendasikan kurikulum.',
    icon: '🎯',
    badge: 'Rekomendasi',
  },
  {
    id: 'serius',
    xp: 100,
    label: 'Serius',
    sublabel: '100 XP / hari',
    desc: 'Persiapan konsisten ujian JLPT N5–N1 atau sertifikasi JFT-Basic.',
    icon: '🔥',
  },
  {
    id: 'intensif',
    xp: 200,
    label: 'Intensif',
    sublabel: '200 XP / hari',
    desc: 'Akselerasi kilat untuk kesiapan kerja Tokutei Ginou (SSW) di Jepang.',
    icon: '⚡',
    badge: 'Akselerasi',
  },
];

interface DailyGoalSelectorProps {
  dailyGoalXP: number;
  todayXP: number;
  isGoalReached: boolean;
  goalProgressPercent: number;
  onSelectGoal: (goal: number) => void;
  showToast: (msg: string, icon?: string) => void;
}

export const DailyGoalSelector: React.FC<DailyGoalSelectorProps> = ({
  dailyGoalXP,
  todayXP,
  isGoalReached,
  goalProgressPercent,
  onSelectGoal,
  showToast,
}) => {
  const handleSelectTier = (tier: DailyGoalTier) => {
    onSelectGoal(tier.xp);
    showToast(`Target harian disetel ke ${tier.xp} XP (${tier.label})!`, tier.icon);
  };

  return (
    <div className="bg-surface border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-5">
      {/* Header with Today's Live Metric */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-accent/15 pb-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-appText-bright flex items-center gap-2">
            <Target className="w-5 h-5 text-accent" />
            Target XP Harian (Komitmen Belajar)
          </h2>
          <p className="text-xs sm:text-sm text-appText-muted mt-1 leading-relaxed">
            Sesuaikan target XP harian dengan waktu luangmu. Target ini otomatis memperbarui progress bar beranda dan streak tracker.
          </p>
        </div>

        {/* Today's Goal Progress Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 bg-surface-2/80 px-3 py-1.5 rounded-xl border border-accent/20">
          <Zap className="w-4 h-4 text-accent" />
          <div className="text-xs font-mono font-bold text-appText-bright">
            {todayXP} <span className="text-appText-muted font-normal">/ {dailyGoalXP} XP</span>
          </div>
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-md ${
              isGoalReached
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                : 'bg-accent/15 text-accent border border-accent/25'
            }`}
          >
            {isGoalReached ? 'Tercapai 🎯' : `${goalProgressPercent}%`}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="w-full bg-surface-3 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isGoalReached ? 'bg-emerald-500' : 'bg-accent'
            }`}
            style={{ width: `${Math.min(100, goalProgressPercent)}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-appText-muted font-mono">
          <span>Hari Ini: {todayXP} XP</span>
          <span>Target: {dailyGoalXP} XP</span>
        </div>
      </div>

      {/* 4 Daily Goal Tier Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {DAILY_GOAL_TIERS.map((tier) => {
          const isSelected = dailyGoalXP === tier.xp;
          return (
            <button
              key={tier.id}
              onClick={() => handleSelectTier(tier)}
              className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all active:scale-95 flex flex-col justify-between space-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[110px] ${
                isSelected
                  ? 'bg-accent/10 border-accent text-appText-bright shadow-xs'
                  : 'bg-surface-2/60 border-accent/15 text-appText-muted hover:border-accent/30 hover:bg-surface-2'
              }`}
            >
              <div className="flex items-start justify-between w-full gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl select-none">{tier.icon}</span>
                  <div>
                    <span className={`text-sm font-bold block ${isSelected ? 'text-accent' : 'text-appText-bright'}`}>
                      {tier.label}
                    </span>
                    <span className="text-xs font-mono text-appText-muted">
                      {tier.sublabel}
                    </span>
                  </div>
                </div>

                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                ) : tier.badge ? (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/25 shrink-0">
                    {tier.badge}
                  </span>
                ) : null}
              </div>

              <p className="text-xs text-appText-muted leading-relaxed line-clamp-2">
                {tier.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
