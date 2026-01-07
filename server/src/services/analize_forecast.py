from ..utils.multiple_matrices import multiply_matrices_numpy
from .db import SessionLocal
from .exchange_rates_service import get_all_exchange_rates
from ..schemas.forecast_analysis_schema import ForecastAnalysisResponse
from ..utils.forecast_helpers import build_forecast_rows,calculate_forecast,calculate_delta

def build_forecast_analysis() -> ForecastAnalysisResponse:
    data=get_all_exchange_rates()
    actuals = [item["average_rate"] for item in data]
    monthes = [item["exchange_month"] for item in data]
    forecast = calculate_forecast(actuals)
    actuals=actuals[3:]
    forecast=forecast[3:]
    delta=calculate_delta(actuals,forecast)
    rows = build_forecast_rows(monthes,actuals, forecast,delta)
    product_matrix = multiply_matrices_numpy(actuals, delta)
    return ForecastAnalysisResponse(
        rows=rows,
        productMatrix=product_matrix
    )
