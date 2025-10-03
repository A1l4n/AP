import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

export interface AudioRecordingOptions {
  sampleRate: number;
  channels: number;
  bitRate: number;
  format: 'aac' | 'mp4' | 'wav';
  quality: 'low' | 'medium' | 'high';
}

export interface AudioLevel {
  timestamp: number;
  level: number; // 0-1
}

class AudioService {
  private recording: Audio.Recording | null = null;
  private isRecording = false;
  private isPaused = false;
  private audioLevels: AudioLevel[] = [];
  private levelInterval: NodeJS.Timeout | null = null;

  async requestPermissions(): Promise<boolean> {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting audio permissions:', error);
      return false;
    }
  }

  async startRecording(
    options: AudioRecordingOptions = {
      sampleRate: 48000,
      channels: 1,
      bitRate: 128000,
      format: 'aac',
      quality: 'high',
    }
  ): Promise<string> {
    try {
      if (this.isRecording) {
        throw new Error('Recording is already in progress');
      }

      // Request permissions
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        throw new Error('Audio recording permission not granted');
      }

      // Configure audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true,
      });

      // Create recording options
      const recordingOptions: Audio.RecordingOptions = {
        android: {
          extension: options.format === 'aac' ? '.m4a' : '.wav',
          outputFormat: options.format === 'aac' ? Audio.AndroidOutputFormat.MPEG_4 : Audio.AndroidOutputFormat.DEFAULT,
          audioEncoder: options.format === 'aac' ? Audio.AndroidAudioEncoder.AAC : Audio.AndroidAudioEncoder.DEFAULT,
          sampleRate: options.sampleRate,
          numberOfChannels: options.channels,
          bitRate: options.bitRate,
        },
        ios: {
          extension: options.format === 'aac' ? '.m4a' : '.wav',
          outputFormat: options.format === 'aac' ? Audio.IOSOutputFormat.MPEG4AAC : Audio.IOSOutputFormat.LINEARPCM,
          audioQuality: options.quality === 'high' ? Audio.IOSAudioQuality.HIGH : 
                       options.quality === 'medium' ? Audio.IOSAudioQuality.MEDIUM : Audio.IOSAudioQuality.LOW,
          sampleRate: options.sampleRate,
          numberOfChannels: options.channels,
          bitRate: options.bitRate,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
        web: {
          mimeType: options.format === 'aac' ? 'audio/mp4' : 'audio/wav',
          bitsPerSecond: options.bitRate,
        },
      };

      // Create and start recording
      this.recording = new Audio.Recording();
      await this.recording.prepareToRecordAsync(recordingOptions);
      await this.recording.startAsync();

      this.isRecording = true;
      this.isPaused = false;
      this.audioLevels = [];

      // Start monitoring audio levels
      this.startAudioLevelMonitoring();

      return this.recording.getURI() || '';
    } catch (error) {
      console.error('Error starting recording:', error);
      throw error;
    }
  }

  async pauseRecording(): Promise<void> {
    try {
      if (!this.recording || !this.isRecording) {
        throw new Error('No active recording to pause');
      }

      await this.recording.pauseAsync();
      this.isPaused = true;
      this.stopAudioLevelMonitoring();
    } catch (error) {
      console.error('Error pausing recording:', error);
      throw error;
    }
  }

  async resumeRecording(): Promise<void> {
    try {
      if (!this.recording || !this.isRecording) {
        throw new Error('No active recording to resume');
      }

      await this.recording.startAsync();
      this.isPaused = false;
      this.startAudioLevelMonitoring();
    } catch (error) {
      console.error('Error resuming recording:', error);
      throw error;
    }
  }

  async stopRecording(): Promise<string> {
    try {
      if (!this.recording || !this.isRecording) {
        throw new Error('No active recording to stop');
      }

      await this.recording.stopAndUnloadAsync();
      const uri = this.recording.getURI();
      
      this.isRecording = false;
      this.isPaused = false;
      this.stopAudioLevelMonitoring();
      this.recording = null;

      return uri || '';
    } catch (error) {
      console.error('Error stopping recording:', error);
      throw error;
    }
  }

  async deleteRecording(uri: string): Promise<void> {
    try {
      if (await FileSystem.getInfoAsync(uri)) {
        await FileSystem.deleteAsync(uri);
      }
    } catch (error) {
      console.error('Error deleting recording:', error);
      throw error;
    }
  }

  getRecordingStatus(): {
    isRecording: boolean;
    isPaused: boolean;
    duration: number;
    audioLevels: AudioLevel[];
  } {
    return {
      isRecording: this.isRecording,
      isPaused: this.isPaused,
      duration: this.recording?.getStatusAsync().then(status => status.durationMillis || 0) || 0,
      audioLevels: this.audioLevels,
    };
  }

  private startAudioLevelMonitoring(): void {
    this.levelInterval = setInterval(() => {
      // Simulate audio levels - in a real implementation, you would get actual levels
      const level = Math.random() * 0.8 + 0.1; // Random level between 0.1 and 0.9
      this.audioLevels.push({
        timestamp: Date.now(),
        level,
      });

      // Keep only last 100 levels to prevent memory issues
      if (this.audioLevels.length > 100) {
        this.audioLevels = this.audioLevels.slice(-100);
      }
    }, 100); // Update every 100ms
  }

  private stopAudioLevelMonitoring(): void {
    if (this.levelInterval) {
      clearInterval(this.levelInterval);
      this.levelInterval = null;
    }
  }

  // Audio playback methods
  async playAudio(uri: string): Promise<void> {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri });
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing audio:', error);
      throw error;
    }
  }

  async pauseAudio(): Promise<void> {
    // Implementation for pausing audio playback
  }

  async stopAudio(): Promise<void> {
    // Implementation for stopping audio playback
  }

  async getAudioDuration(uri: string): Promise<number> {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri });
      const status = await sound.getStatusAsync();
      return status.durationMillis || 0;
    } catch (error) {
      console.error('Error getting audio duration:', error);
      return 0;
    }
  }
}

export const audioService = new AudioService();