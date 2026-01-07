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
  const [treeData, setTreeData] = useState(() => explorerData);

  const addNew = (node, name, id, isFile = false) => {

    if (node.id === id && name) {
      return {
        ...node,
        children: [
          ...(node.children || []),
          {
            id: crypto.randomUUID(),
            name: name,
            isFolder: isFile ? false:  true,
            children: [],
          },
        ],
      };
    }

    if(!node.children) return node;

    // map over node's children to find that 'id'
    return {
      ...node,
      children: node.children.map((child) => addNew(child, name, id, isFile))
    }
  };

  const onAdd = (folderName, id, isFile) => {
    setTreeData((prevTree) => addNew(prevTree, folderName, id, isFile));
  };

  const rename = (node, lastestName, id) => {
    if(node.id === id) {
      return {
        ...node,
        name: lastestName || node.name
      }
    }
    return {
      ...node,
      children: node.children?.map(child => rename(child, lastestName, id))
    }
  }

  const renameNodeName = (lastestName, id) => {
    setTreeData(prevTree => rename(prevTree, lastestName, id))
  }

  return <FileNode data={treeData} depth={0} onAdd={onAdd} renameNodeName={renameNodeName} />;
}
