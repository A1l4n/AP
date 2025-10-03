import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../constants/theme';
import { TabNavigator } from './TabNavigator';
import { RecordingScreen } from '../screens/RecordingScreen';
import { MeetingDetailScreen } from '../screens/MeetingDetailScreen';

const Stack = createStackNavigator();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" backgroundColor={colors.background} />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: 'Inter-SemiBold',
            color: colors.text,
          },
          headerTintColor: colors.primary,
          cardStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Recording"
          component={RecordingScreen}
          options={{
            title: 'Recording',
            headerBackTitleVisible: false,
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