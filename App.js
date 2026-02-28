import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Alert } from 'react-native';
import { Button, Input, Card, CustomText } from './src/components/base';
import { Loading } from './src/components/feedback';
import { useAsync, useForm } from './src/hooks';
import { api } from './src/services/api';
import { COLORS, SPACING } from './src/constants/theme';

// Mock API for testing (since we don't have real backend)
const mockAPI = {
  auth: {
    login: async (email, password) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email === 'test@test.com' && password === 'password123') {
            resolve({
              token: 'mock_token_12345',
              refreshToken: 'mock_refresh_token_12345',
              user: {
                id: '1',
                email,
                name: 'Test User',
              },
            });
          } else {
            reject({ message: 'Invalid credentials' });
          }
        }, 1500);
      });
    },
    register: async (userData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            token: 'mock_token_12345',
            refreshToken: 'mock_refresh_token_12345',
            user: {
              id: '1',
              email: userData.email,
              name: userData.name,
            },
          });
        }, 1500);
      });
    },
  },
  user: {
    getProfile: async (userId) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: userId,
            name: 'Test User',
            email: 'test@test.com',
            bio: 'React Native developer',
            joinedDate: '2024-01-01',
          });
        }, 1000);
      });
    },
  },
};

// Validation
const validateLogin = (values) => {
  const errors = {};
  if (!values.email) errors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = 'Email is invalid';
  
  if (!values.password) errors.password = 'Password is required';
  else if (values.password.length < 6) errors.password = 'Min 6 characters';
  
  return errors;
};

const validateRegister = (values) => {
  const errors = validateLogin(values);
  if (!values.name) errors.name = 'Name is required';
  return errors;
};

