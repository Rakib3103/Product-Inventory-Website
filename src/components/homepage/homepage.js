import React, { useState } from "react";
import "./homepage.css";


const Homepage = () => {
  const [note, setNote] = useState("");

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const navigateToStatistics = () => {
    window.location.href = "statistics.html";
  };

  return (
    <div className="homepage">
      <div className="header">
        <h1>This is my homepage</h1>
        <div className="calendar">Calendar</div>
      </div>
      <h2>Welcome, User!</h2>
      <div className="content">
        <textarea
          className="notepad"
          placeholder="Write your notes here..."
          value={note}
          onChange={handleNoteChange}
        />
        <button onClick={navigateToStatistics}>View Statistics</button> {/* This is the new button */}
        <div className="button">Logout</div>
      </div>
    </div>
  );
};

export default Homepage;
