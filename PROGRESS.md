# 🎯 React Native Interview Preparation - Progress Tracker

**Interview Date:** Monday, Feb 02, 2026, 11:30 AM - 1:00 PM EST
**Days Remaining:** 3 days (Friday, Saturday, Sunday)

---

## 📅 DAY 1 (FRIDAY) - CORE PATTERNS
**Goal:** Master the 3 most common RN interview tasks
**Total Time:** 5 hours

### Morning Session (2.5 hours)

#### ✅ Task 1: API Fetch with Search (45 min)
- [ ] **First Practice Run** (30-35 min expected)
  - [ ] Code the component
  - [ ] Test loading state
  - [ ] Test error state
  - [ ] Test search functionality
  - [ ] Practice explaining out loud
- [ ] **Second Practice Run** (20-25 min target)
  - [ ] Can you complete it faster?
  - [ ] Smoother explanation?

**Key Points to Remember:**
- Three states: `data`, `filteredData`, `loading/error`
- Two useEffects: fetch on mount, filter on search change
- Always handle loading, error, and empty states
- Use `keyExtractor` with `item.id.toString()`

---

#### ✅ Task 2: FlatList Optimization (45 min)
- [ ] **First Practice Run** (30 min)
  - [ ] Study the BAD code example
  - [ ] Write optimized version
  - [ ] Add React.memo
  - [ ] Add useCallback hooks
  - [ ] Add getItemLayout
- [ ] **Second Practice Run** (20 min target)

**Key Points to Remember:**
- `keyExtractor` is CRITICAL
- `getItemLayout` for fixed heights
- `React.memo` on list items
- `useCallback` for renderItem
- Performance props: `removeClippedSubviews`, `maxToRenderPerBatch`, `windowSize`

---

#### ✅ Task 3: Debounced Search (45 min)
- [ ] **First Practice Run** (30 min)
  - [ ] Implement useEffect with setTimeout
  - [ ] Add cleanup function
  - [ ] Test 500ms delay works
- [ ] **Second Practice Run** (20 min target)

**Key Points to Remember:**
- useEffect cleanup function is CRUCIAL
- Prevents memory leaks
- Cancels pending requests when user types again
- Don't search on empty query

---

### Afternoon Session (2.5 hours)

#### ✅ Task 4: Shopping Cart State Management (45 min)
- [ ] **First Practice Run** (30 min)
  - [ ] Build product list
  - [ ] Implement add/remove
  - [ ] Show cart count in header
  - [ ] Calculate total
- [ ] **Second Practice Run** (20 min target)

**Key Points to Remember:**
- Simple array for cart (duplicates = multiple quantities)
- `prevCart` pattern in setState
- `reduce()` for calculating total
- UI auto-updates on state changes

---

#### ✅ Task 5: Data Transformation (Messy JSON) (45 min)
- [ ] **First Practice Run** (30 min)
  - [ ] Remove duplicates using Set
  - [ ] Normalize categories
  - [ ] Group by category
  - [ ] Sort by date
  - [ ] Convert to SectionList format
- [ ] **Second Practice Run** (20 min target)

**Key Points to Remember:**
- Set deduplication: O(n) vs findIndex O(n²)
- Normalize: lowercase + trim
- Group with reduce
- SectionList needs specific data structure

---

### Evening (1 hour)
- [ ] **Review all Day 1 tasks**
- [ ] **Identify weakest area and practice again**
- [ ] **Review Codility code from first round**

---

## 📅 DAY 2 (SATURDAY) - ADVANCED PATTERNS
**Goal:** Handle complex scenarios
**Total Time:** 4 hours

### Morning Session (2 hours)

#### ✅ Task 6: Pull-to-Refresh (30 min)
- [ ] **Practice Once** (30 min)
  - [ ] Add RefreshControl
  - [ ] Implement onRefresh with useCallback
  - [ ] Test pull gesture

**Key Points to Remember:**
- RefreshControl component
- useCallback for onRefresh
- Separate `refreshing` state
- Set colors for iOS and Android

---

#### ✅ Task 7: Infinite Scroll / Pagination (45 min)
- [ ] **Practice Once** (30 min)
  - [ ] Implement onEndReached
  - [ ] Add loading footer
  - [ ] Track page state
  - [ ] Handle "no more data" state

