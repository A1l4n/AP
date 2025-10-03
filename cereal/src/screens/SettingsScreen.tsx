import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Text, Switch, List } from 'react-native-paper';
import { useSettingsStore } from '../store/settingsStore';

export default function SettingsScreen() {
  const darkMode = useSettingsStore((s) => s.darkMode);
  const setDarkMode = useSettingsStore((s) => s.setDarkMode);

  return (
    <View style={styles.container}>
      <Appbar.Header mode="small">
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      <View style={styles.content}>
        <List.Item
          title="Dark Mode"
          right={() => <Switch value={darkMode} onValueChange={setDarkMode} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 16 },
});
