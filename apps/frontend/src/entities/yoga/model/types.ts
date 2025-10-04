export type YogaStyle = 'HATHA' | 'VINYASA' | 'YIN' | 'NIDRA' | 'KUNDALINI';

export type DayOfWeek =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

export type DifficultyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ALL';

export type { YogaClass, YogaInstructor, Subscription, BlogPost } from '@shared/api/yoga.api';