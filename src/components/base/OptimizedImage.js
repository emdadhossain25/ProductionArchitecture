import React, { useState } from 'react';
import { Image, StyleSheet, View, ActivityIndicator } from 'react-native';
import { COLORS } from '../../constants/theme';

/**
 * OptimizedImage Component
 * 
 * Optimized image loading with:
 * - Loading indicator
 * - Error handling
 * - Proper resize mode
 * - Cache control
 * 
 * @param {string} source - Image URI or require()
 * @param {object} style - Image styles
 * @param {string} resizeMode - 'cover' | 'contain' | 'stretch'
 */
const OptimizedImage = React.memo(({ 
  source, 
  style, 
  resizeMode = 'cover',
  showLoader = true,
  ...props 
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoadStart = () => {
    setLoading(true);
    setError(false);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  if (error) {
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.errorText}>📷</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <Image
        source={typeof source === 'string' ? { uri: source } : source}
        style={[styles.image, style]}
        resizeMode={resizeMode}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        {...props}
      />
      
      {loading && showLoader && (
        <View style={styles.loader}>
          <ActivityIndicator color={COLORS.primary} />
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.tertiary,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.tertiary,
  },
  errorText: {
    fontSize: 32,
    textAlign: 'center',
  },
});

export default OptimizedImage;
