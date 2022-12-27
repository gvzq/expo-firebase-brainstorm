import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, CreateScreen, JoinScreen, ActivityScreen, SettingsScreen } from '../screens';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <HomeStack.Screen
        name="Create"
        component={CreateScreen}
        options={{ tabBarLabel: 'Create Room' }}
      />
      <HomeStack.Screen
        name="Join"
        component={JoinScreen}
      />
      <HomeStack.Screen
        name="Activity"
        component={ActivityScreen}
      />
    </HomeStack.Navigator>
  );
}

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </SettingsStack.Navigator>
  );
}

export const AppStack = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeStack"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }} />
      <Tab.Screen name="SettingsStack" component={SettingsStackScreen} />
    </Tab.Navigator>);
};
