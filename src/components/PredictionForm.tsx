import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Ruler, BedDouble, Bath, Calendar, LandPlot, Car, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CHENNAI_AREAS, type HouseFeatures } from "@/lib/api";

interface PredictionFormProps {
  onSubmit: (features: HouseFeatures) => void;
  isLoading: boolean;
}

const FormField = ({ icon: Icon, label, children }: { icon: React.ElementType; label: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
      <Icon className="h-4 w-4 text-primary" />
      {label}
    </Label>
    {children}
  </div>
);

const PredictionForm = ({ onSubmit, isLoading }: PredictionFormProps) => {
  const [features, setFeatures] = useState<HouseFeatures>({
    squareFeet: 1500,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 2000,
    lotSize: 5000,
    garage: 2,
    location: "suburban",
    condition: "good",
  });

  const handleChange = (field: keyof HouseFeatures, value: string | number) => {
    setFeatures((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(features);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-card"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-hero">
          <Home className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground">House Details</h2>
          <p className="text-sm text-muted-foreground">Enter your property features</p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField icon={Ruler} label="Square Feet">
          <Input
            type="number"
            min={200}
            max={20000}
            value={features.squareFeet}
            onChange={(e) => handleChange("squareFeet", Number(e.target.value))}
            className="bg-background"
          />
        </FormField>

        <FormField icon={BedDouble} label="Bedrooms">
          <Input
            type="number"
            min={1}
            max={10}
            value={features.bedrooms}
            onChange={(e) => handleChange("bedrooms", Number(e.target.value))}
            className="bg-background"
          />
        </FormField>

        <FormField icon={Bath} label="Bathrooms">
          <Input
            type="number"
            min={1}
            max={8}
            value={features.bathrooms}
            onChange={(e) => handleChange("bathrooms", Number(e.target.value))}
            className="bg-background"
          />
        </FormField>

        <FormField icon={Calendar} label="Year Built">
          <Input
            type="number"
            min={1900}
            max={2025}
            value={features.yearBuilt}
            onChange={(e) => handleChange("yearBuilt", Number(e.target.value))}
            className="bg-background"
          />
        </FormField>

        <FormField icon={LandPlot} label="Lot Size (sq ft)">
          <Input
            type="number"
            min={500}
            max={100000}
            value={features.lotSize}
            onChange={(e) => handleChange("lotSize", Number(e.target.value))}
            className="bg-background"
          />
        </FormField>

        <FormField icon={Car} label="Garage Spaces">
          <Input
            type="number"
            min={0}
            max={6}
            value={features.garage}
            onChange={(e) => handleChange("garage", Number(e.target.value))}
            className="bg-background"
          />
        </FormField>

        <FormField icon={MapPin} label="Location Type">
          <Select value={features.location} onValueChange={(v) => handleChange("location", v)}>
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="urban">Urban</SelectItem>
              <SelectItem value="suburban">Suburban</SelectItem>
              <SelectItem value="rural">Rural</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <FormField icon={Sparkles} label="Condition">
          <Select value={features.condition} onValueChange={(v) => handleChange("condition", v)}>
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="excellent">Excellent</SelectItem>
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="fair">Fair</SelectItem>
              <SelectItem value="poor">Poor</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <Button type="submit" variant="hero" size="lg" className="mt-8 w-full text-base" disabled={isLoading}>
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            Analyzing...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Predict Price
          </span>
        )}
      </Button>
    </motion.form>
  );
};

export default PredictionForm;
