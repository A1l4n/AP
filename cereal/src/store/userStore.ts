import { create } from 'zustand';
import { CalendarPermission } from '../types/calendar';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface UserSettings {
  notifications: {
    enabled: boolean;
    transcriptionComplete: boolean;
    meetingReminders: boolean;
  };
  recording: {
    autoTranscription: boolean;
    backgroundRecording: boolean;
    audioQuality: 'high' | 'medium' | 'low';
  };
  appearance: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
  };
  storage: {
    autoCleanup: boolean;
    cleanupDays: number;
  };
}

interface UserState {
  user: User | null;
  settings: UserSettings;
  calendarPermission: CalendarPermission;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  setCalendarPermission: (permission: CalendarPermission) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

const defaultSettings: UserSettings = {
  notifications: {
    enabled: true,
    transcriptionComplete: true,
    meetingReminders: true,
  },
  recording: {
    autoTranscription: true,
    backgroundRecording: false,
    audioQuality: 'high',
  },
  appearance: {
    theme: 'auto',
    language: 'en',
  },
  storage: {
    autoCleanup: false,
    cleanupDays: 30,
  },
};

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  settings: defaultSettings,
  calendarPermission: {
    read: false,
    write: false,
    granted: false,
    denied: false,
    canAskAgain: true,
  },
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  setUser: (user) => set({ user }),
  
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
  
  setCalendarPermission: (permission) => set({ calendarPermission: permission }),
  
  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      settings: defaultSettings,
      calendarPermission: {
        read: false,
        write: false,
        granted: false,
        denied: false,
        canAskAgain: true,
      },
    }),
}));