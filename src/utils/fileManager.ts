import * as FileSystem from 'expo-file-system';

/**
 * Generate a unique filename for a meeting recording
 */
export const generateMeetingFilename = (meetingId: string, extension: string = 'm4a'): string => {
  return `${meetingId}.${extension}`;
};

/**
 * Check if file exists
 */
export const fileExists = async (uri: string): Promise<boolean> => {
  try {
    const info = await FileSystem.getInfoAsync(uri);
    return info.exists;
  } catch (error) {
    console.error('Error checking file existence:', error);
    return false;
  }
};

/**
 * Delete file if it exists
 */
export const deleteFile = async (uri: string): Promise<boolean> => {
  try {
    const exists = await fileExists(uri);
    if (exists) {
      await FileSystem.deleteAsync(uri);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

/**
 * Move file from one location to another
 */
export const moveFile = async (from: string, to: string): Promise<boolean> => {
  try {
    await FileSystem.moveAsync({ from, to });
    return true;
  } catch (error) {
    console.error('Error moving file:', error);
    return false;
  }
};

/**
 * Copy file from one location to another
 */
export const copyFile = async (from: string, to: string): Promise<boolean> => {
  try {
    await FileSystem.copyAsync({ from, to });
    return true;
  } catch (error) {
    console.error('Error copying file:', error);
    return false;
  }
};

/**
 * Get file size in bytes
 */
export const getFileSize = async (uri: string): Promise<number> => {
  try {
    const info = await FileSystem.getInfoAsync(uri);
    if (info.exists && 'size' in info) {
      return info.size;
    }
    return 0;
  } catch (error) {
    console.error('Error getting file size:', error);
    return 0;
  }
};

/**
 * Read file as string
 */
export const readFileAsString = async (uri: string): Promise<string | null> => {
  try {
    const content = await FileSystem.readAsStringAsync(uri);
    return content;
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
};

/**
 * Write string to file
 */
export const writeStringToFile = async (uri: string, content: string): Promise<boolean> => {
  try {
    await FileSystem.writeAsStringAsync(uri, content);
    return true;
  } catch (error) {
    console.error('Error writing file:', error);
    return false;
  }
};

/**
 * Create directory if it doesn't exist
 */
export const ensureDirectoryExists = async (uri: string): Promise<boolean> => {
  try {
    const info = await FileSystem.getInfoAsync(uri);
    if (!info.exists) {
      await FileSystem.makeDirectoryAsync(uri, { intermediates: true });
    }
    return true;
  } catch (error) {
    console.error('Error creating directory:', error);
    return false;
  }
};
