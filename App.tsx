import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

interface Task {
  id: string;
  title: string;
  component: () => React.JSX.Element;
  day: string;
  time: string;
}

// Day 1 Tasks
import Task1_APIFetchWithSearch from "./src/Day1/Task1_APIFetchWithSearch";
import Task2_FlatListOptimization from "./src/Day1/Task2_FlatListOptimization";
import Task3_DebouncedSearch from "./src/Day1/Task3_DebouncedSearch";
import Task4_ShoppingCart from "./src/Day1/Task4_ShoppingCart";
import Task5_DataTransformation from "./src/Day1/Task5_DataTransformation";

// Day 2 Tasks
import Task6_PullToRefresh from "./src/Day2/Task6_PullToRefresh";
import Task7_InfiniteScroll from "./src/Day2/Task7_InfiniteScroll";
import Task8_FormValidation from "./src/Day2/Task8_FormValidation";
import Task1_APIFetchWithSearchPractice from "./src/Practice/Day1/Task1_APIFetchWithSearchPractice";

export default function App() {
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [currentPracticeTask, setCurrentPracticeTask] = useState<Task | null>(
    null,
  );

  const tasks: Task[] = [
    {
      id: "day1-task1",
      title: "Task 1: API Fetch with Search",
      component: Task1_APIFetchWithSearch,
      day: "Day 1",
      time: "20-25 min",
    },
    {
      id: "day1-task1-practice",
      title: "Task 1: Practice",
      component: Task1_APIFetchWithSearchPractice,
      day: "Day 1",
      time: "20-25 min",
    },
    {
      id: "day1-task2",
      title: "Task 2: FlatList Optimization",
      component: Task2_FlatListOptimization,
      day: "Day 1",
      time: "20-25 min",
    },
    {
      id: "day1-task3",
      title: "Task 3: Debounced Search",
      component: Task3_DebouncedSearch,
      day: "Day 1",
      time: "20-25 min",
    },
    {
      id: "day1-task4",
      title: "Task 4: Shopping Cart",
      component: Task4_ShoppingCart,
      day: "Day 1",
      time: "20-25 min",
    },
    {
      id: "day1-task5",
      title: "Task 5: Data Transformation",
      component: Task5_DataTransformation,
      day: "Day 1",
      time: "20-25 min",
    },
    {
      id: "day2-task6",
      title: "Task 6: Pull to Refresh",
      component: Task6_PullToRefresh,
      day: "Day 2",
      time: "20-30 min",
    },
    {
      id: "day2-task7",
      title: "Task 7: Infinite Scroll",
      component: Task7_InfiniteScroll,
      day: "Day 2",
      time: "30-45 min",
    },
    {
      id: "day2-task8",
      title: "Task 8: Form Validation",
      component: Task8_FormValidation,
      day: "Day 2",
      time: "30-45 min",
    },
  ];

  if (currentTask) {
    const TaskComponent = currentTask.component;
    return (
      <SafeAreaView style={styles.taskContainer}>
        <View style={styles.taskHeader}>
          <TouchableOpacity
            onPress={() => setCurrentTask(null)}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>← Back to Menu</Text>
          </TouchableOpacity>
          <Text style={styles.taskTitle}>{currentTask.title}</Text>
          <Text style={styles.taskTime}>Target: {currentTask.time}</Text>
        </View>
        <View style={styles.taskContent}>
          <TaskComponent />
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🚀 React Native Interview Prep</Text>
        <Text style={styles.headerSubtitle}>
          TopTal Technical Interview Practice
        </Text>
        <Text style={styles.interviewDate}>
          Interview: Mon, Feb 02, 2026 @ 11:30 AM EST
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Day 1 Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            📅 Day 1 - Core Patterns (5 hours)
          </Text>
          <Text style={styles.sectionDescription}>
            Master the most common RN interview tasks
          </Text>
          {tasks
            .filter((task) => task.day === "Day 1")
            .map((task) => (
              <TouchableOpacity
                key={task.id}
                style={styles.taskButton}
                onPress={() => setCurrentTask(task)}
              >
                <View style={styles.taskButtonContent}>
                  <Text style={styles.taskButtonTitle}>{task.title}</Text>
                  <Text style={styles.taskButtonTime}>{task.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>

        {/* Day 2 Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            📅 Day 2 - Advanced Patterns (4 hours)
          </Text>
          <Text style={styles.sectionDescription}>
            Handle complex scenarios
          </Text>
          {tasks
            .filter((task) => task.day === "Day 2")
            .map((task) => (
              <TouchableOpacity
                key={task.id}
                style={styles.taskButton}
                onPress={() => setCurrentTask(task)}
              >
                <View style={styles.taskButtonContent}>
                  <Text style={styles.taskButtonTitle}>{task.title}</Text>
                  <Text style={styles.taskButtonTime}>{task.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>

        {/* Day 3 Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            📅 Day 3 - Mock Interviews (3 hours)
          </Text>
          <Text style={styles.sectionDescription}>
            Full interview simulations
          </Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>📋 Mock Interview #1</Text>
            <Text style={styles.infoText}>• 90 minutes timed practice</Text>
            <Text style={styles.infoText}>• Tasks 1, 4, 3 from Day 1</Text>
            <Text style={styles.infoText}>• Practice talking out loud!</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>📋 Mock Interview #2</Text>
            <Text style={styles.infoText}>• 90 minutes timed practice</Text>
            <Text style={styles.infoText}>• Tasks 5, 7, 8</Text>
            <Text style={styles.infoText}>• Focus on speed + clarity</Text>
          </View>
        </View>

        {/* Progress Tracker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Track Your Progress</Text>
          <Text style={styles.sectionDescription}>
            Open [PROGRESS.md](./PROGRESS.md) to check off completed tasks!
          </Text>
        </View>

        {/* Tips Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Quick Tips</Text>
          <View style={styles.tipBox}>
            <Text style={styles.tipText}>
              ✅ Always use keyExtractor on FlatList
            </Text>
            <Text style={styles.tipText}>
              ✅ Handle loading, error, empty states
            </Text>
            <Text style={styles.tipText}>
              ✅ Use Set for O(n) deduplication
            </Text>
            <Text style={styles.tipText}>
              ✅ useEffect cleanup prevents memory leaks
            </Text>
            <Text style={styles.tipText}>
              ✅ Talk out loud during practice!
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Good luck! You've got this! 💪</Text>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  practiceContainer: {
    marginTop: 4,
  },

  taskContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#0066cc",
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "white",
    opacity: 0.9,
    marginBottom: 8,
  },
  interviewDate: {
    fontSize: 12,
    color: "white",
    opacity: 0.8,
    fontStyle: "italic",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  sectionDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  taskButton: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskButtonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskButtonTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0066cc",
    flex: 1,
  },
  taskButtonTime: {
    fontSize: 12,
    color: "#666",
    marginLeft: 8,
  },
  taskButtonSubtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0066cc",
    flex: 1,
  },
  infoBox: {
    backgroundColor: "#e3f2fd",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#0066cc",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#0066cc",
  },
  infoText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  tipBox: {
    backgroundColor: "#fff3e0",
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#ff9800",
  },
  tipText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
  },
  footer: {
    alignItems: "center",
    padding: 20,
  },
  footerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0066cc",
  },
  taskHeader: {
    backgroundColor: "#0066cc",
    padding: 16,
    paddingTop: 10,
  },
  backButton: {
    marginBottom: 8,
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  taskTime: {
    fontSize: 14,
    color: "white",
    opacity: 0.9,
  },
  taskContent: {
    flex: 1,
  },
});
