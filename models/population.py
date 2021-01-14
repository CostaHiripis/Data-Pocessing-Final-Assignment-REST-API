from datetime import datetime
from typing import Optional

from pydantic.main import BaseModel


class Population(BaseModel):
    countryName: Optional[str] = None
    year: Optional[datetime.year] = None
    population: Optional[int] = None

    class Config:
        schema_extra = {
            "example": {
                "countryName": "Aruba",
                "year": 1960,
                "population": 54211,
            }
        }
