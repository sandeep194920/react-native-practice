/**
 * 🔥 TASK 5: DATA TRANSFORMATION (MESSY JSON) - PRACTICE
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
 * YOUR TASK:
 * Implement the cleanAndTransform function below!
 */

import React, { useState, useEffect } from "react";
import {
  View,
  SectionList,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

// Simulated messy API data
const MESSY_DATA = [
  { id: 1, name: "Product A", category: "electronics", date: "2024-01-15" },
  { id: 2, name: "Product B", category: "Electronics", date: "2024-02-20" },
  { id: 1, name: "Product A", category: "electronics", date: "2024-01-15" }, // Duplicate
  { id: 3, name: "Product C", category: "clothing", date: "2024-01-10" },
  { id: 4, name: "Product D", category: " CLOTHING ", date: "2024-03-05" },
  { id: 5, name: "Product E", category: "electronics", date: "2024-02-28" },
];

type Item = (typeof MESSY_DATA)[number];

const cleanAndTransform = (data: Item[]) => {
  const cleanedData = [
    ...data
      .reduce<Map<number, Item>>((acc, item) => {
        const formattedCategory = item.category.trim().toLowerCase();

        if (!acc.has(item.id)) {
          acc.set(item.id, {
            ...item,
            category:
              formattedCategory[0].toUpperCase() + formattedCategory.slice(1),
          });
        }

        return acc;
      }, new Map())
      .values(),
  ];

  const sections = cleanedData.reduce<Record<string, Item[]>>(
    (categories, item) => {
      if (!categories[item.category]) {
        categories[item.category] = [];
      }

      categories[item.category].push(item);

      return categories;
    },
    {},
  );

  const formattedSections = Object.entries(sections).map(([key, val]) => ({
    title: key,
    data: val.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    ),
  }));

  return formattedSections.sort((a, b) => a.title.localeCompare(b.title));
};

function DataTransformerPractice() {
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState<
    ReadonlyArray<{ title: string; data: Item[] }>
  >([]);

  useEffect(() => {
    processData();
  }, []);

  const processData = async () => {
    try {
      setLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const sectionsData = cleanAndTransform(MESSY_DATA);

      setSections(sectionsData);
    } catch (error) {
      console.error("Processing error:", error);
    } finally {
      setLoading(false);
    }
  };

  // const cleanAndTransform = (rawData) => {
  //   console.log("Original data:", rawData.length);

  //   // TODO: STEP 1 - Remove duplicates by ID using Set
  //   // HINT: Create a Set to track seen IDs
  //   // Use filter to keep only items we haven't seen before
  //   const uniqueItems = []; // Replace this with your implementation

  //   console.log("After deduplication:", uniqueItems.length);

  //   // TODO: STEP 2 - Normalize categories (lowercase, trim whitespace)
  //   // HINT: Use map to create new objects with normalized category
  //   // Use .toLowerCase() and .trim() on the category string
  //   const normalized = []; // Replace this with your implementation

  //   // TODO: STEP 3 - Group by category
  //   // HINT: Use reduce to create an object like:
  //   // { electronics: [item1, item2], clothing: [item3] }
  //   const grouped = {}; // Replace this with your implementation

  //   // TODO: STEP 4 - Sort each category by date (newest first)
  //   // HINT: Loop through Object.keys(grouped)
  //   // For each category, use .sort() with a comparator
  //   // Compare dates: new Date(b.date) - new Date(a.date) for descending
  //   // Your code here

  //   // TODO: STEP 5 - Convert to SectionList format
  //   // HINT: Use Object.keys(grouped).sort() to get sorted category names
  //   // Map each category to an object: { title: 'Category', data: [...items] }
  //   // Capitalize the first letter of category for title
  //   const sections = []; // Replace this with your implementation

  //   console.log("Final sections:", sections.length);
  //   return sections;
  // };

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
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, color: "#666" },
  listContent: { padding: 16 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0066cc",
    padding: 12,
    marginTop: 8,
    borderRadius: 8,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "white", flex: 1 },
  sectionCount: { fontSize: 14, color: "white" },
  item: {
    backgroundColor: "white",
    padding: 16,
    marginTop: 8,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemName: { fontSize: 16, fontWeight: "600" },
  itemDate: { fontSize: 14, color: "#666" },
});

export default DataTransformerPractice;

/**
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
 *
 * IMPLEMENTATION CHECKLIST:
 * □ Step 1: Remove duplicates using Set
 * □ Step 2: Normalize categories (lowercase + trim)
 * □ Step 3: Group items by category using reduce
 * □ Step 4: Sort each category by date (newest first)
 * □ Step 5: Convert to SectionList format with title & data
 *
 * EXPECTED OUTPUT:
 * [
 *   {
 *     title: "Clothing",
 *     data: [
 *       { id: 4, name: 'Product D', category: 'clothing', date: '2024-03-05' },
 *       { id: 3, name: 'Product C', category: 'clothing', date: '2024-01-10' }
 *     ]
 *   },
 *   {
 *     title: "Electronics",
 *     data: [
 *       { id: 5, name: 'Product E', category: 'electronics', date: '2024-02-28' },
 *       { id: 2, name: 'Product B', category: 'electronics', date: '2024-02-20' },
 *       { id: 1, name: 'Product A', category: 'electronics', date: '2024-01-15' }
 *     ]
 *   }
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
