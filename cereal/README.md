# Cereal - Meeting Recording & Transcription App

A React Native Android application for recording, transcribing, and summarizing meetings with AI-powered insights.

## Features

- 🎙️ **High-Quality Recording**: Record meetings with 48kHz audio quality
- 📝 **AI Transcription**: Real-time or post-recording transcription with speaker identification
- 🤖 **Smart Summaries**: AI-generated executive summaries, action items, and key decisions
- 📅 **Calendar Integration**: Sync with Google Calendar and Outlook
- 🔗 **Platform Integration**: Connect with Microsoft Teams, Zoom, and Google Meet
- 📁 **Organization**: Create folders and smart categorization
- 🔍 **Search**: Full-text search across transcripts and meeting data
- 🎨 **Modern UI**: Fluid animations and intuitive design

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **UI Library**: React Native Paper
- **Navigation**: React Navigation v6
- **State Management**: Zustand
- **Animations**: React Native Reanimated 2
- **Backend**: Firebase (Firestore, Storage, Auth)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Firebase project setup

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cereal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   
   EXPO_PUBLIC_ASSEMBLYAI_API_KEY=your_assemblyai_api_key
   EXPO_PUBLIC_OPENAI_API_KEY=your_openai_api_key
   EXPO_PUBLIC_DEEPGRAM_API_KEY=your_deepgram_api_key
   
   EXPO_PUBLIC_TEAMS_CLIENT_ID=your_teams_client_id
   EXPO_PUBLIC_ZOOM_CLIENT_ID=your_zoom_client_id
   EXPO_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. **Set up Firebase**
   - Create a Firebase project
   - Enable Firestore, Storage, and Authentication
   - Download `google-services.json` and place it in the `android/app/` directory
   - Configure Firebase rules for Firestore and Storage

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Run on Android**
   ```bash
   npm run android
   ```

## Project Structure

```
cereal/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Basic components (Button, Card, Input)
│   │   ├── meeting/        # Meeting-specific components
│   │   ├── recording/      # Recording components
│   │   ├── calendar/       # Calendar components
│   │   └── folder/         # Folder management components
│   ├── screens/            # Screen components
│   ├── navigation/          # Navigation configuration
│   ├── services/           # API and business logic services
│   ├── hooks/              # Custom React hooks
│   ├── store/              # Zustand state management
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── constants/          # App constants and theme
│   └── assets/             # Images and animations
├── app.json               # Expo configuration
├── package.json           # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Development Phases

### Phase 1: Foundation ✅
- [x] Set up Expo project with TypeScript
- [x] Configure React Navigation
- [x] Implement design system (theme, colors, typography)
- [x] Create basic UI components (Button, Card, Input)
- [x] Set up Firebase project structure
- [x] Build Home Screen skeleton

### Phase 2: Core Recording (In Progress)
- [ ] Implement audio recording with permissions
- [ ] Build RecordingScreen with UI
- [ ] Add real-time waveform visualization
- [ ] Implement background recording
- [ ] Add audio playback functionality
- [ ] Storage management system

### Phase 3: Transcription & AI
- [ ] Integrate transcription API (AssemblyAI/Deepgram)
- [ ] Build transcription processing pipeline
- [ ] Integrate OpenAI/Claude API for summaries
- [ ] Implement action item extraction
- [ ] Build MeetingDetailScreen with tabs

### Phase 4: Calendar Integration
- [ ] Implement calendar permissions and access
- [ ] Build CalendarScreen with views
- [ ] Parse meeting metadata
- [ ] Link recordings to calendar events
- [ ] Quick-start recording from calendar

### Phase 5: Platform Integrations
- [ ] Microsoft Teams OAuth and API integration
- [ ] Zoom API integration
- [ ] Google Meet detection
- [ ] Auto-start recording feature
- [ ] Settings for integration management

### Phase 6: Organization
- [ ] Build folder system with Firestore
- [ ] Implement drag-and-drop
- [ ] Tag system and management
- [ ] Smart folders with AI categorization
- [ ] Bulk operations

### Phase 7: Search & Polish
- [ ] Implement full-text search
- [ ] Advanced filtering system
- [ ] Search suggestions and history
- [ ] Performance optimization
- [ ] Animation refinements

### Phase 8: Testing & Launch
- [ ] Unit tests for services
- [ ] Integration tests for critical flows
- [ ] User testing and feedback
- [ ] Bug fixes and optimization
- [ ] Play Store preparation

## API Keys Required

### Transcription Services
- **AssemblyAI**: For high-quality transcription with speaker diarization
- **Deepgram**: Alternative transcription service
- **OpenAI**: For AI-powered summaries and action item extraction

### Platform Integrations
- **Microsoft Teams**: Graph API for Teams integration
- **Zoom**: Zoom API for meeting management
- **Google**: Calendar API and Meet integration

## Permissions

The app requires the following permissions:

### Android
- `RECORD_AUDIO`: For recording meetings
- `WRITE_EXTERNAL_STORAGE`: For saving audio files
- `READ_EXTERNAL_STORAGE`: For accessing saved files
- `READ_CALENDAR`: For calendar integration
- `WRITE_CALENDAR`: For creating calendar events
- `INTERNET`: For API calls
- `ACCESS_NETWORK_STATE`: For network status
- `WAKE_LOCK`: For background recording
- `FOREGROUND_SERVICE`: For background tasks

### iOS
- `NSMicrophoneUsageDescription`: For recording meetings
- `NSCalendarsUsageDescription`: For calendar access
- `NSCalendarsWriteOnlyAccessUsageDescription`: For calendar events

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@cereal.app or join our Discord community.

## Roadmap

- [ ] iOS support
- [ ] Desktop app (Electron)
- [ ] Advanced AI features (sentiment analysis, meeting insights)
- [ ] Team collaboration features
- [ ] Enterprise features (SSO, admin controls)
- [ ] API for third-party integrations