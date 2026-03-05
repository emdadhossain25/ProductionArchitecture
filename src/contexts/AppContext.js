import React from 'react';
import { AuthProvider } from './AuthContext';
import { ThemeProvider } from './ThemeContext';
import { OfflineProvider } from './OfflineContext';

/**
 * AppProvider
 * 
 * Combines all context providers
 */
export function AppProvider({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <OfflineProvider>
          {children}
        </OfflineProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export { useAuth } from './AuthContext';
export { useTheme } from './ThemeContext';
export { useOffline } from './OfflineContext';
