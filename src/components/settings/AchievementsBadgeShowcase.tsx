import React, { useState, useMemo } from 'react';
import { Award, Lock, CheckCircle2, Sparkles, Filter } from 'lucide-react';
import { BadgeItem } from '../../lib/gamification/gamificationStore';

interface AchievementsBadgeShowcaseProps {
  badges: BadgeItem[];
}

export const AchievementsBadgeShowcase: React.FC<AchievementsBadgeShowcaseProps> = ({ badges }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'vocab' | 'grammar' | 'streak' | 'special'>('all');

  const categories: Array<{ id: typeof selectedCategory; label: string; icon: string }> = [
    { id: 'all', label: 'Semua', icon: '🌟' },
    { id: 'vocab', label: 'Kosakata', icon: '🌱' },
    { id: 'grammar', label: 'Tata Bahasa', icon: '🔤' },
    { id: 'streak', label: 'Streak', icon: '🔥' },
    { id: 'special', label: 'Spesial', icon: '✨' },
  ];

  const earnedCount = useMemo(() => badges.filter((b) => b.earned).length, [badges]);
  const progressPercent = Math.round((earnedCount / Math.max(1, badges.length)) * 100);

  const filteredBadges = useMemo(() => {
    if (selectedCategory === 'all') return badges;
    return badges.filter((b) => b.category === selectedCategory);
  }, [badges, selectedCategory]);

  return (
    <div className="bg-surface border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-5">
      {/* Header & Overall Badge Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-accent/15 pb-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-appText-bright flex items-center gap-2">
            <Award className="w-5 h-5 text-accent" />
            Lencana & Pencapaian Prestasi (Milestone Badges)
          </h2>
          <p className="text-xs sm:text-sm text-appText-muted mt-1 leading-relaxed">
            Koleksi penghargaan belajarmu. Setiap lencana memiliki kriteria pencapaian objektif untuk memandu target harian.
          </p>
        </div>

        {/* Counter Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 bg-surface-2/80 px-3 py-1.5 rounded-xl border border-accent/20">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <div className="text-xs font-mono font-bold text-appText-bright">
            {earnedCount} <span className="text-appText-muted font-normal">/ {badges.length} Terbuka</span>
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-accent/15 text-accent border border-accent/25">
            {progressPercent}%
          </span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 shrink-0 flex items-center gap-1.5 border min-h-[36px] ${
                isSelected
                  ? 'bg-accent text-bg border-accent shadow-xs'
                  : 'bg-surface-2/60 border-accent/15 text-appText-muted hover:text-appText-bright hover:bg-surface-2'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredBadges.map((badge) => {
          const isEarned = badge.earned;
          return (
            <div
              key={badge.id}
              className={`p-3.5 sm:p-4 rounded-xl border transition-all flex items-start gap-3 relative overflow-hidden ${
                isEarned
                  ? 'bg-gradient-to-br from-accent/10 via-surface-2/80 to-surface-2/40 border-accent/30 shadow-xs'
                  : 'bg-surface-2/40 border-accent/10 opacity-75'
              }`}
            >
              {/* Badge Icon / Lock Badge */}
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-inner border select-none ${
                  isEarned
                    ? 'bg-accent/20 border-accent/30 text-accent'
                    : 'bg-surface-3/60 border-accent/10 grayscale opacity-60'
                }`}
              >
                {isEarned ? badge.icon : '🔒'}
              </div>

              {/* Badge Information */}
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-between gap-1">
                  <span
                    className={`text-sm font-bold truncate block ${
                      isEarned ? 'text-appText-bright' : 'text-appText-muted'
                    }`}
                  >
                    {badge.name}
                  </span>
                  {isEarned ? (
                    <span className="text-xs text-emerald-500 font-bold shrink-0 flex items-center gap-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Terbuka
                    </span>
                  ) : (
                    <span className="text-xs text-appText-muted font-mono shrink-0">
                      Terkunci
                    </span>
                  )}
                </div>

                <p className="text-xs text-appText-muted leading-relaxed line-clamp-2">
                  {badge.desc}
                </p>

                {isEarned && badge.earnedAt && (
                  <span className="text-xs text-accent font-mono block pt-0.5">
                    Diraih: {new Date(badge.earnedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                )}
                {!isEarned && (
                  <span className="text-xs text-appText-muted/80 font-mono block pt-0.5">
                    🎯 Kriteria: {badge.desc}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
