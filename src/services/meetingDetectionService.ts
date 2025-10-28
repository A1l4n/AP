import * as Notifications from 'expo-notifications';
import { CalendarEvent } from '../types';
import { calendarService } from './calendarService';
import { useMeetingStore } from '../store';
import { APP_CONFIG } from '../constants/config';

/**
 * Service to detect upcoming meetings and send reminders
 */
class MeetingDetectionService {
  private checkInterval: NodeJS.Timeout | null = null;
  private notifiedMeetings: Set<string> = new Set();

  /**
   * Start monitoring for upcoming meetings
   */
  async startMonitoring(intervalMinutes: number = 1): Promise<void> {
    // Request notification permissions
    await this.requestNotificationPermissions();

    // Configure notification behavior
    await this.configureNotifications();

    // Clear any existing interval
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }

    // Start checking for meetings
    this.checkInterval = setInterval(
      () => this.checkUpcomingMeetings(),
      intervalMinutes * 60 * 1000
    );

    // Initial check
    await this.checkUpcomingMeetings();
  }

  /**
   * Stop monitoring
   */
  stopMonitoring(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  /**
   * Request notification permissions
   */
  private async requestNotificationPermissions(): Promise<boolean> {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    return finalStatus === 'granted';
  }

  /**
   * Configure notification behavior
   */
  private async configureNotifications(): Promise<void> {
    await Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  }

  /**
   * Check for upcoming meetings and send notifications
   */
  private async checkUpcomingMeetings(): Promise<void> {
    try {
      const upcomingEvents = await calendarService.getUpcomingEvents(1);

      for (const event of upcomingEvents) {
        // Only notify for video calls
        if (!event.isVideoCall) continue;

        // Check if meeting is starting soon (5 minutes)
        if (calendarService.isMeetingStartingSoon(event, 5)) {
          await this.sendMeetingReminder(event);
        }

        // Check if meeting is happening now
        if (calendarService.isMeetingNow(event)) {
          await this.sendMeetingStartedNotification(event);
        }
      }
    } catch (error) {
      console.error('Failed to check upcoming meetings:', error);
    }
  }

  /**
   * Send reminder notification for upcoming meeting
   */
  private async sendMeetingReminder(event: CalendarEvent): Promise<void> {
    // Prevent duplicate notifications
    const notificationId = `reminder-${event.id}`;
    if (this.notifiedMeetings.has(notificationId)) return;

    this.notifiedMeetings.add(notificationId);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '📅 Meeting Starting Soon',
        body: `"${event.title}" starts in 5 minutes. Ready to record?`,
        data: {
          type: 'meeting-reminder',
          eventId: event.id,
          meetingUrl: event.meetingUrl,
          platform: event.platform,
        },
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: null, // Send immediately
    });
  }

  /**
   * Send notification when meeting has started
   */
  private async sendMeetingStartedNotification(event: CalendarEvent): Promise<void> {
    // Prevent duplicate notifications
    const notificationId = `started-${event.id}`;
    if (this.notifiedMeetings.has(notificationId)) return;

    this.notifiedMeetings.add(notificationId);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🎙️ Meeting In Progress',
        body: `"${event.title}" is happening now. Tap to start recording.`,
        data: {
          type: 'meeting-started',
          eventId: event.id,
          meetingUrl: event.meetingUrl,
          platform: event.platform,
        },
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: null,
    });
  }

  /**
   * Handle notification tap (user wants to start recording)
   */
  async handleNotificationResponse(
    response: Notifications.NotificationResponse
  ): Promise<void> {
    const data = response.notification.request.content.data;

    if (data.type === 'meeting-reminder' || data.type === 'meeting-started') {
      // Navigate to recording screen with pre-filled data
      // This will be handled by the app's navigation listener
      console.log('User tapped notification for meeting:', data.eventId);
    }
  }

  /**
   * Get meeting suggestions for today
   */
  async getTodayMeetings(): Promise<CalendarEvent[]> {
    const today = new Date();
    const events = await calendarService.getEventsForDate(today);
    
    // Filter for video calls only
    return events.filter(event => event.isVideoCall);
  }

  /**
   * Check if there's a meeting happening right now
   */
  async getCurrentMeeting(): Promise<CalendarEvent | null> {
    const todayMeetings = await this.getTodayMeetings();
    
    for (const meeting of todayMeetings) {
      if (calendarService.isMeetingNow(meeting)) {
        return meeting;
      }
    }

    return null;
  }

  /**
   * Link a recording to a calendar event
   */
  async linkRecordingToEvent(meetingId: string, eventId: string): Promise<void> {
    const { updateMeeting } = useMeetingStore.getState();
    
    updateMeeting(meetingId, {
      calendarEventId: eventId,
    });
  }

  /**
   * Clear notification history (call on app close or weekly)
   */
  clearNotificationHistory(): void {
    this.notifiedMeetings.clear();
  }
}

export const meetingDetectionService = new MeetingDetectionService();
