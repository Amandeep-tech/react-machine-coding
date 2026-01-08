import React from "react";

const Card = ({ columnId, item, onMoveCard, onDelete }) => {
  return (
    <div className="card_wrapper">
      <div className="card">{item.text}</div>
      <div className="action_btn">
        <button onClick={() => window.confirm("Are you sure to delete this ?") && onDelete(item.id, columnId)}>Delete</button>
        {columnId === "todo" ? (
          <>
            <button
              onClick={() => {
                onMoveCard(item.id, "todo", "inProgress");
              }}
            >
              Move to - InProgress
            </button>
            <button
              onClick={() => {
                onMoveCard(item.id, "todo", "done");
              }}
            >
              Move to - Done
            </button>
          </>
        ) : columnId === "inProgress" ? (
          <>
            <button
              onClick={() => {
                onMoveCard(item.id, "inProgress", "todo");
              }}
            >
              Move to - Todo
            </button>
            <button
              onClick={() => {
                onMoveCard(item.id, "inProgress", "done");
              }}
            >
              Move to - Done
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                onMoveCard(item.id, "done", "todo");
              }}
            >
              Move to - Todo
            </button>
            <button
              onClick={() => {
                onMoveCard(item.id, "done", "inProgress");
              }}
            >
              Move to - InProgress
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
