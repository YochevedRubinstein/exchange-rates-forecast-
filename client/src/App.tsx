import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchExchangeRates } from './services/api';
import { IRate } from './types/rates';
import SearchBox from './components/searchBox/SearchBox';
import ExchangeRateTable from './components/ExchangeRateTable';
import ExchangeRateHeader from './components/ExchangeRateHeader';
import ExchangeRateGraph from './components/ExchangeRateGraph';
import Forecast from './components/forecast/Forecast';
import { IExchangeFilter } from './types/filters';

const App: React.FC = () => {
  const [rates, setRates] = useState<IRate[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (filters: IExchangeFilter) => {
    try {
      const data = await fetchExchangeRates(filters);
      setRates(data);
    } catch (error: any) {
      console.error('Error during search:', error);
      setError(error.message);
    } 
  };
  
  useEffect(() => {
    const initialFetch = async () => {
      try {
        const data = await fetchExchangeRates({
          months:[],
          startDate:'',
          endDate:'',
          minAverageRate: 0, 
          maxAverageRate: 6,
          sortField:'month',
          sortDirection:'desc',
        });
        setRates(data);
      } catch (error: any) {
        setError(error.message);
      }
    };
    if (rates.length === 0) {
      initialFetch();
    }
  }, []); 

  if (error)console.log("Error", {error});

  return (
    <div className="app">
      <ExchangeRateHeader />
      <ExchangeRateTable rates={rates} />
      <ExchangeRateGraph rates={rates} />
      <Forecast />
      <SearchBox onSearch={handleSearch} />
    </div>
  );
};

export default App;
