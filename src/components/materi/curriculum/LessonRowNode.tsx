// ══════════════════════════════════════════════════════════════════
//  LessonRowNode.tsx — Modular Lesson Path Item for Curriculum Roadmap
//  Ticket: Tab 1 Belajar Modularization
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import { BookOpen, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { CurriculumLesson } from '../../../types/curriculum';

export interface LessonRowNodeProps {
  lesson: CurriculumLesson;
  unitId: string;
  trackId: string;
  isDone: boolean;
  isNextTarget: boolean;
  score?: number;
  onOpenStudy: (trackId: string, unitId: string, lessonId: string) => void;
}

export const LessonRowNode: React.FC<LessonRowNodeProps> = ({
  lesson,
  unitId,
  trackId,
  isDone,
  isNextTarget,
  score,
  onOpenStudy,
}) => {
  return (
    <div
      className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
        isNextTarget
          ? 'bg-amber-500/10 border-accent/40 shadow-sm ring-1 ring-amber-500/30'
          : isDone
          ? 'bg-surface-2 border-emerald-500/25'
          : 'bg-surface border-accent/15 hover:border-accent/30'
      }`}
    >
      <div className="space-y-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            {isDone ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : isNextTarget ? (
              <span className="w-3.5 h-3.5 rounded-full bg-accent animate-pulse shrink-0" />
            ) : (
              <Circle className="w-3.5 h-3.5 text-appText-muted shrink-0" />
            )}
            <span className="text-xs font-bold font-mono text-appText-bright">
              Pelajaran #{lesson.lesson_number}
            </span>
          </div>

          {isDone && score !== undefined && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
              Skor: {score}%
            </span>
          )}

          {lesson.vocab_ids && lesson.vocab_ids.length > 0 && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/80 dark:text-blue-200 dark:border-blue-800/50 shadow-xs">
              {lesson.vocab_ids.length} Kosakata
            </span>
          )}

          {lesson.grammar_ids && lesson.grammar_ids.length > 0 && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-500/15 text-accent border border-amber-500/30">
              {lesson.grammar_ids.length} Pola
            </span>
          )}
        </div>

        <div className="text-sm sm:text-base font-bold text-appText-bright truncate" title={lesson.title_id}>
          {lesson.title_id}
        </div>
        <div className="text-xs text-appText-muted font-jp">
          {lesson.title_jp}
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
        <button
          type="button"
          onClick={() => onOpenStudy(trackId, unitId, lesson.id)}
          className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 active:scale-95 shadow-sm cursor-pointer ${
            isNextTarget
              ? 'bg-accent hover:bg-accent-hot text-bg shadow-glow'
              : isDone
              ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
              : 'bg-surface-3 hover:bg-surface text-appText-bright border border-accent/20'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{isDone ? 'Ulas' : 'Mulai Belajar'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
