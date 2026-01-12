import React from "react";
import { useEffect } from "react";

const Toast = ({ toast, removeToast }) => {
  const { message } = toast;

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);
  return (
    <div className="toast">
      <div>{message}</div>
      <button onClick={() => removeToast(toast.id)} className="cross">
        x
      </button>
    </div>
  );
};

export default Toast;
