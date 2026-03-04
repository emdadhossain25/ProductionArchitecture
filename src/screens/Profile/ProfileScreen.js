import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Card, CustomText } from '../../components/base';
import { useAuth, useTheme } from '../../contexts';
import { SPACING } from '../../constants/theme';

export default function ProfileScreen() {
  const { user } = useAuth();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <CustomText variant="h1" style={styles.title}>
          Profile 👤
        </CustomText>

        <Card variant="elevated">
          <View style={styles.avatar}>
            <CustomText variant="h1">👤</CustomText>
          </View>
          <CustomText variant="h2" center style={styles.name}>
            {user?.name}
          </CustomText>
          <CustomText variant="body" center color={colors.text.secondary}>
            {user?.email}
          </CustomText>
        </Card>

        <Card variant="elevated" style={styles.card}>
          <CustomText variant="h3">User Info</CustomText>
          <CustomText variant="body" style={styles.info}>
            ID: {user?.id}{'\n'}
            Email: {user?.email}{'\n'}
            Name: {user?.name}
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
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  name: { marginBottom: SPACING.xs },
  card: { marginTop: SPACING.md },
  info: { marginTop: SPACING.sm, lineHeight: 24 },
});

// Add this import at the top if not there:
// import { Button } from '../../components/base';

// Add this button after the user info card, before the closing ScrollView tag:
/*
<Button
  title="Complete Profile"
  onPress={() => navigation.navigate('CompleteProfile')}
  style={{ marginTop: SPACING.md }}
/>
*/
