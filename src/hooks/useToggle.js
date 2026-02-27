import { useState, useCallback } from 'react';

/**
 * useToggle Hook
 * 
 * Simple boolean state toggle
 * 
 * @param {boolean} initialValue - Initial state (default: false)
 * @returns {Array} [value, toggle, setValue]
 * 
 * @example
 * const [isOpen, toggleOpen, setIsOpen] = useToggle(false);
 * 
 * <Button onPress={toggleOpen}>Toggle</Button>
 * <Button onPress={() => setIsOpen(true)}>Open</Button>
 */
export default function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  return [value, toggle, setValue];
}
