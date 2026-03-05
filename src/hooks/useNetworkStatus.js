import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

/**
 * useNetworkStatus Hook
 * 
 * Detect network connectivity in real-time
 * 
 * @returns {Object} { isConnected, isInternetReachable, type }
 * 
 * @example
 * const { isConnected, isInternetReachable } = useNetworkStatus();
 * 
 * if (!isConnected) {
 *   showOfflineMessage();
 * }
 */
export default function useNetworkStatus() {
  const [networkState, setNetworkState] = useState({
    isConnected: true,
    isInternetReachable: true,
    type: 'unknown',
  });

  useEffect(() => {
    // Get initial state
    NetInfo.fetch().then(state => {
      setNetworkState({
        isConnected: state.isConnected ?? true,
        isInternetReachable: state.isInternetReachable ?? true,
        type: state.type,
      });
    });

    // Subscribe to changes
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetworkState({
        isConnected: state.isConnected ?? true,
        isInternetReachable: state.isInternetReachable ?? true,
        type: state.type,
      });
    });

    return () => unsubscribe();
  }, []);

  return networkState;
}
