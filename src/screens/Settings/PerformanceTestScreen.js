import React, { useState, useMemo, useCallback } from 'react';
import { SafeAreaView, FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, CustomText, OptimizedImage } from '../../components/base';
import { useTheme } from '../../contexts';
import { useRenderCount, useMemoizedCallback } from '../../hooks';
import { getOptimizedFlatListProps, keyExtractor } from '../../utils/performance';
import { SPACING } from '../../constants/theme';

// Generate mock data
const generateData = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i.toString(),
    title: `Item ${i + 1}`,
    description: `This is item number ${i + 1}`,
    image: `https://picsum.photos/200/200?random=${i}`,
  }));
};

// Memoized list item component
const ListItem = React.memo(({ item, onPress }) => {
  const { colors } = useTheme();
  
  return (
    <Card variant="outlined" style={styles.item}>
      <View style={styles.itemContent}>
        <OptimizedImage
          source={item.image}
          style={styles.itemImage}
          resizeMode="cover"
        />
        <View style={styles.itemText}>
          <CustomText variant="bodyBold">{item.title}</CustomText>
          <CustomText variant="caption" color={colors.text.secondary}>
            {item.description}
          </CustomText>
        </View>
      </View>
    </Card>
  );
});

export default function PerformanceTestScreen() {
  const { colors } = useTheme();
  const renderCount = useRenderCount('PerformanceTestScreen');
  
  const [itemCount, setItemCount] = useState(10);
  const [showImages, setShowImages] = useState(false);

  // Memoize data generation
  const data = useMemo(() => generateData(itemCount), [itemCount]);

  // Memoize callback to prevent re-renders
  const handleItemPress = useMemoizedCallback((item) => {
    console.log('Pressed:', item.title);
  }, []);

  // Memoize render function
  const renderItem = useCallback(({ item }) => (
    <ListItem item={item} onPress={() => handleItemPress(item)} />
  ), [handleItemPress]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      <View style={styles.header}>
        <CustomText variant="h1">Performance Test ⚡</CustomText>
        {__DEV__ && (
          <CustomText variant="caption" color={colors.text.secondary}>
            Renders: {renderCount}
          </CustomText>
        )}
      </View>

      {/* Controls */}
      <Card variant="elevated" style={styles.controls}>
        <CustomText variant="h3" style={styles.controlTitle}>
          List Size
        </CustomText>
        <View style={styles.buttonRow}>
          <Button
            title="10 items"
            size="sm"
            variant={itemCount === 10 ? 'primary' : 'outline'}
            onPress={() => setItemCount(10)}
            style={styles.controlButton}
          />
          <Button
            title="100 items"
            size="sm"
            variant={itemCount === 100 ? 'primary' : 'outline'}
            onPress={() => setItemCount(100)}
            style={styles.controlButton}
          />
          <Button
            title="1000 items"
            size="sm"
            variant={itemCount === 1000 ? 'primary' : 'outline'}
            onPress={() => setItemCount(1000)}
            style={styles.controlButton}
          />
        </View>

        <CustomText variant="h3" style={styles.controlTitle}>
          Images
        </CustomText>
        <Button
          title={showImages ? 'Hide Images' : 'Show Images'}
          variant="outline"
          onPress={() => setShowImages(!showImages)}
        />
      </Card>

      {/* Stats */}
      <Card variant="flat" style={styles.stats}>
        <CustomText variant="body">
          📊 Total Items: {data.length}{'\n'}
          🖼️ Images: {showImages ? 'Enabled' : 'Disabled'}{'\n'}
          ⚡ Optimizations: FlatList + Memoization + Image Loading
        </CustomText>
      </Card>

      {/* Optimized List */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        {...getOptimizedFlatListProps()}
        contentContainerStyle={styles.list}
      />

      {/* Info */}
      <Card variant="elevated" style={styles.info}>
        <CustomText variant="h3" style={styles.infoTitle}>
          ⚡ Optimizations Applied
        </CustomText>
        <CustomText variant="caption" color={colors.text.secondary}>
          • FlatList with removeClippedSubviews{'\n'}
          • React.memo on list items{'\n'}
          • useMemo for data generation{'\n'}
          • useCallback for functions{'\n'}
          • Optimized image loading{'\n'}
          • Window size optimization{'\n'}
          • Batch rendering (10 items/batch)
        </CustomText>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: SPACING.md,
    paddingTop: 60,
  },
  controls: {
    margin: SPACING.md,
    marginTop: 0,
  },
  controlTitle: {
    marginBottom: SPACING.sm,
    marginTop: SPACING.sm,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  controlButton: {
    flex: 1,
  },
  stats: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    padding: SPACING.md,
  },
  list: {
    padding: SPACING.md,
    paddingTop: 0,
  },
  item: {
    marginBottom: SPACING.sm,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: SPACING.md,
  },
  itemText: {
    flex: 1,
  },
  info: {
    margin: SPACING.md,
    marginTop: 0,
  },
  infoTitle: {
    marginBottom: SPACING.sm,
  },
});
