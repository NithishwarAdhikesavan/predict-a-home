"""
Pydantic request / response models.
"""

from pydantic import BaseModel, Field
from typing import List


class HouseFeatures(BaseModel):
    """Input schema — all the features a user submits."""

    square_feet: float = Field(..., alias="squareFeet", gt=0, description="Total built-up area in sq.ft")
    bedrooms: int = Field(..., ge=0, description="Number of bedrooms")
    bathrooms: int = Field(..., ge=0, description="Number of bathrooms")
    year_built: int = Field(..., alias="yearBuilt", ge=1800, le=2026, description="Year the house was built")
    lot_size: float = Field(..., alias="lotSize", ge=0, description="Lot size in sq.ft")
    garage: int = Field(..., ge=0, description="Number of garage spaces")
    location: str = Field(..., min_length=1, description="Chennai area (e.g. adyar, omr)")
    condition: str = Field(..., pattern="^(excellent|good|fair|poor)$", description="Property condition")

    class Config:
        populate_by_name = True  # accept both snake_case and camelCase


class Factor(BaseModel):
    name: str
    impact: int


class ConfidenceInterval(BaseModel):
    low: int
    high: int


class PredictionResponse(BaseModel):
    predictedPrice: int
    confidenceInterval: ConfidenceInterval
    factors: List[Factor]
