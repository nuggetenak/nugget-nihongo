// ══════════════════════════════════════════════════════════════════
//  UnitAccordionCard.tsx — Modular Unit Accordion for Curriculum Roadmap
//  Ticket: Tab 1 Belajar Modularization
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import { ChevronDown, CheckCircle2, AlertTriangle, BookOpen } from 'lucide-react';
import { CurriculumUnit } from '../../../lib/data/dataManager';

export interface UnitAccordionCardProps {
  unit: CurriculumUnit;
  isExpanded: boolean;
  onToggle: (unitId: string) => void;
  completedLessonsCount: number;
  totalLessonsCount: number;
  progressPercent: number;
  children?: React.ReactNode;
}

export const UnitAccordionCard: React.FC<UnitAccordionCardProps> = ({
  unit,
  isExpanded,
  onToggle,
  completedLessonsCount,
  totalLessonsCount,
  progressPercent,
  children,
}) => {
  const isUnitDone = totalLessonsCount > 0 && completedLessonsCount === totalLessonsCount;

  return (
    <div className="bg-surface border border-accent/20 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden transition-all card-interactive-lift">
      {/* Unit Header Bar (Accordion Trigger) */}
      <button
        type="button"
        onClick={() => onToggle(unit.id)}
        aria-expanded={isExpanded}
        aria-controls={`unit-content-${unit.id}`}
        className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left hover:bg-surface-2 transition-colors cursor-pointer min-h-[44px] active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-t-2xl sm:rounded-t-3xl"
      >
        <div className="min-w-0 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-amber-500/15 text-accent border border-amber-500/30 tabular-nums">
              Unit {unit.unit_number}
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-appText-bright break-words" title={unit.title_id}>
              {unit.title_id}
            </h3>
            {isUnitDone && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-xs font-extrabold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Tuntas
              </span>
            )}
          </div>

          <div className="text-xs text-appText-muted font-jp break-words">
            {unit.title_jp} · <span className="italic">{unit.theme}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-appText-bright tabular-nums">
              {completedLessonsCount} / {totalLessonsCount} Pelajaran
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold tabular-nums">
              {progressPercent}% Selesai
            </div>
          </div>

          <div
            className={`w-9 h-9 rounded-xl bg-surface-2 border border-accent/20 text-accent flex items-center justify-center transition-transform ${
              isExpanded ? 'rotate-180 bg-accent text-bg' : ''
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </button>

      {/* Expanded Content Area */}
      {isExpanded && (
        <div
          id={`unit-content-${unit.id}`}
          role="region"
          aria-label={`Daftar Pelajaran Unit ${unit.unit_number}`}
          className="p-4 sm:p-5 pt-0 border-t border-accent/15 space-y-4 animate-in fade-in duration-200"
        >
          {/* Can-Do Summary */}
          {unit.can_do_summary && (
            <div className="p-3.5 rounded-2xl bg-surface-2 border border-accent/15 text-xs space-y-1 mt-3">
              <div className="flex items-center gap-1.5 font-bold text-accent">
                <span>🎯</span>
                <span>Sasaran Kemampuan Nyata (Can-Do):</span>
              </div>
              <p className="text-appText leading-relaxed text-xs sm:text-sm">
                {unit.can_do_summary}
              </p>
            </div>
          )}

          {/* L1 Focus Notes if present */}
          {unit.l2d_focus_notes && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-accent-hot">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>💡 Tips Bahasa (Waspada Pola Bahasa Indonesia):</span>
              </div>
              <p className="text-xs sm:text-sm text-appText leading-relaxed">
                {unit.l2d_focus_notes}
              </p>
            </div>
          )}

          {/* Lesson List Container */}
          <div className="space-y-2.5 pt-1">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
