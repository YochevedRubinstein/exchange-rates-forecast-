import React from 'react';
import { Line } from 'react-chartjs-2';

const ForecastChart: React.FC<{ data: any }> = ({ data }) => {
  const chartData = {
    labels: data.map((item: any) => item.month),
    datasets: [
      {
        label: 'Actual',
        data: data.map((item: any) => item.actual),
        fill: false,
        borderColor: 'rgb(255, 255, 255)',
        tension: 0.1,
      },
      {
        label: 'Forecast',
        data: data.map((item: any) => item.forecast),
        fill: false,
        borderColor: 'rgb(255, 64, 112)',
        tension: 0.1,
      },
      {
        label: 'Delta',
        data: data.map((item: any) => item.delta),
        fill: false,
        borderColor: 'rgb(255, 0, 0)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, 
  };

  return (
    <div style={{ height: '200px' }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default ForecastChart;
