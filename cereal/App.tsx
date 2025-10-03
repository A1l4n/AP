import * as React from 'react';
import { Provider as PaperProvider, MD3LightTheme as DefaultTheme, adaptNavigationTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { useFonts, Inter_700Bold, Inter_400Regular } from '@expo-google-fonts/inter';
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono';
import { Colors } from './src/constants/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_400Regular,
    JetBrainsMono_400Regular,
  });

  if (!fontsLoaded) return null;

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.primary,
      secondary: Colors.secondary,
      error: Colors.error,
      surface: Colors.surfaceLight,
      background: Colors.backgroundLight,
    },
    fonts: {
      bodyLarge: { fontFamily: 'Inter_400Regular' },
      titleLarge: { fontFamily: 'Inter_700Bold' },
    },
  } as const;

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme as any}>
        <AppNavigator />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
