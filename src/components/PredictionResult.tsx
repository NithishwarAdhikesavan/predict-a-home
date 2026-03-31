import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, IndianRupee, BarChart3 } from "lucide-react";
import type { PredictionResult as PredictionResultType } from "@/lib/api";

interface PredictionResultProps {
  result: PredictionResultType;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

const PredictionResult = ({ result }: PredictionResultProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-elevated"
    >
      {/* Price display */}
      <div className="mb-8 text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Estimated Value
          </span>
        </div>
        <motion.p
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="font-display text-4xl font-bold text-primary md:text-5xl"
        >
          {formatCurrency(result.predictedPrice)}
        </motion.p>
        <div className="mt-3 flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <TrendingDown className="h-3.5 w-3.5" />
            {formatCurrency(result.confidenceInterval.low)}
          </span>
          <span className="text-border">—</span>
          <span className="flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5" />
            {formatCurrency(result.confidenceInterval.high)}
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">90% confidence interval</p>
      </div>

      {/* Key factors */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" />
          <h3 className="font-display text-lg font-semibold text-foreground">Key Factors</h3>
        </div>
        <div className="space-y-3">
          {result.factors.map((factor, i) => (
            <motion.div
              key={factor.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-foreground">{factor.name}</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(Math.abs(factor.impact), 100)}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                    className={`h-full rounded-full ${factor.impact >= 0 ? "gradient-hero" : "bg-destructive"}`}
                  />
                </div>
                <span className={`text-xs font-medium min-w-[3rem] text-right ${factor.impact >= 0 ? "text-primary" : "text-destructive"}`}>
                  {factor.impact >= 0 ? "+" : ""}{factor.impact}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PredictionResult;
