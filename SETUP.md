# Cereal App - Setup Guide

## Quick Start

Follow these steps to get the Cereal app running on your development machine.

## Prerequisites

### Required Software

1. **Node.js** (v16 or higher)
   - Download from: https://nodejs.org/
   - Verify: `node --version`

2. **npm** (comes with Node.js) or **yarn**
   - Verify: `npm --version`

3. **Expo CLI**
   ```bash
   npm install -g expo-cli
   ```
   - Verify: `expo --version`

4. **Android Studio** (for Android development)
   - Download from: https://developer.android.com/studio
   - Install Android SDK and emulator
   - Set up Android environment variables

5. **Git**
   - Download from: https://git-scm.com/

### Optional
- **Expo Go app** on your Android device (for testing on real device)
- **VS Code** or your preferred code editor

## Step-by-Step Setup

### 1. Install Dependencies

Navigate to the project directory and install dependencies:

```bash
cd /workspace
npm install
```

This will install all required packages including:
- React Native and Expo
- React Navigation
- React Native Paper (UI library)
- Zustand (state management)
- Firebase
- And more...

### 2. Configure Environment Variables

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
# Firebase Configuration (Required for Phase 1)
FIREBASE_API_KEY=your_firebase_api_key_here
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# The following are optional for Phase 1
# ASSEMBLYAI_API_KEY=your_key_here
# OPENAI_API_KEY=your_key_here
# TEAMS_CLIENT_ID=your_client_id
# ZOOM_CLIENT_ID=your_client_id
# GOOGLE_CLIENT_ID=your_client_id
```

### 3. Set Up Firebase (Required)

1. **Create a Firebase Project**
   - Go to https://console.firebase.google.com/
   - Click "Add Project"
   - Follow the setup wizard

2. **Enable Services**
   - **Authentication**: Enable Email/Password provider
   - **Firestore**: Create database in production mode
   - **Storage**: Set up Cloud Storage

3. **Get Configuration**
   - Go to Project Settings
   - Scroll to "Your apps" section
   - Click the web icon (</>)
   - Copy the configuration values to your `.env` file

4. **Set Up Firestore Rules**
   In Firestore, go to Rules and paste:
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

5. **Set Up Storage Rules**
   In Storage, go to Rules and paste:
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /users/{userId}/{allPaths=**} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

### 4. Start Development Server

```bash
npm start
```

This will start the Expo development server and show a QR code.

### 5. Run on Android

#### Option A: Android Emulator
1. Open Android Studio
2. Start an Android Virtual Device (AVD)
3. In the terminal where Expo is running, press `a`

OR

```bash
npm run android
```

#### Option B: Physical Device
1. Install "Expo Go" app from Play Store
2. Scan the QR code shown in terminal
3. The app will load on your device

## Verification

Once the app is running, you should see:
- ✅ Home screen with empty state
- ✅ Bottom navigation bar (Home, Calendar, Folders, Settings)
- ✅ Settings screen with theme toggle working
- ✅ FAB (Floating Action Button) for recording

## Troubleshooting

### Common Issues

#### 1. "Module not found" errors
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
expo start -c
```

#### 2. Android build fails
```bash
# Clear build cache
cd android
./gradlew clean
cd ..
```

#### 3. Metro bundler issues
```bash
# Reset Metro bundler cache
expo start -c
```

#### 4. Firebase connection issues
- Verify your `.env` file has correct Firebase configuration
- Check that Firebase services are enabled in console
- Ensure Firestore and Storage rules are set up

#### 5. Permission errors on Android
- The app will request permissions at runtime
- If denied, you can grant them in Android Settings > Apps > Cereal > Permissions

### Getting Help

1. Check the [README.md](README.md) for feature documentation
2. Review error messages in the terminal
3. Check Expo documentation: https://docs.expo.dev/
4. Check React Native Paper docs: https://callstack.github.io/react-native-paper/

## Development Tips

### Hot Reload
- Changes to code will automatically reload the app
- Shake device or press Ctrl+M (Android) to open developer menu

### Debugging
- Use Chrome DevTools: Shake device > "Debug Remote JS"
- Use React Native Debugger (recommended)
- Check logs: `expo start` shows real-time logs

### Testing on Real Device
1. Ensure device and computer are on same WiFi
2. Install Expo Go from Play Store
3. Scan QR code from terminal

### Clearing Cache
```bash
# Clear Expo cache
expo start -c

# Clear npm cache
npm cache clean --force

# Full reset
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

Now that you have the app running, you can:

1. **Explore the UI**: Navigate through all screens
2. **Test Settings**: Try changing theme, audio quality
3. **Review Code**: Familiarize yourself with the project structure
4. **Start Phase 2**: Begin implementing audio recording features

## Phase 2 Requirements

To start implementing audio recording (Phase 2), you'll need:

1. **Real Android Device** (emulator has limited audio support)
2. **Microphone Permission** (will be requested at runtime)
3. **Storage Space** for recording files

Phase 2 implementation will include:
- Audio recording with expo-av
- Real-time waveform visualization
- Background recording
- Audio playback
- Storage management

---

**Setup Complete!** 🎉

You're now ready to start developing with Cereal. Happy coding!
