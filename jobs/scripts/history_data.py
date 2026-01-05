from datetime import datetime, date, timedelta
import os
import requests

def get_rate_by_date(year:int, month:int, day:int) -> float:
    try:
        exchange_rates_url = os.getenv("EXCHANGE_RATE_URL")
        exchange_rate_api_key = os.getenv("EXCHANGE_RATE_API_KEY") 

        rates_request_url = f"{exchange_rates_url}/{exchange_rate_api_key}/history/USD/{year}/{month}/{day}"
        print(f"Requesting rates from: {rates_request_url}")
        
        response = requests.get(rates_request_url)

        if response.status_code == 200:
            data = response.json()
        else:
            print(f"Error: {response.status_code} - {response.text}") 
            raise RuntimeError(f"Failed to get exchange rate for {year}-{month}-{day}")
        
        if 'conversion_rates' in data and 'ILS' in data['conversion_rates']:
            rate = data['conversion_rates']['ILS']
            print(f"Exchange rate for {year}-{month}-{day}: {rate}")
        else:
            raise KeyError(f"ILS rate not found for {year}-{month}-{day}")
        
        return rate

    finally:
        pass

def get_average_exchange_rate_for_month(year: int, month: int) -> float:
    if month == 2:
        if (year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)):
            num_days = 29
        else:
            num_days = 28
    elif month in [1, 3, 5, 7, 8, 10, 12]:
        num_days = 31
    else:
        num_days = 30
    
    total_rate = 0
    
    for day in range(1, num_days + 1):
        rate = get_rate_by_date(year, month, day)
        total_rate += rate
    
    average_rate = total_rate / num_days
    return average_rate


def get_data_to_insert():
    start_date = date(2020, 1, 1)
    current_date = date.today() 
    current_date = date(current_date.year, current_date.month, 1) - timedelta(days=1)
    data_to_insert = []

    while start_date <= current_date:
        year = start_date.year
        month = start_date.month
        
        average_rate = get_average_exchange_rate_for_month(year, month)
        print(f"Average exchange rate for {month:02d}/{year}: {average_rate}")
        
        month_year = f"{year}-{month:02d}" 
        data_to_insert.append((month_year, average_rate))
        
        if start_date.month == 12:
            start_date = date(start_date.year + 1, 1, 1)
        else:
            start_date = date(start_date.year, start_date.month + 1, 1)

    return data_to_insert

