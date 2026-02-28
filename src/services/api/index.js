/**
 * API Services
 * 
 * Centralized API layer for all backend communication
 * 
 * Usage:
 * import { api } from '@/services/api';
 * const result = await api.auth.login(email, password);
 */

import authService from './auth';
import userService from './user';

export const api = {
  auth: authService,
  user: userService,
};

export { default as apiClient } from './client';
export { retryRequest } from './client';
