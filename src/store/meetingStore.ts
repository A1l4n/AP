import { create } from 'zustand';
import { Meeting } from '../types';

interface MeetingState {
  meetings: Meeting[];
  currentMeeting: Meeting | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setMeetings: (meetings: Meeting[]) => void;
  addMeeting: (meeting: Meeting) => void;
  updateMeeting: (id: string, updates: Partial<Meeting>) => void;
  deleteMeeting: (id: string) => void;
  setCurrentMeeting: (meeting: Meeting | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getMeetingById: (id: string) => Meeting | undefined;
}

export const useMeetingStore = create<MeetingState>((set, get) => ({
  meetings: [],
  currentMeeting: null,
  isLoading: false,
  error: null,

  setMeetings: (meetings) => set({ meetings }),

  addMeeting: (meeting) =>
    set((state) => ({
      meetings: [meeting, ...state.meetings],
    })),

  updateMeeting: (id, updates) =>
    set((state) => ({
      meetings: state.meetings.map((meeting) =>
        meeting.id === id
          ? { ...meeting, ...updates, updatedAt: new Date() }
          : meeting
      ),
      currentMeeting:
        state.currentMeeting?.id === id
          ? { ...state.currentMeeting, ...updates, updatedAt: new Date() }
          : state.currentMeeting,
    })),

  deleteMeeting: (id) =>
    set((state) => ({
      meetings: state.meetings.filter((meeting) => meeting.id !== id),
      currentMeeting:
        state.currentMeeting?.id === id ? null : state.currentMeeting,
    })),

  setCurrentMeeting: (meeting) => set({ currentMeeting: meeting }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  getMeetingById: (id) => {
    return get().meetings.find((meeting) => meeting.id === id);
  },
}));
