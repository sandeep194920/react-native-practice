# ⚡ React Native Interview Cheat Sheet

Quick reference for the most important patterns. Keep this open during practice!

---

## 🔥 Pattern 1: API Fetch Template

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

useEffect(() => {
  fetchData();
}, []);

// Render states
if (loading) return <ActivityIndicator />;
if (error) return <ErrorView />;
return <SuccessView />;
```

**Say:** "I'm using try-catch-finally to handle errors and always turn off loading."

---

## 🔥 Pattern 2: FlatList Optimization

```javascript
const ITEM_HEIGHT = 80;

const ListItem = memo(({ item }) => (
  <View style={{ height: ITEM_HEIGHT }}>
    <Text>{item.title}</Text>
  </View>
));

const renderItem = useCallback(({ item }) => (
  <ListItem item={item} />
), []);

const keyExtractor = useCallback((item) => item.id.toString(), []);

const getItemLayout = useCallback((data, index) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
}), []);

<FlatList
  data={data}
  renderItem={renderItem}
  keyExtractor={keyExtractor}
  getItemLayout={getItemLayout}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  initialNumToRender={15}
  windowSize={5}
/>
```

**Say:** "keyExtractor is CRITICAL for React to track items. getItemLayout eliminates layout calculations."

---

## 🔥 Pattern 3: Debounce

```javascript
const [searchQuery, setSearchQuery] = useState('');

useEffect(() => {
  if (searchQuery.trim() === '') return;

  const timeoutId = setTimeout(async () => {
    // Make API call
    const results = await fetch(`/api?q=${searchQuery}`);
  }, 500);

  return () => clearTimeout(timeoutId);
}, [searchQuery]);
```

**Say:** "The cleanup function clears the timeout if the user types again, preventing multiple API calls."

---

## 🔥 Pattern 4: Set Deduplication

```javascript
// ✅ FAST - O(n)
const seenIds = new Set();
const unique = data.filter(item => {
  if (seenIds.has(item.id)) return false;
  seenIds.add(item.id);
  return true;
});

// ❌ SLOW - O(n²) - Never use this!
const unique = data.filter((item, index) =>
  data.findIndex(i => i.id === item.id) === index
);
```

**Say:** "Using Set for O(n) deduplication instead of nested loops which would be O(n²)."

---

## 🔥 Pattern 5: Pull-to-Refresh

```javascript
const [refreshing, setRefreshing] = useState(false);

const onRefresh = useCallback(async () => {
  setRefreshing(true);
  try {
    const newData = await fetchData();
    setData(newData);
  } finally {
    setRefreshing(false);
  }
}, []);

<FlatList
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={['#0066cc']}  // Android
      tintColor="#0066cc"   // iOS
    />
  }
/>
```

**Say:** "useCallback prevents recreating the function. Always set refreshing to false in finally."

---

## 🔥 Pattern 6: Infinite Scroll

```javascript
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false);
const [hasMore, setHasMore] = useState(true);

const loadMore = async () => {
  if (loading || !hasMore) return;

  setLoading(true);
  const newItems = await fetchPage(page + 1);

  if (newItems.length === 0) {
    setHasMore(false);
  } else {
    setData(prev => [...prev, ...newItems]);
    setPage(prev => prev + 1);
  }
  setLoading(false);
};

<FlatList
  onEndReached={loadMore}
  onEndReachedThreshold={0.5}
  ListFooterComponent={loading ? <ActivityIndicator /> : null}
/>
```

**Say:** "Check loading and hasMore to prevent duplicate requests. Append new items to existing data."

---

## 🔥 Pattern 7: Form Validation

```javascript
const [email, setEmail] = useState('');
const [emailTouched, setEmailTouched] = useState(false);

const emailError = useMemo(() => {
  if (!emailTouched) return '';
  if (email.trim() === '') return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Invalid email format';
  }
  return '';
}, [email, emailTouched]);

const isValid = email.trim() !== '' && emailError === '';

