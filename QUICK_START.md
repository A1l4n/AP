# Cereal - Quick Start Guide

Get up and running in 5 minutes! 🚀

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js v16+ installed (`node --version`)
- ✅ npm or yarn installed (`npm --version`)
- ✅ Android Studio with emulator OR physical Android device

## 5-Minute Setup

### 1. Install Dependencies (2 minutes)

```bash
cd /workspace
npm install
```

### 2. Set Up Environment (1 minute)

```bash
cp .env.example .env
```

**For quick testing**, you can use placeholder values in `.env` - Firebase features will be disabled but the app will run:

```env
FIREBASE_API_KEY=placeholder
FIREBASE_AUTH_DOMAIN=placeholder
FIREBASE_PROJECT_ID=placeholder
FIREBASE_STORAGE_BUCKET=placeholder
FIREBASE_MESSAGING_SENDER_ID=placeholder
FIREBASE_APP_ID=placeholder
```

> **Note**: For production use, you MUST set up real Firebase credentials. See [SETUP.md](SETUP.md) for details.

### 3. Start the App (2 minutes)

```bash
# Start Expo dev server
npm start
```

Then choose one:

**Option A: Android Emulator**
- Press `a` in the terminal

**Option B: Physical Device**
1. Install "Expo Go" from Play Store
2. Scan the QR code shown in terminal

---

## What You'll See

Once the app loads, you'll have access to:

### 🏠 Home Screen
- Search bar at top
- "Upcoming Meetings" section (empty for now)
- "Recent Recordings" section (empty for now)
- Floating "Record" button (bottom right)

### 📅 Calendar Tab
- Placeholder for calendar integration (Phase 4)

### 📁 Folders Tab
- Placeholder for folder organization (Phase 6)

### ⚙️ Settings Tab
- **Theme**: Toggle between Light/Dark/Auto
- **Audio Quality**: Choose Low/Medium/High
- **Auto-start Recording**: Enable/disable
- **Notifications**: Enable/disable

---

## Try These Features

✅ **Theme Switching**
1. Go to Settings tab
2. Tap "Theme" repeatedly
3. Watch the app switch between Light/Dark/Auto modes

✅ **Settings Persistence**
1. Change any setting
2. Close the app completely
3. Reopen - your settings are saved!

✅ **Navigation**
- Tap between tabs to see smooth transitions
- Tap the Record FAB button (shows placeholder)

---

## Troubleshooting

### "expo: command not found"
```bash
npm install -g expo-cli
```

### "Unable to resolve module..."
```bash
rm -rf node_modules
npm install
expo start -c
```

### App won't load on device
- Ensure phone and computer are on same WiFi
- Try scanning QR code again
- Check that Expo Go is up to date

### Android build fails
```bash
cd android
./gradlew clean
cd ..
expo start -c
```

---

## Next Steps

### For Developers

1. **Read the Documentation**
   - [README.md](README.md) - Project overview
   - [PROJECT_STATUS.md](PROJECT_STATUS.md) - Current status
   - [CONTRIBUTING.md](CONTRIBUTING.md) - Development guide

2. **Explore the Code**
   - Check out `src/screens/HomeScreen.tsx`
   - Review `src/constants/theme.ts` for design system
   - Look at `src/store/` for state management

3. **Start Building**
   - Phase 1 is complete ✅
   - Ready to implement Phase 2 (Audio Recording)
   - See [PROJECT_STATUS.md](PROJECT_STATUS.md) for roadmap

### For Production Use

1. **Set Up Firebase** (Required)
   - Create Firebase project
   - Enable Authentication, Firestore, Storage
   - Update `.env` with real credentials
   - See [SETUP.md](SETUP.md) for detailed instructions

2. **Get API Keys** (For later phases)
   - AssemblyAI for transcription (Phase 3)
   - OpenAI for AI summaries (Phase 3)
   - Calendar API credentials (Phase 4)
   - Video platform credentials (Phase 5)

---

## File Structure Overview

```
/workspace/
├── App.tsx                  # Main app entry
├── src/
│   ├── screens/            # App screens
│   ├── components/         # Reusable UI components
│   ├── navigation/         # Navigation config
│   ├── store/             # State management (Zustand)
│   ├── services/          # Business logic
│   ├── types/             # TypeScript types
│   ├── utils/             # Utilities
│   └── constants/         # Theme, config
├── package.json           # Dependencies
└── Documentation files    # README, SETUP, etc.
```

---

## Current Features

✅ **Phase 1 Complete**
- Modern UI with React Native Paper
- Dark/Light theme support
- Bottom tab navigation
- Settings with persistence
- Type-safe TypeScript
- Firebase integration ready
- Clean architecture

🔄 **Coming Next (Phase 2)**
- Audio recording
- Waveform visualization
- Meeting playback
- Storage management

---

## Common Commands

```bash
# Start dev server
npm start

# Run on Android
npm run android

# Run tests
npm test

# Lint code
npm run lint

# Clear cache
expo start -c

# Fresh install
rm -rf node_modules && npm install
```

---

## Getting Help

- **Setup Issues**: See [SETUP.md](SETUP.md)
- **Development Questions**: See [CONTRIBUTING.md](CONTRIBUTING.md)
- **API Integration**: See [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- **Project Status**: See [PROJECT_STATUS.md](PROJECT_STATUS.md)

---

## What's Working Now

✅ Beautiful, modern UI  
✅ Smooth animations  
✅ Theme switching  
✅ Settings persistence  
✅ Tab navigation  
✅ Type-safe code  

## What's Coming Soon

🔄 Audio recording (Phase 2)  
🔄 AI transcription (Phase 3)  
🔄 AI summaries (Phase 3)  
🔄 Calendar sync (Phase 4)  
🔄 Teams/Zoom integration (Phase 5)  
🔄 Folder organization (Phase 6)  
🔄 Search (Phase 7)  

---

**That's it! You're ready to go!** 🎉

Start exploring the app and check out the code. Phase 1 is complete and Phase 2 is ready to begin!
