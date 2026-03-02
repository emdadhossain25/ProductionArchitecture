import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Card, CustomText } from '../../components/base';
import { useAuth, useTheme } from '../../contexts';
import { SPACING } from '../../constants/theme';

export default function HomeScreen() {
  const { user } = useAuth();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <CustomText variant="h1" style={styles.title}>
          Home 🏠
        </CustomText>

        <Card variant="elevated">
          <CustomText variant="h3">Welcome, {user?.name}! 👋</CustomText>
          <CustomText variant="body" color={colors.text.secondary} style={styles.text}>
            You're on the Home screen.
          </CustomText>
        </Card>

        <Card variant="elevated" style={styles.card}>
          <CustomText variant="h3">🎉 Architecture Complete!</CustomText>
          <CustomText variant="body" style={styles.text}>
            Week 1 foundation is done:{'\n\n'}
            ✅ Components (9){'\n'}
            ✅ Hooks (5){'\n'}
            ✅ API Layer{'\n'}
            ✅ State Management{'\n'}
            ✅ Navigation{'\n\n'}
            Ready to build real features!
          </CustomText>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: SPACING.md, paddingTop: 60 },
  title: { marginBottom: SPACING.lg },
  card: { marginTop: SPACING.md },
  text: { marginTop: SPACING.sm },
});
