import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Alert } from 'react-native';
import { Button, Input, Card, CustomText } from '../../components/base';
import { useTheme } from '../../contexts';
import { useForm } from '../../hooks';
import { SPACING } from '../../constants/theme';

// Mock API for forgot password
const mockForgotPassword = async (email) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate email not found
      if (email === 'notfound@test.com') {
        reject({ message: 'Email not found in our system' });
      } else {
        resolve({ message: 'Password reset link sent to your email' });
      }
    }, 1500);
  });
};

// Validation
const validateForgotPasswordForm = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Invalid email format';
  }

  return errors;
};

export default function ForgotPasswordScreen({ navigation }) {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { values, errors, handleChange, handleSubmit } = useForm(
    { email: '' },
    validateForgotPasswordForm
  );

  const onSubmit = async (formValues) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await mockForgotPassword(formValues.email);
      
      setSuccess(true);
      
      Alert.alert(
        'Email Sent! 📧',
        'Check your email for password reset instructions.',
        [
          {
            text: 'Back to Login',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (err) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <CustomText variant="h1" center style={styles.title}>
          Forgot Password? 🔑
        </CustomText>
        <CustomText variant="body" center color={colors.text.secondary}>
          Enter your email and we'll send you a reset link
        </CustomText>

        {/* Form */}
        <Card variant="elevated" style={styles.card}>
          <Input
            label="Email"
            placeholder="your@email.com"
            type="email"
            value={values.email}
            onChangeText={(text) => handleChange('email', text)}
            error={errors.email}
            required
          />

          {/* Error Message */}
          {error && (
            <View style={[styles.errorBox, { backgroundColor: colors.danger + '20' }]}>
              <CustomText color={colors.danger}>❌ {error}</CustomText>
            </View>
          )}

          {/* Success Message */}
          {success && (
            <View style={[styles.successBox, { backgroundColor: colors.success + '20' }]}>
              <CustomText color={colors.success}>
                ✅ Reset link sent! Check your email.
              </CustomText>
            </View>
          )}

          {/* Submit Button */}
          <Button
            title="Send Reset Link"
            onPress={handleSubmit(onSubmit)}
            isLoading={loading}
          />

          {/* Info Card */}
          <Card variant="flat" style={styles.infoCard}>
            <CustomText variant="caption" color={colors.text.secondary}>
              💡 You'll receive an email with instructions to reset your password. 
              The link will expire in 1 hour.
            </CustomText>
          </Card>

          {/* Back to Login */}
          <Button
            title="← Back to Login"
            variant="outline"
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          />
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
    paddingTop: 80,
  },
  title: {
    marginBottom: SPACING.xs,
  },
  card: {
    marginTop: SPACING.xl,
  },
  errorBox: {
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.md,
  },
  successBox: {
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.md,
  },
  infoCard: {
    marginTop: SPACING.md,
  },
  backButton: {
    marginTop: SPACING.md,
  },
});
