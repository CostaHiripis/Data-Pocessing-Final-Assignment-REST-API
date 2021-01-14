from sqlalchemy import Column, ForeignKey, Integer, String, Float

from database.database import Base


class AirQuality(Base):
    __tablename__ = "airQuality"

    id = Column(Integer, primary_key=True, index=True)
    pollutant = Column(String, unique=False, index=True)
    variable = Column(String, unique=False, index=True)
    year = Column(Integer, unique=False, index=True)
    unit = Column(String, unique=False, index=True)
    value = Column(Float, unique=False, index=True)


class Energy(Base):
    __tablename__ = "energy"
    id = Column(Integer, primary_key=True, index=True)
    countryName = Column(String, unique=False, index=True)
    countryCode = Column(String, unique=False, index=True)
    year = Column(Integer, unique=False, index=True)
    energyConsumption = Column(String, unique=False, index=True)


class Population(Base):
    __tablename__ = "population"
    countryName = Column(String, unique=False, index=True)
    year = Column(Integer, unique=False, index=True)
    population = Column(Integer, unique=False, index=True)
