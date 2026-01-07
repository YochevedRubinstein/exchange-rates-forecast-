from pydantic import BaseModel
from typing import List, Optional


class ForecastTableRow(BaseModel):
    month: str
    actual: float
    forecast: Optional[float]
    delta: Optional[float]


class ForecastAnalysisResponse(BaseModel):
    rows: List[ForecastTableRow]
    productMatrix: List[List[float]]
