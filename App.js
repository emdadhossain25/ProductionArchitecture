import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Alert } from 'react-native';
import { Button, Input, Card, CustomText } from './src/components/base';
import { Loading } from './src/components/feedback';
import { useAsync, useForm, useDebounce, useToggle, useKeyboard } from './src/hooks';
import { COLORS, SPACING } from './src/constants/theme';

// Mock API function
const mockLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@test.com' && password === 'password') {
        resolve({ user: { email, name: 'Test User' } });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1500);
  });
};

// Form validation
const validateLoginForm = (values) => {
  const errors = {};
  
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email is invalid';
  }
  
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  
  return errors;
};

export default function App() {
  // useAsync example
  const { execute: login, loading, error, data } = useAsync(mockLogin);

  // useForm example
  const { values, errors, handleChange, handleSubmit, reset } = useForm(
    { email: '', password: '' },
    validateLoginForm
  );

  // useToggle example
  const [showPassword, togglePassword] = useToggle(false);
  const [darkMode, toggleDarkMode] = useToggle(false);

  // useDebounce example
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  // useKeyboard example
  const { isVisible: keyboardVisible, keyboardHeight } = useKeyboard();

  // Watch debounced search
  useEffect(() => {
    if (debouncedSearch) {
      console.log('Searching for:', debouncedSearch);
    }
  }, [debouncedSearch]);

  const onSubmit = async (formValues) => {
    const result = await login(formValues.email, formValues.password);
    if (result) {
      Alert.alert('Success!', `Welcome ${result.user.name}!`);
      reset();
    }
  };

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      <ScrollView 
        contentContainerStyle={[
          styles.content,
          { paddingBottom: keyboardHeight || SPACING.md }
        ]}
      >
        {/* Header */}
        <CustomText variant="h1" center style={styles.title}>
          Custom Hooks Demo
        </CustomText>
        <CustomText 
          variant="body" 
          center 
          color={darkMode ? COLORS.text.inverse : COLORS.text.secondary}
        >
          Day 49: Reusable Logic
        </CustomText>

        {/* useToggle Demo */}
        <Card variant="elevated" style={styles.section}>
          <CustomText variant="h3" style={styles.sectionTitle}>
            useToggle Hook
          </CustomText>
          <Button
            title={darkMode ? 'Light Mode ☀️' : 'Dark Mode 🌙'}
            onPress={toggleDarkMode}
            variant={darkMode ? 'secondary' : 'primary'}
          />
        </Card>

        {/* useDebounce Demo */}
        <Card variant="elevated" style={styles.section}>
          <CustomText variant="h3" style={styles.sectionTitle}>
            useDebounce Hook
          </CustomText>
          <Input
            label="Search (500ms delay)"
            placeholder="Type to search..."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <CustomText variant="caption" color={COLORS.text.secondary}>
            Debounced value: {debouncedSearch || '(empty)'}
          </CustomText>
          <CustomText variant="caption" color={COLORS.text.secondary} style={{ marginTop: SPACING.xs }}>
            💡 API calls only happen after you stop typing for 500ms
          </CustomText>
        </Card>

        {/* useForm + useAsync Demo */}
        <Card variant="elevated" style={styles.section}>
          <CustomText variant="h3" style={styles.sectionTitle}>
            useForm + useAsync
          </CustomText>
          
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
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            onChangeText={(text) => handleChange('password', text)}
            error={errors.password}
            required
          />

          <Button
            title="Toggle Password Visibility"
            variant="outline"
            size="sm"
            onPress={togglePassword}
            style={styles.toggleButton}
          />

          {error && (
            <View style={styles.errorBox}>
              <CustomText variant="body" color={COLORS.danger}>
                ❌ {error}
              </CustomText>
            </View>
          )}

          {data && (
            <View style={styles.successBox}>
              <CustomText variant="body" color={COLORS.success}>
                ✅ Login successful!
              </CustomText>
            </View>
          )}

          <Button
            title="Login"
            onPress={handleSubmit(onSubmit)}
            isLoading={loading}
            style={styles.submitButton}
          />

          <CustomText variant="caption" color={COLORS.text.secondary} center>
            💡 Try: test@test.com / password
          </CustomText>
        </Card>

        {/* useKeyboard Demo */}
        <Card variant="elevated" style={styles.section}>
          <CustomText variant="h3" style={styles.sectionTitle}>
            useKeyboard Hook
          </CustomText>
          <CustomText variant="body">
            Keyboard Status: {keyboardVisible ? '⌨️ Visible' : '✅ Hidden'}
          </CustomText>
          {keyboardVisible && (
            <CustomText variant="caption" color={COLORS.text.secondary}>
              Height: {Math.round(keyboardHeight)}px
            </CustomText>
          )}
        </Card>

        {/* Loading Demo */}
        {loading && <Loading text="Logging in..." />}

        {/* Summary */}
        <Card variant="flat" style={styles.section}>
          <CustomText variant="h3" style={styles.sectionTitle}>
            ✨ Hooks Summary
          </CustomText>
          <CustomText variant="body">
            ✅ useAsync - API calls with loading/error{'\n'}
            ✅ useForm - Form validation & handling{'\n'}
            ✅ useDebounce - Search optimization{'\n'}
            ✅ useToggle - Boolean state helper{'\n'}
            ✅ useKeyboard - Keyboard state tracking
          </CustomText>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
  },
  darkContainer: {
    backgroundColor: '#1a1a1a',
  },
  content: {
    padding: SPACING.md,
    paddingTop: 60,
  },
  title: {
    marginBottom: SPACING.xs,
  },
  section: {
    marginTop: SPACING.lg,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
  },
  toggleButton: {
    marginBottom: SPACING.md,
  },
  submitButton: {
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  errorBox: {
    backgroundColor: '#FFE5E5',
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.md,
  },
  successBox: {
    backgroundColor: '#E5FFE5',
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.md,
  },
});
