import { apiClient } from './apiClient';
import { IRate, IExchangeRate, ICurrentRate, INextRate, IConnectionStatus } from '../types/rates';
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
  console.log("Fetched exchange rates:", data, "\nwith filters:", filters);
  return data;
};

export const fetchCurrentRate = async (): Promise<ICurrentRate> => {
  const data = await apiClient<ICurrentRate>('/current-exchange-rate');
  console.log("Fetched current rate:", data);
  return data;
};

export const fetchNextRate = async (): Promise<INextRate> => {
  const data = await apiClient<INextRate>('/next-month-exchange-rate');
    console.log("Fetched next rate:", data);
  return data;
};
