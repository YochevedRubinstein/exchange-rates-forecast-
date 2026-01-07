from src.utils.calc_next_rate import get_next_rate
from .exchange_rate_repository import fetch_last_months
from .db.session import session_scope
from src.schemas.exchange_rates_schema import ExchangeRate
from .exchange_rate_repository import (
    fetch_exchange_rates,
    fetch_min_max_average_rate,
)

def get_all_exchange_rates(db, filters: dict | None = None):
    rates = fetch_exchange_rates(db, filters)
    return [
        ExchangeRate.from_orm(rate).dict()
        for rate in rates
    ]


def get_exchange_rate_with_flags(filters: dict):
    with session_scope() as db:
        rates = get_all_exchange_rates(db, filters)
        min_rate, max_rate = fetch_min_max_average_rate(db, filters)

        return [
            {
                **rate,
                "is_min": rate["average_rate"] == min_rate,
                "is_max": rate["average_rate"] == max_rate,
            }
            for rate in rates
        ]

def get_next_month_exchange_rate() -> float:
    with session_scope() as db:
        last_rates = fetch_last_months(db, limit=4)
        return get_next_rate(last_rates)