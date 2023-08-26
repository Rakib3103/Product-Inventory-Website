import React, { useState } from 'react';
import axios from 'axios';

function Data() {
  const [csvFile, setCSVFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setCSVFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (csvFile) {
      const formData = new FormData();
      formData.append('csv', csvFile);

      try {
        await axios.post('/api/upload-csv', formData);
        setMessage('CSV file uploaded successfully.');
      } catch (error) {
        setMessage('Error uploading CSV file.')
        setMessage(error.message)
      }
    }
  };

  return (
      <div>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload CSV</button>
        <p>{message}</p>
      </div>
  );
}

export default Data;
