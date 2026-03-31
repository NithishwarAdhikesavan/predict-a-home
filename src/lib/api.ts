import { supabase } from "@/integrations/supabase/client";

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

export const CHENNAI_AREAS = [
  { value: "adyar", label: "Adyar" },
  { value: "anna_nagar", label: "Anna Nagar" },
  { value: "t_nagar", label: "T. Nagar" },
  { value: "velachery", label: "Velachery" },
  { value: "tambaram", label: "Tambaram" },
  { value: "porur", label: "Porur" },
  { value: "sholinganallur", label: "Sholinganallur" },
  { value: "omr", label: "OMR (Old Mahabalipuram Road)" },
  { value: "ecr", label: "ECR (East Coast Road)" },
  { value: "guindy", label: "Guindy" },
  { value: "mylapore", label: "Mylapore" },
  { value: "besant_nagar", label: "Besant Nagar" },
  { value: "thiruvanmiyur", label: "Thiruvanmiyur" },
  { value: "chromepet", label: "Chromepet" },
  { value: "ambattur", label: "Ambattur" },
  { value: "perambur", label: "Perambur" },
  { value: "kilpauk", label: "Kilpauk" },
  { value: "nungambakkam", label: "Nungambakkam" },
  { value: "kodambakkam", label: "Kodambakkam" },
  { value: "medavakkam", label: "Medavakkam" },
  { value: "pallavaram", label: "Pallavaram" },
  { value: "perungudi", label: "Perungudi" },
  { value: "thoraipakkam", label: "Thoraipakkam" },
  { value: "madipakkam", label: "Madipakkam" },
  { value: "mogappair", label: "Mogappair" },
];

export async function predictPrice(features: HouseFeatures): Promise<PredictionResult> {
  const { data, error } = await supabase.functions.invoke("predict-price", {
    body: features,
  });

  if (error) throw new Error(error.message || "Prediction failed");
  return data as PredictionResult;
}
