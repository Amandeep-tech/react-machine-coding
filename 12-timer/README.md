# Counter

## Problem Statement
Build a counter application with increment, decrement and reset functionality.

## Requirements
- Increment count
- Decrement count
- Reset count to zero

## Concepts Tested
- useState
- Event handling
- Functional state updates
- Component re-rendering

## Approach
- Used `useState` to manage counter value
- Used functional updates to avoid stale state issues
- Kept component minimal and readable

## Edge Cases
- Multiple rapid clicks
- Reset at any count value

## Possible Follow-up Questions
- How would you prevent negative values?
- How would you persist count on refresh?
- How would you optimize re-renders?

## Improvements
- Disable decrement below zero
- Persist value in localStorage
- Add keyboard support

## How to Run
```bash
npm install
npm run dev
