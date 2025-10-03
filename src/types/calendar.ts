export interface CalendarEvent {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  attendees: Attendee[];
  location?: string;
  description?: string;
  platform?: 'teams' | 'zoom' | 'meet' | 'phone' | 'in-person';
  meetingUrl?: string;
  isAllDay: boolean;
  recurrence?: RecurrenceRule;
  calendarId: string;
  calendarName: string;
}

export interface Attendee {
  email: string;
  name: string;
  status: 'accepted' | 'declined' | 'tentative' | 'pending';
  isOrganizer: boolean;
}

export interface RecurrenceRule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  endDate?: Date;
  occurrences?: number;
  daysOfWeek?: number[]; // 0 = Sunday, 1 = Monday, etc.
}

export interface CalendarPermission {
  calendarId: string;
  calendarName: string;
  accessLevel: 'read' | 'write' | 'full';
  granted: boolean;
}

export interface CalendarSettings {
  enabledCalendars: string[];
  autoRecord: boolean;
  recordBeforeStart: number; // minutes
  recordAfterEnd: number; // minutes
  defaultFolder?: string;
}