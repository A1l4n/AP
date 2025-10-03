import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';

import { AppNavigator } from './src/navigation/AppNavigator';
import { authService } from './src/services/authService';
import './src/services/firebase'; // Initialize Firebase

export default function App() {
  useEffect(() => {
    // Initialize auth state listener
    const unsubscribe = authService.onAuthStateChange((user) => {
      console.log('Auth state changed:', user?.email);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <AppNavigator />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
