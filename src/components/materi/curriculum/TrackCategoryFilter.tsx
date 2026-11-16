// ══════════════════════════════════════════════════════════════════
//  TrackCategoryFilter.tsx — Segmented Category Switcher for Tracks
//  Ticket: Tab 1 Belajar Modularization
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import { Award, Briefcase, HeartPulse, BookOpen } from 'lucide-react';
import { TrackId } from '../../../lib/curriculum/curriculumStore';

export type TrackCategory = 'jlpt' | 'ssw' | 'jft' | 'textbook';

export interface TrackCategoryFilterProps {
  activeCategory: TrackCategory;
  onSelectCategory: (cat: TrackCategory) => void;
  activeTrackId: TrackId;
  onSelectTrack: (track: TrackId) => void;
}

export const CATEGORIES: Array<{ id: TrackCategory; label: string; icon: React.ReactNode }> = [
  { id: 'jlpt', label: 'JLPT N5–N1', icon: <Award className="w-3.5 h-3.5" /> },
  { id: 'ssw', label: 'SSW 19 Sektor', icon: <Briefcase className="w-3.5 h-3.5" /> },
  { id: 'jft', label: 'JFT-Basic & Hidup', icon: <HeartPulse className="w-3.5 h-3.5" /> },
  { id: 'textbook', label: '9 Buku Teks', icon: <BookOpen className="w-3.5 h-3.5" /> },
];

export const JLPT_TRACKS: Array<{ id: TrackId; label: string }> = [
  { id: 'n5', label: 'N5 Dasar' },
  { id: 'n4', label: 'N4 Lanjutan' },
  { id: 'n3', label: 'N3 Menengah' },
  { id: 'n2', label: 'N2 Bisnis' },
  { id: 'n1', label: 'N1 Mahir' },
];

export const TrackCategoryFilter: React.FC<TrackCategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
  activeTrackId,
  onSelectTrack,
}) => {
  return (
    <div className="space-y-3">
      {/* Category Segmented Tabs */}
      <div
        role="tablist"
        aria-label="Kategori Jalur Belajar"
        className="flex items-center gap-1 sm:gap-2 p-1 bg-surface-2 border border-accent/20 rounded-2xl overflow-x-auto scrollbar-none max-w-full"
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`min-h-[40px] sm:min-h-[44px] px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-95 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-accent text-bg shadow-sm font-extrabold'
                  : 'text-appText-muted hover:text-appText-bright hover:bg-surface-3'
              }`}
            >
              <span className="shrink-0">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sub-Track Pills for JLPT (or active category) */}
      {activeCategory === 'jlpt' && (
        <div
          role="tablist"
          aria-label="Pilihan Level JLPT"
          className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 max-w-full"
        >
          {JLPT_TRACKS.map((t) => {
            const isSelected = activeTrackId === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isSelected}
                type="button"
                onClick={() => onSelectTrack(t.id)}
                className={`min-h-[40px] sm:min-h-[44px] px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95 shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/20 text-accent border border-amber-500/40 shadow-xs'
                    : 'bg-surface-2 hover:bg-surface-3 text-appText-muted border border-accent/15'
                }`}
              >
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
