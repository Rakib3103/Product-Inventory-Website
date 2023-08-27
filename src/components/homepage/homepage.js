import React, { useState, useEffect } from 'react';
import './styles.css';

const Homepage = () => {
  // Existing State Management and Handlers
  const [note, setNote] = useState("");
  const [products, setProducts] = useState([]);
  const [groceries, setGroceries] = useState([]);
  const [groceryInput, setGroceryInput] = useState("");


  const handleAddGrocery = () => {
    // const grocery = document.getElementById('grocery-input').value;
    const grocery = groceryInput;

    fetch('http://localhost:9002/addGrocery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ grocery }),
    })
      .then(res => {
        if (res.ok) {
          return res.json(); 
        } else {
          throw new Error('Failed to add grocery');
        }
      })
      .then(data => {
        setGroceries([...groceries, data.grocery]); // Append new grocery item
        setGroceryInput("");
      })
      .catch(err => {
        console.error('Error adding grocery:', err);
        // Handle error
      });
  };


    // Fetch groceries on component mount
    useEffect(() => {
      fetch('http://localhost:9002/getGroceries')
        .then(res => res.json())
        .then(data => {
          console.log('Fetched Groceries:', data);
          setGroceries(data);
        })
        .catch(err => console.error('Error fetching groceries:', err));
    }, []);

  useEffect(() => {
    fetch('http://localhost:9002/getProducts')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      })
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleAddProduct = () => {
    const productName = document.getElementById('product-name').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const quantity = document.getElementById('quantity').value;
    const category = document.getElementById('category').value;
    const cost = document.getElementById('cost').value;
  
    fetch('http://localhost:9002/addProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productName, expiryDate, quantity, category, cost }),
    })
      .then(res => {
        if (res.ok) {
          return res.json(); // Parse JSON only when the response is successful
        } else {
          throw new Error('Failed to add product');
        }
      })
      .then(data => {
        setProducts([...products, data.product]); // Update products with the newly added product
      })
      .catch(err => {
        console.error('Error adding product:', err);
        // Handle the error, e.g., display an error message to the user
      });
  };
  const navigateToStatistics = () => {
    window.location.href = "/statistics";
  };

  const navigateTologin = () => {
    window.location.href = "/login";
  };

  const handleSaveNote = () => {
    fetch('http://localhost:9002/saveNote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: note }),
    })
    .then(res => {
      if (res.ok) {
        return res.json(); 
      } else {
        throw new Error('Failed to save note');
      }
    })
    .then(data => {
      console.log('Note saved:', data.note);
    })
    .catch(err => {
      console.error('Error saving note:', err);
      // Handle the error, e.g., display an error message to the user
    });
  };

  

  // Rendered JSX
  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>SIDEBAR</h2>
        <div className="inbox" onClick={() => window.location.href = "/inbox"}>Inbox</div>
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
          <input type="text" value={groceryInput} onChange={e => setGroceryInput(e.target.value)} placeholder="Add here" />
          {/* <input type='text' id="grocery-input" placeholder="Add here" /> */}
          <button onClick={handleAddGrocery}>Add Grocery</button>
        </div>
        <table id="grocery-list">
          <thead>
            <tr>
              <th>Grocery Item</th>
            </tr>
          </thead>
          <tbody>
            {groceries.map((grocery, index) => (
              <tr key={index}>
                {/* <td>{index + 1}</td> */}
                <td>{grocery.item}</td> {/* Access item property here */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        <div className="products">
          <h2>Products</h2>
          <div className="Add-Product-List">
            <input type="text" id="product-name" placeholder="Product Name" />
            <input type="date" id="expiry-date" />
            <input type="number" id="quantity" placeholder="Quantity" />
            <input type="text" id="category" placeholder="Category" />
            <input type='number' id="cost" placeholder="Cost" />
            <button onClick={handleAddProduct}>Add Product</button>
          </div>
          
          <table id="product-table">
          <thead>
              <tr>
                <th>Product-Name</th>
                <th>Expiry-Date</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.productName}</td>
                  <td>{product.expiryDate}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category}</td>
                  <td>{product.cost}</td>
                </tr>
              ))}
            </tbody>
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
        <div className="notepad-container">
          <textarea
            className="notepad"
            placeholder="Write your notes here..."
            value={note}
            onChange={handleNoteChange}
          />
          <button onClick={handleSaveNote}>Save Note</button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
