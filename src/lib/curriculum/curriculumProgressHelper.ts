// ══════════════════════════════════════════════════════════════════
//  curriculumProgressHelper.ts — Adaptive Next-Lesson Engine
//  Scans active curriculum track and progress to dynamically locate
//  the earliest uncompleted lesson node for zero-friction study CTA.
// ══════════════════════════════════════════════════════════════════

import type { TrackId, TrackProgressState } from './curriculumStore';
import type { CurriculumTrackData, CurriculumUnit, CurriculumLesson } from '../data/dataManager';

export interface NextUncompletedLessonResult {
  trackId: TrackId;
  unitId: string;
  unitNumber: number;
  unitTitle: string;
  lessonId: string;
  lessonNumber: number;
  title: string;
  canDo: string;
  isAllCompleted: boolean;
  totalLessons: number;
  completedLessonsCount: number;
}

/**
 * Dynamically identifies the earliest uncompleted lesson in the active curriculum track.
 * If all lessons in the track are completed, returns the final lesson with isAllCompleted: true.
 * If track data is not yet loaded, provides a safe fallback descriptor.
 *
 * @param trackId - Active curriculum track identifier (e.g. 'n5', 'ssw-kaigo', 'book-genki')
 * @param trackData - Authoritative track definition containing units and lessons
 * @param trackProgress - Completed lesson IDs for this track or all tracks
 */
export function getNextUncompletedLesson(
  trackId: TrackId,
  trackData: CurriculumTrackData | null | undefined,
  trackProgress: Record<TrackId, TrackProgressState> | TrackProgressState | undefined
): NextUncompletedLessonResult | null {
  // Graceful fallback when curriculum track JSON is hydrating or empty or not an array
  if (!trackData || !trackData.units || !Array.isArray(trackData.units) || trackData.units.length === 0) {
    const safeTrackId = trackId && typeof trackId === 'string' ? trackId : ('n5' as TrackId);
    return {
      trackId: safeTrackId,
      unitId: `${safeTrackId}-u1`,
      unitNumber: 1,
      unitTitle: 'Unit 1: Fondasi Awal',
      lessonId: `${safeTrackId}-l1`,
      lessonNumber: 1,
      title: 'Pelajaran 1',
      canDo: 'Mulai langkah awal penguasaan bahasa Jepang di jalur ini.',
      isAllCompleted: false,
      totalLessons: 1,
      completedLessonsCount: 0,
    };
  }

  // Normalize completedLessons array whether a full record map or single TrackProgressState is passed
  let completedLessonsList: string[] = [];
  if (trackProgress && typeof trackProgress === 'object') {
    if ('completedLessons' in trackProgress && Array.isArray((trackProgress as TrackProgressState).completedLessons)) {
      completedLessonsList = (trackProgress as TrackProgressState).completedLessons;
    } else if (trackId && trackId in trackProgress) {
      const entry = (trackProgress as Record<TrackId, TrackProgressState>)[trackId];
      if (entry && typeof entry === 'object' && Array.isArray(entry.completedLessons)) {
        completedLessonsList = entry.completedLessons;
      }
    }
  }

  const completedSet = new Set(completedLessonsList);

  let totalLessonsInTrack = 0;
  let firstUncompleted: {
    unit: CurriculumUnit;
    lesson: CurriculumLesson;
  } | null = null;
  let lastEncounteredLesson: {
    unit: CurriculumUnit;
    lesson: CurriculumLesson;
  } | null = null;

  for (const unit of trackData.units) {
    if (!unit || typeof unit !== 'object' || !unit.lessons || !Array.isArray(unit.lessons) || unit.lessons.length === 0) {
      continue;
    }

    for (const lesson of unit.lessons) {
      if (!lesson || typeof lesson !== 'object' || !lesson.id) {
        continue;
      }

      totalLessonsInTrack++;
      lastEncounteredLesson = { unit, lesson };

      if (!firstUncompleted && !completedSet.has(lesson.id)) {
        firstUncompleted = { unit, lesson };
      }
    }
  }

  // Count how many lessons in THIS track are completed
  const completedLessonsInThisTrackCount = trackData.units.reduce((acc, u) => {
    if (!u || typeof u !== 'object' || !u.lessons || !Array.isArray(u.lessons)) return acc;
    return (
      acc +
      u.lessons.filter(
        (l) => l && typeof l === 'object' && l.id && completedSet.has(l.id)
      ).length
    );
  }, 0);

  // If we found an uncompleted lesson, return it
  if (firstUncompleted) {
    const { unit, lesson } = firstUncompleted;
    return {
      trackId: trackId || ('n5' as TrackId),
      unitId: unit.id,
      unitNumber: unit.unit_number || 1,
      unitTitle: unit.title_id || `Unit ${unit.unit_number || 1}`,
      lessonId: lesson.id,
      lessonNumber: lesson.lesson_number || 1,
      title: lesson.title_id || `Pelajaran ${lesson.lesson_number || 1}`,
      canDo: lesson.can_do_statement || unit.can_do_summary || '',
      isAllCompleted: false,
      totalLessons: totalLessonsInTrack,
      completedLessonsCount: completedLessonsInThisTrackCount,
    };
  }

  // If all lessons in track are completed, return the last lesson marked as isAllCompleted: true
  if (lastEncounteredLesson) {
    const { unit, lesson } = lastEncounteredLesson;
    return {
      trackId: trackId || ('n5' as TrackId),
      unitId: unit.id,
      unitNumber: unit.unit_number || 1,
      unitTitle: unit.title_id || `Unit ${unit.unit_number || 1}`,
      lessonId: lesson.id,
      lessonNumber: lesson.lesson_number || 1,
      title: lesson.title_id || `Pelajaran ${lesson.lesson_number || 1}`,
      canDo: lesson.can_do_statement || unit.can_do_summary || '',
      isAllCompleted: true,
      totalLessons: totalLessonsInTrack,
      completedLessonsCount: totalLessonsInTrack,
    };
  }

  return null;
}
