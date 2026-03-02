import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { useAuth } from '../contexts';
import { Loading } from '../components/feedback';

/**
 * RootNavigator
 * 
 * Root-level navigation that decides which navigator to show
 * based on authentication state
 * 
 * Flow:
 * - isLoading → Show loading screen
 * - isAuthenticated → Show MainNavigator (tabs)
 * - !isAuthenticated → Show AuthNavigator (login/register)
 */

export default function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading text="Loading..." fullScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
