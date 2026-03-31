// ===== PLACEHOLDER API =====
// Replace this URL with your FastAPI backend endpoint
const API_BASE_URL = "https://your-fastapi-backend.com";

export interface HouseFeatures {
  squareFeet: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  lotSize: number;
  garage: number;
  location: string;
  condition: string;
}

export interface PredictionResult {
  predictedPrice: number;
  confidenceInterval: { low: number; high: number };
  factors: { name: string; impact: number }[];
}

// Simulates an API call — replace with real fetch to your FastAPI backend
export async function predictPrice(features: HouseFeatures): Promise<PredictionResult> {
  // ---- REPLACE THIS BLOCK with real API call ----
  // const response = await fetch(`${API_BASE_URL}/predict`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(features),
  // });
  // if (!response.ok) throw new Error("Prediction failed");
  // return response.json();

  // Simulated prediction logic for demo purposes
  await new Promise((r) => setTimeout(r, 1500));

  const base = features.squareFeet * 150;
  const bedroomBonus = features.bedrooms * 15000;
  const bathroomBonus = features.bathrooms * 12000;
  const ageDiscount = (2025 - features.yearBuilt) * 500;
  const lotBonus = features.lotSize * 5;
  const garageBonus = features.garage * 20000;

  const conditionMultiplier =
    features.condition === "excellent" ? 1.2 :
    features.condition === "good" ? 1.05 :
    features.condition === "fair" ? 0.9 : 0.75;

  const locationMultiplier =
    features.location === "urban" ? 1.3 :
    features.location === "suburban" ? 1.1 : 0.85;

  const predicted = Math.round(
    (base + bedroomBonus + bathroomBonus - ageDiscount + lotBonus + garageBonus) *
    conditionMultiplier * locationMultiplier
  );

  return {
    predictedPrice: predicted,
    confidenceInterval: {
      low: Math.round(predicted * 0.9),
      high: Math.round(predicted * 1.1),
    },
    factors: [
      { name: "Square Footage", impact: Math.round(base / predicted * 100) },
      { name: "Location", impact: Math.round((locationMultiplier - 1) * 100) },
      { name: "Condition", impact: Math.round((conditionMultiplier - 1) * 100) },
      { name: "Bedrooms", impact: Math.round(bedroomBonus / predicted * 100) },
      { name: "Year Built", impact: Math.round(-ageDiscount / predicted * 100) },
    ],
  };
}
