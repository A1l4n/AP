import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme, SegmentedButtons } from 'react-native-paper';
import { CalendarViewMode, CalendarEvent } from '../../types';
import { MeetingPreview } from './MeetingPreview';
import { Spacing } from '../../constants';

interface CalendarViewProps {
  events: CalendarEvent[];
  onDateChange?: (date: Date) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  onDateChange,
}) => {
  const theme = useTheme();
  const [viewMode, setViewMode] = useState<CalendarViewMode>('agenda');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleViewModeChange = (value: string) => {
    setViewMode(value as CalendarViewMode);
  };

  const getTodayEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return events.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate >= today && eventDate < tomorrow;
    });
  };

  const getUpcomingEvents = () => {
    const now = new Date();
    return events
      .filter(event => event.startDate >= now)
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  };

  const todayEvents = getTodayEvents();
  const upcomingEvents = getUpcomingEvents();

  return (
    <View style={styles.container}>
      {/* View Mode Selector */}
      <View style={styles.viewModeContainer}>
        <SegmentedButtons
          value={viewMode}
          onValueChange={handleViewModeChange}
          buttons={[
            { value: 'day', label: 'Day' },
            { value: 'week', label: 'Week' },
            { value: 'agenda', label: 'Agenda' },
          ]}
        />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Today's Meetings */}
        {todayEvents.length > 0 && (
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Today
            </Text>
            {todayEvents.map(event => (
              <MeetingPreview key={event.id} event={event} />
            ))}
          </View>
        )}

        {/* Upcoming Meetings */}
        {upcomingEvents.length > 0 && (
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Upcoming
            </Text>
            {upcomingEvents.slice(0, 10).map(event => (
              <MeetingPreview key={event.id} event={event} />
            ))}
          </View>
        )}

        {/* Empty State */}
        {events.length === 0 && (
          <View style={styles.emptyState}>
            <Text
              variant="bodyLarge"
              style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center' }}
            >
              No upcoming meetings found
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewModeContainer: {
    padding: Spacing.lg,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: Spacing.md,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxxl,
    marginTop: Spacing.xxxxl,
  },
});
