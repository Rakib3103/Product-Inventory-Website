const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;

const dbURL = 'your-database-url';

app.use(express.static('public'));

app.get('/data', async (req, res) => {
  MongoClient.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error connecting to the database.');
      return;
    }

    const db = client.db('products');
    const collection = db.collection('product-details');

    collection.find({}).toArray((err, products) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching data.');
        return;
      }

      // Transform products into desired data format for charts
      let pieData = [];
      let graphData = [];
      products.forEach(product => {
        pieData.push({ label: product.name, value: product.quantity });
        graphData.push({ x: product.name, y: product.sales });
      });

      res.json({ pieData, graphData });
      client.close();
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
