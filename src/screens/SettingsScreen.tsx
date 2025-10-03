import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Card } from '../components/common/Card';

export const SettingsScreen: React.FC = () => {
  const theme = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [autoRecord, setAutoRecord] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [autoTranscribe, setAutoTranscribe] = useState(true);
  const [autoSummarize, setAutoSummarize] = useState(true);

  const settingsSections = [
    {
      title: 'Recording',
      items: [
        {
          id: 'auto-record',
          title: 'Auto-record calendar meetings',
          subtitle: 'Automatically start recording when joining meetings',
          type: 'switch',
          value: autoRecord,
          onToggle: setAutoRecord,
        },
        {
          id: 'audio-quality',
          title: 'Audio Quality',
          subtitle: 'High (48kHz, AAC)',
          type: 'navigation',
          onPress: () => {/* TODO: Navigate to audio quality settings */},
        },
        {
          id: 'storage-location',
          title: 'Storage Location',
          subtitle: 'Device Storage (2.3 GB available)',
          type: 'navigation',
          onPress: () => {/* TODO: Navigate to storage settings */},
        },
      ],
    },
    {
      title: 'AI Features',
      items: [
        {
          id: 'auto-transcribe',
          title: 'Auto-transcribe recordings',
          subtitle: 'Automatically transcribe after recording ends',
          type: 'switch',
          value: autoTranscribe,
          onToggle: setAutoTranscribe,
        },
        {
          id: 'auto-summarize',
          title: 'Auto-generate summaries',
          subtitle: 'Create AI summaries for transcribed meetings',
          type: 'switch',
          value: autoSummarize,
          onToggle: setAutoSummarize,
        },
        {
          id: 'speaker-detection',
          title: 'Speaker Detection',
          subtitle: 'Identify different speakers in recordings',
          type: 'switch',
          value: true,
          onToggle: () => {/* TODO: Handle speaker detection toggle */},
        },
      ],
    },
    {
      title: 'Integrations',
      items: [
        {
          id: 'calendar-sync',
          title: 'Calendar Sync',
          subtitle: 'Google Calendar, Outlook',
          type: 'navigation',
          onPress: () => {/* TODO: Navigate to calendar settings */},
        },
        {
          id: 'teams-integration',
          title: 'Microsoft Teams',
          subtitle: 'Connected',
          type: 'navigation',
          onPress: () => {/* TODO: Navigate to Teams settings */},
        },
        {
          id: 'zoom-integration',
          title: 'Zoom',
          subtitle: 'Not connected',
          type: 'navigation',
          onPress: () => {/* TODO: Navigate to Zoom settings */},
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
          value: darkMode,
          onToggle: setDarkMode,
        },
        {
          id: 'language',
          title: 'Language',
          subtitle: 'English',
          type: 'navigation',
          onPress: () => {/* TODO: Navigate to language settings */},
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
          value: notifications,
          onToggle: setNotifications,
        },
        {
          id: 'email-summaries',
          title: 'Email Summaries',
          subtitle: 'Send summaries via email',
          type: 'switch',
          value: false,
          onToggle: () => {/* TODO: Handle email summaries toggle */},
        },
      ],
    },
    {
      title: 'Privacy & Security',
      items: [
        {
          id: 'data-encryption',
          title: 'End-to-End Encryption',
          subtitle: 'Encrypt recordings and transcripts',
          type: 'switch',
          value: false,
          onToggle: () => {/* TODO: Handle encryption toggle */},
        },
        {
          id: 'data-retention',
          title: 'Data Retention',
          subtitle: 'Keep data for 1 year',
          type: 'navigation',
          onPress: () => {/* TODO: Navigate to data retention settings */},
        },
        {
          id: 'export-data',
          title: 'Export Data',
          subtitle: 'Download all your data',
          type: 'navigation',
          onPress: () => {/* TODO: Handle data export */},
        },
      ],
    },
  ];

  const renderSettingItem = (item: any) => {
    const getIcon = () => {
      switch (item.type) {
        case 'switch':
          return <Switch value={item.value} onValueChange={item.onToggle} />;
        case 'navigation':
          return <Icon name="chevron-right" size={24} color={theme.colors.textSecondary} />;
        default:
          return null;
      }
    };

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.settingItem}
        onPress={item.onPress}
        disabled={item.type === 'switch'}
      >
        <View style={styles.settingContent}>
          <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
            {item.title}
          </Text>
          <Text style={[styles.settingSubtitle, { color: theme.colors.textSecondary }]}>
            {item.subtitle}
          </Text>
        </View>
        {getIcon()}
      </TouchableOpacity>
    );
  };

  const renderSection = (section: any) => (
    <View key={section.title} style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        {section.title}
      </Text>
      <Card style={styles.sectionCard}>
        {section.items.map(renderSettingItem)}
      </Card>
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Card style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
            <View style={styles.profileDetails}>
              <Text style={[styles.profileName, { color: theme.colors.text }]}>
                John Doe
              </Text>
              <Text style={[styles.profileEmail, { color: theme.colors.textSecondary }]}>
                john.doe@example.com
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editProfileButton}>
            <Icon name="edit" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </Card>
      </View>

      {/* Settings Sections */}
      {settingsSections.map(renderSection)}

      {/* App Info */}
      <View style={styles.appInfo}>
        <Text style={[styles.appVersion, { color: theme.colors.textSecondary }]}>
          Cereal v1.0.0
        </Text>
        <TouchableOpacity style={styles.feedbackButton}>
          <Text style={[styles.feedbackText, { color: theme.colors.primary }]}>
            Send Feedback
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    padding: 16,
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
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
  },
  editProfileButton: {
    padding: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  sectionCard: {
    marginHorizontal: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  appVersion: {
    fontSize: 14,
    marginBottom: 16,
  },
  feedbackButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  feedbackText: {
    fontSize: 16,
    fontWeight: '500',
  },
});