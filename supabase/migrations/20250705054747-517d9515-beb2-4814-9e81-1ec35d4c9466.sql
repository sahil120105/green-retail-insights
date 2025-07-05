
-- First, let's add some common sustainability certifications
INSERT INTO certification (name) VALUES 
('ISO 14001'),
('Fair Trade'),
('Organic'),
('Carbon Neutral'),
('LEED Certified'),
('Energy Star'),
('Forest Stewardship Council'),
('Cradle to Cradle'),
('B-Corp Certified'),
('Zero Waste'),
('Renewable Energy'),
('Water Stewardship')
ON CONFLICT (name) DO NOTHING;

-- Now let's assign certifications to suppliers based on their sustainability profiles
-- High sustainability score suppliers (80+) get more certifications
WITH supplier_cert_assignments AS (
  SELECT 
    s.id as supplier_id,
    s.name as supplier_name,
    s.sustainability_score,
    CASE 
      WHEN s.sustainability_score >= 90 THEN ARRAY['ISO 14001', 'Fair Trade', 'Organic', 'Carbon Neutral', 'B-Corp Certified']
      WHEN s.sustainability_score >= 80 THEN ARRAY['ISO 14001', 'Fair Trade', 'Carbon Neutral', 'Energy Star']
      WHEN s.sustainability_score >= 70 THEN ARRAY['ISO 14001', 'Energy Star', 'Water Stewardship']
      WHEN s.sustainability_score >= 60 THEN ARRAY['ISO 14001', 'Energy Star']
      ELSE ARRAY['Energy Star']
    END as cert_names
  FROM suppliers s
)
INSERT INTO supplier_certificate (supp_id, certificate_id)
SELECT 
  sca.supplier_id,
  c.id
FROM supplier_cert_assignments sca
CROSS JOIN UNNEST(sca.cert_names) as cert_name
JOIN certification c ON c.name = cert_name
ON CONFLICT DO NOTHING;
