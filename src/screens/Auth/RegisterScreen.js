import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, CustomText } from '../../components/base';
import { useTheme } from '../../contexts';
import { SPACING } from '../../constants/theme';

export default function RegisterScreen({ navigation }) {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <CustomText variant="h1" center style={styles.title}>
          Create Account 🚀
        </CustomText>

        <Card variant="elevated" style={styles.card}>
          <CustomText variant="body" center color={colors.text.secondary}>
            Registration form coming soon!
          </CustomText>

          <Button
            title="Back to Login"
            variant="outline"
            onPress={() => navigation.goBack()}
            style={styles.button}
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
  button: { marginTop: SPACING.lg },
});
