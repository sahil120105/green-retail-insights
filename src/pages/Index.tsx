
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Leaf, TrendingDown, Award, BarChart3, Package } from 'lucide-react';
import SupplierCard from '@/components/SupplierCard';
import CarbonChart from '@/components/CarbonChart';
import RecommendationsPanel from '@/components/RecommendationsPanel';
import MetricsOverview from '@/components/MetricsOverview';
import ProductComparisonPanel from '@/components/ProductComparisonPanel';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const suppliersData = [
    {
      name: "GreenTech Fabrics",
      location: "Portland, OR",
      sustainabilityScore: 92,
      carbonFootprint: 1.2,
      energyConsumption: 850,
      waterUsage: 1200,
      certifications: ['GOTS', 'OEKO-TEX', 'Cradle to Cradle'],
      products: [
        { name: "Organic Cotton T-Shirt", category: "clothes" as const, co2PerUnit: 2.1, energyPerUnit: 15.2, waterPerUnit: 180, environmentalScore: 92 },
        { name: "Recycled Polyester Jacket", category: "clothes" as const, co2PerUnit: 3.8, energyPerUnit: 22.1, waterPerUnit: 95, environmentalScore: 88 },
        { name: "Hemp Fiber Pants", category: "clothes" as const, co2PerUnit: 1.9, energyPerUnit: 12.8, waterPerUnit: 165, environmentalScore: 94 }
      ],
      trend: "up" as const
    },
    {
      name: "EcoMaterials Co.",
      location: "Austin, TX",
      sustainabilityScore: 87,
      carbonFootprint: 1.8,
      energyConsumption: 1100,
      waterUsage: 1650,
      certifications: ['B Corp', 'Fair Trade', 'Recycled Content'],
      products: [
        { name: "Organic Cotton T-Shirt", category: "clothes" as const, co2PerUnit: 2.8, energyPerUnit: 18.7, waterPerUnit: 210, environmentalScore: 87 },
        { name: "Bamboo Fiber Socks", category: "clothes" as const, co2PerUnit: 1.2, energyPerUnit: 8.5, waterPerUnit: 45, environmentalScore: 91 }
      ],
      trend: "up" as const
    },
    {
      name: "Sustainable Solutions Ltd",
      location: "Denver, CO",
      sustainabilityScore: 74,
      carbonFootprint: 2.4,
      energyConsumption: 1450,
      waterUsage: 2100,
      certifications: ['ISO 14001', 'Energy Star'],
      products: [
        { name: "Recycled Paper", category: "supplies" as const, co2PerUnit: 1.8, energyPerUnit: 12.5, waterPerUnit: 65, environmentalScore: 78 },
        { name: "Biodegradable Packaging", category: "supplies" as const, co2PerUnit: 2.1, energyPerUnit: 15.2, waterPerUnit: 35, environmentalScore: 82 }
      ],
      trend: "down" as const
    },
    {
      name: "CleanManufacturing Inc",
      location: "Seattle, WA",
      sustainabilityScore: 89,
      carbonFootprint: 1.5,
      energyConsumption: 950,
      waterUsage: 1350,
      certifications: ['LEED', 'Carbon Neutral', 'OEKO-TEX'],
      products: [
        { name: "Organic Quinoa", category: "food" as const, co2PerUnit: 0.8, energyPerUnit: 5.2, waterPerUnit: 125, environmentalScore: 89 },
        { name: "Fair Trade Coffee", category: "food" as const, co2PerUnit: 1.5, energyPerUnit: 8.7, waterPerUnit: 95, environmentalScore: 85 }
      ],
      trend: "up" as const
    },
    {
      name: "Traditional Textiles",
      location: "Phoenix, AZ",
      sustainabilityScore: 45,
      carbonFootprint: 4.2,
      energyConsumption: 2800,
      waterUsage: 3500,
      certifications: ['ISO 9001'],
      products: [
        { name: "Cotton T-Shirt", category: "clothes" as const, co2PerUnit: 4.8, energyPerUnit: 28.5, waterPerUnit: 320, environmentalScore: 45 },
        { name: "Polyester Jacket", category: "clothes" as const, co2PerUnit: 6.2, energyPerUnit: 35.1, waterPerUnit: 285, environmentalScore: 42 }
      ],
      trend: "stable" as const
    },
    {
      name: "NextGen Materials",
      location: "San Francisco, CA",
      sustainabilityScore: 95,
      carbonFootprint: 0.8,
      energyConsumption: 650,
      waterUsage: 850,
      certifications: ['B Corp', 'Climate Neutral', 'GOTS', 'Cradle to Cradle'],
      products: [
        { name: "Recycled Paper", category: "supplies" as const, co2PerUnit: 1.2, energyPerUnit: 8.5, waterPerUnit: 45, environmentalScore: 95 },
        { name: "Compostable Utensils", category: "supplies" as const, co2PerUnit: 0.9, energyPerUnit: 6.2, waterPerUnit: 25, environmentalScore: 93 }
      ],
      trend: "up" as const
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">EcoSupply Dashboard</h1>
                <p className="text-sm text-gray-600">Sustainable Supply Chain Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search suppliers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                Add Supplier
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics Overview */}
        <MetricsOverview />

        {/* Dashboard Tabs */}
        <Tabs defaultValue="suppliers" className="mt-8">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="suppliers" className="flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span>Suppliers</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Products</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center space-x-2">
              <TrendingDown className="h-4 w-4" />
              <span>Recommendations</span>
            </TabsTrigger>
            <TabsTrigger value="savings" className="flex items-center space-x-2">
              <Leaf className="h-4 w-4" />
              <span>Carbon Savings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="suppliers">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suppliersData.map((supplier, index) => (
                <SupplierCard
                  key={index}
                  name={supplier.name}
                  location={supplier.location}
                  sustainabilityScore={supplier.sustainabilityScore}
                  carbonFootprint={supplier.carbonFootprint}
                  energyConsumption={supplier.energyConsumption}
                  waterUsage={supplier.waterUsage}
                  certifications={supplier.certifications}
                  products={supplier.products}
                  trend={supplier.trend}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="products">
            <ProductComparisonPanel />
          </TabsContent>

          <TabsContent value="analytics">
            <CarbonChart />
          </TabsContent>

          <TabsContent value="recommendations">
            <RecommendationsPanel />
          </TabsContent>

          <TabsContent value="savings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                    <span>Total Carbon Savings</span>
                  </CardTitle>
                  <CardDescription>
                    Cumulative impact from sustainable supplier choices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">2,847 tons CO₂</div>
                  <div className="text-sm text-gray-600 mb-4">Equivalent to planting 64,850 trees</div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Q1 2024</span>
                      <span className="font-semibold">892 tons</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Q2 2024</span>
                      <span className="font-semibold">1,124 tons</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Q3 2024</span>
                      <span className="font-semibold">831 tons</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Order Impact</CardTitle>
                  <CardDescription>
                    Carbon savings from your last 10 orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { order: 'ORD-2024-001', supplier: 'GreenTech Fabrics', savings: 45 },
                      { order: 'ORD-2024-002', supplier: 'EcoMaterials Co.', savings: 32 },
                      { order: 'ORD-2024-003', supplier: 'NextGen Materials', savings: 67 },
                      { order: 'ORD-2024-004', supplier: 'CleanManufacturing Inc', savings: 28 },
                      { order: 'ORD-2024-005', supplier: 'GreenTech Fabrics', savings: 51 },
                    ].map((order, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <div className="font-medium text-sm">{order.order}</div>
                          <div className="text-xs text-gray-600">{order.supplier}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">-{order.savings} kg CO₂</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
