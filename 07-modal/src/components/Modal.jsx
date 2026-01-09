import React, { useEffect } from "react";

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      if (key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
  return (
    <div className="modal">
      <div className="backdrop" onClick={onClose} />
      <div className="modal_container">
        <button className="close_btn" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
