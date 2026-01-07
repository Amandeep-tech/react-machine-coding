import { useState } from "react";

const FileNode = ({ data, depth, onAdd, renameNodeName, onDelete, focusedId, expandedMap, setExpandedMap }) => {
  const { name, isFolder, children, id } = data || {};

  const [folderName, setFolderName] = useState("");
  const [isAddingFolder, setisAddingFolder] = useState(true);
  const [isAddingFile, setIsAddingFile] = useState(true);
  const [fileName, setFileName] = useState("");

  const [isRenaming, setIsRenaming] = useState(true);
  const [lastestName, setLatestName] = useState("");

  const [showDeleteBtn, setShowDeleteBtn] = useState(true);

  const handleNameClick = () => {
    if (!isFolder) return;
    setExpandedMap(prev => ({
      ...prev,
      [id]: !prev[id],
    }))
  };

  const handleInput = (e) => {
    setFolderName(e.target.value);
  };

  const handleFileInput = (e) => {
    setFileName(e.target.value);
  };

  const handleKeyDown = (e) => {
    const key = e.key;
    const value = e.target.value;
    if (key === "Escape") {
      setFolderName("");
      setisAddingFolder(true);
      return;
    }

    if (key === "Enter" && value.trim() !== "") {
      onAdd(value, id, false);
      setFolderName("");
      setisAddingFolder(true);
      setExpandedMap(prev => ({
        ...prev,
        [id]: true,
      }))
    }
  };

  const handleFileInputKeyDown = (e) => {
    const key = e.key;
    const value = e.target.value;
    if (key === "Escape") {
      setFileName("");
      setIsAddingFile(true);
      return;
    }

    if (key === "Enter" && value.trim() !== "") {
      onAdd(value, id, true);
      setFileName("");
      setIsAddingFile(true);
      setExpandedMap(prev => ({
        ...prev,
        [id]: true,
      }))
    }
  };

  const onPlusFolderClick = () => {
    setisAddingFolder(false);
  };

  const onPlusFileClick = () => {
    setIsAddingFile(false);
  };

  const handleCloseInput = () => {
    setisAddingFolder(true);
  };

  const handleCloseInputForFile = () => {
    setIsAddingFile(true);
  };

  const handleRename = () => {
    setIsRenaming(false);
    setLatestName(name);
  };

  const handleKeyDownForRename = (e) => {
    console.log(lastestName);
    const key = e.key;
    if(key === "Escape") {
      // cleanup
      setLatestName("");
      setIsRenaming(true); // to show button again
    }
    if (key === "Enter") {
      renameNodeName(lastestName, id);
      // cleanup
      setLatestName("");
      setIsRenaming(true); // to show button again
    }
  };

  const handleDelete = () => {
    onDelete(id)
  }

  const handleKeyDownGlobal = (e) => {
    const key = e.key;
    switch(key) {
      case "ArrowDown":

    }
  }

  return (
    <div className="fileNode"
      aria-selected={focusedId === id}
      aria-level={depth}
      aria-expanded={isFolder ? expandedMap[id] : undefined}
      role="treeitem"
      onKeyDown={handleKeyDownGlobal}
    >
      <div className="row">
        <div
          onClick={handleNameClick}
          className={`name ${isFolder ? "cursor" : ""}`}
        >
          {isFolder ? <span>🗂️ {name}</span> : <span>📝 {name}</span>}
        </div>
        <div>
          {isFolder ? (
            <>
              {isAddingFolder && (
                <button onClick={onPlusFolderClick}>+ folder</button>
              )}
              {!isAddingFolder && (
                <span>
                  <input
                    type="text"
                    autoFocus
                    value={folderName}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                  />{" "}
                  <span className="cross" onClick={handleCloseInput}>
                    X
                  </span>
                </span>
              )}

              {isAddingFile && (
                <button onClick={onPlusFileClick}>+ file</button>
              )}
              {!isAddingFile && (
                <span>
                  <input
                    type="text"
                    autoFocus
                    value={fileName}
                    onChange={handleFileInput}
                    onKeyDown={handleFileInputKeyDown}
                  />{" "}
                  <span className="cross" onClick={handleCloseInputForFile}>
                    X
                  </span>
                </span>
              )}
            </>
          ) : null}
          {isRenaming && <button onClick={handleRename}>Rename</button>}
          {!isRenaming && (
            <input
              type="text"
              autoFocus
              value={lastestName}
              onChange={(e) => {
                setLatestName(e.target.value);
              }}
              onKeyDown={handleKeyDownForRename}
            />
          )}
          { id !== "root" && 
            showDeleteBtn && <button onClick={handleDelete}>Delete</button>
          }
        </div>
      </div>
      {children?.length > 0 && expandedMap[id] && (
        <div className="indent">
          {children.map((child) => (
            <FileNode
              data={child}
              key={child.id}
              depth={depth + 1}
              onAdd={onAdd}
              renameNodeName={renameNodeName}
              onDelete={onDelete}
              expandedMap={expandedMap}
              setExpandedMap={setExpandedMap}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileNode;
