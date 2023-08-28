// DownloadData.js
import React, { useState } from 'react';
import axios from 'axios';
import './../styles.css';

const Data = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleDownload = async () => {
        try {
            await axios.get('http://localhost:9002/download-data', { responseType: 'blob' }).then((response) => {
                const blob = new Blob([response.data], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'downloaded-data.json';
                a.click();
            });
        } catch (error) {
            console.error('Error downloading data', error);
        }
    };
    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('jsonFile', file);

            const response = await axios.post('http://localhost:9002/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log(response.data.message);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
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
                <div className="chart-container">
                    <div className="chart-wrapper">
                        <button onClick={handleDownload}>Download Data</button>
                    </div>
                    <div className="chart-wrapper">
                        <input type="file" accept=".json" onChange={handleFileChange} />
                        <button onClick={handleUpload}>Upload File</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Data;
