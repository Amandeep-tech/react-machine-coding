# Debounced Search (React Machine Coding)

## Problem Statement
Build a **search input** that fetches results from an API **only after the user stops typing for a short delay (debounce)**.

This question is extremely common in **frontend machine-coding interviews** and is often used to test understanding of:
- side effects
- debouncing
- async behavior
- race conditions

---

## Core Requirements (Phase 1)
- Search input field
- Debounce API calls by **500ms**
- Show loading indicator while fetching
- Display results in a list
- Clear results when input is empty

---

## Mock API
Use the following mock API for fetching results:

```js
const fetchUsers = (query) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const users = [
        "Amandeep",
        "Aman",
        "Rohit",
        "Rahul",
        "Ankit",
        "Neha",
        "Nikita",
      ];

      resolve(
        users.filter((name) =>
          name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, 800);
  });
