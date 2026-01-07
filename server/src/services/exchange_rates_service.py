from .db import SessionLocal
from sqlalchemy import func
from sqlalchemy.orm import Session
from src.models.exchange_rate_model import MonthlyExchangeRate
from src.schemas.exchange_rates_schema import ExchangeRate
from src.utils.filter_query import apply_filters

def get_all_exchange_rates(filters: dict = None):
    db= SessionLocal()
    query = db.query(MonthlyExchangeRate)
    if filters:
        filtered_query = apply_filters(query, filters)
        response = filtered_query.all()

    else:
        response = query.all()

    res = [
        ExchangeRate.from_orm(rate).dict()
        for rate in response
    ]
    
    return res

def get_exchange_rate_with_flags(filters: dict):
    db= SessionLocal()
    all_rates = get_all_exchange_rates(filters)

    query = db.query(MonthlyExchangeRate)
    filtered_query = apply_filters(query, filters)

    min_rate = filtered_query.with_entities(func.min(MonthlyExchangeRate.average_rate)).scalar()
    max_rate = filtered_query.with_entities(func.max(MonthlyExchangeRate.average_rate)).scalar()

    res = [
        {
            **rate,
            "is_min": rate["average_rate"] == min_rate,
            "is_max": rate["average_rate"] == max_rate
        }
        for rate in all_rates
    ]
    
    return res
