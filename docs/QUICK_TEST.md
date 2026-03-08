# ⚡ 5-Minute Quick Test

**Run before every commit**

---

## ✅ Critical Path Test

### 1. Login (30 sec)
```
→ Open app
→ Enter: test@test.com / password
→ Tap Login
✓ Should navigate to Home
```

### 2. Navigation (30 sec)
```
→ Tap Expenses tab
→ Tap Profile tab
→ Tap Settings tab
→ Tap Home tab
✓ All tabs should work
```

### 3. Add Data (1 min)
```
→ Go to Expenses
→ Add amount: 50
→ Add description: "Test"
→ Tap Add
✓ Should show in list
```

### 4. Theme Toggle (30 sec)
```
→ Go to Settings
→ Tap Toggle Theme
✓ Should switch dark/light
```

### 5. Logout (30 sec)
```
→ Go to Settings
→ Tap Logout → Confirm
✓ Should return to Login
```

### 6. Persistence (30 sec)
```
→ Close app completely
→ Reopen app
✓ Should still be logged out
```

### 7. Re-login (30 sec)
```
→ Login again
→ Check Expenses tab
✓ Data should persist
```

---

## 🎯 Pass/Fail

If ALL 7 tests pass → ✅ **SAFE TO MERGE**

If ANY test fails → ❌ **FIX BEFORE MERGE**

---

**Time:** ~5 minutes  
**Frequency:** Before every commit  
**Automation:** Future goal
