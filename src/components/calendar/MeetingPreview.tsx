import React from 'react';
import { View, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Text, useTheme, Chip, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CalendarEvent } from '../../types';
import { RootStackParamList } from '../../navigation/types';
import { formatTime, formatDuration } from '../../utils/dateFormatter';
import { Spacing, BorderRadius, Shadows } from '../../constants';
import { calendarService } from '../../services/calendarService';

interface MeetingPreviewProps {
  event: CalendarEvent;
  showActions?: boolean;
}

export const MeetingPreview: React.FC<MeetingPreviewProps> = ({
  event,
  showActions = true,
}) => {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const duration = calendarService.getMeetingDuration(event);
  const isNow = calendarService.isMeetingNow(event);
  const isStartingSoon = calendarService.isMeetingStartingSoon(event, 15);

  const handleJoinMeeting = () => {
    if (event.meetingUrl) {
      Linking.openURL(event.meetingUrl);
    }
  };

  const handleStartRecording = () => {
    navigation.navigate('Recording', {
      calendarEventId: event.id,
    });
  };

  const getPlatformIcon = () => {
    switch (event.platform) {
      case 'zoom':
        return 'video';
      case 'teams':
        return 'microsoft-teams';
      case 'meet':
        return 'google';
      default:
        return 'video-outline';
    }
  };

  const getPlatformColor = () => {
    switch (event.platform) {
      case 'zoom':
        return '#2D8CFF';
      case 'teams':
        return '#6264A7';
      case 'meet':
        return '#00897B';
      default:
        return theme.colors.primary;
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.surface },
        Shadows.medium,
        isNow && { borderLeftWidth: 4, borderLeftColor: theme.colors.primary },
      ]}
    >
      {/* Status Badge */}
      {isNow && (
        <View style={styles.statusBadge}>
          <Chip
            mode="flat"
            style={{ backgroundColor: theme.colors.primary }}
            textStyle={{ color: '#fff', fontSize: 12 }}
          >
            Happening Now
          </Chip>
        </View>
      )}

      {isStartingSoon && !isNow && (
        <View style={styles.statusBadge}>
          <Chip
            mode="flat"
            style={{ backgroundColor: theme.colors.tertiary }}
            textStyle={{ color: '#fff', fontSize: 12 }}
          >
            Starting Soon
          </Chip>
        </View>
      )}

      {/* Time */}
      <View style={styles.timeContainer}>
        <Icon name="clock-outline" size={16} color={theme.colors.onSurfaceVariant} />
        <Text variant="bodyMedium" style={styles.time}>
          {formatTime(event.startDate)} - {formatTime(event.endDate)}
        </Text>
        <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
          ({duration} min)
        </Text>
      </View>

      {/* Title */}
      <Text variant="titleMedium" style={styles.title}>
        {event.title}
      </Text>

      {/* Platform Badge */}
      {event.isVideoCall && event.platform && (
        <View style={styles.platformBadge}>
          <Icon
            name={getPlatformIcon()}
            size={16}
            color={getPlatformColor()}
          />
          <Text
            variant="bodySmall"
            style={[styles.platformText, { color: getPlatformColor() }]}
          >
            {event.platform.toUpperCase()}
          </Text>
        </View>
      )}

      {/* Location or Meeting URL indicator */}
      {event.location && !event.isVideoCall && (
        <View style={styles.locationContainer}>
          <Icon name="map-marker" size={14} color={theme.colors.onSurfaceVariant} />
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            {event.location}
          </Text>
        </View>
      )}

      {/* Attendees */}
      {event.attendees.length > 0 && (
        <View style={styles.attendeesContainer}>
          <Icon name="account-group" size={14} color={theme.colors.onSurfaceVariant} />
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            {event.attendees.length} attendee{event.attendees.length !== 1 ? 's' : ''}
          </Text>
        </View>
      )}

      {/* Actions */}
      {showActions && event.isVideoCall && (
        <View style={styles.actionsContainer}>
          {/* Join Meeting Button */}
          {event.meetingUrl && (
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: getPlatformColor() },
              ]}
              onPress={handleJoinMeeting}
            >
              <Icon name="video" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>Join</Text>
            </TouchableOpacity>
          )}

          {/* Record Button */}
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: theme.colors.error },
            ]}
            onPress={handleStartRecording}
          >
            <Icon name="record-circle" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Record</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Recording Indicator */}
      {event.hasRecording && (
        <View style={styles.recordingIndicator}>
          <Icon name="check-circle" size={16} color={theme.colors.primary} />
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.primary, marginLeft: 4 }}
          >
            Recorded
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    marginVertical: Spacing.sm,
  },
  statusBadge: {
    marginBottom: Spacing.sm,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    gap: 4,
  },
  time: {
    fontWeight: '600',
    marginLeft: 4,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: Spacing.sm,
  },
  platformBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
    gap: 4,
  },
  platformText: {
    fontSize: 12,
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
    gap: 4,
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
    gap: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.xl,
    gap: 6,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
});
