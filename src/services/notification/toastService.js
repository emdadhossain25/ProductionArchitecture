import { Alert } from 'react-native';

/**
 * Toast Service
 * 
 * Centralized notification system
 * Uses React Native Alert for simplicity
 * Can be upgraded to react-native-toast-message later
 */

class ToastService {
  /**
   * Show success message
   */
  success(title, message) {
    Alert.alert(
      `✅ ${title}`,
      message,
      [{ text: 'OK' }]
    );
  }

  /**
   * Show error message
   */
  error(title, message) {
    Alert.alert(
      `❌ ${title}`,
      message,
      [{ text: 'OK' }]
    );
  }

  /**
   * Show warning message
   */
  warning(title, message) {
    Alert.alert(
      `⚠️ ${title}`,
      message,
      [{ text: 'OK' }]
    );
  }

  /**
   * Show info message
   */
  info(title, message) {
    Alert.alert(
      `ℹ️ ${title}`,
      message,
      [{ text: 'OK' }]
    );
  }

  /**
   * Show confirmation dialog
   */
  confirm(title, message, onConfirm, onCancel) {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: onCancel,
        },
        {
          text: 'OK',
          onPress: onConfirm,
        },
      ]
    );
  }
}

export default new ToastService();
