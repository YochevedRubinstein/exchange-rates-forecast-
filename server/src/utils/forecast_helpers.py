from typing import List, Optional

def calculate_delta_for_month(actual: float, forecast: Optional[float]) -> Optional[float]:
    if forecast is None:
        return None
    return round(actual - forecast,4)


def calculate_forecast_for_next_month(actuals: List[float], forecast: List[Optional[float]]) -> Optional[float]:
    if len(actuals) < 3 or len(forecast) < 3:
        return None
    last_3_months_rates = [item for item in actuals[-3:]]
    last_3_months_average = sum(last_3_months_rates) / 3
    return round(last_3_months_average,4)

def build_forecast_rows(months:List[str],actuals: List[float], forecast: List[Optional[float]],delta:List[float]) -> List[dict]:
    rows = []
    for i, actual in enumerate(actuals):
        rows.append({
            "month": months[i],
            "actual": actual,
            "forecast": forecast[i] if i < len(forecast) else None,
            "delta": delta[i]
        })
    return rows


def calculate_forecast(actuals: List[float]) -> List[Optional[float]]:
    forecast = []
    for i in range(len(actuals)):
        forecast_value = calculate_forecast_for_next_month(actuals[:i], forecast)
        forecast.append(forecast_value)
    return forecast

def calculate_delta(actual: List[float], forecast: List[float]) -> List[float]:
    delta=[]
    for i in range(len(actual)):
        delta.append(calculate_delta_for_month(actual[i],forecast[i]))
    return delta
