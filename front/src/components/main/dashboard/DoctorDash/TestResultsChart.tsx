import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import "./TestResultsChart.css"

// Register Chart components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface DataPoint {
  date: string;
  positiveCount: number;
  test_name: string;
}

const TestResultsChart: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [selectedTests, setSelectedTests] = useState({
    hivTest: true,
    yellowFever: true,
    malaria: true,  
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/lab_test_results')
      .then(response => {
        const filteredData = response.data.filter((result: any) => {
          return (
            (selectedTests.hivTest && result.test_name === "HIV Test" && result.result === "Positive") ||
            (selectedTests.yellowFever && result.test_name === "Yellow fever" && result.result === "Positive") ||
            (selectedTests.malaria && result.test_name === "Malaria" && result.result === "Positive")
          );
        });

        // Format the date and aggregate the counts
        const aggregatedData: { [key: string]: { [test: string]: number } } = {};

        filteredData.forEach((result: any) => {
          const date = new Date(result.submitted_date).toISOString().split('T')[0]; 
          if (!aggregatedData[date]) {
            aggregatedData[date] = { "HIV Test": 0, "Yellow fever": 0, "Malaria": 0 }; 
          }
          aggregatedData[date][result.test_name] += 1;
        });

        const chartData = Object.keys(aggregatedData).map(date => ({
          date,
          ...aggregatedData[date],
        }));

        setData(chartData);
      })
      .catch(error => {
        console.error('Error fetching test results:', error);
      });
  }, [selectedTests]);

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Positive Test Results per Day',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
        beginAtZero: true,
      },
    },
  };

  const chartData = {
    labels: data.map(point => point.date),
    datasets: [
      {
        label: 'HIV Test',
        data: data.map(point => selectedTests.hivTest ? point["HIV Test"] : 0),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Yellow Fever',
        data: data.map(point => selectedTests.yellowFever ? point["Yellow fever"] : 0),
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
      {
        label: 'Malaria',
        data: data.map(point => selectedTests.malaria ? point["Malaria"] : 0),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='test-results-chart-container'>
      <h2>Positive Infections per day</h2>
      <div className='test-results-controls'>
        <label>
          <input
            type="checkbox"
            checked={selectedTests.hivTest}
            onChange={() => setSelectedTests(prevState => ({
              ...prevState,
              hivTest: !prevState.hivTest,
            }))}
          />
          HIV Test
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedTests.yellowFever}
            onChange={() => setSelectedTests(prevState => ({
              ...prevState,
              yellowFever: !prevState.yellowFever,
            }))}
          />
          Yellow Fever
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedTests.malaria}
            onChange={() => setSelectedTests(prevState => ({
              ...prevState,
              malaria: !prevState.malaria,
            }))}
          />
          Malaria
        </label>
      </div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default TestResultsChart;
