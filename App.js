import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Alert } from 'react-native';
import { Button, Input, Card, CustomText } from './src/components/base';
import { Loading } from './src/components/feedback';
import { AppProvider, useAuth, useTheme } from './src/contexts';
import { useForm } from './src/hooks';
import { SPACING } from './src/constants/theme';

// Mock API (since we don't have real backend)
const mockLogin = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@test.com' && password === 'password') {
        resolve({
          token: 'mock_token_12345',
          refreshToken: 'mock_refresh_token_12345',
          user: {
            id: '1',
            email,
            name: 'Test User',
            avatar: 'https://i.pravatar.cc/100',
          },
        });
      } else {
        reject({ message: 'Invalid credentials' });
      }
    }, 1500);
  });
};

// Replace api.auth.login with mock
import { api } from './src/services/api';
api.auth.login = mockLogin;

function AuthScreen() {
  const { login, isLoading: authLoading } = useAuth();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { values, errors, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    (vals) => {
      const errs = {};
      if (!vals.email) errs.email = 'Email is required';
      if (!vals.password) errs.password = 'Password is required';
      return errs;
    }
  );

  const onSubmit = async (formValues) => {
    setLoading(true);
    setError(null);

    const result = await login(formValues.email, formValues.password);

    if (result.success) {
      Alert.alert('Success!', `Welcome ${result.user.name}! 🎉`);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  if (authLoading) {
    return <Loading text="Checking authentication..." fullScreen />;
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Card variant="elevated" style={styles.loginCard}>
        <CustomText variant="h2" center style={styles.title}>
          Welcome Back! 👋
        </CustomText>
        
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
            <CustomText variant="body" color={colors.danger}>
              ❌ {error}
            </CustomText>
          </View>
        )}

        <Button
          title="Login"
          onPress={handleSubmit(onSubmit)}
          isLoading={loading}
        />

        <CustomText variant="caption" color={colors.text.secondary} center style={styles.hint}>
          💡 Try: test@test.com / password
        </CustomText>
      </Card>
    </ScrollView>
  );
}

function HomeScreen() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme, colors } = useTheme();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            Alert.alert('Logged out', 'See you soon! 👋');
          }
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {/* User Card */}
      <Card variant="elevated" style={styles.card}>
        <View style={styles.userHeader}>
          <View style={styles.avatar}>
            <CustomText variant="h1">👤</CustomText>
          </View>
          <View style={styles.userInfo}>
            <CustomText variant="h3">{user?.name}</CustomText>
            <CustomText variant="body" color={colors.text.secondary}>
              {user?.email}
            </CustomText>
          </View>
        </View>
      </Card>

      {/* Theme Toggle */}
      <Card variant="elevated" style={styles.card}>
        <CustomText variant="h3" style={styles.cardTitle}>
          Appearance
        </CustomText>
        <View style={styles.row}>
          <CustomText variant="body">
            {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </CustomText>
          <Button
            title="Toggle"
            size="sm"
            onPress={toggleTheme}
            style={styles.toggleButton}
          />
        </View>
      </Card>

      {/* Context State Demo */}
      <Card variant="flat" style={styles.card}>
        <CustomText variant="h3" style={styles.cardTitle}>
          📦 State Management
        </CustomText>
        <CustomText variant="body">
          ✅ AuthContext: User logged in{'\n'}
          ✅ ThemeContext: {isDark ? 'Dark' : 'Light'} mode active{'\n'}
          ✅ Persistent: Survives app restart{'\n'}
          ✅ Global: Available everywhere
        </CustomText>
      </Card>

      {/* Logout */}
      <Button
        title="Logout"
        variant="danger"
        onPress={handleLogout}
      />
    </ScrollView>
  );
}

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const { colors } = useTheme();

  if (isLoading) {
    return <Loading text="Loading..." fullScreen />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      <View style={styles.header}>
        <CustomText variant="h1" center>
          State Management
        </CustomText>
        <CustomText variant="body" center color={colors.text.secondary}>
          Day 51: Context API
        </CustomText>
      </View>

      {isAuthenticated ? <HomeScreen /> : <AuthScreen />}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  content: {
    padding: SPACING.md,
  },
  loginCard: {
    marginTop: SPACING.xxl,
  },
  title: {
    marginBottom: SPACING.xl,
  },
  errorBox: {
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.md,
  },
  hint: {
    marginTop: SPACING.sm,
  },
  card: {
    marginBottom: SPACING.md,
  },
  cardTitle: {
    marginBottom: SPACING.md,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  userInfo: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleButton: {
    minWidth: 100,
  },
});
