from sqlalchemy import func, Integer
from src.models.exchange_rate_model import MonthlyExchangeRate
from sqlalchemy.orm import Query

def apply_filters(query: Query, filters: dict) -> Query:

    if filters.get('months') and isinstance(filters['months'], list):
        print(f"Months filter: {filters['months']}")
        query = query.filter(
        func.cast(func.substr(MonthlyExchangeRate.exchange_month, 6, 2),Integer).in_(filters['months'])
        )
    
    if filters.get('startDate') and filters.get('endDate'):
        query = query.filter(MonthlyExchangeRate.exchange_month.between(filters['startDate'], filters['endDate']))
    
    if filters.get('minAverageRate') is not None:
        query = query.filter(MonthlyExchangeRate.average_rate >= filters['minAverageRate'])
    
    if filters.get('maxAverageRate') is not None:
        query = query.filter(MonthlyExchangeRate.average_rate <= filters['maxAverageRate'])
    
    if filters['sortField'] == 'month':
        query = query.order_by(MonthlyExchangeRate.exchange_month.desc() if filters['sortDirection'] == 'desc' else MonthlyExchangeRate.exchange_month.asc())
    elif filters['sortField'] == 'avg':
        query = query.order_by(MonthlyExchangeRate.average_rate.desc() if filters['sortDirection'] == 'desc' else MonthlyExchangeRate.average_rate.asc())
    
    return query
