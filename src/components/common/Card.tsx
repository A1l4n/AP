import React from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: 'none' | 'small' | 'medium' | 'large';
  elevation?: number;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = 'medium',
  elevation = 2,
  onPress,
}) => {
  const theme = useTheme();

  const getPaddingStyle = (): ViewStyle => {
    switch (padding) {
      case 'none':
        return {};
      case 'small':
        return { padding: theme.spacing.sm };
      case 'large':
        return { padding: theme.spacing.xl };
      default: // medium
        return { padding: theme.spacing.lg };
    }
  };

  const cardStyle: ViewStyle = {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: elevation,
    },
    shadowOpacity: 0.1,
    shadowRadius: elevation * 2,
    elevation: elevation,
    ...getPaddingStyle(),
  };

  if (onPress) {
    return (
      <TouchableOpacity style={[cardStyle, style]} onPress={onPress} activeOpacity={0.8}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[cardStyle, style]}>
      {children}
    </View>
  );
};