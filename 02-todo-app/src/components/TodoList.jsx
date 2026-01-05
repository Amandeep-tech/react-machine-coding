import TodoItem from "./TodoItem";

export default function TodoList({
  tasks,
  editingId,
  editedText,
  onEdit,
  onSave,
  onDiscard,
  onEditTextChange,
  onDelete,
  onToggleComplete,
}) {
  if (tasks.length === 0) {
    return (
      <ul className="tasks_container">
        <li className="flex">No tasks</li>
      </ul>
    );
  }
  return (
    <ul className="tasks_container">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          isEditing={task.id === editingId}
          editedText={editedText}
          onEdit={onEdit}
          onSave={onSave}
          onDiscard={onDiscard}
          onEditTextChange={onEditTextChange}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </ul>
  );
}
