import React, { useMemo } from 'react';
import { useGamificationStore, HeatmapDay } from '../../lib/gamification/gamificationStore';
import { Calendar, Flame } from 'lucide-react';
import { IrasutoyaImage } from '../common/IrasutoyaImage';

interface HeatmapCalendarProps {
  days?: number;
  hideWrapper?: boolean;
  className?: string;
}

export const HeatmapCalendar: React.FC<HeatmapCalendarProps> = ({
  days = 49,
  hideWrapper = false,
  className = '',
}) => {
  const { getHeatmapDays } = useGamificationStore();
  const safeDays = Math.max(7, Math.min(365, Number.isFinite(days) && days > 0 ? Math.floor(days) : 49));
  const heatmapDays = useMemo(() => getHeatmapDays(safeDays), [getHeatmapDays, safeDays]);

  const activeDaysCount = heatmapDays.filter((d) => d.active).length;

  const getColorClass = (reviews: number) => {
    if (reviews === 0) return 'bg-surface-3/80 border border-accent/20 text-appText-muted hover:border-accent/40';
    if (reviews <= 3) return 'bg-amber-900/80 dark:bg-amber-950/80 text-amber-100 dark:text-amber-200 border border-amber-600/60 dark:border-amber-700/60 shadow-xs';
    if (reviews <= 10) return 'bg-amber-700 dark:bg-amber-800 text-amber-50 dark:text-amber-100 border border-amber-500 font-bold shadow-xs';
    if (reviews <= 25) return 'bg-amber-500 text-stone-950 border border-amber-300 font-black shadow-sm';
    return 'bg-amber-400 text-stone-950 border border-amber-200 font-black shadow-glow';
  };

  const content = (
    <>
      {!hideWrapper && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
              <IrasutoyaImage
                assetId="senpai_studying"
                className="w-5 h-5 object-contain"
                alt="Aktivitas Belajar"
                animateFloat
              />
            </div>
            <h3 className="font-bold text-sm text-appText-bright">Aktivitas Belajar 7 Pekan Terakhir</h3>
          </div>
          <span className="text-xs font-extrabold font-mono text-amber-800 dark:text-amber-400 tabular-nums">
            {activeDaysCount} Hari Aktif
          </span>
        </div>
      )}

      {/* Grid of days (7 rows x 7 cols) with anti-blowout horizontal scrolling */}
      <div className="w-full max-w-full overflow-x-auto pb-1 scrollbar-none" role="region" aria-label="Kalender Aktivitas Belajar">
        <div className="grid grid-flow-col grid-rows-7 gap-1 sm:gap-1.5 w-max" role="grid" aria-label="Grid aktivitas 7 pekan">
          {heatmapDays.map((d) => (
            <div
              key={d.date}
              role="gridcell"
              tabIndex={0}
              aria-label={`${d.date}: ${d.reviews} review, ${d.xp} XP`}
              title={`${d.date}: ${d.reviews} review (+${d.xp} XP)`}
              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center text-xs font-mono select-none ${getColorClass(
                d.reviews
              )}`}
            >
              {d.reviews > 0 && (
                <span className="font-bold leading-none">
                  {d.reviews > 99 ? '99+' : d.reviews}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Legend Bar */}
      <div className="flex items-center justify-between text-xs font-medium text-appText-muted pt-2 border-t border-accent/10">
        <span>Sedikit / Kosong</span>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-md bg-surface-3/80 border border-accent/20 inline-block" title="0 aktivitas" />
          <span className="w-3.5 h-3.5 rounded-md bg-amber-900/80 dark:bg-amber-950/80 border border-amber-600/60 dark:border-amber-700/60 inline-block" title="1-3 review" />
          <span className="w-3.5 h-3.5 rounded-md bg-amber-700 dark:bg-amber-800 border border-amber-500 inline-block" title="4-10 review" />
          <span className="w-3.5 h-3.5 rounded-md bg-amber-500 border border-amber-300 inline-block" title="11-25 review" />
          <span className="w-3.5 h-3.5 rounded-md bg-amber-400 border border-amber-200 inline-block" title="25+ review" />
        </div>
        <span>Banyak</span>
      </div>
    </>
  );

  if (hideWrapper) {
    return <div className={`space-y-3 ${className}`}>{content}</div>;
  }

  return (
    <div className={`card-interactive-lift bg-surface-2 border border-accent/20 rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm ${className}`}>
      {content}
    </div>
  );
};
