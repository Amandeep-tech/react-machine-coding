# Modal / Dialog Component (React Machine Coding)

## Overview
This project implements a **reusable Modal (Dialog) component** in React.

Modal questions are commonly asked in frontend interviews because they test:
- controlled component patterns
- keyboard handling
- accessibility (a11y)
- side-effect management
- clean component APIs

---

## Problem Statement
Build a Modal component that:

- Can be opened and closed
- Closes when:
  - clicking on backdrop
  - pressing Escape
  - clicking close button
- Prevents background interaction
- Traps focus inside the modal
- Restores focus to the trigger on close

---

## Constraints
- No UI libraries
- No external focus-trap packages
- React only
- Clean side-effect handling

---

## Phase-wise Requirements

### Phase 1 (Must Have)
- Open / close modal
- Escape key closes modal
- Backdrop click closes modal

### Phase 2 (Common Follow-ups)
- Focus moves into modal on open
- Tab key cycles within modal
- Focus returns to trigger on close

### Phase 3 (Senior-Level)
- Render modal using React Portal
- Prevent background scroll
- Proper ARIA roles

---

## Component Structure

```txt
src/
├── App.jsx       // controls modal visibility
├── Modal.jsx     // modal implementation
└── styles.css
