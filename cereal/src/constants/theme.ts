import { DefaultTheme, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

// Color Palette as specified in requirements
export const Colors = {
  // Primary colors
  primary: '#6366F1', // Indigo
  secondary: '#8B5CF6', // Purple
  accent: '#EC4899', // Pink

  // Status colors
  success: '#10B981', // Green
  warning: '#F59E0B', // Amber
  error: '#EF4444', // Red

  // Background colors
  background: '#FFFFFF', // Light mode
  surface: '#F9FAFB', // Light mode
  backgroundDark: '#1F2937', // Dark mode
  surfaceDark: '#111827', // Dark mode

  // Text colors
  text: '#111827', // Light mode
  textSecondary: '#6B7280', // Light mode
  textDark: '#F9FAFB', // Dark mode
  textSecondaryDark: '#D1D5DB', // Dark mode

  // Border colors
  border: '#E5E7EB', // Light mode
  borderDark: '#374151', // Dark mode

  // Audio visualization colors
  audioLevel: '#6366F1',
  audioLevelSecondary: '#8B5CF6',
};

export const Typography = {
  // Font families
  primary: 'Inter-Bold', // For headings
  secondary: 'Inter-Regular', // For body text
  mono: 'JetBrains Mono', // For timestamps

  // Font sizes
  h1: 32,
  h2: 24,
  h3: 18,
  h4: 16,
  body: 14,
  caption: 12,
  small: 10,

  // Line heights
  lineHeightH1: 40,
  lineHeightH2: 32,
  lineHeightH3: 24,
  lineHeightH4: 20,
  lineHeightBody: 20,
  lineHeightCaption: 16,
  lineHeightSmall: 12,
};

export const Spacing = {
  // 4px base unit system
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
  xxxxl: 64,
};

export const BorderRadius = {
  small: 8, // Cards
  medium: 16, // Modals
  large: 24, // Buttons
};

export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

// Combined light theme
export const LightTheme = {
  ...DefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    ...Colors,
    // Override with our custom colors
    primary: Colors.primary,
    background: Colors.background,
    surface: Colors.surface,
    text: Colors.text,
    border: Colors.border,
  },
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadows: Shadows,
};

// Combined dark theme
export const DarkTheme = {
  ...DefaultTheme,
  ...NavigationDarkTheme,
  colors: {
    ...DefaultTheme.colors,
    ...NavigationDarkTheme.colors,
    ...Colors,
    // Override with dark mode colors
    primary: Colors.primary,
    background: Colors.backgroundDark,
    surface: Colors.surfaceDark,
    text: Colors.textDark,
    textSecondary: Colors.textSecondaryDark,
    border: Colors.borderDark,
  },
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadows: Shadows,
};

export type AppTheme = typeof LightTheme;