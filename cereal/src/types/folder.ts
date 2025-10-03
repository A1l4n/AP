export interface Folder {
  id: string;
  name: string;
  color: string;
  icon?: string;
  description?: string;
  parentId?: string;
  isSmart: boolean;
  smartRules?: SmartFolderRule[];
  meetingCount: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface SmartFolderRule {
  id: string;
  type: 'tag' | 'attendee' | 'date' | 'platform' | 'keyword';
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'before' | 'after' | 'between';
  value: string | string[] | Date | { start: Date; end: Date };
}

export interface FolderHierarchy {
  folder: Folder;
  children: FolderHierarchy[];
  meetingCount: number;
}

export interface FolderStats {
  totalMeetings: number;
  totalDuration: number; // seconds
  averageDuration: number; // seconds
  mostActiveDay: string;
  mostUsedTags: Array<{ tag: string; count: number }>;
  platformBreakdown: Array<{ platform: string; count: number }>;
}