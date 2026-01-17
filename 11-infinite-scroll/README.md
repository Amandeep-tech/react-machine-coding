# Infinite Scroll / Paginated List (Machine Coding)

## 📌 Problem Statement

Build an **Infinite Scroll List** in React that loads data page-by-page as the user scrolls down.

The goal is to demonstrate:

* Proper state management
* Handling async data fetching
* Performance optimizations
* Clean React mental model

---

## 🎯 Requirements

### Core Functionality

* Fetch data from a paginated API
* Render items in a list
* Automatically load more data when the user reaches the bottom
* Append new items without replacing existing ones

### UI / UX

* Show a loading indicator while fetching
* Disable multiple parallel API calls
* Stop fetching when no more data is available

---

## 🧩 Constraints

* No external libraries (pure React)
* Use functional components and hooks
* Follow immutable state updates
* Code should be readable and interview-friendly

---

## 🪜 Phases (Interview Flow)

### Phase 1 – Basic List

* Fetch initial data on mount
* Render items in a vertical list

### Phase 2 – Infinite Scroll

* Detect when user scrolls near bottom
* Fetch next page automatically
* Append results

### Phase 3 – Edge Cases

* Prevent duplicate requests
* Handle fast scrolling
* Handle empty response (no more data)

### Phase 4 – Performance

* Avoid expensive scroll handlers
* Use `IntersectionObserver` (preferred)
* Prevent unnecessary re-renders

### Phase 5 – Polish

* Loading skeleton
* Error state + retry
* Accessibility considerations

---

## 🧠 Key Concepts Evaluated

* `useEffect` lifecycle handling
* Immutable state updates
* Async request coordination
* Stale response prevention
* Performance optimization
* UX edge-case handling

---

## 🧪 Example Fake API

```js
const fetchItems = (page) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const items = Array.from({ length: 10 }, (_, i) => ({
        id: page * 10 + i,
        text: `Item ${page * 10 + i}`,
      }));
      resolve(items);
    }, 1000);
  });
```

---

## 🧠 Interviewer Follow-Up Questions

* How do you prevent multiple API calls?
* Why not use scroll event directly?
* How would you handle very large lists?
* How would you cancel in-flight requests?
* How would you add virtualization?

---

## ✅ Expected Outcome

A performant, scalable infinite scrolling list implemented using **React best practices**, suitable for real-world applications and frontend interviews.

---

## 🚀 Possible Enhancements

* Virtualized list (react-window)
* Pull-to-refresh
* Prefetch next page
* Server-side pagination

---

**Author:** Amandeep
**Topic:** React Machine Coding
**Level:** Intermediate → Advanced
