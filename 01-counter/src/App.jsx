import { useState } from "react";
import "./styles.css";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <div className="container">
        <h1>Counter</h1>

        <p className="count">{count}</p>

        <div className="actions">
          <button onClick={() => setCount((c) => c - 1)}>-</button>
          <button onClick={() => setCount((c) => c + 1)}>+</button>
          <button onClick={() => setCount(0)}>Reset</button>
        </div>
      </div>
    </div>
  );
}
