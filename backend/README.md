# Chennai House Price Prediction — FastAPI Backend

## Quick Start

```bash
cd backend

# 1. Create virtual environment
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Configure environment
cp .env.example .env
# Edit .env with your Supabase/PostgreSQL credentials

# 4. Run the server
uvicorn app.main:app --reload --port 8000
```

## API Endpoints

| Method | Route            | Description                |
|--------|------------------|----------------------------|
| GET    | `/health`        | Health check               |
| POST   | `/predict-price` | Predict house price (JSON) |

## Example Request

```bash
curl -X POST http://localhost:8000/predict-price \
  -H "Content-Type: application/json" \
  -d '{
    "squareFeet": 1200,
    "bedrooms": 3,
    "bathrooms": 2,
    "yearBuilt": 2015,
    "lotSize": 2400,
    "garage": 1,
    "location": "adyar",
    "condition": "good"
  }'
```

## Project Structure

```
backend/
├── app/
│   ├── __init__.py     # Package marker
│   ├── config.py       # Environment config
│   ├── database.py     # PostgreSQL persistence
│   ├── main.py         # FastAPI app & routes
│   ├── model.py        # Prediction logic
│   └── schemas.py      # Pydantic models
├── .env.example        # Sample env file
├── requirements.txt    # Python dependencies
└── README.md           # This file
```
