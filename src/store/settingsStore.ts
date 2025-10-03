import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppSettings {
  // Recording settings
  audioQuality: 'low' | 'medium' | 'high';
  autoRecord: boolean;
  recordBeforeStart: number; // minutes
  recordAfterEnd: number; // minutes
  
  // AI settings
  autoTranscribe: boolean;
  autoSummarize: boolean;
  speakerDetection: boolean;
  
  // Appearance settings
  theme: 'light' | 'dark' | 'auto';
  language: string;
  
  // Notification settings
  notifications: boolean;
  emailSummaries: boolean;
  
  // Privacy settings
  encryption: boolean;
  dataRetention: number; // days
  
  // Integration settings
  calendarSync: boolean;
  teamsIntegration: boolean;
  zoomIntegration: boolean;
}

interface SettingsStore {
  // State
  settings: AppSettings;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  updateSettings: (updates: Partial<AppSettings>) => void;
  resetSettings: () => void;
  
  // Utility actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

const defaultSettings: AppSettings = {
  audioQuality: 'high',
  autoRecord: false,
  recordBeforeStart: 5,
  recordAfterEnd: 5,
  autoTranscribe: true,
  autoSummarize: true,
  speakerDetection: true,
  theme: 'light',
  language: 'en',
  notifications: true,
  emailSummaries: false,
  encryption: false,
  dataRetention: 365,
  calendarSync: false,
  teamsIntegration: false,
  zoomIntegration: false,
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      // Initial state
      settings: defaultSettings,
      isLoading: false,
      error: null,

      // Settings actions
      updateSetting: (key, value) => {
        set((state) => ({
          settings: { ...state.settings, [key]: value },
        }));
      },

      updateSettings: (updates) => {
        set((state) => ({
          settings: { ...state.settings, ...updates },
        }));
      },

      resetSettings: () => {
        set({ settings: defaultSettings });
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
    }),
    {
      name: 'cereal-settings',
      partialize: (state) => ({ settings: state.settings }),
    }
  )
);