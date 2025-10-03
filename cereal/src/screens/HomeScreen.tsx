import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const HomeScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // TODO: Implement refresh logic
    setTimeout(() => setRefreshing(false), 1000);
  };

  const upcomingMeetings = [
    {
      id: '1',
      title: 'Team Standup',
      time: '10:00 AM',
      attendees: ['John Doe', 'Jane Smith'],
      platform: 'teams',
    },
    {
      id: '2',
      title: 'Project Review',
      time: '2:00 PM',
      attendees: ['Mike Johnson'],
      platform: 'zoom',
    },
  ];

  const recentRecordings = [
    {
      id: '1',
      title: 'Weekly Planning Meeting',
      date: 'Today, 9:30 AM',
      duration: '45 min',
      status: 'completed',
    },
    {
      id: '2',
      title: 'Client Call',
      date: 'Yesterday, 3:15 PM',
      duration: '1h 20min',
      status: 'processing',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color={colors.textSecondary} />
            <Text style={styles.searchPlaceholder}>Search meetings...</Text>
            <Ionicons name="options-outline" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Upcoming Meetings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Meetings</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.horizontalScroll}>
              {upcomingMeetings.map((meeting) => (
                <Card key={meeting.id} style={styles.meetingCard}>
                  <View style={styles.meetingHeader}>
                    <Text style={styles.meetingTitle}>{meeting.title}</Text>
                    <View style={styles.platformBadge}>
                      <Text style={styles.platformText}>{meeting.platform}</Text>
                    </View>
                  </View>
                  <Text style={styles.meetingTime}>{meeting.time}</Text>
                  <Text style={styles.meetingAttendees}>
                    {meeting.attendees.join(', ')}
                  </Text>
                  <Button
                    title="Start Recording"
                    size="small"
                    style={styles.recordButton}
                    onPress={() => {
                      // TODO: Navigate to recording screen
                    }}
                  />
                </Card>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Recent Recordings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Recordings</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {recentRecordings.map((recording) => (
            <Card key={recording.id} style={styles.recordingCard}>
              <View style={styles.recordingHeader}>
                <View style={styles.recordingInfo}>
                  <Text style={styles.recordingTitle}>{recording.title}</Text>
                  <Text style={styles.recordingDate}>{recording.date}</Text>
                </View>
                <View style={styles.recordingMeta}>
                  <Text style={styles.recordingDuration}>{recording.duration}</Text>
                  <View style={[
                    styles.statusBadge,
                    recording.status === 'completed' ? styles.completedBadge : styles.processingBadge
                  ]}>
                    <Text style={styles.statusText}>
                      {recording.status === 'completed' ? 'Ready' : 'Processing'}
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <Button
              title="Record New Meeting"
              variant="primary"
              icon={<Ionicons name="mic" size={20} color={colors.background} />}
              style={styles.quickActionButton}
              onPress={() => {
                // TODO: Navigate to recording screen
              }}
            />
            <Button
              title="Import Audio"
              variant="outline"
              icon={<Ionicons name="cloud-upload-outline" size={20} color={colors.primary} />}
              style={styles.quickActionButton}
              onPress={() => {
                // TODO: Implement import functionality
              }}
            />
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          // TODO: Navigate to recording screen
        }}
      >
        <Ionicons name="mic" size={24} color={colors.background} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  
  // Search
  searchContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchPlaceholder: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  
  // Sections
  section: {
    marginBottom: spacing.xl,
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
  seeAllText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontFamily: typography.fontFamily.medium,
  },
  
  // Upcoming Meetings
  horizontalScroll: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
  },
  meetingCard: {
    width: 280,
    marginRight: spacing.md,
  },
  meetingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  meetingTitle: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text,
    flex: 1,
  },
  platformBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginLeft: spacing.sm,
  },
  platformText: {
    fontSize: typography.fontSize.xs,
    color: colors.background,
    fontFamily: typography.fontFamily.medium,
    textTransform: 'uppercase',
  },
  meetingTime: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  meetingAttendees: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  recordButton: {
    marginTop: 'auto',
  },
  
  // Recent Recordings
  recordingCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  recordingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  recordingInfo: {
    flex: 1,
  },
  recordingTitle: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  recordingDate: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  recordingMeta: {
    alignItems: 'flex-end',
  },
  recordingDuration: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  completedBadge: {
    backgroundColor: colors.success,
  },
  processingBadge: {
    backgroundColor: colors.warning,
  },
  statusText: {
    fontSize: typography.fontSize.xs,
    color: colors.background,
    fontFamily: typography.fontFamily.medium,
  },
  
  // Quick Actions
  quickActions: {
    paddingHorizontal: spacing.lg,
  },
  quickActionButton: {
    marginBottom: spacing.md,
  },
  
  // FAB
  fab: {
    position: 'absolute',
    bottom: 80,
    right: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});