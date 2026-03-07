import { useCallback, useMemo, useRef, useEffect } from 'react';

/**
 * usePerformance Hook
 * 
 * Collection of performance optimization helpers
 */

/**
 * Memoize expensive calculations
 * 
 * @example
 * const expensiveValue = useMemoizedValue(() => {
 *   return heavyCalculation(data);
 * }, [data]);
 */
export function useMemoizedValue(calculation, dependencies) {
  return useMemo(calculation, dependencies);
}

/**
 * Memoize callback functions
 * Prevents child re-renders
 * 
 * @example
 * const handlePress = useMemoizedCallback(() => {
 *   doSomething();
 * }, []);
 */
export function useMemoizedCallback(callback, dependencies) {
  return useCallback(callback, dependencies);
}

/**
 * Track render count (dev only)
 * Helps identify unnecessary re-renders
 */
export function useRenderCount(componentName = 'Component') {
  const renderCount = useRef(0);
  
  useEffect(() => {
    renderCount.current += 1;
    if (__DEV__) {
      console.log(`${componentName} rendered ${renderCount.current} times`);
    }
  });
  
  return renderCount.current;
}

/**
 * Previous value hook
 * Compare current vs previous value
 */
export function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

/**
 * Throttled callback
 * Limit function calls
 */
export function useThrottle(callback, delay) {
  const lastRan = useRef(Date.now());

  return useCallback(
    (...args) => {
      if (Date.now() - lastRan.current >= delay) {
        callback(...args);
        lastRan.current = Date.now();
      }
    },
    [callback, delay]
  );
}

/**
 * Check if component is mounted
 * Prevents memory leaks
 */
export function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return useCallback(() => isMounted.current, []);
}

export default {
  useMemoizedValue,
  useMemoizedCallback,
  useRenderCount,
  usePrevious,
  useThrottle,
  useIsMounted,
};
