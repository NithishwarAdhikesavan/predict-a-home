"""
Database helper — stores every prediction in PostgreSQL.

Uses psycopg2 for a lightweight, production-ready connection.
"""

import psycopg2
from psycopg2.extras import RealDictCursor
from contextlib import contextmanager

from .config import DATABASE_URL
from .schemas import HouseFeatures, PredictionResponse


@contextmanager
def get_connection():
    """Yield a psycopg2 connection; auto-close on exit."""
    conn = psycopg2.connect(DATABASE_URL)
    try:
        yield conn
    finally:
        conn.close()


def save_prediction(features: HouseFeatures, result: PredictionResponse) -> None:
    """Insert a prediction record into the `predictions` table."""

    sql = """
        INSERT INTO predictions (
            square_feet, bedrooms, bathrooms, year_built,
            lot_size, garage, location, condition,
            predicted_price, confidence_low, confidence_high
        ) VALUES (
            %(square_feet)s, %(bedrooms)s, %(bathrooms)s, %(year_built)s,
            %(lot_size)s, %(garage)s, %(location)s, %(condition)s,
            %(predicted_price)s, %(confidence_low)s, %(confidence_high)s
        )
    """

    params = {
        "square_feet": features.square_feet,
        "bedrooms": features.bedrooms,
        "bathrooms": features.bathrooms,
        "year_built": features.year_built,
        "lot_size": features.lot_size,
        "garage": features.garage,
        "location": features.location,
        "condition": features.condition,
        "predicted_price": result.predictedPrice,
        "confidence_low": result.confidenceInterval.low,
        "confidence_high": result.confidenceInterval.high,
    }

    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, params)
        conn.commit()
