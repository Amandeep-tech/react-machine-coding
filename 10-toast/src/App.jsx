import { useState } from "react";
import "./styles.css";

import ToastContainer from "./components/ToastContainer";

export default function App() {
  const [toasts, setToasts] = useState([
    {
      message: "Toast 1",
      id: 1,
    },
  ]);

  const onClose = (id) => {
    console.log(id);
  };

  const addToast = () => {
    setToasts((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        message: "hey toast",
      },
    ]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="app">
      <button className="add_toast" onClick={addToast}>
        Add Toast
      </button>
      <ToastContainer
        toasts={toasts}
        onClose={onClose}
        removeToast={removeToast}
      />
    </div>
  );
}
