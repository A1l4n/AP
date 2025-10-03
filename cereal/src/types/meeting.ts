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

export interface Meeting {
  id: string;
  title: string;
  date: Date;
  duration: number;
  audioUrl: string;
  transcriptUrl?: string;
  summary?: Summary;
  actionItems: ActionItem[];
  attendees: string[];
  folderId?: string;
  tags: string[];
  calendarEventId?: string;
  platform?: 'teams' | 'zoom' | 'meet' | 'phone';
  createdAt: Date;
  updatedAt: Date;
}
