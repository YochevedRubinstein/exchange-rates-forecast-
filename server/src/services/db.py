from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os

MYSQL_HOST = os.getenv("DB_HOST")
MYSQL_PORT = os.getenv("DB_PORT", "3306")
MYSQL_DATABASE = os.getenv("DB_NAME", "exchange_rates_db")
MYSQL_USER = os.getenv("DB_USER", )
MYSQL_PASSWORD = os.getenv("DB_PASS")

SQLALCHEMY_DATABASE_URL = f"mysql+mysqlconnector://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DATABASE}"
engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

db = SessionLocal()