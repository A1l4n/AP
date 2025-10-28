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
  platform?: 'teams' | 'zoom' | 'meet' | 'phone' | 'other';
  createdAt: Date;
  updatedAt: Date;
}

export interface Summary {
  executive: string;
  keyPoints: string[];
  decisions: string[];
  followUps: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface ActionItem {
  id: string;
  text: string;
  assignee?: string;
  dueDate?: Date;
  completed: boolean;
}

export interface Transcript {
  id: string;
  meetingId: string;
  text: string;
  segments: TranscriptSegment[];
  createdAt: Date;
}

export interface TranscriptSegment {
  id: string;
  speaker: string;
  text: string;
  startTime: number; // milliseconds
  endTime: number; // milliseconds
  confidence: number;
}
