import React from 'react';
import { useState, useEffect } from 'react';
import { fetchCurrentRate } from '../services/api'
import './CurrentRate.css';
import { ICurrentRate } from '../types/rates';

const CurrentRate: React.FC = () => {
  const [todaysRate, setTodaysRate] = useState<ICurrentRate | null>(null);
  const [tr, setTr] = useState<number>(null);

  useEffect(() => {
    const loadRate = async () => {
      try {
        const currentRate = await fetchCurrentRate();
        console.log("Current rate fetched in component:", currentRate);
        console.log("Current rate state:", currentRate.rate);

        setTodaysRate(currentRate);
        // setTr(currentRate)
      } catch (err) {
        console.error(err);
      }
    };

    loadRate();
  }, []);

  return (
    <div className="current-rate">
      <h3>The Dolar Today</h3>
      <h2>{todaysRate?.rate}</h2>
      <h2>{tr}</h2>

    </div>
  );
}

export default CurrentRate;


