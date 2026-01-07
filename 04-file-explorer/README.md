# File Explorer (React Machine Coding)

## Overview
This project implements a **File Explorer / Tree View UI** similar to VS Code or Google Drive.

It is a **very common frontend machine-coding interview question** used to evaluate:
- recursive component design
- state management for nested data
- expand/collapse behavior
- performance and UX thinking

---

## Problem Statement
Build a **File Explorer** that can display a nested folder structure with files and folders.

The UI should:
- Render folders and files hierarchically
- Allow expanding and collapsing folders
- Indent items based on depth
- Visually differentiate files and folders

---

## Data Structure (Provided)

Use the following data structure **as-is**:

```js
const explorerData = {
  id: "root",
  name: "root",
  isFolder: true,
  children: [
    {
      id: "1",
      name: "public",
      isFolder: true,
      children: [
        {
          id: "2",
          name: "index.html",
          isFolder: false,
        },
      ],
    },
    {
      id: "3",
      name: "src",
      isFolder: true,
      children: [
        {
          id: "4",
          name: "components",
          isFolder: true,
          children: [
            {
              id: "5",
              name: "Button.jsx",
              isFolder: false,
            },
          ],
        },
        {
          id: "6",
          name: "App.jsx",
          isFolder: false,
        },
      ],
    },
    {
      id: "7",
      name: "package.json",
      isFolder: false,
    },
  ],
};
