import apiClient from './client';

/**
 * User API Service
 * 
 * Handles user-related API calls
 */

const userService = {
  /**
   * Get user profile
   * @param {string} userId 
   * @returns {Promise} User profile
   */
  getProfile: async (userId) => {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  },

  /**
   * Update user profile
   * @param {string} userId 
   * @param {Object} updates 
   * @returns {Promise} Updated user
   */
  updateProfile: async (userId, updates) => {
    const response = await apiClient.put(`/users/${userId}`, updates);
    return response.data;
  },

  /**
   * Upload profile picture
   * @param {string} userId 
   * @param {Object} imageData 
   * @returns {Promise} Image URL
   */
  uploadProfilePicture: async (userId, imageData) => {
    const formData = new FormData();
    formData.append('image', {
      uri: imageData.uri,
      type: imageData.type || 'image/jpeg',
      name: imageData.fileName || 'profile.jpg',
    });

    const response = await apiClient.post(
      `/users/${userId}/profile-picture`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  },

  /**
   * Delete account
   * @param {string} userId 
   * @returns {Promise}
   */
  deleteAccount: async (userId) => {
    const response = await apiClient.delete(`/users/${userId}`);
    return response.data;
  },
};

export default userService;
