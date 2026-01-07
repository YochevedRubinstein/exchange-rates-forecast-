from ..services.db import Base
from sqlalchemy import Column, Integer, String, DECIMAL

class MonthlyExchangeRate(Base):
    __tablename__ = 'monthly_exchange_rates'

    exchange_month = Column(String(7), primary_key=True, index=True)
    average_rate = Column(DECIMAL(10, 4))