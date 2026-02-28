import apiClient from './client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../constants/config';

/**
 * Authentication API Service
 * 
 * Handles all auth-related API calls
 */

const authService = {
  /**
   * Login user
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise} User data + token
   */
  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    });

    const { token, refreshToken, user } = response.data;

    // Save to storage
    await AsyncStorage.multiSet([
      [STORAGE_KEYS.AUTH_TOKEN, token],
      [STORAGE_KEYS.REFRESH_TOKEN, refreshToken],
      [STORAGE_KEYS.USER_DATA, JSON.stringify(user)],
    ]);

    return response.data;
  },

  /**
   * Register new user
   * @param {Object} userData - { email, password, name }
   * @returns {Promise} User data + token
   */
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);

    const { token, refreshToken, user } = response.data;

    // Save to storage
    await AsyncStorage.multiSet([
      [STORAGE_KEYS.AUTH_TOKEN, token],
      [STORAGE_KEYS.REFRESH_TOKEN, refreshToken],
      [STORAGE_KEYS.USER_DATA, JSON.stringify(user)],
    ]);

    return response.data;
  },

  /**
   * Logout user
   * @returns {Promise}
   */
  logout: async () => {
    try {
      // Call logout endpoint
      await apiClient.post('/auth/logout');
    } catch (error) {
      // Continue even if API call fails
      console.error('Logout API error:', error);
    } finally {
      // Clear local storage
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
        STORAGE_KEYS.USER_DATA,
      ]);
    }
  },

  /**
   * Refresh auth token
   * @returns {Promise} New token
   */
  refreshToken: async () => {
    const refreshToken = await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    const response = await apiClient.post('/auth/refresh', {
      refreshToken,
    });

    const { token } = response.data;

    // Save new token
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);

    return token;
  },

  /**
   * Get current user
   * @returns {Promise} User data
   */
  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  /**
   * Request password reset
   * @param {string} email 
   * @returns {Promise}
   */
  forgotPassword: async (email) => {
    const response = await apiClient.post('/auth/forgot-password', {
      email,
    });
    return response.data;
  },

  /**
   * Reset password with token
   * @param {string} token 
   * @param {string} newPassword 
   * @returns {Promise}
   */
  resetPassword: async (token, newPassword) => {
    const response = await apiClient.post('/auth/reset-password', {
      token,
      password: newPassword,
    });
    return response.data;
  },
};

export default authService;
