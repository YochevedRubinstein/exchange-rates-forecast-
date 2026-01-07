from sqlalchemy import func
from sqlalchemy.orm import Session
from src.models.exchange_rate_model import MonthlyExchangeRate
from src.utils.filter_query import apply_filters


def fetch_exchange_rates(db: Session, filters: dict | None = None):
    query = db.query(MonthlyExchangeRate)


    if filters:
        query = apply_filters(query, filters)

    return query.all()


def fetch_min_max_average_rate(db: Session,filters: dict):
    query = db.query(MonthlyExchangeRate)
    query = apply_filters(query, filters)

    min_rate = query.with_entities(func.min(MonthlyExchangeRate.average_rate)).scalar()
    max_rate = query.with_entities(func.max(MonthlyExchangeRate.average_rate)).scalar()

    return min_rate, max_rate


def fetch_last_months(db: Session,limit: int = 4):
    return (
        db.query(MonthlyExchangeRate)
        .order_by(MonthlyExchangeRate.exchange_month.desc())
        .limit(limit)
        .all()
    )
