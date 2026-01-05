import React from 'react';
import CurrentRate from './CurrentRate';
import './ExchangeRateHeader.css';
import NextMonthRate from './NextMonthRate';

const ExchangeRateHeader: React.FC = () => {
    return (
        <div className="header">
           <h1>Average Exchange Rate by Month</h1> 
           <div className="rates">
               <CurrentRate/>
               <NextMonthRate/>
           </div>
        </div>
    );
}

export default ExchangeRateHeader;
