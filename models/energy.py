from typing import Optional

from pydantic.main import BaseModel


class Energy(BaseModel):
    countryName: Optional[str] = None
    countryCode: Optional[str] = None
    year: Optional[datetime.year] = None
    energyConsumption: Optional[float] = None

    class Config:
        schema_extra = {
            "example": {
                "countryName": "Afghanistan",
                "countryCode": "AFG",
                "year": 1980,
                "energyConsumption": 581.9322012,
            }
        }
