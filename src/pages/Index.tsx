import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Shield, Zap, ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-house.jpg";
import PredictionForm from "@/components/PredictionForm";
import PredictionResult from "@/components/PredictionResult";
import { predictPrice, type HouseFeatures, type PredictionResult as PredictionResultType } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const features = [
  { icon: Brain, title: "ML-Powered", desc: "Advanced algorithms trained on real market data" },
  { icon: Zap, title: "Instant Results", desc: "Get predictions in seconds, not days" },
  { icon: Shield, title: "High Accuracy", desc: "90%+ confidence with transparent factors" },
];

const Index = () => {
  const [result, setResult] = useState<PredictionResultType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePredict = async (houseFeatures: HouseFeatures) => {
    setIsLoading(true);
    setResult(null);
    try {
      const prediction = await predictPrice(houseFeatures);
      setResult(prediction);
    } catch {
      toast({
        title: "Prediction Failed",
        description: "Could not reach the prediction server. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Modern luxury house" className="h-full w-full object-cover" width={1920} height={800} />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="mb-4 inline-block rounded-full border border-primary-foreground/30 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary-foreground/80">
              Machine Learning Powered
            </span>
            <h1 className="mb-4 font-display text-4xl font-bold leading-tight text-primary-foreground md:text-6xl">
              Know Your Chennai
              <span className="block text-accent">Property Value</span>
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/80 md:text-xl">
              Get instant, AI-driven property valuations across 25+ Chennai localities.
              Powered by real market data and advanced regression models.
            </p>
            <motion.a
              href="#predict"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
            >
              Get Started
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Features strip */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-0 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0 divide-border">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-4 px-6 py-5"
            >
              <f.icon className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <p className="font-display font-semibold text-foreground">{f.title}</p>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Prediction Section */}
      <section id="predict" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Predict Your Property Value
          </h2>
          <p className="mt-3 text-muted-foreground">
            Fill in the details below and our ML model will estimate the market value
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          <PredictionForm onSubmit={handlePredict} isLoading={isLoading} />

          <div className="flex items-start">
            {result ? (
              <PredictionResult result={result} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 p-12 text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                  <Brain className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Your Prediction Awaits
                </h3>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                  Enter your house details and click predict to see the estimated value with factor analysis
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8 text-center text-sm text-muted-foreground">
        <p>House Price Predictor — Powered by Machine Learning</p>
        <p className="mt-1 text-xs">Predictions are estimates and should not be used as financial advice.</p>
      </footer>
    </div>
  );
};

export default Index;
