import 'dotenv/config';

export default {
  expo: {
    name: 'Cereal',
    slug: 'cereal',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      permissions: [
        'RECORD_AUDIO',
        'READ_CALENDAR',
        'WRITE_CALENDAR',
        'WRITE_EXTERNAL_STORAGE',
        'READ_EXTERNAL_STORAGE',
      ],
      package: 'com.example.cereal',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      eas: {
        projectId: process.env.EAS_PROJECT_ID ?? '',
      },
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY ?? '',
        authDomain: process.env.FIREBASE_AUTH_DOMAIN ?? '',
        projectId: process.env.FIREBASE_PROJECT_ID ?? '',
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET ?? '',
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID ?? '',
        appId: process.env.FIREBASE_APP_ID ?? '',
        measurementId: process.env.FIREBASE_MEASUREMENT_ID ?? '',
      },
      assemblyAiApiKey: process.env.ASSEMBLYAI_API_KEY ?? '',
      deepgramApiKey: process.env.DEEPGRAM_API_KEY ?? '',
      openaiApiKey: process.env.OPENAI_API_KEY ?? '',
      algoliaAppId: process.env.ALGOLIA_APP_ID ?? '',
      algoliaApiKey: process.env.ALGOLIA_API_KEY ?? '',
      zoomClientId: process.env.ZOOM_CLIENT_ID ?? '',
      zoomClientSecret: process.env.ZOOM_CLIENT_SECRET ?? '',
      msClientId: process.env.MS_CLIENT_ID ?? '',
      msClientSecret: process.env.MS_CLIENT_SECRET ?? '',
      googleClientId: process.env.GOOGLE_CLIENT_ID ?? '',
      googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    },
  },
};
