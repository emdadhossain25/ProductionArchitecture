/**
 * Contexts
 * 
 * Global state management with Context API
 * 
 * Usage:
 * import { AppProvider, useAuth, useTheme } from '@/contexts';
 * 
 * <AppProvider>
 *   <App />
 * </AppProvider>
 */

export { AppProvider } from './AppContext';
export { AuthProvider, useAuth } from './AuthContext';
export { ThemeProvider, useTheme } from './ThemeContext';
