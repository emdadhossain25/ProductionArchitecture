import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/config';
import { COLORS as LIGHT_COLORS } from '../constants/theme';

/**
 * ThemeContext
 * 
 * Manages theme state (light/dark mode)
 * 
 * Provides:
 * - isDark: Boolean for dark mode
 * - colors: Current color palette
 * - toggleTheme: Switch between light/dark
 * - setTheme: Set specific theme
 */

// Dark mode colors
const DARK_COLORS = {
  primary: '#4DA3FF',
  primaryDark: '#0051D5',
  primaryLight: '#80BDFF',
  
  secondary: '#8683E3',
  secondaryDark: '#3634A3',
  secondaryLight: '#B3B1F0',
  
  success: '#5ED75E',
  warning: '#FFB340',
  danger: '#FF6B6B',
  info: '#7DD3FC',
  
  text: {
    primary: '#FFFFFF',
    secondary: '#B3B3B3',
    disabled: '#6B6B6B',
    inverse: '#000000',
  },
  
  background: {
    primary: '#1A1A1A',
    secondary: '#2D2D2D',
    tertiary: '#3D3D3D',
  },
  
  border: {
    light: '#3D3D3D',
    medium: '#4D4D4D',
    dark: '#6B6B6B',
  },
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  // Load saved theme on mount
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(STORAGE_KEYS.THEME);
      if (savedTheme) {
        setIsDark(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Load theme error:', error);
    }
  };

  // Toggle theme
  const toggleTheme = useCallback(async () => {
    try {
      const newTheme = !isDark;
      setIsDark(newTheme);
      
      await AsyncStorage.setItem(
        STORAGE_KEYS.THEME,
        newTheme ? 'dark' : 'light'
      );
    } catch (error) {
      console.error('Toggle theme error:', error);
    }
  }, [isDark]);

  // Set specific theme
  const setTheme = useCallback(async (theme) => {
    try {
      const isDarkTheme = theme === 'dark';
      setIsDark(isDarkTheme);
      
      await AsyncStorage.setItem(
        STORAGE_KEYS.THEME,
        theme
      );
    } catch (error) {
      console.error('Set theme error:', error);
    }
  }, []);

  const value = {
    isDark,
    colors: isDark ? DARK_COLORS : LIGHT_COLORS,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  
  return context;
}

export default ThemeContext;
