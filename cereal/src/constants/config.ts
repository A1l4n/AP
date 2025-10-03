export const config = {
  // API Configuration
  api: {
    assemblyAI: {
      baseUrl: 'https://api.assemblyai.com/v2',
      // API key will be set via environment variables
    },
    openAI: {
      baseUrl: 'https://api.openai.com/v1',
      // API key will be set via environment variables
    },
    deepgram: {
      baseUrl: 'https://api.deepgram.com/v1',
      // API key will be set via environment variables
    },
  },
  
  // Audio Configuration
  audio: {
    sampleRate: 48000,
    channels: 1,
    bitRate: 128000,
    format: 'aac',
    maxDuration: 3600, // 1 hour in seconds
  },
  
  // Storage Configuration
  storage: {
    maxFileSize: 100 * 1024 * 1024, // 100MB
    compressionQuality: 0.8,
    cacheSize: 50 * 1024 * 1024, // 50MB
  },
  
  // Recording Configuration
  recording: {
    autoSaveInterval: 30000, // 30 seconds
    backgroundRecordingTimeout: 300000, // 5 minutes
    maxConcurrentRecordings: 1,
  },
  
  // Transcription Configuration
  transcription: {
    maxRetries: 3,
    retryDelay: 5000, // 5 seconds
    pollingInterval: 2000, // 2 seconds
    supportedLanguages: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh'],
  },
  
  // AI Configuration
  ai: {
    maxTokens: 4000,
    temperature: 0.7,
    model: 'gpt-4',
    maxSummaryLength: 500,
  },
  
  // Calendar Configuration
  calendar: {
    syncInterval: 300000, // 5 minutes
    maxEventsToSync: 100,
    lookAheadDays: 30,
  },
  
  // Platform Integrations
  platforms: {
    teams: {
      clientId: process.env.EXPO_PUBLIC_TEAMS_CLIENT_ID,
      redirectUri: 'cereal://teams-auth',
    },
    zoom: {
      clientId: process.env.EXPO_PUBLIC_ZOOM_CLIENT_ID,
      redirectUri: 'cereal://zoom-auth',
    },
    google: {
      clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
      redirectUri: 'cereal://google-auth',
    },
  },
  
  // Firebase Configuration
  firebase: {
    // Configuration will be loaded from firebase config file
  },
  
  // App Configuration
  app: {
    name: 'Cereal',
    version: '1.0.0',
    minAndroidVersion: 21,
    supportedPlatforms: ['android'],
  },
} as const;