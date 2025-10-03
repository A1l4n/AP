import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Text } from 'react-native-paper';

export default function FoldersScreen() {
  return (
    <View style={styles.container}>
      <Appbar.Header mode="small">
        <Appbar.Content title="Folders" />
      </Appbar.Header>
      <View style={styles.content}>
        <Text>Folders coming soon</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
