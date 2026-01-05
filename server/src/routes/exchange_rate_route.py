from fastapi import APIRouter, Depends
from ..services.exchange_rates_service import get_exchange_rate_with_flags
from src.schemas.filter import IExchangeFilter
from src.utils.calc_next_rate import get_next_rate
from ..services.exchange_rate_api import get_current_rate
from sqlalchemy.orm import Session
from src.utils.db import SessionLocal
from src.models.exchange_rate_model import MonthlyExchangeRate

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/exchange-rates")
def get_exchange_rates(filters: IExchangeFilter, db: Session = Depends(get_db)):
    response = get_exchange_rate_with_flags(filters.dict(), db)
    return response

@router.get("/current-exchange-rate")
def get_exchange_rates(db: Session = Depends(get_db)):
    return get_current_rate()

@router.get("/next-month-exchange-rate")
def get_exchange_rates(db: Session = Depends(get_db)):
    previosesRates = db.query(MonthlyExchangeRate).order_by(MonthlyExchangeRate.exchange_month.desc()).limit(4).all()
    return get_next_rate(previosesRates)
