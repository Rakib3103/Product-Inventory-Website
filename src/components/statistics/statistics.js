import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import './statistics.css';  // Assuming you have a Statistics.css file in the same directory

function Statistics() {
    useEffect(() => {
        function randomData(min, max, length) {
            return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
        }

        const ctxPie = document.getElementById('pieChart').getContext('2d');
        new Chart(ctxPie, {
            type: 'pie',
            data: {
                datasets: [{
                    data: randomData(1, 100, 3),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    label: 'Dataset 1'
                }],
                labels: ['Electronics', 'Clothing', 'Groceries']
            }
        });

        const ctxExpenditure = document.getElementById('expenditureChart').getContext('2d');
        new Chart(ctxExpenditure, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May'],
                datasets: [{
                    label: 'Expenditure',
                    borderColor: '#FF6384',
                    data: randomData(100, 1000, 5)
                }]
            }
        });

        const ctxMonthlyExpenditure = document.getElementById('monthlyExpenditureChart').getContext('2d');
        new Chart(ctxMonthlyExpenditure, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May'],
                datasets: [{
                    label: 'Monthly Expenditure',
                    borderColor: '#36A2EB',
                    data: randomData(200, 1200, 5)
                }]
            }
        });

        const ctxInventory = document.getElementById('inventoryChart').getContext('2d');
        new Chart(ctxInventory, {
            type: 'bar',
            data: {
                labels: ['Laptops', 'T-Shirts', 'Apples'],
                datasets: [{
                    label: 'Inventory',
                    backgroundColor: '#FFCE56',
                    borderColor: '#FFCE56',
                    data: randomData(10, 500, 3)
                }]
            }
        });
    }, []);

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
