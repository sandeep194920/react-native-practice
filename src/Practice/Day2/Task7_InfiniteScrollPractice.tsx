/**
 * 🔥 TASK 7: INFINITE SCROLL / PAGINATION - PRACTICE
 *
 * THE BRIEF:
 * "Load 20 items initially, then load 20 more when user scrolls to the bottom."
 *
 * TARGET TIME: 30-45 minutes
 *
 * WHAT TO SAY WHILE CODING:
 * "onEndReached fires when user scrolls near the bottom. onEndReachedThreshold
 * of 0.5 means trigger when halfway through the last item. I track loading
 * and hasMore states to prevent duplicate requests.
 *
 * The loadMore function checks if we're already loading or out of data before
 * making a new request. This prevents the common bug of multiple simultaneous
 * requests.
 *
 * I'm using page state to track which page to load next.
 *
 * ListFooterComponent shows a loading indicator while fetching more items.
 *
 * When there's no more data, hasMore becomes false and we stop making requests."
 *
 * KEY CONCEPTS:
 * - onEndReached callback
 * - onEndReachedThreshold (0.5 = halfway through last item)
 * - Track: loading, page, hasMore states
 * - Prevent duplicate requests
 * - ListFooterComponent for loading indicator
 * - Append new data to existing array
 *
 * YOUR TASK:
 * Implement the loadMore function and renderFooter!
 */

import React, { useState } from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const ITEMS_PER_PAGE = 20;

function InfiniteScrollListPractice() {
  const [data, setData] = useState(generateInitialData());
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // TODO: Implement loadMore function
  // HINTS:
  // 1. Check if already loading or no more data - return early if so
  // 2. Set loading to true
  // 3. Simulate API call with setTimeout (1500ms)
  // 4. Generate new items with generateMoreData(page + 1)
  // 5. If newItems.length === 0, set hasMore to false
  // 6. Otherwise, append newItems to data and increment page
  // 7. Set loading to false in finally
  const loadMore = async () => {
    // Your code here
  };

  // TODO: Implement renderFooter
  // HINT: If not loading, return null
  // Otherwise, return a View with ActivityIndicator and loading text
  const renderFooter = () => {
    // Your code here
    return null;
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.title}</Text>
        </View>
      )}
      // TODO: Add onEndReached prop - call loadMore
      // TODO: Add onEndReachedThreshold prop - use 0.5
      // TODO: Add ListFooterComponent prop - call renderFooter
    />
  );
}

function generateInitialData() {
  return Array.from({ length: ITEMS_PER_PAGE }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
  }));
}

function generateMoreData(page) {
  // Simulate running out of data after 5 pages
  if (page > 5) return [];

  const start = (page - 1) * ITEMS_PER_PAGE;
  return Array.from({ length: ITEMS_PER_PAGE }, (_, i) => ({
    id: start + i + 1,
    title: `Item ${start + i + 1}`,
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
  itemText: { fontSize: 16 },
  footer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: { marginLeft: 10, color: '#666' },
});

export default InfiniteScrollListPractice;

/**
 * INFINITE SCROLL FLOW:
 *
 * 1. Initial render: 20 items loaded
 * 2. User scrolls down
 * 3. onEndReached fires when 50% through last item
 * 4. loadMore() checks: already loading? No more data?
 * 5. If clear, fetch next page
 * 6. Append new items to existing array
 * 7. Update page number
 * 8. Repeat until no more data
 *
 * IMPLEMENTATION CHECKLIST:
 * □ Implement loadMore function
 *   □ Guard clause: return if loading or !hasMore
 *   □ Set loading to true
 *   □ Simulate API delay
 *   □ Generate new data
 *   □ Check if data exhausted
 *   □ Append to existing data with spread
 *   □ Increment page number
 *   □ Set loading to false in finally
 * □ Implement renderFooter
 *   □ Return null if not loading
 *   □ Show ActivityIndicator and text if loading
 * □ Add FlatList props
 *   □ onEndReached={loadMore}
 *   □ onEndReachedThreshold={0.5}
 *   □ ListFooterComponent={renderFooter}
 *
 * STATE MANAGEMENT:
 * - data: All items loaded so far
 * - page: Current page number (for API requests)
 * - loading: Prevents duplicate requests
 * - hasMore: Stops requests when data exhausted
 *
 * COMMON BUGS TO AVOID:
 * 1. Multiple simultaneous requests (fix: check loading state)
 * 2. Loading after data exhausted (fix: hasMore flag)
 * 3. onEndReached fires too early (fix: adjust threshold)
 * 4. Duplicate items (fix: ensure unique IDs)
 *
 * onEndReachedThreshold VALUES:
 * - 0.5: Triggers halfway through last item (recommended)
 * - 0.1: Triggers very close to end (aggressive)
 * - 1.0: Triggers when last item appears (early)
 *
 * PERFORMANCE TIP:
 * Combine with FlatList optimization (Task 2) for best performance!
 */
