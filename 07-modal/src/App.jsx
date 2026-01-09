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
          <p>Few Focusable elements</p>
          <button>Focus 1</button>
          <input type="text" name="" id="" />
          <select name="" id="">
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
          <textarea name="" id=""></textarea>
        </Modal>
      ) : (
        <button onClick={() => setShowModal(true)}>Open Modal</button>
      )}
    </div>
  );
}