**Key Points to Remember:**
- `onEndReached` + `onEndReachedThreshold`
- Track: `loading`, `page`, `hasMore`
- Prevent duplicate requests
- ListFooterComponent for loading indicator

---

#### ✅ Task 8: Form with Validation (45 min)
- [ ] **Practice Once** (30 min)
  - [ ] Email validation with regex
  - [ ] Password validation (min 6 chars)
  - [ ] Show errors only after blur
  - [ ] Disable button until valid

**Key Points to Remember:**
- Track value AND "touched" state
- useMemo for validation logic
- Only show errors after user interacts
- Email regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

---

### Afternoon Session (2 hours)

#### ✅ MOCK INTERVIEW #1 (90 min)
- [ ] **Set up recording/timer**
- [ ] **0-5 min:** Introduce yourself
- [ ] **5-35 min:** Build Task 1 (API fetch with search)
- [ ] **35-65 min:** Build Task 4 (Shopping cart)
- [ ] **65-85 min:** Build Task 3 (Debounced search)
- [ ] **85-90 min:** Q&A practice

**CRITICAL:** Talk out loud for the entire 90 minutes!

---

#### ✅ Review (30 min)
- [ ] What went well?
- [ ] What took too long?
- [ ] Did you explain enough?
- [ ] Any bugs to fix?

---

## 📅 DAY 3 (SUNDAY) - MASTERY & CONFIDENCE
**Goal:** Polish and peak performance
**Total Time:** 3 hours

### Morning Session (2 hours)

#### ✅ MOCK INTERVIEW #2 (90 min)
- [ ] **Set up recording/timer**
- [ ] **Task 1 (30 min):** Data transformation (messy JSON)
- [ ] **Task 2 (30 min):** Infinite scroll
- [ ] **Task 3 (30 min):** Form with validation

**Focus:** Speed + Communication

---

#### ✅ Review (30 min)
- [ ] Compare to Mock Interview #1
- [ ] Note improvements
- [ ] Final weak areas?

---

### Afternoon (1 hour)

#### ✅ Final Polish - Quick Drills (10 min each)
- [ ] Explain Set deduplication approach
- [ ] Explain FlatList keyExtractor importance
- [ ] Explain debounce pattern
- [ ] Explain useState vs useReducer
- [ ] Explain useEffect cleanup function
- [ ] Review your Codility code one last time

---

## 🎯 PATTERNS TO MEMORIZE

### 1. API Fetch Template
```javascript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

const fetchData = async () => {
  try {
    setLoading(true);
    setError(null);
    const response = await fetch(url);
    if (!response.ok) throw new Error('HTTP error');
    const json = await response.json();
    setData(json);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

### 2. Set Deduplication
```javascript
const seenIds = new Set();
const unique = data.filter(item => {
  if (seenIds.has(item.id)) return false;
  seenIds.add(item.id);
  return true;
});
```

### 3. Debounce Pattern
```javascript
useEffect(() => {
  const timeoutId = setTimeout(() => {
    // Do something
  }, 500);
  return () => clearTimeout(timeoutId);
}, [dependency]);
```

### 4. FlatList Optimization
```javascript
<FlatList
  keyExtractor={(item) => item.id.toString()}
  getItemLayout={(data, index) => ({
    length: HEIGHT,
    offset: HEIGHT * index,
    index,
  })}
  removeClippedSubviews={true}
/>
```

---

## 📊 Overall Progress

**Day 1:** [ ] Completed
**Day 2:** [ ] Completed
**Day 3:** [ ] Completed

**Mock Interview #1:** [ ] Completed
**Mock Interview #2:** [ ] Completed

**Confidence Level:** [ ] Ready to crush it! 💪

---

## 💡 Interview Day Checklist (Monday Morning)

- [ ] Light review only (30 min max)
- [ ] No new coding
- [ ] Test camera, microphone, internet
- [ ] Quiet environment ready
- [ ] Development environment set up
- [ ] Arrive 5 minutes early
- [ ] Deep breath - you got this!

---

## 🚀 You've Got This!

After completing this 3-day plan, you'll have mastered:
✅ API fetch with all states
✅ Search (local + debounced)
✅ FlatList optimization
✅ Data transformation with Set
✅ State management (cart)
✅ Pull-to-refresh
✅ Infinite scroll
✅ Form validation

**That's 90% of practical RN interviews covered!** 🎯
