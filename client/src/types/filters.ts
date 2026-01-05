export interface IExchangeFilter {
    months?: number[];
    startDate?: string;  
    endDate?: string;   
    minAverageRate?: number; 
    maxAverageRate?: number;   
    sortField: 'month' | 'avg';
    sortDirection: 'asc' | 'desc';
  }