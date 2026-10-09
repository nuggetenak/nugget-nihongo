import React, { useMemo } from 'react';
import { useGamificationStore, HeatmapDay } from '../../lib/gamification/gamificationStore';
import { Calendar, Flame } from 'lucide-react';

interface HeatmapCalendarProps {
  days?: number;
}

export const HeatmapCalendar: React.FC<HeatmapCalendarProps> = ({ days = 49 }) => {
  const { getHeatmapDays } = useGamificationStore();
  const heatmapDays = useMemo(() => getHeatmapDays(days), [getHeatmapDays, days]);

  const activeDaysCount = heatmapDays.filter((d) => d.active).length;

  const getColorClass = (reviews: number) => {
    if (reviews === 0) return 'bg-surface-3/50 border border-transparent';
    if (reviews <= 3) return 'bg-amber-900/60 border border-amber-700/50';
    if (reviews <= 10) return 'bg-amber-700 border border-amber-500/60';
    if (reviews <= 25) return 'bg-amber-500 border border-amber-400 shadow-sm';
    return 'bg-amber-400 border border-amber-300 shadow-glow';
  };

  return (
    <div className="bg-surface-2 border border-accent/20 rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-accent" />
          <h3 className="font-bold text-sm text-appText-bright">Aktivitas Belajar 7 Pekan Terakhir</h3>
        </div>
        <span className="text-xs font-bold font-mono text-accent-hot">
          {activeDaysCount} Hari Aktif
        </span>
      </div>

      {/* Grid of days (7 rows x 7 cols) */}
      <div className="grid grid-flow-col grid-rows-7 gap-1.5 sm:gap-2 overflow-x-auto pb-1 max-w-full justify-between sm:justify-start scrollbar-none">
        {heatmapDays.map((d) => (
          <div
            key={d.date}
            title={`${d.date}: ${d.reviews} review (+${d.xp} XP)`}
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg transition-transform hover:scale-110 cursor-pointer flex items-center justify-center text-[9px] font-mono select-none ${getColorClass(
              d.reviews
            )}`}
          >
            {d.reviews > 0 && (
              <span className="text-appText-bright font-bold opacity-80">
                {d.reviews > 99 ? '99+' : d.reviews}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Legend Bar */}
      <div className="flex items-center justify-between text-[11px] text-appText-muted pt-1 border-t border-accent/10">
        <span>Kurang</span>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-surface-3/50 inline-block" />
          <span className="w-3 h-3 rounded bg-amber-900/60 inline-block" />
          <span className="w-3 h-3 rounded bg-amber-700 inline-block" />
          <span className="w-3 h-3 rounded bg-amber-500 inline-block" />
          <span className="w-3 h-3 rounded bg-amber-400 inline-block" />
        </div>
        <span>Sering</span>
      </div>
    </div>
  );
};
