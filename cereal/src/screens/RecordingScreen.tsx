import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';

export const RecordingScreen: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [recordingAnimation] = useState(new Animated.Value(1));

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
    
    // Start pulsing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(recordingAnimation, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(recordingAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const pauseRecording = () => {
    setIsPaused(!isPaused);
    if (isPaused) {
      // Resume pulsing animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(recordingAnimation, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(recordingAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      // Stop animation
      recordingAnimation.stopAnimation();
      recordingAnimation.setValue(1);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    recordingAnimation.stopAnimation();
    recordingAnimation.setValue(1);
    // TODO: Navigate to meeting detail screen
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recording</Text>
        <TouchableOpacity style={styles.closeButton}>
          <Ionicons name="close" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Meeting Title Input */}
      <View style={styles.titleSection}>
        <Input
          label="Meeting Title"
          placeholder="Enter meeting title..."
          value={meetingTitle}
          onChangeText={setMeetingTitle}
          disabled={isRecording}
        />
      </View>

      {/* Recording Controls */}
      <View style={styles.controlsSection}>
        {/* Timer */}
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>{formatTime(duration)}</Text>
          <Text style={styles.timerLabel}>
            {isRecording ? (isPaused ? 'Paused' : 'Recording') : 'Ready'}
          </Text>
        </View>

        {/* Record Button */}
        <View style={styles.recordButtonContainer}>
          <Animated.View
            style={[
              styles.recordButton,
              {
                transform: [{ scale: recordingAnimation }],
                backgroundColor: isRecording
                  ? (isPaused ? colors.warning : colors.recording)
                  : colors.primary,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.recordButtonInner}
              onPress={isRecording ? pauseRecording : startRecording}
            >
              <Ionicons
                name={isRecording ? (isPaused ? 'play' : 'pause') : 'mic'}
                size={32}
                color={colors.background}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {isRecording && (
            <Button
              title="Stop & Save"
              variant="danger"
              size="large"
              style={styles.stopButton}
              onPress={stopRecording}
            />
          )}
        </View>
      </View>

      {/* Audio Visualization Placeholder */}
      <View style={styles.visualizationSection}>
        <Text style={styles.visualizationTitle}>Audio Levels</Text>
        <View style={styles.waveformContainer}>
          <View style={styles.waveformPlaceholder}>
            <Text style={styles.waveformText}>
              {isRecording ? 'Real-time waveform visualization will appear here' : 'Waveform will show here during recording'}
            </Text>
          </View>
        </View>
      </View>

      {/* Recording Info */}
      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <Ionicons name="mic" size={20} color={colors.textSecondary} />
          <Text style={styles.infoText}>High quality audio (48kHz)</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="cloud" size={20} color={colors.textSecondary} />
          <Text style={styles.infoText}>Auto-save to cloud</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="shield-checkmark" size={20} color={colors.textSecondary} />
          <Text style={styles.infoText}>Secure & private</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text,
  },
  closeButton: {
    padding: spacing.sm,
  },
  
  // Title Section
  titleSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  
  // Controls Section
  controlsSection: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  timer: {
    fontSize: typography.fontSize.xxxl,
    fontFamily: typography.fontFamily.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  timerLabel: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  
  // Record Button
  recordButtonContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  recordButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  recordButtonInner: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Action Buttons
  actionButtons: {
    width: '100%',
  },
  stopButton: {
    marginTop: spacing.lg,
  },
  
  // Visualization Section
  visualizationSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  visualizationTitle: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  waveformContainer: {
    height: 100,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  waveformPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveformText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  
  // Info Section
  infoSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  infoText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
});