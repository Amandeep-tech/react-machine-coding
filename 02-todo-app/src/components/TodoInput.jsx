export default function TodoInput({ query, onChange, onCreate }) {
  return (
    <>
      <label htmlFor="todo_input">Add Task</label>
      <input
        id="todo_input"
        type="text"
        value={query}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onCreate(e);
          } else if (e.key === "Escape") {
            onChange("");
          }
        }}
      />
      <button aria-label="Create Task" onClick={onCreate}>
        Create
      </button>
    </>
  );
}
