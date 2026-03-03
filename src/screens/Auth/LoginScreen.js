import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import { Button, Input, Card, CustomText } from '../../components/base';
import { useAuth, useTheme } from '../../contexts';
import { useForm } from '../../hooks';
import { SPACING } from '../../constants/theme';

// Mock API
const mockLogin = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@test.com' && password === 'password') {
        resolve({
          token: 'mock_token',
          refreshToken: 'mock_refresh',
          user: { id: '1', email, name: 'Test User' },
        });
      } else {
        reject({ message: 'Invalid email or password' });
      }
    }, 1000);
  });
};

// Validation
const validateLoginForm = (values) => {
  const errors = {};
  
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Invalid email format';
  }
  
  if (!values.password) {
    errors.password = 'Password is required';
  }
  
  return errors;
};

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { values, errors, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    validateLoginForm
  );

  const onSubmit = async (formValues) => {
    setLoading(true);
    setError(null);

    try {
      await mockLogin(formValues.email, formValues.password);
      const result = await login(formValues.email, formValues.password);
      
      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <CustomText variant="h1" center style={styles.title}>
          Welcome Back! 👋
        </CustomText>
        <CustomText variant="body" center color={colors.text.secondary}>
          Sign in to continue
        </CustomText>

        {/* Form */}
        <Card variant="elevated" style={styles.card}>
          <Input
            label="Email"
            placeholder="test@test.com"
            type="email"
            value={values.email}
            onChangeText={(text) => handleChange('email', text)}
            error={errors.email}
            required
          />

          <Input
            label="Password"
            placeholder="password"
            type="password"
            value={values.password}
            onChangeText={(text) => handleChange('password', text)}
            error={errors.password}
            required
          />

          {/* Forgot Password Link */}
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgotPassword}
          >
            <CustomText variant="caption" color={colors.primary}>
              Forgot Password?
            </CustomText>
          </TouchableOpacity>

          {/* Error Message */}
          {error && (
            <View style={[styles.errorBox, { backgroundColor: colors.danger + '20' }]}>
              <CustomText color={colors.danger}>❌ {error}</CustomText>
            </View>
          )}

          {/* Login Button */}
          <Button
            title="Login"
            onPress={handleSubmit(onSubmit)}
            isLoading={loading}
          />

          {/* Demo Credentials */}
          <CustomText variant="caption" color={colors.text.secondary} center style={styles.hint}>
            💡 Demo: test@test.com / password
          </CustomText>

          {/* Register Link */}
          <View style={styles.footer}>
            <CustomText variant="body" color={colors.text.secondary}>
              Don't have an account?{' '}
            </CustomText>
            <Button
              title="Sign Up"
              variant="outline"
              size="sm"
              onPress={() => navigation.navigate('Register')}
              style={styles.registerButton}
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
    paddingTop: 80,
  },
  title: {
    marginBottom: SPACING.xs,
  },
  card: {
    marginTop: SPACING.xl,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: SPACING.xs,
    marginBottom: SPACING.md,
  },
  errorBox: {
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.md,
  },
  hint: {
    marginTop: SPACING.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.lg,
    flexWrap: 'wrap',
  },
  registerButton: {
    marginLeft: SPACING.sm,
  },
});
