# 🚀 Quick Start Guide

## Getting Started in 3 Steps

### 1. Navigate to the Project
```bash
cd /Users/sandeepamarnath/Desktop/react-native-practice
```

### 2. Start the Development Server
```bash
npm start
```

### 3. Choose Your Platform
After running `npm start`, you'll see options:
- Press `w` to open in **web browser** (easiest for practice!)
- Press `i` to open in **iOS simulator** (requires Xcode)
- Press `a` to open in **Android emulator** (requires Android Studio)
- Scan QR code with **Expo Go app** on your phone

**Recommendation:** Use web browser (`w`) for fastest setup!

---

## 📱 What You'll See

The app will open with a menu showing:
- **Day 1:** 5 core pattern tasks
- **Day 2:** 3 advanced pattern tasks
- **Day 3:** Mock interview instructions

Tap any task to view and test it!

---

## 📝 How to Practice

### For Each Task:

1. **Read the task file** in your code editor
   - Each file has detailed comments explaining what to do
   - Look for "THE BRIEF" and "WHAT TO SAY WHILE CODING"

2. **Create a NEW file** to practice coding from scratch
   - Don't just read the provided code!
   - Try to build it yourself
   - Use the provided code as a reference only

3. **Time yourself**
   - First attempt: 30-35 min is normal
   - Second attempt: aim for 20-25 min target

4. **Talk out loud** while coding
   - This is CRITICAL for interview success
   - Explain every decision you make
   - Practice the suggested narration in each task file

5. **Check off in PROGRESS.md**
   - Track which tasks you've completed
   - Mark when you've done first and second attempts

---

## 🗂️ Project Structure

```
react-native-practice/
├── src/
│   ├── Day1/
│   │   ├── Task1_APIFetchWithSearch.js
│   │   ├── Task2_FlatListOptimization.js
│   │   ├── Task3_DebouncedSearch.js
│   │   ├── Task4_ShoppingCart.js
│   │   └── Task5_DataTransformation.js
│   ├── Day2/
│   │   ├── Task6_PullToRefresh.js
│   │   ├── Task7_InfiniteScroll.js
│   │   └── Task8_FormValidation.js
│   └── Day3/
│       └── MockInterview.md
├── PROGRESS.md         ← Track your learning!
├── README.md           ← Full documentation
├── QUICK_START.md      ← This file
└── App.js              ← Main navigation
```

---

## 💻 Practicing From Scratch

### Option 1: Create Practice Files (Recommended)
```bash
# Create a practice folder
mkdir practice

# For each task, create your own version
touch practice/my_task1.js
touch practice/my_task2.js
# etc.
```

Then code each task from scratch in your practice files, using the src/ files as reference.

### Option 2: Comment Out and Rebuild
1. Open a task file (e.g., `Task1_APIFetchWithSearch.js`)
2. Comment out all the code
3. Rebuild it yourself from the brief
4. Compare with the original when done

---

## 🎯 3-Day Study Plan

### **Friday (Day 1) - 5 hours**
- Morning: Tasks 1, 2, 3
- Afternoon: Tasks 4, 5
- Evening: Review and practice weak areas

### **Saturday (Day 2) - 4 hours**
- Morning: Tasks 6, 7, 8
- Afternoon: Mock Interview #1 (90 min)
- Review session

### **Sunday (Day 3) - 3 hours**
- Morning: Mock Interview #2 (90 min)
- Afternoon: Final review and quick drills

### **Monday Morning - Interview Day**
- Light review only (30 min max)
- Test your setup
- Deep breath - you're ready!

---

## ✅ Pre-Practice Checklist

Before you start practicing:
- [ ] Code editor open (VS Code recommended)
- [ ] Terminal ready
- [ ] Browser/simulator running
- [ ] Timer ready
- [ ] PROGRESS.md open to track tasks
- [ ] Quiet environment
- [ ] No distractions

---

## 🔥 Most Important Tips

1. **Always explain out loud** - This is 50% of the interview!
2. **Handle all states** - loading, error, empty, success
3. **Always use keyExtractor** on FlatList
4. **Test as you go** - don't wait until the end
5. **Start simple** - get it working, then optimize

---

## 📞 Troubleshooting

### App won't start?
```bash
# Clear cache and restart
npm start -- --reset-cache
```

### Imports not working?
Make sure you're in the right directory:
```bash
pwd
# Should show: /Users/sandeepamarnath/Desktop/react-native-practice
```

### Task not displaying?
- Check the terminal for errors
- Make sure all imports in App.js are correct
- Try refreshing the browser/simulator

---

## 🎓 Ready to Start?

1. Open `PROGRESS.md` in your editor
2. Start with Task 1: API Fetch with Search
3. Set a timer for 25 minutes
4. Code and talk out loud!
5. Check it off when done

**You've got this!** 💪

---

## 📚 Additional Resources

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [FlatList Performance Guide](https://reactnative.dev/docs/optimizing-flatlist-configuration)
- [Expo Docs](https://docs.expo.dev/)

**Good luck on your TopTal interview!** 🚀
