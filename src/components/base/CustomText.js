import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../constants/theme';

/**
 * Text Component
 * 
 * Typography system with predefined styles
 * 
 * @param {string} variant - 'h1' | 'h2' | 'h3' | 'body' | 'bodyBold' | 'caption'
 * @param {string} color - Text color
 * @param {boolean} center - Center align text
 * @param {object} style - Additional styles
 */
export default function CustomText({
  children,
  variant = 'body',
  color = COLORS.text.primary,
  center = false,
  style,
  ...props
}) {
  return (
    <Text
      style={[
        styles[variant],
        { color },
        center && styles.center,
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  h1: TYPOGRAPHY.styles.h1,
  h2: TYPOGRAPHY.styles.h2,
  h3: TYPOGRAPHY.styles.h3,
  body: TYPOGRAPHY.styles.body,
  bodyBold: TYPOGRAPHY.styles.bodyBold,
  caption: TYPOGRAPHY.styles.caption,
  center: {
    textAlign: 'center',
  },
});
