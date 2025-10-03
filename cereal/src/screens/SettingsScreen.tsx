import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, List, Switch, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export const SettingsScreen: React.FC = () => {
  const theme = useTheme();
  const [notifications, setNotifications] = React.useState(true);
  const [autoRecording, setAutoRecording] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Settings
        </Text>

        <List.Section>
          <List.Subheader>Recording</List.Subheader>
          <List.Item
            title="Auto-start recording"
            description="Automatically start recording when joining video calls"
            right={() => (
              <Switch
                value={autoRecording}
                onValueChange={setAutoRecording}
                color={theme.colors.primary}
              />
            )}
          />
          <List.Item
            title="Recording quality"
            description="High quality (48kHz AAC)"
            right={() => <Text variant="bodyMedium">High</Text>}
          />
        </List.Section>

        <List.Section>
          <List.Subheader>Notifications</List.Subheader>
          <List.Item
            title="Push notifications"
            description="Receive notifications for meeting summaries and action items"
            right={() => (
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                color={theme.colors.primary}
              />
            )}
          />
        </List.Section>

        <List.Section>
          <List.Subheader>Appearance</List.Subheader>
          <List.Item
            title="Dark mode"
            description="Use dark theme throughout the app"
            right={() => (
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                color={theme.colors.primary}
              />
            )}
          />
        </List.Section>

        <List.Section>
          <List.Subheader>Account</List.Subheader>
          <List.Item
            title="Storage usage"
            description="2.3 GB of 5 GB used"
            right={() => <Text variant="bodyMedium">Manage</Text>}
          />
          <List.Item
            title="Export data"
            description="Download all your meeting data"
            right={() => <Text variant="bodyMedium">Export</Text>}
          />
          <List.Item
            title="Sign out"
            description="Sign out of your account"
            right={() => <Text variant="bodyMedium" style={{ color: theme.colors.error }}>Sign out</Text>}
          />
        </List.Section>

        <List.Section>
          <List.Subheader>About</List.Subheader>
          <List.Item
            title="Version"
            description="1.0.0 (1)"
            right={() => <Text variant="bodyMedium">Cereal</Text>}
          />
          <List.Item
            title="Privacy policy"
            description="Learn how we protect your data"
            right={() => <Text variant="bodyMedium">View</Text>}
          />
          <List.Item
            title="Terms of service"
            description="Read our terms and conditions"
            right={() => <Text variant="bodyMedium">View</Text>}
          />
        </List.Section>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontWeight: '600',
    marginBottom: 24,
  },
});