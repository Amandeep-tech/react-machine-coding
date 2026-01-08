# Kanban Board (React Machine Coding)

## Overview
This project implements a **Kanban Board** similar to Trello or Jira with multiple columns and movable cards.

It is a **very common frontend machine-coding interview question** used to evaluate:
- state modeling
- immutable updates
- component design
- inter-column coordination
- real-world UI thinking

---

## Problem Statement
Build a **Kanban Board** with multiple columns where users can:

- View cards grouped by status
- Add new cards to a column
- Delete cards
- Move cards between columns
- Persist board state across refreshes
- (Bonus) Drag and drop cards

---

## Initial Data Model

```js
const initialBoard = {
  todo: {
    title: "Todo",
    items: [
      { id: "1", text: "Learn React" },
      { id: "2", text: "Practice Machine Coding" },
    ],
  },
  inProgress: {
    title: "In Progress",
    items: [
      { id: "3", text: "Build File Explorer" },
    ],
  },
  done: {
    title: "Done",
    items: [
      { id: "4", text: "Revise JS Basics" },
    ],
  },
};
