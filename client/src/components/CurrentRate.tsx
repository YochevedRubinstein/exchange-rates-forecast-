import React from 'react';
import { useState, useEffect } from 'react';
import { fetchCurrentRate } from '../services/api'
import './CurrentRate.css';

const CurrentRate: React.FC = () => {
  const [todaysRate, setTodaysRate] = useState<number>(null);

  useEffect(() => {
    const loadRate = async () => {
      try {
        const currentRate = await fetchCurrentRate();
        console.log("Current rate fetched in component:", currentRate);

        setTodaysRate(currentRate);
      } catch (err) {
        console.error(err);
      }
    };

    loadRate();
  }, []);

  return (
    <div className="current-rate">
      <h3>The Dolar Today</h3>
      <h2>{todaysRate}</h2>
    </div>
  );
}

export default CurrentRate;


