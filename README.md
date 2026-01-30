# 🚀 React Native Interview Preparation - TopTal

This is your complete 3-day practice environment for the TopTal React Native technical interview.

## 📋 Interview Details

- **Date:** Monday, Feb 02, 2026
- **Time:** 11:30 AM - 1:00 PM EST (90 minutes)
- **Format:** Live coding with screen sharing
- **Interviewer:** Bogdan Stroe

## 🎯 What to Expect

Based on the screening process description, you should expect:
- **Live coding challenges** similar to real client scenarios
- **Screen sharing** required - they'll watch you code
- **Professional communication** - explain your approach clearly
- **Problem-solving** - demonstrate how you tackle complex issues
- **No AI tools or copied code** during the interview

## 📁 Project Structure

```
react-native-practice/
├── src/
│   ├── Day1/           # Core patterns (5 tasks)
│   ├── Day2/           # Advanced patterns (3 tasks)
│   ├── Day3/           # Mock interviews
│   └── components/     # Reusable components
├── PROGRESS.md         # Track your learning progress ✅
├── README.md           # This file
└── App.js              # Main navigation
```

## 🏃 Getting Started

### 1. Install Dependencies (if not already done)
```bash
cd react-native-practice
npm install
```

### 2. Start the Development Server
```bash
npm start
```

Then choose:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for web browser
- Scan QR code with Expo Go app on your phone

### 3. Navigate the App
The app has a simple navigation menu to access each practice task:
- Day 1: Tasks 1-5 (Core Patterns)
- Day 2: Tasks 6-8 (Advanced Patterns)
- Day 3: Mock Interview Scenarios

### 4. Track Your Progress
Open [PROGRESS.md](./PROGRESS.md) and check off each task as you complete it!

## 📚 Practice Tasks Overview

### Day 1 - Core Patterns (5 hours)
1. **API Fetch with Search** - Fetch, filter, handle states
2. **FlatList Optimization** - Performance best practices
3. **Debounced Search** - Efficient API calls
4. **Shopping Cart** - State management
5. **Data Transformation** - Clean messy JSON

### Day 2 - Advanced Patterns (4 hours)
6. **Pull-to-Refresh** - RefreshControl
7. **Infinite Scroll** - Pagination
8. **Form Validation** - Email/password validation
9. **Mock Interview #1** - 90-minute practice

### Day 3 - Mastery (3 hours)
10. **Mock Interview #2** - Different tasks
11. **Final Review** - Quick drills

## 🎓 How to Practice Each Task

1. **Read the brief** in the task file comments
2. **Code it yourself** - Don't copy/paste!
3. **Talk out loud** while coding (practice for interview)
4. **Run and test** the component
5. **Time yourself** - aim for target times
6. **Practice twice** for each task
7. **Check off** in PROGRESS.md when done

## 💬 What to Say During Interview

Practice explaining your decisions out loud:

### For API Fetch:
> "I'm setting up three states: data for the full list, filteredData for search results, and loading/error for UI states. Using two useEffects - one to fetch on mount, one to filter when search changes. The fetch includes try/catch/finally for proper error handling..."

### For FlatList Optimization:
> "The key optimizations I'm making: keyExtractor with item.id.toString() is CRITICAL for React to track items efficiently. getItemLayout eliminates expensive layout calculations since items are fixed height. React.memo prevents unnecessary re-renders..."

### For Debounced Search:
> "The debounce pattern uses useEffect with a cleanup function. When searchQuery changes, I set a setTimeout for 500ms. If the user types again before 500ms, the cleanup function clears the previous timeout. This prevents making API calls on every keystroke..."

## 🔑 Key Patterns to Memorize

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

### 2. Set Deduplication (O(n) - Fast!)
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
    // Do something after delay
  }, 500);
  return () => clearTimeout(timeoutId); // Cleanup!
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
  maxToRenderPerBatch={10}
  initialNumToRender={15}
  windowSize={5}
/>
```

## ✅ Pre-Interview Checklist (Monday Morning)

- [ ] Test camera, microphone, internet connection
- [ ] Set up development environment (VS Code, terminal, browser)
- [ ] Choose quiet, distraction-free location
- [ ] Test screen sharing beforehand
- [ ] Join 5 minutes early
- [ ] Light review only (30 min max)
- [ ] NO new coding on interview day
- [ ] Deep breath - you're prepared!

## 🎯 Interview Strategy

1. **Listen carefully** to the brief
2. **Ask clarifying questions** before coding
3. **Think out loud** - explain your approach
4. **Start with the simplest solution** that works
5. **Handle edge cases** - loading, error, empty states
6. **Test as you go** - don't wait until the end
7. **Stay calm** if you get stuck - talk through it
8. **Be professional** - this mirrors a client interaction

## 🚫 What NOT to Do

- ❌ Don't use AI tools or search for solutions during interview
- ❌ Don't copy/paste code from external sources
- ❌ Don't stay silent while coding
- ❌ Don't over-engineer simple solutions
- ❌ Don't ignore error handling
- ❌ Don't forget keyExtractor on FlatList

## 💪 You've Got This!

Remember: After completing this 3-day plan, you'll have practiced:
- ✅ API fetch with all states
- ✅ Search (local + debounced)
- ✅ FlatList optimization
- ✅ Data transformation with Set
- ✅ State management (cart)
- ✅ Pull-to-refresh
- ✅ Infinite scroll
- ✅ Form validation

**That's 90% of practical React Native interviews covered!** 🎯

## 📞 Need Help?

- Review the code comments in each task file
- Check PROGRESS.md for key points to remember
- Practice explaining out loud to a friend
- Record yourself during mock interviews

---

**Good luck! You're going to crush this interview!** 🚀
