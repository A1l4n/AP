import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { formatDuration } from '../utils/dateFormatter';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const RecordingScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [meetingTitle, setMeetingTitle] = useState('');
  
  const {
    isRecording,
    isPaused,
    duration,
    audioLevels,
    error,
    startRecording: startAudioRecording,
    pauseRecording: pauseAudioRecording,
    resumeRecording: resumeAudioRecording,
    stopRecording: stopAudioRecording,
    clearError,
  } = useAudioRecorder();

  const pulseAnim = new Animated.Value(1);
  const waveformAnim = new Animated.Value(0);

  useEffect(() => {
    if (isRecording && !isPaused) {
      // Pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Waveform animation
      Animated.loop(
        Animated.timing(waveformAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ).start();
    } else {
      pulseAnim.stopAnimation();
      waveformAnim.stopAnimation();
    }
  }, [isRecording, isPaused]);

  const startRecording = async () => {
    try {
      await startAudioRecording(meetingTitle);
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  };

  const pauseRecording = async () => {
    try {
      if (isPaused) {
        await resumeAudioRecording();
      } else {
        await pauseAudioRecording();
      }
    } catch (err) {
      console.error('Failed to pause/resume recording:', err);
    }
  };

  const stopRecording = async () => {
    try {
      const filePath = await stopAudioRecording();
      // TODO: Save meeting to store/database
      navigation.goBack();
    } catch (err) {
      console.error('Failed to stop recording:', err);
    }
  };

  const cancelRecording = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={cancelRecording}>
          <Icon name="close" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          {isRecording ? 'Recording...' : 'New Recording'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Meeting Title Input */}
      <View style={styles.titleContainer}>
        <Input
          placeholder="Meeting title (optional)"
          value={meetingTitle}
          onChangeText={setMeetingTitle}
          disabled={isRecording}
        />
      </View>

      {/* Recording Controls */}
      <View style={styles.controlsContainer}>
        {/* Timer */}
        <Text style={[styles.timer, { color: theme.colors.text }]}>
          {formatDuration(duration)}
        </Text>

        {/* Record Button */}
        <TouchableOpacity
          style={[
            styles.recordButton,
            {
              backgroundColor: isRecording ? theme.colors.error : theme.colors.primary,
              transform: [{ scale: pulseAnim }],
            },
          ]}
          onPress={isRecording ? pauseRecording : startRecording}
        >
          <Icon
            name={isRecording ? (isPaused ? 'play-arrow' : 'pause') : 'mic'}
            size={32}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        {/* Audio Visualization */}
        {isRecording && (
          <View style={styles.waveformContainer}>
            {audioLevels.map((level, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.waveformBar,
                  {
                    height: level * 40 + 10,
                    backgroundColor: theme.colors.primary,
                    opacity: waveformAnim,
                  },
                ]}
              />
            ))}
          </View>
        )}

        {/* Status Text */}
        <Text style={[styles.statusText, { color: theme.colors.textSecondary }]}>
          {isRecording
            ? isPaused
              ? 'Recording paused'
              : 'Recording in progress...'
            : 'Tap to start recording'}
        </Text>
      </View>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        {isRecording && (
          <Button
            title={isPaused ? 'Resume' : 'Pause'}
            onPress={pauseRecording}
            variant="outline"
            style={styles.actionButton}
          />
        )}
        
        {isRecording && (
          <Button
            title="Stop & Save"
            onPress={stopRecording}
            style={styles.actionButton}
          />
        )}
      </View>

      {/* Error Display */}
      {error && (
        <View style={styles.errorContainer}>
          <Icon name="error" size={16} color={theme.colors.error} />
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {error}
          </Text>
          <TouchableOpacity onPress={clearError}>
            <Icon name="close" size={16} color={theme.colors.error} />
          </TouchableOpacity>
        </View>
      )}

      {/* Storage Info */}
      <View style={styles.storageInfo}>
        <Icon name="storage" size={16} color={theme.colors.textSecondary} />
        <Text style={[styles.storageText, { color: theme.colors.textSecondary }]}>
          Storage: 2.3 GB available
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  titleContainer: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  controlsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    fontSize: 48,
    fontWeight: '300',
    fontFamily: 'monospace',
    marginBottom: 32,
  },
  recordButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    marginBottom: 16,
  },
  waveformBar: {
    width: 3,
    marginHorizontal: 1,
    borderRadius: 2,
  },
  statusText: {
    fontSize: 16,
    textAlign: 'center',
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 16,
  },
  actionButton: {
    flex: 1,
  },
  storageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 32,
    gap: 8,
  },
  storageText: {
    fontSize: 12,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    gap: 8,
  },
  errorText: {
    flex: 1,
    fontSize: 14,
  },
});