import React from 'react';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { BorderRadius, Spacing } from '../../constants';

interface ButtonProps {
  mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
  onPress: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  compact?: boolean;
  uppercase?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  mode = 'contained',
  onPress,
  children,
  disabled = false,
  loading = false,
  icon,
  style,
  labelStyle,
  compact = false,
  uppercase = false,
}) => {
  return (
    <PaperButton
      mode={mode}
      onPress={onPress}
      disabled={disabled}
      loading={loading}
      icon={icon}
      style={[styles.button, style]}
      labelStyle={labelStyle}
      compact={compact}
      uppercase={uppercase}
      contentStyle={styles.content}
    >
      {children}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.xl,
  },
  content: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
});
