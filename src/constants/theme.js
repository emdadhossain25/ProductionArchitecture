/**
 * Theme Configuration
 * Central location for all design tokens
 */

export const COLORS = {
  // Primary palette
  primary: '#007AFF',
  primaryDark: '#0051D5',
  primaryLight: '#4DA3FF',
  
  // Secondary palette
  secondary: '#5856D6',
  secondaryDark: '#3634A3',
  secondaryLight: '#8683E3',
  
  // Semantic colors
  success: '#34C759',
  warning: '#FF9500',
  danger: '#FF3B30',
  info: '#5AC8FA',
  
  // Text colors
  text: {
    primary: '#000000',
    secondary: '#6B6B6B',
    disabled: '#C7C7CC',
    inverse: '#FFFFFF',
  },
  
  // Background colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F2F2F7',
    tertiary: '#E5E5EA',
  },
  
  // Border colors
  border: {
    light: '#E5E5EA',
    medium: '#C7C7CC',
    dark: '#8E8E93',
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const TYPOGRAPHY = {
  // Font families (default system fonts)
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  
  // Font sizes
  fontSize: {
    xs: 11,
    sm: 13,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  },
  
  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  // Predefined text styles
  styles: {
    h1: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 38,
    },
    h2: {
      fontSize: 24,
      fontWeight: '700',
      lineHeight: 30,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 26,
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    bodyBold: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
    },
    caption: {
      fontSize: 13,
      fontWeight: '400',
      lineHeight: 18,
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 20,
    },
  },
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  round: 9999,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};

export const LAYOUT = {
  maxWidth: 1200,
  containerPadding: SPACING.md,
  headerHeight: 60,
  tabBarHeight: 60,
};

// Animation durations (ms)
export const ANIMATION = {
  fast: 200,
  normal: 300,
  slow: 500,
};
