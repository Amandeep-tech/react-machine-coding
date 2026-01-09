import { useState } from "react";
import "./styles.css";
import Modal from "./components/Modal";

export default function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {showModal ? (
        <Modal onClose={() => setShowModal(false)}>
          <h2>Hello Modal</h2>
          <p>This is modal content</p>
        </Modal>
      ) : (
        <button onClick={() => setShowModal(true)}>Open Modal</button>
      )}
    </div>
  );
}
