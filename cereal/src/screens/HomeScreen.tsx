import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Text, Searchbar, FAB, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card, CardHeader, CardContent } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TabParamList } from '../navigation/TabNavigator';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface Meeting {
  id: string;
  title: string;
  date: Date;
  duration: number; // minutes
  attendees: string[];
  isRecorded: boolean;
  platform?: 'teams' | 'zoom' | 'meet' | 'phone';
}

interface UpcomingMeeting extends Meeting {
  startTime: Date;
  endTime: Date;
}

export const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [upcomingMeetings, setUpcomingMeetings] = useState<UpcomingMeeting[]>([]);
  const [recentRecordings, setRecentRecordings] = useState<Meeting[]>([]);

  // Mock data for demonstration
  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = () => {
    const now = new Date();

    // Mock upcoming meetings
    const mockUpcoming: UpcomingMeeting[] = [
      {
        id: '1',
        title: 'Product Review Meeting',
        date: new Date(now.getTime() + 2 * 60 * 60 * 1000), // 2 hours from now
        duration: 60,
        attendees: ['john@example.com', 'jane@example.com'],
        isRecorded: false,
        platform: 'teams',
        startTime: new Date(now.getTime() + 2 * 60 * 60 * 1000),
        endTime: new Date(now.getTime() + 3 * 60 * 60 * 1000),
      },
      {
        id: '2',
        title: 'Client Presentation',
        date: new Date(now.getTime() + 4 * 60 * 60 * 1000), // 4 hours from now
        duration: 90,
        attendees: ['client@example.com', 'team@example.com'],
        isRecorded: false,
        platform: 'zoom',
        startTime: new Date(now.getTime() + 4 * 60 * 60 * 1000),
        endTime: new Date(now.getTime() + 5.5 * 60 * 60 * 1000),
      },
    ];

    // Mock recent recordings
    const mockRecordings: Meeting[] = [
      {
        id: '3',
        title: 'Weekly Team Standup',
        date: new Date(now.getTime() - 24 * 60 * 60 * 1000), // Yesterday
        duration: 30,
        attendees: ['team@example.com'],
        isRecorded: true,
        platform: 'teams',
      },
      {
        id: '4',
        title: 'Project Planning Session',
        date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        duration: 120,
        attendees: ['project@example.com'],
        isRecorded: true,
        platform: 'meet',
      },
    ];

    setUpcomingMeetings(mockUpcoming);
    setRecentRecordings(mockRecordings);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadMockData();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleStartRecording = () => {
    navigation.navigate('Recording', {});
  };

  const handleMeetingPress = (meetingId: string) => {
    navigation.navigate('MeetingDetail', { meetingId });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const renderUpcomingMeeting = ({ item }: { item: UpcomingMeeting }) => (
    <Card
      style={{ width: 280, marginRight: theme.spacing.md }}
      onPress={() => {/* Navigate to meeting details */}}
    >
      <CardContent>
        <Text variant="titleSmall" style={{ fontWeight: '600', marginBottom: theme.spacing.xs }}>
          {item.title}
        </Text>
        <Text variant="bodySmall" style={{ color: theme.colors.textSecondary, marginBottom: theme.spacing.sm }}>
          {formatTime(item.startTime)} - {formatTime(item.endTime)}
        </Text>
        <Text variant="bodySmall" style={{ color: theme.colors.textSecondary, marginBottom: theme.spacing.md }}>
          {item.attendees.length} attendees • {formatDuration(item.duration)}
        </Text>
        <Button
          title="Start Recording"
          size="small"
          variant="outline"
          style={{ alignSelf: 'flex-start' }}
        />
      </CardContent>
    </Card>
  );

  const renderRecentRecording = ({ item }: { item: Meeting }) => (
    <Card
      style={{ marginVertical: theme.spacing.xs }}
      onPress={() => handleMeetingPress(item.id)}
    >
      <CardHeader
        title={item.title}
        subtitle={`${item.date.toLocaleDateString()} • ${formatDuration(item.duration)}`}
        right={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {item.platform && (
              <Text variant="bodySmall" style={{ color: theme.colors.textSecondary, marginRight: theme.spacing.sm }}>
                {item.platform}
              </Text>
            )}
            <Text variant="bodySmall" style={{ color: theme.colors.success }}>
              ● Recorded
            </Text>
          </View>
        }
      />
      <CardContent>
        <Text variant="bodySmall" style={{ color: theme.colors.textSecondary }}>
          {item.attendees.join(', ')}
        </Text>
      </CardContent>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search meetings, transcripts..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchBar}
            iconColor={theme.colors.textSecondary}
            inputStyle={{ color: theme.colors.text }}
          />
        </View>

        {/* Upcoming Meetings Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="headlineSmall" style={styles.sectionTitle}>
              Upcoming Meetings
            </Text>
            <TouchableOpacity>
              <Text variant="bodyMedium" style={{ color: theme.colors.primary }}>
                View All
              </Text>
            </TouchableOpacity>
          </View>

          {upcomingMeetings.length > 0 ? (
            <FlatList
              data={upcomingMeetings}
              renderItem={renderUpcomingMeeting}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          ) : (
            <Card style={styles.emptyCard}>
              <CardContent>
                <Text variant="bodyMedium" style={{ color: theme.colors.textSecondary, textAlign: 'center' }}>
                  No upcoming meetings scheduled
                </Text>
              </CardContent>
            </Card>
          )}
        </View>

        {/* Recent Recordings Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="headlineSmall" style={styles.sectionTitle}>
              Recent Recordings
            </Text>
            <TouchableOpacity>
              <Text variant="bodyMedium" style={{ color: theme.colors.primary }}>
                View All
              </Text>
            </TouchableOpacity>
          </View>

          {recentRecordings.length > 0 ? (
            <FlatList
              data={recentRecordings}
              renderItem={renderRecentRecording}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          ) : (
            <Card style={styles.emptyCard}>
              <CardContent>
                <Text variant="bodyMedium" style={{ color: theme.colors.textSecondary, textAlign: 'center' }}>
                  No recordings yet. Start recording your first meeting!
                </Text>
              </CardContent>
            </Card>
          )}
        </View>

        {/* Spacer for FAB */}
        <View style={styles.spacer} />
      </ScrollView>

      {/* Record FAB */}
      <FAB
        icon="microphone"
        style={[styles.fab, { backgroundColor: theme.colors.error }]}
        size="large"
        onPress={handleStartRecording}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  searchBar: {
    elevation: 2,
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: '600',
  },
  horizontalList: {
    paddingHorizontal: 16,
  },
  emptyCard: {
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  spacer: {
    height: 100,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});