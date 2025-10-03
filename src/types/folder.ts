export interface Folder {
  id: string;
  name: string;
  color: string;
  description?: string;
  isSmart: boolean; // AI-generated folder
  meetingCount: number;
  createdAt: Date;
  updatedAt: Date;
  parentId?: string; // For nested folders
  children?: Folder[];
}

export interface SmartFolderRule {
  id: string;
  folderId: string;
  type: 'keyword' | 'attendee' | 'date' | 'platform' | 'sentiment';
  value: string;
  operator: 'contains' | 'equals' | 'startsWith' | 'endsWith';
}

export interface FolderWithMeetings extends Folder {
  meetings: string[]; // Meeting IDs
  recentMeetings: string[]; // Last 5 meeting IDs
}