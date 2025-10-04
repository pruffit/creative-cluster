import { apiClient } from './client';

export interface YogaInstructor {
  id: string;
  name: string;
  bio: string;
  avatar?: string;
  experience: number;
  certifications: string[];
  specializations: Array<{ style: string }>;
  instagram?: string;
  telegram?: string;
  vk?: string;
}

export interface YogaClass {
  id: string;
  title: string;
  description: string;
  style: string;
  instructor: YogaInstructor;
  dayOfWeek: string;
  startTime: string;
  duration: number;
  level: string;
  maxParticipants: number;
  currentParticipants: number;
  price: number;
  image?: string;
  isActive: boolean;
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
  isPopular: boolean;
  isActive: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  author: YogaInstructor;
  category: string;
  tags: string[];
  readingTime: number;
  isPublished: boolean;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const yogaApi = {
  getClasses: async (): Promise<YogaClass[]> => {
    const response = await apiClient.get('/api/yoga/classes');
    return response.data.data;
  },

  getSubscriptions: async (): Promise<Subscription[]> => {
    const response = await apiClient.get('/api/yoga/subscriptions');
    return response.data.data;
  },

  getInstructors: async (): Promise<YogaInstructor[]> => {
    const response = await apiClient.get('/api/yoga/instructors');
    return response.data.data;
  },

  getBlogPosts: async (): Promise<BlogPost[]> => {
    const response = await apiClient.get('/api/yoga/blog');
    return response.data.data;
  },

  getPostBySlug: async (slug: string): Promise<BlogPost> => {
    const response = await apiClient.get(`/api/yoga/blog/${slug}`);
    return response.data.data;
  },
};