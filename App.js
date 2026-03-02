import React from 'react';
import { AppProvider } from './src/contexts';
import RootNavigator from './src/navigation/RootNavigator';

/**
 * App Entry Point
 * 
 * Architecture:
 * 1. AppProvider - Wraps entire app with contexts
 * 2. RootNavigator - Handles all navigation
 */

export default function App() {
  return (
    <AppProvider>
      <RootNavigator />
    </AppProvider>
  );
}
