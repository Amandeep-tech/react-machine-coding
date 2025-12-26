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
  const [filter, setFilter] = useState("all");

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

  const handleActionBtns = (e) => {
    const id = e.target.id;
    if(id === "all" || id === "active" || id === "completed")
    setFilter(id);
  };

  const visibleTasks = tasks.filter(task => {
    if(filter === "all") return task;
    if(filter === "active") return !task.completed
    return task.completed;
  })

  return (
    <div className="container">
      <div className="flex">
        <input type="text" value={query} onChange={handleQuery} />
        <button onClick={handleCreate}>Create</button>
      </div>
      <div className="flex action_btns" onClick={handleActionBtns}>
        <button id="all" className={`${filter === "all" ? "active" : ""}`}>
          All
        </button>
        <button
          id="active"
          className={`${filter === "active" ? "active" : ""}`}
        >
          Active
        </button>
        <button
          id="completed"
          className={`${filter === "completed" ? "active" : ""}`}
        >
          Completed
        </button>
      </div>
      <div className="tasks_container">
        {tasks?.length
          ? 
          visibleTasks?.length > 0 ?
          visibleTasks.map((task) => (
              <div className="task flex" key={task.id}>
                <span>{task.text}</span>
                <span>{task.completed ? "completed" : "not completed"}</span>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
                <button onClick={() => handleCompletion(task.id)}>
                  Mark as {task.completed ? "uncomplete" : "complete"}
                </button>
              </div>
            ))
          : <div className="flex">  
            No tasks, try changing filter

          </div>
          : <div className="flex"> 
              Create task
            </div>}
      </div>
    </div>
  );
}
