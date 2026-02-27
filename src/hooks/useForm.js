import { useState, useCallback } from 'react';

/**
 * useForm Hook
 * 
 * Handle form state and validation
 * 
 * @param {Object} initialValues - Initial form values
 * @param {Function} validate - Validation function
 * @returns {Object} { values, errors, handleChange, handleSubmit, reset }
 * 
 * @example
 * const { values, errors, handleChange, handleSubmit } = useForm(
 *   { email: '', password: '' },
 *   validateLoginForm
 * );
 */
export default function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Handle input change
  const handleChange = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  }, [errors]);

  // Handle input blur (mark as touched)
  const handleBlur = useCallback((name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));

    // Validate single field on blur
    if (validate) {
      const fieldErrors = validate(values);
      if (fieldErrors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: fieldErrors[name],
        }));
      }
    }
  }, [values, validate]);

  // Handle form submit
  const handleSubmit = useCallback((onSubmit) => {
    return async (e) => {
      if (e?.preventDefault) {
        e.preventDefault();
      }

      // Validate all fields
      if (validate) {
        const validationErrors = validate(values);
        
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          // Mark all fields as touched
          const allTouched = Object.keys(values).reduce((acc, key) => {
            acc[key] = true;
            return acc;
          }, {});
          setTouched(allTouched);
          return;
        }
      }

      // Clear errors and submit
      setErrors({});
      await onSubmit(values);
    };
  }, [values, validate]);

  // Reset form
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  // Set specific field value
  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Set specific field error
  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  }, []);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    setFieldError,
  };
}
