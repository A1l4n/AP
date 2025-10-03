# Cereal - Meeting Recording & Transcription App

A React Native Android application for recording, transcribing, and summarizing meetings with AI-powered features.

## 🚀 Features

### Core Features
- **High-Quality Audio Recording**: 48kHz sample rate, AAC format with background recording capability
- **Real-Time Transcription**: Powered by AssemblyAI or Deepgram with speaker diarization
- **AI-Powered Summaries**: Generate executive summaries, extract action items, and identify key decisions
- **Calendar Integration**: Sync with Google Calendar and Outlook for automatic meeting detection
- **Video Platform Integration**: Microsoft Teams, Zoom, and Google Meet integration
- **Smart Organization**: Folder system with AI-generated smart folders and tagging
- **Advanced Search**: Full-text search across transcripts with filtering options

### UI/UX Features
- **Modern Design**: Clean, intuitive interface with smooth animations
- **Dark/Light Mode**: Automatic theme switching based on system preferences
- **Responsive Layout**: Optimized for various screen sizes
- **Accessibility**: Full accessibility support with screen reader compatibility

## 🛠 Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **UI Library**: React Native Paper
- **Navigation**: React Navigation v6
- **State Management**: Zustand
- **Animations**: React Native Reanimated 2
- **Backend**: Firebase (Firestore, Storage, Auth)
- **Audio**: react-native-audio-recorder-player
- **Calendar**: expo-calendar
- **Storage**: AsyncStorage & SecureStore

## 📱 Screenshots

*Screenshots will be added once the app is built*

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Android Studio (for Android development)
- Firebase project (for backend services)

### Installation

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
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   EXPO_PUBLIC_ASSEMBLY_AI_API_KEY=your_assembly_ai_key
   EXPO_PUBLIC_OPENAI_API_KEY=your_openai_key
   EXPO_PUBLIC_DEEPGRAM_API_KEY=your_deepgram_key
   EXPO_PUBLIC_MS_TEAMS_CLIENT_ID=your_teams_client_id
   EXPO_PUBLIC_ZOOM_CLIENT_ID=your_zoom_client_id
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on Android**
   ```bash
   npm run android
   ```

## 🔧 Configuration

### Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication, Firestore, and Storage
3. Add your Android app to the project
4. Download `google-services.json` and place it in the `android/app/` directory
5. Update the environment variables with your Firebase configuration

### API Keys Setup

#### AssemblyAI (Transcription)
1. Sign up at [AssemblyAI](https://www.assemblyai.com/)
2. Get your API key from the dashboard
3. Add it to your `.env` file

#### OpenAI (AI Summaries)
1. Sign up at [OpenAI](https://platform.openai.com/)
2. Create an API key
3. Add it to your `.env` file

#### Microsoft Teams Integration
1. Register your app in [Azure Portal](https://portal.azure.com/)
2. Configure OAuth 2.0 settings
3. Add client ID to your `.env` file

#### Zoom Integration
1. Create a Zoom app in [Zoom Marketplace](https://marketplace.zoom.us/)
2. Configure OAuth settings
3. Add client ID to your `.env` file

## 📁 Project Structure

```
cereal/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Common components (Button, Card, Input)
│   │   ├── meeting/        # Meeting-specific components
│   │   ├── recording/      # Recording components
│   │   ├── calendar/       # Calendar components
│   │   └── folder/         # Folder components
│   ├── screens/            # Screen components
│   ├── navigation/         # Navigation configuration
│   ├── services/           # API and external service integrations
│   ├── hooks/              # Custom React hooks
│   ├── store/              # Zustand state management
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── constants/          # App constants and configuration
│   └── assets/             # Images, animations, etc.
├── android/                # Android-specific code
├── ios/                    # iOS-specific code (if needed)
└── app.json               # Expo configuration
```

## 🎯 Development Phases

### Phase 1: Foundation ✅
- [x] Expo project setup with TypeScript
- [x] React Navigation configuration
- [x] Design system implementation
- [x] Basic UI components
- [x] Home screen skeleton

### Phase 2: Core Recording (In Progress)
- [ ] Audio recording implementation
- [ ] Background recording capability
- [ ] Real-time waveform visualization
- [ ] Audio playback functionality
- [ ] Storage management

### Phase 3: Transcription & AI
- [ ] AssemblyAI/Deepgram integration
- [ ] Transcription processing pipeline
- [ ] OpenAI/Claude integration for summaries
- [ ] Action item extraction
- [ ] Meeting detail screen with tabs

### Phase 4: Calendar Integration
- [ ] Calendar permissions and access
- [ ] Calendar screen implementation
- [ ] Meeting metadata parsing
- [ ] Recording-to-calendar linking

### Phase 5: Platform Integrations
- [ ] Microsoft Teams OAuth integration
- [ ] Zoom API integration
- [ ] Google Meet detection
- [ ] Auto-start recording feature

### Phase 6: Organization
- [ ] Folder system with Firestore
- [ ] Drag-and-drop functionality
- [ ] Tag system implementation
- [ ] Smart folders with AI categorization

### Phase 7: Search & Polish
- [ ] Full-text search implementation
- [ ] Advanced filtering system
- [ ] Search suggestions and history
- [ ] Performance optimization

### Phase 8: Testing & Launch
- [ ] Unit tests for services
- [ ] Integration tests
- [ ] User testing and feedback
- [ ] Play Store preparation

## 🔒 Permissions

The app requires the following permissions:

- **RECORD_AUDIO**: For recording meetings
- **WRITE_EXTERNAL_STORAGE**: For saving recordings
- **READ_CALENDAR**: For calendar integration
- **WRITE_CALENDAR**: For linking recordings to events
- **NOTIFICATIONS**: For meeting reminders

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
```

## 📦 Building for Production

### Android

1. **Generate signed APK**
   ```bash
   expo build:android
   ```

2. **Build AAB for Play Store**
   ```bash
   expo build:android --type app-bundle
   ```

### Environment-specific builds

```bash
# Development build
expo build:android --type apk --release-channel development

# Production build
expo build:android --type apk --release-channel production
```

## 🚨 Known Issues

- Audio recording may not work in some Android emulators
- Background recording requires additional permissions on some devices
- Calendar integration may be limited on certain Android versions

## 🔮 Future Enhancements

- [ ] iOS support
- [ ] Web application
- [ ] Desktop application
- [ ] Advanced AI features (sentiment analysis, topic modeling)
- [ ] Team collaboration features
- [ ] Integration with more video platforms
- [ ] Offline mode support
- [ ] Advanced export options (PDF, Word, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@cereal-app.com or join our Discord community.

## 🙏 Acknowledgments

- React Native team for the amazing framework
- Expo team for the development tools
- Firebase team for the backend services
- AssemblyAI and OpenAI for AI capabilities
- All contributors and testers

---

**Cereal** - Making meetings more productive, one recording at a time! 🥣