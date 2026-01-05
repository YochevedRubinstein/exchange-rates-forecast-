import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './ExchangeRateGraph.css';
import { IExchangeRate } from '../types/rates';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ExchangeRateGraph: React.FC<IExchangeRate> = ({ rates }) => {

    const chartData = {
        labels: rates.map(rate => rate.exchange_month),
        datasets: [
            {
                label: 'Exchange Rate over Time',
                data: rates.map(rate => rate.average_rate),
                fill: false,
                borderColor: 'rgb(211, 80, 124)',
                tension: 0.1,
                pointStyle: 'circle',
                backgroundColor: 'rgb(255, 0, 119)',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    }
    // console.log("Rendering ExchangeRateGraph with data");
    
    return (
        <div className="graph">
            {/* <h2>Exchange Rate Graph</h2> */}
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default ExchangeRateGraph;
