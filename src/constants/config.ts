// Firebase Configuration
// NOTE: Replace these with your actual Firebase config values
export const FIREBASE_CONFIG = {
  apiKey: process.env.FIREBASE_API_KEY || 'YOUR_API_KEY',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'YOUR_AUTH_DOMAIN',
  projectId: process.env.FIREBASE_PROJECT_ID || 'YOUR_PROJECT_ID',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'YOUR_STORAGE_BUCKET',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || 'YOUR_MESSAGING_SENDER_ID',
  appId: process.env.FIREBASE_APP_ID || 'YOUR_APP_ID',
};

// API Configuration
export const API_CONFIG = {
  // AssemblyAI for transcription
  assemblyAiApiKey: process.env.ASSEMBLYAI_API_KEY || '',
  assemblyAiBaseUrl: 'https://api.assemblyai.com/v2',
  
  // OpenAI for AI summaries
  openAiApiKey: process.env.OPENAI_API_KEY || '',
  openAiBaseUrl: 'https://api.openai.com/v1',
  openAiModel: 'gpt-4-turbo-preview',
  
  // Microsoft Teams
  teamsClientId: process.env.TEAMS_CLIENT_ID || '',
  teamsClientSecret: process.env.TEAMS_CLIENT_SECRET || '',
  teamsRedirectUri: 'cereal://auth/teams',
  
  // Zoom
  zoomClientId: process.env.ZOOM_CLIENT_ID || '',
  zoomClientSecret: process.env.ZOOM_CLIENT_SECRET || '',
  zoomRedirectUri: 'cereal://auth/zoom',
  
  // Google Meet (via Google Calendar API)
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  googleRedirectUri: 'cereal://auth/google',
};

// Audio Recording Configuration
export const AUDIO_CONFIG = {
  sampleRate: 48000, // 48kHz
  numberOfChannels: 1, // Mono
  bitRate: 128000, // 128kbps
  format: 'aac',
  fileExtension: '.m4a',
  
  // Quality presets
  quality: {
    low: {
      sampleRate: 16000,
      bitRate: 64000,
    },
    medium: {
      sampleRate: 44100,
      bitRate: 128000,
    },
    high: {
      sampleRate: 48000,
      bitRate: 256000,
    },
  },
};

// Storage Configuration
export const STORAGE_CONFIG = {
  maxAudioFileSize: 500 * 1024 * 1024, // 500MB
  minStorageSpaceRequired: 100 * 1024 * 1024, // 100MB
  audioDirectory: 'cereal/recordings',
  transcriptDirectory: 'cereal/transcripts',
};

// App Configuration
export const APP_CONFIG = {
  maxMeetingDuration: 4 * 60 * 60, // 4 hours in seconds
  autoSaveInterval: 60, // Auto-save every 60 seconds
  searchDebounceMs: 300,
  maxRecentSearches: 10,
  maxSearchResults: 50,
  transcriptionLanguage: 'en',
  defaultMeetingTitle: 'Untitled Meeting',
};

// Performance Thresholds
export const PERFORMANCE_CONFIG = {
  maxAppLaunchTime: 2000, // 2 seconds
  maxRecordingStartTime: 500, // 500ms
  maxSearchTime: 1000, // 1 second
  targetFPS: 60,
  maxAudioPlaybackLatency: 100, // 100ms
};
