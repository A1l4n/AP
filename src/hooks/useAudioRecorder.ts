import { useState, useEffect, useCallback } from 'react';
import { audioService, AudioRecordingOptions } from '../services/audioService';
import { useMeetingStore } from '../store/meetingStore';

export interface UseAudioRecorderReturn {
  isRecording: boolean;
  isPaused: boolean;
  duration: number;
  audioLevels: number[];
  filePath: string | null;
  error: string | null;
  startRecording: (meetingTitle?: string, options?: AudioRecordingOptions) => Promise<void>;
  pauseRecording: () => Promise<void>;
  resumeRecording: () => Promise<void>;
  stopRecording: () => Promise<string>;
  deleteRecording: () => Promise<void>;
  clearError: () => void;
}

export const useAudioRecorder = (): UseAudioRecorderReturn => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioLevels, setAudioLevels] = useState<number[]>([]);
  const [filePath, setFilePath] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { startRecording: startStoreRecording, updateRecordingDuration, updateAudioLevels } = useMeetingStore();

  // Update duration and audio levels periodically
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
        updateRecordingDuration(duration + 1);
        
        // Simulate audio levels for visualization
        const newLevel = Math.random() * 0.8 + 0.1;
        setAudioLevels(prev => [...prev.slice(-20), newLevel]);
        updateAudioLevels([...audioLevels.slice(-20), newLevel]);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, isPaused, duration, audioLevels, updateRecordingDuration, updateAudioLevels]);

  const startRecording = useCallback(async (
    meetingTitle?: string,
    options?: AudioRecordingOptions
  ) => {
    try {
      setError(null);
      const uri = await audioService.startRecording(options);
      
      setIsRecording(true);
      setIsPaused(false);
      setDuration(0);
      setAudioLevels([]);
      setFilePath(uri);
      
      // Start recording in store
      startStoreRecording(meetingTitle);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start recording';
      setError(errorMessage);
      console.error('Error starting recording:', err);
    }
  }, [startStoreRecording]);

  const pauseRecording = useCallback(async () => {
    try {
      setError(null);
      await audioService.pauseRecording();
      setIsPaused(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to pause recording';
      setError(errorMessage);
      console.error('Error pausing recording:', err);
    }
  }, []);

  const resumeRecording = useCallback(async () => {
    try {
      setError(null);
      await audioService.resumeRecording();
      setIsPaused(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to resume recording';
      setError(errorMessage);
      console.error('Error resuming recording:', err);
    }
  }, []);

  const stopRecording = useCallback(async (): Promise<string> => {
    try {
      setError(null);
      const uri = await audioService.stopRecording();
      
      setIsRecording(false);
      setIsPaused(false);
      setDuration(0);
      setAudioLevels([]);
      setFilePath(null);
      
      return uri;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to stop recording';
      setError(errorMessage);
      console.error('Error stopping recording:', err);
      throw err;
    }
  }, []);

  const deleteRecording = useCallback(async () => {
    try {
      if (filePath) {
        await audioService.deleteRecording(filePath);
        setFilePath(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete recording';
      setError(errorMessage);
      console.error('Error deleting recording:', err);
    }
  }, [filePath]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isRecording,
    isPaused,
    duration,
    audioLevels,
    filePath,
    error,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    deleteRecording,
    clearError,
  };
};