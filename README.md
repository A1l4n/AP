# Cereal - Meeting Recording & Transcription App

A React Native Android application for recording, transcribing, and summarizing meetings with AI-powered features.

## 🌟 Features

### Current (Phase 1 - Foundation) ✅
- ✅ Modern UI with React Native Paper
- ✅ Dark/Light theme support
- ✅ Bottom tab navigation
- ✅ State management with Zustand
- ✅ Type-safe TypeScript implementation
- ✅ Firebase integration setup
- ✅ Local storage management
- ✅ Settings persistence

### Upcoming Features
- 🔄 **Phase 2**: High-quality audio recording with background support
- 🔄 **Phase 3**: AI-powered transcription and summarization
- 🔄 **Phase 4**: Calendar integration (Google Calendar, Outlook)
- 🔄 **Phase 5**: Video platform integrations (Teams, Zoom, Meet)
- 🔄 **Phase 6**: Folder organization and tagging system
- 🔄 **Phase 7**: Full-text search and advanced filtering
- 🔄 **Phase 8**: Testing and production release

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android development)
- An Android device or emulator

### Installation

1. **Clone the repository**
   ```bash
   cd /path/to/cereal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your actual API keys and configuration.

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on Android**
   ```bash
   npm run android
   ```

## 📱 Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **UI Library**: React Native Paper
- **Navigation**: React Navigation v6
- **State Management**: Zustand
- **Animations**: React Native Reanimated 2
- **Backend**: Firebase (Firestore, Storage, Auth)
- **Audio**: Expo AV
- **Calendar**: Expo Calendar

## 🏗️ Project Structure

```
cereal/
├── App.tsx                 # Main app entry point
├── app.json               # Expo configuration
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript configuration
└── src/
    ├── components/        # Reusable UI components
    │   ├── common/       # Common components (Button, Card, Input)
    │   ├── meeting/      # Meeting-related components
    │   ├── recording/    # Recording-related components
    │   ├── calendar/     # Calendar components
    │   └── folder/       # Folder components
    ├── screens/          # App screens
    │   ├── HomeScreen.tsx
    │   ├── RecordingScreen.tsx
    │   ├── MeetingDetailScreen.tsx
    │   ├── CalendarScreen.tsx
    │   ├── FoldersScreen.tsx
    │   └── SettingsScreen.tsx
    ├── navigation/       # Navigation configuration
    │   ├── AppNavigator.tsx
    │   └── TabNavigator.tsx
    ├── services/         # Business logic and API services
    │   ├── firebase.ts
    │   ├── storageService.ts
    │   └── (more services to come)
    ├── store/           # Zustand state stores
    │   ├── meetingStore.ts
    │   ├── userStore.ts
    │   └── settingsStore.ts
    ├── types/           # TypeScript type definitions
    │   ├── meeting.ts
    │   ├── folder.ts
    │   ├── calendar.ts
    │   └── index.ts
    ├── utils/           # Utility functions
    │   ├── permissions.ts
    │   ├── dateFormatter.ts
    │   └── fileManager.ts
    ├── constants/       # App constants and themes
    │   ├── theme.ts
    │   └── config.ts
    └── assets/          # Images and static assets
```

## 🎨 Design System

### Color Palette
- **Primary**: #6366F1 (Indigo)
- **Secondary**: #8B5CF6 (Purple)
- **Accent**: #EC4899 (Pink)
- **Success**: #10B981 (Green)
- **Warning**: #F59E0B (Amber)
- **Error**: #EF4444 (Red)

### Typography
- **Headings**: Inter Bold
- **Body**: Inter Regular
- **Mono**: JetBrains Mono

### Spacing System
4px base unit: 4, 8, 12, 16, 24, 32, 48, 64

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication, Firestore, and Storage
3. Download the configuration and add to `.env`
4. Set up Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### API Keys Required

- **Firebase**: For authentication and data storage
- **AssemblyAI** or **Deepgram**: For transcription (Phase 3)
- **OpenAI** or **Claude**: For AI summaries (Phase 3)
- **Microsoft Teams API**: For Teams integration (Phase 5)
- **Zoom API**: For Zoom integration (Phase 5)
- **Google Calendar API**: For calendar integration (Phase 4)

## 📖 Usage

### Current Features

1. **Home Screen**: View recent recordings and upcoming meetings
2. **Calendar**: Connect your calendar (coming soon)
3. **Folders**: Organize meetings into folders (coming soon)
4. **Settings**: Customize theme, audio quality, and notifications

### Upcoming Features

- **Recording**: Tap the FAB button to start recording a meeting
- **Transcription**: Automatic transcription after recording
- **AI Summary**: Get AI-generated summaries and action items
- **Search**: Full-text search across all transcripts

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run linter
npm run lint
```

## 📦 Building for Production

### Android

```bash
# Build APK
expo build:android -t apk

# Build AAB (for Play Store)
expo build:android -t app-bundle
```

## 🤝 Contributing

This is a development project. Key areas for contribution:
- Phase 2: Audio recording implementation
- Phase 3: Transcription and AI integration
- Phase 4: Calendar integration
- UI/UX improvements

## 📝 Development Roadmap

### ✅ Phase 1: Foundation (Completed)
- [x] Project setup with Expo and TypeScript
- [x] Design system implementation
- [x] Basic UI components
- [x] Navigation structure
- [x] State management
- [x] Firebase configuration

### 🔄 Phase 2: Core Recording (In Progress)
- [ ] Audio recording with expo-av
- [ ] Real-time waveform visualization
- [ ] Background recording capability
- [ ] Pause/resume functionality
- [ ] Audio playback with scrubbing
- [ ] Storage management

### 📅 Phase 3: Transcription & AI
- [ ] AssemblyAI integration
- [ ] Transcript processing
- [ ] OpenAI integration for summaries
- [ ] Action item extraction
- [ ] Meeting detail screen

### 📅 Phase 4: Calendar Integration
- [ ] Calendar permissions
- [ ] Fetch upcoming meetings
- [ ] Link recordings to events
- [ ] Quick-start from calendar

### 📅 Phase 5: Platform Integrations
- [ ] Microsoft Teams integration
- [ ] Zoom integration
- [ ] Google Meet detection
- [ ] Auto-start recording

### 📅 Phase 6: Organization
- [ ] Folder system
- [ ] Tagging system
- [ ] Smart folders with AI
- [ ] Bulk operations

### 📅 Phase 7: Search & Polish
- [ ] Full-text search
- [ ] Advanced filtering
- [ ] Performance optimization
- [ ] Animation refinements

### 📅 Phase 8: Testing & Launch
- [ ] Unit tests
- [ ] Integration tests
- [ ] User testing
- [ ] Play Store release

## 🐛 Known Issues

- None currently (Phase 1 complete)

## 📄 License

This project is for development purposes.

## 🙏 Acknowledgments

- Inspired by Granola and similar meeting recording apps
- Built with React Native and Expo
- UI components from React Native Paper

## 📞 Support

For issues or questions, please check the documentation or create an issue.

---

**Current Status**: Phase 1 (Foundation) Complete ✅

**Next Steps**: Implement Phase 2 (Core Recording Features)
