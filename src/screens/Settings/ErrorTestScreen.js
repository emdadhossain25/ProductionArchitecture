import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, CustomText } from '../../components/base';
import { useTheme } from '../../contexts';
import errorLogger from '../../services/logging/errorLogger';
import toastService from '../../services/notification/toastService';
import errorHandler from '../../utils/errorHandler';
import { SPACING } from '../../constants/theme';

// Component that throws error
function ErrorThrower() {
  throw new Error('This is a test error from component!');
}

export default function ErrorTestScreen() {
  const { colors } = useTheme();
  const [showErrorComponent, setShowErrorComponent] = useState(false);
  const [logs, setLogs] = useState([]);

  const throwAsyncError = async () => {
    try {
      throw new Error('Test Async Error');
    } catch (error) {
      await errorHandler.handleUnexpectedError(error);
    }
  };

  const testToasts = () => {
    toastService.success('Success!', 'This is a success message');
    setTimeout(() => {
      toastService.error('Error!', 'This is an error message');
    }, 1000);
    setTimeout(() => {
      toastService.warning('Warning!', 'This is a warning message');
    }, 2000);
    setTimeout(() => {
      toastService.info('Info', 'This is an info message');
    }, 3000);
  };

  const viewLogs = async () => {
    const allLogs = errorLogger.getLogs();
    setLogs(allLogs.slice(0, 5)); // Show last 5
  };

  const clearLogs = async () => {
    await errorLogger.clearLogs();
    setLogs([]);
    toastService.success('Cleared', 'All logs cleared');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <CustomText variant="h1" style={styles.title}>
          Error Handling Test
        </CustomText>

        {/* Error Boundary Test */}
        <Card variant="elevated">
          <CustomText variant="h3" style={styles.cardTitle}>
            Error Boundary
          </CustomText>
          <CustomText variant="body" color={colors.text.secondary} style={styles.text}>
            Test React error boundary by throwing component error
          </CustomText>
          <Button
            title="Throw Component Error"
            variant="danger"
            onPress={() => setShowErrorComponent(true)}
          />
          {showErrorComponent && <ErrorThrower />}
        </Card>

        {/* Toast Notifications */}
        <Card variant="elevated" style={styles.card}>
          <CustomText variant="h3" style={styles.cardTitle}>
            Toast Notifications
          </CustomText>
          <CustomText variant="body" color={colors.text.secondary} style={styles.text}>
            Test different notification types
          </CustomText>
          <Button
            title="Show All Toasts"
            onPress={testToasts}
          />
        </Card>

        {/* Error Logging */}
        <Card variant="elevated" style={styles.card}>
          <CustomText variant="h3" style={styles.cardTitle}>
            Error Logging
          </CustomText>
          <CustomText variant="body" color={colors.text.secondary} style={styles.text}>
            Log errors and view logs
          </CustomText>
          <Button
            title="Log Async Error"
            variant="secondary"
            onPress={throwAsyncError}
            style={styles.button}
          />
          <Button
            title="View Logs"
            variant="outline"
            onPress={viewLogs}
            style={styles.button}
          />
          <Button
            title="Clear Logs"
            variant="outline"
            onPress={clearLogs}
            style={styles.button}
          />
        </Card>

        {/* Logs Display */}
        {logs.length > 0 && (
          <Card variant="flat" style={styles.card}>
            <CustomText variant="h3" style={styles.cardTitle}>
              Recent Logs ({logs.length})
            </CustomText>
            {logs.map((log, index) => (
              <View key={log.id} style={styles.logItem}>
                <CustomText variant="caption" color={
                  log.type === 'error' ? colors.danger :
                  log.type === 'warning' ? colors.warning :
                  colors.text.secondary
                }>
                  [{log.type.toUpperCase()}] {log.message}
                </CustomText>
                <CustomText variant="caption" color={colors.text.disabled}>
                  {new Date(log.timestamp).toLocaleString()}
                </CustomText>
              </View>
            ))}
          </Card>
        )}

        {/* Info */}
        <Card variant="flat" style={styles.card}>
          <CustomText variant="h3" style={styles.cardTitle}>
            🐛 Error Handling Features
          </CustomText>
          <CustomText variant="body" color={colors.text.secondary}>
            ✅ Error Boundary (catches React errors){'\n'}
            ✅ Toast Notifications (user feedback){'\n'}
            ✅ Error Logging (track issues){'\n'}
            ✅ Global Handler (centralized){'\n'}
            ✅ Remote Logging (mock - Sentry/LogRocket){'\n\n'}
            All errors are logged and can be sent to crash reporting services!
          </CustomText>
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
    marginBottom: SPACING.sm,
  },
  text: {
    marginBottom: SPACING.md,
  },
  button: {
    marginTop: SPACING.sm,
  },
  logItem: {
    padding: SPACING.sm,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginTop: SPACING.sm,
  },
});
