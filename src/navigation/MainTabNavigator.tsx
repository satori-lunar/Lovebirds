import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types';
import { colors, typography, spacing } from '../constants/theme';

// Tab Screens
import HomeScreen from '../screens/home/HomeScreen';
import DatesScreen from '../screens/dates/DatesScreen';
import MemoriesScreen from '../screens/memories/MemoriesScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Simple Tab Icon Component
interface TabIconProps {
  focused: boolean;
  icon: string;
  label: string;
}

const TabIcon: React.FC<TabIconProps> = ({ focused, icon, label }) => (
  <View style={styles.tabIconContainer}>
    <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>{icon}</Text>
    <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>{label}</Text>
  </View>
);

const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="🏠" label="Home" />
          ),
        }}
      />
      <Tab.Screen
        name="Dates"
        component={DatesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="💕" label="Dates" />
          ),
        }}
      />
      <Tab.Screen
        name="Memories"
        component={MemoriesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="📸" label="Memories" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="👤" label="Profile" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.card,
    borderTopColor: colors.borderLight,
    borderTopWidth: 1,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    height: 80,
  },

  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
    opacity: 0.5,
  },

  tabIconFocused: {
    opacity: 1,
  },

  tabLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.text.muted,
    fontWeight: typography.fontWeight.medium,
  },

  tabLabelFocused: {
    color: colors.primary,
    fontWeight: typography.fontWeight.semiBold,
  },
});

export default MainTabNavigator;
