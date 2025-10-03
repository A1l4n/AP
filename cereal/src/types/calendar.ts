export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  attendees: string[];
  location?: string;
  platform?: 'teams' | 'zoom' | 'meet' | 'phone';
}
