import { Platform, Alert, Linking } from 'react-native';
import * as Permissions from 'expo-permissions';

export interface PermissionResult {
  granted: boolean;
  canAskAgain: boolean;
  status: string;
}

export const requestAudioPermission = async (): Promise<PermissionResult> => {
  try {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    
    return {
      granted: status === 'granted',
      canAskAgain: status !== 'denied',
      status,
    };
  } catch (error) {
    console.error('Error requesting audio permission:', error);
    return {
      granted: false,
      canAskAgain: false,
      status: 'error',
    };
  }
};

export const requestStoragePermission = async (): Promise<PermissionResult> => {
  try {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    
    return {
      granted: status === 'granted',
      canAskAgain: status !== 'denied',
      status,
    };
  } catch (error) {
    console.error('Error requesting storage permission:', error);
    return {
      granted: false,
      canAskAgain: false,
      status: 'error',
    };
  }
};

export const requestCalendarPermission = async (): Promise<PermissionResult> => {
  try {
    const { status } = await Permissions.askAsync(Permissions.CALENDAR);
    
    return {
      granted: status === 'granted',
      canAskAgain: status !== 'denied',
      status,
    };
  } catch (error) {
    console.error('Error requesting calendar permission:', error);
    return {
      granted: false,
      canAskAgain: false,
      status: 'error',
    };
  }
};

export const requestNotificationPermission = async (): Promise<PermissionResult> => {
  try {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    
    return {
      granted: status === 'granted',
      canAskAgain: status !== 'denied',
      status,
    };
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return {
      granted: false,
      canAskAgain: false,
      status: 'error',
    };
  }
};

export const showPermissionAlert = (
  title: string,
  message: string,
  onPress?: () => void
) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Settings',
        onPress: () => {
          if (onPress) {
            onPress();
          } else {
            Linking.openSettings();
          }
        },
      },
    ]
  );
};

export const checkAllPermissions = async (): Promise<{
  audio: PermissionResult;
  storage: PermissionResult;
  calendar: PermissionResult;
  notifications: PermissionResult;
}> => {
  const [audio, storage, calendar, notifications] = await Promise.all([
    requestAudioPermission(),
    requestStoragePermission(),
    requestCalendarPermission(),
    requestNotificationPermission(),
  ]);

  return { audio, storage, calendar, notifications };
};