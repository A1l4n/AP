import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsState {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  darkMode: false,
  setDarkMode: (value) => set({ darkMode: value }),
}));
