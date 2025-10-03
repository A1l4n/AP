import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, useColorScheme } from 'react-native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { LightTheme, DarkTheme } from './src/constants/theme';
import { useSettingsStore } from './src/store';
import { storageService } from './src/services/storageService';

export default function App() {
  const systemColorScheme = useColorScheme();
  const { theme: themePreference, loadSettings } = useSettingsStore();
  const [isReady, setIsReady] = useState(false);

  // Determine the actual theme based on user preference
  const theme =
    themePreference === 'auto'
      ? systemColorScheme === 'dark'
        ? DarkTheme
        : LightTheme
      : themePreference === 'dark'
      ? DarkTheme
      : LightTheme;

  useEffect(() => {
    const initialize = async () => {
      try {
        // Load user settings
        await loadSettings();
        
        // Initialize storage
        await storageService.initialize();
        
        setIsReady(true);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setIsReady(true); // Continue anyway
      }
    };

    initialize();
  }, []);

  if (!isReady) {
    // TODO: Add a proper splash screen
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <PaperProvider theme={theme}>
        <StatusBar style={theme.dark ? 'light' : 'dark'} />
        <AppNavigator />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
