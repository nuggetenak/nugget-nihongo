const assert = require('assert');

// Candidate hardened implementation
function getNextUncompletedLessonHardened(
  trackId,
  trackData,
  trackProgress
) {
  // Graceful fallback when curriculum track JSON is hydrating or empty or not an array
  if (!trackData || !trackData.units || !Array.isArray(trackData.units) || trackData.units.length === 0) {
    const safeTrackId = trackId && typeof trackId === 'string' ? trackId : 'n5';
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
  let completedLessonsList = [];
  if (trackProgress && typeof trackProgress === 'object') {
    if ('completedLessons' in trackProgress && Array.isArray(trackProgress.completedLessons)) {
      completedLessonsList = trackProgress.completedLessons;
    } else if (trackId && trackId in trackProgress) {
      const entry = trackProgress[trackId];
      if (entry && typeof entry === 'object' && Array.isArray(entry.completedLessons)) {
        completedLessonsList = entry.completedLessons;
      }
    }
  }

  const completedSet = new Set(completedLessonsList);

  let totalLessonsInTrack = 0;
  let firstUncompleted = null;
  let lastEncounteredLesson = null;

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
      trackId: trackId || 'n5',
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
      trackId: trackId || 'n5',
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

// ── TEST CASES ────────────────────────────────────────────────────────

console.log('Testing Edge Cases...');

// Case 1: VULN-M1-01 non-array lessons
const c1 = getNextUncompletedLessonHardened('n5', { units: [{ id: 'u1', lessons: 'invalid_string' }] }, {});
assert.strictEqual(c1, null, 'Units with non-array lessons should yield null without throwing');
console.log('✓ Case 1 (non-array lessons string) passed');

const c1b = getNextUncompletedLessonHardened('n5', { units: [{ id: 'u1', lessons: 12345 }] }, {});
assert.strictEqual(c1b, null, 'Units with non-array lessons number should yield null without throwing');
console.log('✓ Case 1b (non-array lessons number) passed');

const c1c = getNextUncompletedLessonHardened('n5', { units: [{ id: 'u1', lessons: {} }] }, {});
assert.strictEqual(c1c, null, 'Units with non-array lessons object should yield null without throwing');
console.log('✓ Case 1c (non-array lessons object) passed');

// Case 2: VULN-M1-02 null lesson item
const c2 = getNextUncompletedLessonHardened('n5', { units: [{ id: 'u1', lessons: [null] }] }, {});
assert.strictEqual(c2, null, 'Units with only null lessons should yield null without throwing');
console.log('✓ Case 2 (null lesson item) passed');

const c2b = getNextUncompletedLessonHardened('n5', { units: [{ id: 'u1', lessons: [null, undefined, 'bad', { id: 'l1', title_id: 'L1' }] }] }, {});
assert.strictEqual(c2b.lessonId, 'l1', 'Should skip null/undefined/primitive lessons and pick valid l1');
assert.strictEqual(c2b.totalLessons, 1);
assert.strictEqual(c2b.completedLessonsCount, 0);
console.log('✓ Case 2b (mixed corrupted lessons) passed');

// Case 3: Malformed units array
const c3 = getNextUncompletedLessonHardened('n5', { units: 'not_an_array' }, {});
assert(c3 !== null && c3.lessonId === 'n5-l1', 'Non-array units should trigger safe fallback');
console.log('✓ Case 3 (units is string) passed');

const c3b = getNextUncompletedLessonHardened('n5', { units: [null, undefined, 'string', { id: 'u1', lessons: [{ id: 'l1' }] }] }, {});
assert.strictEqual(c3b.lessonId, 'l1', 'Should skip null/undefined units');
console.log('✓ Case 3b (units array contains null/undefined) passed');

// Case 4: Null / undefined trackData
const c4a = getNextUncompletedLessonHardened('ssw-kaigo', null, null);
assert.strictEqual(c4a.lessonId, 'ssw-kaigo-l1');
const c4b = getNextUncompletedLessonHardened(undefined, undefined, undefined);
assert.strictEqual(c4b.lessonId, 'n5-l1');
console.log('✓ Case 4 (null / undefined trackData) passed');

// Case 5: Empty units array
const c5 = getNextUncompletedLessonHardened('n5', { units: [] }, {});
assert.strictEqual(c5.lessonId, 'n5-l1');
console.log('✓ Case 5 (empty units) passed');

// Case 6: Units with 0 lessons
const c6 = getNextUncompletedLessonHardened('n5', { units: [{ id: 'u1', lessons: [] }, { id: 'u2', lessons: [] }] }, {});
assert.strictEqual(c6, null);
console.log('✓ Case 6 (0 lessons across units) passed');

// Case 7: Normal track completion
const normalTrack = {
  units: [
    { id: 'u1', lessons: [{ id: 'l1' }, { id: 'l2' }] },
    { id: 'u2', lessons: [{ id: 'l3' }] },
  ],
};
const resProgress = getNextUncompletedLessonHardened('n5', normalTrack, { completedLessons: ['l1'] });
assert.strictEqual(resProgress.lessonId, 'l2');
assert.strictEqual(resProgress.completedLessonsCount, 1);
assert.strictEqual(resProgress.totalLessons, 3);
assert.strictEqual(resProgress.isAllCompleted, false);

const resAllDone = getNextUncompletedLessonHardened('n5', normalTrack, { completedLessons: ['l1', 'l2', 'l3'] });
assert.strictEqual(resAllDone.lessonId, 'l3');
assert.strictEqual(resAllDone.completedLessonsCount, 3);
assert.strictEqual(resAllDone.totalLessons, 3);
assert.strictEqual(resAllDone.isAllCompleted, true);
console.log('✓ Case 7 (normal progression and 100% completion) passed');

console.log('\n🎉 ALL EDGE CASE INVARIANTS TESTED & VERIFIED CLEAN!');
