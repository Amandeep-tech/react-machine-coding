import { useEffect, useRef, useState } from "react";
import "./styles.css";
import Column from "./components/Column";

const initialBoard = {
  todo: {
    title: "Todo",
    items: [
      { id: "1", text: "Learn React" },
      { id: "2", text: "Practice Machine Coding" },
    ],
  },
  inProgress: {
    title: "In Progress",
    items: [{ id: "3", text: "Build File Explorer" }],
  },
  done: {
    title: "Done",
    items: [{ id: "4", text: "Revise JS Basics" }],
  },
};

export default function App() {
  const [board, setBoard] = useState(() => initialBoard);

  const addCard = (prevBoard, columnId, text) => {
    if (!text.trim()) return prevBoard;

    return {
      ...prevBoard,
      [columnId]: {
        ...prevBoard[columnId],
        items: [
          ...prevBoard[columnId].items,
          {
            id: crypto.randomUUID(),
            text: text,
          },
        ],
      },
    };
  };

  const moveCard = (prevBoard, cardId, fromColumn, toColumn) => {
    // 1. Find the card
    // 2. Remove/filter the card from source column
    // 3. Add it to target column

    // 1.
    const cardToMove = prevBoard[fromColumn].items.find(item => item.id === cardId);
    
    // safe guard
    if(!cardToMove) return prevBoard;

    // 2.
    return {
      ...prevBoard,
      [fromColumn]: {
        ...prevBoard[fromColumn],
        items: prevBoard[fromColumn].items.filter(item => item.id !== cardId)
      },
      // 3.
      [toColumn]: {
        ...prevBoard[toColumn],
        items: [
          ...prevBoard[toColumn].items,
          cardToMove
        ]
      }
    }
  };

  const deleteCard = (prevBoard, cardId, fromColumn) => {
    return {
      ...prevBoard,
      [fromColumn]: {
        ...prevBoard[fromColumn],
        items: prevBoard[fromColumn].items.filter(item => item.id !== cardId)
      }
    }
  }

  const onAddCard = (columnId, text) => {
    setBoard((prevBoard) => addCard(prevBoard, columnId, text));
  };

  const onMoveCard = (cardId, fromColumn, toColumn) => {
    setBoard((prevBoard) => moveCard(prevBoard, cardId, fromColumn, toColumn));
  };

  const onDelete = (cardId, fromColumn) => {
    setBoard(prevBoard => deleteCard(prevBoard, cardId, fromColumn))
  }

  return (
    <div className="app">
      <div className="row">
        {Object.entries(board).map(([columnId, column]) => (
          <Column
            key={columnId}
            columnId={columnId}
            title={column.title}
            cards={column.items}
            onAddCard={onAddCard}
            onMoveCard={onMoveCard}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
