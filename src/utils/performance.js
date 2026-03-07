/**
 * Performance Utilities
 * 
 * Helpers for optimizing React Native performance
 */

/**
 * Get optimized FlatList props
 * Use this for lists with 100+ items
 */
export const getOptimizedFlatListProps = () => ({
  // Remove clipped subviews for better performance
  removeClippedSubviews: true,
  
  // Maximum number of items to render at once
  maxToRenderPerBatch: 10,
  
  // Number of items to keep rendered outside visible area
  windowSize: 5,
  
  // Delay before rendering new items (ms)
  updateCellsBatchingPeriod: 50,
  
  // Initial number of items to render
  initialNumToRender: 10,
  
  // Use this for better scroll performance
  getItemLayout: null, // Set this if all items have same height
});

/**
 * Get item layout for fixed-height items
 * Dramatically improves scroll performance
 * 
 * @param {number} itemHeight - Height of each item
 * @returns {function} getItemLayout function
 */
export const getFixedHeightItemLayout = (itemHeight) => {
  return (data, index) => ({
    length: itemHeight,
    offset: itemHeight * index,
    index,
  });
};

/**
 * Memoized key extractor for FlatList
 * Prevents unnecessary re-renders
 */
export const keyExtractor = (item, index) => {
  return item.id?.toString() || index.toString();
};

/**
 * Check if component should update
 * Use with React.memo
 */
export const arePropsEqual = (prevProps, nextProps) => {
  // Add custom comparison logic
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
};

/**
 * Debounce function for search/input
 * Prevents excessive re-renders
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function for scroll/gestures
 * Limits function calls per time period
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
