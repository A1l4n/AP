import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, FAB, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export const FoldersScreen: React.FC = () => {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Meeting Folders
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Organize your recordings into folders and projects for better management.
        </Text>

        <View style={styles.placeholder}>
          <Text variant="bodyLarge" style={{ color: theme.colors.textSecondary }}>
            Folder system will be implemented in Phase 6
          </Text>
        </View>
      </View>

      {/* Quick record FAB */}
      <FAB
        icon="microphone"
        style={[styles.fab, { backgroundColor: theme.colors.error }]}
        size="large"
        onPress={() => {/* Navigate to recording */}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
    lineHeight: 20,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});