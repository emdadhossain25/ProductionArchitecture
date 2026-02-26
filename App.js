import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, CustomText } from './src/components/base';
import {
  Modal,
  BottomSheet,
  Loading,
  ErrorMessage,
  EmptyState,
} from './src/components/feedback';
import { COLORS, SPACING } from './src/constants/theme';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <CustomText variant="h1" center style={styles.title}>
          Feedback Components
        </CustomText>
        <CustomText variant="body" center color={COLORS.text.secondary}>
          Day 48: Complex Components
        </CustomText>

        {/* Modal Demo */}
        <Card variant="elevated" style={styles.section}>
          <CustomText variant="h3" style={styles.sectionTitle}>
            Modal Dialog
          </CustomText>
          <Button
            title="Show Modal"
            onPress={() => setShowModal(true)}
          />
        </Card>

        {/* BottomSheet Demo */}
        <Card variant="elevated" style={styles.section}>
          <CustomText variant="h3" style={styles.sectionTitle}>
            Bottom Sheet
          </CustomText>
          <Button
            title="Show Bottom Sheet"
            onPress={() => setShowBottomSheet(true)}
          />
        </Card>

        {/* Loading Demo */}
        <Card variant="elevated" style={styles.section}>
          <CustomText variant="h3" style={styles.sectionTitle}>
            Loading States
          </CustomText>
          <Button
            title="Toggle Loading"
            onPress={() => setShowLoading(!showLoading)}
            variant={showLoading ? 'danger' : 'primary'}
          />
          {showLoading && <Loading text="Fetching data..." />}
        </Card>

        {/* Error Demo */}
        <Card variant="elevated" style={styles.section}>
          <CustomText variant="h3" style={styles.sectionTitle}>
            Error Message
          </CustomText>
          <Button
            title="Toggle Error"
            onPress={() => setShowError(!showError)}
            variant={showError ? 'danger' : 'primary'}
          />
          {showError && (
            <ErrorMessage
              title="Network Error"
              message="Could not connect to server"
              onRetry={() => setShowError(false)}
            />
          )}
        </Card>

        {/* Empty State Demo */}
        <Card variant="elevated" style={styles.section}>
          <CustomText variant="h3" style={styles.sectionTitle}>
            Empty State
          </CustomText>
          <Button
            title="Toggle Empty State"
            onPress={() => setShowEmpty(!showEmpty)}
            variant={showEmpty ? 'danger' : 'primary'}
          />
        </Card>

        {showEmpty && (
          <View style={styles.emptyContainer}>
            <EmptyState
              emoji="📝"
              title="No Tasks Yet"
              message="Create your first task to get started!"
              actionText="Add Task"
              onAction={() => setShowEmpty(false)}
            />
          </View>
        )}
      </ScrollView>

      {/* Modal */}
      <Modal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title="Confirm Action"
        primaryAction="Confirm"
        onPrimaryAction={() => {
          setShowModal(false);
          alert('Confirmed!');
        }}
        secondaryAction="Cancel"
        onSecondaryAction={() => setShowModal(false)}
      >
        <CustomText variant="body">
          Are you sure you want to perform this action?
        </CustomText>
        <CustomText
          variant="caption"
          color={COLORS.text.secondary}
          style={{ marginTop: SPACING.sm }}
        >
          This action cannot be undone.
        </CustomText>
      </Modal>

      {/* BottomSheet */}
      <BottomSheet
        visible={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}
        title="Select Option"
        height={0.4}
      >
        <Button
          title="Option 1"
          variant="outline"
          onPress={() => setShowBottomSheet(false)}
          style={styles.sheetButton}
        />
        <Button
          title="Option 2"
          variant="outline"
          onPress={() => setShowBottomSheet(false)}
          style={styles.sheetButton}
        />
        <Button
          title="Option 3"
          variant="outline"
          onPress={() => setShowBottomSheet(false)}
          style={styles.sheetButton}
        />
        <Button
          title="Cancel"
          variant="danger"
          onPress={() => setShowBottomSheet(false)}
          style={styles.sheetButton}
        />
      </BottomSheet>
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
  sheetButton: {
    marginBottom: SPACING.sm,
  },
  emptyContainer: {
    height: 300,
    marginTop: SPACING.lg,
  },
});
