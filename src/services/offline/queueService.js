import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Queue Service
 * 
 * Manages offline action queue
 * Actions are stored and synced when online
 */

const QUEUE_KEY = '@action_queue';

class QueueService {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  /**
   * Load queue from storage
   */
  async loadQueue() {
    try {
      const stored = await AsyncStorage.getItem(QUEUE_KEY);
      if (stored) {
        this.queue = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Load queue error:', error);
    }
  }

  /**
   * Save queue to storage
   */
  async saveQueue() {
    try {
      await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(this.queue));
    } catch (error) {
      console.error('Save queue error:', error);
    }
  }

  /**
   * Add action to queue
   * @param {Object} action - { type, payload, timestamp }
   */
  async addToQueue(action) {
    const queueItem = {
      id: Date.now().toString(),
      ...action,
      timestamp: Date.now(),
      status: 'pending',
    };

    this.queue.push(queueItem);
    await this.saveQueue();

    return queueItem.id;
  }

  /**
   * Get all pending actions
   */
  getPendingActions() {
    return this.queue.filter(item => item.status === 'pending');
  }

  /**
   * Mark action as completed
   */
  async markCompleted(actionId) {
    const index = this.queue.findIndex(item => item.id === actionId);
    if (index !== -1) {
      this.queue[index].status = 'completed';
      await this.saveQueue();
    }
  }

  /**
   * Mark action as failed
   */
  async markFailed(actionId, error) {
    const index = this.queue.findIndex(item => item.id === actionId);
    if (index !== -1) {
      this.queue[index].status = 'failed';
      this.queue[index].error = error;
      await this.saveQueue();
    }
  }

  /**
   * Remove completed actions
   */
  async clearCompleted() {
    this.queue = this.queue.filter(item => item.status !== 'completed');
    await this.saveQueue();
  }

  /**
   * Get queue size
   */
  getQueueSize() {
    return this.queue.length;
  }

  /**
   * Get pending count
   */
  getPendingCount() {
    return this.queue.filter(item => item.status === 'pending').length;
  }

  /**
   * Process queue (sync)
   * @param {Function} syncFunction - Function to sync each action
   */
  async processQueue(syncFunction) {
    if (this.isProcessing) {
      console.log('Queue already processing');
      return;
    }

    this.isProcessing = true;
    const pending = this.getPendingActions();

    console.log(`Processing ${pending.length} pending actions...`);

    for (const action of pending) {
      try {
        await syncFunction(action);
        await this.markCompleted(action.id);
        console.log(`✅ Synced action ${action.id}`);
      } catch (error) {
        await this.markFailed(action.id, error.message);
        console.error(`❌ Failed to sync action ${action.id}:`, error);
      }
    }

    await this.clearCompleted();
    this.isProcessing = false;

    console.log('Queue processing complete!');
  }
}

export default new QueueService();
