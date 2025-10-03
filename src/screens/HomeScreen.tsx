import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';

export const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const onRefresh = () => {
    setRefreshing(true);
    // TODO: Refresh data
    setTimeout(() => setRefreshing(false), 1000);
  };

  const startRecording = () => {
    navigation.navigate('Recording' as never);
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
      hasTranscript: true,
      hasSummary: true,
    },
    {
      id: '2',
      title: 'Client Call - Q4 Planning',
      date: 'Yesterday, 3:15 PM',
      duration: '1h 20min',
      hasTranscript: true,
      hasSummary: false,
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search meetings..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Icon name="search" size={20} color={theme.colors.textSecondary} />}
        />
      </View>

      {/* Upcoming Meetings */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Upcoming Meetings
          </Text>
          <TouchableOpacity>
            <Text style={[styles.seeAll, { color: theme.colors.primary }]}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {upcomingMeetings.map((meeting) => (
            <Card key={meeting.id} style={styles.meetingCard}>
              <View style={styles.meetingHeader}>
                <Text style={[styles.meetingTitle, { color: theme.colors.text }]}>
                  {meeting.title}
                </Text>
                <Text style={[styles.meetingTime, { color: theme.colors.textSecondary }]}>
                  {meeting.time}
                </Text>
              </View>
              <View style={styles.meetingDetails}>
                <Text style={[styles.meetingAttendees, { color: theme.colors.textSecondary }]}>
                  {meeting.attendees.join(', ')}
                </Text>
                <View style={styles.platformBadge}>
                  <Text style={styles.platformText}>{meeting.platform}</Text>
                </View>
              </View>
              <Button
                title="Record"
                onPress={() => {/* TODO: Start recording for this meeting */}}
                size="small"
                style={styles.recordButton}
              />
            </Card>
          ))}
        </ScrollView>
      </View>

      {/* Recent Recordings */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Recent Recordings
          </Text>
          <TouchableOpacity>
            <Text style={[styles.seeAll, { color: theme.colors.primary }]}>
              See All
            </Text>
          </TouchableOpacity>
        </View>

        {recentRecordings.map((recording) => (
          <Card key={recording.id} style={styles.recordingCard}>
            <View style={styles.recordingHeader}>
              <Text style={[styles.recordingTitle, { color: theme.colors.text }]}>
                {recording.title}
              </Text>
              <Text style={[styles.recordingDate, { color: theme.colors.textSecondary }]}>
                {recording.date}
              </Text>
            </View>
            <View style={styles.recordingDetails}>
              <Text style={[styles.recordingDuration, { color: theme.colors.textSecondary }]}>
                {recording.duration}
              </Text>
              <View style={styles.statusIcons}>
                {recording.hasTranscript && (
                  <Icon name="text-fields" size={16} color={theme.colors.success} />
                )}
                {recording.hasSummary && (
                  <Icon name="summarize" size={16} color={theme.colors.success} />
                )}
              </View>
            </View>
          </Card>
        ))}
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={startRecording}>
        <Icon name="mic" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '500',
  },
  meetingCard: {
    width: 280,
    marginLeft: 16,
    marginRight: 8,
  },
  meetingHeader: {
    marginBottom: 8,
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  meetingTime: {
    fontSize: 14,
  },
  meetingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  meetingAttendees: {
    fontSize: 12,
    flex: 1,
  },
  platformBadge: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  platformText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#374151',
  },
  recordButton: {
    marginTop: 8,
  },
  recordingCard: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  recordingHeader: {
    marginBottom: 8,
  },
  recordingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  recordingDate: {
    fontSize: 14,
  },
  recordingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordingDuration: {
    fontSize: 12,
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});