import { useEffect, useState } from "react";
import "./styles.css";
import TodoInput from "./components/TodoInput";
import TodoFilters from "./components/TodoFilters";
import TodoList from "./components/TodoList";

// {
//   id: number,
//   text: string,
//   completed: boolean
// }

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [];
  });

  const [filter, setFilter] = useState(() => {
    const savedFilter = localStorage.getItem("activeFilter");
    if (savedFilter) return savedFilter;
    return "all";
  });

  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("activeFilter", filter);
  }, [filter]);

 

  const handleQuery = (e) => {
    const val = e.target.value;
    setQuery(val);
  };

  const clearInput = () => {
    setQuery("");
  };

  const handleCreate = () => {
    if (!query.trim()) return;

    // crypto.randomUUID() is modern
    const task = {
      id: crypto.randomUUID(), // or Date.now()
      text: query,
      completed: false,
    };
    setTasks((tasks) => [...tasks, task]);
    clearInput();
  };

  const handleDelete = (taskIdToBeDeleted) => {
    setTasks((tasks) => tasks.filter((t) => t.id !== taskIdToBeDeleted));
  };

  const handleCompletion = (id) => {
    setTasks((tasks) =>
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const visibleTasks = tasks.filter((task) => {
    // filter callback should return boolean,
    // this works because objects are truthy :)
    if (filter === "all") return task;
    if (filter === "active") return !task.completed;
    return task.completed;
  });

  const handleEdit = (task) => {
    setEditingId(task.id);
    setEditedText(task.text);
  };

  const handleSave = () => {
    if (editedText.trim()) {
      // immutable state
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === editingId ? { ...task, text: editedText } : task
        )
      );
      setEditedText("");
      setEditingId("");
    }
  };

  const handleDiscard = () => {
    setEditedText("");
    setEditingId("");
  };

  const handleEditedText = (e) => {
    const val = e.target.value;
    setEditedText(val);
  };

  return (
    <div className="container">
      <div className="flex">
        <TodoInput
          query={query}
          onChange={handleQuery}
          onCreate={handleCreate}
        />
      </div>
      <div role="group" aria-label="Task filters" className="flex action_btns">
        <TodoFilters filter={filter} onChange={handleFilterChange} />
      </div>
      <TodoList
        tasks={visibleTasks}
        editedText={editedText}
        editingId={editingId}
        onEdit={handleEdit}
        onSave={handleSave}
        onDiscard={handleDiscard}
        onEditTextChange={handleEditedText}
        onDelete={handleDelete}
        onToggleComplete={handleCompletion}
      />
    </div>
  );
}
