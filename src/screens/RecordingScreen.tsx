import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Spacing } from '../constants';

const RecordingScreen: React.FC = () => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.placeholder}>
        <Icon name="microphone" size={64} color={theme.colors.primary} />
        <Text variant="titleLarge" style={[styles.placeholderText, { color: theme.colors.onSurface }]}>
          Recording Screen
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
          Recording functionality will be implemented in Phase 2
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxxl,
  },
  placeholderText: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
    fontWeight: 'bold',
  },
});

export default RecordingScreen;
