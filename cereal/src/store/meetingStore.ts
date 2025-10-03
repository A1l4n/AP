import { create } from 'zustand';

export interface Meeting {
  id: string;
  title: string;
  date: Date;
  duration: number;
  audioUrl: string;
  attendees: string[];
}

interface MeetingState {
  meetings: Meeting[];
  addMeeting: (m: Meeting) => void;
  setMeetings: (list: Meeting[]) => void;
}

export const useMeetingStore = create<MeetingState>((set) => ({
  meetings: [],
  addMeeting: (m) => set((s) => ({ meetings: [m, ...s.meetings] })),
  setMeetings: (list) => set({ meetings: list }),
}));
