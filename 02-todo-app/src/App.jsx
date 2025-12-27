import { useEffect, useRef, useState } from "react";
import "./styles.css";

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
  const editingInpRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("activeFilter", filter);
  }, [filter]);

  useEffect(() => {
    if (editingId && editingInpRef.current) {
      editingInpRef.current.focus();
    }
  }, [editingId]);

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
    if (id === "all" || id === "active" || id === "completed") setFilter(id);
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
        <label htmlFor="todo_input">Add Task</label>
        <input
          id="todo_input"
          type="text"
          value={query}
          onChange={handleQuery}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreate(e);
            } else if (e.key === "Escape") {
              setQuery("");
            }
          }}
        />
        <button aria-label="Create Task" onClick={handleCreate}>
          Create
        </button>
      </div>
      <div
        role="group"
        aria-label="Task filters"
        className="flex action_btns"
        onClick={handleActionBtns}
      >
        <button
          id="all"
          aria-label="Filter all task"
          className={`${filter === "all" ? "active" : ""}`}
        >
          All
        </button>
        <button
          id="active"
          aria-label="Filter active task"
          className={`${filter === "active" ? "active" : ""}`}
        >
          Active
        </button>
        <button
          id="completed"
          aria-label="Filter completed task"
          className={`${filter === "completed" ? "active" : ""}`}
        >
          Completed
        </button>
      </div>
      <ul className="tasks_container">
        {tasks?.length ? (
          visibleTasks?.length > 0 ? (
            visibleTasks.map((task) => (
              <li className="task flex" key={task.id}>
                {task.id === editingId ? (
                  <input
                    type="text"
                    aria-label="Editing task"
                    ref={editingInpRef}
                    value={editedText}
                    onChange={handleEditedText}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSave();
                      } else if (e.key === "Escape") {
                        handleDiscard();
                      }
                    }}
                  />
                ) : (
                  <span>{task.text}</span>
                )}
                <span role="status" aria-live="polite">
                  {task.completed ? "completed" : "not completed"}
                </span>
                {task.id === editingId ? null : (
                  <button
                    aria-label={`Edit task ${task.text}`}
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>
                )}
                {task.id === editingId ? (
                  <>
                    <button aria-label="Save Task" onClick={handleSave}>
                      Save
                    </button>
                    <button aria-label="Discard Task" onClick={handleDiscard}>
                      Discard
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      aria-label={`Delete task ${task.text}`}
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>
                    <button
                      aria-label={`Mark ${task.text} ${
                        task.completed ? "uncomplete" : "complete"
                      }`}
                      onClick={() => handleCompletion(task.id)}
                    >
                      Mark as {task.completed ? "uncomplete" : "complete"}
                    </button>
                  </>
                )}
              </li>
            ))
          ) : (
            <div className="flex">No tasks, try changing filter</div>
          )
        ) : (
          <div className="flex">Create task</div>
        )}
      </ul>
    </div>
  );
}
