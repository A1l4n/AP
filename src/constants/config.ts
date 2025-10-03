export const config = {
  // API Keys - These should be set in environment variables
  ASSEMBLY_AI_API_KEY: process.env.EXPO_PUBLIC_ASSEMBLY_AI_API_KEY || '',
  OPENAI_API_KEY: process.env.EXPO_PUBLIC_OPENAI_API_KEY || '',
  DEEPGRAM_API_KEY: process.env.EXPO_PUBLIC_DEEPGRAM_API_KEY || '',
  
  // Firebase Configuration
  FIREBASE_CONFIG: {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '',
  },
  
  // Audio Recording Settings
  AUDIO_SETTINGS: {
    sampleRate: 48000,
    channels: 1,
    bitRate: 128000,
    format: 'aac' as const,
    quality: 'high' as const,
  },
  
  // App Settings
  APP_SETTINGS: {
    maxRecordingDuration: 4 * 60 * 60, // 4 hours in seconds
    autoSaveInterval: 30, // seconds
    maxFileSize: 100 * 1024 * 1024, // 100MB
    transcriptionTimeout: 300, // 5 minutes
  },
  
  // Platform Integration Settings
  PLATFORM_INTEGRATIONS: {
    microsoftTeams: {
      clientId: process.env.EXPO_PUBLIC_MS_TEAMS_CLIENT_ID || '',
      redirectUri: process.env.EXPO_PUBLIC_MS_TEAMS_REDIRECT_URI || '',
    },
    zoom: {
      clientId: process.env.EXPO_PUBLIC_ZOOM_CLIENT_ID || '',
      redirectUri: process.env.EXPO_PUBLIC_ZOOM_REDIRECT_URI || '',
    },
  },
  
  // Storage Paths
  STORAGE_PATHS: {
    recordings: 'recordings/',
    transcripts: 'transcripts/',
    exports: 'exports/',
  },
};