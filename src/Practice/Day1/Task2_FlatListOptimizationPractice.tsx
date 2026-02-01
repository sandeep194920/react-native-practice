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

import React, { memo, useCallback, useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";

const ITEM_HEIGHT = 80;

const ListItem = memo(({ item }: { item: Item }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.subtitle}>{item.subtitle}</Text>
  </View>
));

interface Item {
  id: number;
  title: string;
  subtitle: string;
}

// ❌ UNOPTIMIZED VERSION - Your task is to optimize this!

function SlowList() {
  const [data] = useState(generateLargeData());

  const keyExtractor = useCallback(
    (item: { id: number }) => item.id.toString(),
    [],
  );

  /* 
  Why we need keyExtractor inside useCallback?

  Without useCallback, the keyExtractor function gets a new reference everytime when this component re-renders (due to things like state updates) causing the entire list to 
  re-render every time. With useCallback, the function holds same reference and persists b/w re-renders due to which flatlist will not render the items if there's no change in the list
  
  */

  const renderItem = useCallback(({ item }: { item: Item }) => {
    return <ListItem item={item} />;
  }, []);

  const getItemLayout = useCallback(
    (_data: any, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  return (
    <FlatList
      data={data}
      // Stable function reference for efficient item tracking
      keyExtractor={keyExtractor}
      // Stable function reference prevents unnecessary re-renders
      renderItem={renderItem}
      // Pre-calculates item positions for instant scrolling (fixed-height items only)
      getItemLayout={getItemLayout}
      // Only render 15 items on initial mount for fast first paint
      initialNumToRender={15}
      // Render 10 items per batch during scrolling for smooth performance
      maxToRenderPerBatch={10}
      // Unmount items outside the viewport to save memory
      removeClippedSubviews={true}
      // Keep items mounted within 5 screen heights (2.5 above + 2.5 below viewport)
      windowSize={5}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    height: ITEM_HEIGHT,
    padding: 16,
    backgroundColor: "white",
    marginBottom: 8,
    justifyContent: "center",
  },
  title: { fontSize: 16, fontWeight: "bold" },
  subtitle: { fontSize: 14, color: "#666" },
});

// Helper function to generate test data
function generateLargeData() {
  return Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    subtitle: `Description ${i + 1}`,
  }));
}

export default SlowList;

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
