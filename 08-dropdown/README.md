# Custom Dropdown / Select Component (React Machine Coding)

## Overview
This project implements a **custom dropdown (select) component** in React without using any UI libraries.

Dropdown questions are extremely common in frontend interviews because they test:
- state management
- keyboard interactions
- focus handling
- accessibility (a11y)
- event handling and cleanup

---

## Problem Statement
Build a reusable dropdown component that:

- Opens and closes on click
- Displays a list of options
- Allows selecting an option
- Supports keyboard navigation
- Closes on outside click
- Is accessible to keyboard and screen-reader users

---

## Constraints
- ❌ No UI libraries (MUI, AntD, etc.)
- ❌ No external dropdown packages
- ✅ React only
- ✅ Clean state and side-effect handling

---

## Phase-wise Requirements

### Phase 1: Core Functionality (Must Have)
- Click to open / close dropdown
- Click an option to select it
- Selected value is shown in trigger button
- Dropdown closes after selection

---

### Phase 2: Keyboard Navigation
- `ArrowDown` → move highlight down
- `ArrowUp` → move highlight up
- `Enter` → select highlighted option
- `Escape` → close dropdown

---

### Phase 3: Advanced / Senior-Level
- Close dropdown on outside click
- Manage focus correctly
- Proper ARIA roles for accessibility

---

## Component API

```jsx
<Dropdown
  options={["React", "Vue", "Angular"]}
  value={selectedValue}
  onChange={setSelectedValue}
/>
