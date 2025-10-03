import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Spacing } from '../constants';

const CalendarScreen: React.FC = () => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <Text variant="headlineMedium" style={styles.headerTitle}>
          Calendar
        </Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.placeholder}>
          <Icon name="calendar" size={64} color={theme.colors.onSurfaceVariant} />
          <Text variant="titleMedium" style={[styles.placeholderText, { color: theme.colors.onSurfaceVariant }]}>
            Calendar integration coming soon
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            Connect your calendar to see upcoming meetings
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Spacing.xxxl,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    elevation: 2,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxxl,
    marginTop: Spacing.xxxxl,
  },
  placeholderText: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
    fontWeight: 'bold',
  },
});

export default CalendarScreen;
