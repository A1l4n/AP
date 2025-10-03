import React from 'react';
import { StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { Card as PaperCard, useTheme } from 'react-native-paper';
import { BorderRadius, Spacing, Shadows } from '../../constants';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  elevated?: boolean;
  mode?: 'elevated' | 'outlined' | 'contained';
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  style,
  elevated = true,
  mode = 'elevated',
}) => {
  const theme = useTheme();

  const CardContent = (
    <PaperCard
      style={[
        styles.card,
        elevated && Shadows.medium,
        { backgroundColor: theme.colors.surface },
        style,
      ]}
      mode={mode}
    >
      {children}
    </PaperCard>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {CardContent}
      </TouchableOpacity>
    );
  }

  return CardContent;
};

Card.Title = PaperCard.Title;
Card.Content = PaperCard.Content;
Card.Cover = PaperCard.Cover;
Card.Actions = PaperCard.Actions;

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.md,
    marginVertical: Spacing.sm,
  },
});
