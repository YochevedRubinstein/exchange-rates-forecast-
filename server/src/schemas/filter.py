from typing import List, Optional
from pydantic import BaseModel

class IExchangeFilter(BaseModel):
    months: Optional[List[int]] = None
    startDate: Optional[str] = None
    endDate: Optional[str] = None
    minAverageRate: Optional[float] = None
    maxAverageRate: Optional[float] = None
    sortField: str
    sortDirection: str