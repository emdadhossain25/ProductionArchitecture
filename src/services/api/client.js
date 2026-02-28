import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config, { STORAGE_KEYS } from '../../constants/config';

/**
 * API Client Configuration
 * 
 * Centralized axios instance with:
 * - Base URL configuration
 * - Timeout settings
 * - Request/response interceptors
 * - Automatic token injection
 * - Error handling
 */

// Create axios instance
const apiClient = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: config.TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request Interceptor - Add auth token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Get token from storage
      const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Log request in development
      if (__DEV__) {
        console.log('📤 API Request:', {
          method: config.method?.toUpperCase(),
          url: config.url,
          data: config.data,
        });
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - Handle errors & refresh token
apiClient.interceptors.response.use(
  (response) => {
    // Log response in development
    if (__DEV__) {
      console.log('📥 API Response:', {
        status: response.status,
        data: response.data,
      });
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Log error in development
    if (__DEV__) {
      console.error('❌ API Error:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        url: originalRequest?.url,
      });
    }

    // Handle 401 Unauthorized - Token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const refreshToken = await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        
        if (refreshToken) {
          const response = await axios.post(
            `${config.API_BASE_URL}/auth/refresh`,
            { refreshToken }
          );

          const { token } = response.data;

          // Save new token
          await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed - logout user
        await AsyncStorage.multiRemove([
          STORAGE_KEYS.AUTH_TOKEN,
          STORAGE_KEYS.REFRESH_TOKEN,
          STORAGE_KEYS.USER_DATA,
        ]);

        // Redirect to login (handle in app level)
        return Promise.reject(refreshError);
      }
    }

    // Handle network errors
    if (!error.response) {
      return Promise.reject({
        message: 'Network error. Please check your connection.',
        isNetworkError: true,
      });
    }

    // Handle other errors
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Something went wrong';

    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

// Retry logic for failed requests
const retryRequest = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0 || !error.isNetworkError) {
      throw error;
    }

    // Wait before retry
    await new Promise(resolve => setTimeout(resolve, delay));

    // Retry with exponential backoff
    return retryRequest(fn, retries - 1, delay * 2);
  }
};

export { apiClient, retryRequest };
export default apiClient;
