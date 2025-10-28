import React, { useEffect } from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { Text, useTheme, Button, ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Spacing } from '../constants';
import { useCalendar } from '../hooks/useCalendar';
import { useMeetingDetection } from '../hooks/useMeetingDetection';
import { CalendarView } from '../components/calendar';

const CalendarScreen: React.FC = () => {
  const theme = useTheme();
  const {
    events,
    isLoading,
    error,
    hasPermission,
    nextMeeting,
    refreshEvents,
    requestPermission,
  } = useCalendar();

  const { isMonitoring, currentMeeting } = useMeetingDetection();

  // Show permission request if needed
  if (!hasPermission && !isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
          <Text variant="headlineMedium" style={styles.headerTitle}>
            Calendar
          </Text>
        </View>
        
        <View style={styles.permissionContainer}>
          <Icon name="calendar-lock" size={64} color={theme.colors.primary} />
          <Text variant="titleMedium" style={styles.permissionTitle}>
            Calendar Access Required
          </Text>
          <Text variant="bodyMedium" style={styles.permissionText}>
            Allow Cereal to access your calendar to automatically detect and record meetings.
          </Text>
          <Button
            mode="contained"
            onPress={requestPermission}
            style={styles.permissionButton}
          >
            Grant Access
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <Text variant="headlineMedium" style={styles.headerTitle}>
          Calendar
        </Text>
        
        {/* Current Meeting Indicator */}
        {currentMeeting && (
          <View style={[styles.currentMeetingBanner, { backgroundColor: theme.colors.errorContainer }]}>
            <Icon name="record-circle" size={16} color={theme.colors.error} />
            <Text variant="bodySmall" style={{ color: theme.colors.error, marginLeft: 4 }}>
              Meeting in progress: {currentMeeting.title}
            </Text>
          </View>
        )}

        {/* Next Meeting Preview */}
        {nextMeeting && !currentMeeting && (
          <View style={styles.nextMeetingPreview}>
            <Icon name="clock-alert-outline" size={16} color={theme.colors.primary} />
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, marginLeft: 4 }}>
              Next: {nextMeeting.title}
            </Text>
          </View>
        )}
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text variant="bodyMedium" style={{ marginTop: Spacing.md }}>
            Loading calendar events...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Icon name="alert-circle" size={48} color={theme.colors.error} />
          <Text variant="titleMedium" style={{ color: theme.colors.error, marginTop: Spacing.md }}>
            {error}
          </Text>
          <Button mode="outlined" onPress={refreshEvents} style={{ marginTop: Spacing.lg }}>
            Retry
          </Button>
        </View>
      ) : (
        <CalendarView
          events={events}
          onDateChange={(date) => {
            // Handle date change if needed
          }}
        />
      )}
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
  currentMeetingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    padding: Spacing.sm,
    borderRadius: 8,
  },
  nextMeetingPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxxl,
  },
  permissionTitle: {
    marginTop: Spacing.lg,
    fontWeight: 'bold',
  },
  permissionText: {
    marginTop: Spacing.md,
    textAlign: 'center',
    opacity: 0.7,
  },
  permissionButton: {
    marginTop: Spacing.xl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxxl,
  },
});

export default CalendarScreen;
