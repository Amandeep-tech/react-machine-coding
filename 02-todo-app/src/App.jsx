import { useState } from "react";
import "./styles.css";

// {
//   id: number,
//   text: string,
//   completed: boolean
// }

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState("");

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
    setTasks(tasks => tasks.filter(t => t.id !== taskIdToBeDeleted));
  };

  const handleCompletion = (id) => {
    setTasks((tasks) =>
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div className="container">
      <div className="flex">
        <input type="text" value={query} onChange={handleQuery} />
        <button onClick={handleCreate}>Create</button>
      </div>

      <div className="tasks_container">
        {tasks?.length
          ? tasks.map((task) => (
              <div className="task flex" key={task.id}>
                <span>{task.text}</span>
                <span>{task.completed ? "completed" : "not completed"}</span>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
                <button onClick={() => handleCompletion(task.id)}>
                  Mark as {task.completed ? "uncomplete" : "complete"}
                </button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
