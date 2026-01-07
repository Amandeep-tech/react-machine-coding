# Debounced Search Input (React Machine Coding)

## Overview
This project implements a **search input component** with debounced API calls, result caching, keyboard navigation, accessibility support, and protection against stale async responses.

This is a **very common frontend machine-coding interview question** and is often extended step-by-step to evaluate real-world React and async handling skills.

---

## Problem Statement
Build a search input that:
- Fetches results from an API **only after the user stops typing**
- Avoids unnecessary API calls
- Handles fast typing, clearing input, and async race conditions correctly
- Provides good keyboard and accessibility support

---

## Core Features Implemented

### 1. Debounced API Calls
- API is called **500ms after the user stops typing**
- Prevents API calls on every keystroke
- Implemented using `setTimeout` inside `useEffect`

---

### 2. Stale Response Protection (Race Conditions)
- Each request is tagged with a unique **request ID**
- Only the **latest request** is allowed to update the UI
- Older responses are safely ignored

---

### 3. Caching
- Previously searched queries are cached
- Cache is stored using `useRef` to avoid unnecessary re-renders
- Cached results are returned instantly without debounce delay

---

### 4. Keyboard Navigation
Supports full keyboard interaction:
- `ArrowDown` → Move selection down
- `ArrowUp` → Move selection up
- `Enter` → Select highlighted item
- `Escape` → Clear search and results

---

### 5. Highlight Matched Text
- Highlights the matching part of each result
- Implemented using safe string manipulation (no `dangerouslySetInnerHTML`)
- Case-insensitive matching

---

### 6. Accessibility (a11y)
- Proper labels for inputs
- ARIA roles for listbox behavior
- `aria-selected` for active result
- Keyboard-first interaction supported

---

## Mock API Used

```js
const fetchUsers = (query) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const users = [
        "Amandeep",
        "Aman",
        "Rohit",
        "Roshan",
        "Rahul",
        "Ankit",
        "Neha",
        "Neemaa",
        "Nikita",
        "Nimisha",
      ];

      resolve(
        users.filter((name) =>
          name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, 800);
  });
