import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { Text, useTheme, Searchbar, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Spacing } from '../constants';
import { RootStackParamList } from '../navigation/types';
import { useMeetingStore } from '../store';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { meetings } = useMeetingStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // TODO: Fetch latest meetings
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleStartRecording = () => {
    navigation.navigate('Recording', {});
  };

  const recentMeetings = meetings.slice(0, 10);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <Text variant="headlineMedium" style={styles.headerTitle}>
          Cereal
        </Text>
        <Searchbar
          placeholder="Search meetings..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          elevation={0}
        />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Upcoming Meetings Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Upcoming Meetings
            </Text>
            <TouchableOpacity>
              <Text style={{ color: theme.colors.primary }}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {/* TODO: Add upcoming meeting cards */}
            <View
              style={[
                styles.emptyCard,
                { backgroundColor: theme.colors.surfaceVariant },
              ]}
            >
              <Icon
                name="calendar-blank"
                size={48}
                color={theme.colors.onSurfaceVariant}
              />
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                No upcoming meetings
              </Text>
            </View>
          </ScrollView>
        </View>

        {/* Recent Recordings Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Recent Recordings
            </Text>
          </View>
          {recentMeetings.length === 0 ? (
            <View
              style={[
                styles.emptyState,
                { backgroundColor: theme.colors.surfaceVariant },
              ]}
            >
              <Icon
                name="microphone-off"
                size={64}
                color={theme.colors.onSurfaceVariant}
              />
              <Text
                variant="titleMedium"
                style={[
                  styles.emptyText,
                  { color: theme.colors.onSurfaceVariant },
                ]}
              >
                No recordings yet
              </Text>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                Tap the record button to start your first meeting
              </Text>
            </View>
          ) : (
            <View>
              {/* TODO: Add meeting list */}
              <Text>Recent meetings will appear here</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* FAB - Record Button */}
      <FAB
        icon="microphone"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={handleStartRecording}
        label="Record"
        size="medium"
      />
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
    marginBottom: Spacing.md,
  },
  searchBar: {
    elevation: 0,
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  horizontalScroll: {
    paddingRight: Spacing.lg,
  },
  emptyCard: {
    width: 200,
    height: 150,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  emptyState: {
    padding: Spacing.xxxl,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  emptyText: {
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    margin: Spacing.lg,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;
