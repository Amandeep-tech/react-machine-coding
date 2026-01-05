import { useEffect, useRef } from "react";

export default function TodoItem({
  task,
  isEditing,
  editedText,
  onEdit,
  onSave,
  onDiscard,
  onEditTextChange,
  onDelete,
  onToggleComplete,
}) {
  const editingInpRef = useRef(null);

  useEffect(() => {
    if (isEditing && editingInpRef.current) {
      editingInpRef.current.focus();
    }
  }, [isEditing]);

  return (
    <li className="task flex" key={task.id}>
      {isEditing ? (
        <input
          type="text"
          aria-label="Editing task"
          ref={editingInpRef}
          value={editedText}
          onChange={onEditTextChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSave();
            } else if (e.key === "Escape") {
              onDiscard();
            }
          }}
        />
      ) : (
        <span>{task.text}</span>
      )}
      <span role="status" aria-live="polite">
        {task.completed ? "completed" : "not completed"}
      </span>
      {isEditing ? null : (
        <button
          aria-label={`Edit task ${task.text}`}
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
      )}
      {isEditing ? (
        <>
          <button aria-label="Save Task" onClick={onSave}>
            Save
          </button>
          <button aria-label="Discard Task" onClick={onDiscard}>
            Discard
          </button>
        </>
      ) : (
        <>
          <button
            aria-label={`Delete task ${task.text}`}
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
          <button
            aria-label={`Mark ${task.text} ${
              task.completed ? "uncomplete" : "complete"
            }`}
            onClick={() => onToggleComplete(task.id)}
          >
            Mark as {task.completed ? "uncomplete" : "complete"}
          </button>
        </>
      )}
    </li>
  );
}
