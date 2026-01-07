import React, { useState } from 'react';
import './Forecast.css';
import ShowForecastButton from './ShowForecastButton';
import { IForecastResponse } from '../../types/forecastResponse';
import { fetchForecast } from '../../services/api';
import ForecastMatrix from './ForecastMatrix';
import DeltaMatrix from './DeltaDisplay';
import ForecastChart from './ForecastChart';

const Forecast: React.FC = () => {
    const [data, setData] = useState<IForecastResponse | null>(null);
    const [showForcast,setShowForcast]=useState<boolean>(false);

  const handleShowForecast = async () => {
    const response = await fetchForecast();
  
    setData(response);
    setShowForcast(!showForcast);
  };
  return (
    <div className="forecast">
      <h1>Forecast</h1>
      <ShowForecastButton onClick={handleShowForecast} />

      {showForcast && <>
     <ForecastMatrix data={data.rows} />
      <DeltaMatrix data={data.productMatrix} />
      <ForecastChart data={data.rows} />
      </>
      }
    </div>
  );
};

export default Forecast;
