"""
Application configuration — reads DB credentials from environment variables.
"""

import os

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:yourpassword@localhost:5432/housepriceprediction",
)

# CORS origins allowed to call this API
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")
