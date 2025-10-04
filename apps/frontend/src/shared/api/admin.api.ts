import { apiClient } from './client';

export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  createdAt: string;
}

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

export interface YogaInstructorInput {
  name: string;
  bio: string;
  avatar?: string;
  experience: number;
  certifications: string[];
  specializations: string[];
  instagram?: string;
  telegram?: string;
  vk?: string;
}

export interface YogaClass {
  id: string;
  title: string;
  description: string;
  style: string;
  instructorId: string;
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
  authorId: string;
  author: YogaInstructor;
  category: string;
  tags: string[];
  readingTime: number;
  isPublished: boolean;
  publishedAt?: string;
}

export const adminApi = {
  getUsers: async (page = 1, limit = 20) => {
    const response = await apiClient.get(`/api/admin/users?page=${page}&limit=${limit}`);
    return response.data.data;
  },

  updateUserRole: async (userId: string, role: string) => {
    const response = await apiClient.patch(`/api/admin/users/${userId}/role`, { role });
    return response.data.data;
  },

  getInstructors: async () => {
    const response = await apiClient.get('/api/admin/instructors');
    return response.data.data;
  },

  createInstructor: async (data: YogaInstructorInput) => {
    const response = await apiClient.post('/api/admin/instructors', data);
    return response.data.data;
  },

  updateInstructor: async (id: string, data: Partial<YogaInstructorInput>) => {
    const response = await apiClient.patch(`/api/admin/instructors/${id}`, data);
    return response.data.data;
  },

  deleteInstructor: async (id: string) => {
    await apiClient.delete(`/api/admin/instructors/${id}`);
  },

  getClasses: async () => {
    const response = await apiClient.get('/api/admin/classes');
    return response.data.data;
  },

  createClass: async (data: Partial<YogaClass>) => {
    const response = await apiClient.post('/api/admin/classes', data);
    return response.data.data;
  },

  updateClass: async (id: string, data: Partial<YogaClass>) => {
    const response = await apiClient.patch(`/api/admin/classes/${id}`, data);
    return response.data.data;
  },

  deleteClass: async (id: string) => {
    await apiClient.delete(`/api/admin/classes/${id}`);
  },

  getSubscriptions: async () => {
    const response = await apiClient.get('/api/admin/subscriptions');
    return response.data.data;
  },

  createSubscription: async (data: Partial<Subscription>) => {
    const response = await apiClient.post('/api/admin/subscriptions', data);
    return response.data.data;
  },

  updateSubscription: async (id: string, data: Partial<Subscription>) => {
    const response = await apiClient.patch(`/api/admin/subscriptions/${id}`, data);
    return response.data.data;
  },

  deleteSubscription: async (id: string) => {
    await apiClient.delete(`/api/admin/subscriptions/${id}`);
  },

  getPosts: async () => {
    const response = await apiClient.get('/api/admin/posts');
    return response.data.data;
  },

  createPost: async (data: Partial<BlogPost>) => {
    const response = await apiClient.post('/api/admin/posts', data);
    return response.data.data;
  },

  updatePost: async (id: string, data: Partial<BlogPost>) => {
    const response = await apiClient.patch(`/api/admin/posts/${id}`, data);
    return response.data.data;
  },

  deletePost: async (id: string) => {
    await apiClient.delete(`/api/admin/posts/${id}`);
  },
};
