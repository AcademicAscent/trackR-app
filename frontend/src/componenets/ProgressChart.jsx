import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProgressChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [{
      label: 'Study Hours',
      data: data.map(item => item.hours),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }],
  };

  return <Bar data={chartData} />;
};
export default ProgressChart;
