import React, { useState, useEffect } from 'react';
import './ExchangeRateTable.css';
import { IExchangeRate } from '../types/rates';


const ExchangeRateTable:React.FC<IExchangeRate> = ({ rates}) => {
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Average Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {rates.map((rate, index) => (
                        <tr 
                        key={index}
                        className={rate.is_min ? 'min-rate' : rate.is_max ? 'max-rate' : ''}
                    >
                            <td>{rate.exchange_month}</td>
                            <td>{rate.average_rate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExchangeRateTable;
