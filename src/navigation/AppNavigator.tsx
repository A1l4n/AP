import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import { RootStackParamList } from './types';
import { TabNavigator } from './TabNavigator';
import RecordingScreen from '../screens/RecordingScreen';
import MeetingDetailScreen from '../screens/MeetingDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen
          name="Recording"
          component={RecordingScreen}
          options={{
            presentation: 'fullScreenModal',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="MeetingDetail"
          component={MeetingDetailScreen}
          options={{
            headerShown: true,
            headerTitle: 'Meeting Details',
            headerStyle: {
              backgroundColor: theme.colors.surface,
            },
            headerTintColor: theme.colors.onSurface,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
