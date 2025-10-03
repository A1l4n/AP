// Firebase configuration
// TODO: Replace with your actual Firebase project configuration
export const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};

// API Keys for external services
// TODO: Replace with your actual API keys
export const apiKeys = {
  assemblyAI: {
    apiKey: process.env.EXPO_PUBLIC_ASSEMBLY_AI_KEY || "your-assembly-ai-key",
  },
  openAI: {
    apiKey: process.env.EXPO_PUBLIC_OPENAI_KEY || "your-openai-key",
  },
  deepgram: {
    apiKey: process.env.EXPO_PUBLIC_DEEPGRAM_KEY || "your-deepgram-key",
  },
};

// App configuration
export const appConfig = {
  appName: "Cereal",
  version: "1.0.0",
  buildNumber: "1",
  environment: __DEV__ ? "development" : "production",

  // Recording settings
  recording: {
    sampleRate: 48000,
    format: "aac",
    quality: "high",
  },

  // Storage settings
  storage: {
    maxRecordingSize: 500 * 1024 * 1024, // 500MB
    autoCleanupThreshold: 80, // 80% storage usage
  },

  // UI settings
  ui: {
    animationDuration: 300,
    hapticFeedback: true,
    enableDarkMode: true,
  },
};