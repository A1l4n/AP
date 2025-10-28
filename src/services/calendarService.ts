import * as Calendar from 'expo-calendar';
import { CalendarEvent } from '../types';
import { checkCalendarPermission, requestCalendarPermission } from '../utils/permissions';

class CalendarService {
  private hasPermission: boolean = false;

  /**
   * Initialize calendar service and request permissions
   */
  async initialize(): Promise<boolean> {
    try {
      const granted = await checkCalendarPermission();
      if (granted) {
        this.hasPermission = true;
        return true;
      }

      const result = await requestCalendarPermission();
      this.hasPermission = result.granted;
      return result.granted;
    } catch (error) {
      console.error('Failed to initialize calendar service:', error);
      return false;
    }
  }

  /**
   * Get all available calendars
   */
  async getCalendars(): Promise<Calendar.Calendar[]> {
    if (!this.hasPermission) {
      await this.initialize();
    }

    try {
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      return calendars;
    } catch (error) {
      console.error('Failed to get calendars:', error);
      return [];
    }
  }

  /**
   * Get upcoming events for the next N days
   */
  async getUpcomingEvents(daysAhead: number = 7): Promise<CalendarEvent[]> {
    if (!this.hasPermission) {
      const initialized = await this.initialize();
      if (!initialized) return [];
    }

    try {
      const calendars = await this.getCalendars();
      if (calendars.length === 0) return [];

      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + daysAhead);

      const calendarIds = calendars.map(cal => cal.id);
      const events = await Calendar.getEventsAsync(calendarIds, startDate, endDate);

      return events.map(event => this.mapToCalendarEvent(event));
    } catch (error) {
      console.error('Failed to get upcoming events:', error);
      return [];
    }
  }

  /**
   * Get events for a specific date
   */
  async getEventsForDate(date: Date): Promise<CalendarEvent[]> {
    if (!this.hasPermission) {
      const initialized = await this.initialize();
      if (!initialized) return [];
    }

    try {
      const calendars = await this.getCalendars();
      if (calendars.length === 0) return [];

      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const calendarIds = calendars.map(cal => cal.id);
      const events = await Calendar.getEventsAsync(calendarIds, startOfDay, endOfDay);

      return events.map(event => this.mapToCalendarEvent(event));
    } catch (error) {
      console.error('Failed to get events for date:', error);
      return [];
    }
  }

  /**
   * Get the next upcoming meeting
   */
  async getNextMeeting(): Promise<CalendarEvent | null> {
    const events = await this.getUpcomingEvents(7);
    
    if (events.length === 0) return null;

    // Filter for future events
    const now = new Date();
    const futureEvents = events.filter(event => event.startDate > now);

    // Sort by start date
    futureEvents.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    return futureEvents[0] || null;
  }

  /**
   * Detect if event is a video call and determine platform
   */
  detectMeetingPlatform(event: Calendar.Event): {
    isVideoCall: boolean;
    platform?: 'zoom' | 'teams' | 'meet';
    meetingUrl?: string;
  } {
    const text = `${event.title || ''} ${event.location || ''} ${event.notes || ''}`.toLowerCase();

    // Check for Zoom
    if (text.includes('zoom.us') || text.includes('zoom meeting')) {
      const zoomMatch = text.match(/https?:\/\/[^\s]*zoom\.us\/[^\s]*/i);
      return {
        isVideoCall: true,
        platform: 'zoom',
        meetingUrl: zoomMatch ? zoomMatch[0] : undefined,
      };
    }

    // Check for Microsoft Teams
    if (text.includes('teams.microsoft.com') || text.includes('microsoft teams')) {
      const teamsMatch = text.match(/https?:\/\/teams\.microsoft\.com\/[^\s]*/i);
      return {
        isVideoCall: true,
        platform: 'teams',
        meetingUrl: teamsMatch ? teamsMatch[0] : undefined,
      };
    }

    // Check for Google Meet
    if (text.includes('meet.google.com') || text.includes('google meet')) {
      const meetMatch = text.match(/https?:\/\/meet\.google\.com\/[^\s]*/i);
      return {
        isVideoCall: true,
        platform: 'meet',
        meetingUrl: meetMatch ? meetMatch[0] : undefined,
      };
    }

    return { isVideoCall: false };
  }

  /**
   * Parse attendees from event
   */
  private parseAttendees(event: Calendar.Event) {
    // Note: Expo Calendar API has limited attendee support
    // Full attendee info requires platform-specific APIs
    const attendees = event.attendees || [];
    
    return attendees.map(attendee => ({
      name: attendee.name || attendee.email || 'Unknown',
      email: attendee.email || '',
      isOrganizer: attendee.isCurrentUser || false,
      status: attendee.status as 'accepted' | 'declined' | 'tentative' | 'pending' | undefined,
    }));
  }

  /**
   * Map Expo calendar event to our CalendarEvent type
   */
  private mapToCalendarEvent(event: Calendar.Event): CalendarEvent {
    const { isVideoCall, platform, meetingUrl } = this.detectMeetingPlatform(event);

    return {
      id: event.id,
      title: event.title || 'Untitled Event',
      description: event.notes,
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate),
      location: event.location,
      attendees: this.parseAttendees(event),
      isVideoCall,
      platform,
      meetingUrl,
      hasRecording: false, // Will be checked against our database
    };
  }

  /**
   * Check if meeting is starting soon (within minutes)
   */
  isMeetingStartingSoon(event: CalendarEvent, minutesBefore: number = 5): boolean {
    const now = new Date();
    const timeUntilMeeting = event.startDate.getTime() - now.getTime();
    const minutesUntilMeeting = timeUntilMeeting / (1000 * 60);

    return minutesUntilMeeting > 0 && minutesUntilMeeting <= minutesBefore;
  }

  /**
   * Check if meeting is happening now
   */
  isMeetingNow(event: CalendarEvent): boolean {
    const now = new Date();
    return now >= event.startDate && now <= event.endDate;
  }

  /**
   * Get duration of event in minutes
   */
  getMeetingDuration(event: CalendarEvent): number {
    const durationMs = event.endDate.getTime() - event.startDate.getTime();
    return Math.floor(durationMs / (1000 * 60));
  }

  /**
   * Extract meeting ID from URL (for Zoom, Teams, etc.)
   */
  extractMeetingId(meetingUrl: string, platform: 'zoom' | 'teams' | 'meet'): string | null {
    try {
      switch (platform) {
        case 'zoom': {
          // Zoom URL format: https://zoom.us/j/1234567890
          const match = meetingUrl.match(/\/j\/(\d+)/);
          return match ? match[1] : null;
        }
        case 'teams': {
          // Teams URL is complex, use full URL as ID
          return meetingUrl;
        }
        case 'meet': {
          // Meet URL format: https://meet.google.com/abc-defg-hij
          const match = meetingUrl.match(/meet\.google\.com\/([a-z-]+)/);
          return match ? match[1] : null;
        }
        default:
          return null;
      }
    } catch (error) {
      console.error('Failed to extract meeting ID:', error);
      return null;
    }
  }
}

export const calendarService = new CalendarService();
