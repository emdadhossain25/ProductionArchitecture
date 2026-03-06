import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import CompleteProfileScreen from '../screens/Profile/CompleteProfileScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import ErrorTestScreen from '../screens/Settings/ErrorTestScreen';
import OfflineExpenseScreen from '../screens/Expenses/OfflineExpenseScreen';
import { useTheme } from '../contexts';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function ExpensesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ExpensesMain" component={OfflineExpenseScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="CompleteProfile" component={CompleteProfileScreen} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsMain" component={SettingsScreen} />
      <Stack.Screen name="ErrorTest" component={ErrorTestScreen} />
    </Stack.Navigator>
  );
}

export default function MainNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background.primary,
          borderTopColor: colors.border.light,
          paddingBottom: 8,
          height: 60,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 24 }}>
              {focused ? '🏠' : '🏡'}
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="ExpensesTab"
        component={ExpensesStack}
        options={{
          tabBarLabel: 'Expenses',
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 24 }}>
              {focused ? '💰' : '💵'}
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 24 }}>
              {focused ? '👤' : '👥'}
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStack}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 24 }}>
              {focused ? '⚙️' : '🔧'}
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
