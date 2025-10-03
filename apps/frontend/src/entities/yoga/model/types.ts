export type YogaStyle = 'hatha' | 'vinyasa' | 'yin' | 'nidra' | 'kundalini';

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'all';

export interface YogaClass {
  id: string;
  title: string;
  description: string;
  style: YogaStyle;
  instructor: YogaInstructor;
  dayOfWeek: DayOfWeek;
  startTime: string;
  duration: number;
  level: DifficultyLevel;
  maxParticipants: number;
  currentParticipants: number;
  price: number;
  image?: string;
}

export interface YogaInstructor {
  id: string;
  name: string;
  avatar?: string;
  bio: string;
  specialization: YogaStyle[];
  experience: number;
  certifications: string[];
  socialLinks?: {
    instagram?: string;
    telegram?: string;
    vk?: string;
  };
}

export interface Subscription {
  id: string;
  name: string;
  description: string;
  classesCount: number;
  validityDays: number;
  price: number;
  discount?: number;
  features: string[];
  popular?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  author: YogaInstructor;
  category: 'practice' | 'philosophy' | 'health' | 'lifestyle';
  tags: string[];
  publishedAt: string;
  readingTime: number;
}