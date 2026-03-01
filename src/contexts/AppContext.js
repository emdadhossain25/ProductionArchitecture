import React from 'react';
import { AuthProvider } from './AuthContext';
import { ThemeProvider } from './ThemeContext';

/**
 * AppProvider
 * 
 * Combines all context providers in correct order
 * 
 * Order matters:
 * 1. ThemeProvider (needed everywhere)
 * 2. AuthProvider (needs theme)
 * 3. Other providers...
 * 
 * Usage:
 * <AppProvider>
 *   <App />
 * </AppProvider>
 */
export function AppProvider({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}

// Re-export hooks for convenience
export { useAuth } from './AuthContext';
export { useTheme } from './ThemeContext';
