// DownloadData.js
import React, { useState } from 'react';
import axios from 'axios';

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
        <div className="chart-container">
            <div className="chart-wrapper">
                <button onClick={handleDownload}>Download Data</button>
            </div>
            <div className="chart-wrapper">
                <input type="file" accept=".json" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload File</button>
            </div>
        </div>
    );
};

export default Data;
