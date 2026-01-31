/**
 * 🔥 TASK 5: DATA TRANSFORMATION (MESSY JSON)
 *
 * THE BRIEF:
 * "This API returns messy data with duplicates and inconsistent formatting.
 * Clean it, remove duplicates by ID, normalize categories, sort by date
 * newest first, and group by category."
 *
 * TARGET TIME: 20-25 minutes
 * FIRST ATTEMPT: 30 minutes is normal
 *
 * WHAT TO SAY WHILE CODING:
 * "My data cleaning pipeline has 5 steps:
 *
 * 1. DEDUPE using Set - O(n) time, tracks seen IDs. Much faster than
 *    the O(n²) findIndex approach.
 *
 * 2. NORMALIZE categories - lowercase and trim to handle 'Electronics'
 *    vs 'electronics' vs ' CLOTHING '.
 *
 * 3. GROUP using reduce - Creates an object where keys are categories
 *    and values are arrays of items. This is efficient at O(n).
 *
 * 4. SORT by date - Within each category, newest items first using
 *    Date comparison.
 *
 * 5. CONVERT to SectionList format - Transform the grouped object into
 *    the array structure SectionList expects.
 *
 * I'm using console.log statements to show the transformation progress -
 * helpful for debugging.
 *
 * The overall complexity is O(n log n) due to sorting, which is
 * acceptable for most datasets."
 *
 * KEY CONCEPTS:
 * - Set for deduplication (O(n) time complexity)
 * - String methods: toLowerCase(), trim()
 * - Array.reduce() for grouping
 * - Array.sort() with custom comparator
 * - SectionList data structure
 * - Object.keys() to convert object to array
 *
 * WHY SET IS BETTER THAN FILTER:
 *
 * ❌ BAD - Using filter with findIndex (O(n²)):
 * data.filter((item, index) =>
 *   data.findIndex(i => i.id === item.id) === index
 * )
 *
 * ✅ GOOD - Using Set (O(n)):
 * const seen = new Set();
 * data.filter(item => {
 *   if (seen.has(item.id)) return false;
 *   seen.add(item.id);
 *   return true;
 * });
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  SectionList,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

// Simulated messy API data
const MESSY_DATA = [
  { id: 1, name: 'Product A', category: 'electronics', date: '2024-01-15' },
  { id: 2, name: 'Product B', category: 'Electronics', date: '2024-02-20' },
  { id: 1, name: 'Product A', category: 'electronics', date: '2024-01-15' }, // Duplicate
  { id: 3, name: 'Product C', category: 'clothing', date: '2024-01-10' },
  { id: 4, name: 'Product D', category: ' CLOTHING ', date: '2024-03-05' },
  { id: 5, name: 'Product E', category: 'electronics', date: '2024-02-28' },
];

function DataTransformer() {
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    processData();
  }, []);

  const processData = async () => {
    try {
      setLoading(true);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const cleaned = cleanAndTransform(MESSY_DATA);
      setSections(cleaned);
    } catch (error) {
      console.error('Processing error:', error);
    } finally {
      setLoading(false);
    }
  };

  const cleanAndTransform = (rawData) => {
    console.log('Original data:', rawData.length);

    // STEP 1: Remove duplicates by ID using Set
    const seenIds = new Set();
    const uniqueItems = rawData.filter(item => {
      if (seenIds.has(item.id)) {
        return false;
      }
      seenIds.add(item.id);
      return true;
    });
    console.log('After deduplication:', uniqueItems.length);

    // STEP 2: Normalize categories (lowercase, trim whitespace)
    const normalized = uniqueItems.map(item => ({
      ...item,
      category: item.category.toLowerCase().trim(),
    }));

    // STEP 3: Group by category
    const grouped = normalized.reduce((acc, item) => {
      const category = item.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});

    // STEP 4: Sort each category by date (newest first)
    Object.keys(grouped).forEach(category => {
      grouped[category].sort((a, b) =>
        new Date(b.date) - new Date(a.date)
      );
    });

    // STEP 5: Convert to SectionList format
    const sections = Object.keys(grouped)
      .sort() // Sort categories alphabetically
      .map(category => ({
        title: category.charAt(0).toUpperCase() + category.slice(1),
        data: grouped[category],
      }));

    console.log('Final sections:', sections.length);
    return sections;
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Processing data...</Text>
      </View>
    );
  }

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDate}>{item.date}</Text>
        </View>
      )}
      renderSectionHeader={({ section }) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.sectionCount}>({section.data.length})</Text>
        </View>
      )}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#666' },
  listContent: { padding: 16 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0066cc',
    padding: 12,
    marginTop: 8,
    borderRadius: 8,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: 'white', flex: 1 },
  sectionCount: { fontSize: 14, color: 'white' },
  item: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemName: { fontSize: 16, fontWeight: '600' },
  itemDate: { fontSize: 14, color: '#666' },
});

export default DataTransformer;

/**
 * DATA TRANSFORMATION PIPELINE VISUALIZATION:
 *
 * INPUT (6 items, messy):
 * [
 *   { id: 1, category: "electronics", ... },
 *   { id: 2, category: "Electronics", ... },
 *   { id: 1, category: "electronics", ... }, // duplicate
 *   { id: 3, category: "clothing", ... },
 *   { id: 4, category: " CLOTHING ", ... },
 *   { id: 5, category: "electronics", ... }
 * ]
 *
 * AFTER STEP 1 - Dedupe (5 items):
 * [
 *   { id: 1, category: "electronics", ... },
 *   { id: 2, category: "Electronics", ... },
 *   { id: 3, category: "clothing", ... },
 *   { id: 4, category: " CLOTHING ", ... },
 *   { id: 5, category: "electronics", ... }
 * ]
 *
 * AFTER STEP 2 - Normalize (5 items, clean categories):
 * [
 *   { id: 1, category: "electronics", ... },
 *   { id: 2, category: "electronics", ... },
 *   { id: 3, category: "clothing", ... },
 *   { id: 4, category: "clothing", ... },
 *   { id: 5, category: "electronics", ... }
 * ]
 *
 * AFTER STEP 3 - Group (object with 2 keys):
 * {
 *   electronics: [item1, item2, item5],
 *   clothing: [item3, item4]
 * }
 *
 * AFTER STEP 4 - Sort by date (newest first in each group)
 *
 * AFTER STEP 5 - Convert to SectionList format:
 * [
 *   { title: "Clothing", data: [item4, item3] },
 *   { title: "Electronics", data: [item5, item2, item1] }
 * ]
 *
 * COMPLEXITY ANALYSIS:
 * - Step 1 (dedupe): O(n)
 * - Step 2 (normalize): O(n)
 * - Step 3 (group): O(n)
 * - Step 4 (sort): O(k * m log m) where k = categories, m = items per category
 * - Step 5 (convert): O(k)
 * - Overall: O(n log n) dominated by sorting
 */
