import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, FAB, Searchbar, Text } from 'react-native-paper';

export default function HomeScreen() {
  const [query, setQuery] = React.useState('');

  return (
    <View style={styles.container}>
      <Appbar.Header mode="small">
        <Appbar.Content title="Cereal" />
        <Appbar.Action icon="filter-outline" onPress={() => {}} />
      </Appbar.Header>

      <View style={styles.searchContainer}>
        <Searchbar placeholder="Search meetings" value={query} onChangeText={setQuery} />
      </View>

      <View style={styles.section}>
        <Text variant="titleMedium">Upcoming Meetings</Text>
        {/* TODO: Horizontal calendar-linked list */}
      </View>

      <View style={styles.section}>
        <Text variant="titleMedium">Recent Recordings</Text>
        {/* TODO: Meeting list */}
      </View>

      <FAB icon="record-circle" style={styles.fab} onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: { padding: 16 },
  section: { paddingHorizontal: 16, paddingVertical: 12 },
  fab: { position: 'absolute', right: 24, bottom: 24 },
});
