def get_next_rate(previousRates) -> float:
    if len(previousRates) < 4:
        raise ValueError("At least four previous rates are required to calculate the next rate.")
    
    rate1 = float(previousRates[0].average_rate)
    rate2 = float(previousRates[1].average_rate)
    rate3 = float(previousRates[2].average_rate)
    rate4 = float(previousRates[3].average_rate)
    
    next_rate = (rate1 * 0.4) + (rate2 * 0.3) + (rate3 * 0.2) + (rate4 * 0.1)
    return round(next_rate, 4)