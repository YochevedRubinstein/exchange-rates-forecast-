import requests
import os

def get_current_rate() -> float:  
    exchange_rates_url = os.getenv("EXCHANGE_RATE_URL")
    exchange_rate_api_key = os.getenv("EXCHANGE_RATE_API_KEY") 
    try:
        rates_request_url = f"{exchange_rates_url}/{exchange_rate_api_key}/pair/USD/ILS"
        print(f"Requesting rates from: {rates_request_url}")
        
        response = requests.get(rates_request_url)
        if response.status_code == 200:
            current_rate = response.json().get('conversion_rate')
            print(current_rate)
            return round(current_rate, 4)
        else:
            print(f"Error: {response.status_code} - {response.text}")
    except: 
        raise RuntimeError(f"Failed to get current exchange rate {e}")
