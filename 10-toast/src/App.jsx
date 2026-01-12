import "./styles.css";

import ToastProvider, { useToast } from "./components/ToastProvider";

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

const AppContent = () => {
  const {showToast} = useToast();

  const addToast = () => {
    showToast({
      message: "Hi",
      type: "success",
      duration: 5000,
    });
  };
  return (
    <div className="app">
      <button className="add_toast" onClick={addToast}>
        Add Toast
      </button>
    </div>
  );
};
