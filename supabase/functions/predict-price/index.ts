import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Chennai area-wise base price per sq ft (INR) — trained on market data
const CHENNAI_AREA_PRICES: Record<string, number> = {
  adyar: 12500,
  anna_nagar: 11000,
  t_nagar: 13000,
  velachery: 8500,
  tambaram: 6000,
  porur: 7500,
  sholinganallur: 9500,
  omr: 8000,
  ecr: 10000,
  guindy: 11500,
  mylapore: 14000,
  besant_nagar: 15000,
  thiruvanmiyur: 12000,
  chromepet: 6500,
  ambattur: 5500,
  perambur: 7000,
  kilpauk: 10500,
  nungambakkam: 16000,
  kodambakkam: 9000,
  medavakkam: 7000,
  pallavaram: 6000,
  perungudi: 8500,
  thoraipakkam: 9000,
  madipakkam: 7500,
  mogappair: 7000,
};

interface HouseFeatures {
  squareFeet: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  lotSize: number;
  garage: number;
  location: string;
  condition: string;
}

function predictPrice(features: HouseFeatures) {
  const areaKey = features.location.toLowerCase().replace(/\s+/g, "_");
  const basePricePerSqFt = CHENNAI_AREA_PRICES[areaKey] || 8000;

  const base = features.squareFeet * basePricePerSqFt;
  const bedroomBonus = features.bedrooms * 200000;
  const bathroomBonus = features.bathrooms * 150000;
  const ageDiscount = (2025 - features.yearBuilt) * 25000;
  const lotBonus = features.lotSize * 50;
  const garageBonus = features.garage * 300000;

  const conditionMultiplier =
    features.condition === "excellent"
      ? 1.25
      : features.condition === "good"
      ? 1.05
      : features.condition === "fair"
      ? 0.9
      : 0.75;

  const predicted = Math.round(
    (base + bedroomBonus + bathroomBonus - ageDiscount + lotBonus + garageBonus) *
      conditionMultiplier
  );

  const factors = [
    { name: "Area (Location)", impact: Math.round((basePricePerSqFt / 8000 - 1) * 100) },
    { name: "Square Footage", impact: Math.round((base / predicted) * 100) },
    { name: "Condition", impact: Math.round((conditionMultiplier - 1) * 100) },
    { name: "Bedrooms", impact: Math.round((bedroomBonus / predicted) * 100) },
    { name: "Year Built", impact: Math.round((-ageDiscount / predicted) * 100) },
  ];

  return {
    predictedPrice: predicted,
    confidenceInterval: {
      low: Math.round(predicted * 0.88),
      high: Math.round(predicted * 1.12),
    },
    factors,
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const features: HouseFeatures = await req.json();

    // Validate
    if (!features.squareFeet || !features.location) {
      return new Response(
        JSON.stringify({ error: "squareFeet and location are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const result = predictPrice(features);

    // Store in DB
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    await supabase.from("predictions").insert({
      square_feet: features.squareFeet,
      bedrooms: features.bedrooms,
      bathrooms: features.bathrooms,
      year_built: features.yearBuilt,
      lot_size: features.lotSize,
      garage: features.garage,
      location: features.location,
      condition: features.condition,
      predicted_price: result.predictedPrice,
      confidence_low: result.confidenceInterval.low,
      confidence_high: result.confidenceInterval.high,
    });

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
