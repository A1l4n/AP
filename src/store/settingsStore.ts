import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsState {
  theme: 'light' | 'dark' | 'auto';
  audioQuality: 'low' | 'medium' | 'high';
  autoStartRecording: boolean;
  notificationsEnabled: boolean;
  
  // Actions
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  setAudioQuality: (quality: 'low' | 'medium' | 'high') => void;
  setAutoStartRecording: (enabled: boolean) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  loadSettings: () => Promise<void>;
  saveSettings: () => Promise<void>;
}

const SETTINGS_KEY = '@cereal_settings';

export const useSettingsStore = create<SettingsState>((set, get) => ({
  theme: 'auto',
  audioQuality: 'high',
  autoStartRecording: false,
  notificationsEnabled: true,

  setTheme: (theme) => {
    set({ theme });
    get().saveSettings();
  },

  setAudioQuality: (audioQuality) => {
    set({ audioQuality });
    get().saveSettings();
  },

  setAutoStartRecording: (autoStartRecording) => {
    set({ autoStartRecording });
    get().saveSettings();
  },

  setNotificationsEnabled: (notificationsEnabled) => {
    set({ notificationsEnabled });
    get().saveSettings();
  },

  loadSettings: async () => {
    try {
      const settingsJson = await AsyncStorage.getItem(SETTINGS_KEY);
      if (settingsJson) {
        const settings = JSON.parse(settingsJson);
        set(settings);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  },

  saveSettings: async () => {
    try {
      const { theme, audioQuality, autoStartRecording, notificationsEnabled } = get();
      const settings = {
        theme,
        audioQuality,
        autoStartRecording,
        notificationsEnabled,
      };
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  },
}));
