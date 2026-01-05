import React from 'react';
import { useState, useEffect } from 'react';
import {fetchNextRate} from '../services/api'
import './NextMonthRate.css';
const NextMonthRate: React.FC = () => {
    const [nextRate, setNextRate] = useState<number>(null);
    useEffect(() => {
      const loadRate = async () => {
        try {
          const nextRateData = await fetchNextRate();
          console.log("Next month rate data:", nextRateData);
          setNextRate(nextRateData);
          console.log("Next month rate fetched in component:", nextRate);
        } catch (err) {
          console.error(err);
        }
      };
  
      loadRate();
    }, []);

    return (
        <div className="next-rate">
           <h3>Next Month</h3> 
           <h2>{nextRate}</h2>
        </div>
    );
    }

export default NextMonthRate;
