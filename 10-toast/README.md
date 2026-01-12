# Toast / Notification System (React Machine Coding)

## Overview
Implement a reusable **Toast Notification System** in React without using any third-party libraries.

Toasts are temporary messages used to notify users about actions, errors, or system events.

This question is frequently asked in frontend interviews to test:
- state management
- timers and cleanup
- portals
- component architecture

---

## Requirements

### Phase 1: Core Functionality
- Display toast notifications
- Allow multiple toasts at the same time
- Each toast has a close button
- Toasts stack vertically

### Phase 2: Auto Dismiss
- Toast disappears automatically after a timeout
- Timeout is configurable per toast
- Cleanup timers on unmount
- No memory leaks

### Phase 3: Architecture & UX
- Render toasts using React Portal
- Provide a global `showToast()` API
- Support toast types:
  - success
  - error
  - info
- Animate toast entry/exit (optional)

---

## Constraints
- ❌ No external toast libraries
- ❌ No state management libraries
- ✅ React only
- ✅ Clean and immutable state updates

---

## Expected API (Final)

```js
showToast({
  message: "Saved successfully",
  type: "success",
  duration: 3000,
});
