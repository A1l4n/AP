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
  processingStatus?: ProcessingStatus;
}

export interface Summary {
  executive: string;
  keyPoints: string[];
  decisions: string[];
  followUps: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number; // 0-1
  generatedAt: Date;
}

export interface ActionItem {
  id: string;
  text: string;
  assignee?: string;
  dueDate?: Date;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
}

export interface ProcessingStatus {
  transcription: 'pending' | 'processing' | 'completed' | 'failed';
  summary: 'pending' | 'processing' | 'completed' | 'failed';
  actionItems: 'pending' | 'processing' | 'completed' | 'failed';
  error?: string;
}

export interface TranscriptSegment {
  id: string;
  text: string;
  startTime: number; // seconds
  endTime: number; // seconds
  speaker?: string;
  confidence: number; // 0-1
}

export interface AudioLevel {
  timestamp: number;
  level: number; // 0-1
}

export interface RecordingSession {
  id: string;
  meetingId?: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  audioLevels: AudioLevel[];
  isPaused: boolean;
  pauseCount: number;
  totalPauseDuration: number;
}