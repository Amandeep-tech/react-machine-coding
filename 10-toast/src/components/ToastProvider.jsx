import { createContext } from "react";
import ToastContainer from "./ToastContainer";
import { useState } from "react";
import { useContext } from "react";

const ToastContext = createContext(null);

export const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
  const MAX_TOASTS = 3;
  const [toasts, setToasts] = useState([]);
  const [direction, setDirection] = useState('');

  const visibleToasts = toasts.slice(0, MAX_TOASTS);
  const queuedToasts = toasts.slice(MAX_TOASTS);

  const showToast = ({ message, type = "info", duration = 3000, direction }) => {
    if(direction) setDirection(direction);
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
      <ToastContainer toasts={visibleToasts} removeToast={onClose} direction={direction} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
