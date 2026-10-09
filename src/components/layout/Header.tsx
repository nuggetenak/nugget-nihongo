import React from 'react';
import { Search, Flame, Zap } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { JLPTLevel } from '../../types/vocab';

export const Header: React.FC = () => {
  const { streak, xp, selectedLevel, setSelectedLevel, searchQuery, setSearchQuery } = useAppStore();

  const levels: (JLPTLevel | 'all')[] = ['all', 'n5', 'n4', 'n3', 'n2', 'n1'];

  return (
    <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur-md border-b border-accent/15 px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
      {/* Mobile brand (hidden on desktop) */}
      <div className="flex lg:hidden items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-600 to-amber-500 flex items-center justify-center text-base shadow-sm">
          🍙
        </div>
        <span className="font-bold text-sm text-appText-bright">Nugget</span>
      </div>

      {/* Search Input Bar with Shortcut Indicator */}
      <div className="flex-1 max-w-md relative">
        <Search className="w-4 h-4 text-appText-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari kanji, kosakata, pola tata bahasa..."
          className="w-full bg-surface-2 border border-accent/20 rounded-xl pl-9 pr-12 py-2 text-xs md:text-sm text-appText-bright placeholder-appText-muted/60 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
        />
        <kbd className="hidden sm:inline-block absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono bg-surface-3/80 text-appText-muted px-1.5 py-0.5 rounded border border-accent/15">
          ⌘K
        </kbd>
      </div>

      {/* Level Filters (Desktop/Tablet) */}
      <div className="hidden md:flex items-center gap-1 bg-surface-2 p-1 rounded-xl border border-accent/15">
        {levels.map((lvl) => {
          const isSelected = selectedLevel === lvl;
          return (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all uppercase ${
                isSelected
                  ? 'bg-accent text-bg font-extrabold shadow-sm'
                  : 'text-appText-muted hover:text-appText-bright'
              }`}
            >
              {lvl}
            </button>
          );
        })}
      </div>

      {/* Gamification Badges: Streak & XP */}
      <div className="flex items-center gap-2">
        {/* Streak Flame */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-accent-hot shadow-sm">
          <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
          <span className="text-xs font-bold font-mono">{streak}</span>
        </div>

        {/* XP Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-2 border border-accent/20 text-appText-bright shadow-sm">
          <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold font-mono">{xp} XP</span>
        </div>
      </div>
    </header>
  );
};
