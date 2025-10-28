import { create } from 'zustand';
import { User } from '../types';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  updateUserSettings: (settings: Partial<User['settings']>) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  updateUserSettings: (settings) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            settings: {
              ...state.user.settings,
              ...settings,
            },
          }
        : null,
    })),

  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    }),
}));
