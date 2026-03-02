# 🔎 Autocomplete / Typeahead Component (Machine Coding)

## 📌 Problem Statement

Build an **Autocomplete (Typeahead) component** that:

- Takes user input
- Fetches matching suggestions (mock API or real API)
- Displays results in a dropdown
- Supports keyboard navigation
- Handles loading & error states
- Avoids race conditions
- Implements debouncing
- Optionally supports caching

---

## 🎯 Functional Requirements

### Phase 1 – Basic Functionality
- Input field
- Fetch suggestions on typing
- Display results in dropdown
- Click to select suggestion

---

### Phase 2 – UX Improvements
- Show loading state
- Handle empty results
- Close dropdown on outside click
- Clear results on empty query

---

### Phase 3 – Performance
- Debounce API calls
- Prevent race conditions (ignore stale responses)
- Cache previous results
- Avoid unnecessary re-renders

---

### Phase 4 – Keyboard Support
- ArrowDown → move selection down
- ArrowUp → move selection up
- Enter → select active suggestion
- Escape → close dropdown
- Highlight active suggestion

---

### Phase 5 – Edge Cases
- Rapid typing
- Slow network
- Empty input
- Duplicate queries
- Same result returned multiple times
- Component unmount while request in flight

---

## 🧠 Interview Concepts Tested

- Controlled input
- useEffect
- Debouncing
- useRef
- Race condition handling
- Stale closures
- Memoization
- Caching strategy
- Keyboard accessibility
- ARIA roles
- Performance optimization

---

## 📦 Suggested Component Structure

```
Autocomplete/
│
├── Autocomplete.jsx
├── SuggestionsList.jsx
├── useDebounce.js (optional)
└── styles.css
```

---

## 🏗 Suggested State

- `query`
- `results`
- `loading`
- `error`
- `activeIndex`
- `open`
- `cacheRef`
- `requestIdRef`

---

## 🚀 Bonus Features (Advanced Round)

- Highlight matching text
- Minimum character limit
- Show recent searches
- Virtualized list for large datasets
- Accessibility roles (`role="listbox"`, `role="option"`)
- AbortController support
- Server-side pagination
- Infinite scroll suggestions
- Custom render option

---

## 🧪 Mock API Example

```js
https://dummyjson.com/recipes/search?q=${query}
```

---

## 🧩 Expected Behavior

Typing:
```
a
```

Should:
- Show loading
- Fetch results
- Display suggestions
- Allow keyboard navigation
- Close on Escape
- Ignore stale requests

---

## ⚠️ Common Mistakes

- Not handling race conditions
- Not debouncing
- Updating state after unmount
- Not handling empty query
- Not closing dropdown on outside click
- Using index as key improperly
- Forgetting cleanup in useEffect

---

## 🏁 Evaluation Criteria

- Clean state management
- Immutability
- Performance awareness
- Accessibility
- Code structure
- Edge case handling
- Clear separation of concerns

---

## 💬 Typical Interview Follow-ups

- How would you handle 10,000 suggestions?
- How would you cancel in-flight requests?
- How would you optimize for slow network?
- How would you make this accessible?
- How would you test this component?
- How would you reuse this component in multiple places?

---

## ⏱ Estimated Time

- Basic: 20–30 minutes
- With optimizations: 45–60 minutes

---

## 🧠 Goal

Not just to make it work.

But to make it:
- Performant
- Resilient
- Accessible
- Production-ready