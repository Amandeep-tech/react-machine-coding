import { useEffect, useRef, useState } from "react";
import "./styles.css";
import FileNode from "./components/FIleNode";

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

export default function App() {
  return <FileNode 
    data={explorerData}
    depth={0}
  />
}
