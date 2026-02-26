import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText, Button } from '../base';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';

/**
 * ErrorMessage Component
 * 
 * Error display with retry action
 * 
 * @param {string} title - Error title
 * @param {string} message - Error message
 * @param {function} onRetry - Retry action
 * @param {boolean} fullScreen - Covers entire screen
 */
export default function ErrorMessage({
  title = 'Oops! Something went wrong',
  message = 'Please try again',
  onRetry,
  fullScreen = false,
}) {
  const containerStyle = fullScreen ? styles.fullScreen : styles.inline;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.content}>
        <Text style={styles.emoji}>⚠️</Text>
        
        <CustomText variant="h3" center style={styles.title}>
          {title}
        </CustomText>
        
        <CustomText
          variant="body"
          color={COLORS.text.secondary}
          center
          style={styles.message}
        >
          {message}
        </CustomText>

        {onRetry && (
          <Button
            title="Try Again"
            variant="primary"
            onPress={onRetry}
            style={styles.button}
          />
        )}
      </View>
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
    padding: SPACING.xl,
  },
  inline: {
    padding: SPACING.xl,
    backgroundColor: COLORS.background.secondary,
    borderRadius: BORDER_RADIUS.lg,
  },
  content: {
    alignItems: 'center',
    maxWidth: 300,
  },
  emoji: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  title: {
    marginBottom: SPACING.sm,
  },
  message: {
    marginBottom: SPACING.lg,
  },
  button: {
    minWidth: 150,
  },
});
