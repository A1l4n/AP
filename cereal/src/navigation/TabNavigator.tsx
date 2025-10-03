import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { HomeScreen } from '../screens/HomeScreen';
import { CalendarScreen } from '../screens/CalendarScreen';
import { FoldersScreen } from '../screens/FoldersScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

// Define the tab navigator param list
export type TabParamList = {
  Home: undefined;
  Calendar: undefined;
  Folders: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

// Custom tab bar icon component
const TabBarIcon: React.FC<{ name: string; color: string; size: number }> = ({
  name,
  color,
  size
}) => {
  // For now, we'll use text icons, but in a real app you'd use vector icons
  const iconText = {
    Home: '🏠',
    Calendar: '📅',
    Folders: '📁',
    Settings: '⚙️',
  }[name] || '●';

  return (
    <Text style={{ fontSize: size, color }}>
      {iconText}
    </Text>
  );
};

export const TabNavigator: React.FC = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <TabBarIcon name={route.name} color={color} size={size} />
        ),
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarLabel: 'Calendar',
        }}
      />
      <Tab.Screen
        name="Folders"
        component={FoldersScreen}
        options={{
          tabBarLabel: 'Folders',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};