# Calendar / Event Scheduler (React Machine Coding)

## Overview
This project implements a **single-day Calendar / Event Scheduler**, similar to a simplified Google Calendar.

It is a **commonly asked frontend machine-coding interview question**, especially for mid-level and senior roles, because it tests:
- time-based state modeling
- validation logic (overlapping events)
- clean separation of UI and business logic
- edge-case handling under ambiguity

---

## Problem Statement
Build a **daily calendar** that allows users to:

- View events for a single day
- Add new events with:
  - title
  - start time
  - end time
- Prevent **overlapping events**

---

## Simplifications (Interview Assumptions)

To keep the problem focused and interview-friendly:

- Single day only (no dates)
- Time is represented in **minutes**
- No drag & drop initially
- No recurring events
- No backend

---

## Data Model

```js
const initialEvents = [
  {
    id: "1",
    title: "Standup",
    start: 540, // 9:00 AM
    end: 570,   // 9:30 AM
  },
  {
    id: "2",
    title: "Design Review",
    start: 600, // 10:00 AM
    end: 660,   // 11:00 AM
  },
];
