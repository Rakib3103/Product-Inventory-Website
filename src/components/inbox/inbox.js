import React, { useState, useEffect } from 'react';
// import './styles.css';
import './inbox.css';

const Inbox = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9002/getNotes')
      .then(res => res.json())
      .then(data => {
        setNotes(data);
      })
      .catch(err => console.error('Error fetching notes:', err));
  }, []);

  return (
    <div className="inbox-container">
      <h1>Inbox</h1>
      <ul className="note-list">
        {notes.map((note, index) => (
          <li key={index}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Inbox;
