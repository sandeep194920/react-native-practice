/**
 * 🔥 TASK 2: FLATLIST WITH PROPER OPTIMIZATION
 *
 * THE BRIEF:
 * "This list is slow. Optimize it using keyExtractor, proper rendering,
 * and performance best practices."
 *
 * TARGET TIME: 20-25 minutes
 * FIRST ATTEMPT: 30 minutes is normal
 *
 * WHAT TO SAY WHILE CODING:
 * "The key optimizations I'm making:
 *
 * 1. keyExtractor with item.id.toString() - CRITICAL for React to
 *    track items efficiently during scrolling.
 *
 * 2. getItemLayout - Since items are fixed height (80px), I tell
 *    FlatList the exact dimensions upfront. This eliminates expensive
 *    layout calculations and enables instant scrolling.
 *
 * 3. React.memo on ListItem - Prevents unnecessary re-renders of items
 *    that haven't changed.
 *
 * 4. useCallback on renderItem and keyExtractor - These don't recreate
 *    on every render, preventing all items from re-rendering.
 *
 * 5. removeClippedSubviews - Unmounts off-screen components to save
 *    memory.
 *
 * 6. Performance props:
 *    - maxToRenderPerBatch: 10 items at a time
 *    - initialNumToRender: Only 15 initially
 *    - windowSize: 5 screens worth of items mounted
 *
 * These optimizations make scrolling smooth even with thousands of items."
 *
 * KEY CONCEPTS:
 * - React.memo for list items
 * - useCallback for callbacks
 * - keyExtractor (CRITICAL!)
 * - getItemLayout for fixed-height items
 * - Performance props: removeClippedSubviews, maxToRenderPerBatch, etc.
 */

import React, { useState, useCallback, memo } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

const ITEM_HEIGHT = 80;

// ❌ BAD CODE EXAMPLE - What NOT to do:
/*
function SlowList() {
  const [data] = useState(generateLargeData());

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <View style={{ padding: 16, backgroundColor: 'white' }}>
          <Text>{item.title}</Text>
        </View>
      )}
    />
  );
}
*/

// ✅ OPTIMIZED VERSION:

// Extracted memo-ized component
const ListItem = memo(({ item }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );
});

function OptimizedList() {
  const [data] = useState(generateLargeData());

  // Memoized callbacks prevent recreating functions on every render
  const renderItem = useCallback(({ item }) => (
    <ListItem item={item} />
  ), []);

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  // getItemLayout enables instant scrolling for fixed-height items
  const getItemLayout = useCallback((data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  }), []);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      // Performance optimizations
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      initialNumToRender={15}
      windowSize={5}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    height: ITEM_HEIGHT,
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 8,
    justifyContent: 'center',
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#666' },
});

// Helper function to generate test data
function generateLargeData() {
  return Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    subtitle: `Description ${i + 1}`,
  }));
}

export default OptimizedList;

/**
 * PERFORMANCE COMPARISON:
 *
 * BAD CODE (no optimizations):
 * - Every scroll triggers re-renders of ALL items
 * - No key tracking = React recreates elements
 * - Layout calculations on every frame
 * - Result: Laggy, stuttering scroll
 *
 * OPTIMIZED CODE:
 * - Only visible items render
 * - React.memo prevents unnecessary re-renders
 * - getItemLayout = no layout calculations
 * - removeClippedSubviews = memory efficient
 * - Result: Smooth 60fps scrolling even with 1000+ items
 */
