import { useState } from "react";

const FileNode = ({ data, depth }) => {
  const { name, isFolder, children } = data;
  const [isOpen, setisOpen] = useState(false);

  const handleNameClick = () => {
    if(!isFolder) return;
    setisOpen((prev) => !prev);
  };

  return (
    <div>
        <div
          onClick={handleNameClick}
          className={`name ${isFolder ? "cursor" : ""}`}
        >
          {isFolder ? <span>🗂️ {name}</span> : <span>📝 {name}</span>}
        </div>
        {children?.length > 0 && isOpen && (
          <div className="indent">
            {children.map((child) => (
              <FileNode 
              data={child} 
              key={child.id} 
              depth={depth + 1}
              />
            ))}
          </div>
        )}
    </div>
  );
};

export default FileNode;
