import React from 'react';
import { useState, useEffect } from 'react';
import {fetchNextRate} from '../services/api'
import './NextMonthRate.css';
import { INextRate } from '../types/rates';
const NextMonthRate: React.FC = () => {
    const [nextRate, setNextRate] = useState<INextRate | null>(null);
    const [nr, setNr] = useState<number>(null);

    useEffect(() => {
      const loadRate = async () => {
        try {
          const nextRateData = await fetchNextRate();

          console.log("Next month rate data:", nextRateData);
          console.log("Next month rate data rate:", nextRateData.rate);
          setNextRate(nextRateData);
          console.log("Next month rate fetched in component:", nextRate);
          console.log("Next month rate state:", nextRate.rate);
          setNr(nextRateData.rate);
          console.log("Next month rate number state:", nr);
          
          
          
        } catch (err) {
          console.error(err);
        }
      };
  
      loadRate();
    }, []);

    return (
        <div className="next-rate">
           <h3>Next Month</h3> 
           <h2>{nextRate?.rate}</h2>
           {/* <h2>{nextRate}</h2> */}
            <h2>{nr}</h2>

        </div>
    );
    }

export default NextMonthRate;

