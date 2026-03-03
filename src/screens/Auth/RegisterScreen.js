import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Alert } from 'react-native';
import { Button, Input, Card, CustomText } from '../../components/base';
import { useAuth, useTheme } from '../../contexts';
import { useForm } from '../../hooks';
import { SPACING } from '../../constants/theme';

// Mock API for registration
const mockRegister = async (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate email already exists error
      if (userData.email === 'existing@test.com') {
        reject({ message: 'Email already registered' });
      } else {
        resolve({
          token: 'mock_token_' + Date.now(),
          refreshToken: 'mock_refresh_' + Date.now(),
          user: {
            id: Date.now().toString(),
            name: userData.name,
            email: userData.email,
          },
        });
      }
    }, 1500);
  });
};

// Validation function
const validateRegisterForm = (values) => {
  const errors = {};

  // Name validation
  if (!values.name) {
    errors.name = 'Name is required';
  } else if (values.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  // Email validation
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Invalid email format';
  }

  // Password validation
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(values.password)) {
    errors.password = 'Password must contain uppercase, lowercase, and number';
  }

  // Confirm password validation
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please confirm password';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { values, errors, handleChange, handleSubmit } = useForm(
    { name: '', email: '', password: '', confirmPassword: '' },
    validateRegisterForm
  );

  const onSubmit = async (formValues) => {
    setLoading(true);
    setError(null);

    try {
      // Mock API call
      await mockRegister(formValues);
      
      // Use real register from context
      const result = await register({
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
      });

      if (result.success) {
        Alert.alert(
          'Success! 🎉',
          `Welcome ${result.user.name}! Your account has been created.`
        );
        // Navigation happens automatically via RootNavigator
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <CustomText variant="h1" center style={styles.title}>
          Create Account 🚀
        </CustomText>
        <CustomText variant="body" center color={colors.text.secondary}>
          Join us and start your journey!
        </CustomText>

        {/* Form */}
        <Card variant="elevated" style={styles.card}>
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={values.name}
            onChangeText={(text) => handleChange('name', text)}
            error={errors.name}
            required
          />

          <Input
            label="Email"
            placeholder="john@example.com"
            type="email"
            value={values.email}
            onChangeText={(text) => handleChange('email', text)}
            error={errors.email}
            required
          />

          <Input
            label="Password"
            placeholder="Min 8 chars, uppercase, number"
            type="password"
            value={values.password}
            onChangeText={(text) => handleChange('password', text)}
            error={errors.password}
            required
          />

          <Input
            label="Confirm Password"
            placeholder="Re-enter password"
            type="password"
            value={values.confirmPassword}
            onChangeText={(text) => handleChange('confirmPassword', text)}
            error={errors.confirmPassword}
            required
          />

          {/* Error Message */}
          {error && (
            <View style={[styles.errorBox, { backgroundColor: colors.danger + '20' }]}>
              <CustomText color={colors.danger}>❌ {error}</CustomText>
            </View>
          )}

          {/* Submit Button */}
          <Button
            title="Create Account"
            onPress={handleSubmit(onSubmit)}
            isLoading={loading}
          />

          {/* Password Requirements */}
          <Card variant="flat" style={styles.requirementsCard}>
            <CustomText variant="caption" color={colors.text.secondary}>
              Password must contain:{'\n'}
              • At least 8 characters{'\n'}
              • Uppercase letter (A-Z){'\n'}
              • Lowercase letter (a-z){'\n'}
              • Number (0-9)
            </CustomText>
          </Card>

          {/* Login Link */}
          <View style={styles.footer}>
            <CustomText variant="body" color={colors.text.secondary}>
              Already have an account?{' '}
            </CustomText>
            <Button
              title="Login"
              variant="outline"
              size="sm"
              onPress={() => navigation.navigate('Login')}
              style={styles.loginButton}
            />
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: SPACING.md,
    paddingTop: 60,
  },
  title: {
    marginBottom: SPACING.xs,
  },
  card: {
    marginTop: SPACING.lg,
  },
  errorBox: {
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.md,
  },
  requirementsCard: {
    marginTop: SPACING.md,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.lg,
    flexWrap: 'wrap',
  },
  loginButton: {
    marginLeft: SPACING.sm,
  },
});
