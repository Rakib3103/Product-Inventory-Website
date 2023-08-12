import React, { useState } from "react";
import "./homepage.css";

const Homepage = () => {
  const [note, setNote] = useState("");

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  return (
    <div className="homepage">
      <div className="header">
        <h1>This is my homepage</h1>
        <div className="calendar">Calendar Component Here</div>
      </div>
      <h2>Welcome, User!</h2>
      <div className="content">
        <textarea
          className="notepad"
          placeholder="Write your notes here..."
          value={note}
          onChange={handleNoteChange}
        />
        <div className="button">Logout</div>
      </div>
    </div>
  );
};

export default Homepage;
