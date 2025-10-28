export interface Folder {
  id: string;
  name: string;
  color: string;
  icon?: string;
  meetingCount: number;
  createdAt: Date;
  updatedAt: Date;
  isSmartFolder?: boolean;
  smartFolderRules?: SmartFolderRule[];
}

export interface SmartFolderRule {
  field: 'tags' | 'attendees' | 'platform' | 'title';
  operator: 'contains' | 'equals' | 'startsWith' | 'endsWith';
  value: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  count: number;
}
