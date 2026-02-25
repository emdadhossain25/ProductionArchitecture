import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';

/**
 * Card Component
 * 
 * Container with elevation/shadow
 * 
 * @param {ReactNode} children - Card content
 * @param {string} variant - 'elevated' | 'outlined' | 'flat'
 * @param {object} style - Additional styles
 */
export default function Card({
  children,
  variant = 'elevated',
  style,
  ...props
}) {
  const getCardStyle = () => {
    const baseStyle = [styles.card];
    
    switch (variant) {
      case 'elevated':
        baseStyle.push(styles.elevated);
        break;
      case 'outlined':
        baseStyle.push(styles.outlined);
        break;
      case 'flat':
        baseStyle.push(styles.flat);
        break;
    }
    
    return baseStyle;
  };

  return (
    <View style={[getCardStyle(), style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.background.primary,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
  },
  elevated: {
    ...SHADOWS.md,
  },
  outlined: {
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  flat: {
    backgroundColor: COLORS.background.secondary,
  },
});
