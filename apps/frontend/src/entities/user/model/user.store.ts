import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
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

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: user =>
        set({
          user,
          isAuthenticated: !!user,
        }),
      setLoading: loading => set({ isLoading: loading }),
      clearUser: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'user-storage',
      partialize: state => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
