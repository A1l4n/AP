import { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { CalendarEvent } from '../types';
import { meetingDetectionService } from '../services/meetingDetectionService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

interface UseMeetingDetectionReturn {
  isMonitoring: boolean;
  currentMeeting: CalendarEvent | null;
  startMonitoring: () => Promise<void>;
  stopMonitoring: () => void;
}

/**
 * Hook for automatic meeting detection and recording prompts
 */
export const useMeetingDetection = (): UseMeetingDetectionReturn => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState<CalendarEvent | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  /**
   * Start monitoring for meetings
   */
  const startMonitoring = async () => {
    try {
      await meetingDetectionService.startMonitoring(1); // Check every minute
      setIsMonitoring(true);
    } catch (error) {
      console.error('Failed to start meeting monitoring:', error);
    }
  };

  /**
   * Stop monitoring
   */
  const stopMonitoring = () => {
    meetingDetectionService.stopMonitoring();
    setIsMonitoring(false);
  };

  /**
   * Check for current meeting
   */
  const checkCurrentMeeting = async () => {
    const meeting = await meetingDetectionService.getCurrentMeeting();
    setCurrentMeeting(meeting);
  };

  /**
   * Handle notification taps
   */
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      async (response) => {
        await meetingDetectionService.handleNotificationResponse(response);

        const data = response.notification.request.content.data;
        
        // Navigate to recording screen with event data
        if (data.type === 'meeting-reminder' || data.type === 'meeting-started') {
          navigation.navigate('Recording', {
            calendarEventId: data.eventId,
          });
        }
      }
    );

    return () => subscription.remove();
  }, [navigation]);

  /**
   * Check for current meeting periodically
   */
  useEffect(() => {
    if (!isMonitoring) return;

    checkCurrentMeeting();

    const interval = setInterval(() => {
      checkCurrentMeeting();
    }, 30 * 1000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [isMonitoring]);

  /**
   * Start monitoring on mount if enabled in settings
   */
  useEffect(() => {
    // TODO: Check user settings for auto-monitoring
    // For now, auto-start monitoring
    startMonitoring();

    return () => {
      stopMonitoring();
    };
  }, []);

  return {
    isMonitoring,
    currentMeeting,
    startMonitoring,
    stopMonitoring,
  };
};
