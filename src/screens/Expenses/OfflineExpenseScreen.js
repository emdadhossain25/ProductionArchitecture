import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, FlatList, Alert } from 'react-native';
import { Button, Input, Card, CustomText } from '../../components/base';
import { useOffline, useTheme } from '../../contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SPACING, COLORS } from '../../constants/theme';

const EXPENSES_KEY = '@offline_expenses';

export default function OfflineExpenseScreen() {
  const { isOnline, queueCount, addToQueue, syncQueue } = useOffline();
  const { colors } = useTheme();
  
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const stored = await AsyncStorage.getItem(EXPENSES_KEY);
      if (stored) {
        setExpenses(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Load error:', error);
    }
  };

  const saveExpenses = async (newExpenses) => {
    try {
      await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(newExpenses));
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  const addExpense = async () => {
    if (!amount || !description) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const expense = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      description,
      timestamp: Date.now(),
      synced: false,
    };

    // Optimistic update - add immediately
    const updated = [expense, ...expenses];
    setExpenses(updated);
    await saveExpenses(updated);

    // Add to sync queue
    await addToQueue({
      type: 'CREATE_EXPENSE',
      payload: expense,
    });

    // Clear form
    setAmount('');
    setDescription('');

    Alert.alert(
      'Added!',
      isOnline 
        ? 'Expense saved and syncing...' 
        : 'Expense saved offline. Will sync when online.'
    );
  };

  const getTotal = () => {
    return expenses.reduce((sum, exp) => sum + exp.amount, 0);
  };

  const renderExpense = ({ item }) => (
    <Card variant="outlined" style={styles.expenseCard}>
      <View style={styles.expenseHeader}>
        <CustomText variant="bodyBold">{item.description}</CustomText>
        <CustomText variant="h3" color={colors.primary}>
          ${item.amount}
        </CustomText>
      </View>
      <View style={styles.expenseMeta}>
        <CustomText variant="caption" color={colors.text.secondary}>
          {new Date(item.timestamp).toLocaleString()}
        </CustomText>
        <CustomText variant="caption" color={item.synced ? colors.success : colors.warning}>
          {item.synced ? '✓ Synced' : '⏳ Pending'}
        </CustomText>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      {/* Status Bar */}
      <View style={[
        styles.statusBar,
        { backgroundColor: isOnline ? colors.success : colors.danger }
      ]}>
        <CustomText variant="caption" color={COLORS.text.inverse}>
          {isOnline ? '🌐 Online' : '📴 Offline'} 
          {queueCount > 0 && ` • ${queueCount} pending`}
        </CustomText>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <CustomText variant="h1" style={styles.title}>
          Offline Expenses
        </CustomText>

        {/* Total Card */}
        <Card variant="elevated" style={[styles.totalCard, { backgroundColor: colors.primary }]}>
          <CustomText variant="caption" color={COLORS.text.inverse}>
            Total Spent
          </CustomText>
          <CustomText variant="h1" color={COLORS.text.inverse}>
            ${getTotal().toFixed(2)}
          </CustomText>
          <CustomText variant="caption" color={COLORS.text.inverse}>
            {expenses.length} expenses
          </CustomText>
        </Card>

        {/* Add Form */}
        <Card variant="elevated">
          <CustomText variant="h3" style={styles.sectionTitle}>
            Add Expense
          </CustomText>

          <Input
            label="Amount ($)"
            placeholder="0.00"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />

          <Input
            label="Description"
            placeholder="What was it for?"
            value={description}
            onChangeText={setDescription}
          />

          <Button
            title="Add Expense"
            onPress={addExpense}
          />

          {!isOnline && (
            <View style={[styles.infoBox, { backgroundColor: colors.warning + '20' }]}>
              <CustomText variant="caption" color={colors.warning}>
                📴 You're offline. Expense will be saved locally and synced when online.
              </CustomText>
            </View>
          )}
        </Card>

        {/* Sync Button */}
        {queueCount > 0 && (
          <Button
            title={`Sync ${queueCount} Pending Actions`}
            variant="secondary"
            onPress={syncQueue}
            disabled={!isOnline}
          />
        )}

        {/* Expenses List */}
        <CustomText variant="h3" style={styles.sectionTitle}>
          Recent Expenses
        </CustomText>

        {expenses.length === 0 ? (
          <Card variant="flat">
            <CustomText variant="body" center color={colors.text.secondary}>
              No expenses yet. Add one above!
            </CustomText>
          </Card>
        ) : (
          <FlatList
            data={expenses}
            renderItem={renderExpense}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        )}

        {/* Info */}
        <Card variant="flat" style={styles.infoCard}>
          <CustomText variant="h3" style={styles.sectionTitle}>
            💡 How Offline Mode Works
          </CustomText>
          <CustomText variant="body" color={colors.text.secondary}>
            • Add expenses anytime (online or offline){'\n'}
            • Saved locally immediately{'\n'}
            • Queued for sync when offline{'\n'}
            • Auto-syncs when back online{'\n'}
            • Conflict resolution built-in
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
  statusBar: {
    padding: SPACING.xs,
    alignItems: 'center',
  },
  content: {
    padding: SPACING.md,
    paddingTop: 60,
  },
  title: {
    marginBottom: SPACING.lg,
  },
  totalCard: {
    alignItems: 'center',
    padding: SPACING.xl,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
    marginTop: SPACING.md,
  },
  infoBox: {
    padding: SPACING.md,
    borderRadius: 8,
    marginTop: SPACING.md,
  },
  expenseCard: {
    marginBottom: SPACING.sm,
  },
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  expenseMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoCard: {
    marginTop: SPACING.lg,
  },
});
