import * as FileSystem from 'expo-file-system';
import { STORAGE_CONFIG } from '../constants/config';

class StorageService {
  private audioDir: string;
  private transcriptDir: string;

  constructor() {
    this.audioDir = `${FileSystem.documentDirectory}${STORAGE_CONFIG.audioDirectory}/`;
    this.transcriptDir = `${FileSystem.documentDirectory}${STORAGE_CONFIG.transcriptDirectory}/`;
  }

  async initialize(): Promise<void> {
    try {
      // Create directories if they don't exist
      const audioDirInfo = await FileSystem.getInfoAsync(this.audioDir);
      if (!audioDirInfo.exists) {
        await FileSystem.makeDirectoryAsync(this.audioDir, { intermediates: true });
      }

      const transcriptDirInfo = await FileSystem.getInfoAsync(this.transcriptDir);
      if (!transcriptDirInfo.exists) {
        await FileSystem.makeDirectoryAsync(this.transcriptDir, { intermediates: true });
      }
    } catch (error) {
      console.error('Failed to initialize storage:', error);
      throw error;
    }
  }

  async getAvailableSpace(): Promise<number> {
    try {
      const freeDiskStorage = await FileSystem.getFreeDiskStorageAsync();
      return freeDiskStorage;
    } catch (error) {
      console.error('Failed to get available space:', error);
      return 0;
    }
  }

  async hasEnoughSpace(): Promise<boolean> {
    const availableSpace = await this.getAvailableSpace();
    return availableSpace >= STORAGE_CONFIG.minStorageSpaceRequired;
  }

  getAudioFilePath(meetingId: string): string {
    return `${this.audioDir}${meetingId}.m4a`;
  }

  getTranscriptFilePath(meetingId: string): string {
    return `${this.transcriptDir}${meetingId}.json`;
  }

  async deleteAudioFile(meetingId: string): Promise<void> {
    try {
      const filePath = this.getAudioFilePath(meetingId);
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (fileInfo.exists) {
        await FileSystem.deleteAsync(filePath);
      }
    } catch (error) {
      console.error('Failed to delete audio file:', error);
      throw error;
    }
  }

  async deleteTranscriptFile(meetingId: string): Promise<void> {
    try {
      const filePath = this.getTranscriptFilePath(meetingId);
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (fileInfo.exists) {
        await FileSystem.deleteAsync(filePath);
      }
    } catch (error) {
      console.error('Failed to delete transcript file:', error);
      throw error;
    }
  }

  async getFileSize(filePath: string): Promise<number> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (fileInfo.exists && 'size' in fileInfo) {
        return fileInfo.size;
      }
      return 0;
    } catch (error) {
      console.error('Failed to get file size:', error);
      return 0;
    }
  }

  async getTotalStorageUsed(): Promise<number> {
    try {
      let total = 0;
      
      // Get audio files size
      const audioFiles = await FileSystem.readDirectoryAsync(this.audioDir);
      for (const file of audioFiles) {
        const size = await this.getFileSize(`${this.audioDir}${file}`);
        total += size;
      }

      // Get transcript files size
      const transcriptFiles = await FileSystem.readDirectoryAsync(this.transcriptDir);
      for (const file of transcriptFiles) {
        const size = await this.getFileSize(`${this.transcriptDir}${file}`);
        total += size;
      }

      return total;
    } catch (error) {
      console.error('Failed to get total storage used:', error);
      return 0;
    }
  }

  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }
}

export const storageService = new StorageService();
