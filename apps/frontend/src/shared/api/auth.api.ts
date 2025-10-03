import { apiClient } from './client';

export interface SignUpData {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  role: string;
  locale: string;
  theme: string;
}

export interface AuthResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export const authApi = {
  signUp: async (data: SignUpData): Promise<AuthResponse> => {
    const response = await apiClient.post('/api/auth/sign-up', data);
    return response.data.data;
  },

  signIn: async (data: SignInData): Promise<AuthResponse> => {
    const response = await apiClient.post('/api/auth/sign-in', data);
    return response.data.data;
  },

  signOut: async (): Promise<void> => {
    await apiClient.post('/api/auth/sign-out');
  },

  getMe: async (): Promise<User> => {
    const response = await apiClient.get('/api/auth/me');
    return response.data.data;
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post('/api/auth/refresh', { refreshToken });
    return response.data.data;
  },
};
