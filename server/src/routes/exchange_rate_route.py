from fastapi import APIRouter, Depends
from src.services.analize_forecast import build_forecast_analysis
from ..services.exchange_rates_service import get_exchange_rate_with_flags
from src.schemas.filter import IExchangeFilter
from src.utils.calc_next_rate import get_next_rate
from ..services.exchange_rate_api import get_current_rate
# from sqlalchemy.orm import Session
from ..services.db import SessionLocal
from src.models.exchange_rate_model import MonthlyExchangeRate

router = APIRouter()

@router.post("/exchange-rates")
def get_exchange_rates(filters: IExchangeFilter):
    response = get_exchange_rate_with_flags(filters.dict())
    return response

@router.get("/current-exchange-rate")
def get_exchange_rates():
    return get_current_rate()

@router.get("/next-month-exchange-rate")
def get_exchange_rates():
    previosesRates = SessionLocal.query(MonthlyExchangeRate).order_by(MonthlyExchangeRate.exchange_month.desc()).limit(4).all()
    return get_next_rate(previosesRates)

@router.get("/forecast")
def forecast_analysis():
    return build_forecast_analysis()