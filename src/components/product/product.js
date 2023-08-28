// FilterableTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Product() {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:9002/api/items');
            setItems(response.data);
            setFilteredItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handleFilterChange = (event) => {
        const newFilter = event.target.value;
        setFilter(newFilter);

        const filteredData = items.filter((item) =>
            item.category.includes(newFilter)
        );
        setFilteredItems(filteredData);
    };

    return (
        <div className="container">
            <aside className="sidebar">
                <h2>SIDEBAR</h2>
                <div className="inbox" onClick={() => window.location.href = "/inbox"}>Inbox</div>
                <div className="dashboard" onClick={() => window.location.href = "/"}>Dashboard</div>
                <div className="product" onClick={() => window.location.href = "/product"}>Product</div>
                <div className="settings" onClick={() => console.log('Settings clicked')}>Settings</div>
                <div className="data" onClick={() => window.location.href = "/data"}>Data</div>
            </aside>

            <main className="dashboard">
                <div>
                    <input
                        type="text"
                        placeholder="Filter Category"
                        value={filter}
                        onChange={handleFilterChange}
                    />
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Expiry Date</th>
                            <th>Quality</th>
                            <th>Category</th>
                            <th>Cost</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredItems.map((item) => (
                            <tr key={item._id}>
                                <td>{item.productName}</td>
                                <td>{item.expiryDate}</td>
                                <td>{item.quantity}</td>
                                <td>{item.category}</td>
                                <td>{item.cost}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default Product;
