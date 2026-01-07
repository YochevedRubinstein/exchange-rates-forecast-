import { apiClient } from './apiClient';
import { IRate, IConnectionStatus } from '../types/rates';
import { IForecastResponse } from '../types/forecastResponse';
import { IExchangeFilter } from '../types/filters';

export const checkConnection = async (): Promise<IConnectionStatus> => {
  const data = await apiClient<IConnectionStatus>('/health');
  return data;
};

export const fetchExchangeRates = async (filters: IExchangeFilter): Promise<IRate[]> => {
  const data = await apiClient<IRate[]>('/exchange-rates', {
    method: 'POST',
    body: JSON.stringify(filters),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};

export const fetchCurrentRate = async (): Promise<number> => {
  const data = await apiClient<number>('/current-exchange-rate');
  return data;
};

export const fetchNextRate = async (): Promise<number> => {
  const data = await apiClient<number>('/next-month-exchange-rate');
  return data;
};

export const fetchForecast = async (): Promise<IForecastResponse> => {
    const data = await apiClient<IForecastResponse>('/forecast');
    return data;
}