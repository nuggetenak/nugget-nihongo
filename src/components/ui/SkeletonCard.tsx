// ══════════════════════════════════════════════════════════════════
//  SkeletonCard.tsx — Shimmering Amber Skeleton Placeholders
//  Zero Cumulative Layout Shift (CLS) during async database loads
// ══════════════════════════════════════════════════════════════════

import React from 'react';

export type SkeletonType = 'card' | 'row' | 'word' | 'plant';

interface SkeletonCardProps {
  type?: SkeletonType;
  className?: string;
}

interface SkeletonGridProps {
  count?: number;
  type?: SkeletonType;
  className?: string;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ type = 'card', className = '' }) => {
  if (type === 'word') {
    return (
      <div className={`relative overflow-hidden bg-surface-2/60 border border-accent/15 rounded-2xl sm:rounded-3xl p-4 sm:p-6 min-h-[180px] flex flex-col justify-between ${className}`}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-surface-3 rounded w-1/3" />
            <div className="h-5 bg-surface-3/70 rounded-full w-16" />
          </div>
          <div className="space-y-2">
            <div className="h-8 bg-surface-3 rounded w-1/2" />
            <div className="h-4 bg-surface-3/80 rounded w-2/3" />
            <div className="h-3 bg-surface-3/50 rounded w-3/4" />
          </div>
        </div>
        <div className="pt-3 border-t border-accent/10 flex items-center justify-between">
          <div className="h-3 bg-surface-3/50 rounded w-1/4" />
        </div>
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent/10 dark:via-white/5 to-transparent animate-shimmer-flow pointer-events-none" />
      </div>
    );
  }

  if (type === 'plant') {
    return (
      <div className={`relative overflow-hidden bg-surface-2/60 border border-theme rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 flex flex-col justify-between min-h-[170px] space-y-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="h-4 bg-surface-3 rounded-full w-12" />
          <div className="w-5 h-5 bg-surface-3/70 rounded-full" />
        </div>
        <div className="flex flex-col items-center space-y-2 my-auto">
          <div className="h-10 bg-surface-3 rounded w-16" />
          <div className="h-3 bg-surface-3/60 rounded w-20" />
          <div className="h-3 bg-surface-3/80 rounded w-24" />
        </div>
        <div className="pt-3 border-t border-theme space-y-1.5">
          <div className="h-2 bg-surface-3/50 rounded w-full" />
        </div>
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent/10 dark:via-white/5 to-transparent animate-shimmer-flow pointer-events-none" />
      </div>
    );
  }

  if (type === 'row') {
    return (
      <div className={`relative overflow-hidden bg-surface-2/60 border border-accent/15 rounded-2xl p-4 flex items-center justify-between ${className}`}>
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-surface-3 rounded w-1/3" />
          <div className="h-3 bg-surface-3/60 rounded w-1/2" />
        </div>
        <div className="w-8 h-8 rounded-xl bg-surface-3/80 shrink-0 ml-3" />
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent/10 dark:via-white/5 to-transparent animate-shimmer-flow pointer-events-none" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-surface-2/60 border border-accent/15 rounded-2xl p-5 flex flex-col justify-between space-y-4 ${className}`}>
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
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent/10 dark:via-white/5 to-transparent animate-shimmer-flow pointer-events-none" />
    </div>
  );
};

export const SkeletonGrid: React.FC<SkeletonGridProps> = ({ count = 6, type = 'card', className = '' }) => {
  const containerClass =
    type === 'plant'
      ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 animate-in fade-in duration-200'
      : type === 'row'
      ? 'space-y-2.5 animate-in fade-in duration-200'
      : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 animate-in fade-in duration-200';

  return (
    <div className={`${containerClass} ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} type={type} />
      ))}
    </div>
  );
};
