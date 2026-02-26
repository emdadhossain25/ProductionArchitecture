import React from 'react';
import {
  Modal as RNModal,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { CustomText, Button } from '../base';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Modal Component
 * 
 * Customizable modal dialog
 * 
 * @param {boolean} visible - Modal visibility
 * @param {function} onClose - Close handler
 * @param {string} title - Modal title
 * @param {ReactNode} children - Modal content
 * @param {string} primaryAction - Primary button text
 * @param {function} onPrimaryAction - Primary button handler
 * @param {string} secondaryAction - Secondary button text
 * @param {function} onSecondaryAction - Secondary button handler
 * @param {boolean} dismissible - Can close by tapping backdrop
 */
export default function Modal({
  visible,
  onClose,
  title,
  children,
  primaryAction,
  onPrimaryAction,
  secondaryAction,
  onSecondaryAction,
  dismissible = true,
}) {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={dismissible ? onClose : undefined}
    >
      <View style={styles.backdrop}>
        {/* Backdrop - tap to close if dismissible */}
        {dismissible && (
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={onClose}
          />
        )}

        {/* Modal Content */}
        <View style={styles.container}>
          {/* Title */}
          {title && (
            <View style={styles.header}>
              <CustomText variant="h3">{title}</CustomText>
              {dismissible && (
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <CustomText variant="h2">×</CustomText>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Body */}
          <View style={styles.body}>{children}</View>

          {/* Actions */}
          {(primaryAction || secondaryAction) && (
            <View style={styles.footer}>
              {secondaryAction && (
                <Button
                  title={secondaryAction}
                  variant="outline"
                  onPress={onSecondaryAction}
                  style={styles.button}
                />
              )}
              {primaryAction && (
                <Button
                  title={primaryAction}
                  variant="primary"
                  onPress={onPrimaryAction}
                  style={styles.button}
                />
              )}
            </View>
          )}
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  container: {
    backgroundColor: COLORS.background.primary,
    borderRadius: BORDER_RADIUS.xl,
    maxHeight: SCREEN_HEIGHT * 0.8,
    width: '100%',
    maxWidth: 400,
    ...SHADOWS.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },
  closeButton: {
    padding: SPACING.xs,
  },
  body: {
    padding: SPACING.lg,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border.light,
    gap: SPACING.sm,
  },
  button: {
    flex: 1,
  },
});
