import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const SettingsScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoTranscriptionEnabled, setAutoTranscriptionEnabled] = useState(true);
  const [backgroundRecordingEnabled, setBackgroundRecordingEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const settingsSections = [
    {
      title: 'Recording',
      items: [
        {
          id: 'auto-transcription',
          title: 'Auto-transcription',
          subtitle: 'Automatically transcribe recordings',
          type: 'switch',
          value: autoTranscriptionEnabled,
          onToggle: setAutoTranscriptionEnabled,
        },
        {
          id: 'background-recording',
          title: 'Background Recording',
          subtitle: 'Continue recording when app is minimized',
          type: 'switch',
          value: backgroundRecordingEnabled,
          onToggle: setBackgroundRecordingEnabled,
        },
        {
          id: 'audio-quality',
          title: 'Audio Quality',
          subtitle: 'High (48kHz)',
          type: 'navigation',
          onPress: () => {
            // TODO: Navigate to audio quality settings
          },
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          id: 'notifications',
          title: 'Push Notifications',
          subtitle: 'Get notified about meeting reminders',
          type: 'switch',
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled,
        },
        {
          id: 'transcription-complete',
          title: 'Transcription Complete',
          subtitle: 'Notify when transcription is ready',
          type: 'switch',
          value: true,
          onToggle: () => {},
        },
      ],
    },
    {
      title: 'Integrations',
      items: [
        {
          id: 'google-calendar',
          title: 'Google Calendar',
          subtitle: 'Connected',
          type: 'navigation',
          onPress: () => {
            // TODO: Navigate to Google Calendar settings
          },
        },
        {
          id: 'microsoft-teams',
          title: 'Microsoft Teams',
          subtitle: 'Not connected',
          type: 'navigation',
          onPress: () => {
            // TODO: Navigate to Teams settings
          },
        },
        {
          id: 'zoom',
          title: 'Zoom',
          subtitle: 'Not connected',
          type: 'navigation',
          onPress: () => {
            // TODO: Navigate to Zoom settings
          },
        },
      ],
    },
    {
      title: 'Appearance',
      items: [
        {
          id: 'dark-mode',
          title: 'Dark Mode',
          subtitle: 'Use dark theme',
          type: 'switch',
          value: darkModeEnabled,
          onToggle: setDarkModeEnabled,
        },
        {
          id: 'language',
          title: 'Language',
          subtitle: 'English',
          type: 'navigation',
          onPress: () => {
            // TODO: Navigate to language settings
          },
        },
      ],
    },
    {
      title: 'Storage',
      items: [
        {
          id: 'storage-usage',
          title: 'Storage Usage',
          subtitle: '2.3 GB used',
          type: 'navigation',
          onPress: () => {
            // TODO: Navigate to storage management
          },
        },
        {
          id: 'auto-cleanup',
          title: 'Auto Cleanup',
          subtitle: 'Delete old recordings after 30 days',
          type: 'switch',
          value: false,
          onToggle: () => {},
        },
      ],
    },
  ];

  const renderSettingItem = (item: any) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.settingItem}
        onPress={item.onPress}
        disabled={item.type === 'switch'}
      >
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
        </View>
        
        {item.type === 'switch' ? (
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.background}
          />
        ) : (
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Card style={styles.profileCard}>
            <View style={styles.profileInfo}>
              <View style={styles.profileAvatar}>
                <Ionicons name="person" size={32} color={colors.background} />
              </View>
              <View style={styles.profileDetails}>
                <Text style={styles.profileName}>John Doe</Text>
                <Text style={styles.profileEmail}>john.doe@example.com</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editProfileButton}>
              <Ionicons name="pencil" size={16} color={colors.primary} />
            </TouchableOpacity>
          </Card>
        </View>

        {/* Settings Sections */}
        {settingsSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Card style={styles.sectionCard}>
              {section.items.map((item, index) => (
                <View key={item.id}>
                  {renderSettingItem(item)}
                  {index < section.items.length - 1 && <View style={styles.separator} />}
                </View>
              ))}
            </Card>
          </View>
        ))}

        {/* App Info */}
        <View style={styles.appInfoSection}>
          <Card style={styles.appInfoCard}>
            <View style={styles.appInfoItem}>
              <Text style={styles.appInfoLabel}>Version</Text>
              <Text style={styles.appInfoValue}>1.0.0</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.appInfoItem}>
              <Text style={styles.appInfoLabel}>Build</Text>
              <Text style={styles.appInfoValue}>2024.01.01</Text>
            </View>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.appInfoItem}>
              <Text style={styles.appInfoLabel}>Privacy Policy</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.appInfoItem}>
              <Text style={styles.appInfoLabel}>Terms of Service</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </Card>
        </View>

        {/* Sign Out Button */}
        <View style={styles.signOutSection}>
          <Button
            title="Sign Out"
            variant="danger"
            style={styles.signOutButton}
            onPress={() => {
              // TODO: Implement sign out
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // Profile Section
  profileSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text,
  },
  profileEmail: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  editProfileButton: {
    padding: spacing.sm,
  },
  
  // Settings Sections
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  sectionCard: {
    marginHorizontal: spacing.lg,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.medium,
    color: colors.text,
  },
  settingSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 0,
  },
  
  // App Info
  appInfoSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  appInfoCard: {
    paddingVertical: spacing.sm,
  },
  appInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  appInfoLabel: {
    fontSize: typography.fontSize.md,
    color: colors.text,
  },
  appInfoValue: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  
  // Sign Out
  signOutSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  signOutButton: {
    marginTop: spacing.lg,
  },
});