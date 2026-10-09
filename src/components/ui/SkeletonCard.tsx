// ══════════════════════════════════════════════════════════════════
//  SkeletonCard.tsx — Pulsating Amber Skeleton Card Placeholders
//  Zero Cumulative Layout Shift (CLS) during async database loads
// ══════════════════════════════════════════════════════════════════

import React from 'react';

interface SkeletonGridProps {
  count?: number;
  type?: 'card' | 'row';
}

export const SkeletonCard: React.FC<{ type?: 'card' | 'row' }> = ({ type = 'card' }) => {
  if (type === 'row') {
    return (
      <div className="bg-surface-2/60 border border-accent/15 rounded-2xl p-4 flex items-center justify-between animate-pulse">
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-surface-3 rounded w-1/3" />
          <div className="h-3 bg-surface-3/60 rounded w-1/2" />
        </div>
        <div className="w-8 h-8 rounded-xl bg-surface-3/80 shrink-0" />
      </div>
    );
  }

  return (
    <div className="bg-surface-2/60 border border-accent/15 rounded-2xl p-5 flex flex-col justify-between space-y-4 animate-pulse">
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="h-6 bg-surface-3 rounded w-2/5" />
          <div className="w-7 h-7 rounded-lg bg-surface-3/70" />
        </div>
        <div className="h-3 bg-surface-3/60 rounded w-1/4" />
        <div className="h-4 bg-surface-3/80 rounded w-4/5 pt-1" />
      </div>

      <div className="pt-3 border-t border-accent/10 flex items-center justify-between">
        <div className="h-2.5 bg-surface-3/50 rounded w-1/5" />
        <div className="h-2.5 bg-surface-3/50 rounded w-1/6" />
      </div>
    </div>
  );
};

export const SkeletonGrid: React.FC<SkeletonGridProps> = ({ count = 6, type = 'card' }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 animate-in fade-in duration-200">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} type={type} />
      ))}
    </div>
  );
};
