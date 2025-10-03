import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
  settings: UserSettings;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  autoRecording: boolean;
  defaultRecordingQuality: 'low' | 'medium' | 'high';
  storageLocation: 'local' | 'cloud';
}

class AuthService {
  private currentUser: User | null = null;

  constructor() {
    // Listen for auth state changes
    onAuthStateChanged(auth, (user) => {
      this.currentUser = user;
    });
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Sign in with email and password
  async signInWithEmail(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(`Sign in failed: ${error}`);
    }
  }

  // Create account with email and password
  async createAccount(email: string, password: string, displayName?: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Create user profile in Firestore
      const userProfile: UserProfile = {
        uid: userCredential.user.uid,
        email: userCredential.user.email!,
        displayName: displayName || userCredential.user.displayName || undefined,
        photoURL: userCredential.user.photoURL || undefined,
        createdAt: new Date(),
        settings: {
          theme: 'system',
          notifications: true,
          autoRecording: false,
          defaultRecordingQuality: 'high',
          storageLocation: 'cloud',
        },
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), userProfile);

      return userCredential.user;
    } catch (error) {
      throw new Error(`Account creation failed: ${error}`);
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(`Sign out failed: ${error}`);
    }
  }

  // Get user profile from Firestore
  async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        return {
          ...data,
          createdAt: data.createdAt.toDate(),
        } as UserProfile;
      }
      return null;
    } catch (error) {
      throw new Error(`Failed to get user profile: ${error}`);
    }
  }

  // Update user profile
  async updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
    try {
      await setDoc(doc(db, 'users', uid), updates, { merge: true });
    } catch (error) {
      throw new Error(`Failed to update user profile: ${error}`);
    }
  }

  // Update user settings
  async updateUserSettings(uid: string, settings: Partial<UserSettings>): Promise<void> {
    try {
      await setDoc(doc(db, 'users', uid), { settings }, { merge: true });
    } catch (error) {
      throw new Error(`Failed to update user settings: ${error}`);
    }
  }

  // Listen to auth state changes
  onAuthStateChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}

// Export singleton instance
export const authService = new AuthService();