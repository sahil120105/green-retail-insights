import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Leaf, TrendingDown, Award, BarChart3, Package, ShoppingCart } from 'lucide-react';
import SupplierCard from '@/components/SupplierCard';
import CarbonChart from '@/components/CarbonChart';
import RecommendationsPanel from '@/components/RecommendationsPanel';
import MetricsOverview from '@/components/MetricsOverview';
import ProductComparisonPanel from '@/components/ProductComparisonPanel';
import OrdersPanel from '@/components/OrdersPanel';
import { useSuppliers, useSupplierProducts } from '@/hooks/useSupabaseData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: suppliers, isLoading: suppliersLoading } = useSuppliers();
  const { data: supplierProducts } = useSupplierProducts();

  // Group products by supplier for the SupplierCard component
  const getSupplierWithProducts = (supplier: any) => {
    const products = supplierProducts?.filter(sp => sp.supplier_id === supplier.id) || [];
    return {
      ...supplier,
      products: products.map(sp => ({
        name: sp.products.name,
        category: sp.products.category,
        co2PerUnit: sp.co2_per_unit,
        energyPerUnit: sp.energy_per_unit,
        waterPerUnit: sp.water_per_unit,
        environmentalScore: sp.environmental_score
      }))
    };
  };

  const filteredSuppliers = suppliers?.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.location.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="suppliers" className="flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span>Suppliers</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Products</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4" />
              <span>Orders</span>
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
            {suppliersLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-lg">Loading suppliers...</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSuppliers.map((supplier) => (
                  <SupplierCard
                    key={supplier.id}
                    name={supplier.name}
                    location={supplier.location}
                    sustainabilityScore={supplier.sustainability_score}
                    carbonFootprint={supplier.carbon_footprint}
                    energyConsumption={supplier.energy_consumption}
                    waterUsage={supplier.water_usage}
                    certifications={supplier.certifications}
                    products={getSupplierWithProducts(supplier).products}
                    trend={supplier.trend}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="products">
            <ProductComparisonPanel />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersPanel />
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
