import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const EventForm = ({ onSubmit, data }) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if(data && Object.keys(data).length > 0) {
      setTitle(data.title);
      setStartTime(data.start);
      setEndTime(data.end);
    }
  }, [data])

  const clearStates = () => {
    setTitle("");
    setStartTime("");
    setEndTime("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      title,
      startTime,
      endTime,
    });
    clearStates();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="startTime">Start Time</label>
      <input
        type="text"
        name="startTime"
        id="startTime"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />

      <label htmlFor="endTime">End Time</label>
      <input
        type="text"
        name="endTime"
        id="endTime"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EventForm;
