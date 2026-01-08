import React from "react";
import Card from "./Card";
import { useState } from "react";

const Column = ({ title, cards, columnId, onAddCard, onMoveCard, onDelete }) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    setText(val);
  };

  const handleKeyDown = (e) => {
    if (!text.trim()) return;
    const key = e.key;
    if (key === "Enter") {
      onAddCard(columnId, text);
      setText("");
    }
  };

  return (
    <div className="column">
      <div className="title">{title}</div>
      <div className="add_card">
        <input
          placeholder="Create..."
          type="text"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="cards">
        {cards?.map((item) => (
          <Card key={item.id}
          onDelete={onDelete}
          columnId={columnId} item={item} 
          onMoveCard={onMoveCard}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
