import { DefaultTheme } from 'react-native-paper';

export const colors = {
  primary: '#6366F1',
  secondary: '#8B5CF6',
  accent: '#EC4899',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  background: '#FFFFFF',
  surface: '#F9FAFB',
  text: '#1F2937',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  // Dark mode colors
  backgroundDark: '#1F2937',
  surfaceDark: '#111827',
  textDark: '#F9FAFB',
  textSecondaryDark: '#9CA3AF',
  borderDark: '#374151',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
  xxxxl: 64,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal' as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: 'normal' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: 'normal' as const,
    lineHeight: 16,
  },
  mono: {
    fontSize: 14,
    fontWeight: 'normal' as const,
    fontFamily: 'monospace',
    lineHeight: 20,
  },
};

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
    background: colors.background,
    surface: colors.surface,
    text: colors.text,
    placeholder: colors.textSecondary,
    disabled: colors.textSecondary,
    error: colors.error,
  },
  spacing,
  borderRadius,
  typography,
};

export const darkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
    background: colors.backgroundDark,
    surface: colors.surfaceDark,
    text: colors.textDark,
    placeholder: colors.textSecondaryDark,
    disabled: colors.textSecondaryDark,
    error: colors.error,
  },
  spacing,
  borderRadius,
  typography,
};

export type Theme = typeof lightTheme;