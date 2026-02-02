/**
 * 🔥 TASK 7: INFINITE SCROLL / PAGINATION
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
 * COMMON BUGS TO AVOID:
 * 1. Multiple simultaneous requests (fix: check loading state)
 * 2. Loading after data exhausted (fix: hasMore flag)
 * 3. onEndReached fires too early (fix: adjust threshold)
 * 4. Duplicate items (fix: ensure unique IDs)
 */

import React, { useState } from "react";
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

const ITEMS_PER_PAGE = 20;

function InfiniteScrollList() {
  const [data, setData] = useState(generateInitialData());
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    // Prevent duplicate requests
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newItems = generateMoreData(page + 1);

      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setData((prevData) => [...prevData, ...newItems]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Load more error:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderFooter = () => {
    if (!loading) return null;

    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#0066cc" />
        <Text style={styles.footerText}>Loading more...</Text>
      </View>
    );
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
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
}

function generateInitialData() {
  return Array.from({ length: ITEMS_PER_PAGE }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
  }));
}

function generateMoreData(page: number) {
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
    backgroundColor: "white",
    marginBottom: 8,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  itemText: { fontSize: 16 },
  footer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: { marginLeft: 10, color: "#666" },
});

export default InfiniteScrollList;

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
 * STATE MANAGEMENT:
 * - data: All items loaded so far
 * - page: Current page number (for API requests)
 * - loading: Prevents duplicate requests
 * - hasMore: Stops requests when data exhausted
 *
 * API REQUEST EXAMPLE:
 * fetch(`/api/items?page=${page}&limit=${ITEMS_PER_PAGE}`)
 *
 * ALTERNATIVE: CURSOR-BASED PAGINATION
 * Instead of page numbers, use cursors:
 * fetch(`/api/items?cursor=${lastItemId}&limit=20`)
 *
 * This is more reliable when data changes frequently.
 *
 * onEndReachedThreshold VALUES:
 * - 0.5: Triggers halfway through last item (recommended)
 * - 0.1: Triggers very close to end (aggressive)
 * - 1.0: Triggers when last item appears (early)
 *
 * PERFORMANCE TIP:
 * Combine with FlatList optimization (Task 2) for best performance!
 */
