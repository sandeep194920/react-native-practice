/**
 * 🔥 TASK 3: DEBOUNCED SEARCH - PRACTICE
 *
 * THE BRIEF:
 * "Add a search bar that waits 500ms after typing stops before making
 * an API call. This prevents too many requests."
 *
 * TARGET TIME: 20-25 minutes
 * FIRST ATTEMPT: 30 minutes is normal
 *
 * WHAT TO SAY WHILE CODING:
 * "The debounce pattern uses useEffect with a cleanup function.
 *
 * When searchQuery changes, I set a setTimeout for 500ms. If the user
 * types again before 500ms, the cleanup function runs and clears the
 * previous timeout. This prevents making API calls on every keystroke.
 *
 * Only when the user stops typing for 500ms does the actual API call
 * happen.
 *
 * I'm also handling the loading state separately - it shows immediately
 * when typing starts, not waiting for the debounce.
 *
 * The cleanup function is crucial - without it, we'd have memory leaks
 * and multiple pending requests.
 *
 * This pattern saves network bandwidth and improves performance."
 *
 * KEY CONCEPTS:
 * - useEffect with setTimeout
 * - Cleanup function (return statement in useEffect)
 * - Debounce delay (500ms is common)
 * - Don't search on empty query
 * - Cancel pending requests when user types again
 *
 * WHY THIS MATTERS:
 * Without debouncing, typing "react" would make 5 API calls:
 * "r", "re", "rea", "reac", "react"
 *
 * With debouncing, only 1 API call is made after user stops typing.
 *
 * YOUR TASK:
 * Implement the debounce logic inside the useEffect below!
 */

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

interface User {
  name: string;
  email: string;
  id: number;
}

function DebouncedSearchPractice() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const searchTerm = searchQuery.trim().toLowerCase();

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?name_like=${searchTerm}`,
      );
      const results: User[] = await response.json();

      const users = results.filter((user) => {
        return (
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm)
        );
      });

      setResults(users);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
    } else {
      setLoading(false);
      setResults([]);
    }
  }, [searchTerm]);

  useDebounce({
    searchQuery: searchTerm,
    callback: fetchData,
    timer: 500,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search users..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultName}>{item.name}</Text>
            <Text style={styles.resultEmail}>{item.email}</Text>
          </View>
        )}
        ListEmptyComponent={
          !loading && searchQuery.trim() !== "" ? (
            <View style={styles.empty}>
              <Text>No results found</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  input: {
    backgroundColor: "white",
    margin: 16,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  loadingText: { marginLeft: 10, color: "#666" },
  resultItem: {
    backgroundColor: "white",
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  resultName: { fontSize: 16, fontWeight: "bold" },
  resultEmail: { fontSize: 14, color: "#666", marginTop: 4 },
  empty: { padding: 40, alignItems: "center" },
});

export default DebouncedSearchPractice;

const useDebounce = ({
  searchQuery,
  callback,
  timer,
}: {
  searchQuery: string;
  callback: Function;
  timer: number;
}) => {
  useEffect(() => {
    // TODO: Implement debounced search here!
    //
    // HINTS:
    // 1. Check if searchQuery is empty - if so, clear results and return
    // 2. Set loading to true
    // 3. Use setTimeout to delay the API call by 500ms
    // 4. Inside the setTimeout, fetch from:
    //    `https://jsonplaceholder.typicode.com/users?name_like=${searchQuery}`
    // 5. Update results with the data
    // 6. Set loading to false in the finally block
    // 7. IMPORTANT: Return a cleanup function that clears the timeout!
    //
    // CLEANUP FUNCTION PATTERN:
    // return () => {
    //   clearTimeout(timeoutId);
    // };

    const timerId = setTimeout(() => {
      callback();
    }, timer);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery, timer]);
};

/**
 * DEBOUNCE PATTERN BREAKDOWN:
 *
 * 1. User types "r" → setTimeout starts (500ms)
 * 2. User types "e" (within 500ms) → cleanup runs, clears first timeout
 * 3. New setTimeout starts (500ms)
 * 4. User types "a" → cleanup runs again
 * 5. User types "c" → cleanup runs again
 * 6. User types "t" → cleanup runs again
 * 7. User stops typing → after 500ms, API call fires
 *
 * Result: 1 API call instead of 5! 🚀
 *
 * COMMON MISTAKE TO AVOID:
 * Forgetting the cleanup function leads to:
 * - Multiple simultaneous API calls
 * - Memory leaks
 * - Race conditions (older results overwriting newer ones)
 */
