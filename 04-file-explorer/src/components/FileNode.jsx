import { useState } from "react";

const FileNode = ({ data, depth, onAdd, renameNodeName }) => {
  const { name, isFolder, children, id } = data || {};
  const [isOpen, setisOpen] = useState(false);

  const [folderName, setFolderName] = useState("");
  const [isAddingFolder, setisAddingFolder] = useState(true);
  const [isAddingFile, setIsAddingFile] = useState(true);
  const [fileName, setFileName] = useState("");

  const [isRenaming, setIsRenaming] = useState(true);
  const [lastestName, setLatestName] = useState("");

  const handleNameClick = () => {
    if (!isFolder) return;
    setisOpen((prev) => !prev);
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
      setisOpen(true);
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
      setisOpen(true);
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

  return (
    <div className="fileNode">
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
        </div>
      </div>
      {children?.length > 0 && isOpen && (
        <div className="indent">
          {children.map((child) => (
            <FileNode
              data={child}
              key={child.id}
              depth={depth + 1}
              onAddFolder={onAdd}
              renameNodeName={renameNodeName}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileNode;
