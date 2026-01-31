/**
 * 🔥 TASK 6: PULL-TO-REFRESH
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
 */

import React, { useState, useCallback } from 'react';
import { FlatList, RefreshControl, View, Text, StyleSheet } from 'react-native';

function PullToRefreshList() {
  const [data, setData] = useState(generateData());
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Fetch new data
      const newData = generateData();
      setData(newData);
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setRefreshing(false);
    }
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
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#0066cc']} // Android
          tintColor="#0066cc"  // iOS
        />
      }
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

export default PullToRefreshList;

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
