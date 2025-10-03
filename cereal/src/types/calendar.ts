export interface CalendarEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  attendees: CalendarAttendee[];
  description?: string;
  isAllDay: boolean;
  recurrence?: RecurrenceRule;
  source: 'google' | 'outlook' | 'apple' | 'local';
  sourceId: string;
  meetingUrl?: string;
  platform?: 'teams' | 'zoom' | 'meet' | 'webex' | 'other';
}

export interface CalendarAttendee {
  email: string;
  name?: string;
  status: 'accepted' | 'declined' | 'tentative' | 'pending';
  isOrganizer: boolean;
}

export interface RecurrenceRule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  endDate?: Date;
  occurrences?: number;
  daysOfWeek?: number[]; // 0 = Sunday, 1 = Monday, etc.
  dayOfMonth?: number;
}

export interface CalendarSyncStatus {
  lastSync: Date;
  isSyncing: boolean;
  error?: string;
  totalEvents: number;
  newEvents: number;
  updatedEvents: number;
}

export interface CalendarPermission {
  read: boolean;
  write: boolean;
  granted: boolean;
  denied: boolean;
  canAskAgain: boolean;
}