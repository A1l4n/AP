import { Platform } from 'react-native';
import * as Calendar from 'expo-calendar';
import { Audio } from 'expo-av';

export interface PermissionResult {
  granted: boolean;
  canAskAgain?: boolean;
  message?: string;
}

/**
 * Request microphone permission for audio recording
 */
export const requestMicrophonePermission = async (): Promise<PermissionResult> => {
  try {
    const { status, canAskAgain } = await Audio.requestPermissionsAsync();
    
    return {
      granted: status === 'granted',
      canAskAgain,
      message: status === 'denied' 
        ? 'Microphone permission is required to record meetings. Please enable it in settings.'
        : undefined,
    };
  } catch (error) {
    console.error('Error requesting microphone permission:', error);
    return {
      granted: false,
      message: 'Failed to request microphone permission',
    };
  }
};

/**
 * Request calendar permission to access device calendar
 */
export const requestCalendarPermission = async (): Promise<PermissionResult> => {
  try {
    const { status, canAskAgain } = await Calendar.requestCalendarPermissionsAsync();
    
    return {
      granted: status === 'granted',
      canAskAgain,
      message: status === 'denied'
        ? 'Calendar permission is required to show upcoming meetings. Please enable it in settings.'
        : undefined,
    };
  } catch (error) {
    console.error('Error requesting calendar permission:', error);
    return {
      granted: false,
      message: 'Failed to request calendar permission',
    };
  }
};

/**
 * Check if microphone permission is granted
 */
export const checkMicrophonePermission = async (): Promise<boolean> => {
  try {
    const { status } = await Audio.getPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error checking microphone permission:', error);
    return false;
  }
};

/**
 * Check if calendar permission is granted
 */
export const checkCalendarPermission = async (): Promise<boolean> => {
  try {
    const { status } = await Calendar.getCalendarPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error checking calendar permission:', error);
    return false;
  }
};

/**
 * Request all necessary permissions for the app
 */
export const requestAllPermissions = async (): Promise<{
  microphone: PermissionResult;
  calendar: PermissionResult;
}> => {
  const [microphone, calendar] = await Promise.all([
    requestMicrophonePermission(),
    requestCalendarPermission(),
  ]);

  return { microphone, calendar };
};
