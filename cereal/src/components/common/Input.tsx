import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../constants/theme';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  variant = 'default',
  size = 'medium',
  containerStyle,
  inputStyle,
  labelStyle,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const containerStyles = [
    styles.container,
    containerStyle,
  ];

  const inputContainerStyles = [
    styles.inputContainer,
    styles[variant],
    styles[size],
    isFocused && styles.focused,
    error && styles.error,
  ];

  const inputStyles = [
    styles.input,
    styles[`${size}Input`],
    inputStyle,
  ];

  const labelStyles = [
    styles.label,
    labelStyle,
  ];

  const helperTextStyles = [
    styles.helperText,
    error && styles.errorText,
  ];

  return (
    <View style={containerStyles}>
      {label && <Text style={labelStyles}>{label}</Text>}
      
      <View style={inputContainerStyles}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        
        <TextInput
          style={inputStyles}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={colors.textSecondary}
          {...textInputProps}
        />
        
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      
      {(error || helperText) && (
        <Text style={helperTextStyles}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  
  label: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  
  // Variants
  default: {
    backgroundColor: colors.background,
  },
  filled: {
    backgroundColor: colors.surface,
  },
  outlined: {
    backgroundColor: 'transparent',
  },
  
  // Sizes
  small: {
    minHeight: 36,
    paddingHorizontal: spacing.sm,
  },
  medium: {
    minHeight: 44,
    paddingHorizontal: spacing.md,
  },
  large: {
    minHeight: 52,
    paddingHorizontal: spacing.lg,
  },
  
  // States
  focused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  error: {
    borderColor: colors.error,
  },
  
  input: {
    flex: 1,
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.regular,
    color: colors.text,
  },
  
  // Input sizes
  smallInput: {
    fontSize: typography.fontSize.sm,
  },
  mediumInput: {
    fontSize: typography.fontSize.md,
  },
  largeInput: {
    fontSize: typography.fontSize.lg,
  },
  
  leftIcon: {
    marginRight: spacing.sm,
  },
  
  rightIcon: {
    marginLeft: spacing.sm,
  },
  
  helperText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.regular,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  
  errorText: {
    color: colors.error,
  },
});