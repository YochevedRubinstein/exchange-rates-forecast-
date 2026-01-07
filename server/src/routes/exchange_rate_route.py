from fastapi import APIRouter
from src.services.exchange_rates_service import get_exchange_rate_with_flags
from src.schemas.filter import IExchangeFilter
from src.services.exchange_rate_api import get_current_rate
from src.services.forecast_service import build_forecast_analysis


router = APIRouter()


@router.post("/exchange-rates")
def get_exchange_rates(filters: IExchangeFilter):
    return get_exchange_rate_with_flags(filters.dict())


@router.get("/current-exchange-rate")
def current_exchange_rate():
    return get_current_rate()


@router.get("/next-month-exchange-rate")
def next_month_exchange_rate():
    return get_next_month_exchange_rate()

@router.get("/forecast")
def forecast_analysis():
    return build_forecast_analysis()
