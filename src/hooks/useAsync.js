import { useState, useCallback } from 'react';

/**
 * useAsync Hook
 * 
 * Handle async operations with loading/error/success states
 * 
 * @param {Function} asyncFunction - Async function to execute
 * @returns {Object} { execute, loading, error, data, reset }
 * 
 * @example
 * const { execute, loading, error, data } = useAsync(api.login);
 * 
 * const handleLogin = async () => {
 *   const result = await execute(email, password);
 *   if (result) {
 *     // Success
 *   }
 * };
 */
export default function useAsync(asyncFunction) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Execute the async function
  const execute = useCallback(
    async (...params) => {
      try {
        setLoading(true);
        setError(null);

        const response = await asyncFunction(...params);
        
        setData(response);
        setLoading(false);
        
        return response;
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Something went wrong';
        
        setError(errorMessage);
        setLoading(false);
        
        return null;
      }
    },
    [asyncFunction]
  );

  // Reset all states
  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    execute,
    loading,
    error,
    data,
    reset,
  };
}
