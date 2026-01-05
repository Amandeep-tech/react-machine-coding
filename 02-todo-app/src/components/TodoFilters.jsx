export default function TodoFilters({ filter, onChange }) {
  return (
    <>
      <button
        id="all"
        aria-label="Filter all task"
        className={`${filter === "all" ? "active" : ""}`}
        onClick={() => onChange('all')}
      >
        All
      </button>
      <button
        id="active"
        aria-label="Filter active task"
        className={`${filter === "active" ? "active" : ""}`}
        onClick={() => onChange('active')}
      >
        Active
      </button>
      <button
        id="completed"
        aria-label="Filter completed task"
        className={`${filter === "completed" ? "active" : ""}`}
        onClick={() => onChange('completed')}
      >
        Completed
      </button>
    </>
  );
}
