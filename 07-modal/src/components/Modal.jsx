import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ onClose, children }) => {
  const closeBtnRef = useRef(null);

  const modalContaineRef = useRef(null);

  const previouslyFocusedEle = useRef(null);

  useEffect(() => {
    // save previous focused element
    previouslyFocusedEle.current = document.activeElement;
    console.log("previouslyFocusedEle", previouslyFocusedEle);

    // for some reason  'previouslyFocusedEle' is not working as expected.
    // I expect the 'open modal' btn to be as previouslyFocusedEle but closeBtnRef
    // is getting stored in previouslyFocusedEle :(

    if (closeBtnRef.current) {
      closeBtnRef.current?.focus();
    }
    return () => {
      // focus the previously focused element
      previouslyFocusedEle.current?.focus();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab") return;

      const focusableElements = modalContaineRef.current.querySelectorAll(
        "button, input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );

      if (!focusableElements.length) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return createPortal(
    <div className="modal">
      <div className="backdrop" onClick={onClose} />
      <div className="modal_container" ref={modalContaineRef}>
        <button ref={closeBtnRef} className="close_btn" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal_root")
  );
};

export default Modal;
