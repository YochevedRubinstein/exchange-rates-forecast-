export interface IForecastTableRow {
    month: string;
    actual: number;
    forecast: number | null;
    delta: number | null;
  }
  
  export interface IForecastResponse {
    rows: IForecastTableRow[];
    productMatrix: number[][];
  }
  