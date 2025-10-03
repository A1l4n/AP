import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const CalendarScreen: React.FC = () => {
  const theme = useTheme();
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock calendar data
  const calendarEvents = [
    {
      id: '1',
      title: 'Team Standup',
      startTime: new Date(2024, 9, 3, 10, 0),
      endTime: new Date(2024, 9, 3, 10, 30),
      attendees: ['John Doe', 'Jane Smith'],
      platform: 'teams',
      isRecorded: false,
    },
    {
      id: '2',
      title: 'Project Review',
      startTime: new Date(2024, 9, 3, 14, 0),
      endTime: new Date(2024, 9, 3, 15, 0),
      attendees: ['Mike Johnson'],
      platform: 'zoom',
      isRecorded: true,
    },
    {
      id: '3',
      title: 'Client Meeting',
      startTime: new Date(2024, 9, 4, 9, 0),
      endTime: new Date(2024, 9, 4, 10, 0),
      attendees: ['Sarah Wilson', 'Tom Brown'],
      platform: 'meet',
      isRecorded: false,
    },
  ];

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTodaysEvents = () => {
    const today = new Date();
    return calendarEvents.filter(event => 
      event.startTime.toDateString() === today.toDateString()
    );
  };

  const renderCalendarHeader = () => (
    <View style={styles.calendarHeader}>
      <Text style={[styles.calendarTitle, { color: theme.colors.text }]}>
        {formatDate(selectedDate)}
      </Text>
      <View style={styles.viewModeButtons}>
        <TouchableOpacity
          style={[
            styles.viewModeButton,
            viewMode === 'month' && styles.activeViewMode,
            { backgroundColor: viewMode === 'month' ? theme.colors.primary : 'transparent' },
          ]}
          onPress={() => setViewMode('month')}
        >
          <Text style={[
            styles.viewModeText,
            { color: viewMode === 'month' ? '#FFFFFF' : theme.colors.textSecondary },
          ]}>
            Month
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.viewModeButton,
            viewMode === 'week' && styles.activeViewMode,
            { backgroundColor: viewMode === 'week' ? theme.colors.primary : 'transparent' },
          ]}
          onPress={() => setViewMode('week')}
        >
          <Text style={[
            styles.viewModeText,
            { color: viewMode === 'week' ? '#FFFFFF' : theme.colors.textSecondary },
          ]}>
            Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.viewModeButton,
            viewMode === 'day' && styles.activeViewMode,
            { backgroundColor: viewMode === 'day' ? theme.colors.primary : 'transparent' },
          ]}
          onPress={() => setViewMode('day')}
        >
          <Text style={[
            styles.viewModeText,
            { color: viewMode === 'day' ? '#FFFFFF' : theme.colors.textSecondary },
          ]}>
            Day
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCalendarGrid = () => {
    // Simplified calendar grid - in real app, this would be more sophisticated
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    
    return (
      <View style={styles.calendarGrid}>
        {/* Day headers */}
        <View style={styles.dayHeaders}>
          {days.map(day => (
            <Text key={day} style={[styles.dayHeader, { color: theme.colors.textSecondary }]}>
              {day}
            </Text>
          ))}
        </View>
        
        {/* Calendar days */}
        <View style={styles.calendarDays}>
          {Array.from({ length: 35 }, (_, i) => {
            const day = i - 6; // Start from previous week
            const date = new Date(today.getFullYear(), today.getMonth(), day);
            const isToday = date.toDateString() === today.toDateString();
            const hasEvents = calendarEvents.some(event => 
              event.startTime.toDateString() === date.toDateString()
            );
            
            return (
              <TouchableOpacity
                key={i}
                style={[
                  styles.calendarDay,
                  isToday && styles.today,
                  hasEvents && styles.hasEvents,
                  { backgroundColor: isToday ? theme.colors.primary : 'transparent' },
                ]}
                onPress={() => setSelectedDate(date)}
              >
                <Text style={[
                  styles.dayNumber,
                  { color: isToday ? '#FFFFFF' : theme.colors.text },
                ]}>
                  {date.getDate()}
                </Text>
                {hasEvents && (
                  <View style={[
                    styles.eventDot,
                    { backgroundColor: theme.colors.accent },
                  ]} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const renderTodaysEvents = () => {
    const todaysEvents = getTodaysEvents();
    
    return (
      <View style={styles.eventsSection}>
        <Text style={[styles.eventsTitle, { color: theme.colors.text }]}>
          Today's Meetings
        </Text>
        
        {todaysEvents.length === 0 ? (
          <Card style={styles.noEventsCard}>
            <Icon name="event-available" size={48} color={theme.colors.textSecondary} />
            <Text style={[styles.noEventsText, { color: theme.colors.textSecondary }]}>
              No meetings scheduled for today
            </Text>
          </Card>
        ) : (
          todaysEvents.map(event => (
            <Card key={event.id} style={styles.eventCard}>
              <View style={styles.eventHeader}>
                <Text style={[styles.eventTitle, { color: theme.colors.text }]}>
                  {event.title}
                </Text>
                <View style={styles.eventStatus}>
                  {event.isRecorded && (
                    <Icon name="check-circle" size={16} color={theme.colors.success} />
                  )}
                </View>
              </View>
              
              <View style={styles.eventDetails}>
                <View style={styles.eventTime}>
                  <Icon name="schedule" size={16} color={theme.colors.textSecondary} />
                  <Text style={[styles.timeText, { color: theme.colors.textSecondary }]}>
                    {formatTime(event.startTime)} - {formatTime(event.endTime)}
                  </Text>
                </View>
                
                <View style={styles.eventAttendees}>
                  <Icon name="people" size={16} color={theme.colors.textSecondary} />
                  <Text style={[styles.attendeesText, { color: theme.colors.textSecondary }]}>
                    {event.attendees.join(', ')}
                  </Text>
                </View>
                
                <View style={styles.eventPlatform}>
                  <Icon name="videocam" size={16} color={theme.colors.textSecondary} />
                  <Text style={[styles.platformText, { color: theme.colors.textSecondary }]}>
                    {event.platform}
                  </Text>
                </View>
              </View>
              
              <View style={styles.eventActions}>
                <Button
                  title={event.isRecorded ? "View Recording" : "Record"}
                  onPress={() => {/* TODO: Handle recording */}}
                  size="small"
                  style={styles.recordButton}
                />
                {event.platform !== 'in-person' && (
                  <Button
                    title="Join"
                    onPress={() => {/* TODO: Handle joining */}}
                    variant="outline"
                    size="small"
                    style={styles.joinButton}
                  />
                )}
              </View>
            </Card>
          ))
        )}
      </View>
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {renderCalendarHeader()}
      {renderCalendarGrid()}
      {renderTodaysEvents()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendarHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  calendarTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  viewModeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  viewModeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeViewMode: {
    borderColor: '#6366F1',
  },
  viewModeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  calendarGrid: {
    padding: 16,
  },
  dayHeaders: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayHeader: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    paddingVertical: 8,
  },
  calendarDays: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 4,
    position: 'relative',
  },
  today: {
    borderRadius: 8,
  },
  hasEvents: {
    // Visual indicator for days with events
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '500',
  },
  eventDot: {
    position: 'absolute',
    bottom: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  eventsSection: {
    padding: 16,
  },
  eventsTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  noEventsCard: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  noEventsText: {
    fontSize: 16,
    marginTop: 16,
  },
  eventCard: {
    marginBottom: 12,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  eventStatus: {
    marginLeft: 8,
  },
  eventDetails: {
    marginBottom: 12,
  },
  eventTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  timeText: {
    fontSize: 14,
  },
  eventAttendees: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  attendeesText: {
    fontSize: 14,
    flex: 1,
  },
  eventPlatform: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  platformText: {
    fontSize: 14,
  },
  eventActions: {
    flexDirection: 'row',
    gap: 8,
  },
  recordButton: {
    flex: 1,
  },
  joinButton: {
    flex: 1,
  },
});