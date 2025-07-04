
-- Create suppliers table
CREATE TABLE public.suppliers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  sustainability_score INTEGER NOT NULL CHECK (sustainability_score >= 0 AND sustainability_score <= 100),
  carbon_footprint DECIMAL(10,2) NOT NULL,
  energy_consumption INTEGER NOT NULL,
  water_usage INTEGER NOT NULL,
  certifications TEXT[] DEFAULT '{}',
  trend TEXT CHECK (trend IN ('up', 'down', 'stable')) DEFAULT 'stable',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT CHECK (category IN ('clothes', 'food', 'supplies')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create supplier_products junction table with metrics
CREATE TABLE public.supplier_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  supplier_id UUID REFERENCES public.suppliers(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  price DECIMAL(10,2) NOT NULL,
  co2_per_unit DECIMAL(10,2) NOT NULL,
  energy_per_unit DECIMAL(10,2) NOT NULL,
  water_per_unit DECIMAL(10,2) NOT NULL,
  environmental_score INTEGER CHECK (environmental_score >= 0 AND environmental_score <= 100) NOT NULL,
  stock_quantity INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(supplier_id, product_id)
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  supplier_id UUID REFERENCES public.suppliers(id) ON DELETE CASCADE,
  total_amount DECIMAL(10,2) NOT NULL,
  carbon_savings DECIMAL(10,2) DEFAULT 0,
  energy_savings DECIMAL(10,2) DEFAULT 0,
  water_savings DECIMAL(10,2) DEFAULT 0,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
  order_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  supplier_product_id UUID REFERENCES public.supplier_products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert sample suppliers
INSERT INTO public.suppliers (name, location, sustainability_score, carbon_footprint, energy_consumption, water_usage, certifications, trend) VALUES
('GreenTech Fabrics', 'Portland, OR', 92, 1.2, 850, 1200, ARRAY['GOTS', 'OEKO-TEX', 'Cradle to Cradle'], 'up'),
('EcoMaterials Co.', 'Austin, TX', 87, 1.8, 1100, 1650, ARRAY['B Corp', 'Fair Trade', 'Recycled Content'], 'up'),
('Sustainable Solutions Ltd', 'Denver, CO', 74, 2.4, 1450, 2100, ARRAY['ISO 14001', 'Energy Star'], 'down'),
('CleanManufacturing Inc', 'Seattle, WA', 89, 1.5, 950, 1350, ARRAY['LEED', 'Carbon Neutral', 'OEKO-TEX'], 'up'),
('Traditional Textiles', 'Phoenix, AZ', 45, 4.2, 2800, 3500, ARRAY['ISO 9001'], 'stable'),
('NextGen Materials', 'San Francisco, CA', 95, 0.8, 650, 850, ARRAY['B Corp', 'Climate Neutral', 'GOTS', 'Cradle to Cradle'], 'up'),
('PurePath Supplies', 'Boulder, CO', 82, 2.1, 1250, 1800, ARRAY['FSC Certified', 'Rainforest Alliance'], 'up'),
('EarthFirst Foods', 'Vermont, VT', 88, 1.3, 900, 1100, ARRAY['Organic', 'Fair Trade', 'Rainforest Alliance'], 'up'),
('Standard Packaging Co.', 'Chicago, IL', 52, 3.4, 2200, 2900, ARRAY['ISO 9001'], 'stable'),
('BioCycle Industries', 'California, CA', 91, 1.1, 780, 950, ARRAY['Compostable', 'Carbon Neutral', 'B Corp'], 'up');

-- Insert sample products
INSERT INTO public.products (name, category) VALUES
-- Clothes
('Organic Cotton T-Shirt', 'clothes'),
('Recycled Polyester Jacket', 'clothes'),
('Hemp Fiber Pants', 'clothes'),
('Bamboo Fiber Socks', 'clothes'),
('Eco Wool Sweater', 'clothes'),
-- Food
('Organic Quinoa', 'food'),
('Fair Trade Coffee', 'food'),
('Sustainable Almonds', 'food'),
('Organic Rice', 'food'),
('Plant-Based Protein', 'food'),
-- Supplies
('Recycled Paper', 'supplies'),
('Biodegradable Packaging', 'supplies'),
('Compostable Utensils', 'supplies'),
('Eco Cleaning Supplies', 'supplies'),
('Solar Powered Charger', 'supplies');

-- Insert supplier-product relationships with metrics
INSERT INTO public.supplier_products (supplier_id, product_id, price, co2_per_unit, energy_per_unit, water_per_unit, environmental_score, stock_quantity) VALUES
-- GreenTech Fabrics (clothes focused)
((SELECT id FROM suppliers WHERE name = 'GreenTech Fabrics'), (SELECT id FROM products WHERE name = 'Organic Cotton T-Shirt'), 25.99, 2.1, 15.2, 180, 92, 500),
((SELECT id FROM suppliers WHERE name = 'GreenTech Fabrics'), (SELECT id FROM products WHERE name = 'Recycled Polyester Jacket'), 89.99, 3.8, 22.1, 95, 88, 200),
((SELECT id FROM suppliers WHERE name = 'GreenTech Fabrics'), (SELECT id FROM products WHERE name = 'Hemp Fiber Pants'), 45.50, 1.9, 12.8, 165, 94, 300),

-- EcoMaterials Co. (clothes and supplies)
((SELECT id FROM suppliers WHERE name = 'EcoMaterials Co.'), (SELECT id FROM products WHERE name = 'Organic Cotton T-Shirt'), 23.50, 2.8, 18.7, 210, 87, 450),
((SELECT id FROM suppliers WHERE name = 'EcoMaterials Co.'), (SELECT id FROM products WHERE name = 'Bamboo Fiber Socks'), 12.99, 1.2, 8.5, 45, 91, 800),
((SELECT id FROM suppliers WHERE name = 'EcoMaterials Co.'), (SELECT id FROM products WHERE name = 'Recycled Paper'), 14.99, 1.8, 12.5, 65, 78, 1000),

-- Sustainable Solutions Ltd (supplies focused)
((SELECT id FROM suppliers WHERE name = 'Sustainable Solutions Ltd'), (SELECT id FROM products WHERE name = 'Recycled Paper'), 12.99, 2.2, 16.8, 85, 74, 800),
((SELECT id FROM suppliers WHERE name = 'Sustainable Solutions Ltd'), (SELECT id FROM products WHERE name = 'Biodegradable Packaging'), 8.99, 2.1, 15.2, 35, 82, 600),
((SELECT id FROM suppliers WHERE name = 'Sustainable Solutions Ltd'), (SELECT id FROM products WHERE name = 'Eco Cleaning Supplies'), 18.50, 1.9, 11.2, 25, 79, 400),

-- CleanManufacturing Inc (food focused)
((SELECT id FROM suppliers WHERE name = 'CleanManufacturing Inc'), (SELECT id FROM products WHERE name = 'Organic Quinoa'), 15.99, 0.8, 5.2, 125, 89, 300),
((SELECT id FROM suppliers WHERE name = 'CleanManufacturing Inc'), (SELECT id FROM products WHERE name = 'Fair Trade Coffee'), 24.99, 1.5, 8.7, 95, 85, 250),
((SELECT id FROM suppliers WHERE name = 'CleanManufacturing Inc'), (SELECT id FROM products WHERE name = 'Organic Rice'), 12.50, 1.1, 6.8, 200, 87, 500),

-- Traditional Textiles (clothes - lower sustainability)
((SELECT id FROM suppliers WHERE name = 'Traditional Textiles'), (SELECT id FROM products WHERE name = 'Organic Cotton T-Shirt'), 18.99, 4.8, 28.5, 320, 45, 600),
((SELECT id FROM suppliers WHERE name = 'Traditional Textiles'), (SELECT id FROM products WHERE name = 'Recycled Polyester Jacket'), 65.99, 6.2, 35.1, 285, 42, 150),
((SELECT id FROM suppliers WHERE name = 'Traditional Textiles'), (SELECT id FROM products WHERE name = 'Eco Wool Sweater'), 55.99, 5.1, 32.8, 250, 48, 100),

-- NextGen Materials (supplies - highest sustainability)
((SELECT id FROM suppliers WHERE name = 'NextGen Materials'), (SELECT id FROM products WHERE name = 'Recycled Paper'), 11.99, 1.2, 8.5, 45, 95, 1200),
((SELECT id FROM suppliers WHERE name = 'NextGen Materials'), (SELECT id FROM products WHERE name = 'Compostable Utensils'), 6.99, 0.9, 6.2, 25, 93, 2000),
((SELECT id FROM suppliers WHERE name = 'NextGen Materials'), (SELECT id FROM products WHERE name = 'Solar Powered Charger'), 45.99, 2.1, 12.8, 15, 91, 80),

-- PurePath Supplies (supplies and food)
((SELECT id FROM suppliers WHERE name = 'PurePath Supplies'), (SELECT id FROM products WHERE name = 'Sustainable Almonds'), 28.99, 2.8, 18.5, 350, 82, 200),
((SELECT id FROM suppliers WHERE name = 'PurePath Supplies'), (SELECT id FROM products WHERE name = 'Biodegradable Packaging'), 7.50, 1.8, 12.1, 30, 85, 800),
((SELECT id FROM suppliers WHERE name = 'PurePath Supplies'), (SELECT id FROM products WHERE name = 'Eco Cleaning Supplies'), 16.99, 1.5, 9.8, 20, 83, 350),

-- EarthFirst Foods (food focused)
((SELECT id FROM suppliers WHERE name = 'EarthFirst Foods'), (SELECT id FROM products WHERE name = 'Fair Trade Coffee'), 26.50, 1.2, 7.5, 80, 88, 400),
((SELECT id FROM suppliers WHERE name = 'EarthFirst Foods'), (SELECT id FROM products WHERE name = 'Plant-Based Protein'), 34.99, 1.8, 11.2, 65, 86, 150),
((SELECT id FROM suppliers WHERE name = 'EarthFirst Foods'), (SELECT id FROM products WHERE name = 'Organic Rice'), 13.99, 0.9, 5.8, 180, 89, 600),

-- Standard Packaging Co. (supplies - lower sustainability)
((SELECT id FROM suppliers WHERE name = 'Standard Packaging Co.'), (SELECT id FROM products WHERE name = 'Recycled Paper'), 9.99, 3.4, 22.1, 95, 52, 1500),
((SELECT id FROM suppliers WHERE name = 'Standard Packaging Co.'), (SELECT id FROM products WHERE name = 'Biodegradable Packaging'), 5.99, 3.1, 19.8, 55, 48, 1000),
((SELECT id FROM suppliers WHERE name = 'Standard Packaging Co.'), (SELECT id FROM products WHERE name = 'Compostable Utensils'), 4.50, 2.8, 16.5, 40, 50, 2500),

-- BioCycle Industries (supplies and clothes)
((SELECT id FROM suppliers WHERE name = 'BioCycle Industries'), (SELECT id FROM products WHERE name = 'Bamboo Fiber Socks'), 14.99, 1.0, 7.2, 35, 91, 700),
((SELECT id FROM suppliers WHERE name = 'BioCycle Industries'), (SELECT id FROM products WHERE name = 'Compostable Utensils'), 7.99, 0.8, 5.5, 20, 94, 1800),
((SELECT id FROM suppliers WHERE name = 'BioCycle Industries'), (SELECT id FROM products WHERE name = 'Solar Powered Charger'), 42.99, 1.9, 11.5, 12, 92, 60);

-- Enable Row Level Security on all tables
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supplier_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (adjust based on your needs)
CREATE POLICY "Allow public read access to suppliers" ON public.suppliers FOR SELECT USING (true);
CREATE POLICY "Allow public read access to products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public read access to supplier_products" ON public.supplier_products FOR SELECT USING (true);
CREATE POLICY "Allow public read access to orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Allow public read access to order_items" ON public.order_items FOR SELECT USING (true);

-- Create policies for public insert access to orders (for placing orders)
CREATE POLICY "Allow public insert to orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to order_items" ON public.order_items FOR INSERT WITH CHECK (true);
