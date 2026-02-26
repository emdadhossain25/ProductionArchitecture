import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText, Button } from '../base';
import { COLORS, SPACING } from '../../constants/theme';

/**
 * EmptyState Component
 * 
 * Placeholder for empty data
 * 
 * @param {string} emoji - Display emoji
 * @param {string} title - Empty state title
 * @param {string} message - Empty state message
 * @param {string} actionText - Action button text
 * @param {function} onAction - Action button handler
 */
export default function EmptyState({
  emoji = '📭',
  title = 'Nothing here yet',
  message = 'Get started by adding something!',
  actionText,
  onAction,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>
      
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

      {actionText && onAction && (
        <Button
          title={actionText}
          variant="primary"
          onPress={onAction}
          style={styles.button}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emoji: {
    fontSize: 80,
    marginBottom: SPACING.lg,
  },
  title: {
    marginBottom: SPACING.sm,
  },
  message: {
    marginBottom: SPACING.xl,
    maxWidth: 280,
  },
  button: {
    minWidth: 150,
  },
});
