from pydantic import BaseModel

class ExchangeRate(BaseModel):
    exchange_month: str
    average_rate: float
    is_min: bool = False 
    is_max: bool = False 
    

    class Config:
        orm_mode = True 
        from_attributes = True 
