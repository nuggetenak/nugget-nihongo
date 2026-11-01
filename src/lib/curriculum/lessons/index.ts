import type { CurriculumLesson } from '../../../types/curriculum';
import { n5CuratedLessons } from './n5/index.ts';
import { n4CuratedLessons } from './n4/index.ts';
import { n3CuratedLessons } from './n3/index.ts';
import { n2CuratedLessons } from './n2/index.ts';
import { n1CuratedLessons } from './n1/index.ts';
import { sswKaigoLessons } from './ssw/kaigo.ts';

export const ALL_CURATED_LESSONS: Record<string, Partial<CurriculumLesson>> = {
  ...n5CuratedLessons,
  ...n4CuratedLessons,
  ...n3CuratedLessons,
  ...n2CuratedLessons,
  ...n1CuratedLessons,
  ...sswKaigoLessons,
};

export { n5CuratedLessons } from './n5/index.ts';
export { n4CuratedLessons } from './n4/index.ts';
export { n3CuratedLessons } from './n3/index.ts';
export { n2CuratedLessons } from './n2/index.ts';
export { n1CuratedLessons } from './n1/index.ts';
export { sswKaigoLessons } from './ssw/kaigo.ts';
