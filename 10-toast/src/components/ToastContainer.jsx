import React from "react";
import Toast from "./Toast";

const ToastContainer = ({ toasts, onClose, removeToast }) => {
  return (
    <div className="toast_container">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;
