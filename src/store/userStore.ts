import { create } from 'zustand';
import { CalendarSettings } from '../types/calendar';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: UserPreferences;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  autoRecord: boolean;
  autoTranscribe: boolean;
  autoSummarize: boolean;
  audioQuality: 'low' | 'medium' | 'high';
  language: string;
  calendarSettings: CalendarSettings;
}

interface UserStore {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  
  // Utility actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

const defaultPreferences: UserPreferences = {
  theme: 'light',
  notifications: true,
  autoRecord: false,
  autoTranscribe: true,
  autoSummarize: true,
  audioQuality: 'high',
  language: 'en',
  calendarSettings: {
    enabledCalendars: [],
    autoRecord: false,
    recordBeforeStart: 5,
    recordAfterEnd: 5,
  },
};

export const useUserStore = create<UserStore>((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Authentication actions
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    
    try {
      // TODO: Implement actual authentication
      // For now, simulate login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        preferences: defaultPreferences,
      };
      
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false,
      });
    }
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    });
  },

  updateProfile: (updates) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    }));
  },

  updatePreferences: (updates) => {
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            preferences: { ...state.user.preferences, ...updates },
          }
        : null,
    }));
  },

  // Utility actions
  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  setError: (error) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },
}));