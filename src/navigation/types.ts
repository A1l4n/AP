import { Meeting } from '../types';

export type RootStackParamList = {
  Main: undefined;
  Recording: { calendarEventId?: string };
  MeetingDetail: { meetingId: string };
};

export type TabParamList = {
  Home: undefined;
  Calendar: undefined;
  Folders: undefined;
  Settings: undefined;
};
