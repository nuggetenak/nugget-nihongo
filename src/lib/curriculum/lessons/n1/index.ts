import type { CurriculumLesson } from '../../../../types/curriculum';
import { unit01Lessons } from './unit01.ts';
import { unit02Lessons } from './unit02.ts';
import { unit03Lessons } from './unit03.ts';
import { unit04Lessons } from './unit04.ts';
import { unit05Lessons } from './unit05.ts';
import { unit06Lessons } from './unit06.ts';
import { unit07Lessons } from './unit07.ts';
import { unit08Lessons } from './unit08.ts';
import { unit09Lessons } from './unit09.ts';
import { unit10Lessons } from './unit10.ts';
import { unit11Lessons } from './unit11.ts';
import { unit12Lessons } from './unit12.ts';
import { unit13Lessons } from './unit13.ts';
import { unit14Lessons } from './unit14.ts';
import { unit15Lessons } from './unit15.ts';
import { unit16Lessons } from './unit16.ts';
import { unit17Lessons } from './unit17.ts';
import { unit18Lessons } from './unit18.ts';
import { unit19Lessons } from './unit19.ts';
import { unit20Lessons } from './unit20.ts';

export const n1CuratedLessons: Record<string, Partial<CurriculumLesson>> = {
  ...unit01Lessons,
  ...unit02Lessons,
  ...unit03Lessons,
  ...unit04Lessons,
  ...unit05Lessons,
  ...unit06Lessons,
  ...unit07Lessons,
  ...unit08Lessons,
  ...unit09Lessons,
  ...unit10Lessons,
  ...unit11Lessons,
  ...unit12Lessons,
  ...unit13Lessons,
  ...unit14Lessons,
  ...unit15Lessons,
  ...unit16Lessons,
  ...unit17Lessons,
  ...unit18Lessons,
  ...unit19Lessons,
  ...unit20Lessons,
};
