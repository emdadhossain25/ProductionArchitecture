import { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

/**
 * useKeyboard Hook
 * 
 * Track keyboard visibility and height
 * 
 * @returns {Object} { isVisible, keyboardHeight }
 * 
 * @example
 * const { isVisible, keyboardHeight } = useKeyboard();
 * 
 * // Adjust padding when keyboard is visible
 * <View style={{ paddingBottom: keyboardHeight }}>
 *   <TextInput />
 * </View>
 */
export default function useKeyboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
      setIsVisible(true);
      setKeyboardHeight(e.endCoordinates.height);
    });

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsVisible(false);
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return {
    isVisible,
    keyboardHeight,
  };
}
