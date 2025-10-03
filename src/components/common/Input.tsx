import React from 'react';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { BorderRadius, Spacing } from '../../constants';

interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  multiline?: boolean;
  numberOfLines?: number;
  disabled?: boolean;
  error?: boolean;
  errorText?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  style?: ViewStyle;
  mode?: 'flat' | 'outlined';
  dense?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  autoCapitalize = 'sentences',
  autoCorrect = true,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  disabled = false,
  error = false,
  errorText,
  left,
  right,
  style,
  mode = 'outlined',
  dense = false,
}) => {
  const theme = useTheme();

  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      keyboardType={keyboardType}
      multiline={multiline}
      numberOfLines={numberOfLines}
      disabled={disabled}
      error={error}
      left={left}
      right={right}
      mode={mode}
      dense={dense}
      style={[styles.input, style]}
      theme={{
        ...theme,
        roundness: BorderRadius.md,
      }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: Spacing.sm,
  },
});
