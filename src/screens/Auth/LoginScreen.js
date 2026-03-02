import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Alert } from 'react-native';
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
        reject({ message: 'Invalid credentials' });
      }
    }, 1000);
  });
};

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { values, errors, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    (vals) => {
      const errs = {};
      if (!vals.email) errs.email = 'Email required';
      if (!vals.password) errs.password = 'Password required';
      return errs;
    }
  );

  const onSubmit = async (formValues) => {
    setLoading(true);
    setError(null);

    try {
      const response = await mockLogin(formValues.email, formValues.password);
      const result = await login(formValues.email, formValues.password);
      
      if (result.success) {
        // Navigation happens automatically via RootNavigator
      } else {
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
        <CustomText variant="h1" center style={styles.title}>
          Welcome Back! 👋
        </CustomText>

        <Card variant="elevated" style={styles.card}>
          <Input
            label="Email"
            placeholder="test@test.com"
            type="email"
            value={values.email}
            onChangeText={(text) => handleChange('email', text)}
            error={errors.email}
          />

          <Input
            label="Password"
            placeholder="password"
            type="password"
            value={values.password}
            onChangeText={(text) => handleChange('password', text)}
            error={errors.password}
          />

          {error && (
            <View style={[styles.errorBox, { backgroundColor: colors.danger + '20' }]}>
              <CustomText color={colors.danger}>{error}</CustomText>
            </View>
          )}

          <Button
            title="Login"
            onPress={handleSubmit(onSubmit)}
            isLoading={loading}
          />

          <CustomText variant="caption" color={colors.text.secondary} center style={styles.hint}>
            💡 test@test.com / password
          </CustomText>

          <Button
            title="Create Account"
            variant="outline"
            onPress={() => navigation.navigate('Register')}
            style={styles.registerButton}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: SPACING.md, paddingTop: 80 },
  title: { marginBottom: SPACING.xl },
  card: { marginTop: SPACING.lg },
  errorBox: { padding: SPACING.md, borderRadius: 8, marginBottom: SPACING.md },
  hint: { marginTop: SPACING.sm },
  registerButton: { marginTop: SPACING.md },
});
