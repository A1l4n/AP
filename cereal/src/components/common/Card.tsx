import React from 'react';
import { View, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  elevation?: 'small' | 'medium' | 'large' | 'none';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  style,
  contentStyle,
  elevation = 'small',
  padding = 'medium',
}) => {
  const theme = useTheme();

  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.small,
      margin: theme.spacing.xs,
    };

    // Add padding based on padding prop
    switch (padding) {
      case 'none':
        break;
      case 'small':
        baseStyle.padding = theme.spacing.sm;
        break;
      case 'medium':
        baseStyle.padding = theme.spacing.lg;
        break;
      case 'large':
        baseStyle.padding = theme.spacing.xl;
        break;
    }

    // Add shadow based on elevation prop
    if (elevation !== 'none') {
      const shadowStyles = theme.shadows[elevation === 'large' ? 'large' : elevation === 'medium' ? 'medium' : 'small'];
      Object.assign(baseStyle, shadowStyles);
    }

    return baseStyle;
  };

  const getContentStyle = (): ViewStyle => {
    return {
      flex: 1,
      ...contentStyle,
    };
  };

  if (onPress) {
    return (
      <TouchableOpacity
        style={[getCardStyle(), style]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={getContentStyle()}>
          {children}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[getCardStyle(), style]}>
      <View style={getContentStyle()}>
        {children}
      </View>
    </View>
  );
};

// Sub-components for common card layouts
export const CardHeader: React.FC<{
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  style?: ViewStyle;
}> = ({ title, subtitle, right, style }) => {
  const theme = useTheme();

  return (
    <View style={[{ marginBottom: theme.spacing.md }, style]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1 }}>
          <Text variant="titleMedium" style={{ fontWeight: '600', color: theme.colors.text }}>
            {title}
          </Text>
          {subtitle && (
            <Text variant="bodySmall" style={{ color: theme.colors.textSecondary, marginTop: 2 }}>
              {subtitle}
            </Text>
          )}
        </View>
        {right && <View style={{ marginLeft: theme.spacing.md }}>{right}</View>}
      </View>
    </View>
  );
};

export const CardContent: React.FC<{
  children: React.ReactNode;
  style?: ViewStyle;
}> = ({ children, style }) => {
  const theme = useTheme();

  return (
    <View style={[{ marginTop: theme.spacing.sm }, style]}>
      {children}
    </View>
  );
};

export const CardActions: React.FC<{
  children: React.ReactNode;
  style?: ViewStyle;
}> = ({ children, style }) => {
  const theme = useTheme();

  return (
    <View style={[
      {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: theme.spacing.lg,
        paddingTop: theme.spacing.md,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
      },
      style
    ]}>
      {children}
    </View>
  );
};