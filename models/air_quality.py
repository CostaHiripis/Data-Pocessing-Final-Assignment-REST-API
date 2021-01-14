from datetime import datetime
from typing import Optional

from pydantic.main import BaseModel


class AirQuality(BaseModel):
    countryName: Optional[str] = None
    pollutant: Optional[str] = None
    variable: Optional[str] = None
    year: Optional[datetime.year] = None
    unit: Optional[str] = None
    value: Optional[float] = None

    class Config:
        schema_extra = {
            "example": {
                "countryName": "Australia",
                "pollutant": "Sulphur Dioxide",
                "variable": "Total man-made emissions",
                "year": 1990,
                "unit": "Tonnes",
                "value": 1585.754,
            }
        }