<TextInput
  value={email}
  onChangeText={setEmail}
  onBlur={() => setEmailTouched(true)}
  autoCapitalize="none"
  keyboardType="email-address"
/>
{emailError && emailTouched && <Text>{emailError}</Text>}

<TouchableOpacity disabled={!isValid}>
  <Text>Submit</Text>
</TouchableOpacity>
```

**Say:** "Track touched state to only show errors after user interacts. useMemo prevents recalculation."

---

## 🔥 Pattern 8: Data Grouping

```javascript
// Group by category
const grouped = data.reduce((acc, item) => {
  const category = item.category;
  if (!acc[category]) acc[category] = [];
  acc[category].push(item);
  return acc;
}, {});

// Convert to SectionList format
const sections = Object.keys(grouped).map(category => ({
  title: category,
  data: grouped[category],
}));

<SectionList
  sections={sections}
  renderSectionHeader={({ section }) => (
    <Text>{section.title}</Text>
  )}
  renderItem={({ item }) => <Text>{item.name}</Text>}
/>
```

**Say:** "Using reduce to group items by category in O(n) time."

---

## 📝 Quick Dos and Don'ts

### ✅ DO
- Always use `keyExtractor` on FlatList
- Handle loading, error, empty, success states
- Use functional setState: `setState(prev => ...)`
- Clean up useEffect with return function
- Talk out loud constantly during interview
- Test your code as you go
- Use Set for deduplication
- Use useMemo/useCallback for optimization

### ❌ DON'T
- Code in silence
- Forget try-catch-finally
- Use nested loops for deduplication
- Forget cleanup in useEffect
- Over-engineer simple solutions
- Submit without testing
- Panic if stuck - talk through it

---

## 🗣️ Key Phrases to Say

### When Starting
"Let me break this down into steps: First, I'll set up the states, then fetch the data, then handle the different UI states."

### When Making Decisions
"I'm choosing this approach because..."
"The trade-off here is..."
"For production, I would also consider..."

### When Stuck
"Let me think through this out loud..."
"I'm going to start with the simplest solution first..."

### When Testing
"Let me test the loading state... the error state... and the success state."

---

## ⏱️ Time Targets

| Task | First Try | Target |
|------|-----------|--------|
| API Fetch + Search | 30-35 min | 20-25 min |
| FlatList Optimization | 25-30 min | 20 min |
| Debounced Search | 25-30 min | 20 min |
| Shopping Cart | 30 min | 20-25 min |
| Data Transformation | 30 min | 20-25 min |
| Pull-to-Refresh | 25 min | 15-20 min |
| Infinite Scroll | 40 min | 30 min |
| Form Validation | 40 min | 30 min |

---

## 🎯 Must Remember

1. **keyExtractor** - Without it, FlatList dies
2. **All 4 states** - loading, error, empty, success
3. **Cleanup functions** - Prevent memory leaks
4. **Set > nested loops** - O(n) vs O(n²)
5. **Talk out loud** - 50% of interview success

---

## 🔢 Common Regex Patterns

```javascript
// Email
/^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Phone (US)
/^\d{3}-\d{3}-\d{4}$/

// Password (min 6 chars, 1 number, 1 letter)
/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
```

---

## 📱 TextInput Props to Remember

```javascript
<TextInput
  autoCapitalize="none"        // For emails
  autoCorrect={false}          // For emails/passwords
  keyboardType="email-address" // Shows @ key
  secureTextEntry              // For passwords
  returnKeyType="done"         // Return key label
  onBlur={() => ...}           // Track touched state
/>
```

**Keyboard Types:**
- `email-address` - Shows @ and .com
- `numeric` - Number pad
- `phone-pad` - Phone number pad
- `decimal-pad` - Numbers with decimal

---

## 🎨 Common Styles

```javascript
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  button: {
    backgroundColor: '#0066cc',
    padding: 12,
    borderRadius: 8
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
```

---

**Print this or keep it open during practice!** ⚡
