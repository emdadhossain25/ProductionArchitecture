/**
 * Application Configuration
 * Environment-specific settings
 */

const ENV = 'development'; // Change to 'production' when deploying

const config = {
  development: {
    API_BASE_URL: 'http://localhost:3000',
    DEBUG: true,
    ENABLE_LOGGING: true,
    TIMEOUT_MS: 10000,
  },
  
  production: {
    API_BASE_URL: 'https://api.yourapp.com',
    DEBUG: false,
    ENABLE_LOGGING: false,
    TIMEOUT_MS: 5000,
  },
};

export default config[ENV];

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/update',
  },
};

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_DATA: '@user_data',
  THEME: '@theme',
  LANGUAGE: '@language',
};

// App constants
export const APP = {
  NAME: 'Production Architecture',
  VERSION: '1.0.0',
  BUILD: '1',
};
