import { useState, useEffect, useCallback } from 'react';
import { CalendarEvent } from '../types';
import { calendarService } from '../services/calendarService';

interface UseCalendarReturn {
  events: CalendarEvent[];
  isLoading: boolean;
  error: string | null;
  hasPermission: boolean;
  nextMeeting: CalendarEvent | null;
  todayMeetings: CalendarEvent[];
  refreshEvents: () => Promise<void>;
  getEventsForDate: (date: Date) => Promise<CalendarEvent[]>;
  requestPermission: () => Promise<boolean>;
}

/**
 * Hook for calendar functionality
 */
export const useCalendar = (daysAhead: number = 7): UseCalendarReturn => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [nextMeeting, setNextMeeting] = useState<CalendarEvent | null>(null);
  const [todayMeetings, setTodayMeetings] = useState<CalendarEvent[]>([]);

  /**
   * Request calendar permission
   */
  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      const granted = await calendarService.initialize();
      setHasPermission(granted);
      return granted;
    } catch (err) {
      setError('Failed to request calendar permission');
      return false;
    }
  }, []);

  /**
   * Fetch upcoming events
   */
  const fetchEvents = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const upcomingEvents = await calendarService.getUpcomingEvents(daysAhead);
      setEvents(upcomingEvents);

      // Get next meeting
      const next = await calendarService.getNextMeeting();
      setNextMeeting(next);

      // Get today's meetings
      const today = await calendarService.getEventsForDate(new Date());
      setTodayMeetings(today.filter(event => event.isVideoCall));
    } catch (err) {
      console.error('Failed to fetch events:', err);
      setError('Failed to load calendar events');
    } finally {
      setIsLoading(false);
    }
  }, [daysAhead]);

  /**
   * Refresh events
   */
  const refreshEvents = useCallback(async () => {
    await fetchEvents();
  }, [fetchEvents]);

  /**
   * Get events for a specific date
   */
  const getEventsForDate = useCallback(async (date: Date): Promise<CalendarEvent[]> => {
    try {
      return await calendarService.getEventsForDate(date);
    } catch (err) {
      console.error('Failed to get events for date:', err);
      return [];
    }
  }, []);

  /**
   * Initialize calendar on mount
   */
  useEffect(() => {
    const initialize = async () => {
      const granted = await requestPermission();
      if (granted) {
        await fetchEvents();
      } else {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  /**
   * Auto-refresh events every 5 minutes
   */
  useEffect(() => {
    if (!hasPermission) return;

    const interval = setInterval(() => {
      fetchEvents();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [hasPermission, fetchEvents]);

  return {
    events,
    isLoading,
    error,
    hasPermission,
    nextMeeting,
    todayMeetings,
    refreshEvents,
    getEventsForDate,
    requestPermission,
  };
};
