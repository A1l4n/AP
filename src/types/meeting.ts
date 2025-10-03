export interface Meeting {
  id: string;
  title: string;
  date: Date;
  duration: number; // seconds
  audioUrl: string;
  transcriptUrl?: string;
  summary?: Summary;
  actionItems: ActionItem[];
  attendees: string[];
  folderId?: string;
  tags: string[];
  calendarEventId?: string;
  platform?: 'teams' | 'zoom' | 'meet' | 'phone' | 'in-person';
  createdAt: Date;
  updatedAt: Date;
  isRecording?: boolean;
  isProcessing?: boolean;
}

export interface Summary {
  executive: string;
  keyPoints: string[];
  decisions: string[];
  followUps: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number; // 0-1
}

export interface ActionItem {
  id: string;
  text: string;
  assignee?: string;
  dueDate?: Date;
  completed: boolean;
  createdAt: Date;
}

export interface TranscriptSegment {
  id: string;
  startTime: number; // seconds
  endTime: number; // seconds
  speaker: string;
  text: string;
  confidence: number; // 0-1
}

export interface AudioLevel {
  timestamp: number;
  level: number; // 0-1
}

export interface RecordingState {
  isRecording: boolean;
  isPaused: boolean;
  duration: number;
  audioLevels: AudioLevel[];
  filePath?: string;
}

export interface MeetingFilters {
  dateRange?: {
    start: Date;
    end: Date;
  };
  folderId?: string;
  tags?: string[];
  attendees?: string[];
  platform?: string[];
  hasTranscript?: boolean;
  hasSummary?: boolean;
}

export interface SearchResult {
  meeting: Meeting;
  highlights: {
    field: string;
    text: string;
    score: number;
  }[];
}