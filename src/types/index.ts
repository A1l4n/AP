export * from './meeting';
export * from './folder';
export * from './calendar';

export interface User {
  id: string;
  email: string;
  name: string;
  photoUrl?: string;
  createdAt: Date;
  settings: UserSettings;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'auto';
  audioQuality: 'low' | 'medium' | 'high';
  autoStartRecording: boolean;
  notifications: NotificationSettings;
  integrations: IntegrationSettings;
}

export interface NotificationSettings {
  recordingStarted: boolean;
  recordingStopped: boolean;
  transcriptionComplete: boolean;
  upcomingMeeting: boolean;
}

export interface IntegrationSettings {
  teamsEnabled: boolean;
  zoomEnabled: boolean;
  meetEnabled: boolean;
  calendarSync: boolean;
}

export interface SearchFilters {
  dateRange?: {
    start: Date;
    end: Date;
  };
  folders?: string[];
  tags?: string[];
  attendees?: string[];
  platforms?: string[];
}
