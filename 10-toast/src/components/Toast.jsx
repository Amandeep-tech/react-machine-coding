import React from "react";

const Toast = ({ toast, removeToast }) => {
  const { message } = toast;
  return (
    <div className="toast">
      <div>{message}</div>
      <button onClick={() => removeToast(toast.id)} className="cross">x</button>
    </div>
  );
};

export default Toast;
