import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants/theme';

/**
 * Input Component
 * 
 * Text input with validation and error handling
 * 
 * @param {string} label - Input label
 * @param {string} placeholder - Placeholder text
 * @param {string} value - Input value
 * @param {function} onChangeText - Change handler
 * @param {string} type - 'text' | 'email' | 'password' | 'number'
 * @param {string} error - Error message
 * @param {boolean} required - Shows required indicator
 */
export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  type = 'text',
  error,
  required = false,
  style,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const getInputProps = () => {
    switch (type) {
      case 'email':
        return {
          keyboardType: 'email-address',
          autoCapitalize: 'none',
          autoCorrect: false,
        };
      case 'password':
        return {
          secureTextEntry: !isPasswordVisible,
          autoCapitalize: 'none',
          autoCorrect: false,
        };
      case 'number':
        return {
          keyboardType: 'numeric',
        };
      default:
        return {};
    }
  };

  const getBorderColor = () => {
    if (error) return COLORS.danger;
    if (isFocused) return COLORS.primary;
    return COLORS.border.medium;
  };

  return (
    <View style={[styles.container, style]}>
      {/* Label */}
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      {/* Input Container */}
      <View style={[styles.inputContainer, { borderColor: getBorderColor() }]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.text.disabled}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...getInputProps()}
          {...props}
        />

        {/* Password Toggle */}
        {type === 'password' && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.iconButton}
          >
            <Text style={styles.iconText}>
              {isPasswordVisible ? '🙈' : '👁️'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Error Message */}
      {error && (
        <Text style={styles.error}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    ...TYPOGRAPHY.styles.caption,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  required: {
    color: COLORS.danger,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.primary,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
  },
  input: {
    flex: 1,
    ...TYPOGRAPHY.styles.body,
    color: COLORS.text.primary,
    paddingVertical: SPACING.md,
    minHeight: 48,
  },
  iconButton: {
    padding: SPACING.xs,
  },
  iconText: {
    fontSize: 20,
  },
  error: {
    ...TYPOGRAPHY.styles.caption,
    color: COLORS.danger,
    marginTop: SPACING.xs,
  },
});