export default function App() {
  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'profile'
  const [userId, setUserId] = useState(null);

  // Login
  const { execute: login, loading: loginLoading, error: loginError } = useAsync(mockAPI.auth.login);
  const loginForm = useForm({ email: '', password: '' }, validateLogin);

  // Register
  const { execute: register, loading: registerLoading, error: registerError } = useAsync(mockAPI.auth.register);
  const registerForm = useForm({ name: '', email: '', password: '' }, validateRegister);

  // Profile
  const { execute: getProfile, loading: profileLoading, error: profileError, data: profileData } = useAsync(mockAPI.user.getProfile);

  const handleLogin = async () => {
    const result = await login(loginForm.values.email, loginForm.values.password);
    if (result) {
      Alert.alert('Success!', `Welcome ${result.user.name}!`);
      setUserId(result.user.id);
      setMode('profile');
    }
  };

  const handleRegister = async () => {
    const result = await register(registerForm.values);
    if (result) {
      Alert.alert('Success!', `Account created for ${result.user.name}!`);
      setUserId(result.user.id);
      setMode('profile');
    }
  };

  const handleViewProfile = async () => {
    if (userId) {
      await getProfile(userId);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <CustomText variant="h1" center style={styles.title}>
          API Integration
        </CustomText>
        <CustomText variant="body" center color={COLORS.text.secondary}>
          Day 50: Complete API Layer
        </CustomText>

        {/* Mode Switcher */}
        <Card variant="elevated" style={styles.section}>
          <View style={styles.row}>
            <Button
              title="Login"
              variant={mode === 'login' ? 'primary' : 'outline'}
              size="sm"
              onPress={() => setMode('login')}
              style={styles.modeButton}
            />
            <Button
              title="Register"
              variant={mode === 'register' ? 'primary' : 'outline'}
              size="sm"
              onPress={() => setMode('register')}
              style={styles.modeButton}
            />
            <Button
              title="Profile"
              variant={mode === 'profile' ? 'primary' : 'outline'}
              size="sm"
              onPress={() => setMode('profile')}
              style={styles.modeButton}
              disabled={!userId}
            />
          </View>
        </Card>

        {/* Login Form */}
        {mode === 'login' && (
          <Card variant="elevated" style={styles.section}>
            <CustomText variant="h3" style={styles.sectionTitle}>
              Login
            </CustomText>

            <Input
              label="Email"
              placeholder="test@test.com"
              type="email"
              value={loginForm.values.email}
              onChangeText={(text) => loginForm.handleChange('email', text)}
              error={loginForm.errors.email}
            />

            <Input
              label="Password"
              placeholder="password123"
              type="password"
              value={loginForm.values.password}
              onChangeText={(text) => loginForm.handleChange('password', text)}
              error={loginForm.errors.password}
            />

            {loginError && (
              <View style={styles.errorBox}>
                <CustomText variant="body" color={COLORS.danger}>
                  ❌ {loginError}
                </CustomText>
              </View>
            )}

            <Button
              title="Login"
              onPress={loginForm.handleSubmit(handleLogin)}
              isLoading={loginLoading}
            />

            <CustomText variant="caption" color={COLORS.text.secondary} center style={styles.hint}>
              💡 Try: test@test.com / password123
            </CustomText>
          </Card>
        )}

        {/* Register Form */}
        {mode === 'register' && (
          <Card variant="elevated" style={styles.section}>
            <CustomText variant="h3" style={styles.sectionTitle}>
              Register
            </CustomText>

            <Input
              label="Name"
              placeholder="Your name"
              value={registerForm.values.name}
              onChangeText={(text) => registerForm.handleChange('name', text)}
              error={registerForm.errors.name}
            />

            <Input
              label="Email"
              placeholder="your@email.com"
              type="email"
              value={registerForm.values.email}
              onChangeText={(text) => registerForm.handleChange('email', text)}
              error={registerForm.errors.email}
            />

            <Input
              label="Password"
              placeholder="Min 6 characters"
              type="password"
              value={registerForm.values.password}
              onChangeText={(text) => registerForm.handleChange('password', text)}
              error={registerForm.errors.password}
            />

            {registerError && (
              <View style={styles.errorBox}>
                <CustomText variant="body" color={COLORS.danger}>
                  ❌ {registerError}
                </CustomText>
              </View>
            )}

            <Button
              title="Create Account"
              onPress={registerForm.handleSubmit(handleRegister)}
              isLoading={registerLoading}
            />
          </Card>
        )}

        {/* Profile View */}
        {mode === 'profile' && (
          <Card variant="elevated" style={styles.section}>
            <CustomText variant="h3" style={styles.sectionTitle}>
              Profile
            </CustomText>

            {!profileData && (
              <Button
                title="Load Profile"
                onPress={handleViewProfile}
                isLoading={profileLoading}
              />
            )}

            {profileLoading && <Loading text="Loading profile..." />}

            {profileError && (
              <View style={styles.errorBox}>
                <CustomText variant="body" color={COLORS.danger}>
                  ❌ {profileError}
                </CustomText>
              </View>
            )}

            {profileData && (
              <View style={styles.profileData}>
                <CustomText variant="bodyBold">Name:</CustomText>
                <CustomText variant="body" style={styles.profileValue}>
                  {profileData.name}
                </CustomText>

                <CustomText variant="bodyBold">Email:</CustomText>
                <CustomText variant="body" style={styles.profileValue}>
                  {profileData.email}
                </CustomText>

                <CustomText variant="bodyBold">Bio:</CustomText>
                <CustomText variant="body" style={styles.profileValue}>
                  {profileData.bio}
                </CustomText>

                <CustomText variant="bodyBold">Joined:</CustomText>
                <CustomText variant="body" style={styles.profileValue}>
                  {profileData.joinedDate}
                </CustomText>
              </View>
            )}
          </Card>
        )}

        {/* API Features */}
        <Card variant="flat" style={styles.section}>
          <CustomText variant="h3" style={styles.sectionTitle}>
            ✨ API Layer Features
          </CustomText>
          <CustomText variant="body">
            ✅ Axios client with interceptors{'\n'}
            ✅ Automatic token injection{'\n'}
            ✅ Token refresh on 401{'\n'}
            ✅ Error handling & parsing{'\n'}
            ✅ Request/response logging{'\n'}
            ✅ Retry logic for network errors{'\n'}
            ✅ Organized service files{'\n'}
            ✅ TypeScript-ready structure
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
  row: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  modeButton: {
    flex: 1,
  },
  errorBox: {
    backgroundColor: '#FFE5E5',
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.md,
  },
  hint: {
    marginTop: SPACING.sm,
  },
  profileData: {
    gap: SPACING.xs,
  },
  profileValue: {
    marginBottom: SPACING.md,
    color: COLORS.text.secondary,
  },
});
