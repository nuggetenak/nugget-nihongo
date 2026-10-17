// ══════════════════════════════════════════════════════════════════
//  PageSkeleton.tsx — Reusable Suspense Skeletons & Layout Fallbacks
//  Ticket T-232: Eliminates blank flashes during lazy route/modal loading
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import { SkeletonGrid } from './SkeletonCard';

export const PageSkeleton: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <div className="py-6 space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* Header bar skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 bg-surface-2/60 rounded-2xl w-48 animate-pulse" />
        <div className="h-8 bg-surface-2/40 rounded-xl w-24 animate-pulse hidden sm:block" />
      </div>

      {/* Hero card skeleton */}
      <div className="h-44 sm:h-52 bg-surface-2/40 rounded-3xl border border-accent/15 p-6 space-y-4 animate-pulse">
        <div className="h-6 bg-surface-3/50 rounded-xl w-3/4 max-w-md" />
        <div className="h-4 bg-surface-3/30 rounded-lg w-1/2 max-w-xs" />
        <div className="h-10 bg-amber-500/20 rounded-2xl w-40 mt-4" />
      </div>

      {/* Grid skeleton */}
      <SkeletonGrid count={6} type="card" />
    </div>
  );
};

export const ModalSuspenseFallback: React.FC = () => {
  return (
    <div
      role="status"
      aria-label="Memuat modul..."
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div className="w-full max-w-md bg-surface border border-accent/30 rounded-3xl p-6 shadow-2xl space-y-4 text-center animate-pulse">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 mx-auto" />
        <div className="h-5 bg-surface-2/80 rounded-xl w-40 mx-auto" />
        <div className="h-3.5 bg-surface-2/50 rounded-lg w-56 mx-auto" />
        <div className="h-28 bg-surface-2/30 rounded-2xl w-full" />
      </div>
    </div>
  );
};
