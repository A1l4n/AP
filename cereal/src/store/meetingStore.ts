import { create } from 'zustand';
import { Meeting, RecordingSession } from '../types/meeting';

interface MeetingState {
  meetings: Meeting[];
  currentRecording: RecordingSession | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addMeeting: (meeting: Meeting) => void;
  updateMeeting: (id: string, updates: Partial<Meeting>) => void;
  deleteMeeting: (id: string) => void;
  setMeetings: (meetings: Meeting[]) => void;
  setCurrentRecording: (recording: RecordingSession | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Getters
  getMeetingById: (id: string) => Meeting | undefined;
  getMeetingsByFolder: (folderId: string) => Meeting[];
  getRecentMeetings: (limit?: number) => Meeting[];
}

export const useMeetingStore = create<MeetingState>((set, get) => ({
  meetings: [],
  currentRecording: null,
  isLoading: false,
  error: null,
  
  addMeeting: (meeting) =>
    set((state) => ({
      meetings: [...state.meetings, meeting],
    })),
  
  updateMeeting: (id, updates) =>
    set((state) => ({
      meetings: state.meetings.map((meeting) =>
        meeting.id === id ? { ...meeting, ...updates } : meeting
      ),
    })),
  
  deleteMeeting: (id) =>
    set((state) => ({
      meetings: state.meetings.filter((meeting) => meeting.id !== id),
    })),
  
  setMeetings: (meetings) => set({ meetings }),
  
  setCurrentRecording: (recording) => set({ currentRecording: recording }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  getMeetingById: (id) => {
    const { meetings } = get();
    return meetings.find((meeting) => meeting.id === id);
  },
  
  getMeetingsByFolder: (folderId) => {
    const { meetings } = get();
    return meetings.filter((meeting) => meeting.folderId === folderId);
  },
  
  getRecentMeetings: (limit = 10) => {
    const { meetings } = get();
    return meetings
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  },
}));