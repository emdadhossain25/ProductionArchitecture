import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/config';
import { api } from '../services/api';

/**
 * AuthContext
 * 
 * Manages authentication state across the app
 * 
 * Provides:
 * - user: Current user object
 * - token: Auth token
 * - isAuthenticated: Boolean
 * - isLoading: Initial auth check loading
 * - login: Login function
 * - register: Register function
 * - logout: Logout function
 * - updateUser: Update user data
 */

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing auth on mount
  useEffect(() => {
    checkExistingAuth();
  }, []);

  const checkExistingAuth = async () => {
    try {
      const [storedToken, storedUser] = await AsyncStorage.multiGet([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.USER_DATA,
      ]);

      const authToken = storedToken[1];
      const userData = storedUser[1];

      if (authToken && userData) {
        setToken(authToken);
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Login
  const login = useCallback(async (email, password) => {
    try {
      const response = await api.auth.login(email, password);
      
      setUser(response.user);
      setToken(response.token);

      return { success: true, user: response.user };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Login failed' 
      };
    }
  }, []);

  // Register
  const register = useCallback(async (userData) => {
    try {
      const response = await api.auth.register(userData);
      
      setUser(response.user);
      setToken(response.token);

      return { success: true, user: response.user };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Registration failed' 
      };
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    try {
      await api.auth.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear state regardless of API call success
      setUser(null);
      setToken(null);
      
      // Clear storage
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
        STORAGE_KEYS.USER_DATA,
      ]);
    }
  }, []);

  // Update user data
  const updateUser = useCallback(async (updates) => {
    try {
      const updatedUser = { ...user, ...updates };
      
      setUser(updatedUser);
      
      // Save to storage
      await AsyncStorage.setItem(
        STORAGE_KEYS.USER_DATA,
        JSON.stringify(updatedUser)
      );

      return { success: true, user: updatedUser };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Update failed' 
      };
    }
  }, [user]);

  const value = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  
  return context;
}

export default AuthContext;
