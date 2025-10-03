import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  style?: ViewStyle;
  inputStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  style,
  inputStyle,
  leftIcon,
  rightIcon,
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const containerStyle: ViewStyle = {
    marginBottom: theme.spacing.md,
    ...style,
  };

  const inputContainerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: error ? theme.colors.error : isFocused ? theme.colors.primary : theme.colors.border,
    borderRadius: theme.borderRadius.md,
    backgroundColor: disabled ? theme.colors.surface : theme.colors.background,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: multiline ? theme.spacing.md : theme.spacing.sm,
    minHeight: multiline ? 80 : 44,
  };

  const textInputStyle: TextStyle = {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text,
    ...inputStyle,
  };

  const labelStyle: TextStyle = {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  };

  const errorStyle: TextStyle = {
    fontSize: 12,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  };

  return (
    <View style={containerStyle}>
      {label && <Text style={labelStyle}>{label}</Text>}
      <View style={inputContainerStyle}>
        {leftIcon && <View style={{ marginRight: theme.spacing.sm }}>{leftIcon}</View>}
        <TextInput
          style={textInputStyle}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.placeholder}
          value={value}
          onChangeText={onChangeText}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {rightIcon && <View style={{ marginLeft: theme.spacing.sm }}>{rightIcon}</View>}
      </View>
      {error && <Text style={errorStyle}>{error}</Text>}
    </View>
  );
};