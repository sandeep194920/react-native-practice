/**
 * 🔥 TASK 6: PULL-TO-REFRESH - PRACTICE
 *
 * THE BRIEF:
 * "Add pull-to-refresh functionality to reload the data."
 *
 * TARGET TIME: 20-30 minutes
 *
 * WHAT TO SAY WHILE CODING:
 * "RefreshControl handles the pull-to-refresh gesture. I use useCallback
 * for onRefresh to prevent recreating the function. The refreshing state
 * controls the loading indicator.
 *
 * I'm setting colors for both iOS (tintColor) and Android (colors array)
 * to maintain consistent branding.
 *
 * The onRefresh function simulates an API call - in production this would
 * fetch fresh data from the server.
 *
 * RefreshControl is a prop of FlatList/ScrollView, not a wrapper component."
 *
 * KEY CONCEPTS:
 * - RefreshControl component
 * - useCallback for onRefresh
 * - Separate refreshing state
 * - Platform-specific styling (colors vs tintColor)
 * - Works with FlatList, ScrollView, SectionList
 *
 * YOUR TASK:
 * Implement the onRefresh function and add RefreshControl to FlatList!
 */

import React, { useState, useCallback } from 'react';
import { FlatList, RefreshControl, View, Text, StyleSheet } from 'react-native';

function PullToRefreshListPractice() {
  const [data, setData] = useState(generateData());
  const [refreshing, setRefreshing] = useState(false);

  // TODO: Implement onRefresh function
  // HINTS:
  // 1. Use useCallback to memoize the function
  // 2. Set refreshing to true at the start
  // 3. Simulate API call with setTimeout (2000ms)
  // 4. Generate new data with generateData()
  // 5. Update data state
  // 6. Set refreshing to false in finally block
  const onRefresh = useCallback(async () => {
    // Your code here
  }, []);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      )}
      // TODO: Add refreshControl prop here
      // HINT: Use <RefreshControl refreshing={...} onRefresh={...} colors={...} tintColor={...} />
    />
  );
}

function generateData() {
  return Array.from({ length: 20 }, (_, i) => ({
    id: Date.now() + i,
    title: `Item ${i + 1}`,
    subtitle: `Updated ${new Date().toLocaleTimeString()}`,
  }));
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 8,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default PullToRefreshListPractice;

/**
 * PULL-TO-REFRESH UX PATTERN:
 *
 * 1. User pulls down on the list
 * 2. RefreshControl shows loading spinner
 * 3. onRefresh callback is triggered
 * 4. Fetch fresh data from API
 * 5. Update state with new data
 * 6. Set refreshing to false
 * 7. Spinner disappears, list shows new data
 *
 * IMPLEMENTATION CHECKLIST:
 * □ Create onRefresh function with useCallback
 * □ Set refreshing state to true
 * □ Simulate API call with setTimeout
 * □ Fetch/generate new data
 * □ Update data state
 * □ Set refreshing to false in finally
 * □ Add RefreshControl to FlatList
 * □ Set refreshing prop
 * □ Set onRefresh prop
 * □ Set colors for Android
 * □ Set tintColor for iOS
 *
 * WHY useCallback?
 * Without useCallback, onRefresh would be recreated on every render,
 * causing RefreshControl to re-mount unnecessarily.
 *
 * COMMON MISTAKE:
 * ❌ Forgetting to set refreshing={false} after fetch completes
 * Result: Spinner never stops!
 *
 * PLATFORM DIFFERENCES:
 * - iOS: Uses tintColor, pulls from top
 * - Android: Uses colors array, material design spinner
 * - Web: No native pull-to-refresh, needs custom implementation
 */
