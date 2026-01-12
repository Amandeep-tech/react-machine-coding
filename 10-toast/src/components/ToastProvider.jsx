import React from "react";
import { createContext } from "react";
import ToastContainer from "./ToastContainer";
import { useState } from "react";
import { useContext } from "react";

const ToastContext = createContext(null);

export const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = ({ message, type = "info", duration = 3000 }) => {
    setToasts((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        message,
        type,
        duration,
      },
    ]);
  };

  const onClose = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{showToast}}>
      {children}
      <ToastContainer toasts={toasts} removeToast={onClose} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
