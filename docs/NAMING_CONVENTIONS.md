# 📛 Naming Conventions Guide

**Consistency is key to maintainability!**

---

## 📁 Files & Folders

### Components
```
✅ Button.js
✅ LoginForm.js
✅ UserProfileCard.js

❌ button.js
❌ login-form.js
❌ user_profile_card.js
```
**Rule:** PascalCase, descriptive nouns

### Screens
```
✅ HomeScreen.js
✅ ProfileScreen.js
✅ SettingsScreen.js

❌ Home.js
❌ profile-screen.js
```
**Rule:** PascalCase + "Screen" suffix

### Hooks
```
✅ useAsync.js
✅ useForm.js
✅ useKeyboard.js

❌ AsyncHook.js
❌ form-hook.js
```
**Rule:** camelCase + "use" prefix

### Services
```
✅ authService.js
✅ apiClient.js
✅ storageService.js

❌ AuthService.js
❌ api-client.js
```
**Rule:** camelCase + descriptive name

### Utils
```
✅ validation.js
✅ formatting.js
✅ dateHelpers.js

❌ Validation.js
❌ format-helper.js
```
**Rule:** camelCase, descriptive

### Constants
```
✅ colors.js
✅ typography.js
✅ config.js

❌ Colors.js
❌ TYPOGRAPHY.js
```
**Rule:** camelCase for files, UPPER_SNAKE_CASE for exports

---

## 💻 Variables & Functions

### Variables
```javascript
✅ const userId = 123;
✅ const isAuthenticated = true;
✅ const userProfile = {};
✅ const hasPermission = false;

❌ const user_id = 123;
❌ const auth = true;
❌ const UP = {};
```
**Rule:** camelCase, descriptive, boolean with is/has prefix

### Functions
```javascript
✅ function handleSubmit() {}
✅ const getUserData = async () => {};
✅ const validateEmail = (email) => {};

❌ function Submit() {}
❌ const get_user = () => {};
❌ const ValidateEmail = () => {};
```
**Rule:** camelCase, verb-first for actions

### Event Handlers
```javascript
✅ const handlePress = () => {};
✅ const handleChange = (text) => {};
✅ const handleSubmit = async () => {};

❌ const press = () => {};
❌ const onChange = () => {}; // Too generic
```
**Rule:** "handle" + EventName

### API Functions
```javascript
✅ const fetchUserProfile = async () => {};
✅ const createPost = async (data) => {};
✅ const deleteComment = async (id) => {};

❌ const getUser = () => {}; // get vs fetch?
❌ const post = () => {}; // Unclear
```
**Rule:** Verb + Noun, use fetch/create/update/delete consistently

---

## 🎨 React Components

### Props
```javascript
✅ <Button title="Submit" onPress={handlePress} isLoading={false} />

❌ <Button text="Submit" onClick={handlePress} loading={false} />
```
**Rule:** Consistent prop names across all components
- title/text (pick one!)
- onPress (React Native convention)
- isLoading/loading (pick one!)

### Component State
```javascript
✅ const [isLoading, setIsLoading] = useState(false);
✅ const [userData, setUserData] = useState(null);
✅ const [errors, setErrors] = useState({});

❌ const [loading, setLoading] = useState(false);
❌ const [data, setData] = useState(null); // Too generic
```
**Rule:** Descriptive state names, boolean with is/has prefix

---

## 📦 Exports & Imports

### Named Exports (Preferred)
```javascript
// ✅ components/base/index.js
export { default as Button } from './Button';
export { default as Input } from './Input';

// Usage
import { Button, Input } from '@/components/base';
```

### Default Exports (Screens)
```javascript
// ✅ screens/Home/HomeScreen.js
export default function HomeScreen() {}

// Usage
import HomeScreen from '@/screens/Home/HomeScreen';
```

---

## 🎯 Constants
```javascript
// ✅ constants/config.js
export const API_BASE_URL = 'https://api.example.com';
export const MAX_RETRY_ATTEMPTS = 3;
export const DEFAULT_TIMEOUT_MS = 10000;

// ✅ constants/colors.js
export const COLORS = {
  PRIMARY: '#007AFF',
  SECONDARY: '#5856D6',
};

❌ export const apiUrl = 'https://api.example.com';
❌ export const MaxRetries = 3;
```
**Rule:** UPPER_SNAKE_CASE for primitive constants, PascalCase for objects

---

## 🗂️ Folder Naming
```
✅ src/components/base/
✅ src/screens/Auth/
✅ src/services/api/

❌ src/Components/Base/
❌ src/Screens/auth/
❌ src/Services/API/
```
**Rule:** lowercase, descriptive

---

## 📝 Comments & Documentation

### Component Documentation
```javascript
/**
 * Button Component
 * 
 * A reusable button with multiple variants
 * 
 * @param {string} title - Button text
 * @param {function} onPress - Press handler
 * @param {string} variant - 'primary' | 'secondary' | 'danger'
 * @param {boolean} isLoading - Shows loading spinner
 * 
 * @example
 * <Button 
 *   title="Submit" 
 *   onPress={handleSubmit} 
 *   variant="primary"
 *   isLoading={false}
 * />
 */
export function Button({ title, onPress, variant = 'primary', isLoading }) {
  // ...
}
```

### Inline Comments
```javascript
✅ // Fetch user data on mount
✅ // TODO: Add error retry logic
✅ // FIXME: Race condition on rapid clicks

❌ // This is a function
❌ // Loop
```
**Rule:** Explain WHY, not WHAT. Code should be self-documenting.

---

## 🎨 Style Names
```javascript
const styles = StyleSheet.create({
  ✅ container: {},
  ✅ headerTitle: {},
  ✅ primaryButton: {},
  ✅ errorText: {},

  ❌ Container: {},
  ❌ header_title: {},
  ❌ btn1: {},
});
```
**Rule:** camelCase, descriptive

---

## 🔢 Magic Numbers & Strings
```javascript
❌ BAD
setTimeout(() => {}, 3000);
if (user.role === 'admin') {}

✅ GOOD
const ANIMATION_DURATION_MS = 3000;
setTimeout(() => {}, ANIMATION_DURATION_MS);

const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};
if (user.role === USER_ROLES.ADMIN) {}
```

---

## ✅ Quick Reference

| Type | Convention | Example |
|------|-----------|---------|
| Component | PascalCase | `Button.js` |
| Screen | PascalCase + Screen | `HomeScreen.js` |
| Hook | camelCase + use | `useAsync.js` |
| Service | camelCase + Service | `authService.js` |
| Util | camelCase | `validation.js` |
| Constant File | camelCase | `colors.js` |
| Constant Export | UPPER_SNAKE_CASE | `API_URL` |
| Variable | camelCase | `userId` |
| Function | camelCase (verb first) | `handleSubmit` |
| Boolean | is/has prefix | `isLoading` |
| Event Handler | handle prefix | `handlePress` |

---

**Remember:** Consistency > Perfection

Pick a convention and stick to it across the entire codebase!
