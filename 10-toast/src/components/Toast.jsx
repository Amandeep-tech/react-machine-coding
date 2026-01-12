import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Toast = ({ toast, removeToast }) => {
  const { message, type, duration, id } = toast;

  const [time, setTime] = useState(() => duration / 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, duration);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`toast ${type}`}>
      <div>{message}</div>
      <span className="time">{time}s</span>
      <button onClick={() => removeToast(id)} className="cross">
        x
      </button>
    </div>
  );
};

export default Toast;
