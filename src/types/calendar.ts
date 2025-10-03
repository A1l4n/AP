export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  attendees: Attendee[];
  isVideoCall: boolean;
  platform?: 'teams' | 'zoom' | 'meet';
  meetingUrl?: string;
  hasRecording: boolean;
  recordingId?: string;
}

export interface Attendee {
  name: string;
  email: string;
  isOrganizer: boolean;
  status?: 'accepted' | 'declined' | 'tentative' | 'pending';
}

export type CalendarViewMode = 'month' | 'week' | 'day' | 'agenda';
