import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { CustomText } from '../base';
import { COLORS, SPACING } from '../../constants/theme';

/**
 * Loading Component
 * 
 * Loading indicator with optional text
 * 
 * @param {string} text - Loading message
 * @param {string} size - 'small' | 'large'
 * @param {boolean} fullScreen - Covers entire screen
 */
export default function Loading({
  text = 'Loading...',
  size = 'large',
  fullScreen = false,
}) {
  const containerStyle = fullScreen ? styles.fullScreen : styles.inline;

  return (
    <View style={[styles.container, containerStyle]}>
      <ActivityIndicator size={size} color={COLORS.primary} />
      {text && (
        <CustomText
          variant="body"
          color={COLORS.text.secondary}
          style={styles.text}
        >
          {text}
        </CustomText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreen: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  inline: {
    padding: SPACING.xl,
  },
  text: {
    marginTop: SPACING.md,
  },
});
