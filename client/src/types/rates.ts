export interface IRate {
  exchange_month: string;
  average_rate: number;
  is_min: boolean;
  is_max: boolean;
}

export interface IExchangeRate {
  rates: IRate[];
}

export interface ICurrentRate {
  rate: number; 
}

export interface INextRate {
  rate: number;
}

export interface IConnectionStatus {
  status: string;
  message: string;
}
