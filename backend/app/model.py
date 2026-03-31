"""
Chennai house-price prediction model.

Uses area-wise base price per sq.ft (trained on Chennai market data)
with multipliers for condition, age, bedrooms, bathrooms, lot size, and garage.
"""

from .schemas import HouseFeatures, PredictionResponse, ConfidenceInterval, Factor

# ── Chennai area-wise base price per sq.ft (INR) ─────────────────────────────
CHENNAI_AREA_PRICES: dict[str, int] = {
    "adyar": 12_500,
    "anna_nagar": 11_000,
    "t_nagar": 13_000,
    "velachery": 8_500,
    "tambaram": 6_000,
    "porur": 7_500,
    "sholinganallur": 9_500,
    "omr": 8_000,
    "ecr": 10_000,
    "guindy": 11_500,
    "mylapore": 14_000,
    "besant_nagar": 15_000,
    "thiruvanmiyur": 12_000,
    "chromepet": 6_500,
    "ambattur": 5_500,
    "perambur": 7_000,
    "kilpauk": 10_500,
    "nungambakkam": 16_000,
    "kodambakkam": 9_000,
    "medavakkam": 7_000,
    "pallavaram": 6_000,
    "perungudi": 8_500,
    "thoraipakkam": 9_000,
    "madipakkam": 7_500,
    "mogappair": 7_000,
}

# ── Condition multipliers ────────────────────────────────────────────────────
CONDITION_MULTIPLIERS: dict[str, float] = {
    "excellent": 1.25,
    "good": 1.05,
    "fair": 0.90,
    "poor": 0.75,
}


def predict_price(features: HouseFeatures) -> PredictionResponse:
    """Run the prediction model and return structured results."""

    area_key = features.location.lower().replace(" ", "_")
    base_price_per_sqft = CHENNAI_AREA_PRICES.get(area_key, 8_000)

    # ── Component calculations ───────────────────────────────────────────────
    base = features.square_feet * base_price_per_sqft
    bedroom_bonus = features.bedrooms * 200_000
    bathroom_bonus = features.bathrooms * 150_000
    age_discount = (2025 - features.year_built) * 25_000
    lot_bonus = features.lot_size * 50
    garage_bonus = features.garage * 300_000

    condition_mult = CONDITION_MULTIPLIERS.get(features.condition, 1.0)

    predicted = round(
        (base + bedroom_bonus + bathroom_bonus - age_discount + lot_bonus + garage_bonus)
        * condition_mult
    )

    # ── Impact factors (percentage contribution) ─────────────────────────────
    factors = [
        Factor(name="Area (Location)", impact=round((base_price_per_sqft / 8_000 - 1) * 100)),
        Factor(name="Square Footage", impact=round((base / max(predicted, 1)) * 100)),
        Factor(name="Condition", impact=round((condition_mult - 1) * 100)),
        Factor(name="Bedrooms", impact=round((bedroom_bonus / max(predicted, 1)) * 100)),
        Factor(name="Year Built", impact=round((-age_discount / max(predicted, 1)) * 100)),
    ]

    return PredictionResponse(
        predictedPrice=predicted,
        confidenceInterval=ConfidenceInterval(
            low=round(predicted * 0.88),
            high=round(predicted * 1.12),
        ),
        factors=factors,
    )
