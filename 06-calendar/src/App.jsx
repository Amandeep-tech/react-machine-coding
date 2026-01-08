import { useEffect, useRef, useState } from "react";
import "./styles.css";
import EventForm from "./components/EventForm";

const initialEvents = [
  {
    id: "1",
    title: "Standup",
    start: 540, // 9:00 AM
    end: 570, // 9:30 AM
  },
  {
    id: "2",
    title: "Design Review",
    start: 600, // 10:00 AM
    end: 660, // 11:00 AM
  },
  {
    id: "3",
    title: "Practice",
    start: 100,
    end: 200,
  },
];

export default function App() {
  const [events, setEvents] = useState(initialEvents);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState("");

  const sortedEvents = [...events].sort((eve1, eve2) => eve1.start - eve2.start);

  const addEvent = (prevEvents, event) => {
    if (!editingId) {
      return [
        ...prevEvents,
        {
          id: crypto.randomUUID(),
          ...event,
        },
      ];
    }
    // editing case
    return prevEvents.map((prevEvent) => {
      if (prevEvent.id === editingId) {
        return {
          ...prevEvent,
          ...event,
        };
      }
      return prevEvent;
    });
  };

  const formatTime = (minutes) => {
    const hour = Math.floor(minutes / 60);
    const min = minutes % 60;

    return `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
  };

  const handleAddEvent = ({ title, startTime, endTime }) => {
    if (!title || !startTime || !endTime) {
      setError("Fill all the fields");
      if(editingId) setEditingId("");
      return;
    }
    if (isNaN(startTime) || isNaN(endTime)) {
      setError("Time should be in number only");
      if(editingId) setEditingId("");
      return;
    }
    if (startTime >= endTime) {
      setError("Start time should be less than end time");
      if(editingId) setEditingId("");
      return;
    }

    /* 
    // start < existingEnd && existingStart < end.
      Existing |-----|
      New         |-----|

      // start < existingEnd && existingStart < end.
      Existing  |-----|
      New     |----|

      // start < existingEnd && existingStart < end.
      Existing  |-----|
      New     |---------|

      // start < existingEnd && existingStart < end.
      Existing. |---------|
      New         |--|


      // Non-Overlapping below
      
      Existing.       |----|
      New       |---|

      Existing.       |----|
      New                     |---|
    */

    const hasOverLap = events.some((event) => {
      const start = Number(startTime);
      const end = Number(endTime);
      // do no check for event which is currently being editied
      if(event.id === editingId) return false;
      // finding out this condition is something tricky :)
      if (start < event.end && event.start < end) {
        return true;
      }
    });
    if (hasOverLap) {
      setError("Overlapping events found");
      return;
    }
    setError("");
    setEvents((prevEvents) =>
      addEvent(prevEvents, {
        title,
        start: startTime,
        end: endTime,
      })
    );
    if(editingId) setEditingId("");
  };

  const onEdit = (id) => {
    setEditingId(id);
  };

  const getEditingData = () => {
    return events.find((event) => event.id === editingId);
  };

  return (
    <div>
      <h2>Add Event</h2>
      <EventForm
        onSubmit={handleAddEvent}
        data={editingId ? getEditingData() : null}
      />
      {error ? <div className="error">{error}</div> : null}
      <h2 className="center">Events</h2>
      <div className="app">
        <ul>
          {sortedEvents.map((event) => (
            <>
              <li key={event.id}>
                {event.title}, {formatTime(event.start)} -{" "}
                {formatTime(event.end)}
              <button onClick={() => onEdit(event.id)}>Edit</button>
              </li>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
}
