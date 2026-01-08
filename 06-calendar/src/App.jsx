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
];

export default function App() {
  const [events, setEvents] = useState(initialEvents);
  const [error, setError] = useState("");

  const addEvent = (prevEvents, newEvent) => {
    return [
      ...prevEvents,
      {
        id: crypto.randomUUID(),
        ...newEvent
      }
    ]
  }

  const handleAddEvent = ({title, startTime, endTime}) => {
    if(!title || !startTime || !endTime) {
      setError("Fill all the fields");
      return;
    };
    if(startTime > endTime) {
      setError("Start time should be less than end time")
      return;
    }

    setError("");
    setEvents(prevEvents => addEvent(prevEvents, {
      title, start: startTime, end: endTime
    }))
  }

  return (
    <div>
      <h2>Add Event</h2>
      <EventForm onSubmit={handleAddEvent} />
      {
        error ? 
        <div className="error">{error}</div>
        : 
        null
      }
      <h2 className="center">Events</h2>
      <div className="app">
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              {event.title}, {event.start} - {event.end}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
