import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../base';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';

/**
 * ProgressIndicator Component
 * 
 * Visual progress bar for multi-step forms
 * 
 * @param {number} currentStep - Current step (0-indexed)
 * @param {number} totalSteps - Total number of steps
 * @param {Array} labels - Step labels
 */
export default function ProgressIndicator({ currentStep, totalSteps, labels = [] }) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      {/* Step Indicators */}
      <View style={styles.stepsContainer}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View key={index} style={styles.stepWrapper}>
            <View
              style={[
                styles.stepCircle,
                index <= currentStep && styles.stepCircleActive,
                index < currentStep && styles.stepCircleCompleted,
              ]}
            >
              <CustomText
                variant="caption"
                color={index <= currentStep ? COLORS.text.inverse : COLORS.text.secondary}
              >
                {index < currentStep ? '✓' : index + 1}
              </CustomText>
            </View>
            {labels[index] && (
              <CustomText
                variant="caption"
                color={index <= currentStep ? COLORS.primary : COLORS.text.secondary}
                style={styles.stepLabel}
              >
                {labels[index]}
              </CustomText>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.background.tertiary,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.md,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  stepCircleActive: {
    backgroundColor: COLORS.primary,
  },
  stepCircleCompleted: {
    backgroundColor: COLORS.success,
  },
  stepLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
});
