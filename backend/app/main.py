"""
FastAPI application — Chennai House Price Prediction API.

Run with:
    uvicorn app.main:app --reload --port 8000
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import logging

from .config import ALLOWED_ORIGINS
from .schemas import HouseFeatures, PredictionResponse
from .model import predict_price
from .database import save_prediction

# ── Logging ──────────────────────────────────────────────────────────────────
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ── App ──────────────────────────────────────────────────────────────────────
app = FastAPI(
    title="Chennai House Price Predictor",
    version="1.0.0",
    description="ML-based house price prediction API for Chennai properties.",
)

# ── CORS — allow React frontend to call the API ─────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    """Simple health-check endpoint."""
    return {"status": "ok"}


@app.post("/predict-price", response_model=PredictionResponse)
def predict(features: HouseFeatures):
    """
    Accept house features, run the prediction model,
    persist results to PostgreSQL, and return the prediction.
    """
    try:
        result = predict_price(features)

        # Persist to database (non-blocking failure — log and continue)
        try:
            save_prediction(features, result)
            logger.info("Prediction saved to database.")
        except Exception as db_err:
            logger.warning(f"DB save failed (prediction still returned): {db_err}")

        return result

    except Exception as e:
        logger.error(f"Prediction failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))
