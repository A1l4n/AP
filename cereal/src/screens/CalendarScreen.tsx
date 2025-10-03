import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const CalendarScreen: React.FC = () => {
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

  const todayMeetings = [
    {
      id: '1',
      title: 'Team Standup',
      time: '10:00 AM - 10:30 AM',
      attendees: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      platform: 'teams',
      location: 'Microsoft Teams',
    },
    {
      id: '2',
      title: 'Project Review',
      time: '2:00 PM - 3:00 PM',
      attendees: ['Sarah Wilson'],
      platform: 'zoom',
      location: 'Zoom Meeting',
    },
    {
      id: '3',
      title: 'Client Call',
      time: '4:00 PM - 5:00 PM',
      attendees: ['Client Team'],
      platform: 'meet',
      location: 'Google Meet',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* View Mode Toggle */}
      <View style={styles.viewModeContainer}>
        <View style={styles.viewModeToggle}>
          {(['month', 'week', 'day'] as const).map((mode) => (
            <TouchableOpacity
              key={mode}
              style={[
                styles.viewModeButton,
                viewMode === mode && styles.viewModeButtonActive,
              ]}
              onPress={() => setViewMode(mode)}
            >
              <Text
                style={[
                  styles.viewModeText,
                  viewMode === mode && styles.viewModeTextActive,
                ]}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Calendar Placeholder */}
      <View style={styles.calendarContainer}>
        <Card style={styles.calendarCard}>
          <Text style={styles.calendarPlaceholder}>
            Calendar View Coming Soon
          </Text>
          <Text style={styles.calendarSubtext}>
            Integration with Google Calendar and Outlook will be available in the next update.
          </Text>
        </Card>
      </View>

      {/* Today's Meetings */}
      <View style={styles.meetingsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Meetings</Text>
          <TouchableOpacity>
            <Ionicons name="add-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {todayMeetings.map((meeting) => (
            <Card key={meeting.id} style={styles.meetingCard}>
              <View style={styles.meetingHeader}>
                <View style={styles.meetingInfo}>
                  <Text style={styles.meetingTitle}>{meeting.title}</Text>
                  <Text style={styles.meetingTime}>{meeting.time}</Text>
                  <Text style={styles.meetingLocation}>{meeting.location}</Text>
                </View>
                <View style={styles.meetingActions}>
                  <View style={styles.platformBadge}>
                    <Text style={styles.platformText}>{meeting.platform}</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.meetingAttendees}>
                <Ionicons name="people-outline" size={16} color={colors.textSecondary} />
                <Text style={styles.attendeesText}>
                  {meeting.attendees.join(', ')}
                </Text>
              </View>

              <View style={styles.meetingButtons}>
                <Button
                  title="Start Recording"
                  size="small"
                  variant="primary"
                  icon={<Ionicons name="mic" size={16} color={colors.background} />}
                  style={styles.actionButton}
                  onPress={() => {
                    // TODO: Navigate to recording screen
                  }}
                />
                <Button
                  title="Join Meeting"
                  size="small"
                  variant="outline"
                  icon={<Ionicons name="videocam-outline" size={16} color={colors.primary} />}
                  style={styles.actionButton}
                  onPress={() => {
                    // TODO: Open meeting link
                  }}
                />
              </View>
            </Card>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // View Mode Toggle
  viewModeContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  viewModeToggle: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: 4,
  },
  viewModeButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.sm,
  },
  viewModeButtonActive: {
    backgroundColor: colors.primary,
  },
  viewModeText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.textSecondary,
  },
  viewModeTextActive: {
    color: colors.background,
  },
  
  // Calendar
  calendarContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  calendarCard: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
  },
  calendarPlaceholder: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  calendarSubtext: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.sm,
  },
  
  // Meetings Section
  meetingsSection: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text,
  },
  
  // Meeting Cards
  meetingCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  meetingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  meetingInfo: {
    flex: 1,
  },
  meetingTitle: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  meetingTime: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  meetingLocation: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  meetingActions: {
    alignItems: 'flex-end',
  },
  platformBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  platformText: {
    fontSize: typography.fontSize.xs,
    color: colors.background,
    fontFamily: typography.fontFamily.medium,
    textTransform: 'uppercase',
  },
  
  meetingAttendees: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  attendeesText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  
  meetingButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
});