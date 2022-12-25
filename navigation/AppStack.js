import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, CreateRoomScreen } from '../screens';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export const AppStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }} />
      <Tab.Screen
        name="Join Room"
        component={CreateRoomScreen}
        options={{
          tabBarLabel: 'New',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="enter-outline" size={size} color={color} />
          ),
        }} />
      <Tab.Screen
        name="Create Room"
        component={CreateRoomScreen}
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>);
};
