
from src.schemas.exchange_rates_schema import ExchangeRate
from src.utils.filter_query import apply_filters
from sqlalchemy import func
from sqlalchemy.orm import Session
from src.models.exchange_rate_model import MonthlyExchangeRate

def get_exchange_rate_with_flags(filters: dict, db: Session):
    query = db.query(MonthlyExchangeRate)
    filtered_query = apply_filters(query, filters)
    
    response = filtered_query.all()
    
    min_rate = db.query(func.min(MonthlyExchangeRate.average_rate)).scalar()
    max_rate = db.query(func.max(MonthlyExchangeRate.average_rate)).scalar()
    
    res = [
        {
            **ExchangeRate.from_orm(rate).dict(),
            "is_min": rate.average_rate == min_rate, 
            "is_max": rate.average_rate == max_rate 
        }
        for rate in response
    ]
    
    return res
