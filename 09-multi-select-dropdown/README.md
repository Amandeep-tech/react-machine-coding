# Multi-Select Dropdown (React Machine Coding)

## Overview
This project implements a **custom multi-select dropdown component** in React without using any external UI libraries.

Multi-select dropdowns are commonly asked in frontend interviews because they build upon:
- basic dropdown logic
- state immutability
- keyboard navigation
- accessibility
- UX decision-making

---

## Problem Statement
Build a reusable **multi-select dropdown** component that:

- Allows selecting **multiple options**
- Allows unselecting already selected options
- Displays selected options in the trigger
- Keeps dropdown open while selecting
- Supports keyboard navigation
- Closes on outside click
- Follows accessibility best practices

---

## Constraints
- ❌ No UI libraries (MUI, AntD, etc.)
- ❌ No external dropdown packages
- ✅ React only
- ✅ Clean and immutable state updates

---

## Phase-wise Requirements

### Phase 1: Core Functionality (Must Have)
- Dropdown opens and closes on click
- Options can be selected and unselected
- Selected values are stored as an array
- Dropdown does NOT close on selection

---

### Phase 2: Keyboard Support
- `ArrowDown` / `ArrowUp` to navigate options
- `Enter` to toggle selection
- `Escape` to close dropdown
- Highlight active option during navigation

---

### Phase 3: UX & Accessibility
- Close dropdown on outside click
- Proper ARIA roles:
  - `role="listbox"`
  - `role="option"`
  - `aria-selected`
- Trigger reflects expanded state
- Decorative icons hidden from screen readers

---

## Component API

```jsx
<Dropdown
  options={["Aman", "Pankaj", "Deep", "Rahul"]}
  selectedValues={selectedValues}
  onChange={setSelectedValues}
/>
