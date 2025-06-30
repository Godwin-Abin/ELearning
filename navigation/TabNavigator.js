import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

import HomeDark from '../assets/HomeDark.svg';
import HomeLight from '../assets/HomeLight.svg';
import ClassDark from '../assets/class-dark.svg';
import ClassLight from '../assets/class-light.svg';
import ProfileDark from '../assets/profile-filled-dark.svg';
import ProfileLight from '../assets/profile.svg';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return focused ? (
              <HomeDark width={size} height={size} />
            ) : (
              <HomeLight width={size} height={size} />
            );
          }
          else if (route.name === 'Class'){
            return focused ? (
              <ClassDark width={size} height={size} />
            ) : (
              <ClassLight width={size} height={size} />
            );
          }
          else if (route.name === 'Profile'){
            return focused ? (
              <ProfileDark width={size} height={size} />
            ) : (
              <ProfileLight width={size} height={size} />
            );
          }
          else{
            return null;
          }
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#666',
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Class" component={ProfileScreen} />
      <Tab.Screen name="Profile" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
