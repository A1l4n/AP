import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';

import { TabNavigator } from './TabNavigator';
import { RecordingScreen } from '../screens/RecordingScreen';
import { MeetingDetailScreen } from '../screens/MeetingDetailScreen';

const Stack = createStackNavigator();

export const AppNavigator: React.FC = () => {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.border,
            borderBottomWidth: 1,
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: '600',
          },
          cardStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      >
        <Stack.Screen 
          name="Main" 
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Recording" 
          component={RecordingScreen}
          options={{ 
            title: 'Recording',
            headerShown: false, // Full screen recording experience
          }}
        />
        <Stack.Screen 
          name="MeetingDetail" 
          component={MeetingDetailScreen}
          options={{ 
            title: 'Meeting Details',
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};