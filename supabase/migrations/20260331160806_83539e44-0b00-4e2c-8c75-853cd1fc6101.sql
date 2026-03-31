
CREATE TABLE public.predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  square_feet NUMERIC NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  year_built INTEGER NOT NULL,
  lot_size NUMERIC NOT NULL,
  garage INTEGER NOT NULL DEFAULT 0,
  location TEXT NOT NULL,
  condition TEXT NOT NULL,
  predicted_price NUMERIC,
  confidence_low NUMERIC,
  confidence_high NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON public.predictions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public reads" ON public.predictions FOR SELECT TO anon, authenticated USING (true);
