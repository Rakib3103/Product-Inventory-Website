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
    );
}

export default Product;
