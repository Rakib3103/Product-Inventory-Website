import React, { useState } from 'react';
import './styles.css';  // Make sure you have a file named homepage.css in the same directory for styling.

const Homepage = () => {
  // Existing State Management and Handlers
  const [note, setNote] = useState("");

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const navigateToStatistics = () => {
    window.location.href = "/statistics";
  };
  const navigateTologin = () => {
    window.location.href = "/login";
  };



  

  // Rendered JSX
  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>SIDEBAR</h2>
        <div className="inbox" onClick={() => console.log('Inbox clicked')}>Inbox</div>
        <div className="category" onClick={() => console.log('Category clicked')}>Category</div>
        <div className="settings" onClick={() => console.log('Settings clicked')}>Settings</div>
      </aside>

      {/* Dashboard */}
      <main className="dashboard">
        <header>
          <h1>DASHBOARD</h1>
          <button onClick={navigateToStatistics}>View Statistics</button>
          <button onClick={navigateTologin}>Logout</button>
        </header>


        <div className="grocery">
          <h2>Grocery List</h2>
          <div className="Add-Grocery-List">
            <input type="text" id="grocery-input" placeholder="Add here" />
            <button onClick={() => console.log('Add Grocery')}>Add Grocery</button>
          </div>
          <ul id="grocery-list">
            {/* The grocery list items will be added dynamically using JavaScript */}
          </ul>
        </div>

        <div className="products">
          <h2>Products</h2>
          <div className="Add-Product-List">
            <input type="text" id="product-name" placeholder="Product Name" />
            <input type="date" id="expiry-date" />
            <input type="number" id="quantity" placeholder="Quantity" />
            <button onClick={() => console.log('Add Product')}>Add Product</button>
          </div>
          <table id="product-table">
            <tr>
              <th>Product-Name</th>
              <th>Expiry-Date</th>
              <th>Quantity</th>
              <th>Category</th>
            </tr>
          </table>
        </div>

        <div className="reminder">
          <h2>Reminder List</h2>
          <div className="Add-reminder">
            <input type="text" id="reminder-input" placeholder="Enter a reminder" />
            <button onClick={() => console.log('Add Reminder')}>Add Reminder</button>
          </div>
          <ul id="reminder-list">
            {/* The reminder items will be added dynamically using JavaScript */}
          </ul>
        </div>
      </main>

      {/* Original Homepage JSX */}
      <div className="homepage">
        <div className="header">

        </div>
        <div className="content">
          <textarea
            className="notepad"
            placeholder="Write your notes here..."
            value={note}
            onChange={handleNoteChange}
          />
          
          {/* <button onClick={navigateTologin}>Logout</button> */}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
