import Toast from "./Toast";

const ToastContainer = ({ toasts, removeToast, direction }) => {

  const directionClass = () => {
    switch(direction) {
      case 'topLeft':
        return 'top_left';
      case 'bottomRight':
        return 'bottom_right';
      case 'bottomLeft':
        return 'bottom_left'
      default: return '';
    }
  }

  return (
    <div className={`toast_container ${directionClass()}`}>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;
