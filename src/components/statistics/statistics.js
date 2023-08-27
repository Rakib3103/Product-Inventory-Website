import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './statistics.css';

function Statistics() {
  const [products, setProducts] = useState([]);
  const pieChartRef = useRef(null);
  const inventoryChartRef = useRef(null);
  const expenditureChartRef = useRef(null);
  const monthlyExpenditureChartRef = useRef(null);

  function randomData(min, max, length) {
    return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
  }

  useEffect(() => {
    fetch('http://localhost:9002/getProducts') // Adjust the URL as per your server setup
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  // Calculate total expenditure
  const totalExpenditure = products.reduce((acc, product) => {
    return acc + product.cost;
  }, 0);

  const createNewChart = (ref, config) => {
    if (ref.current) {
      ref.current.destroy();
    }
    ref.current = new Chart(config.context, config);
  };

  useEffect(() => {
    const categoryCounts = products.reduce((acc, product) => {
      const { category } = product;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    const productCategoryLabels = Object.keys(categoryCounts);
    const productCategoryData = Object.values(categoryCounts);

    createNewChart(pieChartRef, {
      type: 'pie',
      data: {
        labels: productCategoryLabels,
        datasets: [{
          data: productCategoryData,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }],
      },
      context: document.getElementById('pieChart').getContext('2d')
    });

    createNewChart(inventoryChartRef, {
      type: 'bar',
      data: {
        labels: productCategoryLabels,
        datasets: [{
          label: 'Inventory',
          backgroundColor: '#FFCE56',
          borderColor: '#FFCE56',
          data: productCategoryData
        }]
      },
      context: document.getElementById('inventoryChart').getContext('2d')
    });

    // Update the data for the expenditure chart
    createNewChart(expenditureChartRef, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
          label: 'Total Expenditure',
          borderColor: '#36A2EB',
          data: [totalExpenditure, totalExpenditure, totalExpenditure, totalExpenditure, totalExpenditure],
        }]
      },
      context: document.getElementById('expenditureChart').getContext('2d')
    });

    createNewChart(monthlyExpenditureChartRef, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
          label: 'Monthly Expenditure',
          borderColor: '#36A2EB',
          data: randomData(200, 1200, 5)
        }]
      },
      context: document.getElementById('monthlyExpenditureChart').getContext('2d')
    });
  }, [products]);

  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        <h1>Category of Products</h1>
        <canvas id="pieChart"></canvas>
      </div>
      <div className="chart-wrapper">
        <h1>Expenditure Chart</h1>
        <canvas id="expenditureChart"></canvas>
      </div>
      <div className="chart-wrapper">
        <h1>Monthly Expenditure Goal</h1>
        <canvas id="monthlyExpenditureChart"></canvas>
      </div>
      <div className="chart-wrapper">
        <h1>Product Inventory</h1>
        <canvas id="inventoryChart"></canvas>
      </div>
    </div>
  );
}

export default Statistics;
