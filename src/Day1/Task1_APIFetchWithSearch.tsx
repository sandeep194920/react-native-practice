/**
 * 🔥 TASK 1: API FETCH WITH SEARCH
 *
 * THE BRIEF (memorize this scenario):
 * "Fetch user data from this API, display it in a list, add a search bar
 * to filter locally, and handle loading/error states."
 *
 * YOUR MISSION: Code this in 25 minutes while talking out loud.
 *
 * TARGET TIME: 20-25 minutes
 * FIRST ATTEMPT: 30-35 minutes is normal
 *
 * WHAT TO SAY WHILE CODING:
 * "I'm setting up three states: data for the full list, filteredData
 * for search results, and loading/error for UI states.
 *
 * Using two useEffects - one to fetch on mount, one to filter when
 * search changes.
 *
 * The fetch includes try/catch/finally for proper error handling and
 * always turning off loading.
 *
 * Filtering locally instead of making new API calls - better UX and
 * less network requests.
 *
 * FlatList needs keyExtractor - using item.id.toString() so React can
 * efficiently track items.
 *
 * ListEmptyComponent provides feedback when search returns nothing.
 *
 * This pattern handles all the edge cases: loading, error, empty, and
 * success states."
 *
 * KEY CONCEPTS:
 * - useState for data, filteredData, loading, error, searchQuery
 * - useEffect for fetching on mount
 * - useEffect for filtering when search changes
 * - try/catch/finally for error handling
 * - FlatList with keyExtractor
 * - Conditional rendering for loading/error states
 * - ListEmptyComponent for empty results
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

function UserList() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Filter data whenever search query or data changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, data]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://jsonplaceholder.typicode.com/users');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      setData(json);
      setFilteredData(json);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // LOADING STATE
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.button} onPress={fetchData}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // SUCCESS STATE
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or email..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCapitalize="none"
      />
      <Text style={styles.resultCount}>
        {filteredData.length} result{filteredData.length !== 1 ? 's' : ''}
      </Text>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text>No results found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#666' },
  errorText: { color: '#d32f2f', marginBottom: 20 },
  button: { backgroundColor: '#0066cc', padding: 12, borderRadius: 8 },
  buttonText: { color: 'white', fontWeight: '600' },
  searchInput: {
    backgroundColor: 'white',
    margin: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  resultCount: { paddingHorizontal: 16, color: '#666', marginBottom: 8 },
  item: {
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  name: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  email: { fontSize: 14, color: '#666' },
  empty: { padding: 40, alignItems: 'center' },
});

export default UserList;
