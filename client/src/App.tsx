import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchExchangeRates } from './services/api';
import { IRate } from './types/rates';
import SearchBox from './components/SearchBox';
import ExchangeRateTable from './components/ExchangeRateTable';
import ExchangeRateHeader from './components/ExchangeRateHeader';
import ExchangeRateGraph from './components/ExchangeRateGraph';
import Forecast from './components/Forecast';
import { IExchangeFilter } from './types/filters';

const App: React.FC = () => {
  const [rates, setRates] = useState<IRate[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (filters: IExchangeFilter) => {
    // console.log('Current filters:', filters);
  
    // setLoading(true);
    // console.log('Searching with filters:', filters);
  
    try {
      const data = await fetchExchangeRates(filters);
      // console.log('Fetched data:', data); 
      setRates(data);
    } catch (error: any) {
      console.error('Error during search:', error);
      setError(error.message);
    } finally {
      // setLoading(false);
    }
  };
  
  useEffect(() => {
    const initialFetch = async () => {
      // console.log("initial fetch");
      // setLoading(true);
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
      } finally {
        // setLoading(false);
      }
    };
    if (rates.length === 0) {
      // console.log("Fetching initial data (rates.length === 0)"); 
      initialFetch();
    }
  }, []); 

  // if (loading) return <div>Loading...</div>;
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
