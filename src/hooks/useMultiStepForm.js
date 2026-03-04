import { useState, useCallback } from 'react';

/**
 * useMultiStepForm Hook
 * 
 * Manage multi-step form state with navigation
 * 
 * @param {number} totalSteps - Total number of steps
 * @returns {Object} Step navigation and state
 * 
 * @example
 * const { currentStep, isFirstStep, isLastStep, next, previous, goToStep } = 
 *   useMultiStepForm(3);
 */
export default function useMultiStepForm(totalSteps) {
  const [currentStep, setCurrentStep] = useState(0);

  const next = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);

  const previous = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback((step) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    }
  }, [totalSteps]);

  const reset = useCallback(() => {
    setCurrentStep(0);
  }, []);

  return {
    currentStep,
    totalSteps,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === totalSteps - 1,
    progress: ((currentStep + 1) / totalSteps) * 100,
    next,
    previous,
    goToStep,
    reset,
  };
}
