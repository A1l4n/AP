import { create } from 'zustand';
import { Meeting, RecordingState, MeetingFilters } from '../types/meeting';

interface MeetingStore {
  // State
  meetings: Meeting[];
  currentRecording: RecordingState | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addMeeting: (meeting: Meeting) => void;
  updateMeeting: (id: string, updates: Partial<Meeting>) => void;
  deleteMeeting: (id: string) => void;
  getMeetingById: (id: string) => Meeting | undefined;
  getMeetingsByFolder: (folderId: string) => Meeting[];
  searchMeetings: (query: string) => Meeting[];
  filterMeetings: (filters: MeetingFilters) => Meeting[];
  
  // Recording actions
  startRecording: (meetingTitle?: string) => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  stopRecording: () => void;
  updateRecordingDuration: (duration: number) => void;
  updateAudioLevels: (levels: number[]) => void;
  
  // Utility actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useMeetingStore = create<MeetingStore>((set, get) => ({
  // Initial state
  meetings: [],
  currentRecording: null,
  isLoading: false,
  error: null,

  // Meeting actions
  addMeeting: (meeting) => {
    set((state) => ({
      meetings: [...state.meetings, meeting],
    }));
  },

  updateMeeting: (id, updates) => {
    set((state) => ({
      meetings: state.meetings.map((meeting) =>
        meeting.id === id ? { ...meeting, ...updates, updatedAt: new Date() } : meeting
      ),
    }));
  },

  deleteMeeting: (id) => {
    set((state) => ({
      meetings: state.meetings.filter((meeting) => meeting.id !== id),
    }));
  },

  getMeetingById: (id) => {
    return get().meetings.find((meeting) => meeting.id === id);
  },

  getMeetingsByFolder: (folderId) => {
    return get().meetings.filter((meeting) => meeting.folderId === folderId);
  },

  searchMeetings: (query) => {
    const meetings = get().meetings;
    const lowercaseQuery = query.toLowerCase();
    
    return meetings.filter((meeting) =>
      meeting.title.toLowerCase().includes(lowercaseQuery) ||
      meeting.attendees.some((attendee) =>
        attendee.toLowerCase().includes(lowercaseQuery)
      ) ||
      meeting.tags.some((tag) =>
        tag.toLowerCase().includes(lowercaseQuery)
      )
    );
  },

  filterMeetings: (filters) => {
    let meetings = get().meetings;

    if (filters.dateRange) {
      meetings = meetings.filter((meeting) => {
        const meetingDate = new Date(meeting.date);
        return meetingDate >= filters.dateRange!.start && meetingDate <= filters.dateRange!.end;
      });
    }

    if (filters.folderId) {
      meetings = meetings.filter((meeting) => meeting.folderId === filters.folderId);
    }

    if (filters.tags && filters.tags.length > 0) {
      meetings = meetings.filter((meeting) =>
        filters.tags!.some((tag) => meeting.tags.includes(tag))
      );
    }

    if (filters.attendees && filters.attendees.length > 0) {
      meetings = meetings.filter((meeting) =>
        filters.attendees!.some((attendee) => meeting.attendees.includes(attendee))
      );
    }

    if (filters.platform && filters.platform.length > 0) {
      meetings = meetings.filter((meeting) =>
        meeting.platform && filters.platform!.includes(meeting.platform)
      );
    }

    if (filters.hasTranscript !== undefined) {
      meetings = meetings.filter((meeting) =>
        filters.hasTranscript ? !!meeting.transcriptUrl : !meeting.transcriptUrl
      );
    }

    if (filters.hasSummary !== undefined) {
      meetings = meetings.filter((meeting) =>
        filters.hasSummary ? !!meeting.summary : !meeting.summary
      );
    }

    return meetings;
  },

  // Recording actions
  startRecording: (meetingTitle) => {
    set({
      currentRecording: {
        isRecording: true,
        isPaused: false,
        duration: 0,
        audioLevels: [],
      },
    });
  },

  pauseRecording: () => {
    set((state) => ({
      currentRecording: state.currentRecording
        ? { ...state.currentRecording, isPaused: true }
        : null,
    }));
  },

  resumeRecording: () => {
    set((state) => ({
      currentRecording: state.currentRecording
        ? { ...state.currentRecording, isPaused: false }
        : null,
    }));
  },

  stopRecording: () => {
    set({ currentRecording: null });
  },

  updateRecordingDuration: (duration) => {
    set((state) => ({
      currentRecording: state.currentRecording
        ? { ...state.currentRecording, duration }
        : null,
    }));
  },

  updateAudioLevels: (levels) => {
    set((state) => ({
      currentRecording: state.currentRecording
        ? { ...state.currentRecording, audioLevels: levels }
        : null,
    }));
  },

  // Utility actions
  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  setError: (error) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },
}));