import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import useNetworkStatus from '../hooks/useNetworkStatus';
import queueService from '../services/offline/queueService';

/**
 * OfflineContext
 * 
 * Manages offline state and sync
 */

const OfflineContext = createContext(null);

export function OfflineProvider({ children }) {
  const { isConnected, isInternetReachable } = useNetworkStatus();
  const [queueCount, setQueueCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  const isOnline = isConnected && isInternetReachable;

  // Load queue on mount
  useEffect(() => {
    loadQueue();
  }, []);

  // Auto-sync when coming online
  useEffect(() => {
    if (isOnline && queueCount > 0) {
      console.log('🌐 Back online! Auto-syncing...');
      syncQueue();
    }
  }, [isOnline]);

  const loadQueue = async () => {
    await queueService.loadQueue();
    setQueueCount(queueService.getPendingCount());
  };

  const addToQueue = async (action) => {
    const actionId = await queueService.addToQueue(action);
    setQueueCount(queueService.getPendingCount());
    return actionId;
  };

  const syncQueue = async () => {
    if (!isOnline) {
      console.log('📴 Offline - cannot sync');
      return;
    }

    setIsSyncing(true);

    try {
      // Process queue with sync function
      await queueService.processQueue(async (action) => {
        // Simulate API call
        console.log('Syncing:', action.type, action.payload);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Here you would call your actual API
        // await api.syncAction(action);
      });

      setQueueCount(queueService.getPendingCount());
    } catch (error) {
      console.error('Sync error:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const value = {
    isOnline,
    isConnected,
    isInternetReachable,
    queueCount,
    isSyncing,
    addToQueue,
    syncQueue,
  };

  return (
    <OfflineContext.Provider value={value}>
      {children}
    </OfflineContext.Provider>
  );
}

export function useOffline() {
  const context = useContext(OfflineContext);
  
  if (!context) {
    throw new Error('useOffline must be used within OfflineProvider');
  }
  
  return context;
}

export default OfflineContext;
