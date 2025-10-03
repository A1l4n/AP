import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme, List, Switch, Divider } from 'react-native-paper';
import { Spacing } from '../constants';
import { useSettingsStore } from '../store';

const SettingsScreen: React.FC = () => {
  const theme = useTheme();
  const {
    theme: appTheme,
    audioQuality,
    autoStartRecording,
    notificationsEnabled,
    setTheme,
    setAudioQuality,
    setAutoStartRecording,
    setNotificationsEnabled,
  } = useSettingsStore();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <Text variant="headlineMedium" style={styles.headerTitle}>
          Settings
        </Text>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Appearance */}
        <List.Section>
          <List.Subheader>Appearance</List.Subheader>
          <List.Item
            title="Theme"
            description={`Current: ${appTheme}`}
            left={props => <List.Icon {...props} icon="theme-light-dark" />}
            onPress={() => {
              const themes: Array<'light' | 'dark' | 'auto'> = ['light', 'dark', 'auto'];
              const currentIndex = themes.indexOf(appTheme);
              const nextTheme = themes[(currentIndex + 1) % themes.length];
              setTheme(nextTheme);
            }}
          />
        </List.Section>

        <Divider />

        {/* Recording */}
        <List.Section>
          <List.Subheader>Recording</List.Subheader>
          <List.Item
            title="Audio Quality"
            description={`Current: ${audioQuality}`}
            left={props => <List.Icon {...props} icon="microphone" />}
            onPress={() => {
              const qualities: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high'];
              const currentIndex = qualities.indexOf(audioQuality);
              const nextQuality = qualities[(currentIndex + 1) % qualities.length];
              setAudioQuality(nextQuality);
            }}
          />
          <List.Item
            title="Auto-start Recording"
            description="Automatically start recording when joining a meeting"
            left={props => <List.Icon {...props} icon="play-circle" />}
            right={() => (
              <Switch
                value={autoStartRecording}
                onValueChange={setAutoStartRecording}
              />
            )}
          />
        </List.Section>

        <Divider />

        {/* Notifications */}
        <List.Section>
          <List.Subheader>Notifications</List.Subheader>
          <List.Item
            title="Enable Notifications"
            description="Receive notifications about recordings"
            left={props => <List.Icon {...props} icon="bell" />}
            right={() => (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
              />
            )}
          />
        </List.Section>

        <Divider />

        {/* About */}
        <List.Section>
          <List.Subheader>About</List.Subheader>
          <List.Item
            title="Version"
            description="1.0.0"
            left={props => <List.Icon {...props} icon="information" />}
          />
        </List.Section>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Spacing.xxxl,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    elevation: 2,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
});

export default SettingsScreen;
