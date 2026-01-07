from .db.session import session_scope
from .exchange_rate_repository import fetch_exchange_rates
from src.utils.forecast_helpers import (
    calculate_forecast,
    calculate_delta,
    build_forecast_rows
)
from src.utils.multiple_matrices import multiply_matrices_numpy
from src.schemas.forecast_analysis_schema import ForecastAnalysisResponse


def build_forecast_analysis() -> ForecastAnalysisResponse:
    with session_scope() as db:
        data = fetch_exchange_rates(db)

    actuals = [float(item.average_rate) for item in data]
    months = [item.exchange_month for item in data]

    forecast = calculate_forecast(actuals)

    actuals = actuals[3:]
    forecast = forecast[3:]

    delta = calculate_delta(actuals, forecast)

    rows = build_forecast_rows(months, actuals, forecast, delta)
    product_matrix = multiply_matrices_numpy(actuals, delta)

    return ForecastAnalysisResponse(
        rows=rows,
        productMatrix=product_matrix
    )
