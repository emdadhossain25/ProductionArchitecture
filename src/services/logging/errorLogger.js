import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Error Logger Service
 * 
 * Logs errors locally and can send to remote service
 */

const ERROR_LOG_KEY = '@error_logs';
const MAX_LOGS = 100; // Keep last 100 errors

class ErrorLogger {
  constructor() {
    this.logs = [];
    this.loadLogs();
  }

  /**
   * Load logs from storage
   */
  async loadLogs() {
    try {
      const stored = await AsyncStorage.getItem(ERROR_LOG_KEY);
      if (stored) {
        this.logs = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Load logs error:', error);
    }
  }

  /**
   * Save logs to storage
   */
  async saveLogs() {
    try {
      await AsyncStorage.setItem(ERROR_LOG_KEY, JSON.stringify(this.logs));
    } catch (error) {
      console.error('Save logs error:', error);
    }
  }

  /**
   * Log an error
   */
  async logError(error, context = {}) {
    const errorLog = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      message: error.message || error.toString(),
      stack: error.stack,
      context,
      type: 'error',
    };

    // Add to logs
    this.logs.unshift(errorLog);

    // Keep only last MAX_LOGS
    if (this.logs.length > MAX_LOGS) {
      this.logs = this.logs.slice(0, MAX_LOGS);
    }

    // Save to storage
    await this.saveLogs();

    // Log to console in dev
    if (__DEV__) {
      console.error('Error logged:', errorLog);
    }

    // Send to remote service (mock)
    this.sendToRemote(errorLog);

    return errorLog.id;
  }

  /**
   * Log a warning
   */
  async logWarning(message, context = {}) {
    const warningLog = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      message,
      context,
      type: 'warning',
    };

    this.logs.unshift(warningLog);

    if (this.logs.length > MAX_LOGS) {
      this.logs = this.logs.slice(0, MAX_LOGS);
    }

    await this.saveLogs();

    if (__DEV__) {
      console.warn('Warning logged:', warningLog);
    }

    return warningLog.id;
  }

  /**
   * Log an info message
   */
  async logInfo(message, context = {}) {
    const infoLog = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      message,
      context,
      type: 'info',
    };

    this.logs.unshift(infoLog);

    if (this.logs.length > MAX_LOGS) {
      this.logs = this.logs.slice(0, MAX_LOGS);
    }

    await this.saveLogs();

    if (__DEV__) {
      console.log('Info logged:', infoLog);
    }

    return infoLog.id;
  }

  /**
   * Get all logs
   */
  getLogs() {
    return this.logs;
  }

  /**
   * Get logs by type
   */
  getLogsByType(type) {
    return this.logs.filter(log => log.type === type);
  }

  /**
   * Clear all logs
   */
  async clearLogs() {
    this.logs = [];
    await AsyncStorage.removeItem(ERROR_LOG_KEY);
  }

  /**
   * Send to remote logging service (mock)
   * Replace with Sentry, LogRocket, etc.
   */
  sendToRemote(log) {
    // Mock remote logging
    if (__DEV__) {
      console.log('📤 Sending to remote service:', log.message);
    }

    // In production, send to:
    // - Sentry: Sentry.captureException(error)
    // - LogRocket: LogRocket.captureException(error)
    // - Firebase Crashlytics: crashlytics().recordError(error)
  }
}

export default new ErrorLogger();
