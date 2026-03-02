import { useCallback, useEffect, useRef, useState } from "react";
import "./styles.css";

// It is recommended to use functional state updates
// so that your closure always gets updated state value

// Edge Cases
// 1. Multiple rapid clicks ?
// disable button for few ms or use debounce (2 approaches here to handle rapid clicks)


// How would you prevent negative values?
// 1. Disable the dec button when count reaches 0
// 2. use Math.max(0, c - 1)

// How would you persist count on refresh?
// 1. use localStorage :)
// 2. lazy initialise the state so that it is not executed on every render
// don't know but this persist thing is not working yaar :(

// How would you optimize re-renders?
// Optimisation for such small component do not make any huge impact though
// but we could memoise our event handlers so that their NEW references do not get created on
// every render

export default function App() {
  const [count, setCount] = useState(() => {
    const savedVal = localStorage.getItem("count");
    return savedVal !== null ? Number(savedVal) : 0;
  });
  const [disabled, setDisabled] = useState(false);

  const timerRef = useRef(null);

  console.log("count", count);

  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);

  
  const increment = useCallback(() => {
    // disable button for 2 sec to avoid rapid click
    // setDisabled(true);
    // setCount(count => count + 1);
    // setTimeout(() => {
    //   setDisabled(false);
    // }, [2000]);

    // use debounce
    if(timerRef.current) return;

    setDisabled(true);
    timerRef.current = setTimeout(() => {
      setCount(count => count + 1);
      setDisabled(false);
      timerRef.current = null;
    }, 100);
  }, []);

  const decrement = useCallback(() => {
    // disable button for 2 sec to avoid rapid click
    // setDisabled(true);
    // setCount(count => count - 1);
    // setTimeout(() => {
    //   setDisabled(false);
    // }, [2000]);

    // use debounce
    if(timerRef.current) return;

    setDisabled(true);
    timerRef.current = setTimeout(() => {
      // prevent negative values
      setCount(count => Math.max(0, count - 1));
      setDisabled(false);
      timerRef.current = null;
    }, 100);
  }, []);

  const reset = useCallback(() => {
    setCount(0);
    timerRef.current = null;
  }, [])

  // keyboard support to improve accessibility
  useEffect(() => {
    const handler = (e) => {
      if(e.key === "ArrowUp") increment();
      else if(e.key === "ArrowDown") decrement();
      else if(e.key === "r") reset();
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="app">
      <div className="container">
        <h1>Counter</h1>

        <p className="count">{count}</p>

        <div className="actions">
          <button disabled={disabled} onClick={increment}>+</button>
          <button disabled={disabled} onClick={decrement}>-</button>
          <button onClick={reset}>Reset</button>
        </div>
      </div>
    </div>
  );
}
