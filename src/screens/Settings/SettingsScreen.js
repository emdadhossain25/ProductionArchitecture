import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Alert } from 'react-native';
import { Button, Card, CustomText } from '../../components/base';
import { useAuth, useTheme } from '../../contexts';
import { SPACING } from '../../constants/theme';

export default function SettingsScreen({ navigation }) {
  const { logout } = useAuth();
  const { isDark, toggleTheme, colors } = useTheme();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
          Alert.alert('Logged out', 'See you soon! 👋');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <CustomText variant="h1" style={styles.title}>
          Settings ⚙️
        </CustomText>

        <Card variant="elevated">
          <CustomText variant="h3" style={styles.cardTitle}>
            Appearance
          </CustomText>
          <CustomText variant="body" style={styles.text}>
            Current theme: {isDark ? '🌙 Dark' : '☀️ Light'}
          </CustomText>
          <Button
            title="Toggle Theme"
            variant="outline"
            onPress={toggleTheme}
            style={styles.button}
          />
        </Card>

        <Card variant="elevated" style={styles.card}>
          <CustomText variant="h3" style={styles.cardTitle}>
            Developer Tools
          </CustomText>
          <Button
            title="Test Error Handling"
            variant="secondary"
            onPress={() => navigation.navigate('ErrorTest')}
            style={styles.button}
          />
          <Button
            title="Performance Test"
            variant="secondary"
            onPress={() => navigation.navigate('PerformanceTest')}
          />
        </Card>

        <Card variant="elevated" style={styles.card}>
          <CustomText variant="h3" style={styles.cardTitle}>
            Account
          </CustomText>
          <Button
            title="Logout"
            variant="danger"
            onPress={handleLogout}
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
    paddingTop: 60,
  },
  title: {
    marginBottom: SPACING.lg,
  },
  card: {
    marginTop: SPACING.md,
  },
  cardTitle: {
    marginBottom: SPACING.md,
  },
  text: {
    marginBottom: SPACING.md,
  },
  button: {
    marginTop: SPACING.sm,
  },
});
