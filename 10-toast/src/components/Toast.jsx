import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const Toast = ({ toast, removeToast }) => {
  const { message, type, duration, id } = toast;

  const [time, setTime] = useState(() => duration / 1000);

  const [isLeaving, setIsLeaving] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  // 4 refs we need
  const timeOutRef = useRef(null);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const remainingTimeRef = useRef(duration);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  useEffect(() => {
    startTimer();

    return () => {
      clearTimeout(timeOutRef.current);
      clearInterval(intervalRef.current);
    };
  }, []);

  const startTimer = () => {
    startTimeRef.current = Date.now();

    timeOutRef.current = setTimeout(() => {
      startExit();
    }, remainingTimeRef.current);

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
  };

  const pauseTimer = () => {
    clearTimeout(timeOutRef.current);
    clearInterval(intervalRef.current);
    // also calculate how much time is remaining
    const elapsed = Date.now() - startTimeRef.current;
    remainingTimeRef.current -= elapsed;
  };

  const startExit = () => {
    setIsLeaving(true);
  };

  const handleToast = () => {
    if (isLeaving) {
      removeToast(id);
    }
  };

  return (
    <div
      className={`toast ${type} ${isLeaving ? "leave" : ""} ${
        isVisible ? "enter" : ""
      }`}
      onTransitionEnd={handleToast}
      onMouseEnter={pauseTimer}
      onMouseLeave={startTimer}
    >
      <div>{message}</div>
      <span className="time">{time}s</span>
      <button onClick={() => removeToast(id)} className="cross">
        x
      </button>
    </div>
  );
};

export default Toast;
